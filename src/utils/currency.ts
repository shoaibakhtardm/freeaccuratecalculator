// src/utils/currency.ts
import { CURRENCIES, DEFAULT_CURRENCY, type CurrencyInfo } from '../data/currencies.ts';

/**
 * Safe currency metadata lookup with fallback to default (USD)
 */
export function getCurrency(code?: string | null): CurrencyInfo {
  if (!code) return CURRENCIES[DEFAULT_CURRENCY];
  const upper = code.toUpperCase();
  return CURRENCIES[upper] || CURRENCIES[DEFAULT_CURRENCY];
}

/**
 * Returns currency symbol for a given ISO code
 */
export function getCurrencySymbol(code?: string | null): string {
  return getCurrency(code).symbol;
}

/**
 * Intelligent pure client-side browser locale detection.
 * Inspects navigator.languages without any external IP or network calls.
 */
export function detectBrowserCurrency(preferredLocales?: readonly string[]): string {
  const locales = preferredLocales && preferredLocales.length > 0
    ? preferredLocales
    : typeof navigator !== 'undefined'
      ? (navigator.languages && navigator.languages.length > 0 ? navigator.languages : [navigator.language || ''])
      : ['en-US'];

  for (const rawLocale of locales) {
    if (!rawLocale) continue;
    const loc = rawLocale.toLowerCase().trim();

    // Direct country matches
    if (loc.endsWith('-in') || loc.includes('-in-') || loc === 'hi' || loc.startsWith('hi-')) {
      return 'INR';
    }
    if (loc.endsWith('-gb') || loc.endsWith('-uk')) {
      return 'GBP';
    }
    if (loc.endsWith('-ca')) {
      return 'CAD';
    }
    if (loc.endsWith('-au')) {
      return 'AUD';
    }
    if (loc.endsWith('-jp') || loc === 'ja' || loc.startsWith('ja-')) {
      return 'JPY';
    }
    if (loc.endsWith('-cn') || loc === 'zh-cn') {
      return 'CNY';
    }
    if (loc.endsWith('-sg')) {
      return 'SGD';
    }
    if (loc.endsWith('-ae') || loc === 'ar-ae') {
      return 'AED';
    }
    if (loc.endsWith('-sa') || loc === 'ar-sa') {
      return 'SAR';
    }
    if (loc.endsWith('-ch')) {
      return 'CHF';
    }
    if (loc.endsWith('-nz')) {
      return 'NZD';
    }
    if (loc.endsWith('-za')) {
      return 'ZAR';
    }
    if (loc.endsWith('-us')) {
      return 'USD';
    }

    // Eurozone countries
    if (
      loc.endsWith('-de') || loc === 'de' ||
      loc.endsWith('-fr') || loc === 'fr' ||
      loc.endsWith('-es') || loc === 'es' ||
      loc.endsWith('-it') || loc === 'it' ||
      loc.endsWith('-nl') || loc === 'nl' ||
      loc.endsWith('-be') || loc.endsWith('-at') ||
      loc.endsWith('-ie') || loc.endsWith('-pt') ||
      loc.endsWith('-fi') || loc.endsWith('-gr')
    ) {
      return 'EUR';
    }
  }

  return DEFAULT_CURRENCY;
}

/**
 * Format numeric value with appropriate currency grouping & decimals using Intl.NumberFormat.
 * Specifically supports Indian Lakh/Crore grouping for INR.
 */
export function formatCurrency(
  val: number,
  currencyCode?: string | null,
  options: { decimals?: number; showSymbol?: boolean } = {}
): string {
  if (isNaN(val) || !isFinite(val)) return '0';

  const currency = getCurrency(currencyCode);
  const decimals = options.decimals !== undefined ? options.decimals : (currency.decimals ?? 2);
  const showSymbol = options.showSymbol !== undefined ? options.showSymbol : true;

  let formattedNumber = '';

  try {
    const formatter = new Intl.NumberFormat(currency.locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    formattedNumber = formatter.format(val);
  } catch (_) {
    // Fallback if locale not supported
    formattedNumber = val.toFixed(decimals);
  }

  if (!showSymbol) {
    return formattedNumber;
  }

  // Symbol placement: most currencies prefix, some suffix or space
  return `${currency.symbol} ${formattedNumber}`.trim();
}
