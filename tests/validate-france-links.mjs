// tests/validate-france-links.mjs
import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist/client');

if (!fs.existsSync(distDir)) {
  console.error('dist/client does not exist. Run npm run build first.');
  process.exit(1);
}

// 1. Collect all generated files in dist/client
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allDistFiles = getAllFiles(distDir);
const allFileRelPaths = new Set(
  allDistFiles.map(f => path.relative(distDir, f).replace(/\\/g, '/'))
);

const franceHtmlFiles = allDistFiles.filter(f => 
  f.replace(/\\/g, '/').includes('/countries/france/') && f.endsWith('.html')
);

console.log(`Found ${franceHtmlFiles.length} France HTML files to forensically validate.`);

let brokenLinks = 0;
let crossLocaleLeaks = 0;
let checkedLinksCount = 0;

for (const filePath of franceHtmlFiles) {
  const relPath = path.relative(distDir, filePath).replace(/\\/g, '/');
  const html = fs.readFileSync(filePath, 'utf8');

  // Extract all internal links
  const hrefRegex = /href=["'](\/[^"'#?]*)/g;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    const link = match[1];
    checkedLinksCount++;

    // Skip assets and special files
    if (link.startsWith('/_astro/') || link.endsWith('.svg') || link.endsWith('.png') || link.endsWith('.jpg') || link.endsWith('.xml') || link.endsWith('.txt')) {
      continue;
    }

    const clean = link.replace(/^\//, '').replace(/\/$/, '');
    const candidate1 = clean === '' ? 'index.html' : `${clean}/index.html`;
    const candidate2 = clean;

    if (!allFileRelPaths.has(candidate1) && !allFileRelPaths.has(candidate2)) {
      console.error(`❌ Broken link in ${relPath}: ${link}`);
      brokenLinks++;
    }

    // Check for accidental cross-locale leaks in France section
    if (relPath.includes('/countries/france/fr/')) {
      if (link.startsWith('/countries/france/en/')) {
        // Only allow if it's the language switch link
        const isLangSwitch = html.includes(`facSetActiveLanguage('en'`) || html.includes(`href="${link}" data-lang="en"`) || html.includes(`hreflang="en" href="https://freeaccuratecalculator.com${link}"`) || html.includes(`hreflang="en" href="https://freeaccuratecalculator.com${link}/"`);
        if (!isLangSwitch) {
          console.error(`⚠️ Cross-locale leak in FR page ${relPath}: links to EN ${link}`);
          crossLocaleLeaks++;
        }
      }
    } else if (relPath.includes('/countries/france/en/')) {
      if (link.startsWith('/countries/france/fr/')) {
        const isLangSwitch = html.includes(`facSetActiveLanguage('fr'`) || html.includes(`href="${link}" data-lang="fr"`) || html.includes(`hreflang="fr" href="https://freeaccuratecalculator.com${link}"`) || html.includes(`hreflang="fr" href="https://freeaccuratecalculator.com${link}/"`);
        if (!isLangSwitch) {
          console.error(`⚠️ Cross-locale leak in EN page ${relPath}: links to FR ${link}`);
          crossLocaleLeaks++;
        }
      }
    }
  }
}

console.log(`\nValidation complete:`);
console.log(`- Files scanned: ${franceHtmlFiles.length}`);
console.log(`- Links verified: ${checkedLinksCount}`);
console.log(`- Broken links: ${brokenLinks}`);
console.log(`- Cross-locale leaks: ${crossLocaleLeaks}`);

if (brokenLinks > 0 || crossLocaleLeaks > 0) {
  console.error(`❌ Validation FAILED with ${brokenLinks} broken links and ${crossLocaleLeaks} cross-locale leaks.`);
  process.exit(1);
} else {
  console.log(`🎉 100% FORENSIC INTEGRITY: 0 broken links, 0 cross-locale leaks!`);
}
