// tests/audit-ferias-pt.mjs
import fs from 'node:fs';
import path from 'node:path';

const htmlPath = path.resolve('dist/client/calculadora-de-ferias/pt/index.html');
if (!fs.existsSync(htmlPath)) {
  console.error('ERROR: dist/client/calculadora-de-ferias/pt/index.html not found! Run npm run build first.');
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf-8');

console.log('--- AUDITING CALCULADORA DE FÉRIAS CLT 2026 (/calculadora-de-ferias/pt/) ---');

// 1. Language Attribute
const langMatch = html.match(/<html[^>]*lang=["']([^"']+)["']/i);
console.log('HTML lang:', langMatch ? langMatch[1] : 'NOT FOUND');
if (!langMatch || !langMatch[1].startsWith('pt')) {
  console.error('FAILED: lang must start with pt (expected pt-BR)');
  process.exit(1);
}

// 2. Strict Canonical URL
const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
console.log('Canonical URL:', canonicalMatch ? canonicalMatch[1] : 'NOT FOUND');
if (!canonicalMatch || canonicalMatch[1] !== 'https://freeaccuratecalculator.com/calculadora-de-ferias/pt/') {
  console.error('FAILED: canonical URL must be strictly https://freeaccuratecalculator.com/calculadora-de-ferias/pt/');
  process.exit(1);
}

// 3. Document Title
const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
console.log('Title:', titleMatch ? titleMatch[1] : 'NOT FOUND');
if (!titleMatch || !titleMatch[1].includes('Calculadora de Férias 2026')) {
  console.error('FAILED: Title must contain "Calculadora de Férias 2026"');
  process.exit(1);
}

// 4. Single H1 Verification
const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
console.log('H1 count:', h1Matches.length);
if (h1Matches.length !== 1) {
  console.error(`FAILED: Expected exactly 1 H1 element, found ${h1Matches.length}`);
  process.exit(1);
}
const h1Text = h1Matches[0][1].replace(/<[^>]+>/g, '').trim();
console.log('H1 Text:', h1Text);
if (h1Text !== 'Calculadora de Férias 2026') {
  console.error('FAILED: H1 must be exactly "Calculadora de Férias 2026", got:', h1Text);
  process.exit(1);
}

// 5. Meta Description
const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
console.log('Meta Description:', descMatch ? descMatch[1] : 'NOT FOUND');
if (!descMatch || !descMatch[1].includes('férias') || !descMatch[1].includes('1/3')) {
  console.error('FAILED: Meta description missing or inadequate');
  process.exit(1);
}

// 6. Structured Data (JSON-LD)
const jsonLdMatches = [...html.matchAll(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
console.log('JSON-LD scripts found:', jsonLdMatches.length);
let hasWebApp = false;
let hasFAQ = false;
let hasBreadcrumbs = false;

for (const m of jsonLdMatches) {
  try {
    const data = JSON.parse(m[1]);
    const str = JSON.stringify(data);
    if (str.includes('SoftwareApplication') || str.includes('WebApplication')) hasWebApp = true;
    if (str.includes('FAQPage')) hasFAQ = true;
    if (str.includes('BreadcrumbList')) hasBreadcrumbs = true;
  } catch (e) {
    console.error('JSON-LD parse error:', e.message);
  }
}
console.log('Structured data check:', { hasWebApp, hasFAQ, hasBreadcrumbs });
if (!hasWebApp || !hasFAQ || !hasBreadcrumbs) {
  console.error('FAILED: Required schema types missing (must have WebApplication, FAQPage, BreadcrumbList)');
  process.exit(1);
}

// 7. Verification of Clean Portuguese Localization (No English leakage in UI)
const visibleHtml = html
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<svg[\s\S]*?<\/svg>/gi, '')
  .replace(/<!--[\s\S]*?-->/g, '');

const englishKeywordsToCheck = [
  /\bGross Salary\b/i,
  /\bNet Salary\b/i,
  /\bVacation Pay\b/i,
  /\bCalculate\b/i,
  /\bFrequently Asked Questions\b/i,
  /\bKnowledge Base\b/i,
  /\bStep-by-Step\b/i,
  /\bMathematical Definition\b/i,
  /\bStandard Formula\b/i,
  /\bVariables:\b/i,
];

let leakCount = 0;
for (const regex of englishKeywordsToCheck) {
  if (regex.test(visibleHtml)) {
    console.warn(`WARNING: Potential English leak detected: ${regex}`);
    leakCount++;
  }
}

if (leakCount > 0) {
  console.error(`FAILED: ${leakCount} untranslated English strings detected in user-facing HTML.`);
  process.exit(1);
}

// 8. Hreflang Verification (Non-English page with no alternate locales must NOT emit ghost 404 hreflangs)
const hreflangMatches = [...html.matchAll(/<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["']/gi)];
console.log('Hreflang tags found:', hreflangMatches.length);
for (const match of hreflangMatches) {
  console.log(`  hreflang="${match[1]}" href="${match[2]}"`);
  // Ensure no broken ghost paths like /es/calculadora-de-ferias/
  if (match[2].includes('404') || match[2].includes('localhost')) {
    console.error('FAILED: Invalid hreflang href found:', match[2]);
    process.exit(1);
  }
}

// 9. Verify Essential Content & Entity Coverage
const essentialTopics = [
  'Adicional Constitucional de 1/3',
  'Abono Pecuniário',
  'Artigo 145 da CLT',
  'INSS 2026',
  'Novo IRRF',
  'Isenção',
  'Reforma Trabalhista',
  'Lei nº 13.467/2017',
  'Lei nº 4.749/1965',
];

for (const topic of essentialTopics) {
  if (!html.includes(topic)) {
    console.error(`FAILED: Essential topical coverage missing for "${topic}"`);
    process.exit(1);
  }
}

console.log('✅ ALL AUDIT CHECKS PASSED FOR /calculadora-de-ferias/pt/ !');
