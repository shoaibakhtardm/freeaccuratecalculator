// tests/verify-france-content.mjs

function decodeHtml(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

async function checkUrl(url, expected) {
  const res = await fetch(url);
  const status = res.status;
  const rawHtml = await res.text();
  const html = decodeHtml(rawHtml);

  const titleMatch = rawHtml.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch ? decodeHtml(titleMatch[1].trim()) : '';

  const h1Match = rawHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const h1 = h1Match ? decodeHtml(h1Match[1].replace(/<[^>]+>/g, '').trim()) : '';

  const langMatch = rawHtml.match(/<html[^>]*lang=["']([^"']+)["']/);
  const htmlLang = langMatch ? langMatch[1] : '';

  const canonicalMatch = rawHtml.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/);
  const canonical = canonicalMatch ? canonicalMatch[1] : '';

  const hreflangs = [...rawHtml.matchAll(/<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["']/g)]
    .map(m => ({ lang: m[1], href: m[2] }));

  console.log(`\n========================================`);
  console.log(`URL: ${url}`);
  console.log(`Status: ${status} (expected: 200)`);
  console.log(`HTML lang: ${htmlLang} (expected: ${expected.lang})`);
  console.log(`Title: ${title}`);
  console.log(`H1: ${h1}`);
  console.log(`Canonical: ${canonical}`);
  console.log(`Hreflangs:`, hreflangs);

  let passed = true;

  if (expected.contentMustInclude) {
    for (const phrase of expected.contentMustInclude) {
      const found = html.includes(phrase);
      console.log(`Includes "${phrase}": ${found ? 'PASS' : 'FAIL'}`);
      if (!found) passed = false;
    }
  }

  if (expected.contentMustNotInclude) {
    for (const phrase of expected.contentMustNotInclude) {
      const found = html.includes(phrase);
      console.log(`Must NOT include "${phrase}": ${!found ? 'PASS' : 'FAIL (found)'}`);
      if (found) passed = false;
    }
  }

  return passed;
}

async function run() {
  let allPassed = true;

  // 1. France Root
  const r1 = await checkUrl('http://localhost:4321/countries/france/en/', {
    lang: 'en',
    contentMustInclude: ['Free & Accurate Precision Calculators for France', 'Official France 2026 Ecosystem', 'Guides'],
    contentMustNotInclude: ['Calculatrices & Simulateurs Gratuits pour la France', 'Guides Pratiques France']
  });
  if (!r1) allPassed = false;

  const r2 = await checkUrl('http://localhost:4321/countries/france/fr/', {
    lang: 'fr',
    contentMustInclude: ['Calculatrices & Simulateurs Gratuits pour la France', 'Écosystème Officiel France 2026', 'Guides Pratiques France'],
    contentMustNotInclude: ['Free & Accurate Precision Calculators for France']
  });
  if (!r2) allPassed = false;

  // 2. Guides Hub
  const r3 = await checkUrl('http://localhost:4321/countries/france/en/guides/', {
    lang: 'en',
    contentMustInclude: ['Practical France Guides 2026', 'French Income Tax 2026', 'Read guide', 'Guides'],
    contentMustNotInclude: ['Guides Pratiques France 2026', 'Guides Pratiques France', 'Lire le guide']
  });
  if (!r3) allPassed = false;

  const r4 = await checkUrl('http://localhost:4321/countries/france/fr/guides/', {
    lang: 'fr',
    contentMustInclude: ['Guides Pratiques France 2026', 'Guides Pratiques France', 'Impôt sur le Revenu 2026', 'Lire le guide'],
    contentMustNotInclude: ['Practical France Guides 2026', 'Read guide']
  });
  if (!r4) allPassed = false;

  // 3. Guide Article: bareme-impot-revenu-2026
  const r5 = await checkUrl('http://localhost:4321/countries/france/en/guides/bareme-impot-revenu-2026/', {
    lang: 'en',
    contentMustInclude: [
      'French Income Tax 2026',
      'Understanding French Income Tax & Progressive Brackets for 2026',
      'The Family Quotient Mechanism',
      'French Income Tax Calculator',
      'What are the 2026 French income tax brackets?',
      'Guides'
    ],
    contentMustNotInclude: [
      'Comprendre l\'Impôt sur le Revenu & les Tranches 2026',
      'Simulateur d\'Impôt sur le Revenu',
      'Questions Fréquentes',
      'Guides Pratiques France'
    ]
  });
  if (!r5) allPassed = false;

  const r6 = await checkUrl('http://localhost:4321/countries/france/fr/guides/bareme-impot-revenu-2026/', {
    lang: 'fr',
    contentMustInclude: [
      'Impôt sur le Revenu 2026',
      'Comprendre l\'Impôt sur le Revenu',
      'Quotient Familial',
      'Simulateur d\'Impôt sur le Revenu',
      'Questions Fréquentes'
    ],
    contentMustNotInclude: [
      'Understanding French Income Tax & Progressive Brackets for 2026',
      'The Family Quotient Mechanism'
    ]
  });
  if (!r6) allPassed = false;

  // 4. Calculator: sip-calculator
  const r7 = await checkUrl('http://localhost:4321/countries/france/en/finance/sip-calculator/', {
    lang: 'en',
    contentMustInclude: ['France', 'Related Calculators'],
    contentMustNotInclude: ['Calculatrices Similaires']
  });
  if (!r7) allPassed = false;

  const r8 = await checkUrl('http://localhost:4321/countries/france/fr/finance/sip-calculator/', {
    lang: 'fr-FR',
    contentMustInclude: ['France', 'Calculatrices Similaires'],
    contentMustNotInclude: ['Related Calculators']
  });
  if (!r8) allPassed = false;

  console.log(`\nOverall Test Matrix Result: ${allPassed ? 'ALL TESTS PASSED ✅' : 'FAILURES DETECTED ❌'}`);
  if (!allPassed) process.exit(1);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
