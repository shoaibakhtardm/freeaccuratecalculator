# Production Changelog
**Website:** [freeaccuratecalculator.com](https://freeaccuratecalculator.com)  
**Date:** September 18, 2026  

---

## Changes Implemented & Verified

### 1. `src/styles/global.css`
- Refactored `@media print` rules:
  - Enforced `color-scheme: light !important`, `background-color: #ffffff !important`, and `color: #0f172a !important`.
  - Remapped CSS variables under `@media print .dark` to light semantic tokens (`--color-canvas: #ffffff`, `--color-ink: #0f172a`, `--color-hairline: #e2e8f0`).
  - Removed destructive `*, .dark * { border-color: #000000 !important; }` and blanket text flattening.
  - Added clean exclusion selectors for interactive components (`.fac-theme-toggle-btn`, `#master-social-proof`, `.history-drawer-container`, `.fac-clear-btn`, `.fac-kbd-shortcut`).

### 2. `src/layouts/Layout.astro`
- Updated `<head>` anti-FOUT dark mode script to set `document.documentElement.style.colorScheme` synchronously before first paint.
- Overhauled `window.generateAndDownloadPDF`:
  - Removed premature `setTimeout(restoreDarkMode, 300)` race condition.
  - Bound restoration to `afterprint` and window focus events with a long safety guard.

### 3. `src/components/ThemeToggle.astro`
- Updated `window.facToggleTheme` to synchronize `document.documentElement.style.colorScheme` alongside `.dark` class changes.
- Registered `document.addEventListener('astro:page-load', syncAllThemeButtons)` to maintain button state and ARIA attributes across Astro client navigation.

### 4. `src/pages/finance/income-tax-calculator.astro`
- Added continuous `syncPrintReport()` execution inside `recalculate()` loop so printable statement values stay in sync during live input adjustments.

### 5. `tests/pdf-and-theme-systems.test.mjs`
- Added 12 new automated test assertions covering PDF delegator contracts, print CSS rules, dedicated print view markup, anti-FOUT head scripts, theme toggle lifecycle, and search database integrity.

### 6. `package.json`
- Added `tests/pdf-and-theme-systems.test.mjs` to `npm test` script. Total automated tests increased to 297 (all passing).
