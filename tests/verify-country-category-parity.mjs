// tests/verify-country-category-parity.mjs
import assert from 'node:assert';

async function testParity() {
  console.log('Testing Category vs Country UI Parity & Clean Landing Page Structure...');

  const categoryRes = await fetch('http://localhost:4321/legal/');
  assert.strictEqual(categoryRes.status, 200, 'Legal category page returned 200');
  const categoryHtml = await categoryRes.text();

  const testCountries = [
    'india',
    'united-states',
    'canada',
    'united-kingdom',
    'germany',
    'australia',
    'japan',
    'singapore',
  ];

  for (const slug of testCountries) {
    // 1. Country Landing Page Checks (/countries/[slug]/)
    const countryRes = await fetch(`http://localhost:4321/countries/${slug}/`);
    assert.strictEqual(countryRes.status, 200, `Country page /countries/${slug}/ returned 200`);
    const countryHtml = await countryRes.text();

    // 1a. Hero & Structure Checks
    assert.ok(countryHtml.includes('display-hero'), `Country ${slug} has display-hero`);
    assert.ok(countryHtml.includes('hero-mesh-gradient'), `Country ${slug} has hero-mesh-gradient`);
    assert.ok(countryHtml.includes('animate-ping'), `Country ${slug} has live ping pill`);
    assert.ok(countryHtml.includes('rounded-3xl'), `Country ${slug} has modern rounded-3xl container`);

    // 1b. Categories Section (Exact Homepage Style)
    assert.ok(countryHtml.includes('grid grid-cols-3'), `Country ${slug} has 3-column categories grid`);
    assert.ok(countryHtml.includes('category-filter-btn'), `Country ${slug} has category-filter-btn`);
    assert.ok(countryHtml.includes(`/countries/${slug}/finance/`), `Country ${slug} has /countries/${slug}/finance/`);

    // 1c. Verified that the generic 18-tool directory list is removed from landing page
    assert.ok(!countryHtml.includes('id="calculator-grid"'), `Country ${slug} landing page has removed generic calculator-grid`);

    // 1d. Educational & FAQ sections
    assert.ok(countryHtml.includes('Why Use Free Accurate'), `Country ${slug} has education section`);
    assert.ok(countryHtml.includes('Frequently Asked Questions'), `Country ${slug} has FAQ section`);
    assert.ok(countryHtml.includes('details class="group rounded-2xl'), `Country ${slug} has FAQ details accordion`);

    // 2. Country Category Page Checks (/countries/[slug]/finance/)
    const catRes = await fetch(`http://localhost:4321/countries/${slug}/finance/`);
    assert.strictEqual(catRes.status, 200, `Country category /countries/${slug}/finance/ returned 200`);
    const catHtml = await catRes.text();

    assert.ok(catHtml.includes('calc-card'), `Country category ${slug}/finance has calc-cards`);
    assert.ok(catHtml.includes('directory-filter-input'), `Country category ${slug}/finance has directory search`);

    const cardLinks = [];
    const regex = /<a\s+[^>]*href="([^"]+)"[^>]*class="calc-card/g;
    let m;
    while ((m = regex.exec(catHtml)) !== null) {
      cardLinks.push(m[1]);
    }
    assert.ok(cardLinks.length >= 3, `Country category ${slug}/finance has tools (actual: ${cardLinks.length})`);
    assert.strictEqual(cardLinks.length % 3, 0, `Country category ${slug}/finance tool count is multiple of 3 (actual: ${cardLinks.length})`);

    // Verify first link resolves to 200
    const linkRes = await fetch('http://localhost:4321' + cardLinks[0]);
    assert.strictEqual(linkRes.status, 200, `Calculator link ${cardLinks[0]} returned 200 OK`);

    console.log(`✔ /countries/${slug}/ landing page cleaned up & /countries/${slug}/finance/ has full tool parity!`);
  }

  console.log('\nAll Country pages and Category subdirectories verified successfully!');
}

testParity().catch((err) => {
  console.error('Parity test failed:', err);
  process.exit(1);
});
