// scripts/generate-sitemap.js
import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://freeaccuratecalculator.com';
const distClientDir = path.resolve('dist/client');
const publicDir = path.resolve('public');

// 1. Recursive helper to discover all generated HTML routes from dist/client if built
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

// 2. Determine URL list
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

// Filter out excluded / non-canonical routes
allUrls = allUrls.filter((route) => {
  if (!route) return false;
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
    /\/(404|500)(\/|$)/.test(route) ||
    route.endsWith('.xml')
  ) {
    return false;
  }
  return true;
});

// Remove duplicates and sort
allUrls = Array.from(new Set(allUrls)).sort();

console.log(`🔍 Total verified URLs to partition: ${allUrls.length}`);

// 3. Category partition configuration
const I18N_LOCALES = new Set(['es', 'fr', 'de', 'ar', 'nl', 'pt', 'it', 'ru', 'ja', 'hi', 'zh']);
const BUSINESS_CATS = new Set(['business', 'insurance', 'legal', 'real-estate', 'marketing']);
const SCIENCE_CATS = new Set(['physics', 'chemistry', 'biology', 'ecology', 'technology', 'automotive', 'converter', 'construction', 'statistics']);
const EVERYDAY_CATS = new Set(['everyday', 'food', 'sports', 'profession']);

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

// 4. Build XML helpers
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
  if (route.startsWith('/guides/')) {
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

// 5. Generate and write chunked sitemaps
const generatedSitemaps = [];

for (const [category, routes] of Object.entries(categorizedRoutes)) {
  if (routes.length === 0) continue;

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

  console.log(`  📁 Generated ${sitemapFilename}: ${routes.length} URLs`);
}

// 6. Generate master sitemap-index.xml
const sitemapIndexEntries = generatedSitemaps.map((sm) => `  <sitemap>
    <loc>${sm.loc}</loc>
    <lastmod>${nowIso}</lastmod>
  </sitemap>`).join('\n');

const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapIndexEntries}
</sitemapindex>
`;

fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndexXml, 'utf-8');
if (fs.existsSync(distClientDir)) {
  fs.writeFileSync(path.join(distClientDir, 'sitemap-index.xml'), sitemapIndexXml, 'utf-8');
}
console.log(`✅ Generated sitemap-index.xml referencing ${generatedSitemaps.length} categorized sitemaps.`);

// Also write unified sitemap.xml to maintain complete backward compatibility
const fullUnifiedXml = generateUrlsetXml(allUrls);
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), fullUnifiedXml, 'utf-8');
if (fs.existsSync(distClientDir)) {
  fs.writeFileSync(path.join(distClientDir, 'sitemap.xml'), fullUnifiedXml, 'utf-8');
}
console.log(`✅ Maintained canonical sitemap.xml fallback with ${allUrls.length} total URLs.`);
