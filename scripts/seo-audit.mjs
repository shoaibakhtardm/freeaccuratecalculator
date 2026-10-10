import fs from 'node:fs';
import path from 'node:path';

const distDir = 'dist/client';
const publicDir = 'public';
const SITE_ORIGIN = 'https://freeaccuratecalculator.com';

if (!fs.existsSync(distDir)) {
  console.error(`❌ Dist directory not found: ${distDir}. Run 'npm run build' first.`);
  process.exit(1);
}

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(full));
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(distDir);
console.log(`\n======================================================`);
console.log(`  AUTOMATED PRODUCTION TECHNICAL SEO AUDIT`);
console.log(`  Auditing ${htmlFiles.length} compiled HTML documents in ${distDir}`);
console.log(`======================================================\n`);

// 1. Load _redirects
const redirects = new Map();
if (fs.existsSync(path.join(publicDir, '_redirects'))) {
  const lines = fs.readFileSync(path.join(publicDir, '_redirects'), 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 2) {
      let from = parts[0];
      if (!from.endsWith('/') && !from.includes('*') && !from.includes('.')) from += '/';
      redirects.set(from, parts[1]);
    }
  }
}

const titles = new Map();
const descriptions = new Map();
const internalLinks = [];
const existingUrlPaths = new Set();

const report = {
  totalAudited: htmlFiles.length,
  missingTitle: [],
  duplicateTitles: [],
  missingDescription: [],
  duplicateDescriptions: [],
  missingCanonical: [],
  mismatchedCanonical: [],
  missingH1: [],
  multipleH1: [],
  unexpectedNoindex: [],
  missingHtmlLang: [],
  invalidJsonLd: [],
  brokenInternalLinks: [],
  sitemapErrors: []
};

// First pass: collect all existing canonical URL paths
for (const file of htmlFiles) {
  let rel = path.relative(distDir, file).replace(/\\/g, '/');
  let urlPath = '/' + rel.replace(/index\.html$/, '');
  if (!urlPath.endsWith('/')) urlPath += '/';
  if (urlPath === '//') urlPath = '/';
  existingUrlPaths.add(urlPath);
}

// Second pass: audit every page
for (const file of htmlFiles) {
  let rel = path.relative(distDir, file).replace(/\\/g, '/');
  let urlPath = '/' + rel.replace(/index\.html$/, '');
  if (!urlPath.endsWith('/')) urlPath += '/';
  if (urlPath === '//') urlPath = '/';

  const html = fs.readFileSync(file, 'utf8');
  const is404Page = urlPath.startsWith('/404');

  // HTML lang
  const langMatch = html.match(/<html[^>]*lang=["']([^"']*)["']/i);
  if (!langMatch || !langMatch[1].trim()) {
    report.missingHtmlLang.push(urlPath);
  }

  // Title
  const tm = html.match(/<title>([^<]*)<\/title>/i);
  const title = tm ? tm[1].trim() : '';
  if (!title) {
    report.missingTitle.push(urlPath);
  } else if (!is404Page) {
    if (titles.has(title)) {
      titles.get(title).push(urlPath);
    } else {
      titles.set(title, [urlPath]);
    }
  }

  // Meta Description
  const dm = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const desc = dm ? dm[1].trim() : '';
  if (!desc && !is404Page) {
    report.missingDescription.push(urlPath);
  } else if (desc && !is404Page) {
    if (descriptions.has(desc)) {
      descriptions.get(desc).push(urlPath);
    } else {
      descriptions.set(desc, [urlPath]);
    }
  }

  // Canonical
  const cm = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const canonical = cm ? cm[1].trim() : '';
  if (!canonical && !is404Page) {
    report.missingCanonical.push(urlPath);
  } else if (canonical && !is404Page) {
    const expectedCanonical = `${SITE_ORIGIN}${urlPath}`;
    if (canonical !== expectedCanonical) {
      report.mismatchedCanonical.push({ urlPath, canonical, expectedCanonical });
    }
  }

  // H1
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  if (h1Matches.length === 0 && !is404Page) {
    report.missingH1.push(urlPath);
  } else if (h1Matches.length > 1 && !is404Page) {
    report.multipleH1.push({ urlPath, count: h1Matches.length, headings: h1Matches });
  }

  // Robots
  const rm = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
  const robots = rm ? rm[1].trim() : '';
  if (robots.includes('noindex') && !is404Page) {
    report.unexpectedNoindex.push({ urlPath, robots });
  }

  // JSON-LD
  const jsonLdBlocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const block of jsonLdBlocks) {
    try {
      JSON.parse(block[1]);
    } catch (err) {
      report.invalidJsonLd.push({ urlPath, error: err.message });
    }
  }

  // Collect internal links
  const hrefMatches = [...html.matchAll(/href=["'](\/[^"'#?]*)["']/gi)].map(m => m[1]);
  for (const href of hrefMatches) {
    if (href.startsWith('/api') || href.startsWith('/_astro') || href.endsWith('.xml') || href.endsWith('.txt') || href.endsWith('.png') || href.endsWith('.svg') || href.endsWith('.ico') || href.endsWith('.webmanifest')) {
      continue;
    }
    let norm = href.endsWith('/') ? href : href + '/';
    internalLinks.push({ source: urlPath, target: norm, raw: href });
  }
}

// Check duplicates
for (const [title, urlList] of titles.entries()) {
  if (urlList.length > 1) {
    report.duplicateTitles.push({ title, count: urlList.length, urls: urlList });
  }
}

for (const [desc, urlList] of descriptions.entries()) {
  if (urlList.length > 1) {
    report.duplicateDescriptions.push({ desc: desc.slice(0, 70) + '...', count: urlList.length, urls: urlList });
  }
}

