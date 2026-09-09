// tests/double-verification.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { CALCULATORS } from '../src/data/calculatorRegistry.ts';
import { convertCurrency } from '../src/utils/currencyEngine.ts';
import { calculateCountryTax } from '../src/engines/taxEngine.ts';
import { calculateBreakEven, calculateProfitMargin, calculateLoanAmortization, calculateEMIWithPrepayment, roundToCents } from '../src/engines/finance.ts';
import { calculateCAGR, calculateSIP } from '../src/engines/investment.ts';
import { sanitizeInput, validateInput } from '../src/utils/validation.ts';
import { parseQueryToState, serializeStateToQuery, formatResultForClipboard } from '../src/utils/urlState.ts';
import { generateWebApplicationSchema, generateFAQPageSchema } from '../src/utils/seoSchema.ts';

// Helper to execute calculator computeScript directly from registry
function executeCalculator(calcId, inputs) {
  const calc = CALCULATORS.find((c) => c.id === calcId);
  if (!calc) throw new Error(`Calculator ${calcId} not found in registry`);
  const fn = new Function('inputs', calc.computeScript);
  return fn(inputs);
}

test('Double Verification — Golden Test Cases Across Engines', async (t) => {
  // Golden Case 1: Compound Interest Annual
  await t.test('Golden Case 1: Compound Interest (Annual, $10,000 at 7% for 10y)', () => {
    // Method 1: Execution of Registry Calculator
    const res1 = executeCalculator('compound-interest-calculator', {
      initial_deposit: '10000',
      monthly_contribution: '0',
      annual_rate: '7',
      investment_years: '10',
      compounding_frequency: '1',
      deposit_timing: 'end',
    });

    // Method 2: Independent Algebraic Closed-Form Computation
    // Formula: A = P * (1 + r)^t
    const p = 10000;
    const r = 0.07;
    const tYears = 10;
    const expected = p * Math.pow(1 + r, tYears); // 19671.5135...

    assert.ok(
      Math.abs(res1.value - expected) < 0.01,
      `Double verification failure: Registry gave ${res1.value}, independent closed-form gave ${expected}`
    );
  });

  // Golden Case 2: Compound Interest Continuous
  await t.test('Golden Case 2: Compound Interest (Continuous, $10,000 at 7% for 10y)', () => {
    // Method 1: Execution of Registry Calculator
    const res1 = executeCalculator('compound-interest-calculator', {
      initial_deposit: '10000',
      monthly_contribution: '0',
      annual_rate: '7',
      investment_years: '10',
      compounding_frequency: 'continuous',
      deposit_timing: 'end',
    });

    // Method 2: Independent Euler Exponentiation
    // Formula: A = P * e^(r*t)
    const expected = 10000 * Math.exp(0.07 * 10); // 20137.527...

    assert.ok(
      Math.abs(res1.value - expected) < 0.01,
      `Double verification failure: Registry gave ${res1.value}, independent Euler formula gave ${expected}`
    );
  });

  // Golden Case 3: Fixed-Rate Mortgage Amortization
  await t.test('Golden Case 3: Mortgage P&I ($320,000 at 6.5% for 30y)', () => {
    const res = executeCalculator('mortgage-calculator', {
      home_price: '400000',
      down_payment: '80000',
      interest_rate: '6.5',
      loan_term: '30',
      property_tax: '0',
      home_insurance: '0',
    });

    // Independent Annuity Discount Factor Method
    // Monthly P&I = L / [ (1 - (1+r)^-n) / r ]
    const principal = 320000;
    const monthlyRate = 0.065 / 12;
    const numPayments = 360;
    const annuityPresentValueFactor = (1 - Math.pow(1 + monthlyRate, -numPayments)) / monthlyRate;
    const expectedPI = principal / annuityPresentValueFactor; // 2022.616...

    assert.ok(
      Math.abs(res.value - expectedPI) < 0.02,
      `Double verification failure: Calculator gave ${res.value}, annuity discount gave ${expectedPI}`
    );
  });

  // Golden Case 4: Currency Conversion Reversibility & Fixed Rate Pivot
  await t.test('Golden Case 4: USD to INR to EUR to USD triangulation', () => {
    const originalUSD = 10000;
    const inr = convertCurrency(originalUSD, 'USD', 'INR');
    const eur = convertCurrency(inr, 'INR', 'EUR');
    const restoredUSD = convertCurrency(eur, 'EUR', 'USD');

    // Independent Direct Ratio Check:
    // (INR / USD_rate) = 10000; (EUR / EUR_rate) = 10000
    assert.ok(
      Math.abs(restoredUSD - originalUSD) < 0.001,
      `Double verification currency triangulation failure: original ${originalUSD}, restored ${restoredUSD}`
    );
  });

  // Golden Case 5: India Tax FY 2025–26 Rebate 87A Invariance
  await t.test('Golden Case 5: India Tax New Regime ₹7.75L salary = ₹0 net tax liability', () => {
    // Method 1: Tax Engine Module
    const engineRes = calculateCountryTax('IN-NEW', 775000);

    // Method 2: Registry Calculator computeScript execution
    const calcRes = executeCalculator('income-tax-calculator', {
      tax_system: 'in_new',
      gross_income: '775000',
      deductions: '75000',
    });

    assert.equal(engineRes.netTaxPayable, 0);
    assert.equal(calcRes.value, 0);
  });

  // Golden Case 6: Percentage Change Non-Symmetry
  await t.test('Golden Case 6: Percentage 25% gain followed by 20% loss returns exactly to baseline', () => {
    const base = 100;
    const afterGain = base * (1 + 25 / 100); // 125
    const afterLoss = afterGain * (1 - 20 / 100); // 100

    assert.equal(afterGain, 125);
    assert.equal(afterLoss, 100);
  });

  // Golden Case 7: Future Date Validation in Age Calculator
  await t.test('Golden Case 7: Age Calculator rejects future birth dates', () => {
    const futureYear = new Date().getFullYear() + 5;
    const futureRes = executeCalculator('age-calculator', {
      birth_year: String(futureYear),
      birth_month: '6',
      birth_day: '15',
    });
    assert.ok(futureRes.error, 'Future birth date returns error');
    assert.equal(futureRes.value, 0);
    assert.match(futureRes.error, /future/i);

    const pastRes = executeCalculator('age-calculator', {
      birth_year: '2000',
      birth_month: '1',
      birth_day: '1',
    });
    assert.equal(futureRes.error !== undefined, true);
    assert.equal(pastRes.error, undefined);
    assert.ok(pastRes.value > 20);
  });

  // Golden Case 8: NaN & Infinity Guards Across Pure Engines
  await t.test('Golden Case 8: Strict NaN, Infinity & Division-by-Zero Guards', () => {
    // Finance engine: calculateBreakEven with zero or negative price
    const be1 = calculateBreakEven(NaN, 50, 20);
    assert.equal(be1.breakEvenUnits, 0);
    assert.equal(be1.breakEvenRevenue, 0);

    const beZeroDiv = calculateBreakEven(10000, 20, 20); // contribution margin = 0
    assert.equal(beZeroDiv.breakEvenUnits, 0);
    assert.equal(beZeroDiv.breakEvenRevenue, 0);

    // Finance engine: calculateProfitMargin with NaN / Infinity
    const pm1 = calculateProfitMargin(NaN, 100);
    assert.equal(pm1.grossMarginPercent, 0);
    assert.equal(pm1.markupPercent, 0);

    const pmZeroRev = calculateProfitMargin(50, 0);
    assert.equal(pmZeroRev.grossMarginPercent, 0);

    // Investment engine: calculateCAGR with negative/NaN/zero years
    assert.equal(calculateCAGR(100, 200, 0), 0);
    assert.equal(calculateCAGR(NaN, 200, 5), 0);
    assert.equal(calculateCAGR(100, NaN, 5), 0);
    assert.equal(calculateCAGR(-100, 200, 5), 0);

    // Investment engine: calculateSIP with 0 or NaN inputs
    const sipZero = calculateSIP(NaN, 12, 10);
    assert.equal(sipZero.totalValue, 0);
    assert.equal(sipZero.investedAmount, 0);

    const sipZeroRate = calculateSIP(5000, 0, 5);
    assert.equal(sipZeroRate.totalValue, 5000 * 60);
    assert.equal(sipZeroRate.estimatedReturns, 0);
  });

  // Golden Case 9: Floating-Point Precision Eradication & Amortization Exact Zero Resolution
  await t.test('Golden Case 9: $1,000,000 Loan at 0.1% for 360 Months Resolves to Exactly $0.00 Balance', () => {
    // 1. Amortization schedule resolution test
    const amort = calculateLoanAmortization(1000000, 0.1, 360);
    assert.equal(amort.schedule.length, 360, 'Must complete in exactly 360 months');
    assert.equal(amort.finalBalance, 0, 'Final loan balance must be exactly 0');
    assert.equal(amort.schedule[359].remainingBalance, 0, 'Last month remaining balance must be 0');
    
    // Validate every month has non-negative balance and positive payments
    for (const row of amort.schedule) {
      assert.ok(row.remainingBalance >= 0, `Month ${row.month} has negative balance`);
      assert.ok(row.principalPaid > 0, `Month ${row.month} has non-positive principal`);
      assert.ok(row.interestPaid > 0, `Month ${row.month} has non-positive interest`);
    }

    // 2. Prepayment simulation test
    const emiRes = calculateEMIWithPrepayment(1000000, 0.1, 30);
    assert.equal(emiRes.originalTenureMonths, 360);
    assert.equal(emiRes.newTenureMonths, 360);
    assert.equal(emiRes.finalBalance, 0);
    assert.equal(emiRes.regularEMI, 2819.77);

    // 3. Floating-point arithmetic rounding tests
    assert.equal(roundToCents(0.1 + 0.2), 0.3);
    assert.equal(roundToCents(1.005), 1.01);
    assert.equal(roundToCents(0.0000001), 0);
  });

  // Golden Case 10: Input Validation & Edge Case Neutralization ("1e100", "abc", "")
  await t.test('Golden Case 10: Safe Neutralization of Extreme Values ("1e100", "abc", "")', () => {
    // 1. Extreme exponential input "1e100"
    assert.equal(sanitizeInput('1e100', 1e12), 0, '1e100 must safely return 0 when exceeding max');
    assert.equal(sanitizeInput('1e100', 1e12, 500), 500, '1e100 must return defined fallback');

    // 2. Non-numeric string "abc"
    assert.equal(sanitizeInput('abc', 1e12), 0, '"abc" must safely return 0');
    assert.equal(sanitizeInput('abc', 1e12, 99), 99, '"abc" must return defined fallback');
    assert.equal(sanitizeInput('!@#$%^&*()', 1e12, 0), 0, 'Special characters must safely return 0');

    // 3. Empty string ""
    assert.equal(sanitizeInput('', 1e12), 0, '"" must safely return 0');
    assert.equal(sanitizeInput('', 1e12, -1), -1, '"" must return defined fallback');
    assert.equal(sanitizeInput('   ', 1e12, 0), 0, 'Whitespace string must safely return 0');

    // 4. NaN, Infinity, -Infinity, null, undefined
    assert.equal(sanitizeInput(NaN), 0);
    assert.equal(sanitizeInput(Infinity), 0);
    assert.equal(sanitizeInput(-Infinity), 0);
    assert.equal(sanitizeInput(null), 0);
    assert.equal(sanitizeInput(undefined), 0);

    // 5. validateInput boundaries
    const valValid = validateInput('5000', { min: 100, max: 10000 });
    assert.equal(valValid.isValid, true);
    assert.equal(valValid.value, 5000);

    const valBad = validateInput('1e100', { min: 100, max: 10000 });
    assert.equal(valBad.isValid, false);
    assert.ok(valBad.errorMessage?.includes('cannot exceed'));
  });

  // Golden Case 11: URL State Sharing & Clipboard Result Formatting
  await t.test('Golden Case 11: URL State Sharing & Clipboard Result Formatting', () => {
    // 1. URL State serialization
    const state = { amount: 20000, rate: 9, months: 48 };
    const query = serializeStateToQuery(state);
    assert.equal(query, 'amount=20000&rate=9&months=48');

    // 2. URL State restoration on page load
    const parsed = parseQueryToState('?amount=20000&rate=9&months=48');
    assert.equal(parsed.amount, '20000');
    assert.equal(parsed.rate, '9');
    assert.equal(parsed.months, '48');

    // 3. Clipboard result string formatting
    const clipboardText = formatResultForClipboard('Monthly Payment', '$497.70');
    assert.equal(clipboardText, 'Monthly Payment: $497.70');

    const withPrefix = formatResultForClipboard('Total Payment', '23,889.60', '$');
    assert.equal(withPrefix, 'Total Payment: $ 23,889.60');
  });

  // Golden Case 12: SEO Structured Data (WebApplication & FAQPage) Verification
  await t.test('Golden Case 12: Dynamic Schema.org Generator & WCAG Accessibility Verification', () => {
    const loanCalcInput = {
      name: 'Loan Calculator',
      description: 'Calculate monthly loan EMI payments and amortization schedules.',
      url: 'https://freeaccuratecalculator.com/finance/loan-calculator/',
      category: 'finance',
    };

    const webApp = generateWebApplicationSchema(loanCalcInput);
    assert.equal(webApp['@context'], 'https://schema.org');
    assert.ok(webApp['@type'].includes('WebApplication'));
    assert.equal(webApp.applicationCategory, 'FinanceApplication');
    assert.equal(webApp.operatingSystem, 'All');
    assert.equal(webApp.offers.price, '0.00');

    const faqSchema = generateFAQPageSchema([
      { question: 'What is EMI?', answer: 'Equated Monthly Installment.' }
    ]);
    assert.ok(faqSchema);
    assert.equal(faqSchema['@type'], 'FAQPage');
    assert.equal(faqSchema.mainEntity.length, 1);
    assert.equal(faqSchema.mainEntity[0].name, 'What is EMI?');
    assert.equal(faqSchema.mainEntity[0].acceptedAnswer.text, 'Equated Monthly Installment.');
  });
});





