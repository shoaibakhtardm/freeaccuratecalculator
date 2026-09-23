// scripts/reconcile-urls.mjs
//
// Post-build reconciliation audit (npm run audit:urls).
// Reconciles, from artifacts only (dist/client + public/), the route inventory
// against the sitemap set and prints the CATEGORY | COUNT report required by
// the technical-SEO reconciliation. Exits 1 on any inconsistency.
// Read-only: never writes or deletes anything.

import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://freeaccuratecalculator.com';
const distClientDir = path.resolve('dist/client');
const publicDir = path.resolve('public');

function mustExist(dir, label) {
  if (!fs.existsSync(dir)) {
    console.error(`❌ ${label} not found. Run \`npm run build\` first.`);
    process.exit(1);
  }
}
mustExist(distClientDir, 'dist/client');
mustExist(publicDir, 'public');

// --- Generated HTML routes -------------------------------------------------
function getAllHtmlRoutes(dir, baseDir = dir) {
  let routes = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      routes = routes.concat(getAllHtmlRoutes(full, baseDir));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const rel = path.relative(baseDir, full).split(path.sep).join('/');
      if (rel === 'index.html') routes.push('/');
      else if (rel.endsWith('/index.html')) routes.push('/' + rel.slice(0, -'index.html'.length));
      else routes.push('/' + rel);
    }
  }
  return routes;
}
const htmlRoutes = getAllHtmlRoutes(distClientDir);

// --- Redirect sources (public/_redirects) -----------------------------------
const redirectSources = new Set();
for (const line of fs.readFileSync(path.join(publicDir, '_redirects'), 'utf-8').split('\n')) {
  const t = line.trim();
  if (!t || t.startsWith('#')) continue;
  const src = t.split(/\s+/)[0];
  if (!src) continue;
  redirectSources.add(src.endsWith('/') ? src : `${src}/`);
  redirectSources.add(src.endsWith('/') ? src.slice(0, -1) : src);
}

// --- Sitemap files ----------------------------------------------------------
const sitemapFiles = fs.readdirSync(publicDir).filter((f) => /^sitemap.*\.xml$/i.test(f));
const indexFiles = sitemapFiles.filter((f) => f === 'sitemap.xml' || /^sitemap[-_]index\.xml$/i.test(f) || f === 'sitemap-index.xml');
const childFiles = sitemapFiles.filter((f) => /^sitemap-.+\.xml$/.test(f));

