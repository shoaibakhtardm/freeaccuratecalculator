// tests/online-ruler-mobile.test.mjs
//
// Structural verification for the mobile-first Online Ruler application shell.
// These assertions run against the built output (dist/client) because the
// mobile layout lives in scoped CSS + markup that only exists after an Astro
// build. Astro adds [data-astro-cid-*] scope attributes to every selector and
// minifies the CSS, so the matchers below are written to tolerate both.
//
// These verify STRUCTURE, not physical feel. Real safe-area behaviour,
// fullscreen gestures and finger-grab ergonomics still require a real device.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const distClient = path.resolve('dist/client');
const rulerHtmlPath = path.join(distClient, 'ruler', 'index.html');

function readRulerHtml() {
  return fs.readFileSync(rulerHtmlPath, 'utf-8');
}

function readAllCss() {
  const astroDir = path.join(distClient, '_astro');
  const files = fs.readdirSync(astroDir).filter((f) => f.endsWith('.css'));
  const joined = files.map((f) => fs.readFileSync(path.join(astroDir, f), 'utf-8')).join('\n');
  // Strip Astro's [data-astro-cid-*] scope attributes so the minified selectors
  // read as authored, then normalise whitespace for stable matching.
  return joined.replace(/\[data-astro-cid-[a-z0-9]+\]/gi, '');
}

/** True when `selector { ... bodyPattern ... }` exists in the (unscoped) CSS. */
function ruleMatches(css, selector, bodyPattern) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`${escaped}(?![\\w-])[^{}]*\\{[^}]*${bodyPattern}`, 'i');
  return re.test(css);
}

