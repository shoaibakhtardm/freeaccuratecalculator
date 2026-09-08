// src/data/currencies.ts

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  flag: string;
  locale: string;
  isIndian?: boolean;
  decimals?: number;
}

export const CURRENCIES: Record<string, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', locale: 'en-US', decimals: 2 },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳', locale: 'en-IN', isIndian: true, decimals: 2 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', locale: 'de-DE', decimals: 2 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧', locale: 'en-GB', decimals: 2 },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦', locale: 'en-CA', decimals: 2 },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺', locale: 'en-AU', decimals: 2 },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵', locale: 'ja-JP', decimals: 0 },
  CNY: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳', locale: 'zh-CN', decimals: 2 },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬', locale: 'en-SG', decimals: 2 },
  AED: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪', locale: 'ar-AE', decimals: 2 },
  SAR: { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal', flag: '🇸🇦', locale: 'ar-SA', decimals: 2 },
  CHF: { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', flag: '🇨🇭', locale: 'de-CH', decimals: 2 },
  NZD: { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', flag: '🇳🇿', locale: 'en-NZ', decimals: 2 },
  ZAR: { code: 'ZAR', symbol: 'R', name: 'South African Rand', flag: '🇿🇦', locale: 'en-ZA', decimals: 2 },
};

export const DEFAULT_CURRENCY = 'USD';

export const CURRENCY_LIST = Object.values(CURRENCIES);
