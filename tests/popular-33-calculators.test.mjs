// tests/popular-33-calculators.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const distClient = path.resolve('dist/client');

const POPULAR_33_CALCULATORS = [
  { slug: 'percentage-calculator', name: 'Percentage Calculator', category: 'math' },
  { slug: 'bmi-calculator', name: 'BMI Calculator', category: 'health' },
  { slug: 'age-calculator', name: 'Age Calculator', category: 'everyday' },
  { slug: 'love-calculator', name: 'Love Calculator', category: 'love' },
  { slug: 'scientific-calculator', name: 'Scientific Calculator', category: 'math' },
  { slug: 'emi-calculator', name: 'EMI Calculator', category: 'finance' },
  { slug: 'mortgage-calculator', name: 'Mortgage Calculator', category: 'finance' },
  { slug: 'loan-calculator', name: 'Loan Calculator', category: 'finance' },
  { slug: 'time-calculator', name: 'Time Calculator', category: 'everyday' },
  { slug: 'date-calculator', name: 'Date Calculator', category: 'everyday' },
  { slug: 'salary-calculator', name: 'Salary Calculator', category: 'finance' },
  { slug: 'compound-interest-calculator', name: 'Compound Interest', category: 'finance' },
  { slug: 'conversion-calculator', name: 'Unit Converter', category: 'converter' },
  { slug: 'body-fat-calculator', name: 'Body Fat Calculator', category: 'health' },
  { slug: 'bmr-calculator', name: 'BMR Calculator', category: 'health' },
  { slug: 'sip-calculator', name: 'SIP Calculator', category: 'finance' },
  { slug: 'auto-loan-calculator', name: 'Auto Loan', category: 'finance' },
  { slug: 'gpa-calculator', name: 'GPA Calculator', category: 'everyday' },
  { slug: 'roi-calculator', name: 'ROI Calculator', category: 'business' },
  { slug: 'tip-calculator', name: 'Tip Calculator', category: 'everyday' },
  { slug: 'income-tax-calculator', name: 'Income Tax Calculator', category: 'finance' },
  { slug: 'probability-calculator', name: 'Probability Calculator', category: 'statistics' },
  { slug: 'password-generator', name: 'Password Generator', category: 'technology' },
  { slug: 'discount-calculator', name: 'Discount Calculator', category: 'everyday' },
  { slug: 'ovulation-calculator', name: 'Ovulation Calculator', category: 'health' },
  { slug: 'ohms-law-calculator', name: 'Ohm’s Law Calculator', category: 'physics' },
  { slug: 'pregnancy-due-date-calculator', name: 'Pregnancy Due Date', category: 'health' },
  { slug: 'concrete-calculator', name: 'Concrete Volume', category: 'construction' },
  { slug: 'paint-calculator', name: 'Paint Calculator', category: 'construction' },
  { slug: 'amortization-calculator', name: 'Amortization Calculator', category: 'finance' },
  { slug: 'inflation-calculator', name: 'Inflation Calculator', category: 'finance' },
  { slug: 'square-footage-calculator', name: 'Square Footage', category: 'construction' },
  { slug: 'ruler', name: 'Online Ruler', category: 'everyday' },
];

test('33 Homepage Popular Calculators — Forensic Integrity Suite', async (t) => {
  assert.equal(POPULAR_33_CALCULATORS.length, 33, 'Exactly 33 popular calculators must be indexed');

  await t.test('All 33 calculators are compiled to HTML in dist/client', () => {
    for (const item of POPULAR_33_CALCULATORS) {
      const htmlPath = path.join(distClient, item.slug, 'index.html');
      assert.ok(fs.existsSync(htmlPath), `HTML output must exist for ${item.slug}: ${htmlPath}`);
    }
  });

  await t.test('Zero instances of "Programmatic pSEO Engine" exist in any compiled calculator HTML', () => {
    for (const item of POPULAR_33_CALCULATORS) {
      const htmlPath = path.join(distClient, item.slug, 'index.html');
      const content = fs.readFileSync(htmlPath, 'utf-8');
      assert.ok(!content.includes('Programmatic pSEO Engine'), `Page ${item.slug} must NOT contain "Programmatic pSEO Engine"`);
    }
  });

  await t.test('No fake AggregateRating schema exists across all 33 calculators', () => {
    for (const item of POPULAR_33_CALCULATORS) {
      const htmlPath = path.join(distClient, item.slug, 'index.html');
      const content = fs.readFileSync(htmlPath, 'utf-8');
      assert.ok(!content.includes('12847'), `Page ${item.slug} must NOT contain fake review count 12847`);
    }
  });

  await t.test('Breadcrumb category links match the actual category for dynamic calculators', () => {
    for (const item of POPULAR_33_CALCULATORS) {
      const htmlPath = path.join(distClient, item.slug, 'index.html');
      const content = fs.readFileSync(htmlPath, 'utf-8');
      
      // Dynamic calculators rendered via [slug].astro must link to their category, not hardcoded /finance/
      if (item.category !== 'finance' && !['percentage-calculator', 'bmi-calculator', 'age-calculator', 'ruler', 'love-calculator'].includes(item.slug)) {
        assert.ok(
          content.includes(`href="/${item.category}/"`),
          `Page ${item.slug} category breadcrumb must link to /${item.category}/`
        );
      }
    }
  });

  await t.test('Non-currency tools do not display currency symbols ($ or ₹) in hero results', () => {
    const nonCurrencySlugs = ['scientific-calculator', 'probability-calculator', 'conversion-calculator'];
    for (const slug of nonCurrencySlugs) {
      const htmlPath = path.join(distClient, slug, 'index.html');
      const content = fs.readFileSync(htmlPath, 'utf-8');
      assert.ok(content.includes('class="text-2xl sm:text-3xl font-bold font-mono text-ink hidden"'), `Page ${slug} must hide currency symbol`);
    }
  });

  await t.test('Homepage links to all 33 calculators with correct canonical paths', () => {
    const homepageHtml = fs.readFileSync(path.join(distClient, 'index.html'), 'utf-8');
    for (const item of POPULAR_33_CALCULATORS) {
      const href = `/${item.slug}/`;
      assert.ok(homepageHtml.includes(`href="${href}"`), `Homepage must link to ${href}`);
    }
  });
});
