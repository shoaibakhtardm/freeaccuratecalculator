# Deployment Checklist: SEO Round 2 Release

**Target Branch:** `main` (Merged from `seo/round-2`)  
**Deployment Target:** Cloudflare Pages + Cloudflare Worker (`workers/edge-cache.js`)  
**Domain:** `https://freeaccuratecalculator.com`

---

## 1. Pre-Merge Validation (Local Branch: `seo/round-2`)

Before merging into `main`, verify the local test and build suite passes with zero errors:

```bash
# 1. Verify working branch
git branch --show-current
# Expected: seo/round-2

# 2. Run complete automated test suite
npm test
# Expected: 415 pass, 0 fail (duration ~1.2s)

# 3. Clean production build
npm run build
# Expected: 179 canonical URLs partitioned across 9 child sitemaps, 0 errors

# 4. Full dist SEO & internal link audit
node scripts/audit-full-dist.mjs
# Expected: 180 HTML files, 0 missing titles, 0 duplicate titles, 0 broken internal links

# 5. Verify workers directory has no data files
ls workers/
# Expected: only edge-cache.js (GSC workbook relocated to baseline/)
```

---

## 2. Cloudflare Pages Preview Verification (Optional but Recommended)

When pushing `seo/round-2` to GitHub without merging to `main`:

```bash
git push origin seo/round-2
```

Cloudflare Pages automatically creates a **Preview Deployment** at `https://seo-round-2.freeaccuratecalculator.pages.dev`:

1. **Header Isolation:** Cloudflare Pages automatically injects `X-Robots-Tag: noindex` on all preview URLs so Google will never index preview pages.
2. **Worker Host Check:** In `workers/edge-cache.js`, `isProdHost` only matches `freeaccuratecalculator.com` and `www.freeaccuratecalculator.com`. Visiting `*.pages.dev` or `localhost` bypasses host/protocol canonicalization without redirection loops.
3. **Verification on Preview URL:**
   * Test `/guides/` -> returns **200 OK**.
   * Test `/calculadora-sip/es/` -> returns **200 OK**.
   * Test `/sitemap.xml` -> returns **200 OK** referencing all 9 child sitemaps (including `/sitemap-guides.xml`).
   * Test `/pt/` title -> contains `Calculadora Online Grátis`.
   * Test `/` English title -> contains `Free Online Calculators — 100+ Tools` (India protection intact).

---

## 3. Merge & Production Deployment Steps

Execute the merge locally and push to trigger production deployment:

```bash
# 1. Switch to main
git checkout main
git pull origin main

# 2. Fast-forward merge from seo/round-2
git merge --ff-only seo/round-2

# 3. Push to production
git push origin main
```

Cloudflare Pages triggers the production deployment pipeline automatically.

---

## 3b. Standalone Cloudflare Worker Deployment (`workers/edge-cache.js`)

Because Cloudflare Pages handles static asset hosting, `workers/edge-cache.js` operates as a **Cloudflare Worker Route** sitting in front of `freeaccuratecalculator.com/*` to deliver edge caching, HTTP 410 Gone status codes, and instant redirect canonicalization.

### Safe Pre-Live Worker Testing
Before deploying the worker to the production route, test locally or on staging:

1. **Local Worker Simulation (Zero Risk):**
   ```bash
   npx wrangler dev workers/edge-cache.js --port 8787
   ```
   In a separate terminal, test the local simulation:
   ```bash
   # Test 301 Redirect
   curl -sI "http://localhost:8787/countries/france/"
   # Test 410 Gone
   curl -sI "http://localhost:8787/countries/united-states/"
   # Test France FR Guides 410 Gone
   curl -sI "http://localhost:8787/countries/france/fr/guides/"
   ```

2. **Node Unit Test Runner (Automated):**
   ```bash
   node --test tests/edge-worker-redirects-410.test.mjs
   ```

### Worker Deployment Options

