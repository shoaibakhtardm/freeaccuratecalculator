// scripts/qa-homepage-languages.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const LOCALES = ['en', 'es', 'fr', 'de', 'hi', 'pt', 'it', 'ar', 'ja', 'zh', 'nl', 'ru'];

// Helper to decode HTML entities for clean text comparison
function decodeHtml(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');
}

// Find chunk file for homepageDict in dist/server
const serverChunksDir = path.join(rootDir, 'dist/server/chunks');
let HOMEPAGE_TRANSLATIONS = null;

if (fs.existsSync(serverChunksDir)) {
  const files = fs.readdirSync(serverChunksDir);
  const dictChunkFile = files.find(f => f.startsWith('homepageDict_') && f.endsWith('.mjs'));
  if (dictChunkFile) {
    const chunkModule = await import(path.join(serverChunksDir, dictChunkFile));
    HOMEPAGE_TRANSLATIONS = chunkModule.H || chunkModule.HOMEPAGE_TRANSLATIONS || chunkModule.default;
  }
}

console.log('\n=====================================================');
console.log('🚀 AUTOMATED HOMEPAGE I18N & LANGUAGE SELECTOR AUDIT');
console.log('=====================================================\n');

let passedCount = 0;
let failedCount = 0;
const resultsByLocale = {};

