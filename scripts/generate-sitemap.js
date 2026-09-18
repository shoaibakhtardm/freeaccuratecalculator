// scripts/generate-sitemap.js
import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = process.env.BASE_URL || 'https://freeaccuratecalculator.com';
const distClientDir = path.resolve('dist/client');
const publicDir = path.resolve('public');
const MAX_URLS_PER_SITEMAP = 500;

// Ensure target directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Recursive helper to discover all generated HTML routes from dist/client
function getAllHtmlRoutes(dir, baseDir = dir) {
  let routes = [];
  if (!fs.existsSync(dir)) return routes;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      routes = routes.concat(getAllHtmlRoutes(fullPath, baseDir));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      let relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      let routePath = '/';
      if (relPath === 'index.html') {
        routePath = '/';
      } else if (relPath.endsWith('/index.html')) {
        routePath = '/' + relPath.slice(0, -'index.html'.length);
      } else {
        routePath = '/' + relPath;
      }
      routes.push(routePath);
    }
  }
  return routes;
}

// 2. Parse public/_redirects to get all redirect source paths to avoid including any 301/302 redirects
const redirectedSources = new Set();
const redirectsFilePath = path.join(publicDir, '_redirects');
if (fs.existsSync(redirectsFilePath)) {
  const lines = fs.readFileSync(redirectsFilePath, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 2) {
      let src = parts[0].trim();
      redirectedSources.add(src);
      if (src.endsWith('/')) {
        redirectedSources.add(src.slice(0, -1));
      } else {
        redirectedSources.add(src + '/');
      }
    }
  }
}

// 3. Determine URL list
let allUrls = [];
const publicSitemapXml = path.join(publicDir, 'sitemap.xml');
const distSitemap0 = path.join(distClientDir, 'sitemap-0.xml');
const distSitemapXml = path.join(distClientDir, 'sitemap.xml');

const sourceXmlPath = fs.existsSync(distSitemap0)
  ? distSitemap0
  : fs.existsSync(distSitemapXml)
    ? distSitemapXml
    : fs.existsSync(publicSitemapXml)
      ? publicSitemapXml
      : null;

if (sourceXmlPath) {
  const content = fs.readFileSync(sourceXmlPath, 'utf-8');
  const locMatches = [...content.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)];
  allUrls = locMatches.map((m) => {
    try {
      return new URL(m[1]).pathname;
    } catch {
      return m[1];
    }
  });
}

// Merge with dist/client HTML routes if present
const discoveredRoutes = getAllHtmlRoutes(distClientDir);
if (discoveredRoutes.length > 0) {
  const set = new Set([...allUrls, ...discoveredRoutes]);
  allUrls = Array.from(set);
}

// Filter out excluded, redirecting, or error routes
allUrls = allUrls.filter((route) => {
  if (!route) return false;
  const normalized = route.endsWith('/') ? route : `${route}/`;
  const unslashed = route.endsWith('/') ? route.slice(0, -1) : route;

  if (redirectedSources.has(route) || redirectedSources.has(normalized) || redirectedSources.has(unslashed)) {
    return false;
  }

  if (
    route.includes('/dev-preview') ||
    route.includes('/api/') ||
    route.includes('/admin/') ||
    route.includes('/draft/') ||
    route.includes('/calculators/') ||
    route.includes('/calculator/') ||
    route.startsWith('/blog/') ||
    route === '/blog' ||
    route === '/terms' ||
    route === '/privacy' ||
    /\/(404|500)(\.html|\/|$)/.test(route) ||
    route.endsWith('.html') ||
    route.endsWith('.xml')
  ) {
    return false;
  }
  return true;
});

// Remove duplicates and sort
allUrls = Array.from(new Set(allUrls)).sort();

console.log(`🔍 Total verified 200 OK URLs to partition: ${allUrls.length}`);

// 4. Category partition configuration
const I18N_LOCALES = new Set(['es', 'fr', 'de', 'ar', 'nl', 'pt', 'it', 'ru', 'ja', 'hi', 'zh']);
const BUSINESS_CATS = new Set(['business', 'insurance', 'legal', 'real-estate', 'marketing']);
const SCIENCE_CATS = new Set(['physics', 'chemistry', 'biology', 'ecology', 'technology', 'automotive', 'converter', 'construction', 'statistics']);
const EVERYDAY_CATS = new Set(['everyday', 'food', 'sports']);

function categorizeRoute(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return 'main';

  const first = segments[0];
  if (I18N_LOCALES.has(first)) return 'i18n';
  if (first === 'countries') return 'countries';
  if (first === 'finance') return 'finance';
  if (first === 'math') return 'math';
  if (first === 'health') return 'health';
  if (first === 'guides') return 'guides';
  if (BUSINESS_CATS.has(first)) return 'business';
  if (SCIENCE_CATS.has(first)) return 'science';
  if (EVERYDAY_CATS.has(first)) return 'everyday';
  return 'main';
}

const categorizedRoutes = {
  finance: [],
  countries: [],
  math: [],
  health: [],
  business: [],
  science: [],
  everyday: [],
  guides: [],
  i18n: [],
  main: [],
};

for (const route of allUrls) {
  const cat = categorizeRoute(route);
  categorizedRoutes[cat].push(route);
}

