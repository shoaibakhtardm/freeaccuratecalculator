// src/utils/silentCurrency.ts

export interface CurrencyMeta {
  code: string;
  symbol: string;
  locale: string;
  numberSystem: 'lakh-crore' | 'international';
}

export const COUNTRY_CURRENCY_MAP: Record<string, CurrencyMeta> = {
  india: { code: 'INR', symbol: '₹', locale: 'en-IN', numberSystem: 'lakh-crore' },
  'united-states': { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  'united-kingdom': { code: 'GBP', symbol: '£', locale: 'en-GB', numberSystem: 'international' },
  canada: { code: 'CAD', symbol: 'C$', locale: 'en-CA', numberSystem: 'international' },
  australia: { code: 'AUD', symbol: 'A$', locale: 'en-AU', numberSystem: 'international' },
  'united-arab-emirates': { code: 'AED', symbol: 'د.إ', locale: 'en-AE', numberSystem: 'international' },
  germany: { code: 'EUR', symbol: '€', locale: 'de-DE', numberSystem: 'international' },
  france: { code: 'EUR', symbol: '€', locale: 'fr-FR', numberSystem: 'international' },
  singapore: { code: 'SGD', symbol: 'S$', locale: 'en-SG', numberSystem: 'international' },
  ireland: { code: 'EUR', symbol: '€', locale: 'en-IE', numberSystem: 'international' },
  netherlands: { code: 'EUR', symbol: '€', locale: 'nl-NL', numberSystem: 'international' },
  'new-zealand': { code: 'NZD', symbol: 'NZ$', locale: 'en-NZ', numberSystem: 'international' },
  'saudi-arabia': { code: 'SAR', symbol: 'ر.س', locale: 'ar-SA', numberSystem: 'international' },
  switzerland: { code: 'CHF', symbol: 'CHF', locale: 'de-CH', numberSystem: 'international' },
  'south-africa': { code: 'ZAR', symbol: 'R', locale: 'en-ZA', numberSystem: 'international' },
  japan: { code: 'JPY', symbol: '¥', locale: 'ja-JP', numberSystem: 'international' },
  spain: { code: 'EUR', symbol: '€', locale: 'es-ES', numberSystem: 'international' },
  italy: { code: 'EUR', symbol: '€', locale: 'it-IT', numberSystem: 'international' },
  sweden: { code: 'EUR', symbol: '€', locale: 'sv-SE', numberSystem: 'international' },
  norway: { code: 'EUR', symbol: '€', locale: 'nb-NO', numberSystem: 'international' },
  denmark: { code: 'EUR', symbol: '€', locale: 'da-DK', numberSystem: 'international' },
  poland: { code: 'EUR', symbol: '€', locale: 'pl-PL', numberSystem: 'international' },
  austria: { code: 'EUR', symbol: '€', locale: 'de-AT', numberSystem: 'international' },
  belgium: { code: 'EUR', symbol: '€', locale: 'nl-BE', numberSystem: 'international' },
  portugal: { code: 'EUR', symbol: '€', locale: 'pt-PT', numberSystem: 'international' },
  finland: { code: 'EUR', symbol: '€', locale: 'fi-FI', numberSystem: 'international' },
  greece: { code: 'EUR', symbol: '€', locale: 'el-GR', numberSystem: 'international' },
  'czech-republic': { code: 'EUR', symbol: '€', locale: 'cs-CZ', numberSystem: 'international' },
  hungary: { code: 'EUR', symbol: '€', locale: 'hu-HU', numberSystem: 'international' },
  romania: { code: 'EUR', symbol: '€', locale: 'ro-RO', numberSystem: 'international' },
  brazil: { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  mexico: { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  'south-korea': { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  turkey: { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  malaysia: { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  philippines: { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  indonesia: { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  thailand: { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  vietnam: { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  egypt: { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  nigeria: { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  kenya: { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  chile: { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  colombia: { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  argentina: { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  qatar: { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  kuwait: { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  oman: { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  bahrain: { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  israel: { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  'hong-kong': { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
  taiwan: { code: 'USD', symbol: '$', locale: 'en-US', numberSystem: 'international' },
};

export const DEFAULT_CURRENCY: CurrencyMeta = {
  code: 'USD',
  symbol: '$',
  locale: 'en-US',
  numberSystem: 'international',
};

/**
 * Resolves currency purely from URL context or storage silently without any user notifications or alerts.
 */
export function resolveSilentCurrency(pathname?: string): CurrencyMeta {
  const path = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');

  // 1. Detect from Country Route (/countries/[country-slug]/...)
  const countryMatch = path.match(/\/countries\/([a-z0-9-]+)/i);
  if (countryMatch && countryMatch[1]) {
    const slug = countryMatch[1].toLowerCase();
    if (COUNTRY_CURRENCY_MAP[slug]) {
      return COUNTRY_CURRENCY_MAP[slug];
    }
  }

  // 2. Fallback to storage if user set it elsewhere
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('fac_user_currency');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
  }

  // 3. Fallback default
  return DEFAULT_CURRENCY;
}

/**
 * Formats numbers into currency strings honoring standard or Lakh/Crore numbering
 */
export function formatCurrencyValue(amount: number, meta: CurrencyMeta, maximumFractionDigits = 0): string {
  if (meta.numberSystem === 'lakh-crore' || meta.code === 'INR') {
    return formatIndianNumber(Math.round(amount));
  }
  return new Intl.NumberFormat(meta.locale, {
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatIndianNumber(x: number): string {
  const parts = Math.round(x).toString().split('.');
  let lastThree = parts[0].substring(parts[0].length - 3);
  const otherNumbers = parts[0].substring(0, parts[0].length - 3);
  if (otherNumbers !== '') lastThree = ',' + lastThree;
  return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
}
