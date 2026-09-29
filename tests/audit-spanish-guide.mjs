// tests/audit-spanish-guide.mjs
import fs from 'node:fs';
import path from 'node:path';

const htmlPath = path.resolve('dist/client/calculadora-edad/guides/es/index.html');
console.log('File exists:', fs.existsSync(htmlPath));
if (!fs.existsSync(htmlPath)) {
  console.error('File not found!');
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');

// Title
const titleMatch = html.match(/<title>([^<]+)<\/title>/);
console.log('Title:', titleMatch ? titleMatch[1] : 'NONE');

// Meta description
const metaDescMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
console.log('Meta Description:', metaDescMatch ? metaDescMatch[1] : 'NONE');

// Canonical
const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/);
console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'NONE');

// Hreflangs
const hreflangs = [...html.matchAll(/<link[^>]+rel="alternate"[^>]+hreflang="([^"]*)"[^>]+href="([^"]*)"/g)].map(m => ({ lang: m[1], href: m[2] }));
console.log('Hreflangs:', hreflangs);

// HTML lang
const langMatch = html.match(/<html\s+lang="([^"]*)"/);
console.log('HTML lang:', langMatch ? langMatch[1] : 'NONE');

// H1
const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
console.log('H1:', h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'NONE');

// H2s
const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('H2 headings (' + h2s.length + '):');
h2s.forEach((h, i) => console.log(`  ${i + 1}. ${h}`));

// Internal links to calculator
const linksToCalc = [...html.matchAll(/href="(\/calculadora-edad\/[^"]*|\/calculadora-edad\/)"/g)].map(m => m[1]);
console.log('Contextual links to /calculadora-edad/ (' + linksToCalc.length + '):', linksToCalc);

// Breadcrumbs
const breadcrumbs = [...html.matchAll(/<nav aria-label="Ruta de navegación"[\s\S]*?<\/nav>/g)];
console.log('Has Spanish Breadcrumbs:', breadcrumbs.length > 0);

// Word count
const cleanText = html
  .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();
const words = cleanText.split(' ').filter(Boolean);
console.log('Total user-facing word count:', words.length);

// JSON-LD Schemas
const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(m => JSON.parse(m[1]));
console.log('JSON-LD schema types:', jsonLdBlocks.map(b => b['@type']));
