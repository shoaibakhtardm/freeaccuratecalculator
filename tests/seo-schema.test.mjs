import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();

test('SEO & Schema Markup — Layout & Meta Tags Verification', () => {
  const layoutPath = path.join(projectRoot, 'src', 'layouts', 'Layout.astro');
  assert.ok(fs.existsSync(layoutPath), 'Layout.astro must exist');
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');

  // Verify Open Graph & Twitter Card tags
  assert.ok(layoutContent.includes('property="og:image"'), 'Layout must include og:image');
  assert.ok(layoutContent.includes('property="og:image:width"'), 'Layout must include og:image:width');
  assert.ok(layoutContent.includes('property="og:image:height"'), 'Layout must include og:image:height');
  assert.ok(layoutContent.includes('name="twitter:card" content="summary_large_image"'), 'Layout must use summary_large_image');
  assert.ok(layoutContent.includes('name="twitter:image"'), 'Layout must include twitter:image');

  // Verify enhanced robots directives
  assert.ok(
    layoutContent.includes('max-snippet:-1, max-image-preview:large, max-video-preview:-1'),
    'Layout must enforce Google Discover/Rich Snippet robots directives'
  );

  // Verify Bingbot and Copilot grounding compliance
  assert.ok(
    layoutContent.includes('name="bingbot"'),
    'Layout must include explicit bingbot meta directive for Bing and Copilot'
  );
  assert.ok(
    !layoutContent.includes('noarchive') && !layoutContent.includes('nocache'),
    'Layout must not emit noarchive or nocache directives which restrict Copilot answer depth'
  );

  // Verify baseline Schema.org entity grounding (Organization & WebSite)
  assert.ok(layoutContent.includes("'@type': 'Organization'"), 'Layout must include Organization entity schema');
  assert.ok(layoutContent.includes("'@type': 'WebSite'"), 'Layout must include WebSite entity schema');
  assert.ok(layoutContent.includes("'@type': 'SearchAction'"), 'Layout must include SearchAction for sitelinks searchbox');

  // Verify canonical and hreflang
  assert.ok(layoutContent.includes('rel="canonical"'), 'Layout must declare canonical tag');
  assert.ok(layoutContent.includes('rel="alternate" hreflang='), 'Layout must declare alternate hreflang links');
});

test('SEO & Schema Markup — CalculatorLayout Structured Data Verification', () => {
  const calcLayoutPath = path.join(projectRoot, 'src', 'layouts', 'CalculatorLayout.astro');
  assert.ok(fs.existsSync(calcLayoutPath), 'CalculatorLayout.astro must exist');
  const calcLayoutContent = fs.readFileSync(calcLayoutPath, 'utf8');

  // Verify WebApplication & SoftwareApplication dual types
  assert.ok(
    calcLayoutContent.includes("'SoftwareApplication', 'WebApplication'"),
    'CalculatorLayout must emit both SoftwareApplication and WebApplication types'
  );

  // Verify standard category mapping
  assert.ok(calcLayoutContent.includes("'FinanceApplication'"), 'Must map finance to FinanceApplication');
  assert.ok(calcLayoutContent.includes("'HealthApplication'"), 'Must map health to HealthApplication');
  assert.ok(calcLayoutContent.includes("'EducationalApplication'"), 'Must map math to EducationalApplication');

  // Verify required properties for Google Rich Results
  assert.ok(calcLayoutContent.includes("operatingSystem: 'All'"), 'operatingSystem must be All');
  assert.ok(calcLayoutContent.includes('browserRequirements:'), 'browserRequirements must be defined');
  assert.ok(calcLayoutContent.includes('softwareVersion:'), 'softwareVersion must be defined');
  assert.ok(calcLayoutContent.includes("price: '0.00'"), 'Free pricing offer must be declared');
});

