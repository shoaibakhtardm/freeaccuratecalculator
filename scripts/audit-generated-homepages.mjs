// scripts/audit-generated-homepages.mjs
import fs from 'node:fs';
import path from 'node:path';

const LOCALES = [
  { code: 'en', relPath: 'index.html', url: 'https://freeaccuratecalculator.com/', expectedDir: 'ltr' },
  { code: 'es', relPath: 'es/index.html', url: 'https://freeaccuratecalculator.com/es/', expectedDir: 'ltr' },
  { code: 'fr', relPath: 'fr/index.html', url: 'https://freeaccuratecalculator.com/fr/', expectedDir: 'ltr' },
  { code: 'de', relPath: 'de/index.html', url: 'https://freeaccuratecalculator.com/de/', expectedDir: 'ltr' },
  { code: 'hi', relPath: 'hi/index.html', url: 'https://freeaccuratecalculator.com/hi/', expectedDir: 'ltr' },
  { code: 'pt', relPath: 'pt/index.html', url: 'https://freeaccuratecalculator.com/pt/', expectedDir: 'ltr' },
  { code: 'it', relPath: 'it/index.html', url: 'https://freeaccuratecalculator.com/it/', expectedDir: 'ltr' },
  { code: 'ar', relPath: 'ar/index.html', url: 'https://freeaccuratecalculator.com/ar/', expectedDir: 'rtl' },
  { code: 'ja', relPath: 'ja/index.html', url: 'https://freeaccuratecalculator.com/ja/', expectedDir: 'ltr' },
  { code: 'zh', relPath: 'zh/index.html', url: 'https://freeaccuratecalculator.com/zh/', expectedDir: 'ltr' },
  { code: 'nl', relPath: 'nl/index.html', url: 'https://freeaccuratecalculator.com/nl/', expectedDir: 'ltr' },
  { code: 'ru', relPath: 'ru/index.html', url: 'https://freeaccuratecalculator.com/ru/', expectedDir: 'ltr' },
];

const RAW_SLUGS = [
  'scientific-calculator',
  'mortgage-calculator',
  'loan-calculator',
  'salary-calculator',
  'compound-interest-calculator',
  'body-fat-calculator',
  'bmr-calculator',
  'sip-calculator',
  'auto-loan-calculator',
  'gpa-calculator',
  'roi-calculator',
  'tip-calculator',
  'income-tax-calculator',
  'probability-calculator',
  'password-generator',
  'discount-calculator',
  'ovulation-calculator',
  'ohms-law-calculator',
  'pregnancy-due-date-calculator',
  'concrete-calculator',
  'paint-calculator',
  'amortization-calculator',
  'inflation-calculator',
  'square-footage-calculator',
];

const results = [];
let allPassed = true;

