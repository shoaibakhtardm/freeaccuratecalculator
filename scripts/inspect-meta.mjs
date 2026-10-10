import fs from 'node:fs';

const html = fs.readFileSync('dist/client/pregnancy-due-date-calculator/index.html', 'utf8');
const match = html.match(/<meta[^>]*name=["']description["'][^>]*>/i);
console.log('Match:', match ? match[0] : 'None');
