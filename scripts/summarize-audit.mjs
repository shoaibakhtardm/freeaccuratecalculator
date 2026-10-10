import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('audit-popular-33-output.json', 'utf8'));

console.log('=== 33 POPULAR CALCULATORS SUMMARY ===');
console.log('Total audited:', data.length);

const issues = {
  longTitles: [],
  shortTitles: [],
  longDesc: [],
  shortDesc: [],
  canonicalMismatch: [],
  missingH1: [],
  multipleH1: [],
  noFaq: [],
  lowWordCount: []
};

for (const c of data) {
  if (c.titleLength > 65) issues.longTitles.push({ slug: c.slug, len: c.titleLength, title: c.title });
  if (c.titleLength < 40) issues.shortTitles.push({ slug: c.slug, len: c.titleLength, title: c.title });
  if (c.metaDescLength > 165) issues.longDesc.push({ slug: c.slug, len: c.metaDescLength });
  if (c.metaDescLength < 120) issues.shortDesc.push({ slug: c.slug, len: c.metaDescLength });
  if (!c.canonicalMatches) issues.canonicalMismatch.push(c.slug);
  if (c.h1Count !== 1) issues.missingH1.push({ slug: c.slug, count: c.h1Count });
  if (c.faqCount === 0) issues.noFaq.push(c.slug);
  if (c.wordCount < 500) issues.lowWordCount.push({ slug: c.slug, words: c.wordCount });
}

let out = '';
const log = (msg = '') => { out += msg + '\n'; };

log('=== 33 POPULAR CALCULATORS SUMMARY ===');
log('Total audited: ' + data.length);
log('Long titles (>65 chars): ' + issues.longTitles.length);
log('Short titles (<40 chars): ' + issues.shortTitles.length);
log('Long meta desc (>165 chars): ' + issues.longDesc.length);
log('Short meta desc (<120 chars): ' + issues.shortDesc.length);
log('Canonical mismatches: ' + issues.canonicalMismatch.length);
log('H1 issues: ' + issues.missingH1.length);
log('No FAQ: ' + issues.noFaq.length);
log('Low word count (<500 words): ' + issues.lowWordCount.length);

log('\n--- Details of all 33 ---');
data.forEach((c, i) => {
  log(`${i+1}. [${c.category.toUpperCase()}] ${c.name} (${c.slug})`);
  log(`   URL: ${c.href}`);
  log(`   Title (${c.titleLength}ch): "${c.title}"`);
  log(`   Desc (${c.metaDescLength}ch): "${c.metaDescription}"`);
  log(`   H1: "${c.h1}" | H2s: ${c.h2Count} | H3s: ${c.h3Count} | FAQs: ${c.faqCount} | Words: ${c.wordCount}`);
  log(`   Schemas: ${JSON.stringify(c.schemaTypes)}`);
  log('');
});

fs.writeFileSync('audit-summary.txt', out, 'utf8');
console.log('Saved UTF8 audit-summary.txt');
