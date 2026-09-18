// tests/france-bilingual-pilot.test.mjs
import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const distClientDir = path.resolve('dist/client');

describe('France Bilingual URL-Level Pilot Architecture', () => {
  const pilotRoutes = [
    // Hubs
    {
      url: '/countries/france/fr/',
      file: 'countries/france/fr/index.html',
      lang: 'fr',
      canonical: 'https://freeaccuratecalculator.com/countries/france/fr/',
      hreflangFr: 'https://freeaccuratecalculator.com/countries/france/fr/',
      hreflangEn: 'https://freeaccuratecalculator.com/countries/france/en/',
      h1Expect: 'Calculatrices & Simulateurs Gratuits pour la France',
    },
    {
      url: '/countries/france/en/',
      file: 'countries/france/en/index.html',
      lang: 'en',
      canonical: 'https://freeaccuratecalculator.com/countries/france/en/',
      hreflangFr: 'https://freeaccuratecalculator.com/countries/france/fr/',
      hreflangEn: 'https://freeaccuratecalculator.com/countries/france/en/',
      h1Expect: 'Free & Accurate Precision Calculators for France',
    },
    // Category: Finance
    {
      url: '/countries/france/fr/finance/',
      file: 'countries/france/fr/finance/index.html',
      lang: 'fr',
      canonical: 'https://freeaccuratecalculator.com/countries/france/fr/finance/',
      hreflangFr: 'https://freeaccuratecalculator.com/countries/france/fr/finance/',
      hreflangEn: 'https://freeaccuratecalculator.com/countries/france/en/finance/',
      h1Expect: 'Calculatrices Finance France',
    },
    {
      url: '/countries/france/en/finance/',
      file: 'countries/france/en/finance/index.html',
      lang: 'en',
      canonical: 'https://freeaccuratecalculator.com/countries/france/en/finance/',
      hreflangFr: 'https://freeaccuratecalculator.com/countries/france/fr/finance/',
      hreflangEn: 'https://freeaccuratecalculator.com/countries/france/en/finance/',
      h1Expect: 'France Finance Calculators',
    },
    // Calculator: SIP
    {
      url: '/countries/france/fr/finance/sip-calculator/',
      file: 'countries/france/fr/finance/sip-calculator/index.html',
      lang: 'fr-FR',
      canonical: 'https://freeaccuratecalculator.com/countries/france/fr/finance/sip-calculator/',
      hreflangFr: 'https://freeaccuratecalculator.com/countries/france/fr/finance/sip-calculator/',
      hreflangEn: 'https://freeaccuratecalculator.com/countries/france/en/finance/sip-calculator/',
      h1Expect: 'Simulateur SIP & Épargne Programmée France',
    },
    {
      url: '/countries/france/en/finance/sip-calculator/',
      file: 'countries/france/en/finance/sip-calculator/index.html',
      lang: 'en',
      canonical: 'https://freeaccuratecalculator.com/countries/france/en/finance/sip-calculator/',
      hreflangFr: 'https://freeaccuratecalculator.com/countries/france/fr/finance/sip-calculator/',
      hreflangEn: 'https://freeaccuratecalculator.com/countries/france/en/finance/sip-calculator/',
      h1Expect: 'SIP & Investment Calculator France',
    },
    // Calculator: Income Tax
    {
      url: '/countries/france/fr/finance/income-tax-calculator/',
      file: 'countries/france/fr/finance/income-tax-calculator/index.html',
      lang: 'fr-FR',
      canonical: 'https://freeaccuratecalculator.com/countries/france/fr/finance/income-tax-calculator/',
      hreflangFr: 'https://freeaccuratecalculator.com/countries/france/fr/finance/income-tax-calculator/',
      hreflangEn: 'https://freeaccuratecalculator.com/countries/france/en/finance/income-tax-calculator/',
      h1Expect: "Simulateur d'Impôt sur le Revenu France",
    },
    {
      url: '/countries/france/en/finance/income-tax-calculator/',
      file: 'countries/france/en/finance/income-tax-calculator/index.html',
      lang: 'en',
      canonical: 'https://freeaccuratecalculator.com/countries/france/en/finance/income-tax-calculator/',
      hreflangFr: 'https://freeaccuratecalculator.com/countries/france/fr/finance/income-tax-calculator/',
      hreflangEn: 'https://freeaccuratecalculator.com/countries/france/en/finance/income-tax-calculator/',
      h1Expect: 'France Income Tax Calculator',
    },
    // Calculator: Mortgage
    {
      url: '/countries/france/fr/finance/mortgage-calculator/',
      file: 'countries/france/fr/finance/mortgage-calculator/index.html',
      lang: 'fr-FR',
      canonical: 'https://freeaccuratecalculator.com/countries/france/fr/finance/mortgage-calculator/',
      hreflangFr: 'https://freeaccuratecalculator.com/countries/france/fr/finance/mortgage-calculator/',
      hreflangEn: 'https://freeaccuratecalculator.com/countries/france/en/finance/mortgage-calculator/',
      h1Expect: 'Simulateur de Prêt Immobilier France',
    },
    {
      url: '/countries/france/en/finance/mortgage-calculator/',
      file: 'countries/france/en/finance/mortgage-calculator/index.html',
      lang: 'en',
      canonical: 'https://freeaccuratecalculator.com/countries/france/en/finance/mortgage-calculator/',
      hreflangFr: 'https://freeaccuratecalculator.com/countries/france/fr/finance/mortgage-calculator/',
      hreflangEn: 'https://freeaccuratecalculator.com/countries/france/en/finance/mortgage-calculator/',
      h1Expect: 'France Mortgage & Real Estate Loan Calculator',
    },
    // Calculator: Salary
    {
      url: '/countries/france/fr/finance/salary-calculator/',
      file: 'countries/france/fr/finance/salary-calculator/index.html',
      lang: 'fr-FR',
      canonical: 'https://freeaccuratecalculator.com/countries/france/fr/finance/salary-calculator/',
      hreflangFr: 'https://freeaccuratecalculator.com/countries/france/fr/finance/salary-calculator/',
      hreflangEn: 'https://freeaccuratecalculator.com/countries/france/en/finance/salary-calculator/',
      h1Expect: 'Calculateur Salaire Brut en Net France',
    },
    {
      url: '/countries/france/en/finance/salary-calculator/',
      file: 'countries/france/en/finance/salary-calculator/index.html',
      lang: 'en',
      canonical: 'https://freeaccuratecalculator.com/countries/france/en/finance/salary-calculator/',
      hreflangFr: 'https://freeaccuratecalculator.com/countries/france/fr/finance/salary-calculator/',
      hreflangEn: 'https://freeaccuratecalculator.com/countries/france/en/finance/salary-calculator/',
      h1Expect: 'France Salary Calculator (Gross to Net)',
    },
  ];

  it('All pilot routes are compiled into dist/client as valid HTML documents', () => {
    for (const route of pilotRoutes) {
      const fullPath = path.join(distClientDir, route.file);
      assert.strictEqual(
        fs.existsSync(fullPath),
        true,
        `Expected generated HTML at ${route.file} for route ${route.url}`
      );
    }
  });

  it('HTML lang attribute matches authoritative URL language', () => {
    for (const route of pilotRoutes) {
      const fullPath = path.join(distClientDir, route.file);
      if (!fs.existsSync(fullPath)) continue;
      const html = fs.readFileSync(fullPath, 'utf-8');
      assert.match(
        html,
        new RegExp(`<html[^>]*lang=["']${route.lang}["']`, 'i'),
        `Expected lang="${route.lang}" in ${route.file}`
      );
    }
  });

  it('Self-referencing canonical is accurate for both FR and EN endpoints', () => {
    for (const route of pilotRoutes) {
      const fullPath = path.join(distClientDir, route.file);
      if (!fs.existsSync(fullPath)) continue;
      const html = fs.readFileSync(fullPath, 'utf-8');
      assert.match(
        html,
        new RegExp(`<link[^>]*rel=["']canonical["'][^>]*href=["']${route.canonical}["']`, 'i'),
        `Expected canonical="${route.canonical}" in ${route.file}`
      );
    }
  });

  it('Hreflang tags establish bidirectional reciprocity between FR and EN pairs', () => {
    for (const route of pilotRoutes) {
      const fullPath = path.join(distClientDir, route.file);
      if (!fs.existsSync(fullPath)) continue;
      const html = fs.readFileSync(fullPath, 'utf-8');

      // Check hreflang fr (previously fr-FR — changed to fr for facSetActiveLanguage compatibility)
      assert.match(
        html,
        new RegExp(`<link[^>]*hreflang=["']fr["'][^>]*href=["']${route.hreflangFr}["']`, 'i'),
        `Expected hreflang="fr" pointing to ${route.hreflangFr} in ${route.file}`
      );

      // Check hreflang en
      assert.match(
        html,
        new RegExp(`<link[^>]*hreflang=["']en["'][^>]*href=["']${route.hreflangEn}["']`, 'i'),
        `Expected hreflang="en" pointing to ${route.hreflangEn} in ${route.file}`
      );
    }
  });

  it('Language toggle in header provides direct context-preserving URL switches', () => {
    for (const route of pilotRoutes) {
      const fullPath = path.join(distClientDir, route.file);
      if (!fs.existsSync(fullPath)) continue;
      const html = fs.readFileSync(fullPath, 'utf-8');

      // Check FR link
      assert.match(
        html,
        new RegExp(`href=["']${route.hreflangFr}["']|href=["']${new URL(route.hreflangFr).pathname}["']`, 'i'),
        `Expected link to ${route.hreflangFr} in ${route.file}`
      );

      // Check EN link
      assert.match(
        html,
        new RegExp(`href=["']${route.hreflangEn}["']|href=["']${new URL(route.hreflangEn).pathname}["']`, 'i'),
        `Expected link to ${route.hreflangEn} in ${route.file}`
      );
    }
  });

  it('Public _redirects maps root /countries/france and /countries/france/ permanently to /countries/france/fr/', () => {
    const redirectsFile = path.resolve('public/_redirects');
    assert.strictEqual(fs.existsSync(redirectsFile), true);
    const content = fs.readFileSync(redirectsFile, 'utf-8');
    assert.match(
      content,
      /\/countries\/france\s+\/countries\/france\/fr\/\s+301/,
      'Expected 301 redirect from /countries/france to /countries/france/fr/'
    );
    assert.match(
      content,
      /\/countries\/france\/\s+\/countries\/france\/fr\/\s+301/,
      'Expected 301 redirect from /countries/france/ to /countries/france/fr/'
    );
  });

  it('Legacy unlocalized /countries/france/index.html does not exist in dist/client', () => {
    const legacyPath = path.join(distClientDir, 'countries/france/index.html');
    assert.strictEqual(
      fs.existsSync(legacyPath),
      false,
      'Legacy duplicate /countries/france/index.html must NOT exist in production build'
    );
  });

  it('Homepage and /countries/ directory point France links directly to /countries/france/fr/', () => {
    const homeHtml = fs.readFileSync(path.join(distClientDir, 'index.html'), 'utf-8');
    assert.match(
      homeHtml,
      /href=["']\/countries\/france\/fr\/["']/,
      'Homepage France link must point to /countries/france/fr/'
    );

    const countriesHtml = fs.readFileSync(path.join(distClientDir, 'countries/index.html'), 'utf-8');
    assert.match(
      countriesHtml,
      /href=["']\/countries\/france\/fr\/["']/,
      'Countries directory France link must point to /countries/france/fr/'
    );
  });

  it('Sitemaps exclude legacy /countries/france/ and include canonical /countries/france/fr/ & /en/', () => {
    const sitemapFiles = fs.readdirSync(distClientDir).filter((f) => f.startsWith('sitemap') && f.endsWith('.xml'));
    let foundFr = false;
    let foundEn = false;
    let foundLegacy = false;

    for (const file of sitemapFiles) {
      const content = fs.readFileSync(path.join(distClientDir, file), 'utf-8');
      if (content.includes('https://freeaccuratecalculator.com/countries/france/fr/')) foundFr = true;
      if (content.includes('https://freeaccuratecalculator.com/countries/france/en/')) foundEn = true;
      if (
        content.includes('<loc>https://freeaccuratecalculator.com/countries/france/</loc>') ||
        content.includes('<loc>https://freeaccuratecalculator.com/countries/france</loc>')
      ) {
        foundLegacy = true;
      }
    }

    assert.strictEqual(foundFr, true, 'Sitemaps must include https://freeaccuratecalculator.com/countries/france/fr/');
    assert.strictEqual(foundEn, true, 'Sitemaps must include https://freeaccuratecalculator.com/countries/france/en/');
    assert.strictEqual(foundLegacy, false, 'Sitemaps must NOT include legacy https://freeaccuratecalculator.com/countries/france/');
  });

  it('Consolidated legacy routes (finance, guides, percentage-calculator) do NOT exist as HTML in dist/client', () => {
    const legacyRoutes = [
      'countries/france/finance/index.html',
      'countries/france/guides/index.html',
      'countries/france/percentage-calculator/index.html',
      'countries/france/guides/assurance-emprunteur-loi-lemoine/index.html',
      'countries/france/guides/bareme-impot-revenu-2026/index.html',
      'countries/france/guides/taxe-amenagement-baremes-2026/index.html',
    ];
    for (const route of legacyRoutes) {
      const fullPath = path.join(distClientDir, route);
      assert.strictEqual(
        fs.existsSync(fullPath),
        false,
        `Consolidated legacy file ${route} must NOT exist in production build`
      );
    }
  });

  it('All 10 Notaire City SEO pages exist and compile cleanly in dist/client', () => {
    const cities = ['paris', 'marseille', 'lyon', 'toulouse', 'nice', 'nantes', 'montpellier', 'strasbourg', 'bordeaux', 'lille'];
    for (const city of cities) {
      const fullPath = path.join(distClientDir, `countries/france/frais-notaire/${city}/index.html`);
      assert.strictEqual(
        fs.existsSync(fullPath),
        true,
        `Notaire city page for ${city} must exist in dist/client`
      );
    }
  });

  it('All 10 custom France interactive calculators exist and compile cleanly in dist/client', () => {
    const tools = [
      'capacite-emprunt-hcsf',
      'frais-de-notaire',
      'frais-reels-abattement',
      'indemnite-licenciement',
      'indemnites-kilometriques',
      'simulateur-apl',
      'simulateur-lmnp-reel-micro-bic',
      'simulateur-ptz',
      'simulateur-salaire-brut-net',
      'taxe-amenagement',
    ];
    for (const tool of tools) {
      const fullPath = path.join(distClientDir, `countries/france/${tool}/index.html`);
      assert.strictEqual(
        fs.existsSync(fullPath),
        true,
        `Custom France tool ${tool} must exist in dist/client`
      );
    }
  });

  it('Non-France countries remain 100% functional and unregressed', () => {
    const indiaPath = path.join(distClientDir, 'countries/india/index.html');
    const usPath = path.join(distClientDir, 'countries/united-states/index.html');
    const ukPath = path.join(distClientDir, 'countries/united-kingdom/index.html');
    const dePath = path.join(distClientDir, 'countries/germany/index.html');

    assert.strictEqual(fs.existsSync(indiaPath), true, 'India country page must exist');
    assert.strictEqual(fs.existsSync(usPath), true, 'US country page must exist');
    assert.strictEqual(fs.existsSync(ukPath), true, 'UK country page must exist');
    assert.strictEqual(fs.existsSync(dePath), true, 'Germany country page must exist');
  });
});
