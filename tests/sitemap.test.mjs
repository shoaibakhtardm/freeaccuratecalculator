import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist/client');
const PUBLIC_DIR = path.resolve('public');
const SRC_DIR = path.resolve('src');

test('Categorized Sitemap and Discovery Audit', async (t) => {
  await t.test('sitemap-index.xml and categorized sitemaps exist in public', () => {
    const publicSitemapIndex = path.join(PUBLIC_DIR, 'sitemap-index.xml');
    const publicFinanceSitemap = path.join(PUBLIC_DIR, 'sitemap-finance.xml');
    const publicCountriesSitemap = path.join(PUBLIC_DIR, 'sitemap-countries.xml');

    assert.ok(fs.existsSync(publicSitemapIndex), 'sitemap-index.xml must exist in public');
    assert.ok(fs.existsSync(publicFinanceSitemap), 'sitemap-finance.xml must exist in public');
    assert.ok(fs.existsSync(publicCountriesSitemap), 'sitemap-countries.xml must exist in public');

    const indexContent = fs.readFileSync(publicSitemapIndex, 'utf-8');
    assert.match(indexContent, /<sitemapindex/, 'Must have <sitemapindex> root tag');
    assert.match(indexContent, /<loc>https:\/\/freeaccuratecalculator\.com\/sitemap-finance\.xml<\/loc>/);
    assert.match(indexContent, /<loc>https:\/\/freeaccuratecalculator\.com\/sitemap-countries\.xml<\/loc>/);
    assert.match(indexContent, /<lastmod>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z<\/lastmod>/, 'Must have ISO 8601 timestamps');
  });

  await t.test('sitemap.xml contains valid urlset and all core routes', () => {
    const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
    const content = fs.readFileSync(sitemapPath, 'utf-8');

    assert.match(content, /<urlset/, 'Must have <urlset> root tag');
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/<\/loc>/);
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/math\/percentage-calculator\/<\/loc>/);
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/finance\/emi-calculator\/<\/loc>/);
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/health\/bmi-calculator\/<\/loc>/);

    // Dev preview and API excluded
    assert.doesNotMatch(content, /\/dev-preview\//);
    assert.doesNotMatch(content, /\/api\//);

    // Verify dynamic ISO 8601 lastmod format
    assert.match(content, /<lastmod>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z<\/lastmod>/, 'Must have ISO 8601 timestamps');

    // Verify SEO prioritization rules
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/<\/loc>\s*<lastmod>[^<]+<\/lastmod>\s*<changefreq>daily<\/changefreq>\s*<priority>1\.0<\/priority>/);
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/finance\/<\/loc>\s*<lastmod>[^<]+<\/lastmod>\s*<changefreq>weekly<\/changefreq>\s*<priority>0\.8<\/priority>/);
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/math\/percentage-calculator\/<\/loc>\s*<lastmod>[^<]+<\/lastmod>\s*<changefreq>weekly<\/changefreq>\s*<priority>0\.7<\/priority>/);
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/about\/<\/loc>\s*<lastmod>[^<]+<\/lastmod>\s*<changefreq>monthly<\/changefreq>\s*<priority>0\.5<\/priority>/);
  });

  await t.test('robots.txt points strictly to sitemap-index.xml and blocks AI bots', () => {
    const robotsPath = path.join(PUBLIC_DIR, 'robots.txt');
    assert.ok(fs.existsSync(robotsPath), 'robots.txt should exist in public');
    const content = fs.readFileSync(robotsPath, 'utf-8');
    assert.match(content, /Sitemap:\s*https:\/\/freeaccuratecalculator\.com\/sitemap-index\.xml/);
    assert.match(content, /User-agent:\s*GPTBot/);
    assert.match(content, /User-agent:\s*CCBot/);
    assert.match(content, /User-agent:\s*ClaudeBot/);
  });

  await t.test('Layout.astro includes link rel="sitemap" to /sitemap-index.xml', () => {
    const layoutPath = path.join(SRC_DIR, 'layouts', 'Layout.astro');
    assert.ok(fs.existsSync(layoutPath), 'Layout.astro should exist');
    const content = fs.readFileSync(layoutPath, 'utf-8');
    assert.match(content, /<link rel="sitemap" href="\/sitemap-index\.xml" \/>/);
  });

  await t.test('100% HTML pages are present in the single sitemap.xml', () => {
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

    const sitemapContent = fs.readFileSync(path.join(DIST_DIR, 'sitemap.xml'), 'utf-8');
    const sitemapUrls = new Set([...sitemapContent.matchAll(/<loc>https:\/\/freeaccuratecalculator\.com([^<]*)<\/loc>/g)].map((m) => m[1] || '/'));

    const excluded = ['/dev-preview/'];
    const validRoutes = htmlRoutes.filter((r) => !excluded.includes(r));
    const missing = validRoutes.filter((r) => !sitemapUrls.has(r));
    assert.equal(missing.length, 0, `Pages missing from sitemap.xml: ${missing.join(', ')}`);
    assert.equal(sitemapUrls.size, validRoutes.length, `Expected ${validRoutes.length} total URLs in sitemap.xml`);
  });
});
