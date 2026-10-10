import fs from 'node:fs';
import path from 'node:path';

const distDir = 'dist/client';

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(full));
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const htmlFiles = getFiles(distDir);
console.log(`Found ${htmlFiles.length} HTML files in ${distDir}`);

const routes = [];
const internalLinks = new Set();
const pageLinkMap = new Map();
const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();
const h1s = new Map();
const issues = {
  missingTitle: [],
  shortTitle: [],
  longTitle: [],
  duplicateTitle: [],
  missingDescription: [],
  shortDescription: [],
  longDescription: [],
  duplicateDescription: [],
  missingCanonical: [],
  mismatchedCanonical: [],
  missingH1: [],
  multipleH1: [],
  noindexPages: [],
  invalidJsonLd: [],
  brokenLinks: []
};

// Map file path to canonical URL path
for (const file of htmlFiles) {
  let rel = path.relative(distDir, file).replace(/\\/g, '/');
  let urlPath = '/' + rel.replace(/index\.html$/, '');
  if (!urlPath.endsWith('/')) urlPath += '/';
  if (urlPath === '//') urlPath = '/';

  const html = fs.readFileSync(file, 'utf8');

  // Title
  const tm = html.match(/<title>([^<]*)<\/title>/i);
  const title = tm ? tm[1].trim() : '';
  if (!title) issues.missingTitle.push(urlPath);
  else {
    if (titles.has(title)) {
      titles.get(title).push(urlPath);
    } else {
      titles.set(title, [urlPath]);
    }
  }

  // Description
  const dm = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const desc = dm ? dm[1].trim() : '';
  if (!desc) issues.missingDescription.push(urlPath);
  else {
    if (descriptions.has(desc)) {
      descriptions.get(desc).push(urlPath);
    } else {
      descriptions.set(desc, [urlPath]);
    }
  }

  // Canonical
  const cm = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const canonical = cm ? cm[1].trim() : '';
  const expectedCanonical = `https://freeaccuratecalculator.com${urlPath}`;
  if (!canonical) issues.missingCanonical.push(urlPath);
  else if (canonical !== expectedCanonical) {
    issues.mismatchedCanonical.push({ urlPath, canonical, expectedCanonical });
  }

  // H1
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  if (h1Matches.length === 0) issues.missingH1.push(urlPath);
  else if (h1Matches.length > 1) issues.multipleH1.push({ urlPath, count: h1Matches.length, headings: h1Matches });

  // Robots
  const rm = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
  const robots = rm ? rm[1].trim() : '';
  if (robots.includes('noindex')) {
    issues.noindexPages.push({ urlPath, robots });
  }

  // JSON-LD
  const jsonLdBlocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const block of jsonLdBlocks) {
    try {
      JSON.parse(block[1]);
    } catch (err) {
      issues.invalidJsonLd.push({ urlPath, error: err.message });
    }
  }

  // Internal Links
  const linkMatches = [...html.matchAll(/href=["'](\/[^"'#?]*)["']/gi)].map(m => m[1]);
  const pageLinks = [];
  for (const l of linkMatches) {
    if (l.startsWith('/api') || l.startsWith('/_astro') || l.endsWith('.xml') || l.endsWith('.txt') || l.endsWith('.png') || l.endsWith('.svg') || l.endsWith('.ico') || l.endsWith('.webmanifest')) {
      continue;
    }
    let norm = l.endsWith('/') ? l : l + '/';
    pageLinks.push(norm);
    internalLinks.add(norm);
  }
  pageLinkMap.set(urlPath, pageLinks);

  routes.push({ urlPath, title, desc, canonical, robots, h1Count: h1Matches.length });
}

// Find duplicate titles
for (const [title, urls] of titles.entries()) {
  if (urls.length > 1) {
    issues.duplicateTitle.push({ title, count: urls.length, urls });
  }
}

// Find duplicate descriptions
for (const [desc, urls] of descriptions.entries()) {
  if (urls.length > 1) {
    issues.duplicateDescription.push({ desc: desc.slice(0, 60) + '...', count: urls.length, urls });
  }
}

// Load _redirects
const redirectMap = new Map();
if (fs.existsSync('public/_redirects')) {
  const redLines = fs.readFileSync('public/_redirects', 'utf8').split('\n');
  for (const line of redLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 2) {
      let from = parts[0];
      if (!from.endsWith('/') && !from.includes('*') && !from.includes('.')) from += '/';
      redirectMap.set(from, parts[1]);
    }
  }
}

// Check broken internal links
const existingPaths = new Set(routes.map(r => r.urlPath));
for (const [sourcePage, targetList] of pageLinkMap.entries()) {
  for (const target of targetList) {
    if (!existingPaths.has(target) && !redirectMap.has(target)) {
      issues.brokenLinks.push({ sourcePage, target });
    }
  }
}

console.log('\n=== AUDIT RESULTS SUMMARY ===');
console.log(`Total Routes Checked: ${routes.length}`);
console.log(`Missing Titles: ${issues.missingTitle.length}`);
console.log(`Duplicate Titles groups: ${issues.duplicateTitle.length}`);
console.log(`Missing Descriptions: ${issues.missingDescription.length}`);
console.log(`Duplicate Descriptions groups: ${issues.duplicateDescription.length}`);
console.log(`Missing Canonicals: ${issues.missingCanonical.length}`);
console.log(`Mismatched Canonicals: ${issues.mismatchedCanonical.length}`);
console.log(`Missing H1: ${issues.missingH1.length}`);
console.log(`Multiple H1s: ${issues.multipleH1.length}`);
console.log(`Noindex Pages: ${issues.noindexPages.length}`);
console.log(`Invalid JSON-LD blocks: ${issues.invalidJsonLd.length}`);
console.log(`Broken Internal Links: ${issues.brokenLinks.length}`);

if (issues.mismatchedCanonical.length > 0) {
  console.log('\n--- Mismatched Canonicals ---');
  console.log(issues.mismatchedCanonical.slice(0, 10));
}

if (issues.brokenLinks.length > 0) {
  console.log('\n--- Sample Broken Links (first 20) ---');
  console.log(issues.brokenLinks.slice(0, 20));
}

if (issues.duplicateTitle.length > 0) {
  console.log('\n--- Sample Duplicate Titles (first 5) ---');
  console.log(issues.duplicateTitle.slice(0, 5));
}

if (issues.multipleH1.length > 0) {
  console.log('\n--- Sample Multiple H1s (first 5) ---');
  console.log(issues.multipleH1.slice(0, 5));
}
