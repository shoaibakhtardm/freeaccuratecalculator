# SEO Forensic Changelog & Modification Log

## Version: Forensic Baseline Audit (2026-09-17)

### 1. Forensic Artifacts Generated
- **GSC_DATA_QUALITY.md**: Complete audit separating contaminated self-traffic from clean global impressions.
- **SEO_ARCHITECTURE_BASELINE.md**: Complete mapping of 1,165 routes, Astro static generation, and Cloudflare adapter.
- **SEO_URL_INVENTORY.csv**: 1,165-row inventory with canonicals, robots, titles, descriptions, H1s, and word counts.
- **INDEXABILITY_MATRIX.csv**: Comprehensive indexability proof and sitemap verification for every live URL.
- **KEYWORD_MASTER.csv**: Evidence-based keyword database with non-fabricated metrics and clear intent classifications.
- **STRIKING_DISTANCE.csv**: Striking distance targets (Positions 4.33 to 14.05) prioritized for immediate rank elevation.
- **CTR_OPPORTUNITIES.csv**: Search snippet optimizations engineered to capture high CTR.
- **INTERNAL_LINKING_PLAN.csv**: Systematic link graph architecture connecting money-pages with high-relevance clusters.
- **PRIMARY_RANKING_TARGET.md**: Deep-dive technical and competitive plan for primary ranking targets.
- **SEO_360_AUDIT.md**: Executive 360-degree technical and on-page SEO assessment.
- **SEO_REGRESSION_REPORT.md**: Full validation and test pass report.

### 2. High-Impact Issues Diagnosed for Implementation
1. **Search Database Incompleteness**: Flagship calculators (SIP, EMI, Income Tax, Mortgage, Percentage) were omitted from `src/data/searchDatabase.ts`.
2. **France Dynamic Route Prerender Overlap**: 4 France generic slugs (`age-calculator`, `calorie-calculator`, `date-calculator`, `percentage-calculator`) were being statically generated despite active 301 redirects in `_redirects`.
3. **Snippet CTR Enhancement**: Titles and descriptions on key landing pages refined for click-through rate optimization.
