// src/scripts/verify-i18n.ts
import { LOCALE_CONFIGS } from '../i18n/config.ts';
import { DICTIONARIES } from '../i18n/dictionaries/index.ts';
import {
  translate,
  formatNumber,
  formatCurrency,
  formatPercent,
  formatDate,
  isRtlLocale,
} from '../i18n/engine.ts';
import {
  COUNTRY_TO_LOCALE_MAP,
  resolveCountryLocale,
  resolveNavigatorLanguage,
} from '../i18n/autoDetect.ts';
import type { SupportedLocale } from '../types/i18n.ts';

const CORE_10: SupportedLocale[] = ['en', 'fr', 'de', 'es', 'ar', 'nl', 'pt', 'it', 'ru', 'ja'];

let errors = 0;

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${msg}`);
    errors++;
  } else {
    console.log(`✅ PASS: ${msg}`);
  }
}

console.log('=== TEST 1: CONFIGURATION OF 10 LOCALES ===');
for (const loc of CORE_10) {
  const cfg = LOCALE_CONFIGS[loc];
  assert(!!cfg, `Locale config exists for ${loc}`);
  assert(!!cfg.name && !!cfg.flag && !!cfg.currency, `Locale config fields valid for ${loc}`);
}

console.log('\n=== TEST 2: TRANSLATION DICTIONARY COMPLETENESS ===');
const enKeys = Object.keys(DICTIONARIES.en);
console.log(`Total translation keys per dictionary: ${enKeys.length}`);

for (const loc of CORE_10) {
  const dict = DICTIONARIES[loc];
  assert(!!dict, `Dictionary exists for ${loc}`);
  let missing = 0;
  for (const key of enKeys) {
    if (!dict[key as keyof typeof dict]) {
      missing++;
    }
  }
  assert(missing === 0, `Locale ${loc} has 0 missing keys (${enKeys.length}/${enKeys.length} complete)`);
}

console.log('\n=== TEST 3: RTL & LTR BEHAVIOR ===');
assert(isRtlLocale('ar') === true, 'Arabic is correctly identified as RTL');
assert(isRtlLocale('en') === false, 'English is correctly identified as LTR');
assert(isRtlLocale('ja') === false, 'Japanese is correctly identified as LTR');

console.log('\n=== TEST 4: INTL FORMATTING ACROSS 10 LOCALES ===');
for (const loc of CORE_10) {
  const num = formatNumber(1234567.89, loc);
  assert(num.length > 0, `formatNumber produces valid string for ${loc}: ${num}`);
  const curr = formatCurrency(1234.56, loc);
  assert(curr.length > 0, `formatCurrency produces valid string for ${loc}: ${curr}`);
}

console.log('\n=== TEST 5: COUNTRY & NAVIGATOR AUTO-DETECTION ===');
assert(resolveCountryLocale('FR').locale === 'fr', 'Country FR resolves to fr');
assert(resolveCountryLocale('DE').locale === 'de', 'Country DE resolves to de');
assert(resolveCountryLocale('SA').locale === 'ar', 'Country SA resolves to ar');
assert(resolveCountryLocale('JP').locale === 'ja', 'Country JP resolves to ja');
assert(resolveNavigatorLanguage('ja-JP') === 'ja', 'Navigator ja-JP resolves to ja');
assert(resolveNavigatorLanguage('es-ES') === 'es', 'Navigator es-ES resolves to es');

if (errors === 0) {
  console.log('\n🎉 ALL 10-LANGUAGE AUTO-LOCALIZATION ENGINE TESTS PASSED WITH 0 ERRORS!');
  process.exit(0);
} else {
  console.error(`\n💥 Total failures: ${errors}`);
  process.exit(1);
}
