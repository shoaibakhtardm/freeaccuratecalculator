// tests/france-audit-full.mjs

const BASE = 'http://localhost:4321';

const FRANCE_GUIDE_SLUGS = [
  'bareme-impot-revenu-2026',
  'frais-reels-vs-abattement-10',
  'bareme-kilometrique-dgfip-2026',
  'calcul-tva-france-taux-formules',
  'pret-immobilier-normes-hcsf-2026',
  'simulateur-apl-baremes-caf-2026',
  'interets-composes-epargne-france',
  'reforme-retraite-france-64-ans',
  'assurance-emprunteur-loi-lemoine',
  'conversion-salaire-brut-en-net-france',
  'indemnite-legale-licenciement-code-travail',
  'taxe-amenagement-baremes-2026',
];

function decodeHtml(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripTagsAndScripts(html) {
  return decodeHtml(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
  );
}

const errors = [];
const verified = [];

async function auditPage({ url, expectedLang, pageType, checkH1, forbiddenPhrases = [], requiredPhrases = [] }) {
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      errors.push({ url, issue: `Expected status 200, got ${res.status}` });
      return;
    }

    const html = await res.text();
    const visibleText = stripTagsAndScripts(html);

    // 1. html lang check
    const langMatch = html.match(/<html[^>]*lang=["']([^"']+)["']/);
    const htmlLang = langMatch ? langMatch[1] : '';
    if (expectedLang === 'en' && htmlLang !== 'en') {
      errors.push({ url, issue: `Expected html lang="en", got "${htmlLang}"` });
    } else if (expectedLang === 'fr' && !htmlLang.startsWith('fr')) {
      errors.push({ url, issue: `Expected html lang starting with "fr", got "${htmlLang}"` });
    }

    // 2. Canonical check
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/);
    const canonical = canonicalMatch ? canonicalMatch[1] : '';
    const expectedCanonical = url.replace('http://localhost:4321', 'https://freeaccuratecalculator.com');
    if (canonical !== expectedCanonical) {
      errors.push({ url, issue: `Canonical mismatch: expected ${expectedCanonical}, got ${canonical}` });
    }

    // 3. H1 check
    if (checkH1) {
      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
      const h1 = h1Match ? decodeHtml(h1Match[1].replace(/<[^>]+>/g, '').trim()) : '';
      if (!h1) {
        errors.push({ url, issue: `Missing H1` });
      }
    }

    // 4. Required phrases
    for (const p of requiredPhrases) {
      if (!visibleText.includes(p)) {
        errors.push({ url, issue: `Missing expected phrase: "${p}"` });
      }
    }

    // 5. Forbidden phrases
    for (const p of forbiddenPhrases) {
      if (visibleText.includes(p)) {
        errors.push({ url, issue: `Found forbidden phrase: "${p}"` });
      }
    }

    verified.push({ url, pageType, expectedLang, status: 200 });
  } catch (err) {
    errors.push({ url, issue: `Fetch failed: ${err.message}` });
  }
}