#### Option A: Via Cloudflare Dashboard (Recommended, Zero CLI Auth Setup)
1. In the Cloudflare Dashboard, go to **Compute (Workers) & Pages** → **Workers**.
2. Select your worker application (e.g., `freeaccuratecalculator-edge-cache`).
3. Click **Edit code**.
4. Copy the entire contents of `workers/edge-cache.js` from the repository and paste it into the editor.
5. Click **Deploy**.
6. Under the worker's **Settings** → **Triggers** → **Routes**, confirm the route is active:
   * **Route:** `freeaccuratecalculator.com/*` (and `www.freeaccuratecalculator.com/*` if applicable)
   * **Zone:** `freeaccuratecalculator.com`

#### Option B: Via Wrangler CLI
```bash
npx wrangler deploy workers/edge-cache.js --name freeaccuratecalculator-edge-cache --compatibility-date 2025-02-01
```

---

## 4. CRITICAL: Cloudflare Edge Cache Purge Step

Because Cloudflare previously cached 404 responses for `/guides/` and `/calculadora-sip/es/`, and served 200 OK on `www`, **the edge cache must be purged immediately post-deploy**:

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Select domain **`freeaccuratecalculator.com`**.
3. In the sidebar, navigate to **Caching** → **Configuration**.
4. Under **Purge Cache**, click **Purge Everything**.
5. Confirm the purge.
*(Alternatively via API: `curl -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/purge_cache" -H "Authorization: Bearer <API_TOKEN>" -H "Content-Type: application/json" --data '{"purge_everything":true}'`)*

---

## 5. Post-Deploy Live Verification Matrix (`curl -sI`)

Run these curl commands against production and verify actual output against expected output:

### A. Subdomain & Protocol Canonicalization
```bash
# HTTP Apex -> HTTPS Apex (301)
curl -sI "http://freeaccuratecalculator.com/"
# Expected: HTTP/1.1 301 Moved Permanently | Location: https://freeaccuratecalculator.com/

# WWW Subdomain -> Apex HTTPS (301)
curl -sI "https://www.freeaccuratecalculator.com/"
# Expected: HTTP/1.1 301 Moved Permanently | Location: https://freeaccuratecalculator.com/ | Cache-Control: public, max-age=86400
```

### B. Legitimate 301 Redirects (Preserving Equity)
```bash
# France legacy -> /fr/
curl -sI "https://freeaccuratecalculator.com/countries/france/"
# Expected: HTTP/1.1 301 Moved Permanently | Location: https://freeaccuratecalculator.com/fr/

# France SIP -> /sip-calculator/
curl -sI "https://freeaccuratecalculator.com/countries/france/sip-calculator/"
# Expected: HTTP/1.1 301 Moved Permanently | Location: https://freeaccuratecalculator.com/sip-calculator/

# India Finance -> /finance/
curl -sI "https://freeaccuratecalculator.com/countries/india/finance/"
# Expected: HTTP/1.1 301 Moved Permanently | Location: https://freeaccuratecalculator.com/finance/

# Unrouted Pregnancy Calculators -> /pregnancy-due-date-calculator/
curl -sI "https://freeaccuratecalculator.com/due-date-calculator/"
curl -sI "https://freeaccuratecalculator.com/pregnancy-conception-calculator/"
# Expected: HTTP/1.1 301 Moved Permanently | Location: /pregnancy-due-date-calculator/
```

### C. Permanently Retired URLs (Clean HTTP 410 Gone)
```bash
curl -sI "https://freeaccuratecalculator.com/countries/"
curl -sI "https://freeaccuratecalculator.com/countries/united-states/"
curl -sI "https://freeaccuratecalculator.com/countries/singapore/"
curl -sI "https://freeaccuratecalculator.com/countries/france/en/guides/"
curl -sI "https://freeaccuratecalculator.com/love/guides/"
# Expected on all: HTTP/1.1 410 Gone | Cache-Control: public, max-age=86400
```

