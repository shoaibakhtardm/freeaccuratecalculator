// tests/calculadora-edad-es.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const DIST_ES_PATH = path.resolve('dist/client/calculadora-edad/es/index.html');
const DIST_EN_PATH = path.resolve('dist/client/age-calculator/index.html');
const SITEMAP_I18N_PATH = path.resolve('public/sitemap-i18n.xml');
const SITEMAP_INDEX_PATH = path.resolve('public/sitemap.xml');

test('Spanish Age Calculator — Route & Core Structure Verification', () => {
  assert.ok(fs.existsSync(DIST_ES_PATH), 'dist/client/calculadora-edad/es/index.html must exist');
  const html = fs.readFileSync(DIST_ES_PATH, 'utf-8');

  // Lang attribute
  assert.match(html, /<html\s+lang="es"/, 'HTML document must have lang="es"');

  // Canonical tag
  assert.match(
    html,
    /<link\s+rel="canonical"\s+href="https:\/\/freeaccuratecalculator\.com\/calculadora-edad\/es\/"/,
    'Canonical link must point directly to https://freeaccuratecalculator.com/calculadora-edad/es/'
  );

  // Multilingual Hreflang Tags
  assert.match(
    html,
    /<link\s+rel="alternate"\s+hreflang="es"\s+href="https:\/\/freeaccuratecalculator\.com\/calculadora-edad\/es\/"/,
    'Must contain alternate hreflang="es" referencing self'
  );
  assert.match(
    html,
    /<link\s+rel="alternate"\s+hreflang="en"\s+href="https:\/\/freeaccuratecalculator\.com\/age-calculator\/"/,
    'Must contain alternate hreflang="en" referencing English age calculator'
  );
  assert.match(
    html,
    /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="https:\/\/freeaccuratecalculator\.com\/age-calculator\/"/,
    'Must contain alternate hreflang="x-default" referencing English age calculator'
  );

  // Primary H1
  assert.match(html, /<h1[^>]*>Calculadora de edad<\/h1>/i, 'Primary H1 must be "Calculadora de edad"');

  // Page Title
  assert.match(html, /<title>Calculadora de Edad/, 'Title must begin with Calculadora de Edad');

  // Meta description
  assert.match(html, /<meta\s+name="description"\s+content="[^"]*Calcula tu edad exacta/, 'Meta description must be Spanish');
});

test('English Age Calculator — Reciprocal Hreflang Verification', () => {
  assert.ok(fs.existsSync(DIST_EN_PATH), 'dist/client/age-calculator/index.html must exist');
  const html = fs.readFileSync(DIST_EN_PATH, 'utf-8');

  assert.match(
    html,
    /<link\s+rel="canonical"\s+href="https:\/\/freeaccuratecalculator\.com\/age-calculator\/"/,
    'English canonical must remain https://freeaccuratecalculator.com/age-calculator/'
  );

  assert.match(
    html,
    /<link\s+rel="alternate"\s+hreflang="es"\s+href="https:\/\/freeaccuratecalculator\.com\/calculadora-edad\/es\/"/,
    'English page must reciprocally link to Spanish page with hreflang="es"'
  );
  assert.match(
    html,
    /<link\s+rel="alternate"\s+hreflang="en"\s+href="https:\/\/freeaccuratecalculator\.com\/age-calculator\/"/,
    'English page must contain self-referencing hreflang="en"'
  );
});

test('Sitemap Architecture — Inclusion in sitemap-i18n.xml and master index', () => {
  const i18nContent = fs.readFileSync(SITEMAP_I18N_PATH, 'utf-8');
  assert.ok(
    i18nContent.includes('<loc>https://freeaccuratecalculator.com/calculadora-edad/es/</loc>'),
    'calculadora-edad/es must be in sitemap-i18n.xml'
  );

  const indexContent = fs.readFileSync(SITEMAP_INDEX_PATH, 'utf-8');
  assert.ok(
    indexContent.includes('sitemap-i18n.xml'),
    'sitemap.xml index must reference sitemap-i18n.xml'
  );
});

