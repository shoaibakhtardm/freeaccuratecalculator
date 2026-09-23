// tests/all-remaining-calculators.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { ALL_FRONTEND_CALCULATORS } from '../src/data/calculators.ts';
import { LOVE_CALCULATORS } from '../src/data/loveCalculators.ts';

const distClient = path.resolve('dist/client');

test('All Site Calculators — Forensic Integrity & SEO Suite', async (t) => {
  // Collect all unique calculator slugs across frontend and love tools
  const allCalculatorSlugs = new Set();
  
  for (const calc of ALL_FRONTEND_CALCULATORS) {
    if (calc.slug) allCalculatorSlugs.add(calc.slug);
  }
  for (const calc of LOVE_CALCULATORS) {
    if (calc.slug) allCalculatorSlugs.add(calc.slug);
  }

  const slugList = Array.from(allCalculatorSlugs);
  assert.ok(slugList.length >= 100, `Expected at least 100 calculators, found ${slugList.length}`);

  await t.test('All calculators compile to valid HTML in dist/client', () => {
    const missing = [];
    for (const slug of slugList) {
      const htmlPath = path.join(distClient, slug, 'index.html');
      if (!fs.existsSync(htmlPath)) {
        missing.push(slug);
      }
    }
    assert.deepEqual(missing, [], `All calculator pages must be compiled: missing ${missing.join(', ')}`);
  });

  await t.test('Zero instances of "Programmatic pSEO Engine" across all compiled calculator pages', () => {
    for (const slug of slugList) {
      const htmlPath = path.join(distClient, slug, 'index.html');
      if (!fs.existsSync(htmlPath)) continue;
      const content = fs.readFileSync(htmlPath, 'utf-8');
      assert.ok(
        !content.includes('Programmatic pSEO Engine'),
        `Page ${slug} must NOT contain "Programmatic pSEO Engine"`
      );
    }
  });

  await t.test('Zero fake AggregateRating schema or review counts across all compiled calculator pages', () => {
    const fakeReviewMarkers = ['12847', '1840', '1250'];
    for (const slug of slugList) {
      const htmlPath = path.join(distClient, slug, 'index.html');
      if (!fs.existsSync(htmlPath)) continue;
      const content = fs.readFileSync(htmlPath, 'utf-8');
      
      for (const marker of fakeReviewMarkers) {
        assert.ok(
          !content.includes(`"ratingCount":"${marker}"`) &&
          !content.includes(`"ratingCount": "${marker}"`) &&
          !content.includes(`"reviewCount":"${marker}"`) &&
          !content.includes(`"reviewCount": "${marker}"`),
          `Page ${slug} must NOT contain fake ratingCount/reviewCount ${marker}`
        );
      }
    }
  });

  await t.test('Every calculator page has a self-referential canonical tag', () => {
    for (const slug of slugList) {
      const htmlPath = path.join(distClient, slug, 'index.html');
      if (!fs.existsSync(htmlPath)) continue;
      const content = fs.readFileSync(htmlPath, 'utf-8');
      
      const canonicalMatch = content.match(/<link rel="canonical" href="([^"]+)"/);
      assert.ok(canonicalMatch, `Page ${slug} must have a canonical tag`);
      assert.equal(
        canonicalMatch[1],
        `https://freeaccuratecalculator.com/${slug}/`,
        `Page ${slug} must declare self-referential canonical URL`
      );
    }
  });

  await t.test('Every calculator page has valid parseable JSON-LD schemas', () => {
    for (const slug of slugList) {
      const htmlPath = path.join(distClient, slug, 'index.html');
      if (!fs.existsSync(htmlPath)) continue;
      const content = fs.readFileSync(htmlPath, 'utf-8');
      
      const jsonLdBlocks = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
      assert.ok(jsonLdBlocks.length > 0, `Page ${slug} must contain at least one JSON-LD block`);
      
      for (const block of jsonLdBlocks) {
        const rawJson = block.replace(/<script type="application\/ld\+json">|<\/script>/g, '');
        assert.doesNotThrow(() => {
          const parsed = JSON.parse(rawJson);
          assert.ok(parsed, `JSON-LD in ${slug} must not be null`);
        }, `JSON-LD in ${slug} must parse valid JSON`);
      }
    }
  });

  await t.test('Every calculator page contains exactly one <h1> heading', () => {
    for (const slug of slugList) {
      const htmlPath = path.join(distClient, slug, 'index.html');
      if (!fs.existsSync(htmlPath)) continue;
      const content = fs.readFileSync(htmlPath, 'utf-8');
      
      const h1Matches = content.match(/<h1[\s>]/g) || [];
      assert.equal(h1Matches.length, 1, `Page ${slug} must have exactly one <h1> heading, found ${h1Matches.length}`);
    }
  });

  await t.test('Non-currency tools do not display currency symbols ($ or ₹) in hero results', () => {
    const nonCurrencyTools = [
      'scientific-calculator',
      'probability-calculator',
      'conversion-calculator',
      'fraction-calculator',
      'triangle-calculator',
      'velocity-acceleration-calculator',
      'kinetic-energy-calculator',
      'punnett-square-calculator',
      'molar-mass-calculator',
      'macronutrient-calculator',
      'standard-deviation-calculator',
      'sample-size-calculator',
      'confidence-interval-calculator',
      'heart-rate-zone-calculator',
      'one-rep-max-calculator',
      'length-converter',
      'temperature-converter'
    ];

    for (const slug of nonCurrencyTools) {
      const htmlPath = path.join(distClient, slug, 'index.html');
      if (!fs.existsSync(htmlPath)) continue;
      const content = fs.readFileSync(htmlPath, 'utf-8');
      
      assert.ok(
        content.includes('class="text-2xl sm:text-3xl font-bold font-mono text-ink hidden"') ||
        content.includes('hidden') && content.includes('id="hero-result-symbol"'),
        `Page ${slug} must hide currency symbol in hero result`
      );
    }
  });
});