### D. New & Restored Live 200 OK Content
```bash
# Educational Guides Hub (recovers 33 GSC impressions)
curl -sI "https://freeaccuratecalculator.com/guides/"
# Expected: HTTP/1.1 200 OK

# Spanish SIP Calculator
curl -sI "https://freeaccuratecalculator.com/calculadora-sip/es/"
# Expected: HTTP/1.1 200 OK

# Brazilian CLT Vacation Calculator
curl -sI "https://freeaccuratecalculator.com/calculadora-de-ferias/pt/"
# Expected: HTTP/1.1 200 OK
```

### E. Coexistence of Love Pages (Option C)
```bash
# Love Category Hub
curl -sI "https://freeaccuratecalculator.com/love/"
# Expected: HTTP/1.1 200 OK

# Love Calculator Tool
curl -sI "https://freeaccuratecalculator.com/love-calculator/"
# Expected: HTTP/1.1 200 OK
```

### F. Sitemap System & Indexes
```bash
# Authoritative Index
curl -s "https://freeaccuratecalculator.com/sitemap.xml" | grep "<loc>"
# Expected: 9 child sitemaps referenced

# Guides Sitemap
curl -sI "https://freeaccuratecalculator.com/sitemap-guides.xml"
# Expected: HTTP/1.1 200 OK
```

### G. Localized & English Title Verification
```bash
# English Homepage (Title preserved for India CTR)
curl -s "https://freeaccuratecalculator.com/" | grep "<title>"
# Expected: <title>Free Online Calculators — 100+ Tools | Free Accurate Calculator</title>

# Portuguese Homepage (Singular intent)
curl -s "https://freeaccuratecalculator.com/pt/" | grep "<title>"
# Expected: <title>Calculadora Online Grátis – Ferramentas Rápidas e Precisas | Free Accurate Calculator</title>
```

---

## 6. Comprehensive Rollback Plan

If an unexpected production anomaly occurs post-deploy (e.g., 5xx errors, redirect loops, broken sitemaps, or unexpected regression on `/`):

### Rollback Decision Triggers
Trigger an immediate rollback if ANY of the following occur:
1. `curl -sI https://freeaccuratecalculator.com/` returns non-200 or infinite redirect loop.
2. `curl -sI https://freeaccuratecalculator.com/sitemap.xml` fails to serve valid XML index.
3. India traffic landing on mobile homepage experiences layout or script failure.
4. Live HTTP verification reveals unexpected 500/502 status on core calculators.

---

### Method A: Instant Cloudflare Dashboard Rollback (<30 seconds, Recommended)
1. Open [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **`freeaccuratecalculator`**.
2. Navigate to the **Deployments** tab.
3. Locate the previous production deployment (`2ecfda9` - *SEO: Spanish age calculator and guides optimization*).
4. Click the three dots (**`...`**) next to that deployment and select **Rollback to this deployment**.
5. Once confirmed, go to **Caching** → **Configuration** → click **Purge Everything**.
*Result: Instant zero-downtime rollback to the prior production build artifacts.*

---

### Method B: Cloudflare Worker Route Rollback (If Worker was updated)
If `workers/edge-cache.js` was deployed as a standalone Worker:
1. Open Cloudflare Dashboard → **Workers & Pages** → select Worker **`freeaccuratecalculator-edge-cache`** (or active worker name).
2. Navigate to **Deployments** / **Version History**.
3. Select the version active prior to release.
4. Click **Rollback** to reactivate the prior script.
5. Purge Cloudflare Edge Cache.

---

### Method C: Git Hard Rollback & Fast Re-deploy
If dashboard rollback is unavailable:
```bash
# 1. Checkout main branch
git checkout main

# 2. Reset hard to previous stable commit
git reset --hard 2ecfda9

# 3. Force push to main (triggers automatic re-build)
git push origin main --force-with-lease

# 4. Purge edge cache once pipeline finishes
# Dashboard: Caching -> Configuration -> Purge Everything
```

---

### Post-Rollback Smoke Test
After executing any rollback method, verify live stability:
```bash
curl -sI "https://freeaccuratecalculator.com/"
curl -sI "https://freeaccuratecalculator.com/sitemap.xml"
curl -sI "https://freeaccuratecalculator.com/sip-calculator/"
```
All must return `HTTP/1.1 200 OK`.