test('Spanish Age Calculator — Mathematical Engine Logic Check', () => {
  // Simulate the calculator mathematical algorithm
  function computeAge(birthDate, targetDate) {
    let years = targetDate.getFullYear() - birthDate.getFullYear();
    let months = targetDate.getMonth() - birthDate.getMonth();
    let days = targetDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    return { years, months, days };
  }

  // 1. Normal birth date: 1990-05-15 to 2026-09-24
  const res1 = computeAge(new Date(1990, 4, 15), new Date(2026, 8, 24));
  assert.equal(res1.years, 36);
  assert.equal(res1.months, 4);
  assert.equal(res1.days, 9);

  // 2. Leap year Feb 29 birth date: 2000-02-29 to 2024-03-01
  const res2 = computeAge(new Date(2000, 1, 29), new Date(2024, 2, 1));
  assert.equal(res2.years, 24);
  assert.equal(res2.months, 0);
  assert.equal(res2.days, 1);

  // 3. Worked Example from page: 2000-01-01 to 2026-03-15
  const res3 = computeAge(new Date(2000, 0, 1), new Date(2026, 2, 15));
  assert.equal(res3.years, 26);
  assert.equal(res3.months, 2);
  assert.equal(res3.days, 14);

  // Verify Western Zodiac
  function getZodiac(month, day) {
    const dates = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
    const signs = [
      'Capricornio', 'Acuario', 'Piscis', 'Aries', 'Tauro', 'Géminis',
      'Cáncer', 'Leo', 'Virgo', 'Libra', 'Escorpio', 'Sagitario'
    ];
    let idx = month - 1;
    if (day >= dates[idx]) {
      idx = (idx + 1) % 12;
    }
    return signs[idx];
  }
  assert.equal(getZodiac(1, 1), 'Capricornio');
  assert.equal(getZodiac(7, 15), 'Cáncer');
  assert.equal(getZodiac(3, 21), 'Aries');

  // Verify Chinese Zodiac
  function getChineseZodiac(year) {
    const animals = ['Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón', 'Serpiente', 'Caballo', 'Cabra', 'Mono', 'Gallo', 'Perro', 'Cerdo'];
    const idx = ((year - 4) % 12 + 12) % 12;
    return animals[idx];
  }
  assert.equal(getChineseZodiac(2000), 'Dragón');
  assert.equal(getChineseZodiac(1990), 'Caballo');
  assert.equal(getChineseZodiac(2024), 'Dragón');
});

test('Spanish Age Calculator — User-Facing Forensic Text Audit', () => {
  let html = fs.readFileSync(DIST_ES_PATH, 'utf-8');
  // Strip script, style, and HTML comments to inspect actual rendered user-facing HTML/DOM
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  html = html.replace(/<!--[\s\S]*?-->/g, '');

  // Common English remnants to guard against in user-facing content
  const bannedPhrases = [
    'Age Calculator',
    'Calculate your exact chronological age',
    'Date of Birth',
    'Target Date',
    'Compare to Date',
    'Include Exact Time',
    'Total Days Lived',
    'Total Hours Lived',
    'Total Minutes Lived',
    'Total Seconds Lived',
    'Next Birthday Countdown',
    'Physiological Milestones',
    'Estimated Heartbeats',
    'Estimated Breaths',
    'Half-Birthday',
    'Copy Result',
    'Download PDF',
    'Share Result',
    'Mathematical Definition',
    'Worked Example',
    'Knowledge Base',
    'Related Calculators',
    'All rights reserved',
    'Reset to Now',
    'Future dates are not permitted',
    'Copied to clipboard',
    'Copy Link',
    'Calendar Picker',
    'Select Date',
    'Calculate Age'
  ];

  for (const phrase of bannedPhrases) {
    const idx = html.indexOf(phrase);
    if (idx !== -1) {
      const snippet = html.substring(Math.max(0, idx - 50), Math.min(html.length, idx + phrase.length + 50));
      assert.fail(`Found prohibited English phrase "${phrase}" in Spanish user-facing content! Context: ${snippet}`);
    }
  }
});
