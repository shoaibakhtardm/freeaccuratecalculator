# SITEMAP FORENSIC REPAIR & TECHNICAL SEO ARCHITECTURE REPORT
**Free Accurate Calculator — Production XML Sitemap System**
**Date:** September 18, 2026  
**Status:** COMPLETE & VERIFIED (ALL TESTS PASSING)

---

## 1. Executive Summary

A comprehensive forensic audit and architectural overhaul of the XML sitemap system for `https://freeaccuratecalculator.com` has been completed. The root cause of the malformed output (where XML elements collapsed into contiguous unspaced strings such as `https://freeaccuratecalculator.com/about/2026-09-17T23:04:49.966Zmonthly0.5`) has been eliminated at the source.

The fragmented, multi-generator build pipeline has been consolidated into a single deterministic, standards-compliant generator producing an authoritative Master Sitemap Index at `/sitemap.xml` referencing 11 clean, topical child sitemaps ($\le 500$ URLs each) with genuine Git-derived modification timestamps (`lastmod`), strict XML indentation, and 100% parity with live canonical production routes.

---

## 2. Before vs. After Forensic Matrix

| Metric / Dimension | Before Repair | After Repair | Status |
| :--- | :--- | :--- | :--- |
| **Authoritative Entry Point** | Multiple competing files (`sitemap.xml`, `sitemap_index.xml`, `sitemap-index.xml`) | `https://freeaccuratecalculator.com/sitemap.xml` | **Resolved** |
| **Sitemap Type** | Competing `urlset` vs `sitemapindex` overwriting each other | Master `<sitemapindex>` with strict XML schema | **Resolved** |
| **Active Generators** | 3 conflicting systems (`@astrojs/sitemap`, `sync-sitemap.mjs`, `generate-sitemap.js`) | 1 unified deterministic engine (`scripts/generate-sitemap.js`) | **Consolidated** |
| **Malformed Concatenation** | Detected: `.../about/2026-09-17T23:04:49.966Zmonthly0.5` | Completely eliminated (dedicated lines & indentation) | **Fixed** |
| **Tag Formatting** | Single-line unspaced tag squashing | Strict multi-line indentation with newline separators | **Fixed** |
| **`lastmod` Source of Truth** | Fabricated `Date.now()` build timestamp across all 1,130 URLs | Real Git commit history per route/data file | **Fixed** |
| **Child Sitemap Files** | Inconsistent chunking / file churn | 11 categorized sitemaps (all strictly $\le 500$ URLs) | **Optimized** |
| **Eligible Canonical Routes** | 1,130 verified canonical live routes | 1,130 URLs in sitemap (100% 1:1 route parity) | **Verified** |
| **Cross-Chunk Duplicates** | Vulnerable to generator collision | Exactly 0 duplicate URLs across all sitemaps | **Zero Duplicates** |
| **Redirecting URLs in Sitemap** | Potential legacy route crawl waste | 0 redirects (checked against `public/_redirects`) | **Zero Redirects** |
| **404 / Broken URLs in Sitemap**| 0 | 0 | **Verified** |
| **Localhost / HTTP URLs** | 0 | 0 (Strict HTTPS `https://freeaccuratecalculator.com/`) | **Verified** |
| **Robots.txt Directive** | 3 duplicate directives | Authoritative canonical pointer: `sitemap.xml` | **Cleaned** |
| **HTML `<link rel="sitemap">`** | 3 duplicate tags in `<head>` | Single canonical pointer: `/sitemap.xml` | **Cleaned** |

---

## 3. Forensic Root Cause Analysis

### A. The Malformed Output Bug
- **The Symptom:** Browsers and text extractors displayed `https://freeaccuratecalculator.com/about/2026-09-17T23:04:49.966Zmonthly0.5` instead of structured XML.
- **The Mechanism:**
  1. `@astrojs/sitemap` serialized `<url>` elements as a single contiguous string with zero whitespace between tags:
     `<loc>https://freeaccuratecalculator.com/about/</loc><lastmod>2026-09-17T23:04:49.966Z</lastmod><changefreq>monthly</changefreq><priority>0.5</priority>`
  2. The intermediate script `scripts/sync-sitemap.mjs` performed a regex extraction `/<url>([\s\S]*?)<\/url>/g` and attempted indentation via `split('\n')`. Because there were no newlines inside `<url>`, the entire block remained on a single line.
  3. When served without an XSL stylesheet or viewed in previewers, adjacent inline XML elements collapsed into contiguous text.

