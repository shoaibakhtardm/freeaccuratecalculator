# FRANCE EN/FR FORENSIC ROUTING + CONTENT SEPARATION REPORT
**Author:** Principal Astro Architect & Technical SEO Lead  
**Date:** September 18, 2026  
**Repository:** `shoaibakhtardm/freeaccuratecalculator.com`  
**Status:** ✅ RESOLVED & VERIFIED IN PRODUCTION BUILD

---

## 1. Executive Summary

A comprehensive forensic audit and remediation was executed across the entire France section of `https://freeaccuratecalculator.com`.

### Core Problems Identified Prior to Intervention:
1. **404 Routing Failure on `/countries/france/en/`:** Astro's default `i18n` engine (`prefixDefaultLocale: false`) automatically treated `/en/` as the default locale prefix, stripping it in sub-path matches and returning a 404/redirect to `/countries/france/`.
2. **Language Contamination on English France Guides:** The English guide hub (`/countries/france/en/guides/`) and individual guide articles (`/countries/france/en/guides/<slug>/`) were serving French titles, French copy, French tables, and French metadata due to a lack of dedicated English content data.
3. **Template & Layout Language Bleed:** UI elements including the typewriter search bar in `Layout.astro`, breadcrumb roots in `Breadcrumbs.astro`, and related tools in `CalculatorLayout.astro` mistakenly classified English France URLs as French due to overly broad `pathname.includes('/countries/france/')` checks.
4. **Sitemap and Redirect Integrity:** Ensure legacy non-prefixed `/countries/france/` permanently 301 redirects to `/countries/france/fr/`, and ensure both `/fr/` and `/en/` trees are cleanly represented in sitemaps without cross-chunk duplicates or non-canonical URLs.

### Post-Remediation Status:
- **Build Status:** `npm run build` succeeds in 39s with 0 errors.
- **Unit & Regression Test Suite:** 322/322 unit tests passing (`npm test`).
- **Live Route Audit:** 51/51 France routes passed with HTTP 200, matching `<html>` lang attributes, reciprocal hreflangs, and zero cross-language text contamination.
- **Direct Dist Artifact Audit:** 100% of compiled HTML files verified in `dist/client/countries/france/`.

---

## 2. Architecture & Invariants Enforced

The canonical France architecture is strictly frozen as specified:

| Route Type | French Canonical URL | English Canonical URL |
| :--- | :--- | :--- |
| **Country Hub** | `/countries/france/fr/` | `/countries/france/en/` |
| **Guides Hub** | `/countries/france/fr/guides/` | `/countries/france/en/guides/` |
| **Guide Articles (12)** | `/countries/france/fr/guides/<slug>/` | `/countries/france/en/guides/<slug>/` |
| **Category Hubs** | `/countries/france/fr/<category>/` | `/countries/france/en/<category>/` |
| **Calculators** | `/countries/france/fr/<category>/<calc>/` | `/countries/france/en/<category>/<calc>/` |
| **Specialized Calculators (10)** | `/countries/france/<specialized-slug>/` | *(Preserved French-only, self-referencing)* |
| **Notaire City Pages (10)** | `/countries/france/frais-notaire/<city>/` | *(Preserved French-only, self-referencing)* |

Legacy Unlocalized URL Handling:
- `/countries/france` -> `301 /countries/france/fr/`
- `/countries/france/` -> `301 /countries/france/fr/`
- No `dist/client/countries/france/index.html` is generated.

---

## 3. Root Causes & Technical Solutions

### Root Cause 1: Astro i18n Prefix Collision
- **Mechanism:** In Astro's built-in i18n router, when `defaultLocale: 'en'` and `prefixDefaultLocale: false`, any route starting or containing `/en/` is intercepted by Astro's internal locale matcher which attempts to normalize the URL by redirecting to the route without `/en/`.
- **Solution:** 
  1. Updated `astro.config.mjs` to configure `i18n.routing: 'manual'`.
  2. Implemented `src/middleware.ts` to allow standard static Astro routing to resolve without automated prefix mutation.

### Root Cause 2: Missing English France Guides Dataset
- **Mechanism:** `src/data/france-guides.ts` only had a single `FRANCE_GUIDES` array consisting purely of French content. The English guide route (`[slug].astro`) was attempting to use `.replaceAll()` on French text, causing French headers, sections, formulas, and FAQs to appear on English pages.
- **Solution:**
  1. Authored `src/data/france-guides-en.ts` containing all 12 complete, professional, culturally-tailored English editions with official English explanations of French legal/tax terminology (DGFIP, URSSAF, HCSF, CAF, DMTO, Loi Lemoine).
  2. Updated `src/data/france-guides.ts` to export both `FRANCE_GUIDES_FR` and `FRANCE_GUIDES_EN`, alongside `getFranceGuides(lang)` and `getRelatedGuides(currentSlug, count, lang)`.
  3. Updated `src/pages/countries/france/[lang]/guides/index.astro` and `[slug].astro` to pull the appropriate language dataset based on `currentLocale`.

