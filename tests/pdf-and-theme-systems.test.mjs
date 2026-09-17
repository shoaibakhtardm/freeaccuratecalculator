import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

describe('P0 PDF & Print Export System Integrity', () => {
  it('Layout.astro defines global resilient generateAndDownloadPDF with safe afterprint restoration', () => {
    const layoutPath = path.join(ROOT, 'src/layouts/Layout.astro');
    const content = fs.readFileSync(layoutPath, 'utf8');

    assert.ok(content.includes('window.generateAndDownloadPDF'), 'generateAndDownloadPDF must be exposed on window');
    assert.ok(content.includes('forceLightMode'), 'forceLightMode function must exist');
    assert.ok(content.includes('restoreDarkMode'), 'restoreDarkMode function must exist');
    assert.ok(content.includes('window.addEventListener(\'afterprint\''), 'afterprint listener must be registered');
    assert.ok(!content.includes('setTimeout(restoreDarkMode, 300)'), 'Premature 300ms restore race condition must be eliminated');
    assert.ok(content.includes('isPdfAction'), 'Universal click delegator for PDF buttons must exist');
  });

  it('global.css print media queries enforce verified light mode without destroying semantic styling', () => {
    const cssPath = path.join(ROOT, 'src/styles/global.css');
    const content = fs.readFileSync(cssPath, 'utf8');

    assert.ok(content.includes('@media print'), '@media print block must exist');
    assert.ok(content.includes('color-scheme: light !important'), 'Print mode must force color-scheme: light');
    assert.ok(content.includes('background-color: #ffffff !important'), 'Print mode must enforce white background');
    assert.ok(content.includes('.dark {'), '.dark reset block inside @media print must exist');
    assert.ok(!content.includes('*, .dark * {\n    box-shadow: none !important;\n    text-shadow: none !important;\n    border-color: #000000 !important;\n  }'), 'Destructive blanket black borders must be eliminated');
  });

  it('SIP Calculator has complete dedicated print report and script synchronizer', () => {
    const sipPath = path.join(ROOT, 'src/pages/finance/sip-calculator.astro');
    const content = fs.readFileSync(sipPath, 'utf8');

    assert.ok(content.includes('id="sip-print-report"'), 'Dedicated sip-print-report container must exist');
    assert.ok(content.includes('id="print-date"'), 'print-date element must exist');
    assert.ok(content.includes('id="print-currency-code"'), 'print-currency-code element must exist');
    assert.ok(content.includes('id="print-monthly"'), 'print-monthly element must exist');
    assert.ok(content.includes('id="print-invested"'), 'print-invested element must exist');
    assert.ok(content.includes('id="print-gain"'), 'print-gain element must exist');
    assert.ok(content.includes('id="print-maturity"'), 'print-maturity element must exist');
    assert.ok(content.includes('id="print-schedule-body"'), 'print-schedule-body element must exist');
    assert.ok(content.includes('updatePrintMetadata('), 'updatePrintMetadata function must be invoked in script');
  });

  it('EMI Calculator has complete dedicated print report and script synchronizer', () => {
    const emiPath = path.join(ROOT, 'src/pages/finance/emi-calculator.astro');
    const content = fs.readFileSync(emiPath, 'utf8');

    assert.ok(content.includes('id="emi-print-report"'), 'Dedicated emi-print-report container must exist');
    assert.ok(content.includes('id="emi-print-date"'), 'emi-print-date element must exist');
    assert.ok(content.includes('id="emi-print-currency"'), 'emi-print-currency element must exist');
    assert.ok(content.includes('id="emi-print-principal"'), 'emi-print-principal element must exist');
    assert.ok(content.includes('id="emi-print-emi"'), 'emi-print-emi element must exist');
    assert.ok(content.includes('id="emi-print-interest"'), 'emi-print-interest element must exist');
    assert.ok(content.includes('id="emi-print-total"'), 'emi-print-total element must exist');
    assert.ok(content.includes('renderPrintTable(yearlyRows)'), 'renderPrintTable must synchronize schedule rows');
  });

  it('Income Tax Calculator has complete dedicated print report and live sync', () => {
    const taxPath = path.join(ROOT, 'src/pages/finance/income-tax-calculator.astro');
    const content = fs.readFileSync(taxPath, 'utf8');

    assert.ok(content.includes('id="tax-print-report"'), 'tax-print-report container must exist');
    assert.ok(content.includes('id="tax-print-date"'), 'tax-print-date must exist');
    assert.ok(content.includes('id="tax-print-gross"'), 'tax-print-gross must exist');
    assert.ok(content.includes('id="tax-print-regime"'), 'tax-print-regime must exist');
    assert.ok(content.includes('id="tax-print-taxable"'), 'tax-print-taxable must exist');
    assert.ok(content.includes('id="tax-print-nettax"'), 'tax-print-nettax must exist');
    assert.ok(content.includes('id="tax-print-takehome"'), 'tax-print-takehome must exist');
    assert.ok(content.includes('id="tax-print-effrate"'), 'tax-print-effrate must exist');
    assert.ok(content.includes('syncPrintReport()'), 'syncPrintReport must synchronize print fields');
  });

  it('FinanceCalculatorView has complete dedicated print report and script sync', () => {
    const viewPath = path.join(ROOT, 'src/components/calculator/FinanceCalculatorView.astro');
    const content = fs.readFileSync(viewPath, 'utf8');

    assert.ok(content.includes('id="finance-print-report"'), 'finance-print-report container must exist');
    assert.ok(content.includes('id="print-report-date"'), 'print-report-date element must exist');
    assert.ok(content.includes('id="print-currency-code"'), 'print-currency-code element must exist');
    assert.ok(content.includes('id="print-parameters-grid"'), 'print-parameters-grid element must exist');
    assert.ok(content.includes('id="print-metric-value-1"'), 'print-metric-value-1 element must exist');
    assert.ok(content.includes('id="print-schedule-body"'), 'print-schedule-body element must exist');
    assert.ok(content.includes('updatePrintReport('), 'updatePrintReport must be called during recalculation');
  });

  it('MasterCalculatorWrapper has complete high-fidelity print report and event binding', () => {
    const wrapPath = path.join(ROOT, 'src/components/calculator/MasterCalculatorWrapper.astro');
    const content = fs.readFileSync(wrapPath, 'utf8');

    assert.ok(content.includes('id="master-print-report"'), 'master-print-report container must exist');
    assert.ok(content.includes('id="action-download-pdf-btn"'), 'action-download-pdf-btn must exist');
    assert.ok(content.includes('print-hero-val'), 'print-hero-val element must exist');
  });
});

