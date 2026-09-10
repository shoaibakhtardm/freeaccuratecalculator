// src/i18n/utils.ts
import {
  DEFAULT_LOCALE,
  LOCALES,
  isValidLocale,
  getLocaleConfig,
  getLocaleDirection,
  isRTL,
  ALL_SUPPORTED_LOCALES,
  type SupportedLocale,
} from './config.ts';
import type { TranslationDictionary } from './schema.ts';
import { en } from './locales/en.ts';
import { fr } from './locales/fr.ts';
import { de } from './locales/de.ts';
import { es } from './locales/es.ts';
import { ar } from './locales/ar.ts';
import { nl } from './locales/nl.ts';
import { pt } from './locales/pt.ts';
import { it } from './locales/it.ts';
import { ru } from './locales/ru.ts';
import { ja } from './locales/ja.ts';
import { hi } from './locales/hi.ts';
import { zh } from './locales/zh.ts';

export const DICTIONARIES: Record<SupportedLocale, TranslationDictionary> = {
  en,
  fr,
  de,
  es,
  ar,
  nl,
  pt,
  it,
  ru,
  ja,
  hi,
  zh,
};

/**
 * Extracts supported locale from URL or pathname.
 */
export function getLangFromUrl(url: URL | string): SupportedLocale {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const match = pathname.match(/^\/([a-z]{2})(\/|$)/i);
  if (match) {
    const candidate = match[1].toLowerCase();
    if (isValidLocale(candidate)) {
      return candidate;
    }
  }
  return DEFAULT_LOCALE;
}

/**
 * Gets a nested translation value by dot notation key path (e.g., "nav.finance", "calculators.emi.monthlyEmi").
 * Falls back to English if key is missing or undefined in the target locale.
 */
export function getTranslation(lang: string = DEFAULT_LOCALE, keyPath: string): string {
  const targetLocale = isValidLocale(lang) ? lang : DEFAULT_LOCALE;
  const dict = DICTIONARIES[targetLocale];
  const enDict = DICTIONARIES[DEFAULT_LOCALE];

  function resolve(obj: any, path: string): any {
    return path.split('.').reduce((prev, curr) => (prev && prev[curr] !== undefined ? prev[curr] : undefined), obj);
  }

  const val = resolve(dict, keyPath);
  if (typeof val === 'string' && val.length > 0) return val;

  const fallbackVal = resolve(enDict, keyPath);
  if (typeof fallbackVal === 'string' && fallbackVal.length > 0) return fallbackVal;

  return keyPath;
}

/**
 * Returns a translation function bound to a specific locale.
 */
export function useTranslations(lang: string = DEFAULT_LOCALE) {
  const activeLang = isValidLocale(lang) ? lang : DEFAULT_LOCALE;
  return function t(key: string, replacements?: Record<string, string>): string {
    let text = getTranslation(activeLang, key);
    if (replacements) {
      for (const [placeholder, replacement] of Object.entries(replacements)) {
        text = text.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), replacement);
      }
    }
    return text;
  };
}

/**
 * Returns a localized path for a given route and target locale.
 * - For defaultLocale ('en'): strips locale prefix -> /finance/emi-calculator/
 * - For non-default: prefixes target locale -> /es/finance/emi-calculator/
 */
export function getLocalizedPath(pathname: string, targetLocale: string = DEFAULT_LOCALE): string {
  const activeLocale = isValidLocale(targetLocale) ? targetLocale : DEFAULT_LOCALE;

  // Strip any existing locale prefix
  const cleanPath = pathname.replace(/^\/([a-z]{2})(\/|$)/i, '/');
  const normalized = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;

  if (activeLocale === DEFAULT_LOCALE) {
    return normalized.endsWith('/') || normalized.includes('.') ? normalized : `${normalized}/`;
  }

  const result = `/${activeLocale}${normalized === '/' ? '/' : normalized}`;
  return result.endsWith('/') || result.includes('.') ? result : `${result}/`;
}

/**
 * Formats numbers according to locale-specific conventions (decimals, thousand delimiters).
 */
export function formatLocaleNumber(
  value: number,
  lang: string = DEFAULT_LOCALE,
  options?: Intl.NumberFormatOptions
): string {
  if (isNaN(value) || !isFinite(value)) return '0';
  const config = getLocaleConfig(lang);
  try {
    return new Intl.NumberFormat(config.numberLocale, options).format(value);
  } catch (_) {
    return new Intl.NumberFormat('en-US', options).format(value);
  }
}

export {
  DEFAULT_LOCALE,
  LOCALES,
  ALL_SUPPORTED_LOCALES,
  isValidLocale,
  getLocaleConfig,
  getLocaleDirection,
  isRTL,
};
