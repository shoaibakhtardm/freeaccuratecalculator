# Bug & Regression Master Report
**Website:** [freeaccuratecalculator.com](https://freeaccuratecalculator.com)  
**Date:** September 18, 2026  

---

## 1. Bug Registry & Classification Matrix

| Bug ID | Severity | Area | Root Cause | Affected Files | Fix Applied | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **BUG-PDF-01** | P0 | PDF Export | Premature 300ms race condition restoring dark mode while print dialog renders. | `src/layouts/Layout.astro` | Switched to native `afterprint` + window focus fallback. | ✅ FIXED |
| **BUG-PDF-02** | P0 | PDF Export / Print | Blanket `border-color: #000` & `background: transparent` destroying report tables/cards. | `src/styles/global.css` | Implemented clean light-mode token remapping under `@media print .dark`. | ✅ FIXED |
| **BUG-PDF-03** | P1 | Tax Statement | Print report metadata not synchronized during live recalculations. | `src/pages/finance/income-tax-calculator.astro` | Added continuous `syncPrintReport()` in `recalculate()`. | ✅ FIXED |
| **BUG-DARK-01**| P1 | Dark Mode | Native controls desynchronized due to missing `colorScheme` property. | `src/layouts/Layout.astro`, `src/components/ThemeToggle.astro` | Added explicit `document.documentElement.style.colorScheme` setting. | ✅ FIXED |
| **BUG-DARK-02**| P2 | Dark Mode | Button labels and ARIA attributes stale after client-side Astro navigation. | `src/components/ThemeToggle.astro` | Added `astro:page-load` listener to re-sync all theme toggles. | ✅ FIXED |

---

## 2. Regression Testing Evidence

```
▶ P0 PDF & Print Export System Integrity
  ✔ Layout.astro defines global resilient generateAndDownloadPDF with safe afterprint restoration
  ✔ global.css print media queries enforce verified light mode without destroying semantic styling
  ✔ SIP Calculator has complete dedicated print report and script synchronizer
  ✔ EMI Calculator has complete dedicated print report and script synchronizer
  ✔ Income Tax Calculator has complete dedicated print report and live sync
  ✔ FinanceCalculatorView has complete dedicated print report and script sync
  ✔ MasterCalculatorWrapper has complete high-fidelity print report and event binding
✔ P0 PDF & Print Export System Integrity

▶ P0 Dark Mode & Theme System Architecture
  ✔ Layout.astro head script eliminates Flash of Unstyled Theme (Anti-FOUT)
  ✔ ThemeToggle component provides seamless synchronization across DOM updates and astro:page-load
  ✔ Tailwind v4 custom dark variant is declared correctly in global.css
✔ P0 Dark Mode & Theme System Architecture

▶ Calculator Discovery & Search System Regression
  ✔ Search database contains all flagship calculators with valid routes
  ✔ AutocompleteSearch component supports keyboard navigation and Astro lifecycle hooks
✔ Calculator Discovery & Search System Regression

ℹ tests 297
ℹ pass 297
ℹ fail 0
```