async function runAudit() {
  console.log('🚀 Starting Full France Route Forensic Audit...');

  // 1. France Root Pages
  await auditPage({
    url: `${BASE}/countries/france/en/`,
    expectedLang: 'en',
    pageType: 'hub',
    checkH1: true,
    requiredPhrases: ['Free & Accurate Precision Calculators for France', 'Flagship Calculators for France'],
    forbiddenPhrases: ['Calculatrices & Simulateurs Gratuits pour la France', 'Simulateurs Phares pour la France'],
  });

  await auditPage({
    url: `${BASE}/countries/france/fr/`,
    expectedLang: 'fr',
    pageType: 'hub',
    checkH1: true,
    requiredPhrases: ['Calculatrices & Simulateurs Gratuits pour la France', 'Simulateurs Phares pour la France'],
    forbiddenPhrases: ['Free & Accurate Precision Calculators for France', 'Flagship Calculators for France'],
  });

  // 2. France Guides Hub
  await auditPage({
    url: `${BASE}/countries/france/en/guides/`,
    expectedLang: 'en',
    pageType: 'guides-hub',
    checkH1: true,
    requiredPhrases: ['Practical France Guides 2026', 'French Income Tax 2026', 'Read guide'],
    forbiddenPhrases: ['Guides Pratiques France 2026', 'Lire le guide'],
  });

  await auditPage({
    url: `${BASE}/countries/france/fr/guides/`,
    expectedLang: 'fr',
    pageType: 'guides-hub',
    checkH1: true,
    requiredPhrases: ['Guides Pratiques France 2026', 'Impôt sur le Revenu 2026', 'Lire le guide'],
    forbiddenPhrases: ['Practical France Guides 2026', 'Read guide'],
  });

  // 3. All 12 Guide Articles (EN & FR)
  for (const slug of FRANCE_GUIDE_SLUGS) {
    await auditPage({
      url: `${BASE}/countries/france/en/guides/${slug}/`,
      expectedLang: 'en',
      pageType: 'guide-article-en',
      checkH1: true,
      requiredPhrases: ['Frequently Asked Questions', 'Calculate your exact results instantly'],
      forbiddenPhrases: ['Questions Fréquentes', 'Passez de la théorie au calcul'],
    });

    await auditPage({
      url: `${BASE}/countries/france/fr/guides/${slug}/`,
      expectedLang: 'fr',
      pageType: 'guide-article-fr',
      checkH1: true,
      requiredPhrases: ['Questions Fréquentes', 'Passez de la théorie au calcul'],
      forbiddenPhrases: ['Frequently Asked Questions', 'Calculate your exact results instantly'],
    });
  }

  // 4. Representative Category Hubs
  const testCats = ['finance', 'health', 'math', 'everyday'];
  for (const cat of testCats) {
    await auditPage({
      url: `${BASE}/countries/france/en/${cat}/`,
      expectedLang: 'en',
      pageType: 'category-en',
      checkH1: true,
      requiredPhrases: ['France', 'Calculators'],
    });

    await auditPage({
      url: `${BASE}/countries/france/fr/${cat}/`,
      expectedLang: 'fr',
      pageType: 'category-fr',
      checkH1: true,
      requiredPhrases: ['France', 'Calculatrices'],
    });
  }

  // 5. Representative Calculators (EN & FR)
  const testCalcs = [
    { cat: 'finance', slug: 'sip-calculator' },
    { cat: 'finance', slug: 'mortgage-calculator' },
    { cat: 'finance', slug: 'compound-interest-calculator' },
    { cat: 'health', slug: 'body-fat-calculator' },
  ];

  for (const c of testCalcs) {
    await auditPage({
      url: `${BASE}/countries/france/en/${c.cat}/${c.slug}/`,
      expectedLang: 'en',
      pageType: 'calc-en',
      checkH1: true,
      requiredPhrases: ['Related Calculators'],
      forbiddenPhrases: ['Calculatrices Similaires'],
    });

    await auditPage({
      url: `${BASE}/countries/france/fr/${c.cat}/${c.slug}/`,
      expectedLang: 'fr',
      pageType: 'calc-fr',
      checkH1: true,
      requiredPhrases: ['Calculatrices Similaires'],
      forbiddenPhrases: ['Related Calculators'],
    });
  }

  // 6. Specialized French-only Calculators
  const specialized = [
    'simulateur-apl',
    'capacite-emprunt-hcsf',
    'frais-de-notaire',
    'simulateur-salaire-brut-net',
  ];

  for (const slug of specialized) {
    await auditPage({
      url: `${BASE}/countries/france/${slug}/`,
      expectedLang: 'fr',
      pageType: 'specialized-fr',
      checkH1: true,
    });
  }

  // 7. Notaire City Pages
  const cities = ['paris', 'marseille', 'lyon'];
  for (const city of cities) {
    await auditPage({
      url: `${BASE}/countries/france/frais-notaire/${city}/`,
      expectedLang: 'fr',
      pageType: 'notaire-city-fr',
      checkH1: true,
    });
  }

  console.log('\n========================================');
  console.log(`Audited Routes Total: ${verified.length + errors.length}`);
  console.log(`Passed Routes: ${verified.length}`);
  console.log(`Failed Routes: ${errors.length}`);

  if (errors.length > 0) {
    console.log('\n❌ Audit Failures:');
    errors.forEach((e, i) => console.log(`${i + 1}. [${e.url}] ${e.issue}`));
    process.exit(1);
  } else {
    console.log('\n✅ ALL AUDITED ROUTES PASSED WITH ZERO CROSS-LANGUAGE CONTAMINATION!');
  }
}

runAudit().catch(err => {
  console.error(err);
  process.exit(1);
});
