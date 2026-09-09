import fs from 'node:fs';
import path from 'node:path';

const distClientDir = path.resolve('dist/client');
const publicDir = path.resolve('public');

const distSitemap0Path = path.join(distClientDir, 'sitemap-0.xml');
const publicSitemap0Path = path.join(publicDir, 'sitemap-0.xml');
const distSitemapXmlPath = path.join(distClientDir, 'sitemap.xml');
const publicSitemapXmlPath = path.join(publicDir, 'sitemap.xml');
const distXslPath = path.join(distClientDir, 'sitemap.xsl');
const publicXslPath = path.join(publicDir, 'sitemap.xsl');

// Ensure sitemap.xsl is also copied to dist/client
if (fs.existsSync(publicXslPath) && !fs.existsSync(distXslPath)) {
  fs.copyFileSync(publicXslPath, distXslPath);
}

const sitemapIndexXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://freeaccuratecalculator.com/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>
`;

if (fs.existsSync(distSitemap0Path)) {
  let content = fs.readFileSync(distSitemap0Path, 'utf-8');

  // Format with clean linebreaks between URL entries for clean browser rendering
  content = content
    .replace(/></g, '>\n<')
    .replace(/<url>/g, '  <url>')
    .replace(/<\/url>/g, '  </url>')
    .replace(/<loc>/g, '    <loc>')
    .replace(/<xhtml:link/g, '    <xhtml:link');

  // Ensure xml-stylesheet declaration is present
  if (!content.includes('xml-stylesheet')) {
    content = content.replace('<?xml version="1.0" encoding="UTF-8"?>', '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>');
  }

  // Write formatted sitemap-0.xml to dist and public
  fs.writeFileSync(distSitemap0Path, content, 'utf-8');
  fs.writeFileSync(publicSitemap0Path, content, 'utf-8');

  // Write sitemap.xml to dist and public
  fs.writeFileSync(distSitemapXmlPath, sitemapIndexXmlContent, 'utf-8');
  fs.writeFileSync(publicSitemapXmlPath, sitemapIndexXmlContent, 'utf-8');

  console.log('✅ Successfully styled and synced sitemap.xml (index) and sitemap-0.xml (formatted all pages)');
} else {
  console.warn('⚠️ sitemap-0.xml not found in dist/client');
}
