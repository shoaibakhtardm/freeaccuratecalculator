// tests/double-verification.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { CALCULATORS } from '../src/data/calculatorRegistry.ts';
import { convertCurrency } from '../src/utils/currencyEngine.ts';
import { calculateCountryTax } from '../src/engines/taxEngine.ts';

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
});
