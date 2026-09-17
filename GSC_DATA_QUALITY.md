# Google Search Console (GSC) Data Quality & Traffic Forensic Audit

## Executive Summary
This document provides a rigorous forensic breakdown of the Google Search Console (GSC) baseline dataset for `https://freeaccuratecalculator.com/` (Date range: 2026-09-07 onward).

**Reported Aggregate Dataset:**
- **Clicks**: 6
- **Impressions**: 60
- **Overall CTR**: 10.00%
- **Average Position Range**: Position 1.00 to Position 83.00

---

## 1. Traffic Classification & Contamination Analysis

### Category A: Self-Generated / Contaminated Traffic (India)
* **Reported Metrics**: 6 clicks, 11 impressions, 54.55% CTR, Position 1.36.
* **Owner Disclosure**: The website owner has explicitly confirmed that all 6 clicks from India originated from the owner and direct acquaintances testing the live environment.
* **Classification**: **CONTAMINATED / SELF-GENERATED TRAFFIC**.
* **SEO Treatment & Protocols**:
  1. **DO NOT** treat the 6 India clicks as organic search-user demand.
  2. **DO NOT** use 54.55% CTR as evidence of real organic SERP performance.
  3. **DO NOT** project traffic models or rank-lift projections based on these internal clicks.
  4. **True Organic Clicks from India**: **0**.

### Category B: Genuine Search Visibility & Impression Signals (Global)
* **Total Non-Contaminated Impressions**: 49 impressions across US, France, Netherlands, Argentina, Brazil, Canada, Belgium, etc.
* **Total Non-Contaminated Clicks**: 0 clicks (0.00% CTR).
* **Breakdown by Country (Organic Impressions Only)**:
  * **United States**: 20 impressions | 0 clicks | 0.00% CTR | Average Position: 14.05
  * **France**: 6 impressions | 0 clicks | 0.00% CTR | Average Position: 8.33
  * **Netherlands**: 3 impressions | 0 clicks | 0.00% CTR | Average Position: 4.33
  * **Argentina**: 3 impressions | 0 clicks | 0.00% CTR | Average Position: 7.00
  * **Brazil**: 2 impressions | 0 clicks | 0.00% CTR | Average Position: 3.00
  * **Canada**: 2 impressions | 0 clicks | 0.00% CTR | Average Position: 6.50
  * **Belgium**: 2 impressions | 0 clicks | 0.00% CTR | Average Position: 8.00
  * **Other**: Small trailing impressions

### Category C: Device Segmentation
* **Desktop**: 42 impressions | 2 clicks (self-generated) | 4.76% CTR | Average Position: 8.83
* **Mobile**: 18 impressions | 4 clicks (self-generated) | 22.22% CTR | Average Position: 5.00
* **Adjusted Organic Mobile Clicks**: 0
* **Adjusted Organic Desktop Clicks**: 0

---

## 2. Query-Level Forensics

| Query | Impressions | Clicks (Reported) | Clicks (Validated Organic) | Reported CTR | Position | Intent & Nature |
|---|---|---|---|---|---|---|
| `"accurate ca"` | 6 | 0 | 0 | 0.00% | 9.00 | Exact brand / precision calculator query (Striking Distance) |
| `"formule gra"` | 1 | 0 | 0 | 0.00% | 8.00 | French formula calculation search (Striking Distance) |
| `"exact calcu"` | 1 | 0 | 0 | 0.00% | 63.00 | Precision decimal calculation query |
| `"reliable calc"` | 1 | 0 | 0 | 0.00% | 83.00 | Trust & accuracy search intent |

---

## 3. Reliable Organic Ranking Opportunities (Striking Distance)

From the clean impression data, Google has already begun indexing and testing URLs in top-10 and top-15 positions without backlink inflation:
1. **Netherlands (`/nl/`)**: Position **4.33** (Page 1 striking distance). High click potential once snippet is optimized.
2. **Brazil (`/pt/` or global)**: Position **3.00**.
3. **Canada**: Position **6.50**.
4. **France (`/fr/` & `/countries/france/`)**: Position **8.33** (6 impressions). Page 1 rank ready for snippet click optimization.
5. **United States**: Position **14.05** (20 impressions, highest volume). Strongest economic target for moving from page 2 to page 1.
6. **Brand/Niche Query `"accurate ca"`**: Position **9.00** (6 impressions). Moving to top 3 will capture instant daily organic impressions.

---

## 4. GSC Protocol & Monitoring Guardrails
- **Action**: All ongoing analytics must filter out known developer IP subnets and exclude contaminated internal testing sessions.
- **Goal**: Measure 100% clean organic search queries, real non-branded clicks, and verified impressions in GSC.
