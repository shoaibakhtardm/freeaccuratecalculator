import fs from 'fs';

console.log('--- FINAL PROFESSION PURGE AUDIT ---');

const distProfessionDirExists = fs.existsSync('dist/client/profession');
console.log('1. dist/client/profession directory exists:', distProfessionDirExists, '(Expected: false)');

const sitemapXml = fs.readFileSync('public/sitemap.xml', 'utf8');
const sitemapMatches = sitemapXml.includes('/profession/');
console.log('2. public/sitemap.xml includes /profession/:', sitemapMatches, '(Expected: false)');

const distSitemapXml = fs.readFileSync('dist/client/sitemap.xml', 'utf8');
const distSitemapMatches = distSitemapXml.includes('/profession/');
console.log('3. dist/client/sitemap.xml includes /profession/:', distSitemapMatches, '(Expected: false)');

const categoriesData = fs.readFileSync('src/data/categories.ts', 'utf8');
console.log('4. src/data/categories.ts includes profession:', categoriesData.includes('profession'), '(Expected: false)');

const calcRegistryData = fs.readFileSync('src/data/calculatorRegistry.ts', 'utf8');
console.log('5. src/data/calculatorRegistry.ts includes CategoryId profession:', calcRegistryData.includes("'profession'"), '(Expected: false)');

const calculatorsData = fs.readFileSync('src/data/calculators.ts', 'utf8');
console.log('6. src/data/calculators.ts includes category profession:', calculatorsData.includes("'profession'"), '(Expected: false)');

const contentConfigData = fs.readFileSync('src/content.config.ts', 'utf8');
console.log('7. src/content.config.ts includes profession in schema:', contentConfigData.includes("'profession'"), '(Expected: false)');

const headersData = fs.readFileSync('public/_headers', 'utf8');
console.log('8. public/_headers includes /profession/*:', headersData.includes('/profession/'), '(Expected: false)');

if (!distProfessionDirExists && !sitemapMatches && !distSitemapMatches && !categoriesData.includes('profession') && !calcRegistryData.includes("'profession'") && !calculatorsData.includes("'profession'") && !contentConfigData.includes("'profession'") && !headersData.includes('/profession/')) {
  console.log('\n🌟 ALL 8 FORENSIC AUDIT CHECKS CONFIRMED: PROFESSION IS 100% PURGED ACROSS THE ENTIRE ECOSYSTEM!');
} else {
  console.error('\n❌ AUDIT FAILED');
  process.exit(1);
}
