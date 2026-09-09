import fs from 'node:fs';
import path from 'node:path';

const distClientDir = path.resolve('dist/client');
const publicDir = path.resolve('public');

const distSitemap0 = path.join(distClientDir, 'sitemap-0.xml');
const distSitemapIndex = path.join(distClientDir, 'sitemap-index.xml');
const distSitemapXml = path.join(distClientDir, 'sitemap.xml');
const publicSitemapXml = path.join(publicDir, 'sitemap.xml');

// Clean up any extra sitemap files from public
const publicExtras = ['sitemap-0.xml', 'sitemap-index.xml', 'sitemap.xsl'];
for (const extra of publicExtras) {
  const p = path.join(publicDir, extra);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

// Clean up any extra sitemap files from dist/client
const distExtras = ['sitemap.xsl'];
for (const extra of distExtras) {
  const p = path.join(distClientDir, extra);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

if (fs.existsSync(distSitemap0)) {
  let content = fs.readFileSync(distSitemap0, 'utf-8');

  // Format with clean linebreaks between entries
  content = content
    .replace(/></g, '>\n<')
    .replace(/<url>/g, '  <url>')
    .replace(/<\/url>/g, '  </url>')
    .replace(/<loc>/g, '    <loc>')
    .replace(/<lastmod>/g, '    <lastmod>')
    .replace(/<changefreq>/g, '    <changefreq>')
    .replace(/<priority>/g, '    <priority>')
    .replace(/<xhtml:link/g, '    <xhtml:link');

  // Save the single original sitemap.xml with all pages
  fs.writeFileSync(distSitemapXml, content, 'utf-8');
  fs.writeFileSync(publicSitemapXml, content, 'utf-8');

  // Remove the temporary chunked files from dist/client so ONLY sitemap.xml remains
  fs.unlinkSync(distSitemap0);
  if (fs.existsSync(distSitemapIndex)) fs.unlinkSync(distSitemapIndex);

  console.log('✅ Kept ONLY ONE single sitemap.xml containing all pages. Cleaned up all extra files.');
} else {
  console.warn('⚠️ sitemap-0.xml not found during build');
}