// 5. Build XML helpers
function getPriorityAndChangeFreq(route) {
  if (route === '/' || /^\/(en|es|fr|de|ar|nl|pt|it|ru|ja|hi|zh)\/?$/.test(route)) {
    return { priority: '1.0', changefreq: 'daily' };
  }
  if (/^\/(?:(?:en|es|fr|de|ar|nl|pt|it|ru|ja|hi|zh)\/)?(finance|math|health|business)\/?$/.test(route)) {
    return { priority: '0.8', changefreq: 'weekly' };
  }
  if (route.includes('-calculator') || route.includes('/sip/')) {
    return { priority: '0.7', changefreq: 'weekly' };
  }
  if (route.startsWith('/guides/') || route.startsWith('/countries/france/guides/')) {
    return { priority: '0.6', changefreq: 'weekly' };
  }
  return { priority: '0.5', changefreq: 'monthly' };
}

const nowIso = new Date().toISOString();

function generateUrlsetXml(routes) {
  const entries = routes.map((route) => {
    const loc = `${SITE_URL}${route.startsWith('/') ? route : '/' + route}${route !== '/' && !route.endsWith('/') ? '/' : ''}`;
    const { priority, changefreq } = getPriorityAndChangeFreq(route);
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
}

// 6. Generate and write chunked sitemaps (strict max 500 URLs per file)
const generatedSitemaps = [];

// Clean up any existing sitemap-*.xml files in public and dist/client
const cleanupDirs = [publicDir, distClientDir].filter((d) => fs.existsSync(d));
for (const dir of cleanupDirs) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.startsWith('sitemap-') && file.endsWith('.xml') && file !== 'sitemap-index.xml') {
      try {
        fs.unlinkSync(path.join(dir, file));
      } catch {}
    }
  }
}

for (const [category, routes] of Object.entries(categorizedRoutes)) {
  if (routes.length === 0) continue;

  if (routes.length <= MAX_URLS_PER_SITEMAP) {
    const sitemapFilename = `sitemap-${category}.xml`;
    const xmlContent = generateUrlsetXml(routes);

    fs.writeFileSync(path.join(publicDir, sitemapFilename), xmlContent, 'utf-8');
    if (fs.existsSync(distClientDir)) {
      fs.writeFileSync(path.join(distClientDir, sitemapFilename), xmlContent, 'utf-8');
    }

    generatedSitemaps.push({
      filename: sitemapFilename,
      count: routes.length,
      loc: `${SITE_URL}/${sitemapFilename}`,
    });

    console.log(`  📁 Generated ${sitemapFilename}: ${routes.length} URLs (<= 500 cap)`);
  } else {
    // Chunk category into smaller files of at most MAX_URLS_PER_SITEMAP URLs
    const chunksCount = Math.ceil(routes.length / MAX_URLS_PER_SITEMAP);
    for (let i = 0; i < chunksCount; i++) {
      const chunkRoutes = routes.slice(i * MAX_URLS_PER_SITEMAP, (i + 1) * MAX_URLS_PER_SITEMAP);
      const sitemapFilename = `sitemap-${category}-${i + 1}.xml`;
      const xmlContent = generateUrlsetXml(chunkRoutes);

      fs.writeFileSync(path.join(publicDir, sitemapFilename), xmlContent, 'utf-8');
      if (fs.existsSync(distClientDir)) {
        fs.writeFileSync(path.join(distClientDir, sitemapFilename), xmlContent, 'utf-8');
      }

      generatedSitemaps.push({
        filename: sitemapFilename,
        count: chunkRoutes.length,
        loc: `${SITE_URL}/${sitemapFilename}`,
      });

      console.log(`  📁 Generated chunk ${sitemapFilename}: ${chunkRoutes.length} URLs (<= 500 cap)`);
    }
  }
}

// 7. Generate Master Sitemap Index (both sitemap_index.xml and sitemap-index.xml)
const sitemapIndexEntries = generatedSitemaps.map((sm) => `  <sitemap>
    <loc>${sm.loc}</loc>
    <lastmod>${nowIso}</lastmod>
  </sitemap>`).join('\n');

const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapIndexEntries}
</sitemapindex>
`;

// Write both sitemap_index.xml and sitemap-index.xml
const indexFilenames = ['sitemap_index.xml', 'sitemap-index.xml'];
for (const filename of indexFilenames) {
  fs.writeFileSync(path.join(publicDir, filename), sitemapIndexXml, 'utf-8');
  if (fs.existsSync(distClientDir)) {
    fs.writeFileSync(path.join(distClientDir, filename), sitemapIndexXml, 'utf-8');
  }
}
console.log(`✅ Generated sitemap_index.xml & sitemap-index.xml referencing ${generatedSitemaps.length} chunked sitemaps (all <= 500 URLs).`);

// 8. Also write unified sitemap.xml fallback
const fullUnifiedXml = generateUrlsetXml(allUrls);
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), fullUnifiedXml, 'utf-8');
if (fs.existsSync(distClientDir)) {
  fs.writeFileSync(path.join(distClientDir, 'sitemap.xml'), fullUnifiedXml, 'utf-8');
}
console.log(`✅ Maintained canonical sitemap.xml fallback with ${allUrls.length} total URLs.`);


