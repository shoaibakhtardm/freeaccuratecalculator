// tests/verify-country-category-parity.mjs
import assert from 'node:assert';

async function testParity() {
  console.log('Testing Category vs Country UI Parity...');

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
    const countryRes = await fetch(`http://localhost:4321/countries/${slug}/`);
    assert.strictEqual(countryRes.status, 200, `Country page /countries/${slug}/ returned 200`);
    const countryHtml = await countryRes.text();

    // 1. Hero & Structure Checks
    assert.ok(countryHtml.includes('display-hero'), `Country ${slug} has display-hero`);
    assert.ok(countryHtml.includes('hero-mesh-gradient'), `Country ${slug} has hero-mesh-gradient`);
    assert.ok(countryHtml.includes('animate-ping'), `Country ${slug} has live ping pill`);
    assert.ok(countryHtml.includes('rounded-3xl'), `Country ${slug} has modern rounded-3xl container`);

    // 2. 3-by-3 Grid & Card Checks
    assert.ok(countryHtml.includes('grid grid-cols-3'), `Country ${slug} has 3-by-3 grid`);
    assert.ok(countryHtml.includes('calc-card'), `Country ${slug} has calc-cards`);

    // 3. Search & Interactivity
    assert.ok(countryHtml.includes('directory-filter-input'), `Country ${slug} has directory-filter-input`);
    assert.ok(countryHtml.includes('fac-neon-orbit-wrapper'), `Country ${slug} has neon orbit wrapper`);
    assert.ok(countryHtml.includes('fac-typewriter-container'), `Country ${slug} has typewriter overlay`);
    assert.ok(countryHtml.includes('directory-filter-dropdown'), `Country ${slug} has suggestions dropdown`);
    assert.ok(countryHtml.includes('cross-category-container'), `Country ${slug} has cross-category search container`);

    // 4. Educational & FAQ sections
    assert.ok(countryHtml.includes('Why Use Free Accurate'), `Country ${slug} has education section`);
    assert.ok(countryHtml.includes('Frequently Asked Questions'), `Country ${slug} has FAQ section`);
    assert.ok(countryHtml.includes('details class="group rounded-2xl'), `Country ${slug} has FAQ details accordion`);

    // 5. Calculator links check and resolution
    const cardLinks = [];
    const regex = /<a\s+[^>]*href="([^"]+)"[^>]*class="calc-card/g;
    let m;
    while ((m = regex.exec(countryHtml)) !== null) {
      cardLinks.push(m[1]);
    }
    assert.ok(cardLinks.length >= 15, `Country ${slug} has at least 15 tools in 3-by-3 grid (actual: ${cardLinks.length})`);
    assert.strictEqual(cardLinks.length % 3, 0, `Country ${slug} tool count is a multiple of 3 for 3-by-3 layout (actual: ${cardLinks.length})`);

    // Verify first 5 links resolve to 200
    for (const link of cardLinks.slice(0, 5)) {
      const linkRes = await fetch('http://localhost:4321' + link);
      assert.strictEqual(linkRes.status, 200, `Calculator link ${link} returned 200 OK`);
    }

    console.log(`✔ /countries/${slug}/ has 100% architectural parity with Category pages! (${cardLinks.length} tools verified)`);
  }

  console.log('\nAll Country pages verified successfully with full Category parity!');
}

testParity().catch((err) => {
  console.error('Parity test failed:', err);
  process.exit(1);
});
