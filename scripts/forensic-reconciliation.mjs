import fs from 'fs';
import path from 'path';

function getAllHtmlFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath, baseDir));
    } else if (file.endsWith('.html')) {
      const rel = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      let url = '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '');
      if (!url.endsWith('/') && url !== '') url += '/';
      results.push({ file: rel, url });
    }
  });
  return results;
}

const htmlFiles = getAllHtmlFiles('dist/client');
console.log('Total Generated HTML files in dist/client:', htmlFiles.length);

const sitemapXml = fs.readFileSync('public/sitemap.xml', 'utf8');
const sitemapUrls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => {
  try {
    return new URL(m[1]).pathname;
  } catch {
    return m[1];
  }
});
console.log('Total URLs in public/sitemap.xml:', sitemapUrls.length);

const htmlUrls = htmlFiles.map(h => h.url);
const notInSitemap = htmlFiles.filter(h => !sitemapUrls.includes(h.url));
console.log('\n--- HTML Files NOT in Sitemap (Count: ' + notInSitemap.length + ') ---');
notInSitemap.forEach(h => console.log(' File: ' + h.file + ' -> URL: ' + h.url));

const notInHtml = sitemapUrls.filter(u => !htmlUrls.includes(u));
console.log('\n--- Sitemap URLs NOT in HTML (Count: ' + notInHtml.length + ') ---');
notInHtml.forEach(u => console.log(' URL: ' + u));
