// tests/currency-system.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  CURRENCIES,
  DEFAULT_CURRENCY,
  CURRENCY_LIST,
} from '../src/data/currencies.ts';
import {
  detectBrowserCurrency,
  formatCurrency,
  getCurrency,
  getCurrencySymbol,
  convertCurrency,
  formatConvertedCurrency,
  getExchangeRateMetadata,
} from '../src/utils/currency.ts';
import { CALCULATORS } from '../src/data/calculatorRegistry.ts';

test('Global Currency System — Centralized Currency Model', async (t) => {
  await t.test('Supported currencies include all required ISO codes and symbols', () => {
    const requiredCurrencies = [
      { code: 'USD', symbol: '$' },
      { code: 'INR', symbol: '₹' },
      { code: 'EUR', symbol: '€' },
      { code: 'GBP', symbol: '£' },
      { code: 'CAD', symbol: 'C$' },
      { code: 'AUD', symbol: 'A$' },
      { code: 'JPY', symbol: '¥' },
      { code: 'CNY', symbol: '¥' },
      { code: 'SGD', symbol: 'S$' },
      { code: 'AED', symbol: 'د.إ' },
      { code: 'SAR', symbol: 'ر.س' },
      { code: 'CHF', symbol: 'CHF' },
    ];

    for (const req of requiredCurrencies) {
      const config = CURRENCIES[req.code];
      assert.ok(config, `Currency config for ${req.code} must exist`);
      assert.equal(config.code, req.code);
      assert.equal(config.symbol, req.symbol);
      assert.ok(config.name, `Currency ${req.code} must have a descriptive name`);
      assert.ok(config.locale, `Currency ${req.code} must have a valid Intl locale`);
    }
  });

  await t.test('JPY uses 0 decimal places by default', () => {
    assert.equal(CURRENCIES.JPY.decimals, 0);
  });

  await t.test('INR specifies isIndian formatting flag', () => {
    assert.equal(CURRENCIES.INR.isIndian, true);
  });

  await t.test('DEFAULT_CURRENCY is USD', () => {
    assert.equal(DEFAULT_CURRENCY, 'USD');
  });

  await t.test('CURRENCY_LIST contains all configured currencies', () => {
    assert.equal(CURRENCY_LIST.length, Object.keys(CURRENCIES).length);
    assert.ok(CURRENCY_LIST.some((c) => c.code === 'USD'));
    assert.ok(CURRENCY_LIST.some((c) => c.code === 'INR'));
  });
});

test('Global Currency System — Intelligent Client-Side Locale Detection', async (t) => {
  await t.test('Detects INR for India locales', () => {
    assert.equal(detectBrowserCurrency(['en-IN']), 'INR');
    assert.equal(detectBrowserCurrency(['hi-IN']), 'INR');
  });

  await t.test('Detects USD for United States locales', () => {
    assert.equal(detectBrowserCurrency(['en-US']), 'USD');
  });

  await t.test('Detects GBP for United Kingdom locales', () => {
    assert.equal(detectBrowserCurrency(['en-GB']), 'GBP');
  });

  await t.test('Detects CAD for Canada locales', () => {
    assert.equal(detectBrowserCurrency(['en-CA']), 'CAD');
    assert.equal(detectBrowserCurrency(['fr-CA']), 'CAD');
  });

  await t.test('Detects AUD for Australia locales', () => {
    assert.equal(detectBrowserCurrency(['en-AU']), 'AUD');
  });

  await t.test('Detects EUR for Eurozone locales', () => {
    assert.equal(detectBrowserCurrency(['de-DE']), 'EUR');
    assert.equal(detectBrowserCurrency(['fr-FR']), 'EUR');
    assert.equal(detectBrowserCurrency(['es-ES']), 'EUR');
    assert.equal(detectBrowserCurrency(['it-IT']), 'EUR');
  });

  await t.test('Detects JPY for Japan locales', () => {
    assert.equal(detectBrowserCurrency(['ja-JP']), 'JPY');
    assert.equal(detectBrowserCurrency(['ja']), 'JPY');
  });

  await t.test('Detects CNY for China locales', () => {
    assert.equal(detectBrowserCurrency(['zh-CN']), 'CNY');
  });

  await t.test('Detects AED and SAR for Middle East locales', () => {
    assert.equal(detectBrowserCurrency(['ar-AE']), 'AED');
    assert.equal(detectBrowserCurrency(['ar-SA']), 'SAR');
  });

  await t.test('Falls back gracefully to USD for unknown or empty locales', () => {
    assert.equal(detectBrowserCurrency([]), 'USD');
    assert.equal(detectBrowserCurrency(['xx-YY']), 'USD');
    assert.equal(detectBrowserCurrency(null), 'USD');
  });
});

