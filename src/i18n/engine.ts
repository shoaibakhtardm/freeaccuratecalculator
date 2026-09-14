// src/i18n/engine.ts
import type { SupportedLocale, TranslationKeys, TranslationDictionary } from '../types/i18n.ts';
import { LOCALE_CONFIGS } from './config.ts';
import { DICTIONARIES } from './dictionaries/index.ts';

/**
 * Type-safe translation accessor with fallback to English
 */
export function translate(
  locale: SupportedLocale,
  key: keyof TranslationKeys,
  replacements?: Record<string, string | number>
): string {
  const dict: TranslationDictionary = DICTIONARIES[locale] || DICTIONARIES.en;
  let text = dict[key] || DICTIONARIES.en[key] || (key as string);

  if (replacements) {
    for (const [placeholder, val] of Object.entries(replacements)) {
      text = text.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), String(val));
    }
  }

  return text;
}

/**
 * Factory for a localized translator function
 */
export function createTranslator(locale: SupportedLocale) {
  return (key: keyof TranslationKeys, replacements?: Record<string, string | number>) =>
    translate(locale, key, replacements);
}

/**
 * Format numbers using native browser/Node Intl.NumberFormat
 */
export function formatNumber(
  value: number,
  locale: SupportedLocale = 'en',
  options?: Intl.NumberFormatOptions
): string {
  if (isNaN(value) || !isFinite(value)) return '0';
  const cfg = LOCALE_CONFIGS[locale] || LOCALE_CONFIGS.en;
  try {
    return new Intl.NumberFormat(cfg.numberFormat, options).format(value);
  } catch (_) {
    return new Intl.NumberFormat('en-US', options).format(value);
  }
}

/**
 * Format currency using native Intl.NumberFormat
 */
export function formatCurrency(
  value: number,
  locale: SupportedLocale = 'en',
  currency?: string,
  decimals: number = 2
): string {
  if (isNaN(value) || !isFinite(value)) return '0';
  const cfg = LOCALE_CONFIGS[locale] || LOCALE_CONFIGS.en;
  const curr = currency || cfg.currency;
  try {
    return new Intl.NumberFormat(cfg.numberFormat, {
      style: 'currency',
      currency: curr,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  } catch (_) {
    return `${curr} ${formatNumber(value, locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
  }
}

/**
 * Format percentages using native Intl.NumberFormat
 */
export function formatPercent(
  value: number,
  locale: SupportedLocale = 'en',
  decimals: number = 2
): string {
  if (isNaN(value) || !isFinite(value)) return '0%';
  const cfg = LOCALE_CONFIGS[locale] || LOCALE_CONFIGS.en;
  try {
    return new Intl.NumberFormat(cfg.numberFormat, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value / 100);
  } catch (_) {
    return `${formatNumber(value, locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}%`;
  }
}

/**
 * Format dates using native Intl.DateTimeFormat
 */
export function formatDate(
  date: Date | number | string,
  locale: SupportedLocale = 'en',
  options?: Intl.DateTimeFormatOptions
): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  const cfg = LOCALE_CONFIGS[locale] || LOCALE_CONFIGS.en;
  try {
    return new Intl.DateTimeFormat(cfg.dateFormat, options).format(d);
  } catch (_) {
    return new Intl.DateTimeFormat('en-US', options).format(d);
  }
}

/**
 * Checks if a given locale is Right-to-Left (RTL)
 */
export function isRtlLocale(locale: SupportedLocale): boolean {
  return (LOCALE_CONFIGS[locale]?.dir || 'ltr') === 'rtl';
}
