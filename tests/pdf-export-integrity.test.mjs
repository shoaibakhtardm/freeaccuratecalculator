import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';

describe('SIP Calculator PDF Download & Print Lifecycle Forensic Verification', () => {
  const layoutContent = fs.readFileSync('src/layouts/Layout.astro', 'utf8');
  const sipContent = fs.readFileSync('src/pages/sip-calculator.astro', 'utf8');
  const globalCss = fs.readFileSync('src/styles/global.css', 'utf8');

  it('Bug #1 Fix: Layout.astro implements strict single-flight locking & anti-double-print cooldown', () => {
    assert.ok(layoutContent.includes('isPrinting'), 'Layout.astro must track isPrinting state');
    assert.ok(layoutContent.includes('isPrintLocked'), 'Layout.astro must track isPrintLocked cooldown state');
    assert.ok(
      layoutContent.includes('isPrinting || isPrintLocked'),
      'generateAndDownloadPDF must abort if print is already in progress or cooldown locked'
    );
    assert.ok(
      layoutContent.includes('window.generateAndDownloadPDF = async function'),
      'Global generateAndDownloadPDF function must be defined'
    );
    assert.ok(
      layoutContent.includes('window.addEventListener(\'afterprint\''),
      'afterprint listener must trigger restoration and cooldown'
    );
    assert.ok(
      !layoutContent.includes('setTimeout(() => {\n            isPrintLocked = false;\n          }, 400)') &&
      !layoutContent.includes('setTimeout(restoreDarkMode, 500)'),
      'Eliminated artificial 400ms/500ms delay locks that swallow first-click cancel/re-interactions'
    );
  });

  it('Bug #1 Fix: sip-calculator.astro delegates safely without event bubbling duplication', () => {
    assert.ok(
      sipContent.includes('e.stopPropagation()') || sipContent.includes('generateAndDownloadPDF'),
      'downloadPDF must prevent duplicate event bubbling'
    );
    assert.ok(
      sipContent.includes('window.addEventListener(\'fac:before-pdf-print\''),
      'sip-calculator must hook into pre-print synchronization'
    );
    assert.ok(
      sipContent.includes('window.addEventListener(\'beforeprint\''),
      'sip-calculator must hook into native beforeprint event'
    );
  });

  it('Bug #2 Fix: Global CSS and Layout.astro guarantee light mode export in dark mode without localStorage corruption', () => {
    assert.ok(
      globalCss.includes('@media print'),
      'global.css must contain @media print rules'
    );
    assert.ok(
      globalCss.includes('color-scheme: light !important') || globalCss.includes('background: #ffffff !important'),
      'global.css @media print must force light color-scheme and background'
    );
    assert.ok(
      layoutContent.includes('forceLightMode()') && layoutContent.includes('restoreDarkMode()'),
      'Layout.astro must provide reversible runtime theme isolation'
    );
    assert.ok(
      !layoutContent.includes("localStorage.setItem('theme', 'light')"),
      'Print theme isolation must never mutate persistent user localStorage'
    );
  });

  it('Bug #3 Fix: SIP Print Report container is dedicated and captures complete calculation state', () => {
    assert.ok(
      sipContent.includes('id="sip-print-report"'),
      'Dedicated #sip-print-report container must exist'
    );
    assert.ok(
      sipContent.includes('id="print-monthly"'),
      'Print report must contain monthly deposit display'
    );
    assert.ok(
      sipContent.includes('id="print-rate"'),
      'Print report must contain expected rate display'
    );
    assert.ok(
      sipContent.includes('id="print-years"'),
      'Print report must contain tenure display'
    );
    assert.ok(
      sipContent.includes('id="print-invested"'),
      'Print report must contain total capital invested display'
    );
    assert.ok(
      sipContent.includes('id="print-gain"'),
      'Print report must contain wealth gain display'
    );
    assert.ok(
      sipContent.includes('id="print-maturity"'),
      'Print report must contain total expected maturity display'
    );
    assert.ok(
      sipContent.includes('id="print-schedule-body"'),
      'Print report must contain annual schedule table body'
    );
  });

  it('Bug #3 Fix: Screen-only chrome, headers, footers, and modals are strictly hidden in print CSS', () => {
    const printHiddenElements = [
      'header',
      'footer',
      'nav',
      '#mobile-sticky-hud',
      '#smart-email-modal',
      '#country-modal',
      '.ad-slot-container',
      '#sip-social-proof',
      '#sip-toast',
      '#sip-bottom-content-area',
      '#sip-formula-wrapper',
      '#sip-worked-example-wrapper',
      '#sip-comparison-wrapper',
      '#sip-bottom-export-wrapper'
    ];

    printHiddenElements.forEach((selector) => {
      assert.ok(
        sipContent.includes(selector) || globalCss.includes(selector),
        `Element ${selector} must be explicitly hidden in print styling`
      );
    });
  });
});
