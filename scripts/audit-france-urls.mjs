// scripts/audit-france-urls.mjs
import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist/client');
const SRC_DIR = path.resolve('src');
const PUBLIC_DIR = path.resolve('public');

console.log('=== ULTRA-DEEP FORENSIC FRANCE URL INVENTORY & SEO ROUTE AUDIT ===\n');

// 1. Scan dist/client for all HTML files
function getAllFiles(dir, ext = '.html') {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, ext));
    } else if (item.isFile() && item.name.endsWith(ext)) {
      results.push(fullPath);
    }
  }
  return results;
}

const allDistHtmlFiles = getAllFiles(DIST_DIR, '.html');
console.log(`Total HTML files in dist/client: ${allDistHtmlFiles.length}`);

// Find all HTML files with 'france' in their path
const distFrancePages = [];
for (const file of allDistHtmlFiles) {
  const rel = path.relative(DIST_DIR, file).replace(/\\/g, '/');
  let route = '/' + rel.replace(/\/index\.html$/, '/').replace(/^index\.html$/, '');
  if (!route.endsWith('/')) route += '/';
  
  if (route.includes('/france/') || route === '/countries/france/') {
    distFrancePages.push({
      route,
      filePath: file,
      relPath: rel
    });
  }
}

console.log(`\n1. Generated France Production Routes in dist/client: ${distFrancePages.length}`);
distFrancePages.sort((a, b) => a.route.localeCompare(b.route)).forEach((p, idx) => {
  console.log(`   [${idx + 1}] ${p.route} (${p.relPath})`);
});

// 2. Scan sitemaps
const sitemapFiles = fs.readdirSync(PUBLIC_DIR).filter(f => f.startsWith('sitemap') && f.endsWith('.xml'));
const sitemapFranceUrls = new Map();

for (const sFile of sitemapFiles) {
  const sPath = path.join(PUBLIC_DIR, sFile);
  const content = fs.readFileSync(sPath, 'utf-8');
  const locMatches = [...content.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)];
  for (const m of locMatches) {
    const fullUrl = m[1];
    if (fullUrl.includes('/france/') || fullUrl.endsWith('/france')) {
      if (!sitemapFranceUrls.has(fullUrl)) {
        sitemapFranceUrls.set(fullUrl, []);
      }
      sitemapFranceUrls.get(fullUrl).push(sFile);
    }
  }
}

console.log(`\n2. Unique France URLs in public/ sitemaps: ${sitemapFranceUrls.size}`);
for (const [url, files] of sitemapFranceUrls.entries()) {
  console.log(`   - ${url} (in: ${files.join(', ')})`);
}

// 3. Scan public/_redirects
const redirectsPath = path.join(PUBLIC_DIR, '_redirects');
const franceRedirects = [];
if (fs.existsSync(redirectsPath)) {
  const lines = fs.readFileSync(redirectsPath, 'utf-8').split('\n');
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 2) {
      const from = parts[0];
      const to = parts[1];
      const status = parts[2] || '301';
      if (from.includes('france') || to.includes('france') || from.includes('calculateur') || to.includes('calculateur')) {
        franceRedirects.push({ line: idx + 1, from, to, status });
      }
    }
  });
}

console.log(`\n3. France-Related Redirects in public/_redirects: ${franceRedirects.length}`);
franceRedirects.forEach(r => {
  console.log(`   Line ${r.line}: ${r.from} -> ${r.to} (${r.status})`);
});

// 4. Forensically inspect Canonical, Hreflang, OG, JSON-LD, Internal Links from dist/client HTML files
console.log('\n4. Forensic Inspection of HTML tags in all dist/client France pages:');

const canonicalMap = new Map();
const hreflangMap = new Map();
const ogUrlMap = new Map();
const jsonLdUrlsMap = new Map();
const allInternalLinksToFrance = new Map();

