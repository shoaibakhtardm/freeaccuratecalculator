// tests/validate-sitemap-xml.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const PUBLIC_DIR = path.resolve('public');
const DIST_DIR = path.resolve('dist/client');

// Strict XML Token & Stack Validator
function validateXmlWellFormedness(xmlContent, filename) {
  assert.ok(
    xmlContent.startsWith('<?xml version="1.0" encoding="UTF-8"?>'),
    `${filename} must start with <?xml version="1.0" encoding="UTF-8"?>`
  );

  const tagRegex = /<(\/?)([\w:-]+)([^>]*)>/g;
  const stack = [];
  let match;

  while ((match = tagRegex.exec(xmlContent)) !== null) {
    const [, isClosing, tagName, attrs] = match;
    const isSelfClosing = attrs.trim().endsWith('/');

    if (isClosing) {
      assert.ok(stack.length > 0, `${filename}: Unexpected closing tag </${tagName}> with empty stack`);
      const top = stack.pop();
      assert.equal(top, tagName, `${filename}: Mismatched closing tag </${tagName}>, expected </${top}>`);
    } else if (!isSelfClosing) {
      stack.push(tagName);
    }
  }

  assert.equal(stack.length, 0, `${filename}: Unclosed tags remaining: ${stack.join(', ')}`);
}

test('Strict XML Sitemap Protocol Verification', async (t) => {
  const xmlFiles = fs.readdirSync(PUBLIC_DIR).filter((f) => f.startsWith('sitemap') && f.endsWith('.xml'));

  await t.test('All public sitemap files are well-formed XML and have valid namespaces', () => {
    for (const file of xmlFiles) {
      const content = fs.readFileSync(path.join(PUBLIC_DIR, file), 'utf-8');
      validateXmlWellFormedness(content, file);

      assert.ok(
        content.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'),
        `${file} must include official sitemaps.org 0.9 namespace`
      );
    }
  });

  await t.test('No tag concatenation or squashed output (ensures separate lines for all child tags)', () => {
    for (const file of xmlFiles) {
      const content = fs.readFileSync(path.join(PUBLIC_DIR, file), 'utf-8');
      
      // Look for the bug pattern: </loc><lastmod>, </lastmod><changefreq>, </changefreq><priority>
      assert.doesNotMatch(
        content,
        /<\/loc><lastmod>/,
        `${file} has unspaced </loc><lastmod> concatenation`
      );
      assert.doesNotMatch(
        content,
        /<\/lastmod><changefreq>/,
        `${file} has unspaced </lastmod><changefreq> concatenation`
      );
      assert.doesNotMatch(
        content,
        /<\/changefreq><priority>/,
        `${file} has unspaced </changefreq><priority> concatenation`
      );

      // Verify each tag inside <url> is on its own line
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('<loc>')) {
          assert.match(line, /^<loc>https:\/\/freeaccuratecalculator\.com[^<]*<\/loc>$/, `Line ${i + 1} in ${file} has malformed <loc> element: "${line}"`);
        }
        if (line.startsWith('<lastmod>')) {
          assert.match(line, /^<lastmod>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z<\/lastmod>$/, `Line ${i + 1} in ${file} has malformed <lastmod> element: "${line}"`);
        }
      }
    }
  });

  await t.test('Exactly one sitemap index exists; no legacy duplicate indexes; public/ and dist/ parity', () => {
    for (const dir of [PUBLIC_DIR, DIST_DIR]) {
      if (!fs.existsSync(dir)) continue;
      assert.ok(fs.existsSync(path.join(dir, 'sitemap.xml')), `${dir}/sitemap.xml (single authoritative index) must exist`);
      assert.ok(!fs.existsSync(path.join(dir, 'sitemap_index.xml')), `${dir}/sitemap_index.xml legacy duplicate index must not exist`);
      assert.ok(!fs.existsSync(path.join(dir, 'sitemap-index.xml')), `${dir}/sitemap-index.xml legacy duplicate index must not exist`);
    }

    // public/ and dist/client/ must expose the identical sitemap file set
    if (fs.existsSync(DIST_DIR)) {
      const publicSet = fs.readdirSync(PUBLIC_DIR).filter((f) => /^sitemap.*\.xml$/.test(f)).sort();
      const distSet = fs.readdirSync(DIST_DIR).filter((f) => /^sitemap.*\.xml$/.test(f)).sort();
      assert.deepEqual(distSet, publicSet, `dist/client sitemap files must match public/ exactly: public=${publicSet.join(',')} dist=${distSet.join(',')}`);
    }
  });

  await t.test('Master sitemapindex references every generated child sitemap with 0 missing and valid HTTPS URLs', () => {
    const sitemapXml = fs.readFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), 'utf-8');
    assert.match(sitemapXml, /^<\?xml version="1.0" encoding="UTF-8"\?>\s*<sitemapindex/);

    const childSitemaps = [...sitemapXml.matchAll(/<loc>(https:\/\/freeaccuratecalculator\.com\/sitemap-[^<]+\.xml)<\/loc>/g)].map(
      (m) => m[1]
    );

    assert.ok(childSitemaps.length > 0, 'Expected at least one generated child sitemap');

    for (const sitemapUrl of childSitemaps) {
      const filename = path.basename(new URL(sitemapUrl).pathname);
      assert.ok(fs.existsSync(path.join(PUBLIC_DIR, filename)), `Child sitemap ${filename} must exist on disk in public`);
    }
  });

  await t.test('Child sitemaps partition all unique URLs with 0 cross-chunk duplicates', () => {
    const childFiles = xmlFiles.filter((f) => f.startsWith('sitemap-') && f !== 'sitemap-index.xml');
    const seenUrls = new Map();
    let totalCount = 0;

    for (const file of childFiles) {
      const content = fs.readFileSync(path.join(PUBLIC_DIR, file), 'utf-8');
      const locs = [...content.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map((m) => m[1]);

      assert.ok(locs.length <= 500, `${file} exceeds 500 URL cap (${locs.length} URLs)`);

      for (const loc of locs) {
        totalCount++;
        assert.ok(
          loc.startsWith('https://freeaccuratecalculator.com/'),
          `Invalid protocol or hostname in ${file}: ${loc}`
        );
        assert.ok(!loc.includes('localhost'), `Localhost detected in ${file}: ${loc}`);
        assert.ok(!loc.replace('https://', '').includes('//'), `Double slash detected in ${file}: ${loc}`);

        if (seenUrls.has(loc)) {
          assert.fail(`Duplicate URL detected: "${loc}" found in both ${seenUrls.get(loc)} and ${file}`);
        }
        seenUrls.set(loc, file);
      }
    }

    assert.ok(seenUrls.size > 0, 'Expected generated child sitemaps to contain URLs');
    assert.equal(totalCount, seenUrls.size, 'Total URLs across chunks must equal unique count (no duplicates)');
  });

  await t.test('Lastmod dates are heterogeneous and reflect real Git modification history (not single build timestamp)', () => {
    const mainContent = fs.readFileSync(path.join(PUBLIC_DIR, 'sitemap-main.xml'), 'utf-8');
    const lastmods = [...mainContent.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
    const uniqueLastmods = new Set(lastmods);

    assert.ok(
      uniqueLastmods.size > 1,
      `Lastmod timestamps must not all be identical build stamps (found ${uniqueLastmods.size} unique timestamps)`
    );
  });
});
