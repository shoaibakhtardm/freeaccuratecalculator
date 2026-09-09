import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist/client');
const PUBLIC_DIR = path.resolve('public');
const SRC_DIR = path.resolve('src');

test('Single Sitemap.xml integrity and discovery audit', async (t) => {
  await t.test('sitemap.xml exists as the ONLY sitemap in dist/client and public', () => {
    const distSitemap = path.join(DIST_DIR, 'sitemap.xml');
    const publicSitemap = path.join(PUBLIC_DIR, 'sitemap.xml');

    assert.ok(fs.existsSync(distSitemap), 'sitemap.xml must exist in dist/client');
    assert.ok(fs.existsSync(publicSitemap), 'sitemap.xml must exist in public');

    // Verify extra files are completely deleted
    assert.ok(!fs.existsSync(path.join(DIST_DIR, 'sitemap-0.xml')), 'sitemap-0.xml should not exist in dist/client');
    assert.ok(!fs.existsSync(path.join(DIST_DIR, 'sitemap-index.xml')), 'sitemap-index.xml should not exist in dist/client');
    assert.ok(!fs.existsSync(path.join(PUBLIC_DIR, 'sitemap-0.xml')), 'sitemap-0.xml should not exist in public');
    assert.ok(!fs.existsSync(path.join(PUBLIC_DIR, 'sitemap.xsl')), 'sitemap.xsl should not exist in public');
  });

  await t.test('sitemap.xml contains valid urlset and all core routes', () => {
    const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
    const content = fs.readFileSync(sitemapPath, 'utf-8');

    assert.match(content, /<urlset/, 'Must have <urlset> root tag');
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/<\/loc>/);
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/math\/percentage-calculator\/<\/loc>/);
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/finance\/emi-calculator\/<\/loc>/);
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/health\/bmi-calculator\/<\/loc>/);

    // Multilingual alternate links
    assert.match(content, /xhtml:link[^>]+hreflang="es"/);
    assert.match(content, /xhtml:link[^>]+hreflang="fr"/);
    assert.match(content, /xhtml:link[^>]+hreflang="hi"/);

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

  await t.test('robots.txt points strictly to single sitemap.xml', () => {
    const robotsPath = path.join(PUBLIC_DIR, 'robots.txt');
    assert.ok(fs.existsSync(robotsPath), 'robots.txt should exist in public');
    const content = fs.readFileSync(robotsPath, 'utf-8');
    assert.match(content, /Sitemap:\s*https:\/\/freeaccuratecalculator\.com\/sitemap\.xml/);
    assert.doesNotMatch(content, /sitemap-index\.xml/);
    assert.doesNotMatch(content, /sitemap-0\.xml/);
  });

  await t.test('Layout.astro includes link rel="sitemap" to /sitemap.xml', () => {
    const layoutPath = path.join(SRC_DIR, 'layouts', 'Layout.astro');
    assert.ok(fs.existsSync(layoutPath), 'Layout.astro should exist');
    const content = fs.readFileSync(layoutPath, 'utf-8');
    assert.match(content, /<link rel="sitemap" href="\/sitemap\.xml" \/>/);
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
    const missing = htmlRoutes.filter((r) => !sitemapUrls.has(r) && !excluded.includes(r));
    assert.equal(missing.length, 0, `Pages missing from sitemap.xml: ${missing.join(', ')}`);
    assert.equal(sitemapUrls.size, 274, 'Expected 274 total URLs in sitemap.xml');
  });
});
