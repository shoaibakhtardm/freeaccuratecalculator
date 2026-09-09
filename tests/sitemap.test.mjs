import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist/client');
const PUBLIC_DIR = path.resolve('public');
const SRC_DIR = path.resolve('src');

test('Sitemap generation and discovery audit', async (t) => {
  await t.test('sitemap-index.xml exists and references sitemap-0.xml', () => {
    const sitemapIndexPath = path.join(DIST_DIR, 'sitemap-index.xml');
    assert.ok(fs.existsSync(sitemapIndexPath), 'sitemap-index.xml should exist in dist/client');
    const content = fs.readFileSync(sitemapIndexPath, 'utf-8');
    assert.match(content, /<sitemapindex/, 'Should have <sitemapindex> tag');
    assert.match(content, /https:\/\/freeaccuratecalculator\.com\/sitemap-0\.xml/, 'Should link to sitemap-0.xml');
  });

  await t.test('sitemap.xml exists and references sitemap-0.xml', () => {
    const sitemapXmlPath = path.join(DIST_DIR, 'sitemap.xml');
    assert.ok(fs.existsSync(sitemapXmlPath), 'sitemap.xml should exist in dist/client');
    const content = fs.readFileSync(sitemapXmlPath, 'utf-8');
    assert.match(content, /<sitemapindex/, 'Should have <sitemapindex> tag');
    assert.match(content, /https:\/\/freeaccuratecalculator\.com\/sitemap-0\.xml/, 'Should link to sitemap-0.xml');
  });

  await t.test('public/sitemap-0.xml exists so local dev server serves all pages', () => {
    const publicSitemap0 = path.join(PUBLIC_DIR, 'sitemap-0.xml');
    assert.ok(fs.existsSync(publicSitemap0), 'public/sitemap-0.xml should exist');
    const content = fs.readFileSync(publicSitemap0, 'utf-8');
    assert.match(content, /<urlset/, 'Should have <urlset> tag');
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/<\/loc>/);
  });

  await t.test('sitemap-0.xml contains valid urls and multilingual alternate hreflang tags', () => {
    const sitemap0Path = path.join(DIST_DIR, 'sitemap-0.xml');
    assert.ok(fs.existsSync(sitemap0Path), 'sitemap-0.xml should exist in dist/client');
    const content = fs.readFileSync(sitemap0Path, 'utf-8');
    
    // Core routes present
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/<\/loc>/);
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/math\/percentage-calculator\/<\/loc>/);
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/finance\/emi-calculator\/<\/loc>/);
    assert.match(content, /<loc>https:\/\/freeaccuratecalculator\.com\/health\/bmi-calculator\/<\/loc>/);
    
    // Dev-preview and API routes properly excluded
    assert.doesNotMatch(content, /\/dev-preview\//);
    assert.doesNotMatch(content, /\/api\//);

    // Multilingual alternate links
    assert.match(content, /xhtml:link[^>]+hreflang="es"/);
    assert.match(content, /xhtml:link[^>]+hreflang="fr"/);
    assert.match(content, /xhtml:link[^>]+hreflang="hi"/);
  });

  await t.test('robots.txt points to sitemap-index.xml and sitemap.xml', () => {
    const robotsPath = path.join(PUBLIC_DIR, 'robots.txt');
    assert.ok(fs.existsSync(robotsPath), 'robots.txt should exist in public');
    const content = fs.readFileSync(robotsPath, 'utf-8');
    assert.match(content, /Sitemap:\s*https:\/\/freeaccuratecalculator\.com\/sitemap-index\.xml/);
    assert.match(content, /Sitemap:\s*https:\/\/freeaccuratecalculator\.com\/sitemap\.xml/);
  });

  await t.test('Layout.astro includes link rel="sitemap"', () => {
    const layoutPath = path.join(SRC_DIR, 'layouts', 'Layout.astro');
    assert.ok(fs.existsSync(layoutPath), 'Layout.astro should exist');
    const content = fs.readFileSync(layoutPath, 'utf-8');
    assert.match(content, /<link rel="sitemap" href="\/sitemap-index\.xml" \/>/);
  });

  await t.test('100% HTML pages are present in sitemap (excluding dev-preview)', () => {
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

    const sitemap0Content = fs.readFileSync(path.join(DIST_DIR, 'sitemap-0.xml'), 'utf-8');
    const sitemapUrls = new Set([...sitemap0Content.matchAll(/<loc>https:\/\/freeaccuratecalculator\.com([^<]*)<\/loc>/g)].map((m) => m[1] || '/'));

    const excluded = ['/dev-preview/'];
    const missing = htmlRoutes.filter((r) => !sitemapUrls.has(r) && !excluded.includes(r));
    assert.equal(missing.length, 0, `Pages missing from sitemap: ${missing.join(', ')}`);
    assert.equal(sitemapUrls.size, 192, 'Expected 192 total URLs in sitemap-0.xml');
  });
});
