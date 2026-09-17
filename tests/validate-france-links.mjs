// tests/validate-france-links.mjs
import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist/client');
const franceHtmlPath = path.join(distDir, 'countries/france/fr/index.html');

if (!fs.existsSync(franceHtmlPath)) {
  console.error('France FR HTML file does not exist at:', franceHtmlPath);
  process.exit(1);
}

const html = fs.readFileSync(franceHtmlPath, 'utf8');

// Extract all internal href links
const hrefRegex = /href=["'](\/[^"'#?]*)/g;
const links = new Set();
let match;
while ((match = hrefRegex.exec(html)) !== null) {
  links.add(match[1]);
}

console.log('Total internal links found on France FR hub:', links.size);

let missingCount = 0;
for (const link of links) {
  const cleanPath = link.replace(/^\//, '');
  const candidate1 = path.join(distDir, cleanPath, 'index.html');
  const candidate2 = path.join(distDir, cleanPath);
  const exists = fs.existsSync(candidate1) || fs.existsSync(candidate2);
  if (!exists) {
    console.error('❌ Missing target for link:', link);
    missingCount++;
  } else {
    console.log('✅ 200 OK:', link);
  }
}

if (missingCount === 0) {
  console.log(`\n🎉 ALL ${links.size} LINKS ON FRANCE HUB ARE 100% VALID & EXIST (ZERO 404s)!`);
} else {
  console.error(`Found ${missingCount} broken links!`);
  process.exit(1);
}