### B. Conflicting Generator Pipeline
Prior to repair, four distinct systems competed for ownership:
1. `@astrojs/sitemap` integration in `astro.config.mjs` (generated `sitemap-0.xml` and `sitemap-index.xml` in `dist/client/`).
2. `scripts/sync-sitemap.mjs` (read Astro's output, filtered it, and overwrote `dist/client/sitemap.xml` and `public/sitemap.xml`).
3. `scripts/generate-sitemap.js` (partitioned URLs into chunks and overwrote `sitemap.xml` again).
4. Static files in `public/` (copied by Astro into `dist/client/` during subsequent builds, causing circular overwrites).

### C. Fabricated `lastmod` Timestamps
Every generator in the chain called `new Date().toISOString()`, stamping all 1,130 URLs with identical millisecond timestamps on every build. This violated Google's technical SEO guidelines, which advise that `<lastmod>` must represent the genuine content modification date.

---

## 4. Architectural Solution & Implementation

### 1. Master Sitemap Index Architecture (`/sitemap.xml`)
The production architecture is now unified under the standard `<sitemapindex>` protocol:
```
https://freeaccuratecalculator.com/sitemap.xml
  ├── sitemap-main.xml        (48 URLs: Core root, about, contact, flagship hubs)
  ├── sitemap-finance.xml     (38 URLs: Flagship finance calculators)
  ├── sitemap-countries-1.xml (500 URLs: Country routes chunk 1)
  ├── sitemap-countries-2.xml (357 URLs: Country routes chunk 2)
  ├── sitemap-math.xml        (6 URLs: Mathematics calculators)
  ├── sitemap-health.xml      (10 URLs: Health and wellness calculators)
  ├── sitemap-business.xml    (33 URLs: Business, legal, insurance tools)
  ├── sitemap-science.xml     (45 URLs: Chemistry, physics, biology, stats, construction)
  ├── sitemap-everyday.xml    (16 URLs: Date, time, GPA, grade calculators)
  ├── sitemap-guides.xml      (53 URLs: Comprehensive editorial guide articles)
  └── sitemap-i18n.xml        (24 URLs: Multilingual locale index routes)
```
- Total Canonical URLs: **1,130**
- Total Duplicate URLs: **0**
- Aliases: `/sitemap_index.xml` and `/sitemap-index.xml` mirror `/sitemap.xml` for complete backwards compatibility.

### 2. Deterministic Git-Based `lastmod` Resolution
A dedicated resolver maps each route to its authoritative source file (`src/pages/...`, `src/content/guides/...`, `src/data/france-guides.ts`, etc.) and queries Git commit history via `git log -1 --format=%cI -- <file>`, caching results in memory for sub-second build times. Child sitemap `<lastmod>` values in `<sitemapindex>` are dynamically set to the maximum `lastmod` among their constituent URLs.

### 3. Strict XML Formatting & Escaping
All URL and index serializers now format every child tag on its own indented line:
```xml
  <url>
    <loc>https://freeaccuratecalculator.com/about/</loc>
    <lastmod>2026-09-08T11:17:25.000Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
```
All special characters are strictly escaped (`&amp;`, `&lt;`, `&gt;`, `&quot;`, `&apos;`).

### 4. Consolidated Build Pipeline
- Removed `@astrojs/sitemap` from `astro.config.mjs`.
- Removed obsolete `scripts/sync-sitemap.mjs`.
- Updated `package.json`: `"build": "astro build && node scripts/generate-sitemap.js"`.
- Output is written simultaneously to `dist/client/` (for Cloudflare deployment) and `public/` (for local development).

---

## 5. Route Count Reconciliation & Parity

```
Total Discovered HTML Output Files:     1,131 (Includes /404.html)
Excluded Non-Canonical/Error Routes:        1 (/404.html)
Redirected Sources (in _redirects):         0 (0 redirected URLs admitted)
Total Eligible Canonical Live Routes:   1,130
Total URLs in Sitemap System:           1,130
Eligible Routes Missing from Sitemap:       0
Sitemap URLs Not Found on Disk:             0
Parity Rate:                             100.0% (Perfect 1:1 Parity)
```

### France Canonical Architecture Confirmation
All 298 France routes in the sitemap strictly conform to the canonical bilingual architecture:
- `/countries/france/fr/...`
- `/countries/france/en/...`
- Legacy unlocalized patterns (`/countries/france/`, `/countries/france/finance/`, `/countries/france/guides/`) are permanently excluded from sitemaps and correctly handled by 301 redirects in `public/_redirects`.

---

## 6. Automated Verification & Test Results

| Test Suite | Command | Result | Details |
| :--- | :--- | :--- | :--- |
| **Strict XML Validation** | `node --test tests/validate-sitemap-xml.mjs` | **PASS (6/6)** | Strict token/stack XML validation, no tag concatenation, 0 cross-chunk duplicates, real Git lastmods |
| **Core Sitemap & Discovery** | `node --test tests/sitemap.test.mjs` | **PASS (5/5)** | Master sitemapindex, child sitemaps $\le 500$ URLs, 100% HTML route parity, robots.txt alignment |
| **Full Repository Test Suite** | `npm test` | **PASS (322/322)** | All tax engine, currency, mobile, France bilingual, and sitemap tests 100% green |
| **Full Production Build** | `npm run build` | **PASS (Code 0)** | Clean static compilation + sitemap generation in 17.6s |
| **TypeScript / Astro Check** | `npx astro check` | **PASS** | No syntax or type errors in active source files |

---

## 7. Final Acceptance Criteria Verification

1. `/sitemap.xml` is valid XML: **PASS**
2. The malformed pattern (`.../about/2026-09-17T23:04:49.966Zmonthly0.5`) is completely eliminated: **PASS**
3. Every `<loc>` is a valid production HTTPS URL (`https://freeaccuratecalculator.com/...`): **PASS**
4. Sitemap contains canonical URLs only: **PASS**
5. No sitemap URL returns 404: **PASS**
6. No sitemap URL unexpectedly redirects: **PASS**
7. No duplicate URLs across or within any sitemap files: **PASS**
8. No localhost or development URLs: **PASS**
9. No HTTP URLs: **PASS**
10. France canonical routes are correct (`/countries/france/en/...`, `/countries/france/fr/...`): **PASS**
11. Legacy France routes are not in sitemap: **PASS**
12. Sitemap and `robots.txt` agree on authoritative entry point: **PASS**
13. XML Content-Type header configured in `_headers` (`application/xml`): **PASS**
14. Child sitemaps are all valid XML and $\le 500$ URLs: **PASS**
15. `lastmod` values reflect genuine Git commit history (not uniform build dates): **PASS**
16. Production parity verified against compiled `dist/client` assets: **PASS**
17. Existing calculators continue working without regression: **PASS**
18. Existing tests remain 100% passing (322/322): **PASS**
19. Build remains passing: **PASS**
20. No unrelated architecture changed: **PASS**
