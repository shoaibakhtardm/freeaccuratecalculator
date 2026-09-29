// tests/pdf-table-currency-standardization.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const distClient = path.resolve('dist/client');

const POPULAR_33_CALCULATORS = [
  { slug: 'percentage-calculator', name: 'Percentage Calculator', isCurrency: false, hasTable: true },
  { slug: 'bmi-calculator', name: 'BMI Calculator', isCurrency: false, hasTable: true },
  { slug: 'age-calculator', name: 'Age Calculator', isCurrency: false, hasTable: true },
  { slug: 'love-calculator', name: 'Love Calculator', isCurrency: false, hasTable: true },
  { slug: 'scientific-calculator', name: 'Scientific Calculator', isCurrency: false, hasTable: false },
  { slug: 'emi-calculator', name: 'EMI Calculator', isCurrency: true, hasTable: true },
  { slug: 'mortgage-calculator', name: 'Mortgage Calculator', isCurrency: true, hasTable: true },
  { slug: 'loan-calculator', name: 'Loan Calculator', isCurrency: true, hasTable: true },
  { slug: 'time-calculator', name: 'Time Calculator', isCurrency: false, hasTable: false },
  { slug: 'date-calculator', name: 'Date Calculator', isCurrency: false, hasTable: false },
  { slug: 'salary-calculator', name: 'Salary Calculator', isCurrency: true, hasTable: true },
  { slug: 'compound-interest-calculator', name: 'Compound Interest', isCurrency: true, hasTable: true },
  { slug: 'conversion-calculator', name: 'Unit Converter', isCurrency: false, hasTable: false },
  { slug: 'body-fat-calculator', name: 'Body Fat Calculator', isCurrency: false, hasTable: false },
  { slug: 'bmr-calculator', name: 'BMR Calculator', isCurrency: false, hasTable: false },
  { slug: 'sip-calculator', name: 'SIP Calculator', isCurrency: true, hasTable: true },
  { slug: 'auto-loan-calculator', name: 'Auto Loan', isCurrency: true, hasTable: true },
  { slug: 'gpa-calculator', name: 'GPA Calculator', isCurrency: false, hasTable: false },
  { slug: 'roi-calculator', name: 'ROI Calculator', isCurrency: false, hasTable: false },
  { slug: 'tip-calculator', name: 'Tip Calculator', isCurrency: true, hasTable: false },
  { slug: 'income-tax-calculator', name: 'Income Tax Calculator', isCurrency: true, hasTable: true },
  { slug: 'probability-calculator', name: 'Probability Calculator', isCurrency: false, hasTable: false },
  { slug: 'password-generator', name: 'Password Generator', isCurrency: false, hasTable: false },
  { slug: 'discount-calculator', name: 'Discount Calculator', isCurrency: true, hasTable: false },
  { slug: 'ovulation-calculator', name: 'Ovulation Calculator', isCurrency: false, hasTable: false },
  { slug: 'ohms-law-calculator', name: 'Ohm’s Law Calculator', isCurrency: false, hasTable: false },
  { slug: 'pregnancy-due-date-calculator', name: 'Pregnancy Due Date', isCurrency: false, hasTable: false },
  { slug: 'concrete-calculator', name: 'Concrete Volume', isCurrency: false, hasTable: false },
  { slug: 'paint-calculator', name: 'Paint Calculator', isCurrency: false, hasTable: false },
  { slug: 'amortization-calculator', name: 'Amortization Calculator', isCurrency: true, hasTable: true },
  { slug: 'inflation-calculator', name: 'Inflation Calculator', isCurrency: true, hasTable: true },
  { slug: 'square-footage-calculator', name: 'Square Footage', isCurrency: false, hasTable: false },
  { slug: 'ruler', name: 'Online Ruler', isCurrency: false, hasTable: false },
];

