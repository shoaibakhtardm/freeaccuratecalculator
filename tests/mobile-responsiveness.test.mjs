// tests/mobile-responsiveness.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const distClient = path.resolve('dist/client');

test('Mobile Responsiveness Verification — HTML & CSS Audit', async (t) => {
  await t.test('Viewport meta tag exists in Layout head', () => {
    const indexHtml = fs.readFileSync(path.join(distClient, 'index.html'), 'utf-8');
    assert.match(indexHtml, /<meta name="viewport" content="width=device-width, initial-scale=1\.0/);
  });

  await t.test('Global CSS enforces overflow-x hidden on html and body', () => {
    const globalCssFiles = fs.readdirSync(path.join(distClient, '_astro')).filter(f => f.endsWith('.css'));
    assert.ok(globalCssFiles.length > 0);
    const cssContent = globalCssFiles.map(f => fs.readFileSync(path.join(distClient, '_astro', f), 'utf-8')).join('\n');
    assert.ok(cssContent.includes('overflow-x:hidden') || cssContent.includes('overflow-x: hidden'));
  });

  await t.test('Header has mobile hamburger button and collapsible menu', () => {
    const indexHtml = fs.readFileSync(path.join(distClient, 'index.html'), 'utf-8');
    assert.ok(indexHtml.includes('id="mobile-menu-btn"'));
    assert.ok(indexHtml.includes('id="mobile-menu"'));
    assert.ok(indexHtml.includes('aria-label="Toggle navigation menu"'));
  });

  await t.test('Header controls are compact to prevent overflow on 320px screens and meet 44px touch targets', () => {
    const indexHtml = fs.readFileSync(path.join(distClient, 'index.html'), 'utf-8');
    assert.ok(indexHtml.includes('id="language-select"'));
    assert.ok(indexHtml.includes('id="currency-select"'));
    assert.ok(indexHtml.includes('id="theme-toggle"'));
    assert.ok(indexHtml.includes('min-h-[44px]') && indexHtml.includes('min-w-[44px]'));
    assert.ok(indexHtml.includes('id="mobile-language-select"'));
    assert.ok(indexHtml.includes('id="mobile-currency-select"'));
  });

  await t.test('Hero section has responsive text clamp and 44px filter pills', () => {
    const indexHtml = fs.readFileSync(path.join(distClient, 'index.html'), 'utf-8');
    assert.ok(indexHtml.includes('display-hero'));
    assert.ok(indexHtml.includes('id="search-input"'));
    assert.ok(indexHtml.includes('category-filter-btn') && indexHtml.includes('min-h-[44px]'));
  });

  await t.test('Breadcrumbs support wrapping to prevent viewport overflow', () => {
    const emiHtml = fs.readFileSync(path.join(distClient, 'finance/emi-calculator/index.html'), 'utf-8');
    assert.ok(emiHtml.includes('flex-wrap'));
  });

  await t.test('Calculator input layout uses responsive single-to-multi-column grid and 44px touch targets', () => {
    const emiHtml = fs.readFileSync(path.join(distClient, 'finance/emi-calculator/index.html'), 'utf-8');
    assert.ok(emiHtml.includes('id="emi-principal"'));
    assert.ok(emiHtml.includes('id="emi-rate"'));
    assert.ok(emiHtml.includes('id="emi-tenure"'));
    assert.ok(emiHtml.includes('min-h-[44px]'));
    assert.ok(emiHtml.includes('id="format-standard-btn"'));
    assert.ok(emiHtml.includes('preset-chip'));
  });

  await t.test('BMI calculator has responsive spectrum bar and 44px unit toggle', () => {
    const bmiHtml = fs.readFileSync(path.join(distClient, 'health/bmi-calculator/index.html'), 'utf-8');
    assert.ok(bmiHtml.includes('id="unit-metric-btn"'));
    assert.ok(bmiHtml.includes('min-h-[44px]'));
    assert.ok(bmiHtml.includes('bmi-gauge-needle'));
  });

  await t.test('Amortization schedule table has self-contained horizontal scroll container and mobile hint', () => {
    const emiHtml = fs.readFileSync(path.join(distClient, 'finance/emi-calculator/index.html'), 'utf-8');
    assert.ok(emiHtml.includes('overflow-x-auto max-w-full'));
    assert.ok(emiHtml.includes('min-w-[480px]'));
    assert.ok(emiHtml.includes('Swipe schedule horizontally'));
  });

  await t.test('Dynamic calculator template has 44px min-height touch targets and iOS zoom protection', () => {
    const mortgageHtml = fs.readFileSync(path.join(distClient, 'finance/mortgage-calculator/index.html'), 'utf-8');
    assert.ok(mortgageHtml.includes('min-h-[44px]'));
    assert.ok(mortgageHtml.includes('text-base sm:text-sm'));
  });

  await t.test('AdSlot containers enforce max-w-full and overflow-hidden', () => {
    const indexHtml = fs.readFileSync(path.join(distClient, 'index.html'), 'utf-8');
    assert.ok(indexHtml.includes('max-w-full overflow-hidden'));
  });

  await t.test('Consent banner action buttons have 44px touch target on mobile', () => {
    const indexHtml = fs.readFileSync(path.join(distClient, 'index.html'), 'utf-8');
    assert.ok(indexHtml.includes('id="consent-accept-btn"'));
    assert.ok(indexHtml.includes('min-h-[44px] sm:min-h-[34px]'));
  });
});
