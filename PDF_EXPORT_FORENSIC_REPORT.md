# PDF & Print Export Forensic Report
**Website:** [freeaccuratecalculator.com](https://freeaccuratecalculator.com)  
**Component Scope:** `Layout.astro`, `global.css`, `featureSuite.ts`, `FinanceCalculatorView.astro`, `MasterCalculatorWrapper.astro`, `sip-calculator.astro`, `emi-calculator.astro`, `income-tax-calculator.astro`, `CountryCalculatorView.astro`.

---

## 1. Executive Summary

A deep forensic investigation was conducted on the PDF export and printable statement generation subsystems across all 122+ calculator tools on the website. The investigation traced the complete export lifecycle:
```
User Click / Shortcut ↓ Event Delegator ↓ Light Mode Forcing ↓ DOM Update ↓ window.print() / Native PDF Dialog ↓ afterprint Hook ↓ Dark Mode Restoration
```

---

## 2. Root Cause Analysis

### Bug ID: BUG-PDF-01 (Severity: P0)
* **Title:** Dark Mode Premature Restoration Race Condition during PDF Print Preview.
* **Component:** `src/layouts/Layout.astro` (`window.generateAndDownloadPDF`)
* **Symptom:** When a user in Dark Mode clicked "Download PDF", the print dialog opened, but after 300ms the screen flashed dark and the generated PDF contained dark background artifacts and illegible inverted text.
* **Root Cause:** The `finally` block of `generateAndDownloadPDF` executed `setTimeout(restoreDarkMode, 300)`. Because opening a native print dialog takes several seconds, this timer executed while the browser was still rendering the print canvas, re-applying `.dark` styles.
* **Fix:** Removed the premature 300ms timeout. Switched to browser-native `afterprint` event listener supplemented with window focus fallback.

### Bug ID: BUG-PDF-02 (Severity: P0)
* **Title:** Destructive `@media print` CSS Overrides Flattening Document Typography and Tables.
* **Component:** `src/styles/global.css`
* **Symptom:** PDF printouts lost all table header formatting, badges, and card boundaries, with borders rendering as thick pure black lines and backgrounds stripped to 100% transparent.
* **Root Cause:** Blanket CSS rules `*, .dark * { border-color: #000000 !important; }` and `h1...td { background-color: transparent !important; color: #000000 !important; }`.
* **Fix:** Replaced with targeted light-mode CSS variable token overrides under `@media print .dark` (`--color-canvas: #ffffff`, `--color-ink: #0f172a`, `--color-hairline: #e2e8f0`). Preserved table header styling, clean slate borders, and subtle shading while hiding interactive non-printable controls.

### Bug ID: BUG-PDF-03 (Severity: P1)
* **Title:** Income Tax Print Statement Out-of-Sync on Input Slider Alteration.
* **Component:** `src/pages/finance/income-tax-calculator.astro`
* **Symptom:** Print statement fields did not dynamically update during interactive slider manipulations unless the PDF button was explicitly pressed.
* **Root Cause:** `syncPrintReport()` was not invoked inside the primary `recalculate()` loop.
* **Fix:** Added `syncPrintReport()` directly inside `recalculate()`.

---

## 3. Representative Calculator Verification Matrix

| Calculator | Category | First Load Export | Recalculate Export | Dark Mode Export | Table Rows in PDF | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SIP Calculator** | Finance | PASS | PASS | PASS (Forced Light) | Verified | ✅ WORKING |
| **EMI Calculator** | Finance | PASS | PASS | PASS (Forced Light) | Verified | ✅ WORKING |
| **Mortgage Calculator** | Finance | PASS | PASS | PASS (Forced Light) | Verified | ✅ WORKING |
| **Compound Interest** | Finance | PASS | PASS | PASS (Forced Light) | Verified | ✅ WORKING |
| **Income Tax 2026** | Finance | PASS | PASS | PASS (Forced Light) | Verified | ✅ WORKING |
| **Percentage Calculator**| Math | PASS | PASS | PASS (Forced Light) | Verified | ✅ WORKING |
| **BMI Calculator** | Health | PASS | PASS | PASS (Forced Light) | Verified | ✅ WORKING |
| **Age Calculator** | Everyday | PASS | PASS | PASS (Forced Light) | Verified | ✅ WORKING |
| **Unit Converter** | Utility | PASS | PASS | PASS (Forced Light) | N/A | ✅ WORKING |
| **France Frais Notaire** | Country | PASS | PASS | PASS (Forced Light) | Verified | ✅ WORKING |

---

## 4. Privacy & Performance Verification
* **Data Privacy:** 100% Client-Side. No calculator inputs or outputs are transmitted over the network or sent to third-party PDF rendering APIs.
* **Asset Optimization:** Zero external heavy canvas/wasm payloads. Uses standard browser print rasterization and client PDF download delegation.