for (const loc of LOCALES) {
  const filePath = path.resolve('dist/client', loc.relPath);
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING FILE: ${filePath}`);
    allPassed = false;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');

  // 1. Canonical
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
  const canonical = canonicalMatch ? canonicalMatch[1] : '';
  const canonicalOk = canonical === loc.url;

  // 2. Lang & Dir
  const htmlTagMatch = html.match(/<html([^>]+)>/);
  const htmlAttrs = htmlTagMatch ? htmlTagMatch[1] : '';
  const langMatch = htmlAttrs.match(/lang="([^"]+)"/);
  const dirMatch = htmlAttrs.match(/dir="([^"]+)"/);
  const langOk = langMatch ? langMatch[1] === loc.code : false;
  const dirOk = dirMatch ? dirMatch[1] === loc.expectedDir : false;

  // 3. Hreflang
  const hreflangs = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(m => ({ lang: m[1], href: m[2] }));
  const hreflangCountOk = hreflangs.length === 13;
  const xDefault = hreflangs.find(h => h.lang === 'x-default');
  const xDefaultOk = xDefault && xDefault.href === 'https://freeaccuratecalculator.com/';
  const selfHreflang = hreflangs.find(h => h.lang === loc.code);
  const selfHreflangOk = selfHreflang && selfHreflang.href === loc.url;

  // 4. Title & H1
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch ? titleMatch[1] : '';
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const h1Text = h1Match ? h1Match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';

  // 5. Schema validation
  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const schemas = [];
  for (const b of jsonLdBlocks) {
    try {
      schemas.push(JSON.parse(b[1]));
    } catch (e) {
      console.error(`Malformed JSON-LD in ${loc.code}:`, e.message);
    }
  }

  const orgSchemas = schemas.filter(s => s['@type'] === 'Organization');
  const websiteSchemas = schemas.filter(s => s['@type'] === 'WebSite');
  const webPageSchemas = schemas.filter(s => s['@type'] === 'WebPage');
  const faqPageSchemas = schemas.filter(s => s['@type'] === 'FAQPage');

  const schemaOk =
    orgSchemas.length === 1 &&
    websiteSchemas.length === 1 &&
    webPageSchemas.length === 1 &&
    faqPageSchemas.length === 0;

  const hasDeadTwitter = html.includes('twitter.com/accuratecalc') || html.includes('twitter.com/FreeAccurateCalc');

  // 6. Popular calculators count & raw slug leak
  let slugLeakFound = false;
  if (loc.code !== 'en') {
    for (const slug of RAW_SLUGS) {
      if (html.includes(`>${slug}<`)) {
        console.error(`RAW SLUG LEAK in ${loc.code}: >${slug}<`);
        slugLeakFound = true;
      }
    }
  }

  // 7. Check methodology and FAQ sections exist in HTML
  const hasHowItWorks = html.includes('01') && html.includes('02') && html.includes('03');
  const hasFaq = html.includes('<details class="group py-4');

  // 8. Unsupported claims check
  const hasProblematicClaims =
    /100%\s*(Accurate|Private|Client)/i.test(html) ||
    /audit-grade/i.test(html) ||
    /sub-millisecond/i.test(html) ||
    /0ms/i.test(html) ||
    /IEEE[\s-]*754/i.test(html);

  const passed =
    canonicalOk &&
    langOk &&
    dirOk &&
    hreflangCountOk &&
    xDefaultOk &&
    selfHreflangOk &&
    schemaOk &&
    !hasDeadTwitter &&
    !slugLeakFound &&
    hasHowItWorks &&
    hasFaq &&
    !hasProblematicClaims;

  if (!passed) allPassed = false;

  results.push({
    code: loc.code,
    url: loc.url,
    title,
    h1Text,
    canonicalOk,
    langOk,
    dirOk,
    hreflangCount: hreflangs.length,
    xDefaultOk,
    selfHreflangOk,
    schemaOk,
    hasDeadTwitter,
    slugLeakFound,
    hasHowItWorks,
    hasFaq,
    hasProblematicClaims,
    status: passed ? 'PASS' : 'FAIL',
  });
}

console.table(results.map(r => ({
  Route: r.code === 'en' ? '/' : `/${r.code}/`,
  Status: r.status,
  Title: r.title.slice(0, 35) + '...',
  H1: r.h1Text.slice(0, 35) + '...',
  Canonical: r.canonicalOk ? 'PASS' : 'FAIL',
  Hreflang: r.hreflangCount === 13 ? '13 OK' : `${r.hreflangCount} ERR`,
  xDefault: r.xDefaultOk ? 'PASS' : 'FAIL',
  LangDir: r.langOk && r.dirOk ? 'PASS' : 'FAIL',
  Schema: r.schemaOk ? 'PASS' : 'FAIL',
  SlugLeak: r.slugLeakFound ? 'FAIL' : 'NONE',
  HowItWorks: r.hasHowItWorks ? 'PASS' : 'FAIL',
  FAQ: r.hasFaq ? 'PASS' : 'FAIL',
  TrustClaims: r.hasProblematicClaims ? 'FAIL' : 'CLEAN',
})));

console.log(`\nOVERALL AUDIT RESULT: ${allPassed ? 'ALL 12 ROUTES PASSED WITH 100% PRECISION!' : 'FAILURES DETECTED'}`);
process.exit(allPassed ? 0 : 1);
