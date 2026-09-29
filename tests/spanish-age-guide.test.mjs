// tests/spanish-age-guide.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const DIST_GUIDE_PATH = path.resolve('dist/client/calculadora-edad/guides/es/index.html');
const DIST_CALC_PATH = path.resolve('dist/client/calculadora-edad/es/index.html');
const SITEMAP_I18N_PATH = path.resolve('public/sitemap-i18n.xml');
const SITEMAP_INDEX_PATH = path.resolve('public/sitemap.xml');

test('Spanish Age Guide — File & URL Canonical Architecture', () => {
  assert.ok(fs.existsSync(DIST_GUIDE_PATH), 'dist/client/calculadora-edad/guides/es/index.html must exist');
  const html = fs.readFileSync(DIST_GUIDE_PATH, 'utf-8');

  // HTML lang
  assert.match(html, /<html\s+lang="es"/, 'HTML document must have lang="es"');

  // Exact canonical link
  assert.match(
    html,
    /<link\s+rel="canonical"\s+href="https:\/\/freeaccuratecalculator\.com\/calculadora-edad\/guides\/es\/"/,
    'Canonical link must strictly point to https://freeaccuratecalculator.com/calculadora-edad/guides/es/'
  );

  // No fake or conflicting English hreflangs on this Spanish-only guide
  assert.doesNotMatch(
    html,
    /<link[^>]+hreflang="en"[^>]+>/,
    'Must not emit fake hreflang="en" on Spanish-only guide'
  );

  // Exact H1
  assert.match(
    html,
    /<h1[^>]*>Calculadora de Edad: Cómo Calcular tu Edad Exacta<\/h1>/i,
    'H1 must be "Calculadora de Edad: Cómo Calcular tu Edad Exacta"'
  );

  // Title tag
  assert.match(
    html,
    /<title>Calculadora de Edad: Cómo Calcular tu Edad Exacta/i,
    'Title must communicate the primary topic and value proposition'
  );

  // Meta description
  assert.match(
    html,
    /<meta\s+name="description"\s+content="[^"]*calcular tu edad exacta[^"]*"/i,
    'Meta description must explain the practical value in Spanish'
  );
});

test('Spanish Age Guide — Topical Breadcrumbs & Structured Data', () => {
  const html = fs.readFileSync(DIST_GUIDE_PATH, 'utf-8');

  // Breadcrumbs element
  assert.match(html, /<nav aria-label="Ruta de navegación"/, 'Must render localized Spanish breadcrumbs');
  assert.match(html, /href="\/es\/"[^>]*>[\s\S]*?Inicio/, 'Breadcrumbs must link to Spanish home');
  assert.match(html, /href="\/calculadora-edad\/"[^>]*>[\s\S]*?Calculadora de Edad/, 'Breadcrumbs must link to Age Calculator');

  // JSON-LD Schema
  assert.match(html, /"@type":"Article"/, 'Must include Article schema');
  assert.match(html, /"@type":"BreadcrumbList"/, 'Must include BreadcrumbList schema');
  assert.match(html, /https:\/\/freeaccuratecalculator\.com\/calculadora-edad\/guides\/es\/#article/, 'Article schema must reference canonical URL');
});

test('Spanish Age Guide — Semantic Topical H2 Coverage & Internal Linking', () => {
  const html = fs.readFileSync(DIST_GUIDE_PATH, 'utf-8');

  // Key required semantic sub-topics
  const requiredHeadings = [
    '¿Cómo calcular la edad con una fecha de nacimiento?',
    '¿Cómo calcular la edad exacta en años, meses y días?',
    '¿Cómo calcular la edad entre dos fechas',
    '¿Qué es la edad cronológica',
    '¿Qué es la edad corregida',
    '¿Qué es la edad gestacional?',
    'Edad biológica y edad metabólica',
    '¿Cómo calcular la edad de un perro',
    '¿Qué es la edad lunar',
    '¿Cómo calcular el año de nacimiento a partir de la edad?',
    'Preguntas frecuentes sobre el cálculo de la edad',
    'Calcula tu edad de forma rápida y precisa'
  ];

  for (const heading of requiredHeadings) {
    assert.ok(
      html.includes(heading),
      `Article must naturally cover semantic heading: "${heading}"`
    );
  }

  // Contextual links to /calculadora-edad/
  const calcLinks = [...html.matchAll(/href="\/calculadora-edad\/"/g)];
  assert.ok(
    calcLinks.length >= 3 && calcLinks.length <= 8,
    `Must have 3 to 8 natural contextual links to the calculator (found ${calcLinks.length})`
  );

  // Reciprocal link from Calculator to Guide
  const calcHtml = fs.readFileSync(DIST_CALC_PATH, 'utf-8');
  assert.ok(
    calcHtml.includes('/calculadora-edad/guides/es/'),
    'Main Spanish Age Calculator must contain an internal link to the Guides hub'
  );
});

test('Spanish Age Guide — Sitemap Inclusion & XML Index Parity', () => {
  const i18nContent = fs.readFileSync(SITEMAP_I18N_PATH, 'utf-8');
  assert.ok(
    i18nContent.includes('<loc>https://freeaccuratecalculator.com/calculadora-edad/guides/es/</loc>'),
    'calculadora-edad/guides/es/ must be present in public/sitemap-i18n.xml'
  );

  const indexContent = fs.readFileSync(SITEMAP_INDEX_PATH, 'utf-8');
  assert.ok(
    indexContent.includes('sitemap-i18n.xml'),
    'Master sitemap.xml index must reference sitemap-i18n.xml'
  );
});

test('Spanish Age Guide — Language Integrity & English Phrase Audit', () => {
  let html = fs.readFileSync(DIST_GUIDE_PATH, 'utf-8');
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  html = html.replace(/<!--[\s\S]*?-->/g, '');

  const bannedEnglishPhrases = [
    'Age Calculator Guide',
    'How to calculate your age',
    'Chronological Age Calculator',
    'Gestational Age',
    'Biological Age',
    'Corrected Age',
    'Worked Example',
    'Frequently Asked Questions',
    'All rights reserved',
    'Related Calculators',
    'Calculate your exact age'
  ];

  for (const phrase of bannedEnglishPhrases) {
    const idx = html.indexOf(phrase);
    if (idx !== -1) {
      const snippet = html.substring(Math.max(0, idx - 40), Math.min(html.length, idx + phrase.length + 40));
      assert.fail(`Found prohibited English phrase "${phrase}" in Spanish guide content! Context: ${snippet}`);
    }
  }
});
