// tests/audit-salario-pt.mjs
import fs from 'node:fs';
import path from 'node:path';

const htmlPath = path.resolve('dist/client/calculadora-salario/pt/index.html');
if (!fs.existsSync(htmlPath)) {
  console.error('ERROR: dist/client/calculadora-salario/pt/index.html not found!');
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf-8');

console.log('--- AUDITING CALCULADORA DE SALÁRIO LÍQUIDO 2026 ---');

// 1. Language
const langMatch = html.match(/<html[^>]*lang=["']([^"']+)["']/i);
console.log('HTML lang:', langMatch ? langMatch[1] : 'NOT FOUND');
if (!langMatch || !langMatch[1].startsWith('pt')) {
  console.error('FAILED: lang should be pt-BR');
  process.exit(1);
}

// 2. Canonical
const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
console.log('Canonical URL:', canonicalMatch ? canonicalMatch[1] : 'NOT FOUND');
if (!canonicalMatch || !canonicalMatch[1].includes('/calculadora-salario/pt')) {
  console.error('FAILED: canonical URL incorrect');
  process.exit(1);
}

// 3. Title
const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
console.log('Title:', titleMatch ? titleMatch[1] : 'NOT FOUND');
if (!titleMatch || !titleMatch[1].includes('Calculadora de Salário Líquido 2026')) {
  console.error('FAILED: Title incorrect');
  process.exit(1);
}

// 4. H1
const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
const h1Text = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';
console.log('H1:', h1Text);
if (h1Text !== 'Calculadora de Salário Líquido 2026') {
  console.error('FAILED: H1 must be exactly "Calculadora de Salário Líquido 2026", got:', h1Text);
  process.exit(1);
}

// 5. Meta Description
const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
console.log('Meta Description:', descMatch ? descMatch[1] : 'NOT FOUND');

// 6. Check Structured Data
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

// 7. Audit for English words in user-visible DOM
// Strip scripts, styles, svg paths, and inspect visible strings and buttons
const visibleHtml = html
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<svg[\s\S]*?<\/svg>/gi, '')
  .replace(/<!--[\s\S]*?-->/g, '');

const englishKeywordsToCheck = [
  /\bShare\b/i,
  /\bEmbed\b/i,
  /\bDownload\b/i,
  /\bCalculate\b/i,
  /\bResult\b/i,
  /\bGross Salary\b/i,
  /\bNet Salary\b/i,
  /\bTax\b/i,
  /\bKnowledge Base\b/i,
  /\bFrequently Asked Questions\b/i,
  /\bStep-by-Step\b/i,
  /\bPractical Scenario\b/i,
  /\bEducational Calculation\b/i,
  /\bReset\b/i,
  /\bClear\b/i,
  /\bHome\b/i,
  /\bRelated Calculators\b/i,
  /\bVerified\b/i,
  /\bFormula\b(?!:)/i,
];

console.log('--- SCANNING VISIBLE DOM FOR ENGLISH LEAKS ---');
let leakFound = false;

// We also test specific elements:
const buttonMatches = [...visibleHtml.matchAll(/<button[^>]*>([\s\S]*?)<\/button>/gi)];
console.log(`Checking ${buttonMatches.length} rendered buttons...`);
for (const b of buttonMatches) {
  const text = b[1].replace(/<[^>]+>/g, '').trim();
  for (const reg of englishKeywordsToCheck) {
    if (reg.test(text)) {
      console.warn(`WARNING: English leak in button text: "${text}" matches ${reg}`);
      leakFound = true;
    }
  }
}

// Check headers (h1 to h6)
const headingMatches = [...visibleHtml.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)];
console.log(`Checking ${headingMatches.length} rendered headings...`);
for (const h of headingMatches) {
  const text = h[1].replace(/<[^>]+>/g, '').trim();
  for (const reg of englishKeywordsToCheck) {
    if (reg.test(text)) {
      console.warn(`WARNING: English leak in heading text: "${text}" matches ${reg}`);
      leakFound = true;
    }
  }
}

// Check breadcrumbs
const breadcrumbMatch = visibleHtml.match(/class=["'][^"']*breadcrumb[^"']*["'][\s\S]*?<\/nav>/i);
if (breadcrumbMatch) {
  console.log('Breadcrumbs text:', breadcrumbMatch[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

if (!leakFound) {
  console.log('SUCCESS: Zero English UI leaks detected in buttons and headings!');
} else {
  console.error('FAILED: English leaks detected in public UI.');
  process.exit(1);
}

console.log('--- ALL AUDIT CHECKS PASSED ---');
