// src/i18n/autoDetect.ts
import type { SupportedLocale } from '../types/i18n.ts';
import { LOCALE_CONFIGS } from './config.ts';

export interface GeoLocationResult {
  countryCode: string;
  countryName?: string;
  recommendedLocale: SupportedLocale;
  currency: string;
  source: 'cache' | 'cf-header' | 'ip-api' | 'navigator' | 'fallback';
}

/**
 * ISO-3166-1 alpha-2 Country Code to SupportedLocale and Currency mapping
 */
export const COUNTRY_TO_LOCALE_MAP: Record<string, { locale: SupportedLocale; currency: string }> = {
  // English
  US: { locale: 'en', currency: 'USD' },
  GB: { locale: 'en', currency: 'GBP' },
  CA: { locale: 'en', currency: 'CAD' },
  AU: { locale: 'en', currency: 'AUD' },
  NZ: { locale: 'en', currency: 'NZD' },
  IE: { locale: 'en', currency: 'EUR' },
  IN: { locale: 'en', currency: 'INR' },
  ZA: { locale: 'en', currency: 'ZAR' },
  SG: { locale: 'en', currency: 'SGD' },
  PH: { locale: 'en', currency: 'PHP' },

  // French
  FR: { locale: 'fr', currency: 'EUR' },
  BE: { locale: 'fr', currency: 'EUR' },
  SN: { locale: 'fr', currency: 'XOF' },
  CI: { locale: 'fr', currency: 'XOF' },
  CM: { locale: 'fr', currency: 'XAF' },
  CD: { locale: 'fr', currency: 'CDF' },
  MG: { locale: 'fr', currency: 'MGA' },

  // German
  DE: { locale: 'de', currency: 'EUR' },
  AT: { locale: 'de', currency: 'EUR' },
  CH: { locale: 'de', currency: 'CHF' },
  LU: { locale: 'de', currency: 'EUR' },
  LI: { locale: 'de', currency: 'CHF' },

  // Spanish
  ES: { locale: 'es', currency: 'EUR' },
  MX: { locale: 'es', currency: 'MXN' },
  AR: { locale: 'es', currency: 'ARS' },
  CO: { locale: 'es', currency: 'COP' },
  CL: { locale: 'es', currency: 'CLP' },
  PE: { locale: 'es', currency: 'PEN' },
  VE: { locale: 'es', currency: 'VES' },
  EC: { locale: 'es', currency: 'USD' },
  GT: { locale: 'es', currency: 'GTQ' },
  CU: { locale: 'es', currency: 'CUP' },
  DO: { locale: 'es', currency: 'DOP' },

  // Arabic
  SA: { locale: 'ar', currency: 'SAR' },
  AE: { locale: 'ar', currency: 'AED' },
  EG: { locale: 'ar', currency: 'EGP' },
  QA: { locale: 'ar', currency: 'QAR' },
  KW: { locale: 'ar', currency: 'KWD' },
  OM: { locale: 'ar', currency: 'OMR' },
  BH: { locale: 'ar', currency: 'BHD' },
  JO: { locale: 'ar', currency: 'JOD' },
  LB: { locale: 'ar', currency: 'LBP' },
  IQ: { locale: 'ar', currency: 'IQD' },
  MA: { locale: 'ar', currency: 'MAD' },
  DZ: { locale: 'ar', currency: 'DZD' },
  TN: { locale: 'ar', currency: 'TND' },

  // Dutch
  NL: { locale: 'nl', currency: 'EUR' },
  SR: { locale: 'nl', currency: 'SRD' },

  // Portuguese
  BR: { locale: 'pt', currency: 'BRL' },
  PT: { locale: 'pt', currency: 'EUR' },
  AO: { locale: 'pt', currency: 'AOA' },
  MZ: { locale: 'pt', currency: 'MZN' },

  // Italian
  IT: { locale: 'it', currency: 'EUR' },
  SM: { locale: 'it', currency: 'EUR' },
  VA: { locale: 'it', currency: 'EUR' },

  // Russian
  RU: { locale: 'ru', currency: 'RUB' },
  BY: { locale: 'ru', currency: 'BYN' },
  KZ: { locale: 'ru', currency: 'KZT' },
  KG: { locale: 'ru', currency: 'KGS' },
  UZ: { locale: 'ru', currency: 'UZS' },

  // Japanese
  JP: { locale: 'ja', currency: 'JPY' },
};

/**
 * Resolves country code to SupportedLocale and Currency
 */
export function resolveCountryLocale(countryCode?: string): { locale: SupportedLocale; currency: string } {
  if (!countryCode) return { locale: 'en', currency: 'USD' };
  const upper = countryCode.trim().toUpperCase();
  if (COUNTRY_TO_LOCALE_MAP[upper]) {
    return COUNTRY_TO_LOCALE_MAP[upper];
  }
  return { locale: 'en', currency: 'USD' };
}

/**
 * Resolves browser navigator language tag (e.g., 'es-MX', 'fr', 'ja') to SupportedLocale
 */
export function resolveNavigatorLanguage(langTag?: string): SupportedLocale {
  if (!langTag) return 'en';
  const prefix = langTag.split('-')[0].toLowerCase();
  const supported: SupportedLocale[] = ['en', 'fr', 'de', 'es', 'ar', 'nl', 'pt', 'it', 'ru', 'ja'];
  if (supported.includes(prefix as SupportedLocale)) {
    return prefix as SupportedLocale;
  }
  return 'en';
}

/**
 * Client-Side Auto-Detection Engine (Zero Cost, Free IP APIs with Fallback Chain)
 */
export async function detectUserLocaleClient(): Promise<GeoLocationResult> {
  // 1. Check local storage cache
  try {
    const cachedLocale = localStorage.getItem('fac_locale') as SupportedLocale;
    const cachedCountry = localStorage.getItem('fac_country');
    if (cachedLocale && LOCALE_CONFIGS[cachedLocale]) {
      return {
        countryCode: cachedCountry || 'US',
        recommendedLocale: cachedLocale,
        currency: LOCALE_CONFIGS[cachedLocale].currency,
        source: 'cache',
      };
    }
  } catch (_) {}

  // 2. Try Free IP API 1: country.is (Fast, lightweight zero-cost endpoint)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch('https://api.country.is/', { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data && data.country) {
        const mapping = resolveCountryLocale(data.country);
        return {
          countryCode: data.country,
          recommendedLocale: mapping.locale,
          currency: mapping.currency,
          source: 'ip-api',
        };
      }
    }
  } catch (_) {}

  // 3. Try Free IP API 2: ipapi.co/json/
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data && data.country_code) {
        const mapping = resolveCountryLocale(data.country_code);
        return {
          countryCode: data.country_code,
          countryName: data.country_name,
          recommendedLocale: mapping.locale,
          currency: data.currency || mapping.currency,
          source: 'ip-api',
        };
      }
    }
  } catch (_) {}

  // 4. Fallback to Browser Navigator
  if (typeof navigator !== 'undefined' && navigator.language) {
    const navLocale = resolveNavigatorLanguage(navigator.language);
    return {
      countryCode: 'GLOBAL',
      recommendedLocale: navLocale,
      currency: LOCALE_CONFIGS[navLocale].currency,
      source: 'navigator',
    };
  }

  // 5. Absolute fallback
  return {
    countryCode: 'US',
    recommendedLocale: 'en',
    currency: 'USD',
    source: 'fallback',
  };
}
