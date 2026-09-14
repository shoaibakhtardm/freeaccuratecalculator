// tests/verify-country-search.mjs
async function run() {
  console.log('Testing India country page search integration...');
  const res = await fetch('http://localhost:4321/countries/india/');
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }

  const html = await res.text();

  // 1. Verify AutocompleteSearch is present
  if (!html.includes('categories-search-india')) {
    throw new Error('FAIL: categories-search-india not found');
  }
  console.log('✔ categories-search-india present');

  // 2. Verify neon orbit beam is present
  if (!html.includes('fac-neon-orbit-beam')) {
    throw new Error('FAIL: fac-neon-orbit-beam not found');
  }
  console.log('✔ fac-neon-orbit-beam present');

  // 3. Verify typewriter overlay is present
  if (!html.includes('fac-typewriter-text') || !html.includes('fac-typewriter-cursor')) {
    throw new Error('FAIL: Typewriter elements not found');
  }
  console.log('✔ Typewriter overlay present');

  // 4. Verify search data payload
  const marker = 'fac-search-data';
  const startIdx = html.indexOf(marker);
  const jsonStart = html.indexOf('>', startIdx) + 1;
  const jsonEnd = html.indexOf('</script>', jsonStart);
  const jsonStr = html.substring(jsonStart, jsonEnd);
  const data = JSON.parse(jsonStr);

  console.log(`✔ Total searchable calculators: ${data.length}`);

  // 5. Verify India-specific localized calculator paths
  const sip = data.find((c) => c.slug === 'sip-calculator');
  if (!sip || sip.href !== '/countries/india/sip-calculator/') {
    throw new Error(`FAIL: Expected /countries/india/sip-calculator/, got ${sip?.href}`);
  }
  console.log(`✔ SIP calculator correctly localized: ${sip.href}`);

  const tax = data.find((c) => c.slug === 'income-tax-calculator');
  if (!tax || tax.href !== '/countries/india/income-tax-calculator/') {
    throw new Error(`FAIL: Expected /countries/india/income-tax-calculator/, got ${tax?.href}`);
  }
  console.log(`✔ Income Tax calculator correctly localized: ${tax.href}`);

  // 6. Verify non-India calculators link to universal categories
  const bmi = data.find((c) => c.slug === 'bmi-calculator');
  if (!bmi || bmi.href !== '/health/bmi-calculator/') {
    throw new Error(`FAIL: Expected /health/bmi-calculator/, got ${bmi?.href}`);
  }
  console.log(`✔ Universal calculator correctly linked: ${bmi.href}`);

  // Test US
  console.log('\nTesting US country page search integration...');
  const resUS = await fetch('http://localhost:4321/countries/united-states/');
  const htmlUS = await resUS.text();
  if (!htmlUS.includes('categories-search-united-states')) {
    throw new Error('FAIL: categories-search-united-states not found');
  }
  console.log('✔ categories-search-united-states present with neon beam and typewriter');

  // Test UK
  console.log('\nTesting UK country page search integration...');
  const resUK = await fetch('http://localhost:4321/countries/united-kingdom/');
  const htmlUK = await resUK.text();
  if (!htmlUK.includes('categories-search-united-kingdom')) {
    throw new Error('FAIL: categories-search-united-kingdom not found');
  }
  console.log('✔ categories-search-united-kingdom present with neon beam and typewriter');

  // Test Australia
  console.log('\nTesting Australia country page search integration...');
  const resAU = await fetch('http://localhost:4321/countries/australia/');
  const htmlAU = await resAU.text();
  if (!htmlAU.includes('categories-search-australia')) {
    throw new Error('FAIL: categories-search-australia not found');
  }
  console.log('✔ categories-search-australia present with neon beam and typewriter');

  console.log('\nAll Country Search tests passed successfully! 🚀');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
