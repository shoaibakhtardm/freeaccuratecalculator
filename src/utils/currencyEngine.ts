// src/utils/currencyEngine.ts
import { EXCHANGE_RATE_SNAPSHOT } from '../data/exchangeRates.ts';
import { getCurrency, formatCurrency } from './currency.ts';

/**
 * Converts a monetary amount between any two supported currencies.
 * Uses USD as the base normalization pivot.
 * Direction:
 *   amountInUSD = amount / rate[fromCurrency]
 *   targetAmount = amountInUSD * rate[toCurrency]
 *
 * Example:
 *   USD -> INR: 1000 / 1.0 * 83.95 = 83,950 INR
 *   INR -> USD: 83950 / 83.95 * 1.0 = 1000 USD
 *   AED -> INR: 1000 / 3.6725 * 83.95 = 22,859.087... INR
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

  const rates = customRates || EXCHANGE_RATE_SNAPSHOT.rates;
  const fromRate = rates[from];
  const toRate = rates[to];

  if (!fromRate || !toRate) {
    console.warn(`Missing exchange rate for ${from} or ${to}. Returning original amount.`);
    return amount;
  }

  // 1. Normalize from source currency to USD base
  const amountInUSD = amount / fromRate;

  // 2. Convert from USD base to destination currency
  const converted = amountInUSD * toRate;

  // 3. Return full precision internal value; rounding should occur at presentation layer
  return converted;
}

/**
 * Formats a converted monetary amount with proper locale grouping and currency symbol.
 */
export function formatConvertedCurrency(
  amount: number,
  fromCurrency: string = 'USD',
  toCurrency: string = 'USD',
  options: { decimals?: number; showSymbol?: boolean } = {}
): string {
  const converted = convertCurrency(amount, fromCurrency, toCurrency);
  return formatCurrency(converted, toCurrency, options);
}

/**
 * Returns exchange rate metadata for transparency.
 */
export function getExchangeRateMetadata() {
  return {
    base: EXCHANGE_RATE_SNAPSHOT.base,
    timestamp: EXCHANGE_RATE_SNAPSHOT.timestamp,
    source: EXCHANGE_RATE_SNAPSHOT.source,
    verifiedAt: EXCHANGE_RATE_SNAPSHOT.verifiedAt,
    notes: EXCHANGE_RATE_SNAPSHOT.notes,
  };
}
