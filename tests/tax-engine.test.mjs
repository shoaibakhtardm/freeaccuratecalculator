// tests/tax-engine.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCountryTax,
  calculateCustomRateTax,
  calculateCustomSlabsTax,
  calculateProgressiveTax,
} from '../src/engines/taxEngine.ts';
import { COUNTRY_TAX_RULES } from '../src/data/taxRules.ts';

test('Tax Engine — Multi-Country Rule Integrity & Dates', async (t) => {
  await t.test('All country rules have official authorities and 2026 verification dates', () => {
    const keys = ['IN-NEW', 'IN-OLD', 'US-FED-SINGLE', 'US-FED-JOINT', 'GB-EWNI', 'GB-SCOTLAND', 'AU-RESIDENT', 'CA-FEDERAL'];
    for (const k of keys) {
      const rule = COUNTRY_TAX_RULES[k];
      assert.ok(rule, `Rule ${k} must exist`);
      assert.ok(rule.sourceAuthority, `Rule ${k} must have source authority`);
      assert.ok(rule.sourceUrl.startsWith('https://'), `Rule ${k} must link to official source`);
      assert.equal(rule.lastVerifiedDate, '2026-09-09');
      assert.ok(rule.taxYear, `Rule ${k} must declare tax year`);
    }
  });
});

test('Tax Engine — India FY 2025–26 (AY 2026–27) Calculations', async (t) => {
  await t.test('New Regime: Salary up to ₹7,75,000 has ₹0 net tax (₹75k std deduction + 87A rebate)', () => {
    const res = calculateCountryTax('IN-NEW', 775000);
    assert.equal(res.totalDeductions, 75000);
    assert.equal(res.taxableIncome, 700000);
    assert.equal(res.rebate, 20000); // Rebate equals tax before rebate (max 25,000)
    assert.equal(res.netTaxPayable, 0);
  });

  await t.test('New Regime: ₹10,00,000 salary calculation with 4% cess', () => {
    const res = calculateCountryTax('IN-NEW', 1000000);
    assert.equal(res.totalDeductions, 75000);
    // Taxable: 9,25,000
    // 0-3L: 0
    // 3L-7L: 4,00,000 * 5% = 20,000
    // 7L-9.25L: 2,25,000 * 10% = 22,500
    // Tax before cess: 42,500
    // 4% cess: 1,700
    // Net tax: 44,200
    assert.equal(res.taxBeforeCess, 42500);
    assert.equal(res.cessOrLevy, 1700);
    assert.equal(res.netTaxPayable, 44200);
  });

  await t.test('Old Regime: ₹5,50,000 salary has ₹0 net tax (₹50k std deduction + 87A rebate)', () => {
    const res = calculateCountryTax('IN-OLD', 550000);
    assert.equal(res.totalDeductions, 50000);
    assert.equal(res.taxableIncome, 500000);
    assert.equal(res.netTaxPayable, 0);
  });
});

test('Tax Engine — US Federal Tax Calculations (2025/2026)', async (t) => {
  await t.test('Single Filer: $75,000 income applies $15,000 standard deduction and progressive brackets', () => {
    const res = calculateCountryTax('US-FED-SINGLE', 75000);
    assert.equal(res.totalDeductions, 15000);
    assert.equal(res.taxableIncome, 60000);
    // 10% on 11,925 = 1,192.50
    // 12% on (48,475 - 11,925 = 36,550) = 4,386.00
    // 22% on (60,000 - 48,475 = 11,525) = 2,535.50
    // Total = 8,114.00
    assert.equal(res.netTaxPayable, 8114);
    assert.equal(res.effectiveTaxRate, 10.82);
    assert.equal(res.marginalTaxRate, 22);
  });

  await t.test('Married Joint: $120,000 income applies $30,000 standard deduction', () => {
    const res = calculateCountryTax('US-FED-JOINT', 120000);
    assert.equal(res.totalDeductions, 30000);
    assert.equal(res.taxableIncome, 90000);
    // 10% on 23,850 = 2,385.00
    // 12% on (90,000 - 23,850 = 66,150) = 7,938.00
    // Total = 10,323.00
    assert.equal(res.netTaxPayable, 10323);
    assert.equal(res.marginalTaxRate, 12);
  });
});

