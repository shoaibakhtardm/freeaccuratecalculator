import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const DIST_DIR = path.resolve('dist/client');

console.log('🔍 Auditing dist/client France files...');

// 1. Invariant: Legacy unlocalized /countries/france/index.html MUST NOT EXIST
const unlocalizedPath = path.join(DIST_DIR, 'countries/france/index.html');
assert(!fs.existsSync(unlocalizedPath), 'FAIL: Legacy unlocalized /countries/france/index.html exists in dist!');
console.log('✅ PASS: No legacy unlocalized /countries/france/index.html');

// 2. Hubs exist
const enHubPath = path.join(DIST_DIR, 'countries/france/en/index.html');
const frHubPath = path.join(DIST_DIR, 'countries/france/fr/index.html');
assert(fs.existsSync(enHubPath), 'FAIL: /countries/france/en/index.html missing');
assert(fs.existsSync(frHubPath), 'FAIL: /countries/france/fr/index.html missing');

const enHubHtml = fs.readFileSync(enHubPath, 'utf8');
const frHubHtml = fs.readFileSync(frHubPath, 'utf8');

assert(enHubHtml.includes('lang="en"'), 'FAIL: EN Hub missing lang="en"');
assert(frHubHtml.includes('lang="fr"'), 'FAIL: FR Hub missing lang="fr"');
assert(enHubHtml.includes('Free & Accurate Calculators France 2026'), 'FAIL: EN Hub title missing');
assert(frHubHtml.includes('Calculatrices et Simulateurs Gratuits France 2026'), 'FAIL: FR Hub title missing');
console.log('✅ PASS: France EN and FR Hubs verified');

// 3. Guides Hubs exist
const enGuidesHubPath = path.join(DIST_DIR, 'countries/france/en/guides/index.html');
const frGuidesHubPath = path.join(DIST_DIR, 'countries/france/fr/guides/index.html');
assert(fs.existsSync(enGuidesHubPath), 'FAIL: /countries/france/en/guides/index.html missing');
assert(fs.existsSync(frGuidesHubPath), 'FAIL: /countries/france/fr/guides/index.html missing');

const enGuidesHubHtml = fs.readFileSync(enGuidesHubPath, 'utf8');
const frGuidesHubHtml = fs.readFileSync(frGuidesHubPath, 'utf8');

assert(enGuidesHubHtml.includes('Practical France Guides 2026'), 'FAIL: EN Guides Hub missing EN title');
assert(frGuidesHubHtml.includes('Guides Pratiques France 2026'), 'FAIL: FR Guides Hub missing FR title');
assert(enGuidesHubHtml.includes('Read guide'), 'FAIL: EN Guides Hub missing EN CTA');
assert(frGuidesHubHtml.includes('Lire le guide'), 'FAIL: FR Guides Hub missing FR CTA');
console.log('✅ PASS: France Guides EN and FR Hubs verified');

import { FRANCE_GUIDES_FR } from '../src/data/france-guides.ts';

