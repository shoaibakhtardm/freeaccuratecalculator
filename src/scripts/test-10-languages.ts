// src/scripts/test-10-languages.ts
import { LOCALES, SUPPORTED_LOCALES, DEFAULT_LOCALE } from '../i18n/localeConfig';
import { getLanguageForCountry } from '../utils/countryLanguageMap';
import { formatNumber, formatCurrency, formatDate, loadTranslations, t } from '../utils/i18n';
import type { SupportedLocale, TranslationKeys } from '../types/i18n';

async function runValidation() {
  console.log('🚀 STARTING 10-LANGUAGE ENGINE TEST SUITE...\n');
  let failures = 0;

  function test(name: string, condition: boolean) {
    if (condition) {
      console.log(`✅ PASS: ${name}`);
    } else {
      console.error(`❌ FAIL: ${name}`);
      failures++;
    }
  }

  // 1. Locales count
  test('10 supported locales configured', SUPPORTED_LOCALES.length === 10);
  test('Default locale is English (en)', DEFAULT_LOCALE === 'en');

  // 2. Country Mapping
  test('Country FR -> fr', getLanguageForCountry('FR') === 'fr');
  test('Country DE -> de', getLanguageForCountry('DE') === 'de');
  test('Country ES -> es', getLanguageForCountry('ES') === 'es');
  test('Country SA -> ar', getLanguageForCountry('SA') === 'ar');
  test('Country NL -> nl', getLanguageForCountry('NL') === 'nl');
  test('Country BR -> pt', getLanguageForCountry('BR') === 'pt');
  test('Country IT -> it', getLanguageForCountry('IT') === 'it');
  test('Country RU -> ru', getLanguageForCountry('RU') === 'ru');
  test('Country JP -> ja', getLanguageForCountry('JP') === 'ja');
  test('Unknown country defaults to en', getLanguageForCountry('XYZ') === 'en');

  // 3. Formatters
  test('formatNumber fr', formatNumber(1234.56, 'fr').includes('1') && formatNumber(1234.56, 'fr').includes('234'));
  test('formatCurrency ja', formatCurrency(1000, 'ja').includes('1,000') || formatCurrency(1000, 'ja').includes('1000'));
  test('formatDate de', formatDate(new Date(2026, 0, 1), 'de').includes('2026'));

  // 4. RTL
  test('Arabic dir is rtl', LOCALES.ar.dir === 'rtl');
  test('English dir is ltr', LOCALES.en.dir === 'ltr');

  // 5. Check all 10 JSON dictionaries
  const baseEn = await loadTranslations('en');
  const expectedKeys = Object.keys(baseEn);
  console.log(`\nBase dictionary (en) has ${expectedKeys.length} keys.`);

  for (const locale of SUPPORTED_LOCALES) {
    const dict = await loadTranslations(locale as SupportedLocale);
    const keys = Object.keys(dict);
    const missing = expectedKeys.filter((k) => !dict[k]);
    test(`Locale ${locale}.json has all ${expectedKeys.length} keys (missing: ${missing.length})`, missing.length === 0);
  }

  console.log('\n----------------------------------------');
  if (failures === 0) {
    console.log('🎉 ALL TESTS PASSED! 10/10 LOCALIZATION ENGINE READY.');
  } else {
    console.error(`💥 ${failures} TESTS FAILED.`);
    process.exit(1);
  }
}

runValidation().catch((err) => {
  console.error('Fatal error during validation:', err);
  process.exit(1);
});
