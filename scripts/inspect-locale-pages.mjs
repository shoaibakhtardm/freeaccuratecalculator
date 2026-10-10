import fs from 'node:fs';

const locales = ['pt', 'it', 'de', 'fr', 'es', 'en'];

for (const loc of locales) {
  const filePath = loc === 'en' ? 'dist/client/index.html' : `dist/client/${loc}/index.html`;
  if (!fs.existsSync(filePath)) {
    console.log(`=== ${loc}: FILE NOT FOUND ===`);
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf8');
  console.log(`\n=================== LOCALE: ${loc} (${filePath}) ===================`);
  
  const htmlTag = html.match(/<html[^>]*>/i);
  console.log('HTML tag:', htmlTag ? htmlTag[0] : 'NONE');

  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  console.log('Title:', titleMatch ? titleMatch[1] : 'NONE');

  const metaDesc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  console.log('Meta Desc:', metaDesc ? metaDesc[1] : 'NONE');

  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'NONE');

  const hreflangs = [...html.matchAll(/<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']*)["'][^>]*href=["']([^"']*)["']/gi)].map(m => `${m[1]} -> ${m[2]}`);
  console.log(`Hreflangs (${hreflangs.length}):`);
  hreflangs.forEach(h => console.log('   ' + h));

  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log('H1:', h1.join(' | '));
}