test('SEO & Schema Markup — Breadcrumbs Schema Verification', () => {
  const breadcrumbPath = path.join(projectRoot, 'src', 'components', 'common', 'Breadcrumbs.astro');
  assert.ok(fs.existsSync(breadcrumbPath), 'Breadcrumbs.astro must exist');
  const breadcrumbContent = fs.readFileSync(breadcrumbPath, 'utf8');

  // Verify BreadcrumbList schema
  assert.ok(breadcrumbContent.includes("'@type': 'BreadcrumbList'"), 'Must declare BreadcrumbList');
  assert.ok(breadcrumbContent.includes("'@type': 'ListItem'"), 'Must declare ListItem');
  // Verify leaf breadcrumbs also receive item URLs to satisfy Google Search Console
  assert.ok(breadcrumbContent.includes('item: itemUrl'), 'All breadcrumb items must include an absolute item URL');
});

test('SEO & Schema Markup — FAQSection Schema Safety Verification', () => {
  const faqPath = path.join(projectRoot, 'src', 'components', 'calculator', 'FAQSection.astro');
  assert.ok(fs.existsSync(faqPath), 'FAQSection.astro must exist');
  const faqContent = fs.readFileSync(faqPath, 'utf8');

  // Verify FAQPage schema guards against empty entity emissions
  assert.ok(faqContent.includes("'@type': 'FAQPage'"), 'Must declare FAQPage schema');
  assert.ok(faqContent.includes('hasFaqs'), 'Must guard against rendering empty FAQPage schema');
});

test('SEO & Schema Markup — Dist HTML JSON-LD Parseability Audit', () => {
  const samplePages = [
    path.join(projectRoot, 'dist', 'index.html'),
    path.join(projectRoot, 'dist', 'finance', 'emi-calculator', 'index.html'),
    path.join(projectRoot, 'dist', 'math', 'percentage-calculator', 'index.html'),
  ];

  for (const pagePath of samplePages) {
    if (!fs.existsSync(pagePath)) continue;
    const html = fs.readFileSync(pagePath, 'utf8');
    const matches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    assert.ok(matches && matches.length > 0, `Page ${pagePath} must contain at least one JSON-LD block`);

    for (const match of matches) {
      const jsonString = match.replace(/<script type="application\/ld\+json">|<\/script>/g, '');
      assert.doesNotThrow(() => {
        const parsed = JSON.parse(jsonString);
        assert.ok(parsed['@context'] === 'https://schema.org', 'Must have schema.org context');
      }, `JSON-LD in ${pagePath} must parse valid JSON`);
    }
  }
});

test('DevOps Health — GitHub Actions CI/CD Pipeline Verification', () => {
  const ciPath = path.join(projectRoot, '.github', 'workflows', 'ci.yml');
  assert.ok(fs.existsSync(ciPath), '.github/workflows/ci.yml must exist');
  const ciContent = fs.readFileSync(ciPath, 'utf8');

  assert.ok(ciContent.includes('actions/checkout@v4'), 'Must use actions/checkout@v4');
  assert.ok(ciContent.includes('actions/setup-node@v4'), 'Must use actions/setup-node@v4');
  assert.ok(ciContent.includes('node-version: 22.x'), 'Must use Node 22.x');
  assert.ok(ciContent.includes('npm ci'), 'Must run clean install (npm ci)');
  assert.ok(ciContent.includes('npm run test'), 'Must execute test suite');
  assert.ok(ciContent.includes('npm run build'), 'Must execute production build');
  assert.ok(ciContent.includes('dist/client/sitemap.xml'), 'Must verify sitemap.xml artifact');
});

test('Competitive Upgrades — Clipboard 1-Click Copy Feature Verification', () => {
  const resultDisplayPath = path.join(projectRoot, 'src', 'components', 'calculator', 'ResultDisplay.astro');
  assert.ok(fs.existsSync(resultDisplayPath), 'ResultDisplay.astro must exist');
  const content = fs.readFileSync(resultDisplayPath, 'utf8');

  // Verify copy button markup & accessibility
  assert.ok(content.includes('fac-copy-result-btn'), 'Must include 1-click copy button class');
  assert.ok(content.includes('data-copy-id={id}'), 'Copy button must reference result target ID');
  assert.ok(content.includes('aria-label={`Copy ${label} result to clipboard`}'), 'Copy button must have accessible aria-label');
  assert.ok(content.includes('copy-icon'), 'Must include copy icon');
  assert.ok(content.includes('check-icon'), 'Must include success checkmark icon');

  // Verify delegated clipboard handler logic
  assert.ok(content.includes('window.__facCopyHandlerInitialized'), 'Must guard against duplicate listener attachments');
  assert.ok(content.includes('navigator.clipboard.writeText'), 'Must copy formatted result to clipboard');
  assert.ok(content.includes('window.facShowToast'), 'Must display accessible toast confirmation on copy');
});

