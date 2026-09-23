// scripts/generate-sitemap.js
//
// Deterministic sitemap pipeline:
//   ROUTES (dist/client build output)
//     → FILTER        (isSitemapEligible: redirects, 404/500, reserved paths, non-HTML)
//     → NORMALIZE     (absolute HTTPS canonical host, trailing slash)
//     → DEDUPLICATE   (unique URL set)
//     → PARTITION     (category child sitemaps, <=500 URLs each)
//     → GENERATE      (children + ONE authoritative index: /sitemap.xml)
//     → VALIDATE      (re-parse output; hard-fail on duplicates/bad hosts/missing refs)
//
// Canonical architecture (single index):
//   /sitemap.xml          -> sitemap index (the ONLY sitemap entry point)
//   /sitemap-<cat>.xml    -> child urlsets
// Legacy index filenames (sitemap_index.xml, sitemap-index.xml) are NOT generated
// anymore; they are cleaned up here and 301-redirected to /sitemap.xml via
// public/_redirects so previously submitted references keep resolving.

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const SITE_URL = 'https://freeaccuratecalculator.com';
const distClientDir = path.resolve('dist/client');
const publicDir = path.resolve('public');
const MAX_URLS_PER_SITEMAP = 500;
const INDEX_FILENAME = 'sitemap.xml';
// Legacy index filenames kept alive ONLY through public/_redirects 301s.
const LEGACY_INDEX_FILENAMES = ['sitemap_index.xml', 'sitemap-index.xml'];

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Discover all generated HTML routes from dist/client (recursive)
function getAllHtmlRoutes(dir, baseDir = dir) {
  let routes = [];
  if (!fs.existsSync(dir)) return routes;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      routes = routes.concat(getAllHtmlRoutes(fullPath, baseDir));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      let relPath = path.relative(baseDir, fullPath).split(path.sep).join('/');
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

// 2. Parse public/_redirects — every 3xx/200 rewrite source is NOT canonical
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

// 3. Centralized eligibility gate — the ONLY place sitemap inclusion rules live.
// A route qualifies ONLY if it is a real, public, canonical, indexable 200 page.
function isSitemapEligible(route) {
  if (!route) return false;

  // Redirect sources must never be in the sitemap (they are not canonical).
  const normalized = route.endsWith('/') ? route : `${route}/`;
  const unslashed = route.endsWith('/') ? route.slice(0, -1) : route;
  if (redirectedSources.has(route) || redirectedSources.has(normalized) || redirectedSources.has(unslashed)) {
    return false;
  }

  // Reserved / non-public / legacy paths
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
    route === '/privacy'
  ) {
    return false;
  }

  // Error documents (404/500) are error pages, not indexable content.
  if (/\/(404|500)(\.html|\/|$)/.test(route)) {
    return false;
  }

  // Non-page artifacts never enter the sitemap.
  if (route.endsWith('.html') || route.endsWith('.xml')) {
    return false;
  }

  return true;
}

// Normalize to the canonical trailing-slash form used by the site (trailingSlash: 'always').
function normalizeRoute(route) {
  if (route === '/' || route === '') return '/';
  return route.endsWith('/') ? route : `${route}/`;
}

function toCanonicalUrl(route) {
  return `${SITE_URL}${route}`;
}

// 4. Determine URL list from dist/client build output (primary, authoritative source)
let allUrls = getAllHtmlRoutes(distClientDir);
let usedFallback = false;

// Fallback: standalone regeneration (npm run generate:sitemap without a build).
// Rebuild from the child urlsets of the previous run — never from index files.
if (allUrls.length === 0) {
  const childSitemaps = fs
    .readdirSync(publicDir)
    .filter((f) => /^sitemap-.+\.xml$/.test(f));
  if (childSitemaps.length > 0) {
    usedFallback = true;
    console.log('⚠️  dist/client not found — regenerating from existing public/ child sitemaps. Run `npm run build` for build-accurate output.');
    for (const file of childSitemaps) {
      const content = fs.readFileSync(path.join(publicDir, file), 'utf-8');
      const locMatches = [...content.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)];
      for (const m of locMatches) {
        try {
          allUrls.push(new URL(m[1]).pathname);
        } catch {
          /* skip malformed loc */
        }
      }
    }
  }
}