for (const page of distFrancePages) {
  const content = fs.readFileSync(page.filePath, 'utf-8');
  
  // Canonical
  const canonMatch = content.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) 
    || content.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  if (canonMatch) {
    canonicalMap.set(page.route, canonMatch[1]);
  }
  
  // Hreflang
  const hreflangMatches = [...content.matchAll(/<link\s+[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["']/gi)];
  const alternates = hreflangMatches.map(m => ({ lang: m[1], href: m[2] }));
  hreflangMap.set(page.route, alternates);
  
  // OG:URL
  const ogMatch = content.match(/<meta\s+[^>]*property=["']og:url["'][^>]*content=["']([^"']+)["']/i)
    || content.match(/<meta\s+[^>]*content=["']([^"']+)["'][^>]*property=["']og:url["']/i);
  if (ogMatch) {
    ogUrlMap.set(page.route, ogMatch[1]);
  }
  
  // JSON-LD
  const jsonLdMatches = [...content.matchAll(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const jsonUrls = new Set();
  for (const jm of jsonLdMatches) {
    try {
      const parsed = JSON.parse(jm[1]);
      const extractUrls = (obj) => {
        if (!obj) return;
        if (typeof obj === 'string') {
          if (obj.includes('/france/') || obj.includes('france')) {
            jsonUrls.add(obj);
          }
        } else if (Array.isArray(obj)) {
          obj.forEach(extractUrls);
        } else if (typeof obj === 'object') {
          for (const key of Object.keys(obj)) {
            extractUrls(obj[key]);
          }
        }
      };
      extractUrls(parsed);
    } catch(e) {}
  }
  jsonLdUrlsMap.set(page.route, Array.from(jsonUrls));
}

// Internal links across the ENTIRE site to France URLs
for (const file of allDistHtmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const rel = path.relative(DIST_DIR, file).replace(/\\/g, '/');
  let sourceRoute = '/' + rel.replace(/\/index\.html$/, '/').replace(/^index\.html$/, '');
  if (!sourceRoute.endsWith('/')) sourceRoute += '/';
  
  const hrefMatches = [...content.matchAll(/href=["']([^"']+)["']/gi)];
  for (const hm of hrefMatches) {
    const target = hm[1];
    if (target.includes('/countries/france') || target.includes('/france/')) {
      if (!allInternalLinksToFrance.has(target)) {
        allInternalLinksToFrance.set(target, new Set());
      }
      allInternalLinksToFrance.get(target).add(sourceRoute);
    }
  }
}

console.log(`\nUnique Internal Link Targets pointing to France: ${allInternalLinksToFrance.size}`);
for (const [target, sources] of allInternalLinksToFrance.entries()) {
  console.log(`   - Target: "${target}" (linked from ${sources.size} pages, e.g., ${Array.from(sources).slice(0, 3).join(', ')})`);
}

// 5. Searchable Calculators Database
import { SEARCHABLE_CALCULATORS } from '../src/data/searchDatabase.ts';
console.log(`\n5. Search Database Check:`);
const franceSearchItems = SEARCHABLE_CALCULATORS.filter(item => 
  (item.url && item.url.includes('/france/')) || 
  (item.country && item.country.toLowerCase() === 'france') ||
  (item.title && item.title.toLowerCase().includes('france'))
);
console.log(`Search items referencing France: ${franceSearchItems.length}`);
franceSearchItems.forEach(item => {
  console.log(`   - Title: "${item.title}", URL: "${item.url}", Category: "${item.category}"`);
});

// Output summary object
const summary = {
  totalDistFrancePages: distFrancePages.length,
  totalSitemapFranceUrls: sitemapFranceUrls.size,
  totalFranceRedirects: franceRedirects.length,
  totalInternalLinkTargets: allInternalLinksToFrance.size,
  totalSearchItems: franceSearchItems.length,
  distFrancePages: distFrancePages.map(p => p.route),
  sitemapFranceUrls: Array.from(sitemapFranceUrls.keys()),
  canonicalMap: Object.fromEntries(canonicalMap),
  hreflangMap: Object.fromEntries(hreflangMap),
  allInternalLinksToFrance: Object.fromEntries(
    Array.from(allInternalLinksToFrance.entries()).map(([k, v]) => [k, Array.from(v)])
  )
};

fs.writeFileSync('france_audit_temp.json', JSON.stringify(summary, null, 2));
console.log('\nAudit complete. Temp summary saved to france_audit_temp.json');