test('Global Currency System — Intl.NumberFormat Formatting', async (t) => {
  await t.test('Formats USD with standard comma groupings and 2 decimals', () => {
    const formatted = formatCurrency(1234567.89, 'USD');
    // Normalize non-breaking spaces if any
    const clean = formatted.replace(/\u00a0/g, ' ');
    assert.ok(clean.includes('$'), 'Should include $ symbol');
    assert.ok(clean.includes('1,234,567.89'), 'Should use US million comma groupings');
  });

  await t.test('Formats INR with Indian numbering system (Lakhs and Crores)', () => {
    const formattedLakh = formatCurrency(100000, 'INR', { decimals: 0 });
    const formattedCrore = formatCurrency(10000000, 'INR', { decimals: 0 });
    const cleanLakh = formattedLakh.replace(/\u00a0/g, ' ');
    const cleanCrore = formattedCrore.replace(/\u00a0/g, ' ');

    assert.ok(cleanLakh.includes('₹'), 'Should include ₹ symbol');
    assert.ok(cleanLakh.includes('1,00,000'), '1 Lakh must format as 1,00,000');
    assert.ok(cleanCrore.includes('1,00,00,000'), '1 Crore must format as 1,00,00,000');
  });

  await t.test('Formats JPY with 0 decimals', () => {
    const formatted = formatCurrency(10000, 'JPY');
    const clean = formatted.replace(/\u00a0/g, ' ');
    assert.ok(clean.includes('¥') || clean.includes('JP¥'), 'Should include yen symbol or code');
    assert.ok(clean.includes('10,000'), 'Should group thousands');
    assert.ok(!clean.includes('.00'), 'JPY must have 0 decimals');
  });

  await t.test('Formats EUR with European standard currency formatting', () => {
    const formatted = formatCurrency(10000, 'EUR');
    assert.ok(formatted.includes('€'), 'Should include € symbol');
    assert.ok(formatted.includes('10,000') || formatted.includes('10.000'), 'Should format thousands');
  });
});

test('Global Currency System — Real Bidirectional Currency Conversion', async (t) => {
  await t.test('Centralized snapshot contains valid metadata and non-live transparent timestamp', () => {
    const meta = getExchangeRateMetadata();
    assert.equal(meta.base, 'USD');
    assert.ok(meta.timestamp.includes('2026'));
    assert.ok(meta.source.includes('Benchmark') || meta.source.includes('Central Bank'));
    assert.equal(meta.verifiedAt, '2026-09-09');
  });

  await t.test('Converts USD to INR accurately (1000 USD -> 83,950 INR)', () => {
    const inr = convertCurrency(1000, 'USD', 'INR');
    assert.equal(Number(inr.toFixed(2)), 83950.00);
  });

  await t.test('Converts INR to USD accurately (83,950 INR -> 1,000 USD)', () => {
    const usd = convertCurrency(83950, 'INR', 'USD');
    assert.equal(Number(usd.toFixed(2)), 1000.00);
  });

  await t.test('Converts EUR to USD accurately (925 EUR -> 1,000 USD)', () => {
    const usd = convertCurrency(925, 'EUR', 'USD');
    assert.equal(Number(usd.toFixed(2)), 1000.00);
  });

  await t.test('Converts GBP to USD accurately (785 GBP -> 1,000 USD)', () => {
    const usd = convertCurrency(785, 'GBP', 'USD');
    assert.equal(Number(usd.toFixed(2)), 1000.00);
  });

  await t.test('Converts USD to JPY with 0 decimal convention (1000 USD -> 147,500 JPY)', () => {
    const jpy = convertCurrency(1000, 'USD', 'JPY');
    assert.equal(Math.round(jpy), 147500);
  });

  await t.test('Cross-currency: Converts AED to INR (1000 AED -> ~22,859.09 INR)', () => {
    const inr = convertCurrency(1000, 'AED', 'INR');
    // 1000 / 3.6725 * 83.95 = 22859.0878
    assert.ok(inr > 22850 && inr < 22865);
  });

  await t.test('Cross-currency: Converts SAR to INR (1000 SAR -> ~22,380.70 INR)', () => {
    const inr = convertCurrency(1000, 'SAR', 'INR');
    // 1000 / 3.7510 * 83.95 = 22380.698
    assert.ok(inr > 22370 && inr < 22390);
  });

  await t.test('Reversible round-trip conversions approximately restore original value', () => {
    const pairs = [
      ['USD', 'INR'],
      ['USD', 'EUR'],
      ['USD', 'GBP'],
      ['USD', 'JPY'],
      ['AED', 'INR'],
      ['SAR', 'INR'],
      ['CAD', 'AUD'],
    ];

    const original = 5000;
    for (const [from, to] of pairs) {
      const converted = convertCurrency(original, from, to);
      const restored = convertCurrency(converted, to, from);
      assert.ok(
        Math.abs(restored - original) < 0.01,
        `Round-trip ${from} -> ${to} -> ${from} failed: expected ${original}, got ${restored}`
      );
    }
  });

  await t.test('formatConvertedCurrency produces formatted string with correct symbol and decimals', () => {
    const formatted = formatConvertedCurrency(1000, 'USD', 'INR');
    assert.ok(formatted.includes('₹'), 'Formatted output should contain ₹');
    assert.ok(formatted.includes('83,950'), 'Formatted output should contain converted numeric digits');
  });

  await t.test('Handles zero, NaN, and negative amounts safely without crash', () => {
    assert.equal(convertCurrency(0, 'USD', 'INR'), 0);
    assert.equal(convertCurrency(NaN, 'USD', 'INR'), 0);
    assert.equal(convertCurrency(-100, 'USD', 'USD'), -100);
  });
});

