// scripts/audit-discovery.mjs
import fs from 'node:fs';
import path from 'node:path';

const allRoutes = JSON.parse(fs.readFileSync('all-canonical-routes.json', 'utf8'));

const detailedRoutes = [];

for (const route of allRoutes) {
  const filePath = route === '/' 
    ? path.join('dist/client', 'index.html')
    : path.join('dist/client', route.slice(1, -1), 'index.html');

  if (!fs.existsSync(filePath)) {
    console.error('Missing file:', route, filePath);
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');

  // Title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // H1
  const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].trim() : '';

  // Meta description
  const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const metaDesc = metaDescMatch ? metaDescMatch[1].trim() : '';

  // Canonical
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

  // Interactive elements
  const inputCount = (html.match(/<input\b/gi) || []).length;
  const selectCount = (html.match(/<select\b/gi) || []).length;
  const buttonCount = (html.match(/<button\b/gi) || []).length;
  const formCount = (html.match(/<form\b/gi) || []).length;
  const canvasCount = (html.match(/<canvas\b/gi) || []).length;

  // Classify page type
  let pageType = 'unknown';
  let category = 'none';

  if (route === '/') {
    pageType = 'homepage';
    category = 'home';
  } else if (['/about/', '/contact/', '/privacy-policy/', '/terms-of-use/'].includes(route)) {
    pageType = 'legal_or_utility';
    category = 'utility';
  } else if (route === '/ruler/guides/' || route.startsWith('/love/blog/')) {
    pageType = 'guide_or_article';
    category = 'guide';
  } else if (/^\/(ar|de|es|fr|hi|it|ja|nl|pt|ru|zh)\/$/.test(route)) {
    pageType = 'i18n_homepage';
    category = 'i18n';
  } else if (/^\/(automotive|biology|business|chemistry|construction|converter|ecology|everyday|finance|food|health|insurance|legal|love|marketing|math|physics|real-estate|sports|statistics|technology)\/$/.test(route)) {
    pageType = 'category_hub';
    category = route.slice(1, -1);
  } else if (/^\/(es|fr|hi)\//.test(route)) {
    pageType = 'calculator';
    category = 'multilingual';
  } else if (route.startsWith('/business/freelance/')) {
    pageType = 'calculator';
    category = 'business/freelance';
  } else if (route.startsWith('/finance/salary/') || route.startsWith('/finance/sip/')) {
    pageType = 'calculator';
    category = 'finance/programmatic';
  } else if (route === '/ruler/') {
    pageType = 'calculator';
    category = 'tools/ruler';
  } else {
    // Standard calculator or love calculator
    pageType = 'calculator';
    if (html.includes('romantic-bg') || html.includes('love-input-1') || route.includes('love') || route.includes('crush') || route.includes('flames') || route.includes('zodiac') || route.includes('kundli') || route.includes('relationship') || route.includes('wedding') || route.includes('couple') || route.includes('twin-flame') || route.includes('soulmate') || route.includes('marriage') || route.includes('breakup') || route.includes('tarot') || route.includes('birth-date')) {
      category = 'love';
    } else {
      category = 'core_calculator';
    }
  }

  detailedRoutes.push({
    route,
    pageType,
    category,
    title,
    h1,
    metaDesc,
    canonical,
    inputCount,
    selectCount,
    buttonCount,
    formCount,
    canvasCount
  });
}

const breakdown = {};
for (const r of detailedRoutes) {
  breakdown[r.pageType] = (breakdown[r.pageType] || 0) + 1;
}

console.log('--- Page Type Breakdown ---');
console.table(breakdown);

const calcBreakdown = {};
for (const r of detailedRoutes.filter(d => d.pageType === 'calculator')) {
  calcBreakdown[r.category] = (calcBreakdown[r.category] || 0) + 1;
}
console.log('--- Calculator Category Breakdown ---');
console.table(calcBreakdown);

fs.writeFileSync('all-routes-detailed.json', JSON.stringify(detailedRoutes, null, 2));
