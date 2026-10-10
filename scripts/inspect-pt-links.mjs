import fs from 'node:fs';

const html = fs.readFileSync('dist/client/pt/index.html', 'utf8');
const links = [...html.matchAll(/href=["'](\/[^"'#?]*)["']/gi)].map(m => m[1]);
const unique = Array.from(new Set(links));
console.log(`Total unique internal links on /pt/: ${unique.length}`);
console.log('Sample links on /pt/:');
console.log(unique.slice(0, 30));
