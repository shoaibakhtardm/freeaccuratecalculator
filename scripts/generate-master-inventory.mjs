// scripts/generate-master-inventory.mjs
import fs from 'node:fs';
import path from 'node:path';
import { ALL_FRONTEND_CALCULATORS } from '../src/data/calculators.ts';
import { CALCULATORS } from '../src/data/calculatorRegistry.ts';
import { LOVE_CALCULATORS } from '../src/data/loveCalculators.ts';

const detailedRoutes = JSON.parse(fs.readFileSync('all-routes-detailed.json', 'utf8'));
const calcRoutes = detailedRoutes.filter(r => r.pageType === 'calculator');

const registryMap = new Map();
for (const c of CALCULATORS) {
  registryMap.set(c.id, c);
}

const frontendMap = new Map();
for (const c of ALL_FRONTEND_CALCULATORS) {
  frontendMap.set(c.slug, c);
}

const loveMap = new Map();
for (const c of LOVE_CALCULATORS) {
  loveMap.set(c.slug, c);
}

const loveAliases = {
  'love-calculator': 'love-calculator-by-name',
  'kundli-matching': 'marriage-compatibility-calculator',
  'zodiac-compatibility': 'zodiac-love-compatibility-calculator',
  'love-compatibility-calculator': 'zodiac-love-compatibility-calculator',
  'ai-love-predictor': 'ai-love-calculator',
  'true-love-calculator': 'true-love-calculator-by-names',
  'crush-love-test': 'crush-love-test-calculator',
  'birth-date-compatibility': 'birth-date-love-compatibility',
  'relationship-counter': 'relationship-compatibility-test',
};

const enrichedInventory = calcRoutes.map((cr, idx) => {
  const slug = cr.route.replace(/^\/|\/$/g, '');
  const parts = slug.split('/');
  let baseSlug = parts[parts.length - 1];

  let name = cr.h1 || cr.title.split('—')[0].split('|')[0].trim();
  let category = 'General';

  if (cr.route.startsWith('/es/') || cr.route.startsWith('/fr/') || cr.route.startsWith('/hi/')) {
    category = 'Multilingual (' + parts[0].toUpperCase() + ')';
  } else if (cr.route.startsWith('/business/freelance/')) {
    category = 'Business (Freelance Rate)';
  } else if (cr.route === '/ruler/') {
    category = 'Interactive Tools';
    name = 'Online Screen Ruler';
  } else if (loveMap.has(baseSlug) || loveAliases[baseSlug]) {
    const parentSlug = loveAliases[baseSlug] || baseSlug;
    const l = loveMap.get(parentSlug);
    category = 'Love & Relationships';
    name = cr.h1 || l?.name || name;
  } else if (registryMap.has(baseSlug)) {
    const r = registryMap.get(baseSlug);
    category = r.category.charAt(0).toUpperCase() + r.category.slice(1);
    name = r.name || name;
  } else if (frontendMap.has(baseSlug)) {
    const f = frontendMap.get(baseSlug);
    category = f.category.charAt(0).toUpperCase() + f.category.slice(1);
    name = f.name || name;
  }

  return {
    index: idx + 1,
    name: name.replace(/&amp;/g, '&'),
    url: cr.route,
    category,
    status: 'Pending Audit'
  };
});

fs.writeFileSync('master-calculator-inventory.json', JSON.stringify(enrichedInventory, null, 2));

console.log(`Generated Master Inventory with ${enrichedInventory.length} Calculators.`);
const cats = {};
for (const c of enrichedInventory) {
  cats[c.category] = (cats[c.category] || 0) + 1;
}
console.table(cats);