// 5. FILTER → NORMALIZE → DEDUPLICATE
allUrls = Array.from(new Set(allUrls.filter(isSitemapEligible).map(normalizeRoute))).sort();

if (allUrls.length === 0) {
  console.error('❌ No eligible routes found. Run `npm run build` before generating sitemaps.');
  process.exit(1);
}

console.log(`🔍 Total verified 200 OK canonical routes to partition: ${allUrls.length}${usedFallback ? ' (from fallback)' : ''}`);

// 6. Genuine Git lastmod resolver with in-memory caching
const gitCache = new Map();

function resolveSourceFileForRoute(route) {
  const cleanRoute = route.replace(/^\/|\/$/g, '');
  if (!cleanRoute) return 'src/pages/index.astro';

  const parts = cleanRoute.split('/');

  // Direct page match
  const directAstro = path.join('src/pages', cleanRoute + '.astro');
  if (fs.existsSync(directAstro)) return directAstro;

  const directIndexAstro = path.join('src/pages', cleanRoute, 'index.astro');
  if (fs.existsSync(directIndexAstro)) return directIndexAstro;

  // Locales
  const locales = ['es', 'fr', 'de', 'ar', 'nl', 'pt', 'it', 'ru', 'ja', 'hi', 'zh'];
  if (locales.includes(parts[0])) {
    const subRoute = parts.slice(1).join('/');
    if (!subRoute) {
      const directLocale = path.join('src/pages', parts[0], 'index.astro');
      if (fs.existsSync(directLocale)) return directLocale;
      return 'src/pages/index.astro';
    }
    const subAstro = path.join('src/pages', parts[0], subRoute + '.astro');
    if (fs.existsSync(subAstro)) return subAstro;
    return 'src/pages/index.astro';
  }

  return 'src/pages/index.astro';
}

function getGitLastMod(file) {
  if (gitCache.has(file)) return gitCache.get(file);
  try {
    const out = execSync(`git log -1 --format=%cI -- "${file}"`, { encoding: 'utf8' }).trim();
    if (out) {
      const iso = new Date(out).toISOString();
      gitCache.set(file, iso);
      return iso;
    }
  } catch {}

  try {
    const stat = fs.statSync(file);
    const iso = stat.mtime.toISOString();
    gitCache.set(file, iso);
    return iso;
  } catch {
    const fallback = '2026-09-17T00:00:00.000Z';
    gitCache.set(file, fallback);
    return fallback;
  }
}

// 7. XML character escaping
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

// 8. Category partition configuration
const I18N_LOCALES = new Set(['es', 'fr', 'de', 'ar', 'nl', 'pt', 'it', 'ru', 'ja', 'hi', 'zh']);
const BUSINESS_CATS = new Set(['business', 'insurance', 'legal', 'real-estate', 'marketing']);
const SCIENCE_CATS = new Set(['physics', 'chemistry', 'biology', 'ecology', 'technology', 'automotive', 'converter', 'construction', 'statistics']);
const EVERYDAY_CATS = new Set(['everyday', 'food', 'sports']);

function categorizeRoute(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return 'main';

  const first = segments[0];
  if (I18N_LOCALES.has(first)) return 'i18n';
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
  categorizedRoutes[categorizeRoute(route)].push(route);
}

