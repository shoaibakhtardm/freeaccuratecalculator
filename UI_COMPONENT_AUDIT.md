# UI Component Forensic Audit Report
**Website:** [freeaccuratecalculator.com](https://freeaccuratecalculator.com)  
**Date:** September 18, 2026  

---

## 1. Component State & Accessibility Matrix

| Component | Touch Target (>=44px) | Focus Visible | Dark Mode Contrast | Mobile Viewport Safety | ARIA Accessibility |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Main Header** (`Header.astro`) | PASS (44px mobile) | PASS | PASS | PASS (zero overflow) | Semantic `<header>`, `<nav>` |
| **Theme Toggle** (`ThemeToggle.astro`) | PASS (44px mobile) | PASS (indigo ring) | PASS | PASS | `aria-pressed`, `aria-label` |
| **Search Autocomplete** (`AutocompleteSearch.astro`) | PASS | PASS (ring-1) | PASS (dark popup) | PASS (adaptive width) | `role="listbox"`, `role="option"` |
| **Master Calculator Box** (`MasterCalculatorWrapper.astro`)| PASS (44px inputs) | PASS | PASS (elevated card)| PASS (responsive grid) | `aria-live="polite"` results |
| **Action Toolbar Buttons** (Copy, Share, PDF) | PASS (min 40-44px) | PASS | PASS | PASS (flex wrapping) | Tooltip titles & icons |
| **Schedule Table Container** | PASS (scrollable) | PASS | PASS | PASS (horizontal scroll)| Structured `<thead>` & `<tbody>` |
| **Language Selectors** | PASS | PASS | PASS | PASS | Valid `<select>` & button toggles |
| **Footer Navigation** (`Footer.astro`) | PASS (44-56px boxes)| PASS | PASS | PASS (multi-tier grid) | Semantic `<footer>`, `<nav>` |

---

## 2. Responsive Viewport Testing (Chromium & WebKit Emulation)

* **Mobile 320px – 375px (iPhone SE / Small Android):**
  - Header controls maintain horizontal breathing room with zero text clipping.
  - Autocomplete search fits within viewport padding without horizontal scrolling.
  - Calculator input steppers, sliders, and buttons satisfy 44px min-height guidelines.
* **Tablet 768px – 1024px (iPad / Foldables):**
  - Sidebars wrap cleanly beneath main calculator card or pin correctly without overlap.
  - Donut charts and progress bars scale proportionally.
* **Desktop 1280px – 1920px (4K / Ultrawide):**
  - Containers cap at `max-w-7xl` with centered auto margins and crisp typography.