// Check broken links against existing paths and redirects
const seenBroken = new Set();
for (const link of internalLinks) {
  const isDirectMatch = existingUrlPaths.has(link.target);
  const isRedirect = redirects.has(link.target) || redirects.has(link.raw);
  const isWildcardRedirect = Array.from(redirects.keys()).some(k => k.includes('*') && link.target.startsWith(k.replace('/*', '')));

  if (!isDirectMatch && !isRedirect && !isWildcardRedirect) {
    const key = `${link.source}->${link.target}`;
    if (!seenBroken.has(key)) {
      seenBroken.add(key);
      report.brokenInternalLinks.push(link);
    }
  }
}

// 3. Sitemap audit
const sitemapIndex = path.join(publicDir, 'sitemap.xml');
if (fs.existsSync(sitemapIndex)) {
  const indexXml = fs.readFileSync(sitemapIndex, 'utf8');
  const childMatches = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  
  for (const childUrl of childMatches) {
    const childFilename = childUrl.replace(SITE_ORIGIN + '/', '');
    const childFile = path.join(publicDir, childFilename);
    if (!fs.existsSync(childFile)) {
      report.sitemapErrors.push(`Child sitemap missing from public/: ${childFilename}`);
      continue;
    }

    const childXml = fs.readFileSync(childFile, 'utf8');
    const locs = [...childXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    for (const loc of locs) {
      if (!loc.startsWith(SITE_ORIGIN)) {
        report.sitemapErrors.push(`Non-canonical domain in sitemap: ${loc}`);
      }
      const locPath = loc.replace(SITE_ORIGIN, '');
      const normLocPath = locPath.endsWith('/') ? locPath : locPath + '/';
      if (!existingUrlPaths.has(normLocPath)) {
        report.sitemapErrors.push(`Sitemap URL missing from dist build: ${loc}`);
      }
      if (redirects.has(normLocPath)) {
        report.sitemapErrors.push(`Redirected URL present in sitemap: ${loc}`);
      }
    }
  }
} else {
  report.sitemapErrors.push('Master sitemap index public/sitemap.xml not found');
}

// Output Results
console.log(`AUDIT RESULTS FOR ${report.totalAudited} PAGES:`);
console.log(`- Missing Titles:             ${report.missingTitle.length === 0 ? '✔ 0' : '❌ ' + report.missingTitle.length}`);
console.log(`- Duplicate Title Groups:     ${report.duplicateTitles.length === 0 ? '✔ 0' : '❌ ' + report.duplicateTitles.length}`);
console.log(`- Missing Meta Descriptions:  ${report.missingDescription.length === 0 ? '✔ 0' : '❌ ' + report.missingDescription.length}`);
console.log(`- Duplicate Description Grps: ${report.duplicateDescriptions.length === 0 ? '✔ 0' : '❌ ' + report.duplicateDescriptions.length}`);
console.log(`- Missing Canonicals:         ${report.missingCanonical.length === 0 ? '✔ 0' : '❌ ' + report.missingCanonical.length}`);
console.log(`- Mismatched Canonicals:      ${report.mismatchedCanonical.length === 0 ? '✔ 0' : '❌ ' + report.mismatchedCanonical.length}`);
console.log(`- Missing H1 Elements:        ${report.missingH1.length === 0 ? '✔ 0' : '❌ ' + report.missingH1.length}`);
console.log(`- Multiple H1 Elements:       ${report.multipleH1.length === 0 ? '✔ 0' : 'ℹ ' + report.multipleH1.length}`);
console.log(`- Unexpected Noindex Pages:   ${report.unexpectedNoindex.length === 0 ? '✔ 0' : '❌ ' + report.unexpectedNoindex.length}`);
console.log(`- Missing HTML Lang Tags:     ${report.missingHtmlLang.length === 0 ? '✔ 0' : '❌ ' + report.missingHtmlLang.length}`);
console.log(`- Invalid JSON-LD Blocks:     ${report.invalidJsonLd.length === 0 ? '✔ 0' : '❌ ' + report.invalidJsonLd.length}`);
console.log(`- Broken Internal Links:      ${report.brokenInternalLinks.length === 0 ? '✔ 0' : '❌ ' + report.brokenInternalLinks.length}`);
console.log(`- Sitemap Integrity Errors:   ${report.sitemapErrors.length === 0 ? '✔ 0' : '❌ ' + report.sitemapErrors.length}`);

if (report.duplicateTitles.length > 0) {
  console.log('\n❌ Duplicate Titles detail:');
  console.log(report.duplicateTitles);
}

if (report.brokenInternalLinks.length > 0) {
  console.log('\n❌ Broken Internal Links detail:');
  console.log(report.brokenInternalLinks);
}

if (report.sitemapErrors.length > 0) {
  console.log('\n❌ Sitemap Errors detail:');
  console.log(report.sitemapErrors);
}

const hasCriticalFailures = (
  report.missingTitle.length > 0 ||
  report.duplicateTitles.length > 0 ||
  report.missingDescription.length > 0 ||
  report.duplicateDescriptions.length > 0 ||
  report.missingCanonical.length > 0 ||
  report.mismatchedCanonical.length > 0 ||
  report.missingH1.length > 0 ||
  report.unexpectedNoindex.length > 0 ||
  report.missingHtmlLang.length > 0 ||
  report.invalidJsonLd.length > 0 ||
  report.brokenInternalLinks.length > 0 ||
  report.sitemapErrors.length > 0
);

if (hasCriticalFailures) {
  console.error('\n❌ AUDIT FAILED: Critical SEO defects detected.\n');
  process.exit(1);
} else {
  console.log('\n🎉 ALL TECHNICAL SEO CHECKS PASSED!\n');
  process.exit(0);
}
