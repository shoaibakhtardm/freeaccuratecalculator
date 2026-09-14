// tests/verify-country-categories.mjs
import assert from 'node:assert';

async function testCountryCategories() {
  console.log('=== STARTING COUNTRY CATEGORIES VERIFICATION ===\n');

  // 1. Test Homepage Categories
  console.log('1. Testing Homepage Categories Component...');
  const homeRes = await fetch('http://localhost:4321/');
  assert.strictEqual(homeRes.status, 200, 'Homepage must return 200 OK');
  const homeHtml = await homeRes.text();

  assert.ok(homeHtml.includes('Calculator Categories'), 'Homepage has Categories section');
  assert.ok(homeHtml.includes('grid grid-cols-3'), 'Homepage categories use 3-column grid');
  assert.ok(homeHtml.includes('/finance/'), 'Homepage Finance link is /finance/');
  assert.ok(homeHtml.includes('/health/'), 'Homepage Health link is /health/');
  assert.ok(homeHtml.includes('/math/'), 'Homepage Math link is /math/');
  console.log('✔ Homepage Categories section verified with correct global URLs!\n');

  // 2. Test All Required Countries
  const testCountries = [
    { slug: 'india', name: 'India', symbol: '₹' },
    { slug: 'united-states', name: 'United States', symbol: '$' },
    { slug: 'canada', name: 'Canada', symbol: '$' },
    { slug: 'australia', name: 'Australia', symbol: '$' },
    { slug: 'germany', name: 'Germany', symbol: '€' },
    { slug: 'united-kingdom', name: 'United Kingdom', symbol: '£' },
    { slug: 'united-arab-emirates', name: 'United Arab Emirates', symbol: 'AED' },
    { slug: 'japan', name: 'Japan', symbol: '¥' },
    { slug: 'singapore', name: 'Singapore', symbol: '$' },
  ];

  for (const country of testCountries) {
    console.log(`2. Testing Country: ${country.name} (/countries/${country.slug}/)...`);

    // Fetch Country Landing Page
    const countryRes = await fetch(`http://localhost:4321/countries/${country.slug}/`);
    assert.strictEqual(countryRes.status, 200, `${country.name} landing page returns 200 OK`);
    const countryHtml = await countryRes.text();

    // Check Categories section presence
    assert.ok(
      countryHtml.includes('Calculator Categories'),
      `${country.name} landing page must have Calculator Categories section`
    );
    assert.ok(
      countryHtml.includes('grid grid-cols-3'),
      `${country.name} categories must use exact 3-column grid`
    );
    assert.ok(
      countryHtml.includes('category-filter-btn'),
      `${country.name} categories must use category-filter-btn`
    );

    // Verify dynamic country-specific category links
    const expectedCategories = [
      'finance',
      'insurance',
      'legal',
      'business',
      'construction',
      'real-estate',
      'technology',
      'health',
      'statistics',
      'marketing',
      'math',
      'automotive',
      'biology',
      'chemistry',
      'physics',
    ];

    for (const cat of expectedCategories) {
      const expectedHref = `/countries/${country.slug}/${cat}/`;
      assert.ok(
        countryHtml.includes(expectedHref),
        `${country.name} page must contain crawlable link to ${expectedHref}`
      );
    }
    console.log(`  ✔ All 15+ category links verified on /countries/${country.slug}/`);

    // Fetch Country Finance Category Page
    const catRes = await fetch(`http://localhost:4321/countries/${country.slug}/finance/`);
    assert.strictEqual(catRes.status, 200, `${country.name} Finance category page returns 200 OK`);
    const catHtml = await catRes.text();

    assert.ok(
      catHtml.includes(`${country.name} Finance Calculators`),
      `${country.name} Finance page has localized H1`
    );
    assert.ok(
      catHtml.includes(`/countries/${country.slug}/`),
      `${country.name} Finance page has breadcrumb link to country`
    );
    assert.ok(
      catHtml.includes('directory-filter-input'),
      `${country.name} Finance page has search filter input`
    );
    assert.ok(
      catHtml.includes('calc-card'),
      `${country.name} Finance page has directory calculator cards`
    );

    console.log(`  ✔ Category page /countries/${country.slug}/finance/ returns 200 OK with full directory UI!`);
  }

  // 3. Test Topical Hierarchy Context: Calculator -> Category -> Country
  console.log('\n3. Testing Hierarchy: Calculator -> Country Category -> Country Landing...');
  const sipRes = await fetch('http://localhost:4321/countries/india/sip-calculator/');
  assert.strictEqual(sipRes.status, 200, 'India SIP calculator returns 200 OK');
  const sipHtml = await sipRes.text();

  assert.ok(
    sipHtml.includes('/countries/india/finance/'),
    'India SIP calculator breadcrumb category links to /countries/india/finance/'
  );
  console.log('✔ Complete bidirectional topical hierarchy verified: Country -> Category -> Calculator & Calculator -> Category -> Country!\n');

  console.log('=== ALL TESTS PASSED SUCCESSFULLY! ===');
}

testCountryCategories().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
