import fs from 'node:fs';
import path from 'node:path';

function findHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      findHtmlFiles(fullPath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const htmlFiles = findHtmlFiles('dist/client');
console.log('Total HTML files in dist/client:', htmlFiles.length);

const sampleRoutes = [
  'dist/client/index.html',
  'dist/client/pt/index.html',
  'dist/client/it/index.html',
  'dist/client/de/index.html',
  'dist/client/fr/index.html',
  'dist/client/es/index.html',
  'dist/client/finance/index.html',
  'dist/client/guides/index.html',
  'dist/client/emi-calculator/index.html',
  'dist/client/compound-interest-calculator/index.html',
  'dist/client/percentage-calculator/index.html',
  'dist/client/calculadora-salario/pt/index.html',
  'dist/client/calculadora-de-ferias/pt/index.html',
  'dist/client/calculadora-edad/es/index.html',
  'dist/client/palworld-breeding-calculator/index.html'
];

for (const r of sampleRoutes) {
  if (fs.existsSync(r)) {
    const html = fs.readFileSync(r, 'utf8');
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const metaDesc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    const hreflangs = [...html.matchAll(/<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']*)["'][^>]*href=["']([^"']*)["']/gi)].map(m => m[1] + ':' + m[2]);
    const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);

    console.log('\n=== ' + r + ' ===');
    console.log('Title: ' + (titleMatch ? titleMatch[1] : 'NONE'));
    console.log('Meta Desc: ' + (metaDesc ? metaDesc[1].slice(0, 100) + '...' : 'NONE'));
    console.log('Canonical: ' + (canonicalMatch ? canonicalMatch[1] : 'NONE'));
    console.log('Robots: ' + (robotsMatch ? robotsMatch[1] : 'NONE'));
    console.log('H1 count (' + h1Matches.length + '): ' + h1Matches.join(' | '));
    console.log('Hreflangs count: ' + hreflangs.length + ' (' + hreflangs.slice(0, 4).join(', ') + '...)');
  } else {
    console.log('\n=== ' + r + ' === NOT FOUND IN DIST');
  }
}