for (const locale of LOCALES) {
  const filePath = locale === 'en' 
    ? path.join(rootDir, 'dist/client/index.html')
    : path.join(rootDir, 'dist/client', locale, 'index.html');

  if (!fs.existsSync(filePath)) {
    console.error(`❌ [FAIL] Missing rendered file: ${filePath}`);
    failedCount++;
    continue;
  }

  const rawHtml = fs.readFileSync(filePath, 'utf8');
  const cleanHtml = decodeHtml(rawHtml);
  const expected = HOMEPAGE_TRANSLATIONS ? HOMEPAGE_TRANSLATIONS[locale] : null;

  console.log(`-----------------------------------------------------`);
  console.log(`🔍 Auditing Locale: [${locale.toUpperCase()}] -> ${filePath}`);
  console.log(`-----------------------------------------------------`);

  const checks = [
    {
      name: 'HTML lang attribute',
      test: () => rawHtml.includes(`lang="${locale}"`),
      detail: `Expected <html lang="${locale}">`,
    },
    {
      name: 'RTL direction (Arabic only)',
      test: () => {
        if (locale === 'ar') {
          return rawHtml.includes('dir="rtl"') || rawHtml.includes('rtl-layout');
        }
        return !rawHtml.includes('dir="rtl"');
      },
      detail: locale === 'ar' ? 'Expected dir="rtl" / rtl-layout class' : 'Expected LTR default',
    },
    {
      name: 'Hero Pill Badge',
      test: () => expected ? cleanHtml.includes(decodeHtml(expected.hero.pillBadge)) : true,
      detail: expected ? `Expected: "${expected.hero.pillBadge}"` : 'Hero badge',
    },
    {
      name: 'Hero H1 Line 1',
      test: () => expected ? cleanHtml.includes(decodeHtml(expected.hero.h1Line1)) : true,
      detail: expected ? `Expected: "${expected.hero.h1Line1}"` : 'Hero H1',
    },
    {
      name: 'Hero H1 Highlight',
      test: () => expected ? cleanHtml.includes(decodeHtml(expected.hero.h1Highlight)) : true,
      detail: expected ? `Expected: "${expected.hero.h1Highlight}"` : 'Hero highlight',
    },
    {
      name: 'Hero Subtitle',
      test: () => expected ? cleanHtml.includes(decodeHtml(expected.hero.subtitle)) : true,
      detail: expected ? `Expected: "${expected.hero.subtitle}"` : 'Hero subtitle',
    },
    {
      name: 'Hero Metric 1 Label',
      test: () => expected ? cleanHtml.includes(decodeHtml(expected.hero.metric1Label)) : true,
      detail: expected ? `Expected: "${expected.hero.metric1Label}"` : 'Metric 1 label',
    },
    {
      name: 'Hero Metric 2 Label',
      test: () => expected ? cleanHtml.includes(decodeHtml(expected.hero.metric2Label)) : true,
      detail: expected ? `Expected: "${expected.hero.metric2Label}"` : 'Metric 2 label',
    },
    {
      name: 'Hero Metric 3 Label',
      test: () => expected ? cleanHtml.includes(decodeHtml(expected.hero.metric3Label)) : true,
      detail: expected ? `Expected: "${expected.hero.metric3Label}"` : 'Metric 3 label',
    },
    {
      name: 'Categories Section Heading',
      test: () => expected ? cleanHtml.includes(decodeHtml(expected.categoriesSection.heading)) : true,
      detail: expected ? `Expected: "${expected.categoriesSection.heading}"` : 'Categories heading',
    },
    {
      name: 'Categories Count (21 Domains)',
      test: () => {
        if (!expected) return true;
        const catKeys = Object.keys(expected.categoriesSection.categories);
        return catKeys.length === 21 && catKeys.every(k => cleanHtml.includes(decodeHtml(expected.categoriesSection.categories[k])));
      },
      detail: `Expected all 21 categories translated in HTML`,
    },
    {
      name: 'Popular Calculators Section Heading',
      test: () => expected ? cleanHtml.includes(decodeHtml(expected.popularSection.heading)) : true,
      detail: expected ? `Expected: "${expected.popularSection.heading}"` : 'Popular heading',
    },
    {
      name: 'Popular Calculators (21 Tools Translated)',
      test: () => {
        if (!expected) return true;
        const toolKeys = Object.keys(expected.popularSection.tools);
        return toolKeys.length === 21 && toolKeys.every(k => cleanHtml.includes(decodeHtml(expected.popularSection.tools[k])));
      },
      detail: `Expected all 21 popular tool names translated in HTML`,
    },
    {
      name: 'Supported Regions Section Heading',
      test: () => expected ? cleanHtml.includes(decodeHtml(expected.regionsSection.heading)) : true,
      detail: expected ? `Expected: "${expected.regionsSection.heading}"` : 'Regions heading',
    },
    {
      name: 'Supported Regions (18 Countries Translated)',
      test: () => {
        if (!expected) return true;
        const countryKeys = Object.keys(expected.regionsSection.countries);
        return countryKeys.length === 18 && countryKeys.every(k => cleanHtml.includes(decodeHtml(expected.regionsSection.countries[k])));
      },
      detail: `Expected all 18 country names translated in HTML`,
    },
    {
      name: 'About Section Eyebrow',
      test: () => expected ? cleanHtml.includes(decodeHtml(expected.aboutSection.eyebrow)) : true,
      detail: expected ? `Expected: "${expected.aboutSection.eyebrow}"` : 'About eyebrow',
    },
    {
      name: 'About Section H2 Heading',
      test: () => expected ? cleanHtml.includes(decodeHtml(expected.aboutSection.h2)) : true,
      detail: expected ? `Expected: "${expected.aboutSection.h2}"` : 'About H2',
    },
    {
      name: 'About Section Pillars (All 6 Pillars)',
      test: () => {
        if (!expected) return true;
        return (
          cleanHtml.includes(decodeHtml(expected.aboutSection.pillar1Title)) &&
          cleanHtml.includes(decodeHtml(expected.aboutSection.pillar2Title)) &&
          cleanHtml.includes(decodeHtml(expected.aboutSection.pillar3Title)) &&
          cleanHtml.includes(decodeHtml(expected.aboutSection.pillar4Title)) &&
          cleanHtml.includes(decodeHtml(expected.aboutSection.pillar5Title)) &&
          cleanHtml.includes(decodeHtml(expected.aboutSection.pillar6Title))
        );
      },
      detail: `Expected all 6 core pillars in ${locale}`,
    },
    {
      name: 'About Section CTA Button',
      test: () => expected ? cleanHtml.includes(decodeHtml(expected.aboutSection.ctaButton)) : true,
      detail: expected ? `Expected: "${expected.aboutSection.ctaButton}"` : 'About CTA button',
    },
    {
      name: 'Orphan Rescue Links Section',
      test: () => expected ? cleanHtml.includes(decodeHtml(expected.orphanSection.heading)) && cleanHtml.includes(decodeHtml(expected.orphanSection.badge)) : true,
      detail: expected ? `Expected: "${expected.orphanSection.heading}"` : 'Orphan links heading',
    },
    {
      name: 'Footer Links (About, Contact, Terms, Privacy, Guides)',
      test: () => {
        if (!expected) return true;
        return (
          cleanHtml.includes(decodeHtml(expected.footer.about)) &&
          cleanHtml.includes(decodeHtml(expected.footer.contact)) &&
          cleanHtml.includes(decodeHtml(expected.footer.terms)) &&
          cleanHtml.includes(decodeHtml(expected.footer.privacy)) &&
          cleanHtml.includes(decodeHtml(expected.footer.guides))
        );
      },
      detail: `Expected footer navigation translated in ${locale}`,
    },
    {
      name: 'Language Selector In Header (All 12 options present)',
      test: () => {
        return LOCALES.every(loc => rawHtml.includes(`data-code="${loc}"`));
      },
      detail: `Expected language dropdown to contain options for all 12 locales`,
    },
  ];

  let localeFailed = 0;
  for (const check of checks) {
    try {
      const passed = check.test();
      if (passed) {
        console.log(`  ✅ [PASS] ${check.name}`);
      } else {
        console.log(`  ❌ [FAIL] ${check.name} — ${check.detail}`);
        localeFailed++;
      }
    } catch (err) {
      console.log(`  ❌ [ERROR] ${check.name}: ${err.message}`);
      localeFailed++;
    }
  }

  if (localeFailed === 0) {
    console.log(`\n🎉 Locale [${locale.toUpperCase()}] PASSED ALL ${checks.length} CHECKS!\n`);
    passedCount++;
    resultsByLocale[locale] = 'PASS';
  } else {
    console.log(`\n⚠️ Locale [${locale.toUpperCase()}] had ${localeFailed} failures.\n`);
    failedCount++;
    resultsByLocale[locale] = 'FAIL';
  }
}

console.log('=====================================================');
console.log(`FINAL RESULTS: ${passedCount}/${LOCALES.length} Locales Passed (${failedCount} Failed)`);
console.log('=====================================================\n');

if (failedCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
