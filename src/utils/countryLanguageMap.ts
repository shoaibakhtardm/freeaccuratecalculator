import type { SupportedLocale } from '../types/i18n';
import { DEFAULT_LOCALE } from '../i18n/localeConfig';

export const COUNTRY_TO_LANGUAGE: Record<string, SupportedLocale> = {
  // English
  US: 'en', GB: 'en', AU: 'en', CA: 'en', NZ: 'en', IE: 'en', ZA: 'en', IN: 'en', SG: 'en', PH: 'en', NG: 'en', KE: 'en',
  // French
  FR: 'fr', BE: 'fr', CH: 'fr', MC: 'fr', LU: 'fr',
  // German
  DE: 'de', AT: 'de', LI: 'de',
  // Spanish
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es', EC: 'es', GT: 'es', CU: 'es', BO: 'es', DO: 'es', HN: 'es', PY: 'es', SV: 'es', NI: 'es', CR: 'es', PA: 'es', UY: 'es',
  // Arabic
  SA: 'ar', AE: 'ar', EG: 'ar', QA: 'ar', KW: 'ar', BH: 'ar', OM: 'ar', JO: 'ar', LB: 'ar', IQ: 'ar', SY: 'ar', YE: 'ar', LY: 'ar', TN: 'ar', DZ: 'ar', MA: 'ar', SD: 'ar',
  // Dutch
  NL: 'nl', SR: 'nl',
  // Portuguese
  PT: 'pt', BR: 'pt', AO: 'pt', MZ: 'pt',
  // Italian
  IT: 'it', SM: 'it', VA: 'it',
  // Russian
  RU: 'ru', BY: 'ru', KZ: 'ru', KG: 'ru',
  // Japanese
  JP: 'ja',
  // Chinese
  CN: 'zh', TW: 'zh', HK: 'zh',
};

export function getLanguageForCountry(countryCode: string): SupportedLocale {
  return COUNTRY_TO_LANGUAGE[countryCode.toUpperCase()] || DEFAULT_LOCALE;
}
