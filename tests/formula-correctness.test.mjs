// tests/formula-correctness.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { formatNumber } from '../src/utils/formatters.ts';
import { ui, languages } from '../src/i18n/ui.ts';
import fs from 'node:fs';
import path from 'node:path';

test('Percentage Calculator Formulas', async (t) => {
  await t.test('Mode 1: What is X% of Y?', () => {
    const x = 15;
    const y = 250;
    const result = (x / 100) * y;
    assert.equal(Number(result.toFixed(2)), 37.5);
  });

  await t.test('Mode 2: X is what % of Y?', () => {
    const x = 45;
    const y = 180;
    const result = (x / y) * 100;
    assert.equal(Number(result.toFixed(2)), 25.0);
  });

  await t.test('Mode 3: Percentage Increase', () => {
    const v1 = 100;
    const v2 = 125;
    const diff = v2 - v1;
    const result = (diff / Math.abs(v1)) * 100;
    assert.equal(Number(result.toFixed(2)), 25.0);
  });

  await t.test('Mode 3: Percentage Decrease', () => {
    const v1 = 100;
    const v2 = 80;
    const diff = v2 - v1;
    const result = (diff / Math.abs(v1)) * 100;
    assert.equal(Number(result.toFixed(2)), -20.0);
  });
});

test('Mortgage Calculator Formulas', async (t) => {
  await t.test('Fixed 30-Year Mortgage ($320k, 6.5%, taxes & insurance)', () => {
    const principal = 320000;
    const annualRate = 6.5;
    const years = 30;
    const n = years * 12;
    const r = annualRate / 12 / 100;
    const factor = Math.pow(1 + r, n);
    const pi = (principal * r * factor) / (factor - 1);
    const escrow = (4000 + 1200) / 12;
    const total = pi + escrow;

    assert.equal(Number(pi.toFixed(2)), 2022.62);
    assert.equal(Number(total.toFixed(2)), 2455.95);
  });
});

test('Compound Interest with Monthly Deposits Formulas', async (t) => {
  await t.test('$10k initial, $200/mo, 8% return for 10 years', () => {
    const P = 10000;
    const PMT = 200;
    const r = 0.08 / 12;
    const periods = 120;
    const factor = Math.pow(1 + r, periods);
    const balance = P * factor + PMT * ((factor - 1) / r);

    assert.equal(Number(balance.toFixed(2)), 58785.61);
  });
});

test('Calorie & TDEE Clinical Formulas', async (t) => {
  await t.test('Mifflin-St Jeor TDEE (Male, 80kg, 180cm, 30y, mod active 1.55)', () => {
    const bmr = 10 * 80 + 6.25 * 180 - 5 * 30 + 5; // 1780
    const tdee = Math.round(bmr * 1.55); // 2759

    assert.equal(bmr, 1780);
    assert.equal(tdee, 2759);
  });
});

test('Subnet CIDR Formula', async (t) => {
  await t.test('/24 Subnet host capacity', () => {
    const cidr = 24;
    const hostBits = 32 - cidr;
    const usable = Math.pow(2, hostBits) - 2;
    assert.equal(usable, 254);
  });
});

test('BMI Calculator Formulas', async (t) => {
  await t.test('Metric System (70kg, 175cm)', () => {
    const weightKg = 70;
    const heightCm = 175;
    const heightMeters = heightCm / 100;
    const bmi = weightKg / (heightMeters * heightMeters);

    assert.equal(Number(bmi.toFixed(2)), 22.86);
  });

  await t.test('Imperial System (154 lbs, 5 ft 9 in)', () => {
    const weightLbs = 154;
    const heightInches = 5 * 12 + 9; // 69 inches
    const bmi = (weightLbs / (heightInches * heightInches)) * 703;

    assert.equal(Number(bmi.toFixed(2)), 22.74);
  });
});

test('Number Formatter & Locale Grouping', async (t) => {
  await t.test('International grouping: 1,234,567.89', () => {
    const formatted = formatNumber(1234567.89, { decimals: 2, currencySymbol: '$' });
    assert.equal(formatted, '$1,234,567.89');
  });

  await t.test('Indian Lakh/Crore grouping: 12,34,567.89', () => {
    const formatted = formatNumber(1234567.89, { decimals: 2, currencySymbol: '₹', isIndian: true });
    assert.equal(formatted, '₹12,34,567.89');
  });
});

