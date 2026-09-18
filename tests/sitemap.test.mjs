import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist/client');
const PUBLIC_DIR = path.resolve('public');
const SRC_DIR = path.resolve('src');

test('Categorized Sitemap and Discovery Audit', async (t) => {
  await t.test('sitemap_index.xml and sitemap-index.xml exist and chunked sitemaps are under 500 URLs', () => {
    const publicSitemapIndex1 = path.join(PUBLIC_DIR, 'sitemap_index.xml');
    const publicSitemapIndex2 = path.join(PUBLIC_DIR, 'sitemap-index.xml');
    const publicFinanceSitemap = path.join(PUBLIC_DIR, 'sitemap-finance.xml');

    assert.ok(fs.existsSync(publicSitemapIndex1), 'sitemap_index.xml must exist in public');
    assert.ok(fs.existsSync(publicSitemapIndex2), 'sitemap-index.xml must exist in public');
    assert.ok(fs.existsSync(publicFinanceSitemap), 'sitemap-finance.xml must exist in public');

    const indexContent = fs.readFileSync(publicSitemapIndex1, 'utf-8');
    assert.match(indexContent, /<sitemapindex/, 'Must have <sitemapindex> root tag');
    assert.match(indexContent, /<loc>https:\/\/freeaccuratecalculator\.com\/sitemap-finance\.xml<\/loc>/);
    assert.match(indexContent, /<lastmod>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z<\/lastmod>/, 'Must have ISO 8601 timestamps');

    // Verify all sitemap-*.xml files have <= 500 URLs
    const files = fs.readdirSync(PUBLIC_DIR);
    for (const file of files) {
      if (file.startsWith('sitemap-') && file.endsWith('.xml') && file !== 'sitemap-index.xml' && file !== 'sitemap_index.xml') {
        const content = fs.readFileSync(path.join(PUBLIC_DIR, file), 'utf-8');
        const urlMatches = content.match(/<loc>/g) || [];
        assert.ok(urlMatches.length <= 500, `${file} must contain at most 500 URLs, found ${urlMatches.length}`);
      }
    }
  });

  await t.test('sitemap.xml is authoritative master sitemap index and child sitemaps contain all core routes', () => {
    const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
    const content = fs.readFileSync(sitemapPath, 'utf-8');

    assert.match(content, /<sitemapindex/, 'Must have <sitemapindex> root tag');
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/sitemap-main\.xml<\/loc>/);
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/sitemap-finance\.xml<\/loc>/);
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/sitemap-countries-1\.xml<\/loc>/);
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/sitemap-math\.xml<\/loc>/);
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/sitemap-health\.xml<\/loc>/);

    // Dev preview and API excluded
    assert.doesNotMatch(content, /\/dev-preview\//);
    assert.doesNotMatch(content, /\/api\//);

    // Verify dynamic ISO 8601 lastmod format
    assert.match(content, /<lastmod>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z<\/lastmod>/, 'Must have ISO 8601 timestamps');

    // Verify child sitemaps contain core routes with proper formatting and no tag concatenation
    const mainContent = fs.readFileSync(path.join(PUBLIC_DIR, 'sitemap-main.xml'), 'utf-8');
    const financeContent = fs.readFileSync(path.join(PUBLIC_DIR, 'sitemap-finance.xml'), 'utf-8');
    const mathContent = fs.readFileSync(path.join(PUBLIC_DIR, 'sitemap-math.xml'), 'utf-8');

    assert.match(mainContent, /<loc>https:\/\/freeaccuratecalculator\.com\/<\/loc>\s*<lastmod>[^<]+<\/lastmod>\s*<changefreq>daily<\/changefreq>\s*<priority>1\.0<\/priority>/);
    assert.match(financeContent, /<loc>https:\/\/freeaccuratecalculator\.com\/finance\/<\/loc>\s*<lastmod>[^<]+<\/lastmod>\s*<changefreq>weekly<\/changefreq>\s*<priority>0\.8<\/priority>/);
    assert.match(mathContent, /<loc>https:\/\/freeaccuratecalculator\.com\/math\/percentage-calculator\/<\/loc>\s*<lastmod>[^<]+<\/lastmod>\s*<changefreq>weekly<\/changefreq>\s*<priority>0\.7<\/priority>/);
    assert.match(mainContent, /<loc>https:\/\/freeaccuratecalculator\.com\/about\/<\/loc>\s*<lastmod>[^<]+<\/lastmod>\s*<changefreq>monthly<\/changefreq>\s*<priority>0\.5<\/priority>/);
  });

  await t.test('robots.txt points strictly to sitemap index files and blocks AI bots', () => {
    const robotsPath = path.join(PUBLIC_DIR, 'robots.txt');
    assert.ok(fs.existsSync(robotsPath), 'robots.txt should exist in public');
    const content = fs.readFileSync(robotsPath, 'utf-8');
    assert.match(content, /Sitemap:\s*https:\/\/freeaccuratecalculator\.com\/sitemap_index\.xml/);
    assert.match(content, /Sitemap:\s*https:\/\/freeaccuratecalculator\.com\/sitemap-index\.xml/);
    assert.match(content, /User-agent:\s*Googlebot/);
    assert.match(content, /User-agent:\s*GPTBot/);
    assert.match(content, /User-agent:\s*CCBot/);
    assert.match(content, /User-agent:\s*ClaudeBot/);
  });

  await t.test('Layout.astro includes link rel="sitemap" to sitemap indexes', () => {
    const layoutPath = path.join(SRC_DIR, 'layouts', 'Layout.astro');
    assert.ok(fs.existsSync(layoutPath), 'Layout.astro should exist');
    const content = fs.readFileSync(layoutPath, 'utf-8');
    assert.match(content, /<link rel="sitemap" href="\/sitemap_index\.xml" \/>/);
    assert.match(content, /<link rel="sitemap" href="\/sitemap-index\.xml" \/>/);
  });

  await t.test('100% HTML pages are present in the sitemap system', () => {
    if (!fs.existsSync(DIST_DIR)) return;

    function getAllHtml(dir) {
      let files = [];
      for (const item of fs.readdirSync(dir)) {
        const full = path.join(dir, item);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) files = files.concat(getAllHtml(full));
        else if (full.endsWith('.html')) files.push(full);
      }
      return files;
    }

    const htmlFiles = getAllHtml(DIST_DIR);
    const htmlRoutes = htmlFiles.map((f) => {
      let rel = path.relative(DIST_DIR, f).split(path.sep).join('/');
      if (rel === 'index.html') return '/';
      if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'index.html'.length);
      return '/' + rel;
    });

    const sitemapFiles = fs.readdirSync(DIST_DIR).filter((f) => f.startsWith('sitemap') && f.endsWith('.xml'));
    const sitemapUrls = new Set();
    for (const sFile of sitemapFiles) {
      const content = fs.readFileSync(path.join(DIST_DIR, sFile), 'utf-8');
      for (const m of content.matchAll(/<loc>https:\/\/freeaccuratecalculator\.com([^<]*)<\/loc>/g)) {
        sitemapUrls.add(m[1] || '/');
      }
    }

    const redirectsPath = path.join(PUBLIC_DIR, '_redirects');
    const redirected = new Set();
    if (fs.existsSync(redirectsPath)) {
      for (const line of fs.readFileSync(redirectsPath, 'utf-8').split('\n')) {
        const p = line.trim().split(/\s+/)[0];
        if (p && !p.startsWith('#')) {
          redirected.add(p.endsWith('/') ? p : `${p}/`);
          redirected.add(p.endsWith('/') ? p.slice(0, -1) : p);
        }
      }
    }

    const excluded = ['/dev-preview/', '/api/', '/404', '/404.html', '/500', '/500.html'];
    const validRoutes = htmlRoutes.filter((r) => !excluded.some((ex) => r.startsWith(ex) || r === ex) && !redirected.has(r));
    const missing = validRoutes.filter((r) => !sitemapUrls.has(r));
    assert.equal(missing.length, 0, `Pages missing from sitemap.xml: ${missing.join(', ')}`);
  });
});