test('Tax Engine — UK England vs Scotland Jurisdiction Divergence', async (t) => {
  await t.test('England/Wales/NI vs Scotland difference on £60,000 income', () => {
    const resEW = calculateCountryTax('GB-EWNI', 60000);
    const resScot = calculateCountryTax('GB-SCOTLAND', 60000);

    // Both receive £12,570 personal allowance
    assert.equal(resEW.totalDeductions, 12570);
    assert.equal(resScot.totalDeductions, 12570);
    assert.equal(resEW.taxableIncome, 47430);
    assert.equal(resScot.taxableIncome, 47430);

    // Scottish tax differs from England/Wales rates
    assert.notEqual(resEW.netTaxPayable, resScot.netTaxPayable);
    assert.ok(resScot.netTaxPayable > resEW.netTaxPayable, 'Scotland has higher intermediate/higher rate tax');
  });

  await t.test('Personal allowance tapers above £100,000 and reaches £0 above £125,140', () => {
    const res100k = calculateCountryTax('GB-EWNI', 100000);
    assert.equal(res100k.totalDeductions, 12570);

    const res110k = calculateCountryTax('GB-EWNI', 110000);
    // £10,000 over 100k reduces allowance by £5,000 => £7,570
    assert.equal(res110k.totalDeductions, 7570);

    const res130k = calculateCountryTax('GB-EWNI', 130000);
    assert.equal(res130k.totalDeductions, 0);
  });
});

test('Tax Engine — Australia Revised Stage 3 & Medicare Levy', async (t) => {
  await t.test('AU Resident: $80,000 salary computes Stage 3 tax plus 2% Medicare levy', () => {
    const res = calculateCountryTax('AU-RESIDENT', 80000);
    // 0 to 18.2k: 0
    // 18.2k to 45k: 26,800 * 16% = 4,288
    // 45k to 80k: 35,000 * 30% = 10,500
    // Base: 14,788
    // Medicare (2% of 80k): 1,600
    // Total: 16,388
    assert.equal(res.taxBeforeCess, 14788);
    assert.equal(res.cessOrLevy, 1600);
    assert.equal(res.netTaxPayable, 16388);
  });
});

test('Tax Engine — User-Selectable Custom Tax Rate and Custom Slabs Overrides', async (t) => {
  await t.test('Custom flat tax rate calculates exact specified percentage', () => {
    const res = calculateCustomRateTax(100000, 25, 10000);
    // Taxable: 90,000 * 25% = 22,500
    assert.equal(res.taxableIncome, 90000);
    assert.equal(res.netTaxPayable, 22500);
    assert.equal(res.effectiveTaxRate, 22.5);
    assert.equal(res.annualTakeHome, 77500);
  });

  await t.test('Custom progressive tax slabs calculate dynamic tiers correctly', () => {
    const customSlabs = [
      { thresholdMin: 0, thresholdMax: 20000, rate: 0.10 },
      { thresholdMin: 20000, thresholdMax: 60000, rate: 0.20 },
      { thresholdMin: 60000, thresholdMax: null, rate: 0.30 },
    ];
    const res = calculateCustomSlabsTax(100000, customSlabs, 10000);
    // Taxable: 90,000
    // 0-20k: 2,000
    // 20k-60k: 8,000
    // 60k-90k: 9,000
    // Total: 19,000
    assert.equal(res.taxableIncome, 90000);
    assert.equal(res.netTaxPayable, 19000);
    assert.equal(res.effectiveTaxRate, 19.0);
    assert.equal(res.annualTakeHome, 81000);
  });

  await t.test('Handles zero income and zero deductions safely', () => {
    const res0 = calculateCountryTax('US-FED-SINGLE', 0);
    assert.equal(res0.netTaxPayable, 0);
    assert.equal(res0.effectiveTaxRate, 0);
  });
});