describe('P0 Dark Mode & Theme System Architecture', () => {
  it('Layout.astro head script eliminates Flash of Unstyled Theme (Anti-FOUT)', () => {
    const layoutPath = path.join(ROOT, 'src/layouts/Layout.astro');
    const content = fs.readFileSync(layoutPath, 'utf8');

    assert.ok(content.includes('Anti-FOUT Dark Mode Script: Runs immediately before paint'), 'Anti-FOUT script must exist in head');
    assert.ok(content.includes('localStorage.getItem(\'theme\')'), 'Must inspect stored theme');
    assert.ok(content.includes('matchMedia(\'(prefers-color-scheme: dark)\')'), 'Must inspect OS prefers-color-scheme');
    assert.ok(content.includes('document.documentElement.style.colorScheme'), 'Must set documentElement colorScheme');
  });

  it('ThemeToggle component provides seamless synchronization across DOM updates and astro:page-load', () => {
    const togglePath = path.join(ROOT, 'src/components/ThemeToggle.astro');
    const content = fs.readFileSync(togglePath, 'utf8');

    assert.ok(content.includes('window.facToggleTheme'), 'facToggleTheme must be exposed globally');
    assert.ok(content.includes('syncAllThemeButtons'), 'syncAllThemeButtons function must exist');
    assert.ok(content.includes('document.addEventListener(\'astro:page-load\', syncAllThemeButtons)'), 'Must register astro:page-load sync');
    assert.ok(content.includes('themechange'), 'Must dispatch themechange CustomEvent');
    assert.ok(content.includes('data-theme-toggle'), 'Must support data-theme-toggle attribute selector');
  });

  it('Tailwind v4 custom dark variant is declared correctly in global.css', () => {
    const cssPath = path.join(ROOT, 'src/styles/global.css');
    const content = fs.readFileSync(cssPath, 'utf8');

    assert.ok(content.includes('@custom-variant dark (&:where(.dark, .dark *));'), 'Tailwind v4 custom variant dark must be defined');
    assert.ok(content.includes('.dark {'), 'Dark theme CSS custom property tokens must be defined');
    assert.ok(content.includes('--color-canvas: #0a0a0a;'), 'Dark canvas token must be defined');
  });
});

describe('Calculator Discovery & Search System Regression', () => {
  it('Search database contains all flagship calculators with valid routes', async () => {
    const searchDbPath = path.join(ROOT, 'src/data/searchDatabase.ts');
    const content = fs.readFileSync(searchDbPath, 'utf8');

    const flagshipKeywords = [
      'sip-calculator',
      'emi-calculator',
      'mortgage-calculator',
      'income-tax-calculator',
      'percentage-calculator',
      'bmi-calculator',
      'age-calculator',
      'compound-interest-calculator',
      'ppf-calculator',
      'epf-calculator',
      'gratuity-calculator',
      'length-converter'
    ];

    for (const slug of flagshipKeywords) {
      assert.ok(content.includes(slug), `Search database must include ${slug}`);
    }
  });

  it('AutocompleteSearch component supports keyboard navigation and Astro lifecycle hooks', () => {
    const searchCompPath = path.join(ROOT, 'src/components/common/AutocompleteSearch.astro');
    const content = fs.readFileSync(searchCompPath, 'utf8');

    assert.ok(content.includes('ArrowDown'), 'Keyboard ArrowDown navigation must be supported');
    assert.ok(content.includes('ArrowUp'), 'Keyboard ArrowUp navigation must be supported');
    assert.ok(content.includes('Escape'), 'Keyboard Escape to close must be supported');
    assert.ok(content.includes('astro:page-load'), 'astro:page-load lifecycle hook must be registered');
  });
});