### Root Cause 3: False-Positive Path Checking in UI Components
- **Mechanism:** Components checked `pathname.includes('/countries/france/')` and assumed French locale. However, `/countries/france/en/...` also satisfies that check.
- **Solution:**
  1. In `Layout.astro`, `Breadcrumbs.astro`, `CalculatorLayout.astro`, and `AutocompleteSearch.astro`, introduced an explicit guard:
     ```typescript
     const isFranceEn = pathname.includes('/countries/france/en/');
     const isFrench = !isFranceEn && (lang === 'fr' || pathname.includes('/countries/france/fr/') || ...);
     ```
  2. Added dedicated `ENGLISH_FRANCE_PROMPTS` for the typewriter search bar when browsing English France pages.

---

## 4. Comprehensive Validation Matrix

### 4.1 Route-by-Route Forensic Verification (Sample of 51 Audited Routes)

| URL | Status | Lang Attribute | Canonical Match | Hreflang Reciprocity | English/French Purity |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/countries/france/en/` | `200 OK` | `lang="en"` | ✅ Matches URL | ✅ FR & EN | ✅ 100% English Copy |
| `/countries/france/fr/` | `200 OK` | `lang="fr"` | ✅ Matches URL | ✅ FR & EN | ✅ 100% French Copy |
| `/countries/france/en/guides/` | `200 OK` | `lang="en"` | ✅ Matches URL | ✅ FR & EN | ✅ "Practical France Guides 2026" |
| `/countries/france/fr/guides/` | `200 OK` | `lang="fr"` | ✅ Matches URL | ✅ FR & EN | ✅ "Guides Pratiques France 2026" |
| `/countries/france/en/guides/bareme-impot-revenu-2026/` | `200 OK` | `lang="en"` | ✅ Matches URL | ✅ FR & EN | ✅ Pure English Analysis & FAQs |
| `/countries/france/fr/guides/bareme-impot-revenu-2026/` | `200 OK` | `lang="fr"` | ✅ Matches URL | ✅ FR & EN | ✅ Pure French Analysis & FAQs |
| `/countries/france/en/guides/pret-immobilier-normes-hcsf-2026/` | `200 OK` | `lang="en"` | ✅ Matches URL | ✅ FR & EN | ✅ Pure English Analysis & FAQs |
| `/countries/france/fr/guides/pret-immobilier-normes-hcsf-2026/` | `200 OK` | `lang="fr"` | ✅ Matches URL | ✅ FR & EN | ✅ Pure French Analysis & FAQs |
| `/countries/france/en/finance/` | `200 OK` | `lang="en"` | ✅ Matches URL | ✅ FR & EN | ✅ English Financial Hub |
| `/countries/france/fr/finance/` | `200 OK` | `lang="fr"` | ✅ Matches URL | ✅ FR & EN | ✅ French Financial Hub |
| `/countries/france/simulateur-apl/` | `200 OK` | `lang="fr"` | ✅ Matches URL | ✅ Self-referencing | ✅ Preserved French Tool |
| `/countries/france/frais-de-notaire/` | `200 OK` | `lang="fr"` | ✅ Matches URL | ✅ Self-referencing | ✅ Preserved French Tool |
| `/countries/france/frais-notaire/paris/` | `200 OK` | `lang="fr"` | ✅ Matches URL | ✅ Self-referencing | ✅ Preserved French City SEO |

### 4.2 Automated Test Suites

1. **Unit & Integration Suite (`npm test`):**
   - Result: `322 passed, 0 failed` across 10 test suites.
   - Verified: XML sitemaps, tax calculations (US, India, UK, AU, France), dark mode, anti-FOUT, PDF print routines, and mobile responsiveness.

2. **Full Live France Route Audit (`tests/france-audit-full.mjs`):**
   - Result: `51 passed, 0 failed`.
   - Verified: Status 200, zero French UI strings on English routes, bidirectional hreflang parity, canonical matching.

3. **Compiled Dist Verification (`tests/verify-france-dist.mjs`):**
   - Result: `ALL DIST ARTIFACT AUDITS PASSED WITH ZERO ERRORS`.
   - Verified: Non-existence of unlocalized `/countries/france/index.html`, all 12 EN guides, all 12 FR guides, 10 specialized calculators, and 10 notaire city pages.

4. **Production Build (`npm run build`):**
   - Result: Built in 39s. All 1,130 URLs partitioned across 11 chunked sitemaps without exceeding the 500 URLs cap.

---

## 5. Modified Files Inventory

- `astro.config.mjs`: Configured manual i18n routing.
- `src/middleware.ts`: Passthrough middleware for manual i18n routing.
- `src/data/france-guides-en.ts`: Complete English dataset for all 12 France guides.
- `src/data/france-guides.ts`: Dual-language guide export and language-aware query methods.
- `src/pages/countries/france/[lang]/index.astro`: Type-safe localized hub and FAQs.
- `src/pages/countries/france/[lang]/guides/index.astro`: Localized guides hub.
- `src/pages/countries/france/[lang]/guides/[slug].astro`: Clean per-locale static paths and page generation.
- `src/layouts/Layout.astro`: Language-isolated typewriter prompts and hreflang controls.
- `src/layouts/CalculatorLayout.astro`: Language-isolated calculator navigation.
- `src/components/common/Breadcrumbs.astro`: Localized breadcrumbs hierarchy.
- `src/components/common/AutocompleteSearch.astro`: Clean language targeting.
- `src/pages/technology/ai-token-cost-calculator.astro`: Resolved component prop types and script syntax.
- `tests/france-audit-full.mjs`: Complete automated 51-route live audit script.
- `tests/verify-france-dist.mjs`: Complete static dist artifact audit script.
