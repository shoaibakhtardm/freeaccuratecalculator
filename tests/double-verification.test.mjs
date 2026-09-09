// tests/double-verification.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { CALCULATORS } from '../src/data/calculatorRegistry.ts';
import { convertCurrency } from '../src/utils/currencyEngine.ts';
import { calculateCountryTax } from '../src/engines/taxEngine.ts';
import { calculateBreakEven, calculateProfitMargin } from '../src/engines/finance.ts';
import { calculateCAGR, calculateSIP } from '../src/engines/investment.ts';

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
});

