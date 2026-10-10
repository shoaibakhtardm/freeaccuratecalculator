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

## 6. Rollback Plan

If an unexpected production issue occurs post-deploy:

### Option 1: Instant Cloudflare Dashboard Rollback (<30 seconds)
1. Open Cloudflare Dashboard → **Workers & Pages** → **`freeaccuratecalculator`**.
2. Go to **Deployments**.
3. Locate the previous stable production deployment (Commit `2ecfda9` or earlier).
4. Click **`...`** on the right side and select **Rollback to this deployment**.
5. Navigate to **Caching** → **Configuration** → click **Purge Everything**.
*Result: Instant zero-downtime rollback to prior production state.*

### Option 2: Git Rollback
```bash
git checkout main
git reset --hard 2ecfda9 # previous production commit
git push origin main --force-with-lease
```
Purge Cloudflare cache once the rollback build completes.