test('Competitive Upgrades — Dark Mode & WCAG Contrast Verification', () => {
  const themeTogglePath = path.join(projectRoot, 'src', 'components', 'ThemeToggle.astro');
  assert.ok(fs.existsSync(themeTogglePath), 'ThemeToggle.astro must exist');
  const toggleContent = fs.readFileSync(themeTogglePath, 'utf8');

  // Verify ThemeToggle accessibility and event emission
  assert.ok(toggleContent.includes('id={id}') || toggleContent.includes('id="theme-toggle"'), 'Theme toggle button must exist');
  assert.ok(toggleContent.includes("btn.setAttribute('aria-label'") || toggleContent.includes("toggleBtn.setAttribute('aria-label'"), 'Must dynamically update aria-label for screen readers');
  assert.ok(toggleContent.includes("new CustomEvent('themechange'"), 'Must broadcast themechange event for dynamic components');

  // Verify global CSS dark mode and WCAG contrast definitions
  const globalCssPath = path.join(projectRoot, 'src', 'styles', 'global.css');
  assert.ok(fs.existsSync(globalCssPath), 'global.css must exist');
  const cssContent = fs.readFileSync(globalCssPath, 'utf8');

  assert.ok(cssContent.includes('@custom-variant dark'), 'Must define dark mode variant');
  assert.ok(cssContent.includes('--color-violet: var(--color-violet);'), 'Must define dynamic violet theme variable');
  assert.ok(cssContent.includes('--color-cyan: var(--color-cyan);'), 'Must define dynamic cyan theme variable');
  assert.ok(cssContent.includes('--color-violet: #a78bfa;'), 'Dark mode must use high-contrast violet (#a78bfa)');
  assert.ok(cssContent.includes('--color-cyan: #50e3c2;'), 'Dark mode must use high-contrast cyan (#50e3c2)');
  assert.ok(cssContent.includes('--color-mute: #8e8e8e;'), 'Dark mode must use WCAG AA compliant mute color');
});