// 9. Metadata prioritization helpers
function getPriorityAndChangeFreq(route) {
  if (route === '/' || /^\/(en|es|fr|de|ar|nl|pt|it|ru|ja|hi|zh)\/$/.test(route)) {
    return { priority: '1.0', changefreq: 'daily' };
  }
  if (/^\/(?:(?:en|es|fr|de|ar|nl|pt|it|ru|ja|hi|zh)\/)?(finance|math|health|business)\/$/.test(route)) {
    return { priority: '0.8', changefreq: 'weekly' };
  }
  if (route.includes('-calculator') || route.includes('/sip/')) {
    return { priority: '0.7', changefreq: 'weekly' };
  }
  if (route === '/ruler/') {
    return { priority: '0.7', changefreq: 'weekly' };
  }
  if (route.startsWith('/guides/')) {
    return { priority: '0.6', changefreq: 'weekly' };
  }
  return { priority: '0.5', changefreq: 'monthly' };
}

// 10. Generate URLset XML with strict formatting (each element on its own line)
function generateUrlsetXml(routes) {
  const entries = routes.map((route) => {
    const loc = escapeXml(toCanonicalUrl(route));
    const sourceFile = resolveSourceFileForRoute(route);
    const lastmod = getGitLastMod(sourceFile);
    const { priority, changefreq } = getPriorityAndChangeFreq(route);
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
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

// 11. Cleanup: remove EVERY existing sitemap*.xml in public/ and dist/client/
// (stale children, legacy sitemap_index.xml / sitemap-index.xml) so the output
// directory contains exactly what this run generates. Deterministic, no residue.
const cleanupDirs = [publicDir, distClientDir].filter((d) => fs.existsSync(d));
for (const dir of cleanupDirs) {
  for (const file of fs.readdirSync(dir)) {
    if (/^sitemap.*\.xml$/i.test(file)) {
      try {
        fs.unlinkSync(path.join(dir, file));
      } catch {}
    }
  }
}

// 12. Generate and write chunked child sitemaps (strict max 500 URLs per file)
const generatedSitemaps = [];

for (const [category, routes] of Object.entries(categorizedRoutes)) {
  if (routes.length === 0) continue;

  // Chunk category into files of at most MAX_URLS_PER_SITEMAP URLs
  const chunksCount = Math.ceil(routes.length / MAX_URLS_PER_SITEMAP);
  for (let i = 0; i < chunksCount; i++) {
    const chunkRoutes = routes.slice(i * MAX_URLS_PER_SITEMAP, (i + 1) * MAX_URLS_PER_SITEMAP);
    const sitemapFilename =
      chunksCount === 1 ? `sitemap-${category}.xml` : `sitemap-${category}-${i + 1}.xml`;
    const xmlContent = generateUrlsetXml(chunkRoutes);

    fs.writeFileSync(path.join(publicDir, sitemapFilename), xmlContent, 'utf-8');
    if (fs.existsSync(distClientDir)) {
      fs.writeFileSync(path.join(distClientDir, sitemapFilename), xmlContent, 'utf-8');
    }

    const childLastmods = chunkRoutes.map((r) => getGitLastMod(resolveSourceFileForRoute(r)));
    const maxLastmod = childLastmods.sort().reverse()[0] || '2026-09-17T00:00:00.000Z';

    generatedSitemaps.push({
      filename: sitemapFilename,
      count: chunkRoutes.length,
      loc: `${SITE_URL}/${sitemapFilename}`,
      lastmod: maxLastmod,
    });

    console.log(`  📁 Generated ${sitemapFilename}: ${chunkRoutes.length} URLs (<= ${MAX_URLS_PER_SITEMAP} cap)`);
  }
}

// 13. Generate the ONE authoritative master sitemap index
const sitemapIndexEntries = generatedSitemaps
  .map(
    (sm) => `  <sitemap>
    <loc>${escapeXml(sm.loc)}</loc>
    <lastmod>${sm.lastmod}</lastmod>
  </sitemap>`
  )
  .join('\n');

const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapIndexEntries}
</sitemapindex>
`;

for (const dir of cleanupDirs) {
  fs.writeFileSync(path.join(dir, INDEX_FILENAME), sitemapIndexXml, 'utf-8');
}
console.log(`✅ Authoritative sitemap index written to /${INDEX_FILENAME} referencing ${generatedSitemaps.length} child sitemaps.`);
if (LEGACY_INDEX_FILENAMES.length > 0) {
  console.log(`🧹 Legacy index files (${LEGACY_INDEX_FILENAMES.join(', ')}) removed; they 301 to /${INDEX_FILENAME} via public/_redirects.`);
}

// 14. Post-generation self-validation — hard-fail the build on any violation.
function fail(message) {
  console.error(`❌ Sitemap self-validation failed: ${message}`);
  process.exit(1);
}

const expectedChildFiles = new Set(generatedSitemaps.map((sm) => sm.filename));

for (const dir of cleanupDirs) {
  // Exactly one index + exactly the generated children must exist
  const xmlFiles = fs.readdirSync(dir).filter((f) => /^sitemap.*\.xml$/i.test(f));
  const indexFiles = xmlFiles.filter((f) => !expectedChildFiles.has(f));
  if (indexFiles.length !== 1 || indexFiles[0] !== INDEX_FILENAME) {
    fail(`expected exactly one index (${INDEX_FILENAME}) in ${dir}, found: ${indexFiles.join(', ') || 'none'}`);
  }

  const indexContent = fs.readFileSync(path.join(dir, INDEX_FILENAME), 'utf-8');
  const indexRefs = [...indexContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (indexRefs.length !== generatedSitemaps.length) {
    fail(`index in ${dir} references ${indexRefs.length} children, expected ${generatedSitemaps.length}`);
  }
  if (new Set(indexRefs).size !== indexRefs.length) {
    fail(`duplicate child references inside index in ${dir}`);
  }
  for (const ref of indexRefs) {
    if (!ref.startsWith(`${SITE_URL}/sitemap-`)) fail(`index references non-child URL: ${ref}`);
    if (!fs.existsSync(path.join(dir, path.basename(new URL(ref).pathname)))) {
      fail(`index references missing child file: ${ref}`);
    }
  }

  // Uniqueness and URL hygiene are validated PER output directory
  const seenUrls = new Map();
  let dirUrlEntries = 0;

  for (const sm of generatedSitemaps) {
    const content = fs.readFileSync(path.join(dir, sm.filename), 'utf-8');
    const locs = [...content.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    for (const loc of locs) {
      dirUrlEntries++;
      if (!loc.startsWith(`${SITE_URL}/`)) fail(`non-canonical host/protocol in ${sm.filename}: ${loc}`);
      if (loc.includes('localhost') || loc.startsWith('http://')) fail(`invalid URL in ${sm.filename}: ${loc}`);
      if (loc.replace('https://', '').includes('//')) fail(`double slash in ${sm.filename}: ${loc}`);
      if (loc.includes('#') || loc.includes('?')) fail(`fragment/query in ${sm.filename}: ${loc}`);
      const pathname = new URL(loc).pathname;
      if (pathname !== '/' && !pathname.endsWith('/')) fail(`missing trailing slash in ${sm.filename}: ${loc}`);
      if (/\/(404|500)(\/|$)/.test(pathname)) fail(`error document in sitemap: ${loc}`);
      if (seenUrls.has(loc)) {
        fail(`duplicate URL "${loc}" in ${seenUrls.get(loc)} and ${sm.filename}`);
      }
      seenUrls.set(loc, sm.filename);
    }
  }

  if (seenUrls.size !== allUrls.length) {
    fail(`written URL set (${seenUrls.size}) differs from eligible route set (${allUrls.length}) in ${dir}`);
  }
  if (dirUrlEntries !== seenUrls.size) {
    fail(`${dirUrlEntries - seenUrls.size} duplicate URL entr(ies) across child sitemaps in ${dir}`);
  }
}

console.log(`✅ Self-validation passed: ${allUrls.length} unique canonical URLs across ${generatedSitemaps.length} child sitemaps; 1 authoritative index.`);
