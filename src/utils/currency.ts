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

/**
 * Authoritative centralized exchange rate snapshot against base currency USD (1 USD = rate * Currency).
 *
 * HOW TO UPDATE VIA BUILD SCRIPT:
 * To refresh rates during automated CI/CD builds or nightly GitHub Actions workflows:
 * 1. Run a pre-build script (e.g., `node scripts/fetch-exchange-rates.mjs`).
 * 2. Fetch live benchmark rates from an authoritative free API (e.g., European Central Bank, open.er-api.com, or Frankfurter API).
 * 3. Write the updated JSON to `src/data/exchangeRates.json` or rewrite this `EXCHANGE_RATES` object.
 * 4. The static Astro build bundles the latest verified snapshot, ensuring sub-millisecond edge calculation without runtime third-party API dependencies or user privacy tracking.
 */
export const EXCHANGE_RATES: Record<string, number> = {
  USD: 1.0,
  INR: 83.95,
  EUR: 0.925,
  GBP: 0.785,
  CAD: 1.365,
  AUD: 1.515,
  JPY: 147.50,
  CNY: 7.12,
  SGD: 1.315,
  AED: 3.6725,
  SAR: 3.7510,
  CHF: 0.8520,
  NZD: 1.6350,
  ZAR: 18.25,
};

/**
 * Converts a monetary amount between any two supported currencies using the centralized EXCHANGE_RATES object.
 * Uses USD as the base normalization pivot:
 *   amountInUSD = amount / rate[fromCurrency]
 *   targetAmount = amountInUSD * rate[toCurrency]
 *
 * Safe against NaN, non-finite values, zero, and unknown currencies.
 */
export function convertCurrency(
  amount: number,
  fromCurrency: string = 'USD',
  toCurrency: string = 'USD',
  customRates?: Record<string, number>
): number {
  if (isNaN(amount) || !isFinite(amount)) return 0;
  if (amount === 0) return 0;

  const from = (fromCurrency || 'USD').toUpperCase();
  const to = (toCurrency || 'USD').toUpperCase();

  if (from === to) return amount;

  const rates = customRates || EXCHANGE_RATES;
  const fromRate = rates[from] ?? EXCHANGE_RATES[from];
  const toRate = rates[to] ?? EXCHANGE_RATES[to];

  if (!fromRate || !toRate) {
    console.warn(`Missing exchange rate for ${from} or ${to}. Returning original amount.`);
    return amount;
  }

  // 1. Normalize from source currency to USD base
  const amountInUSD = amount / fromRate;

  // 2. Convert from USD base to destination currency
  const converted = amountInUSD * toRate;

  return converted;
}

/**
 * Converts value between currencies using centralized EXCHANGE_RATES.
 * Adheres to rule #5: centralized conversion utility.
 */
export function convertValue(
  amount: number,
  fromCurrency: string = 'USD',
  toCurrency: string = 'USD',
  customRates?: Record<string, number>
): number {
  return convertCurrency(amount, fromCurrency, toCurrency, customRates);
}

export interface CurrencyConversionPromptResult {
  action: 'keep' | 'convert';
  value: number;
}

export interface CurrencyConversionPromptOptions {
  currentValue: number;
  previousCurrency: string;
  newCurrency: string;
  confirmFn?: (message: string) => boolean;
}

/**
 * Client-side logic pattern to prompt the user when country or currency changes:
 * "Keep numeric value (1,000) or convert equivalent value?"
 *
 * Client-side Astro implementation pattern:
 * ```astro
 * <script>
 *   import { promptCurrencyConversion } from '../../utils/currency';
 *   import { getCountryByCode } from '../../data/countries';
 *
 *   let activeCurrency = 'USD';
 *   const amountInput = document.getElementById('principal-input') as HTMLInputElement;
 *   const countrySelect = document.getElementById('country-select') as HTMLSelectElement;
 *
 *   countrySelect?.addEventListener('change', () => {
 *     const targetCountry = getCountryByCode(countrySelect.value);
 *     const currentVal = parseFloat(amountInput.value) || 0;
 *     const decision = promptCurrencyConversion({
 *       currentValue: currentVal,
 *       previousCurrency: activeCurrency,
 *       newCurrency: targetCountry.currency,
 *     });
 *
 *     amountInput.value = decision.value.toString();
 *     activeCurrency = targetCountry.currency;
 *     recalculate();
 *   });
 * </script>
 * ```
 */
export function promptCurrencyConversion(options: CurrencyConversionPromptOptions): CurrencyConversionPromptResult {
  const { currentValue, previousCurrency, newCurrency, confirmFn } = options;
  if (!currentValue || isNaN(currentValue) || !isFinite(currentValue) || previousCurrency === newCurrency) {
    return { action: 'keep', value: currentValue || 0 };
  }

  const converted = convertCurrency(currentValue, previousCurrency, newCurrency);
  const formattedConverted = Math.round(converted);

  const message = `Keep numeric value (${currentValue.toLocaleString()}) or convert equivalent value (${newCurrency} ${formattedConverted.toLocaleString()})?`;

  const shouldConvert = confirmFn
    ? confirmFn(message)
    : (typeof window !== 'undefined' && typeof window.confirm === 'function' ? window.confirm(message) : false);

  if (shouldConvert) {
    return { action: 'convert', value: formattedConverted };
  }
  return { action: 'keep', value: currentValue };
}

export { formatConvertedCurrency, getExchangeRateMetadata } from './currencyEngine.ts';