test('Site-Wide PDF/Export + Table + Currency Standardization Suite', async (t) => {
  await t.test('All 33 flagship calculators have compiled HTML with print-ready architecture', () => {
    for (const item of POPULAR_33_CALCULATORS) {
      const htmlPath = path.join(distClient, item.slug, 'index.html');
      assert.ok(fs.existsSync(htmlPath), `Compiled HTML must exist for ${item.slug}`);
      const content = fs.readFileSync(htmlPath, 'utf-8');

      // Check PDF / Print capability
      const hasPrintReport =
        content.includes('-print-report') ||
        content.includes('finance-print-report') ||
        content.includes('fac-print-report') ||
        content.includes('window.print()') ||
        content.includes('generateAndDownloadPDF');

      assert.ok(
        hasPrintReport,
        `Calculator ${item.slug} must feature a print report or window.print/generateAndDownloadPDF trigger`
      );
    }
  });

  await t.test('Print reports use position: static in print CSS to avoid multi-page clipping', () => {
    const globalCssPath = path.resolve('src/styles/global.css');
    const globalCss = fs.readFileSync(globalCssPath, 'utf-8');

    assert.ok(
      globalCss.includes('.fac-print-report') && globalCss.includes('position: static !important'),
      'global.css must declare .fac-print-report with position: static !important'
    );
    assert.ok(
      globalCss.includes('break-inside: avoid !important'),
      'global.css must enforce break-inside: avoid !important for table rows and cards'
    );
    assert.ok(
      globalCss.includes('display: table-header-group !important'),
      'global.css must repeat table headers across pages with table-header-group'
    );
  });

  await t.test('Flagship standalone calculators default to USD ($)', () => {
    // 1. SIP Calculator
    const sipSrc = fs.readFileSync(path.resolve('src/pages/sip-calculator.astro'), 'utf-8');
    const sipHtml = fs.readFileSync(path.join(distClient, 'sip-calculator', 'index.html'), 'utf-8');
    assert.ok(sipHtml.includes('$1,000') || sipHtml.includes('$204,845'), 'SIP Calculator must display USD ($) values');
    assert.ok(sipSrc.includes("(localStorage.getItem('fac_currency') || 'USD')"), 'SIP Calculator script must default to USD');

    // 2. EMI Calculator
    const emiSrc = fs.readFileSync(path.resolve('src/pages/emi-calculator.astro'), 'utf-8');
    const emiHtml = fs.readFileSync(path.join(distClient, 'emi-calculator', 'index.html'), 'utf-8');
    assert.ok(emiHtml.includes('$ 250,000') || emiHtml.includes('$250,000'), 'EMI Calculator must display USD ($) values');
    assert.ok(emiSrc.includes("(localStorage.getItem('fac_currency') || 'USD')"), 'EMI Calculator script must default to USD');

    // 3. Income Tax Calculator
    const taxSrc = fs.readFileSync(path.resolve('src/pages/income-tax-calculator.astro'), 'utf-8');
    const taxHtml = fs.readFileSync(path.join(distClient, 'income-tax-calculator', 'index.html'), 'utf-8');
    assert.ok(taxHtml.includes('$ 85,000') || taxHtml.includes('$85,000'), 'Income Tax Calculator must display US ($) defaults');
    assert.ok(taxSrc.includes("initialCurrency === 'INR' ? 'IN' : 'US'"), 'Income Tax Calculator script must default to US');
  });

  await t.test('Non-currency tools strictly protected from currency symbols ($ or ₹)', () => {
    // 1. Percentage Calculator
    const pctHtml = fs.readFileSync(path.join(distClient, 'percentage-calculator', 'index.html'), 'utf-8');
    assert.ok(pctHtml.includes('id="pct-print-report"'), 'Percentage Calculator must have pct-print-report');
    assert.ok(!pctHtml.includes('id="hero-result-symbol">$<'), 'Percentage Calculator must not have dollar in hero symbol');

    // 2. BMI Calculator
    const bmiHtml = fs.readFileSync(path.join(distClient, 'bmi-calculator', 'index.html'), 'utf-8');
    assert.ok(bmiHtml.includes('id="bmi-print-report"'), 'BMI Calculator must have bmi-print-report');
    assert.ok(!bmiHtml.includes('id="hero-result-symbol">$<'), 'BMI Calculator must not have dollar in hero symbol');

    // 3. Age Calculator
    const ageHtml = fs.readFileSync(path.join(distClient, 'age-calculator', 'index.html'), 'utf-8');
    assert.ok(ageHtml.includes('id="age-print-report"'), 'Age Calculator must have age-print-report');
    assert.ok(!ageHtml.includes('id="hero-result-symbol">$<'), 'Age Calculator must not have dollar in hero symbol');

    // 4. Love Calculator
    const loveHtml = fs.readFileSync(path.join(distClient, 'love-calculator', 'index.html'), 'utf-8');
    assert.ok(loveHtml.includes('id="love-print-report"'), 'Love Calculator must have love-print-report');
    assert.ok(!loveHtml.includes('id="hero-result-symbol">$<'), 'Love Calculator must not have dollar in hero symbol');

    // 5. Scientific, GPA, Ohm's Law
    const nonCurr = ['scientific-calculator', 'gpa-calculator', 'ohms-law-calculator', 'concrete-calculator', 'paint-calculator'];
    for (const slug of nonCurr) {
      const htmlPath = path.join(distClient, slug, 'index.html');
      if (fs.existsSync(htmlPath)) {
        const html = fs.readFileSync(htmlPath, 'utf-8');
        assert.ok(!html.includes('id="hero-result-symbol">$<'), `${slug} must not display dollar symbol`);
      }
    }
  });

  await t.test('FinanceCalculatorView correctly marks tip and discount as currency, and roi and probability as percentage', () => {
    const fcvPath = path.resolve('src/components/calculator/FinanceCalculatorView.astro');
    const fcvContent = fs.readFileSync(fcvPath, 'utf-8');

    assert.ok(fcvContent.includes("calc.slug.includes('tip')"), 'FinanceCalculatorView must include tip in isCurrencyCalculator');
    assert.ok(fcvContent.includes("calc.slug.includes('discount')"), 'FinanceCalculatorView must include discount in isCurrencyCalculator');
    assert.ok(fcvContent.includes("calc.slug.includes('roi')"), 'FinanceCalculatorView must mark roi as percentage result');
    assert.ok(fcvContent.includes("calc.slug.includes('probability')"), 'FinanceCalculatorView must mark probability as percentage result');
  });

  await t.test('Dynamic calculators with schedules render table in print report, and hide when empty', () => {
    const fcvPath = path.resolve('src/components/calculator/FinanceCalculatorView.astro');
    const fcvContent = fs.readFileSync(fcvPath, 'utf-8');

    assert.ok(
      fcvContent.includes('printSchedSection.style.display = rows.length > 0 ?') ||
      fcvContent.includes('!rows || rows.length === 0'),
      'FinanceCalculatorView must conditionally display print schedule section only when rows exist'
    );

    const mcwPath = path.resolve('src/components/calculator/MasterCalculatorWrapper.astro');
    const mcwContent = fs.readFileSync(mcwPath, 'utf-8');

    assert.ok(
      mcwContent.includes("schedSec.style.display = rows.length > 0 ? 'block' : 'none'"),
      'MasterCalculatorWrapper must conditionally display print schedule section only when rows exist'
    );
  });

  await t.test('Decimal precision is preserved for fractional cents without artificial rounding', () => {
    const fcvPath = path.resolve('src/components/calculator/FinanceCalculatorView.astro');
    const fcvContent = fs.readFileSync(fcvPath, 'utf-8');

    assert.ok(
      fcvContent.includes('const hasFraction = Math.abs(num % 1) > 0.001'),
      'FinanceCalculatorView formatVal must detect non-zero fractions'
    );
    assert.ok(
      fcvContent.includes('decimals === 0 && hasFraction ? 2 : decimals'),
      'FinanceCalculatorView formatVal must preserve 2 decimal places when non-zero fraction exists'
    );
  });
});