for (const guide of FRANCE_GUIDES_FR) {
  const slug = guide.slug;
  const enGuideFile = path.join(DIST_DIR, `countries/france/en/guides/${slug}/index.html`);
  const frGuideFile = path.join(DIST_DIR, `countries/france/fr/guides/${slug}/index.html`);

  assert(fs.existsSync(enGuideFile), `FAIL: EN Guide ${slug} missing in dist`);
  assert(fs.existsSync(frGuideFile), `FAIL: FR Guide ${slug} missing in dist`);

  const enContent = fs.readFileSync(enGuideFile, 'utf8');
  const frContent = fs.readFileSync(frGuideFile, 'utf8');

  // Verify lang attribute
  assert(enContent.includes('lang="en"'), `FAIL: EN Guide ${slug} missing lang="en"`);
  assert(frContent.includes('lang="fr"'), `FAIL: FR Guide ${slug} missing lang="fr"`);

  // Verify hreflang reciprocity
  assert(enContent.includes(`hreflang="fr" href="https://freeaccuratecalculator.com/countries/france/fr/guides/${slug}/"`), `FAIL: EN Guide ${slug} missing FR hreflang`);
  assert(enContent.includes(`hreflang="en" href="https://freeaccuratecalculator.com/countries/france/en/guides/${slug}/"`), `FAIL: EN Guide ${slug} missing EN hreflang`);
  assert(frContent.includes(`hreflang="fr" href="https://freeaccuratecalculator.com/countries/france/fr/guides/${slug}/"`), `FAIL: FR Guide ${slug} missing FR hreflang`);
  assert(frContent.includes(`hreflang="en" href="https://freeaccuratecalculator.com/countries/france/en/guides/${slug}/"`), `FAIL: FR Guide ${slug} missing EN hreflang`);

  // Verify UI language consistency
  assert(!enContent.includes('Questions Fréquentes'), `FAIL: EN Guide ${slug} contains "Questions Fréquentes"`);
  assert(!enContent.includes('Simulateur Gratuit 2026'), `FAIL: EN Guide ${slug} contains "Simulateur Gratuit 2026"`);
  assert(enContent.includes('Practical Guides'), `FAIL: EN Guide ${slug} missing "Practical Guides"`);
  assert(enContent.includes('Frequently Asked Questions'), `FAIL: EN Guide ${slug} missing "Frequently Asked Questions"`);
  assert(frContent.includes('Questions Fréquentes'), `FAIL: FR Guide ${slug} missing "Questions Fréquentes"`);
  assert(frContent.includes('Simulateur Gratuit 2026'), `FAIL: FR Guide ${slug} missing "Simulateur Gratuit 2026"`);
}
console.log(`✅ PASS: All ${FRANCE_GUIDES_FR.length} France Guides verified in EN and FR`);

// 5. Verify specialized calculators preserved
const SPECIALIZED = [
  'frais-de-notaire',
  'simulateur-salaire-brut-net',
  'capacite-emprunt-hcsf',
  'simulateur-apl',
  'indemnites-kilometriques',
  'frais-reels-abattement',
  'simulateur-ptz',
  'taxe-amenagement',
  'indemnite-licenciement',
  'simulateur-lmnp-reel-micro-bic'
];

for (const calc of SPECIALIZED) {
  const calcFile = path.join(DIST_DIR, `countries/france/${calc}/index.html`);
  assert(fs.existsSync(calcFile), `FAIL: Specialized tool ${calc} missing in dist`);
  const content = fs.readFileSync(calcFile, 'utf8');
  assert(content.includes('lang="fr"'), `FAIL: Specialized tool ${calc} not lang="fr"`);
  assert(content.includes(`rel="canonical" href="https://freeaccuratecalculator.com/countries/france/${calc}/"`), `FAIL: Self-referencing canonical missing for ${calc}`);
}
console.log(`✅ PASS: All ${SPECIALIZED.length} specialized French calculators preserved`);

// 6. Verify Notaire city pages preserved
const NOTAIRE_CITIES = ['paris', 'lyon', 'marseille', 'toulouse', 'nice', 'nantes', 'strasbourg', 'montpellier', 'bordeaux', 'lille'];
for (const city of NOTAIRE_CITIES) {
  const cityFile = path.join(DIST_DIR, `countries/france/frais-notaire/${city}/index.html`);
  assert(fs.existsSync(cityFile), `FAIL: Notaire city ${city} missing in dist`);
  const content = fs.readFileSync(cityFile, 'utf8');
  assert(content.includes('lang="fr"'), `FAIL: Notaire city ${city} not lang="fr"`);
}
console.log(`✅ PASS: All ${NOTAIRE_CITIES.length} Notaire city pages preserved`);

console.log('\n🎉 ALL DIST ARTIFACT AUDITS PASSED WITH ZERO ERRORS!');