const indexContent = fs.readFileSync(path.join(publicDir, 'sitemap.xml'), 'utf-8');
const indexRefs = [...indexContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const sitemapUrls = [];
for (const file of childFiles) {
  const content = fs.readFileSync(path.join(publicDir, file), 'utf-8');
  for (const m of content.matchAll(/<loc>([^<]+)<\/loc>/g)) sitemapUrls.push(m[1]);
}
const sitemapSet = new Set(sitemapUrls);

// --- Classify routes ---------------------------------------------------------
const I18N_LOCALES = new Set(['es', 'fr', 'de', 'ar', 'nl', 'pt', 'it', 'ru', 'ja', 'hi', 'zh']);
function classify(route) {
  if (route === '/') return 'A. Homepage';
  const first = route.split('/').filter(Boolean)[0];
  if (I18N_LOCALES.has(first)) return 'E/F. Language URLs';
  if (['finance', 'math', 'health'].includes(first)) return 'B. Core calculator URLs (finance/math/health)';
  if (['business', 'insurance', 'legal', 'real-estate', 'marketing'].includes(first)) return 'B. Core calculator URLs (business/legal)';
  if (['physics', 'chemistry', 'biology', 'ecology', 'technology', 'automotive', 'converter', 'construction', 'statistics'].includes(first)) return 'B. Core calculator URLs (science)';
  if (['everyday', 'food', 'sports'].includes(first)) return 'B. Core calculator URLs (everyday)';
  if (first === 'ruler') return 'B. Core calculator URLs (ruler/tools)';
  if (first === 'guides') return 'G. Guide URLs';
  if (['about', 'contact', 'faq', 'how-it-works'].includes(first)) return 'I. Utility pages';
  if (['terms-of-use', 'privacy-policy'].includes(first)) return 'H. Legal pages';
  return 'B. Core calculator URLs (root-level)';
}

// --- Reconciliation checks ---------------------------------------------------
const routeSet = new Set(htmlRoutes);
const errors = [];

// 1. Every eligible generated route must be in the sitemap
const excludedRoutes = htmlRoutes.filter((r) => /\/(404|500)(\.html|\/|$)/.test(r) || redirectSources.has(r) || r.includes('/api/') || r.includes('/dev-preview/'));
const eligibleRoutes = htmlRoutes.filter((r) => !excludedRoutes.includes(r));
const missingFromSitemap = eligibleRoutes.filter((r) => !sitemapSet.has(`${SITE_URL}${r}`));
if (missingFromSitemap.length) errors.push(`Routes missing from sitemap: ${missingFromSitemap.join(', ')}`);

// 2. Every sitemap URL must resolve to a generated route (no stale/orphan URLs)
const orphanSitemapUrls = [...sitemapSet].filter((u) => {
  const p = new URL(u).pathname;
  return !routeSet.has(p);
});
if (orphanSitemapUrls.length) errors.push(`Sitemap URLs without generated route: ${orphanSitemapUrls.join(', ')}`);

// 3. Sitemap URLs must never be redirect sources, error pages, non-canonical hosts
for (const u of sitemapSet) {
  const p = new URL(u).pathname;
  if (redirectSources.has(p)) errors.push(`Redirect source inside sitemap: ${u}`);
  if (/\/(404|500)(\/|$)/.test(p)) errors.push(`Error document inside sitemap: ${u}`);
  if (!u.startsWith('https://freeaccuratecalculator.com/')) errors.push(`Non-canonical URL inside sitemap: ${u}`);
}

// 4. Uniqueness
const duplicates = sitemapUrls.length - sitemapSet.size;
if (duplicates !== 0) errors.push(`${duplicates} duplicate URL(s) across child sitemaps`);

// 5. Index integrity: exactly one index, refs resolve to existing children
if (indexFiles.length !== 1) errors.push(`Expected exactly 1 sitemap index, found: ${indexFiles.join(', ')}`);
for (const ref of indexRefs) {
  const file = path.basename(new URL(ref).pathname);
  if (!fs.existsSync(path.join(publicDir, file))) errors.push(`Index references missing child: ${ref}`);
}
if (new Set(indexRefs).size !== indexRefs.length) errors.push('Duplicate child references inside sitemap index');
if (indexRefs.length !== childFiles.length) errors.push(`Index refs (${indexRefs.length}) != child files (${childFiles.length})`);

// --- Report ------------------------------------------------------------------
const categoryCounts = {};
for (const r of eligibleRoutes) {
  const c = classify(r);
  categoryCounts[c] = (categoryCounts[c] || 0) + 1;
}

const noindexRoutes = htmlRoutes.filter((r) => {
  const file = r === '/' ? 'index.html' : r.endsWith('/') ? `${r}index.html` : `${r}.html`;
  const full = path.join(distClientDir, file);
  try {
    return /<meta name="robots" content="[^"]*noindex/i.test(fs.readFileSync(full, 'utf-8').slice(0, 20000));
  } catch {
    return false;
  }
});

console.log('='.repeat(64));
console.log('URL RECONCILIATION REPORT (build artifacts: dist/client + public/)');
console.log('='.repeat(64));
console.log('CATEGORY | COUNT');
console.log('-'.repeat(64));
console.log(`Generated public routes (HTML files)        | ${htmlRoutes.length}`);
console.log(`  minus 404/500 error documents             | ${htmlRoutes.filter((r) => /\/(404|500)(\.html|\/|$)/.test(r)).length}`);
console.log(`  minus redirect-source routes              | ${htmlRoutes.filter((r) => redirectSources.has(r)).length}`);
console.log(`Indexable canonical routes                  | ${eligibleRoutes.length}`);
console.log(`Sitemap URLs (children)                     | ${sitemapUrls.length}`);
console.log(`  unique sitemap URLs                       | ${sitemapSet.size}`);
console.log(`  duplicate sitemap URLs                    | ${duplicates}`);
console.log(`Sitemap indexes                             | ${indexFiles.length} (${indexFiles.join(', ')})`);
console.log(`Child sitemaps                              | ${childFiles.length}`);
console.log(`Redirect URLs excluded (sources in _redirects) | ${redirectSources.size}`);
console.log(`404/500 URLs excluded                       | ${htmlRoutes.filter((r) => /\/(404|500)(\.html|\/|$)/.test(r)).length}`);
console.log(`Noindex URLs in build                       | ${noindexRoutes.length}`);
console.log('-'.repeat(64));
for (const [cat, n] of Object.entries(categoryCounts).sort()) {
  console.log(`${cat.padEnd(44)}| ${n}`);
}
console.log('-'.repeat(64));
console.log(`Generated → Sitemap delta                   | ${eligibleRoutes.length - sitemapSet.size}`);
console.log(`RECONCILIATION: ${errors.length === 0 ? '✅ CONSISTENT — zero inconsistencies' : `❌ ${errors.length} problem(s)`}`);
for (const e of errors) console.log(`  ❌ ${e}`);
console.log('='.repeat(64));

if (errors.length > 0) process.exit(1);
