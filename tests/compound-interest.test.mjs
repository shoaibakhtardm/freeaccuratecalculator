// tests/compound-interest.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { CALCULATORS } from '../src/data/calculatorRegistry.ts';

function runCompoundInterest(inputs) {
  const calc = CALCULATORS.find((c) => c.id === 'compound-interest-calculator');
  if (!calc) throw new Error('Compound interest calculator not found in registry');
  const fn = new Function('inputs', calc.computeScript);
  return fn(inputs);
}

test('Compound Interest Calculator — Compounding Frequencies Monotonicity', async (t) => {
  const baseInputs = {
    initial_deposit: '10000',
    monthly_contribution: '0',
    annual_rate: '7',
    investment_years: '10',
    deposit_timing: 'end',
  };

  await t.test('Computes annual compounding (n=1) accurately', () => {
    const res = runCompoundInterest({ ...baseInputs, compounding_frequency: '1' });
    // 10000 * (1.07)^10 = 19671.51
    assert.equal(Number(res.value.toFixed(2)), 19671.51);
  });

  await t.test('Computes semi-annual compounding (n=2) accurately', () => {
    const res = runCompoundInterest({ ...baseInputs, compounding_frequency: '2' });
    // 10000 * (1.035)^20 = 19897.89
    assert.equal(Number(res.value.toFixed(2)), 19897.89);
  });

  await t.test('Computes quarterly compounding (n=4) accurately', () => {
    const res = runCompoundInterest({ ...baseInputs, compounding_frequency: '4' });
    // 10000 * (1 + 0.07/4)^40 = 20015.97
    assert.equal(Number(res.value.toFixed(2)), 20015.97);
  });

  await t.test('Computes monthly compounding (n=12) accurately', () => {
    const res = runCompoundInterest({ ...baseInputs, compounding_frequency: '12' });
    // 10000 * (1 + 0.07/12)^120 = 20096.61
    assert.equal(Number(res.value.toFixed(2)), 20096.61);
  });

  await t.test('Computes daily compounding (n=365) accurately', () => {
    const res = runCompoundInterest({ ...baseInputs, compounding_frequency: '365' });
    // 10000 * (1 + 0.07/365)^3650 = 20136.18
    assert.equal(Number(res.value.toFixed(2)), 20136.18);
  });

  await t.test('Computes continuous compounding (e^rt) accurately', () => {
    const res = runCompoundInterest({ ...baseInputs, compounding_frequency: 'continuous' });
    // 10000 * e^(0.07 * 10) = 10000 * e^(0.7) = 20137.53
    assert.equal(Number(res.value.toFixed(2)), 20137.53);
  });

  await t.test('Strict mathematical hierarchy holds: Continuous > Daily > Monthly > Quarterly > Semi-Annual > Annual', () => {
    const annual = runCompoundInterest({ ...baseInputs, compounding_frequency: '1' }).value;
    const semi = runCompoundInterest({ ...baseInputs, compounding_frequency: '2' }).value;
    const quarterly = runCompoundInterest({ ...baseInputs, compounding_frequency: '4' }).value;
    const monthly = runCompoundInterest({ ...baseInputs, compounding_frequency: '12' }).value;
    const daily = runCompoundInterest({ ...baseInputs, compounding_frequency: '365' }).value;
    const continuous = runCompoundInterest({ ...baseInputs, compounding_frequency: 'continuous' }).value;

    assert.ok(continuous > daily, 'Continuous must exceed daily');
    assert.ok(daily > monthly, 'Daily must exceed monthly');
    assert.ok(monthly > quarterly, 'Monthly must exceed quarterly');
    assert.ok(quarterly > semi, 'Quarterly must exceed semi-annual');
    assert.ok(semi > annual, 'Semi-annual must exceed annual');
  });
});

test('Compound Interest Calculator — Annuity Timing (End vs Beginning of Period)', async (t) => {
  const inputsEnd = {
    initial_deposit: '10000',
    monthly_contribution: '200',
    annual_rate: '8',
    investment_years: '10',
    compounding_frequency: '12',
    deposit_timing: 'end',
  };

  const inputsBeg = {
    ...inputsEnd,
    deposit_timing: 'beginning',
  };

  await t.test('Beginning of period deposits compound higher than end of period', () => {
    const resEnd = runCompoundInterest(inputsEnd);
    const resBeg = runCompoundInterest(inputsBeg);

    assert.equal(Number(resEnd.value.toFixed(2)), 58785.61);
    assert.ok(resBeg.value > resEnd.value, 'Annuity due must exceed ordinary annuity');
    // Difference is approximately 1 month interest on contributions
    const diff = resBeg.value - resEnd.value;
    assert.ok(diff > 200 && diff < 300);
  });

  await t.test('Zero principal, zero deposits, and zero rate edge cases return clean numbers without NaN', () => {
    const resZeroRate = runCompoundInterest({
      initial_deposit: '5000',
      monthly_contribution: '100',
      annual_rate: '0',
      investment_years: '5',
      compounding_frequency: '12',
    });
    // 5000 + 100 * 60 = 11000
    assert.equal(resZeroRate.value, 11000);
    assert.ok(!isNaN(resZeroRate.value));
  });
});
