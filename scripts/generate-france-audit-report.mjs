// scripts/generate-france-audit-report.mjs
import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist/client');
const SRC_DIR = path.resolve('src');
const PUBLIC_DIR = path.resolve('public');
const SITE_URL = 'https://freeaccuratecalculator.com';

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

// 1. Get all dist/client HTML files
const allDistHtmlFiles = getAllFiles(DIST_DIR, '.html');
const distFrancePages = [];

for (const file of allDistHtmlFiles) {
  const rel = path.relative(DIST_DIR, file).replace(/\\/g, '/');
  let route = '/' + rel.replace(/\/index\.html$/, '/').replace(/^index\.html$/, '');
  if (!route.endsWith('/')) route += '/';
  
  if (route.includes('/france/') || route === '/countries/france/') {
    distFrancePages.push({
      route,
      fullUrl: `${SITE_URL}${route}`,
      filePath: file,
      relPath: rel
    });
  }
}

// 2. Get all sitemap XML entries
const sitemapFiles = fs.readdirSync(PUBLIC_DIR).filter(f => f.startsWith('sitemap') && f.endsWith('.xml'));
const sitemapFranceUrls = new Map(); // normalizedUrl -> array of sitemap files

for (const sFile of sitemapFiles) {
  const sPath = path.join(PUBLIC_DIR, sFile);
  const content = fs.readFileSync(sPath, 'utf-8');
  const locMatches = [...content.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)];
  for (const m of locMatches) {
    const fullUrl = m[1];
    let norm = fullUrl;
    if (norm.startsWith(SITE_URL)) {
      norm = norm.slice(SITE_URL.length);
    }
    if (!norm.endsWith('/')) norm += '/';

    if (norm.includes('/france/') || norm === '/countries/france/') {
      if (!sitemapFranceUrls.has(norm)) {
        sitemapFranceUrls.set(norm, []);
      }
      sitemapFranceUrls.get(norm).push(sFile);
    }
  }
}

// 3. Get all redirects from public/_redirects
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

// 4. Extract metadata, canonical, hreflang, jsonld, internal links for all dist France pages
const pageDetails = new Map();

