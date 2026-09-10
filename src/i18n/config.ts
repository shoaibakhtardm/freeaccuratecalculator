// src/i18n/config.ts
import type { SupportedLocale, LocaleConfig } from '../types/i18n.ts';

export type Direction = 'ltr' | 'rtl';

export interface LocaleDefinition {
  code: string;
  name: string; // English name
  nativeName: string; // Native name
  flag: string; // Emoji flag
  dir: Direction;
  short: string;
  defaultCurrency: string;
  numberLocale: string;
  dateFormat: string;
  isCJK?: boolean;
}

export const LOCALE_CONFIGS: Record<SupportedLocale, LocaleConfig> = {
  en: { code: 'en', name: 'English', englishName: 'English', flag: '🇺🇸', dir: 'ltr', dateFormat: 'en-US', numberFormat: 'en-US', currency: 'USD' },
  fr: { code: 'fr', name: 'Français', englishName: 'French', flag: '🇫🇷', dir: 'ltr', dateFormat: 'fr-FR', numberFormat: 'fr-FR', currency: 'EUR' },
  de: { code: 'de', name: 'Deutsch', englishName: 'German', flag: '🇩🇪', dir: 'ltr', dateFormat: 'de-DE', numberFormat: 'de-DE', currency: 'EUR' },
  es: { code: 'es', name: 'Español', englishName: 'Spanish', flag: '🇪🇸', dir: 'ltr', dateFormat: 'es-ES', numberFormat: 'es-ES', currency: 'EUR' },
  ar: { code: 'ar', name: 'العربية', englishName: 'Arabic', flag: '🇸🇦', dir: 'rtl', dateFormat: 'ar-SA', numberFormat: 'ar-SA', currency: 'SAR' },
  nl: { code: 'nl', name: 'Nederlands', englishName: 'Dutch', flag: '🇳🇱', dir: 'ltr', dateFormat: 'nl-NL', numberFormat: 'nl-NL', currency: 'EUR' },
  pt: { code: 'pt', name: 'Português', englishName: 'Portuguese', flag: '🇵🇹', dir: 'ltr', dateFormat: 'pt-PT', numberFormat: 'pt-PT', currency: 'EUR' },
  it: { code: 'it', name: 'Italiano', englishName: 'Italian', flag: '🇮🇹', dir: 'ltr', dateFormat: 'it-IT', numberFormat: 'it-IT', currency: 'EUR' },
  ru: { code: 'ru', name: 'Русский', englishName: 'Russian', flag: '🇷🇺', dir: 'ltr', dateFormat: 'ru-RU', numberFormat: 'ru-RU', currency: 'RUB' },
  ja: { code: 'ja', name: '日本語', englishName: 'Japanese', flag: '🇯🇵', dir: 'ltr', dateFormat: 'ja-JP', numberFormat: 'ja-JP', currency: 'JPY' },
};

export const LOCALES: Record<string, LocaleDefinition> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    dir: 'ltr',
    short: 'EN',
    defaultCurrency: 'USD',
    numberLocale: 'en-US',
    dateFormat: 'MM/DD/YYYY',
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    dir: 'ltr',
    short: 'FR',
    defaultCurrency: 'EUR',
    numberLocale: 'fr-FR',
    dateFormat: 'DD/MM/YYYY',
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    dir: 'ltr',
    short: 'DE',
    defaultCurrency: 'EUR',
    numberLocale: 'de-DE',
    dateFormat: 'DD.MM.YYYY',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    dir: 'ltr',
    short: 'ES',
    defaultCurrency: 'EUR',
    numberLocale: 'es-ES',
    dateFormat: 'DD/MM/YYYY',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    dir: 'rtl',
    short: 'AR',
    defaultCurrency: 'SAR',
    numberLocale: 'ar-SA',
    dateFormat: 'YYYY/MM/DD',
  },
  nl: {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    flag: '🇳🇱',
    dir: 'ltr',
    short: 'NL',
    defaultCurrency: 'EUR',
    numberLocale: 'nl-NL',
    dateFormat: 'DD-MM-YYYY',
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    dir: 'ltr',
    short: 'PT',
    defaultCurrency: 'EUR',
    numberLocale: 'pt-PT',
    dateFormat: 'DD/MM/YYYY',
  },
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    dir: 'ltr',
    short: 'IT',
    defaultCurrency: 'EUR',
    numberLocale: 'it-IT',
    dateFormat: 'DD/MM/YYYY',
  },
  ru: {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    dir: 'ltr',
    short: 'RU',
    defaultCurrency: 'RUB',
    numberLocale: 'ru-RU',
    dateFormat: 'DD.MM.YYYY',
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    dir: 'ltr',
    short: 'JA',
    defaultCurrency: 'JPY',
    numberLocale: 'ja-JP',
    dateFormat: 'YYYY/MM/DD',
    isCJK: true,
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    dir: 'ltr',
    short: 'HI',
    defaultCurrency: 'INR',
    numberLocale: 'en-IN',
    dateFormat: 'DD/MM/YYYY',
  },
} as const;

export type SupportedLocale = keyof typeof LOCALES;
export const DEFAULT_LOCALE: SupportedLocale = 'en';

export const CORE_10_LOCALES: SupportedLocale[] = [
  'en',
  'fr',
  'de',
  'es',
  'ar',
  'nl',
  'pt',
  'it',
  'ru',
  'ja',
];

export const ALL_SUPPORTED_LOCALES: SupportedLocale[] = [
  'en',
  'fr',
  'de',
  'es',
  'ar',
  'nl',
  'pt',
  'it',
  'ru',
  'ja',
  'hi',
];

export function isValidLocale(code: string): code is SupportedLocale {
  return Object.prototype.hasOwnProperty.call(LOCALES, code.toLowerCase());
}

export function getLocaleConfig(code?: string): LocaleDefinition {
  if (code && isValidLocale(code)) {
    return LOCALES[code.toLowerCase() as SupportedLocale];
  }
  return LOCALES[DEFAULT_LOCALE];
}

export function getLocaleDirection(code?: string): Direction {
  return getLocaleConfig(code).dir;
}

export function isRTL(code?: string): boolean {
  return getLocaleDirection(code) === 'rtl';
}

/**
 * Maps browser locales/language tags to supported locales
 */
export const BROWSER_LOCALE_MAP: Record<string, SupportedLocale> = {
  en: 'en',
  'en-us': 'en',
  'en-gb': 'en',
  'en-ca': 'en',
  'en-au': 'en',
  fr: 'fr',
  'fr-fr': 'fr',
  'fr-ca': 'fr',
  'fr-be': 'fr',
  'fr-ch': 'fr',
  de: 'de',
  'de-de': 'de',
  'de-at': 'de',
  'de-ch': 'de',
  es: 'es',
  'es-es': 'es',
  'es-mx': 'es',
  'es-ar': 'es',
  'es-co': 'es',
  ar: 'ar',
  'ar-sa': 'ar',
  'ar-ae': 'ar',
  'ar-eg': 'ar',
  nl: 'nl',
  'nl-nl': 'nl',
  'nl-be': 'nl',
  pt: 'pt',
  'pt-pt': 'pt',
  'pt-br': 'pt',
  it: 'it',
  'it-it': 'it',
  'it-ch': 'it',
  ru: 'ru',
  'ru-ru': 'ru',
  ja: 'ja',
  'ja-jp': 'ja',
  hi: 'hi',
  'hi-in': 'hi',
};
