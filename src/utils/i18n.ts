import type { SupportedLocale, TranslationKeys } from '../types/i18n';
import { DEFAULT_LOCALE, LOCALES, SUPPORTED_LOCALES } from '../i18n/localeConfig';

const translationCache = new Map<SupportedLocale, Record<string, string>>();

export async function loadTranslations(locale: SupportedLocale): Promise<Record<string, string>> {
  if (translationCache.has(locale)) {
    return translationCache.get(locale)!;
  }
  
  try {
    const translations = await import(`../i18n/locales/${locale}.json`);
    translationCache.set(locale, translations.default || translations);
    return translationCache.get(locale)!;
  } catch (error) {
    console.error(`Failed to load translations for ${locale}, falling back to English`);
    const fallback = await import(`../i18n/locales/en.json`);
    return fallback.default || fallback;
  }
}

export async function t(locale: SupportedLocale, key: keyof TranslationKeys): Promise<string> {
  const translations = await loadTranslations(locale);
  return translations[key] || key;
}

export function tClient(key: keyof TranslationKeys): string {
  const locale = (document.documentElement.lang as SupportedLocale) || DEFAULT_LOCALE;
  const translations = (window as any).__translations?.[locale] || {};
  return translations[key] || key;
}

export function getCurrentLocale(): SupportedLocale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  
  const pathLocale = window.location.pathname.split('/')[1] as SupportedLocale;
  if (pathLocale && SUPPORTED_LOCALES.includes(pathLocale)) {
    return pathLocale;
  }
  
  const stored = localStorage.getItem('fac_preferred_locale') as SupportedLocale;
  if (stored && SUPPORTED_LOCALES.includes(stored)) return stored;
  
  const browserLang = navigator.language.split('-')[0] as SupportedLocale;
  if (SUPPORTED_LOCALES.includes(browserLang)) return browserLang;
  
  return DEFAULT_LOCALE;
}

export function setLocale(locale: SupportedLocale): void {
  localStorage.setItem('fac_preferred_locale', locale);
  document.documentElement.lang = locale;
  document.documentElement.dir = LOCALES[locale].dir;
  window.dispatchEvent(new CustomEvent('localechange', { detail: { locale } }));
}

export function formatNumber(value: number, locale: SupportedLocale): string {
  const config = LOCALES[locale];
  return new Intl.NumberFormat(config.numberFormat).format(value);
}

export function formatCurrency(value: number, locale: SupportedLocale, currency?: string): string {
  const config = LOCALES[locale];
  return new Intl.NumberFormat(config.numberFormat, {
    style: 'currency',
    currency: currency || config.currency,
  }).format(value);
}

export function formatDate(date: Date, locale: SupportedLocale): string {
  const config = LOCALES[locale];
  return new Intl.DateTimeFormat(config.dateFormat, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
