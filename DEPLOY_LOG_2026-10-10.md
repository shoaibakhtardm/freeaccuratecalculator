# Production Deployment & Verification Log: 2026-10-10

**Domain:** `freeaccuratecalculator.com`  
**Deployment Target:** Cloudflare Worker with Static Assets (`freeaccuratecalculator`)  
**Deployment Date:** 2026-10-10  
**Status:** **100% COMPLETE — ALL CHECKS PASS**  

---

## 1. Deployment Version Records

* **Active Live Production Version ID:** `4688b2d4-829c-44ae-8fa9-ab49372d7b30`
* **Previous Stable Version ID:** `d536bd6e-c34a-473e-9221-374a7b8e9ccf`
* **Fallback Emergency Rollback Target:** `02b254e7-e14b-4a5f-980e-bca1e423aea9`
* **Git Commit Synced on `main`:** `05be9fc` (merged fast-forward `seo/round-3` commit `3d19854`)

### Rollback Commands
In case of any unexpected production issue:
```bash
npx wrangler rollback d536bd6e-c34a-473e-9221-374a7b8e9ccf
```
Or to the initial known-good fallback target:
```bash
npx wrangler rollback 02b254e7-e14b-4a5f-980e-bca1e423aea9
```

---

## 2. Changes Implemented

1. **Redirect Rule Specificity & Precedence (`public/_redirects`):**
   - Placed specific France SIP calculator rules above the catch-all wildcard `/countries/france/*`.
   - Verified genuine mapping rules: `/countries/india/finance/` → `/finance/`, `/due-date-calculator/` & `/pregnancy-conception-calculator/` → `/pregnancy-due-date-calculator/`.
2. **Cloudflare Single Redirect Ruleset (Native Edge Rules):**
   - **`Redirect www to apex`:**
     - Expression: `http.host eq "www.freeaccuratecalculator.com"`
     - Action: Dynamic 301 redirect to `concat("https://freeaccuratecalculator.com", http.request.uri.path)`
     - Query string: Preserved.
   - **`Redirect France SIP calculator to apex sip calculator`:**
     - Expression: `http.request.uri.path in {"/countries/france/sip-calculator" "/countries/france/sip-calculator/"}`
     - Action: 301 redirect to `https://freeaccuratecalculator.com/sip-calculator/`
     - Query string: Preserved.
3. **Cache Invalidation & TTL Hardening:**
   - Purged entire zone cache via Cloudflare API.
   - Validated HTML category cache response headers: `Cache-Control: public, max-age=0, must-revalidate` (browser) and `CDN-Cache-Control: max-age=86400, stale-while-revalidate=604800` (edge).
4. **Mirror Prevention:**
   - `"workers_dev": false` active in `wrangler.jsonc`.
   - Verified `https://freeaccuratecalculator.freeaccuratecalculator-com.workers.dev/` returns **404 Not Found**, eliminating search index duplication.

---

## 3. Baseline Lighthouse Web Vitals (Mobile Preset)

Audited directly via Google Chrome v13.5.0 mobile throttling emulation:

| URL | Performance Score | LCP | TBT (INP proxy) | CLS |
| :--- | :---: | :---: | :---: | :---: |
| `/` | **52** | 3.5 s | 3,090 ms | 0.06 |
| `/emi-calculator/` | **68** | 2.4 s | 1,510 ms | 0 |
| `/percentage-calculator/` | **67** | 3.6 s | 940 ms | 0.017 |
| `/compound-interest-calculator/` | **66** | 2.9 s | 1,240 ms | 0 |
| `/pt/` | **51** | 3.7 s | 2,000 ms | 0.135 |

*Complete artifact saved to `baseline/lighthouse-2026-10-10.md`.*

---

## 4. Final Live Verification Matrix (32/32 PASS)