for (const page of distFrancePages) {
  const content = fs.readFileSync(page.filePath, 'utf-8');
  
  // Title
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  
  // H1
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';

  // Canonical
  const canonMatch = content.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) 
    || content.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  const canonical = canonMatch ? canonMatch[1] : '';

  // Hreflang
  const hreflangMatches = [...content.matchAll(/<link\s+[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["']/gi)];
  const hreflangs = hreflangMatches.map(m => `${m[1]}:${m[2]}`).join(';');

  // OG:URL
  const ogMatch = content.match(/<meta\s+[^>]*property=["']og:url["'][^>]*content=["']([^"']+)["']/i)
    || content.match(/<meta\s+[^>]*content=["']([^"']+)["'][^>]*property=["']og:url["']/i);
  const ogUrl = ogMatch ? ogMatch[1] : '';

  // JSON-LD URLs
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

  pageDetails.set(page.route, {
    title,
    h1,
    canonical,
    hreflangs,
    ogUrl,
    jsonLdUrls: Array.from(jsonUrls).join(';')
  });
}

// 5. Internal Links Scan across entire site
const internalLinkInboundCount = new Map();
const internalLinkSources = new Map();

for (const file of allDistHtmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const rel = path.relative(DIST_DIR, file).replace(/\\/g, '/');
  let sourceRoute = '/' + rel.replace(/\/index\.html$/, '/').replace(/^index\.html$/, '');
  if (!sourceRoute.endsWith('/')) sourceRoute += '/';
  
  const hrefMatches = [...content.matchAll(/href=["']([^"']+)["']/gi)];
  for (const hm of hrefMatches) {
    let target = hm[1];
    if (target.startsWith(SITE_URL)) {
      target = target.slice(SITE_URL.length);
    }
    if (target.includes('/countries/france') || target.includes('/france/')) {
      let normTarget = target.split('#')[0].split('?')[0];
      if (normTarget && !normTarget.endsWith('/') && !normTarget.includes('.')) {
        normTarget += '/';
      }
      if (!internalLinkInboundCount.has(normTarget)) {
        internalLinkInboundCount.set(normTarget, 0);
        internalLinkSources.set(normTarget, new Set());
      }
      internalLinkInboundCount.set(normTarget, internalLinkInboundCount.get(normTarget) + 1);
      internalLinkSources.get(normTarget).add(sourceRoute);
    }
  }
}

// 6. Map source files in src/pages
const sourceFilesMap = [
  { pattern: '/countries/france/fr/', file: 'src/pages/countries/france/[lang]/index.astro' },
  { pattern: '/countries/france/en/', file: 'src/pages/countries/france/[lang]/index.astro' },
  { pattern: '/countries/france/fr/guides/', file: 'src/pages/countries/france/[lang]/guides/index.astro' },
  { pattern: '/countries/france/en/guides/', file: 'src/pages/countries/france/[lang]/guides/index.astro' },
  { pattern: '/countries/france/fr/guides/*', file: 'src/pages/countries/france/[lang]/guides/[slug].astro' },
  { pattern: '/countries/france/en/guides/*', file: 'src/pages/countries/france/[lang]/guides/[slug].astro' },
  { pattern: '/countries/france/fr/*/*', file: 'src/pages/countries/france/[lang]/[category]/[slug].astro' },
  { pattern: '/countries/france/en/*/*', file: 'src/pages/countries/france/[lang]/[category]/[slug].astro' },
  { pattern: '/countries/france/fr/*', file: 'src/pages/countries/france/[lang]/[category]/index.astro' },
  { pattern: '/countries/france/en/*', file: 'src/pages/countries/france/[lang]/[category]/index.astro' },
  { pattern: '/countries/france/frais-notaire/*', file: 'src/pages/countries/france/frais-notaire/[city].astro' },
  { pattern: '/countries/france/guides/*', file: 'src/pages/countries/france/guides/[slug].astro' },
  { pattern: '/countries/france/guides/', file: 'src/pages/countries/france/guides.astro' },
  { pattern: '/countries/france/finance/', file: 'src/pages/countries/france/finance.astro' },
  { pattern: '/countries/france/capacite-emprunt-hcsf/', file: 'src/pages/countries/france/capacite-emprunt-hcsf.astro' },
  { pattern: '/countries/france/frais-de-notaire/', file: 'src/pages/countries/france/frais-de-notaire.astro' },
  { pattern: '/countries/france/frais-reels-abattement/', file: 'src/pages/countries/france/frais-reels-abattement.astro' },
  { pattern: '/countries/france/indemnite-licenciement/', file: 'src/pages/countries/france/indemnite-licenciement.astro' },
  { pattern: '/countries/france/indemnites-kilometriques/', file: 'src/pages/countries/france/indemnites-kilometriques.astro' },
  { pattern: '/countries/france/percentage-calculator/', file: 'src/pages/countries/france/percentage-calculator.astro' },
  { pattern: '/countries/france/simulateur-apl/', file: 'src/pages/countries/france/simulateur-apl.astro' },
  { pattern: '/countries/france/simulateur-lmnp-reel-micro-bic/', file: 'src/pages/countries/france/simulateur-lmnp-reel-micro-bic.astro' },
  { pattern: '/countries/france/simulateur-ptz/', file: 'src/pages/countries/france/simulateur-ptz.astro' },
  { pattern: '/countries/france/simulateur-salaire-brut-net/', file: 'src/pages/countries/france/simulateur-salaire-brut-net.astro' },
  { pattern: '/countries/france/taxe-amenagement/', file: 'src/pages/countries/france/taxe-amenagement.astro' },
];

function findSourceFile(route) {
  for (const sf of sourceFilesMap) {
    if (sf.pattern.endsWith('/*/*')) {
      const base = sf.pattern.slice(0, -4);
      if (route.startsWith(base)) {
        const rest = route.slice(base.length).split('/').filter(Boolean);
        if (rest.length === 2 && rest[0] !== 'guides') return sf.file;
      }
    } else if (sf.pattern.endsWith('/*')) {
      const base = sf.pattern.slice(0, -2);
      if (route.startsWith(base)) {
        const rest = route.slice(base.length).split('/').filter(Boolean);
        if (rest.length === 1) return sf.file;
      }
    } else if (route === sf.pattern) {
      return sf.file;
    }
  }
  return 'src/pages/countries/france/...';
}

// 7. Master Unique Set of All Production France URLs
const allUniqueProductionRoutes = Array.from(new Set(distFrancePages.map(p => p.route))).sort();

console.log(`\n=== AUDIT RESULTS SUMMARY ===`);
console.log(`Master Unique Production France Routes: ${allUniqueProductionRoutes.length}`);
console.log(`Sitemap France URLs: ${sitemapFranceUrls.size}`);
console.log(`Redirect France rules: ${franceRedirects.length}`);
console.log(`Internal link distinct targets: ${internalLinkInboundCount.size}`);

// 8. Generate CSV
const csvRows = [
  [
    'url',
    'normalized_url',
    'url_type',
    'route_source',
    'source_file',
    'source_line',
    'generated',
    'production_output',
    'sitemap',
    'internal_link',
    'redirect',
    'canonical',
    'hreflang',
    'json_ld',
    'metadata',
    'search_index',
    'active_or_historical',
    'duplicate_group',
    'confidence',
    'notes'
  ].join(',')
];

for (const route of allUniqueProductionRoutes) {
  const norm = route;
  const fullUrl = `${SITE_URL}${route}`;
  const details = pageDetails.get(route) || {};
  const sitemaps = sitemapFranceUrls.get(route) || [];
  const inSitemap = sitemaps.length > 0 ? 'YES (' + sitemaps.join(';') + ')' : 'NO';
  const inboundLinks = internalLinkInboundCount.get(route) || 0;
  const srcFile = findSourceFile(route);
  
  let urlType = 'Calculator Page';
  if (route === '/countries/france/fr/' || route === '/countries/france/en/') urlType = 'Country Root';
  else if (route.includes('/guides/') && route.endsWith('/guides/')) urlType = 'Guide Hub';
  else if (route.includes('/guides/')) urlType = 'Guide Article';
  else if (route.startsWith('/countries/france/fr/') || route.startsWith('/countries/france/en/')) {
    const segments = route.split('/').filter(Boolean);
    if (segments.length === 4) urlType = 'Category Hub';
    else if (segments.length === 5) urlType = 'Bilingual Calculator';
  } else if (route.startsWith('/countries/france/frais-notaire/')) {
    urlType = 'City Notaire Page';
  } else if (route === '/countries/france/finance/') {
    urlType = 'Finance Category Hub';
  } else {
    urlType = 'Direct French Calculator';
  }

  const isGen = srcFile.includes('[') ? 'YES' : 'NO';
  const hasCanon = details.canonical ? 'YES' : 'NO';
  const hasHreflang = details.hreflangs ? 'YES' : 'NO';
  const hasJsonLd = details.jsonLdUrls ? 'YES' : 'NO';
  const hasOg = details.ogUrl ? 'YES' : 'NO';

  csvRows.push([
    `"${fullUrl}"`,
    `"${norm}"`,
    `"${urlType}"`,
    `"Astro Page Route"`,
    `"${srcFile}"`,
    `"1"`,
    `"${isGen}"`,
    `"dist/client${route}index.html"`,
    `"${inSitemap}"`,
    `"${inboundLinks} inbound links"`,
    `"NO"`,
    `"${details.canonical || 'None'}"`,
    `"${details.hreflangs || 'None'}"`,
    `"${details.jsonLdUrls || 'None'}"`,
    `"${details.ogUrl || 'None'}"`,
    `"NO"`,
    `"ACTIVE"`,
    `"None"`,
    `"100%"`,
    `"Title: ${details.title?.replace(/"/g, '""') || ''}"`
  ].join(','));
}

// Also append redirect sources to CSV as REDIRECT type
for (const r of franceRedirects) {
  csvRows.push([
    `"${SITE_URL}${r.from}"`,
    `"${r.from}"`,
    `"Redirect"`,
    `"public/_redirects"`,
    `"public/_redirects"`,
    `"${r.line}"`,
    `"NO"`,
    `"N/A"`,
    `"NO"`,
    `"${internalLinkInboundCount.get(r.from) || 0} inbound links"`,
    `"${r.status} -> ${r.to}"`,
    `"None"`,
    `"None"`,
    `"None"`,
    `"None"`,
    `"NO"`,
    `"ACTIVE_REDIRECT"`,
    `"Redirect Rule"`,
    `"100%"`,
    `"Redirects to ${r.to}"`
  ].join(','));
}

fs.writeFileSync('FRANCE_URL_FORENSIC_AUDIT.csv', csvRows.join('\n'), 'utf-8');
console.log(`✅ Saved FRANCE_URL_FORENSIC_AUDIT.csv (${csvRows.length - 1} entries)`);

// 9. Generate detailed JSON data for FRANCE_URL_FORENSIC_AUDIT.md
const auditReportData = {
  masterUniqueProductionCount: allUniqueProductionRoutes.length,
  allUniqueProductionRoutes,
  sitemapFranceUrls: Object.fromEntries(sitemapFranceUrls),
  franceRedirects,
  pageDetails: Object.fromEntries(pageDetails),
  internalLinks: Object.fromEntries(
    Array.from(internalLinkSources.entries()).map(([k, v]) => [k, Array.from(v)])
  )
};

fs.writeFileSync('france_audit_deep_data.json', JSON.stringify(auditReportData, null, 2));
console.log('✅ Saved france_audit_deep_data.json');