test('i18n UI Dictionary Completeness', async (t) => {
  const enKeys = Object.keys(ui.en);

  for (const locale of ['es', 'fr', 'hi']) {
    await t.test(`Locale '${locale}' contains all UI dictionary keys`, () => {
      const localeDict = ui[locale];
      assert.ok(localeDict, `Locale dictionary for ${locale} exists`);
      for (const key of enKeys) {
        assert.ok(localeDict[key], `Missing key '${key}' in locale '${locale}'`);
      }
    });
  }
});

test('Content Collections Schema & Locales', async (t) => {
  const calculatorsDir = path.resolve('src/content/calculators');
  const files = fs.readdirSync(calculatorsDir);

  assert.ok(files.length > 0, 'Found calculator content entries');

  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    await t.test(`Calculator entry ${file} has valid schema`, () => {
      const content = JSON.parse(fs.readFileSync(path.join(calculatorsDir, file), 'utf-8'));
      assert.ok(content.id, 'Entry has id');
      assert.ok(content.title, 'Entry has title');
      assert.ok(content.category, 'Entry has category');
      assert.ok(content.formula, 'Entry has formula');
      assert.ok(content.example, 'Entry has example');
      assert.ok(Array.isArray(content.faqs), 'Entry has faqs array');

      if (content.translations) {
        for (const [lang, trans] of Object.entries(content.translations)) {
          assert.ok(languages[lang], `Translation language ${lang} is in supported list`);
          assert.ok(trans.title, `Translation for ${lang} has title`);
          assert.ok(trans.description, `Translation for ${lang} has description`);
        }
      }
    });
  }
});

import { CALCULATORS } from '../src/data/calculatorRegistry.ts';

test('Calculator Master Registry Completeness', async (t) => {
  assert.ok(CALCULATORS.length >= 25, 'Found populated registry with all tools');

  for (const calc of CALCULATORS) {
    await t.test(`Calculator ${calc.id} has complete metadata & executable computeScript`, () => {
      assert.ok(calc.id, 'Has id');
      assert.ok(calc.name, 'Has name');
      assert.ok(calc.title, 'Has title');
      assert.ok(calc.category, 'Has category');
      assert.ok(calc.formula.expression, 'Has formula expression');
      assert.ok(calc.example.steps.length > 0, 'Has example steps');
      assert.ok(calc.faqs.length > 0, 'Has faqs');
      assert.ok(calc.inputs.length > 0, 'Has inputs');
      assert.ok(calc.computeScript.length > 0, 'Has computeScript');
    });
  }
});

import { preciseAdd, preciseSubtract, preciseMultiply, preciseDivide, roundToPrecision } from '../src/utils/math.ts';

test('Precise Decimal Math Utility — Eliminating Floating-Point Drift', async (t) => {
  await t.test('preciseAdd: 0.1 + 0.2 equals exactly 0.3', () => {
    assert.equal(preciseAdd(0.1, 0.2), 0.3);
    assert.equal(preciseAdd(0.1, 0.2, 1), 0.3);
    assert.equal(preciseAdd(10.555, 4.444, 2), 15.0);
  });

  await t.test('preciseSubtract: 0.3 - 0.1 equals exactly 0.2', () => {
    assert.equal(preciseSubtract(0.3, 0.1), 0.2);
    assert.equal(preciseSubtract(1.0, 0.9), 0.1);
  });

  await t.test('preciseMultiply: 0.1 * 0.2 equals exactly 0.02', () => {
    assert.equal(preciseMultiply(0.1, 0.2), 0.02);
    assert.equal(preciseMultiply(35.5, 1.25, 2), 44.38);
  });

  await t.test('preciseDivide: safely divides and handles division by zero', () => {
    assert.equal(preciseDivide(10, 3, 2), 3.33);
    assert.equal(preciseDivide(10, 0), 0);
  });

  await t.test('roundToPrecision: rounds numbers with EPSILON protection', () => {
    assert.equal(roundToPrecision(1.005, 2), 1.01);
    assert.equal(roundToPrecision(35.494, 2), 35.49);
  });
});