| URL / Test Target | Expected Result | Actual Live Result | Status | Verified Evidence |
| :--- | :--- | :--- | :---: | :--- |
| `https://freeaccuratecalculator.com/` | 200 OK | 200 OK | **PASS** | HTTP 200, Content-Type: text/html |
| `https://freeaccuratecalculator.com/guides/` | 200 OK | 200 OK | **PASS** | HTTP 200, Content-Type: text/html |
| `https://freeaccuratecalculator.com/calculadora-sip/es/` | 200 OK | 200 OK | **PASS** | HTTP 200, Content-Type: text/html |
| `https://freeaccuratecalculator.com/calculadora-de-ferias/pt/` | 200 OK | 200 OK | **PASS** | HTTP 200, Content-Type: text/html |
| `https://freeaccuratecalculator.com/emi-calculator/` | 200 OK | 200 OK | **PASS** | HTTP 200, Content-Type: text/html |
| `https://freeaccuratecalculator.com/sip-calculator/` | 200 OK | 200 OK | **PASS** | HTTP 200, Content-Type: text/html |
| `https://freeaccuratecalculator.com/love/` | 200 OK | 200 OK | **PASS** | HTTP 200, Content-Type: text/html |
| `https://freeaccuratecalculator.com/love-calculator/` | 200 OK | 200 OK | **PASS** | HTTP 200, Content-Type: text/html |
| `https://freeaccuratecalculator.com/it/` | 200 OK | 200 OK | **PASS** | HTTP 200, Content-Type: text/html |
| `https://freeaccuratecalculator.com/de/` | 200 OK | 200 OK | **PASS** | HTTP 200, Content-Type: text/html |
| `https://freeaccuratecalculator.com/pt/` | 200 OK | 200 OK | **PASS** | HTTP 200, Content-Type: text/html |
| `https://freeaccuratecalculator.com/sitemap.xml` | 200 OK | 200 OK | **PASS** | HTTP 200, Content-Type: application/xml |
| `https://freeaccuratecalculator.com/sitemap-guides.xml` | 200 OK | 200 OK | **PASS** | HTTP 200, Content-Type: application/xml |
| `http://freeaccuratecalculator.com/` | 301 -> apex | 301 -> apex | **PASS** | Status 301, Location: `https://freeaccuratecalculator.com/` |
| `https://www.freeaccuratecalculator.com/` | 301 -> apex | 301 -> apex | **PASS** | Status 301, Location: `https://freeaccuratecalculator.com/` |
| `/due-date-calculator/` | 301 -> `/pregnancy-due-date-calculator/` | 301 -> `/pregnancy-due-date-calculator/` | **PASS** | Status 301, Location: `/pregnancy-due-date-calculator/` |
| `/pregnancy-conception-calculator/` | 301 -> `/pregnancy-due-date-calculator/` | 301 -> `/pregnancy-due-date-calculator/` | **PASS** | Status 301, Location: `/pregnancy-due-date-calculator/` |
| `/countries/france/` | 301 -> `/fr/` | 301 -> `/fr/` | **PASS** | Status 301, Location: `/fr/` |
| `/countries/france/sip-calculator/` | 301 -> `/sip-calculator/` | 301 -> `https://freeaccuratecalculator.com/sip-calculator/` | **PASS** | Status 301, Location: `https://freeaccuratecalculator.com/sip-calculator/` |
| `/countries/france/fr/something` | 301 -> `/fr/` | 301 -> `/fr/` | **PASS** | Status 301, Location: `/fr/` |
| `/countries/india/finance/` | 301 -> `/finance/` | 301 -> `/finance/` | **PASS** | Status 301, Location: `/finance/` |
| `/countries/` | 404 Not Found | 404 Not Found | **PASS** | Status 404 |
| `/countries/united-states/` | 404 Not Found | 404 Not Found | **PASS** | Status 404 |
| `/countries/singapore/` | 404 Not Found | 404 Not Found | **PASS** | Status 404 |
| `/love/guides/` | 404 Not Found | 404 Not Found | **PASS** | Status 404 |
| `https://freeaccuratecalculator.freeaccuratecalculator-com.workers.dev/` | Not 200 (Disabled) | 404 Not Found | **PASS** | Status 404 (`workers_dev: false`) |
| Homepage Title (`/`) | Contains "Free Online Calculators" | Unchanged English Title | **PASS** | `<title>Free Online Calculators — 100+ Tools \| Free Accurate Calculator</title>` |
| Portugal Title (`/pt/`) | Singular ("Calculadora") | Singular ("Calculadora") | **PASS** | `<title>Calculadora Online Grátis – Ferramentas Rápidas e Precisas \| Free Accurate Calculator</title>` |
| Italy Title (`/it/`) | Singular ("Calcolatore") | Singular ("Calcolatore") | **PASS** | `<title>Calcolatore Online Gratis – Strumenti Rapidi e Precisi \| Free Accurate Calculator</title>` |
| Germany Title (`/de/`) | Singular ("Online-Rechner") | Singular ("Online-Rechner") | **PASS** | `<title>Kostenloser Online-Rechner – Schnelle & Präzise Tools \| Free Accurate Calculator</title>` |
| Sitemap Index Children | Exactly 9 child sitemaps | Exactly 9 child sitemaps | **PASS** | 9 child sitemaps listed: finance, math, health, business, science, everyday, guides, i18n, main |
| All 9 Child Sitemaps | All return 200 OK | All return 200 OK | **PASS** | 9/9 child sitemaps verified HTTP 200 |

*Zero redirect chains longer than 1 hop detected.*

---

## 5. Remaining Manual Action Items for User

The following tasks cannot be performed via API or CLI and require direct action in Google Search Console:

1. **Google Search Console — Sitemaps:**
   - Navigate to **Indexing** → **Sitemaps**.
   - Ensure **only** `sitemap.xml` is submitted (Google will automatically crawl all 9 child sitemaps via the index). Remove any old individual child sitemap submissions if present.
2. **Google Search Console — URL Inspection (Request Indexing):**
   - Submit each of the following priority URLs for real-time re-indexing:
     - `https://freeaccuratecalculator.com/`
     - `https://freeaccuratecalculator.com/guides/`
     - `https://freeaccuratecalculator.com/calculadora-sip/es/`
     - `https://freeaccuratecalculator.com/calculadora-de-ferias/pt/`
     - `https://freeaccuratecalculator.com/it/`
     - `https://freeaccuratecalculator.com/de/`
3. **Google Search Console — 404 Report ("Validate Fix"):**
   - Navigate to **Indexing** → **Pages** → **Not found (404)**.
   - Click **Validate Fix** to confirm to Google that retired paths (`/countries/*`, `/love/guides/*`) intentionally return 404 and should be de-indexed.
4. **Cloudflare Security — Revoke API Token:**
   - In your PowerShell terminal, clear the user environment variable:
     ```powershell
     [System.Environment]::SetEnvironmentVariable('CLOUDFLARE_API_TOKEN', $null, 'User')
     ```
   - In Cloudflare Dashboard (**Manage Account** → **Account API Tokens**), delete or revoke the temporary API token used for this deployment.