test('Online Ruler — mobile-first application shell', async (t) => {
  await t.test('ruler page is built', () => {
    assert.ok(fs.existsSync(rulerHtmlPath), 'dist/client/ruler/index.html must exist');
  });

  await t.test('app shell is a dedicated application container', () => {
    const html = readRulerHtml();
    assert.ok(html.includes('id="ruler-app"'), 'ruler application root present');
    assert.ok(html.includes('ruler-app-shell'), 'application shell class present');
    assert.ok(html.includes('id="ruler-stage"'), 'measuring stage present');
  });

  await t.test('primary controls are always rendered (no JS-gated duplication)', () => {
    const html = readRulerHtml();
    for (const u of ['cm', 'mm', 'in', 'px']) {
      assert.ok(html.includes(`data-unit="${u}"`), `unit ${u} control present`);
    }
    for (const id of ['ruler-cal-btn', 'ruler-measure-btn', 'ruler-fullscreen-btn']) {
      assert.ok(html.includes(`id="${id}"`), `${id} present`);
    }
    for (const id of ['ruler-guides-btn', 'ruler-crosshair-btn']) {
      assert.ok(html.includes(`id="${id}"`), `${id} present`);
    }
    for (const e of ['top', 'bottom', 'left', 'right']) {
      assert.ok(html.includes(`data-edge="${e}"`), `edge ${e} control present`);
    }
  });

  await t.test('advanced controls are grouped behind a single "More" disclosure', () => {
    const html = readRulerHtml();
    assert.ok(html.includes('id="ruler-more-btn"'), 'More control present');
    assert.ok(html.includes('id="ruler-advanced"'), 'advanced panel present');
    assert.ok(html.includes('id="ruler-clear-guides"'), 'clear guides lives in advanced panel');
    assert.ok(html.includes('id="ruler-help-btn"'), 'keyboard shortcuts lives in advanced panel');
    // The old duplicated mobile-only controls must be gone.
    assert.ok(!html.includes('ruler-secondary-mobile'), 'duplicated mobile secondary menu removed');
    assert.ok(!html.includes('ruler-guides-btn-m'), 'duplicated mobile guides button removed');
    assert.ok(!html.includes('ruler-crosshair-btn-m'), 'duplicated mobile crosshair button removed');
  });

  await t.test('measure mode bar exists with Clear and Exit controls', () => {
    const html = readRulerHtml();
    assert.ok(html.includes('id="ruler-measure-bar"'), 'measure bar present');
    assert.ok(html.includes('id="ruler-measure-clear"'), 'measure Clear control present');
    assert.ok(html.includes('id="ruler-measure-exit"'), 'measure Exit control present');
  });

  await t.test('guides carry a large invisible touch target alongside the thin line', () => {
    const html = readRulerHtml();
    assert.ok(html.includes('ruler-guide-hit'), 'guide hit-target element present in template');
    const css = readAllCss();
    const hitMatch = css.match(/\.ruler-guide-hit(?![-\w])[^{}]*\{[^}]*height:\s*(\d+)px/);
    assert.ok(hitMatch, 'guide hit target height defined');
    assert.ok(Number(hitMatch[1]) >= 24, `guide hit target is >= 24px (got ${hitMatch[1]}px)`);
  });

  await t.test('safe-area insets are honoured for device UI', () => {
    const css = readAllCss();
    for (const inset of ['safe-area-inset-top', 'safe-area-inset-bottom', 'safe-area-inset-left', 'safe-area-inset-right']) {
      assert.ok(css.includes(inset), `${inset} used`);
    }
  });

  await t.test('modern viewport units used instead of a bare 100vh', () => {
    const css = readAllCss();
    assert.ok(css.includes('100dvh'), '100dvh used');
    assert.ok(css.includes('svh'), 'svh used');
  });

  await t.test('stage is page-scrollable while idle and locked only during interaction', () => {
    const css = readAllCss();
    assert.ok(ruleMatches(css, '.ruler-stage', 'touch-action:\\s*pan-y'), 'idle stage allows vertical panning');
    assert.ok(ruleMatches(css, '.ruler-stage.ruler-interactive', 'touch-action:\\s*none'), 'interactive stage locks scrolling');
    // The old blanket lock on the whole stage must be gone.
    assert.ok(!/touch-action:\s*none\s*!important/.test(css), 'no unconditional touch-action lock remains');
  });

  await t.test('calibration renders as an in-app mobile bottom sheet', () => {
    const html = readRulerHtml();
    assert.ok(html.includes('id="ruler-cal-dialog"'), 'calibration dialog present');
    assert.ok(html.includes('ruler-cal-sheet'), 'bottom-sheet class present');
    const css = readAllCss();
    assert.ok(css.includes('88dvh'), 'bottom sheet height is viewport-bounded');
    assert.ok(css.includes('ruler-sheet-up'), 'bottom sheet slide-up animation present');
  });

  await t.test('landscape phones get a dedicated layout rule', () => {
    const css = readAllCss();
    assert.ok(/orientation:\s*landscape/.test(css), 'landscape media query present');
  });

  await t.test('no unrelated finance CTA modal is injected into the ruler experience', () => {
    const html = readRulerHtml();
    assert.ok(!html.includes('id="smart-email-modal"'), 'amortization email modal suppressed on the ruler page');
  });

  await t.test('all existing ruler features are preserved', () => {
    const html = readRulerHtml();
    for (const m of ['card', 'diagonal', 'device', 'auto']) {
      assert.ok(html.includes(`data-method="${m}"`), `calibration method ${m} preserved`);
    }
    for (const ref of ['bank-card', 'id-card', 'a4-paper', 'us-letter', 'coin-quarter', 'coin-euro']) {
      assert.ok(html.includes(`value="${ref}"`), `reference object ${ref} preserved`);
    }
    assert.ok(html.includes('id="ruler-device-select"'), 'device preset selector preserved');
    assert.ok(html.includes('id="ruler-card-slider"'), 'card reference slider preserved');
    assert.ok(html.includes('id="ruler-history-panel"'), 'measurement history preserved');
    assert.ok(html.includes('id="ruler-shortcuts"'), 'keyboard shortcuts panel preserved');
  });

  await t.test('touch targets meet the 44px minimum on mobile', () => {
    const html = readRulerHtml();
    assert.ok(html.includes('min-h-[44px]'), 'primary touch targets are 44px');
    const css = readAllCss();
    assert.ok(ruleMatches(css, '.ruler-unit-btn', 'min-height:\\s*44px'), 'unit buttons enforce 44px on mobile');
  });
});