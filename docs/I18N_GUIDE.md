# 🌍 Internationalization (i18n) Guide

## Overview
Free Accurate Calculator features a zero-cost, infinitely scalable localization engine supporting 10 global languages with automatic country detection, full content translation, Right-to-Left (RTL) layout support, and enterprise SEO hreflang integration.

---

## 🌐 Supported Languages (Core 10)

| Flag | Language | Code | Native Name | Direction | Default Currency | Number Format |
| :--: | :------- | :--: | :---------- | :-------: | :--------------: | :------------ |
| 🇺🇸 | English | `en` | English | LTR | `USD` | `en-US` |
| 🇫🇷 | French | `fr` | Français | LTR | `EUR` | `fr-FR` |
| 🇩🇪 | German | `de` | Deutsch | LTR | `EUR` | `de-DE` |
| 🇪🇸 | Spanish | `es` | Español | LTR | `EUR` | `es-ES` |
| 🇸🇦 | Arabic | `ar` | العربية | **RTL** | `SAR` | `ar-SA` |
| 🇳🇱 | Dutch | `nl` | Nederlands | LTR | `EUR` | `nl-NL` |
| 🇵🇹 | Portuguese | `pt` | Português | LTR | `EUR` | `pt-PT` |
| 🇮🇹 | Italian | `it` | Italiano | LTR | `EUR` | `it-IT` |
| 🇷🇺 | Russian | `ru` | Русский | LTR | `RUB` | `ru-RU` |
| 🇯🇵 | Japanese | `ja` | 日本語 | LTR | `JPY` | `ja-JP` |

---

## ⚡ How to Add an 11th Language in < 5 Minutes

### Step 1: Update Types
In `src/types/i18n.ts`, append the new locale code to `SupportedLocale`:
```typescript
export type SupportedLocale = 'en' | 'fr' | 'de' | 'es' | 'ar' | 'nl' | 'pt' | 'it' | 'ru' | 'ja' | 'zh';
```

### Step 2: Register Locale in `src/i18n/localeConfig.ts`
Add the locale configuration definition to `LOCALES`:
```typescript
zh: {
  code: 'zh',
  name: '中文',
  englishName: 'Chinese',
  flag: '🇨🇳',
  dir: 'ltr',
  dateFormat: 'zh-CN',
  numberFormat: 'zh-CN',
  currency: 'CNY',
},
```

### Step 3: Create Translation Dictionary
Create `src/i18n/locales/zh.json` containing the 58 keys (copying from `en.json` and translating):
```json
{
  "nav.home": "首页",
  "nav.finance": "金融计算",
  "ui.calculate": "计算",
  ...
}
```

### Step 4: Map Country Codes in `src/utils/countryLanguageMap.ts`
Map the corresponding ISO country codes:
```typescript
// In COUNTRY_TO_LANGUAGE:
CN: 'zh', TW: 'zh', HK: 'zh',
```

### Step 5: Update `astro.config.mjs`
Add `'zh'` to both `i18n.locales` and `sitemap.i18n.locales`:
```javascript
locales: ['en', 'fr', 'de', 'es', 'ar', 'nl', 'pt', 'it', 'ru', 'ja', 'zh'],
```

---

## 🛠️ Architecture & Usage

### 1. Translation in Astro Components (Server & Prerender)
```astro
---
import { t } from '../utils/i18n';
const calculateLabel = await t('fr', 'ui.calculate');
---
<button>{calculateLabel}</button>
```

### 2. Translation in Client Scripts
```typescript
import { tClient } from '../utils/i18n';
const copiedText = tClient('ui.copied');
```

### 3. Number, Currency & Date Formatting
```typescript
import { formatNumber, formatCurrency, formatDate } from '../utils/i18n';

formatNumber(1234567.89, 'de');     // "1.234.567,89"
formatCurrency(500, 'fr');          // "500,00 €"
formatCurrency(1000, 'ja');         // "￥1,000"
formatDate(new Date(), 'ar');       // Localized Arabic date
```

### 4. Zero-Cost Auto-Detection Flow
1. **Manual Preference:** If user clicked a language before (`fac_manual_locale_selection: true`), user choice is strictly respected.
2. **Local Cache:** Checked in `localStorage.getItem('fac_preferred_locale')`.
3. **Free IP API:** Query `https://ipapi.co/json/` with 3-second timeout fallback.
4. **Browser Fallback:** `navigator.language` resolves to primary language tag.
5. **Default Fallback:** English (`en`).

### 5. Right-to-Left (RTL) Design Rules
- Arabic (`ar`) automatically applies `dir="rtl"` to `<html>` and `.rtl-layout` to `<body>`.
- Mirrorable directional icons (arrows, chevrons) reverse with CSS mirroring.
- Numbers and mathematical equations are isolated with `direction: ltr; unicode-bidi: plaintext;` to ensure calculations render in standard algebraic order without reversed digits.

---

## 🔍 SEO & Verification
- Every page emits 10 canonical `<link rel="alternate" hreflang="..." />` tags plus `x-default`.
- Localized XML sitemaps are automatically generated via `@astrojs/sitemap`.
- End-to-end verification script is runnable at any time via:
```bash
npx tsx src/scripts/test-10-languages.ts
```
