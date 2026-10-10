import fs from 'node:fs';
import path from 'node:path';

const POPULAR_33 = [
  { slug: 'percentage-calculator', name: 'Percentage Calculator', category: 'math', href: '/percentage-calculator/' },
  { slug: 'bmi-calculator', name: 'BMI Calculator', category: 'health', href: '/bmi-calculator/' },
  { slug: 'age-calculator', name: 'Age Calculator', category: 'everyday', href: '/age-calculator/' },
  { slug: 'love-calculator', name: 'Love Calculator', category: 'love', href: '/love-calculator/' },
  { slug: 'scientific-calculator', name: 'Scientific Calculator', category: 'math', href: '/scientific-calculator/' },
  { slug: 'emi-calculator', name: 'EMI Calculator', category: 'finance', href: '/emi-calculator/' },
  { slug: 'mortgage-calculator', name: 'Mortgage Calculator', category: 'finance', href: '/mortgage-calculator/' },
  { slug: 'loan-calculator', name: 'Loan Calculator', category: 'finance', href: '/loan-calculator/' },
  { slug: 'time-calculator', name: 'Time Calculator', category: 'everyday', href: '/time-calculator/' },
  { slug: 'date-calculator', name: 'Date Calculator', category: 'everyday', href: '/date-calculator/' },
  { slug: 'salary-calculator', name: 'Salary Calculator', category: 'finance', href: '/salary-calculator/' },
  { slug: 'compound-interest-calculator', name: 'Compound Interest', category: 'finance', href: '/compound-interest-calculator/' },
  { slug: 'conversion-calculator', name: 'Unit Converter', category: 'converter', href: '/conversion-calculator/' },
  { slug: 'body-fat-calculator', name: 'Body Fat Calculator', category: 'health', href: '/body-fat-calculator/' },
  { slug: 'bmr-calculator', name: 'BMR Calculator', category: 'health', href: '/bmr-calculator/' },
  { slug: 'sip-calculator', name: 'SIP Calculator', category: 'finance', href: '/sip-calculator/' },
  { slug: 'auto-loan-calculator', name: 'Auto Loan', category: 'finance', href: '/auto-loan-calculator/' },
  { slug: 'gpa-calculator', name: 'GPA Calculator', category: 'everyday', href: '/gpa-calculator/' },
  { slug: 'roi-calculator', name: 'ROI Calculator', category: 'business', href: '/roi-calculator/' },
  { slug: 'tip-calculator', name: 'Tip Calculator', category: 'everyday', href: '/tip-calculator/' },
  { slug: 'income-tax-calculator', name: 'Income Tax Calculator', category: 'finance', href: '/income-tax-calculator/' },
  { slug: 'probability-calculator', name: 'Probability Calculator', category: 'statistics', href: '/probability-calculator/' },
  { slug: 'password-generator', name: 'Password Generator', category: 'technology', href: '/password-generator/' },
  { slug: 'discount-calculator', name: 'Discount Calculator', category: 'everyday', href: '/discount-calculator/' },
  { slug: 'ovulation-calculator', name: 'Ovulation Calculator', category: 'health', href: '/ovulation-calculator/' },
  { slug: 'ohms-law-calculator', name: 'Ohm’s Law Calculator', category: 'physics', href: '/ohms-law-calculator/' },
  { slug: 'pregnancy-due-date-calculator', name: 'Pregnancy Due Date', category: 'health', href: '/pregnancy-due-date-calculator/' },
  { slug: 'concrete-calculator', name: 'Concrete Volume', category: 'construction', href: '/concrete-calculator/' },
  { slug: 'paint-calculator', name: 'Paint Calculator', category: 'construction', href: '/paint-calculator/' },
  { slug: 'amortization-calculator', name: 'Amortization Calculator', category: 'finance', href: '/amortization-calculator/' },
  { slug: 'inflation-calculator', name: 'Inflation Calculator', category: 'finance', href: '/inflation-calculator/' },
  { slug: 'square-footage-calculator', name: 'Square Footage', category: 'construction', href: '/square-footage-calculator/' },
  { slug: 'ruler', name: 'Online Ruler', category: 'everyday', href: '/ruler/' },
];

const distClient = path.resolve('dist/client');
const results = [];

for (const calc of POPULAR_33) {
  const htmlPath = path.join(distClient, calc.slug, 'index.html');
  if (!fs.existsSync(htmlPath)) {
    results.push({ slug: calc.slug, name: calc.name, error: 'HTML file missing' });
    continue;
  }
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // Meta description
  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content="([^"]*)"/i) || html.match(/<meta[^>]*name=["']description["'][^>]*content='([^']*)'/i);
  const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : '';

  // Canonical
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

  // H1
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

  // H2, H3
  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const h3Matches = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

  // Schemas
  const jsonLdMatches = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const schemaTypes = [];
  for (const m of jsonLdMatches) {
    try {
      const parsed = JSON.parse(m[1]);
      if (parsed['@type']) schemaTypes.push(parsed['@type']);
      if (parsed['@graph']) {
        for (const item of parsed['@graph']) {
          if (item['@type']) schemaTypes.push(item['@type']);
        }
      }
    } catch (e) {
      schemaTypes.push('INVALID_JSON');
    }
  }

  // FAQs
  const faqQuestions = [...html.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

  // Internal Links
  const linkMatches = [...html.matchAll(/href=["'](\/[^"'#?]*)["']/gi)].map(m => m[1]);
  const uniqueInternalLinks = [...new Set(linkMatches)];

  // Plain text word count estimate
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyText = bodyMatch ? bodyMatch[1].replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
  const wordCount = bodyText.split(' ').filter(Boolean).length;

  results.push({
    slug: calc.slug,
    name: calc.name,
    category: calc.category,
    href: calc.href,
    title,
    titleLength: title.length,
    metaDescription,
    metaDescLength: metaDescription.length,
    canonical,
    canonicalMatches: canonical === `https://freeaccuratecalculator.com${calc.href}`,
    h1Count: h1Matches.length,
    h1: h1Matches[0] || '',
    h2Count: h2Matches.length,
    h3Count: h3Matches.length,
    schemaTypes: [...new Set(schemaTypes)],
    faqCount: faqQuestions.length,
    internalLinkCount: uniqueInternalLinks.length,
    wordCount,
    htmlSizeBytes: Buffer.byteLength(html, 'utf8'),
  });
}

fs.writeFileSync('audit-popular-33-output.json', JSON.stringify(results, null, 2), 'utf8');
console.log(`Successfully audited ${results.length} calculators and saved to audit-popular-33-output.json`);