test('Multilingual Homepages Technical SEO, Hreflang & Schema Parity (12 Locales)', () => {
  const locales = [
    { code: 'en', relPath: 'dist/client/index.html', url: 'https://freeaccuratecalculator.com/', expectedDir: 'ltr' },
    { code: 'es', relPath: 'dist/client/es/index.html', url: 'https://freeaccuratecalculator.com/es/', expectedDir: 'ltr' },
    { code: 'fr', relPath: 'dist/client/fr/index.html', url: 'https://freeaccuratecalculator.com/fr/', expectedDir: 'ltr' },
    { code: 'de', relPath: 'dist/client/de/index.html', url: 'https://freeaccuratecalculator.com/de/', expectedDir: 'ltr' },
    { code: 'hi', relPath: 'dist/client/hi/index.html', url: 'https://freeaccuratecalculator.com/hi/', expectedDir: 'ltr' },
    { code: 'pt', relPath: 'dist/client/pt/index.html', url: 'https://freeaccuratecalculator.com/pt/', expectedDir: 'ltr' },
    { code: 'it', relPath: 'dist/client/it/index.html', url: 'https://freeaccuratecalculator.com/it/', expectedDir: 'ltr' },
    { code: 'ar', relPath: 'dist/client/ar/index.html', url: 'https://freeaccuratecalculator.com/ar/', expectedDir: 'rtl' },
    { code: 'ja', relPath: 'dist/client/ja/index.html', url: 'https://freeaccuratecalculator.com/ja/', expectedDir: 'ltr' },
    { code: 'zh', relPath: 'dist/client/zh/index.html', url: 'https://freeaccuratecalculator.com/zh/', expectedDir: 'ltr' },
    { code: 'nl', relPath: 'dist/client/nl/index.html', url: 'https://freeaccuratecalculator.com/nl/', expectedDir: 'ltr' },
    { code: 'ru', relPath: 'dist/client/ru/index.html', url: 'https://freeaccuratecalculator.com/ru/', expectedDir: 'ltr' },
  ];

  for (const loc of locales) {
    const fullPath = path.join(projectRoot, loc.relPath);
    if (!fs.existsSync(fullPath)) continue; // Will be verified in dist build
    const html = fs.readFileSync(fullPath, 'utf8');

    // 1. Single H1
    const h1Matches = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/g);
    assert.equal(h1Matches?.length, 1, `${loc.code} must have exactly one H1`);

    // 2. Canonical self-reference
    assert.ok(
      html.includes(`<link rel="canonical" href="${loc.url}">`),
      `${loc.code} must have exact self-referencing canonical tag`
    );

    // 3. 13 hreflang tags including x-default
    const hreflangTags = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)];
    assert.equal(hreflangTags.length, 13, `${loc.code} must have exactly 13 hreflang tags (12 languages + x-default)`);
    assert.ok(
      html.includes('<link rel="alternate" hreflang="x-default" href="https://freeaccuratecalculator.com/">'),
      `${loc.code} x-default must point to https://freeaccuratecalculator.com/`
    );
    assert.ok(
      html.includes(`<link rel="alternate" hreflang="${loc.code}" href="${loc.url}">`),
      `${loc.code} must self-reference in hreflang tags`
    );

    // 4. HTML lang and dir attributes
    assert.ok(
      html.includes(`lang="${loc.code}"`),
      `${loc.code} must declare correct lang attribute`
    );
    assert.ok(
      html.includes(`dir="${loc.expectedDir}"`),
      `${loc.code} must declare correct dir attribute (${loc.expectedDir})`
    );

    // 5. Schema verification: Organization once, WebSite once, WebPage once, FAQPage absent on homepage
    const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    const schemas = jsonLdBlocks.map(b => JSON.parse(b[1]));

    const orgs = schemas.filter(s => s['@type'] === 'Organization');
    assert.equal(orgs.length, 1, `${loc.code} must contain Organization schema exactly once`);
    assert.equal(orgs[0]['@id'], 'https://freeaccuratecalculator.com/#organization');

    const sites = schemas.filter(s => s['@type'] === 'WebSite');
    assert.equal(sites.length, 1, `${loc.code} must contain WebSite schema exactly once`);
    assert.equal(sites[0]['@id'], 'https://freeaccuratecalculator.com/#website');

    const pages = schemas.filter(s => s['@type'] === 'WebPage');
    assert.equal(pages.length, 1, `${loc.code} must contain WebPage schema exactly once`);

    const faqs = schemas.filter(s => s['@type'] === 'FAQPage');
    assert.equal(faqs.length, 0, `${loc.code} homepage must NOT emit consumer FAQPage schema`);

    // 6. Zero dead social URLs
    assert.ok(
      !html.includes('twitter.com/accuratecalc') && !html.includes('twitter.com/FreeAccurateCalc'),
      `${loc.code} must not contain dead Twitter profile URL`
    );

    // 7. No raw English slug leakage on localized homepages
    if (loc.code !== 'en') {
      assert.ok(!html.includes('>scientific-calculator<'), `${loc.code} must not leak raw scientific-calculator slug`);
      assert.ok(!html.includes('>mortgage-calculator<'), `${loc.code} must not leak raw mortgage-calculator slug`);
      assert.ok(!html.includes('>loan-calculator<'), `${loc.code} must not leak raw loan-calculator slug`);
      assert.ok(!html.includes('>salary-calculator<'), `${loc.code} must not leak raw salary-calculator slug`);
      assert.ok(!html.includes('>compound-interest-calculator<'), `${loc.code} must not leak raw compound-interest-calculator slug`);
    }

    // 8. Content parity: Methodology and FAQs visible sections exist
    assert.ok(html.includes('<details class="group py-4'), `${loc.code} must contain visible FAQ accordion`);
  }
});