test('Global Currency System — Selective Relevance Across Calculators', async (t) => {
  const financialIds = [
    'mortgage-calculator',
    'loan-calculator',
    'emi-calculator',
    'compound-interest-calculator',
    'investment-calculator',
    'salary-calculator',
    'tax-calculator',
    'simple-interest-calculator',
    'auto-loan-calculator',
    'savings-goal-calculator',
  ];

  const nonFinancialIds = [
    'bmi-calculator',
    'age-calculator',
    'percentage-calculator',
    'scientific-calculator',
    'body-fat-calculator',
    'calorie-calculator',
    'fraction-calculator',
    'gpa-calculator',
    'date-calculator',
  ];

  await t.test('All financial calculators in registry or pages are tagged with finance category or currency inputs', () => {
    for (const id of financialIds) {
      const calc = CALCULATORS.find((c) => c.id === id);
      if (calc) {
        const isFinancial =
          calc.category === 'finance' ||
          calc.defaultResult.prefix === '$' ||
          calc.inputs.some((inp) => inp.unit === '$' || (typeof inp.label === 'string' && inp.label.includes('$')));
        assert.ok(isFinancial, `${id} should be identified as a currency-aware financial calculator`);
      }
    }
  });

  await t.test('Non-financial calculators do not have currency prefixes or units', () => {
    for (const id of nonFinancialIds) {
      const calc = CALCULATORS.find((c) => c.id === id);
      if (calc) {
        assert.notEqual(calc.category, 'finance', `${id} should not be finance category`);
        assert.notEqual(calc.defaultResult.prefix, '$', `${id} should not have $ result prefix`);
        const hasDollarInput = calc.inputs.some((inp) => inp.unit === '$');
        assert.equal(hasDollarInput, false, `${id} should not have dollar unit inputs`);
      }
    }
  });

  await t.test('Health pages (e.g. BMI) do not contain CurrencySwitcher', () => {
    const bmiPage = fs.readFileSync(path.join(process.cwd(), 'src/pages/health/bmi-calculator.astro'), 'utf-8');
    assert.ok(!bmiPage.includes('CurrencySwitcher'), 'BMI Calculator page must not contain CurrencySwitcher');
  });

  await t.test('EMI calculator contains CurrencySwitcher', () => {
    const emiPage = fs.readFileSync(path.join(process.cwd(), 'src/pages/finance/emi-calculator.astro'), 'utf-8');
    assert.ok(emiPage.includes('CurrencySwitcher'), 'EMI Calculator must contain CurrencySwitcher');
    assert.ok(emiPage.includes('window.facGetActiveCurrency'), 'EMI Calculator must read active global currency');
    assert.ok(emiPage.includes('currencychange'), 'EMI Calculator must listen to currencychange event');
  });
});

test('Global Currency System — Header & Calculator Two-Way Synchronization Contract', async (t) => {
  await t.test('Layout.astro defines global currency contract window helpers', () => {
    const layout = fs.readFileSync(path.join(process.cwd(), 'src/layouts/Layout.astro'), 'utf-8');
    assert.ok(layout.includes('facGetActiveCurrency'), 'Layout must expose window.facGetActiveCurrency');
    assert.ok(layout.includes('facSetActiveCurrency'), 'Layout must expose window.facSetActiveCurrency');
    assert.ok(layout.includes('facGetCurrencyInfo'), 'Layout must expose window.facGetCurrencyInfo');
    assert.ok(layout.includes('currencychange'), 'Layout must dispatch currencychange CustomEvent');
  });

  await t.test('CurrencySwitcher component dispatches to facSetActiveCurrency and listens to currencychange', () => {
    const switcher = fs.readFileSync(path.join(process.cwd(), 'src/components/common/CurrencySwitcher.astro'), 'utf-8');
    assert.ok(switcher.includes('facSetActiveCurrency'), 'CurrencySwitcher must call facSetActiveCurrency on change');
    assert.ok(switcher.includes('currencychange'), 'CurrencySwitcher must update on currencychange event');
  });

  await t.test('HistoryDrawer stores active currency with calculation records', () => {
    const history = fs.readFileSync(path.join(process.cwd(), 'src/components/calculator/HistoryDrawer.astro'), 'utf-8');
    assert.ok(history.includes('facGetActiveCurrency'), 'HistoryDrawer must capture active currency on add');
  });
});
