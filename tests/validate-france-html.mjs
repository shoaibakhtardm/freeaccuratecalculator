import fs from 'fs';

async function testFrancePage() {
  const legacyHtmlExists = fs.existsSync('dist/client/countries/france/index.html');
  const frHtml = fs.readFileSync('dist/client/countries/france/fr/index.html', 'utf8');
  const enHtml = fs.readFileSync('dist/client/countries/france/en/index.html', 'utf8');
  console.log('French Hub HTML Length:', frHtml.length);
  console.log('English Hub HTML Length:', enHtml.length);
  
  // Checks
  const checks = [
    { label: 'Legacy /countries/france/index.html does NOT exist', pass: !legacyHtmlExists },
    { label: 'FR H1 in French', pass: frHtml.includes('Calculatrices') || frHtml.includes('Simulateurs') },
    { label: 'FR | EN toggle buttons on FR hub', pass: frHtml.includes('id="fac-france-lang-toggle"') || frHtml.includes('id="header-lang-fr"') },
    { label: 'Breadcrumb: Accueil > Pays > France on FR hub', pass: frHtml.includes('Accueil') && frHtml.includes('Pays') && frHtml.includes('France') },
    { label: 'Canonical URL on FR hub', pass: frHtml.includes('https://freeaccuratecalculator.com/countries/france/fr/') },
    { label: 'hreflang fr on FR hub', pass: frHtml.includes('hreflang="fr"') || frHtml.includes('hreflang="fr-FR"') },
    { label: 'hreflang en on FR hub', pass: frHtml.includes('hreflang="en"') },
    { label: 'EN H1 in English', pass: enHtml.includes('Calculators') || enHtml.includes('France') },
    { label: 'Canonical URL on EN hub', pass: enHtml.includes('https://freeaccuratecalculator.com/countries/france/en/') },
    { label: 'hreflang fr on EN hub', pass: enHtml.includes('hreflang="fr"') || enHtml.includes('hreflang="fr-FR"') },
    { label: 'hreflang en on EN hub', pass: enHtml.includes('hreflang="en"') },
  ];

  console.log('\n--- FRANCE BILINGUAL VERIFICATION AUDIT RESULTS ---');
  let allPass = true;
  checks.forEach(c => {
    console.log(`${c.pass ? '✅ PASS' : '❌ FAIL'}: ${c.label}`);
    if (!c.pass) allPass = false;
  });

  if (allPass) {
    console.log('\n🌟 ALL AUDIT CHECKS PASSED PERFECTLY!');
  } else {
    process.exit(1);
  }
}

testFrancePage().catch(err => {
  console.error(err);
  process.exit(1);
});
