import type { LocaleConfig, SupportedLocale } from '../types/i18n';

export const LOCALES: Record<SupportedLocale, LocaleConfig> = {
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
  zh: { code: 'zh', name: '中文', englishName: 'Chinese', flag: '🇨🇳', dir: 'ltr', dateFormat: 'zh-CN', numberFormat: 'zh-CN', currency: 'CNY' },
};

export const SUPPORTED_LOCALES = Object.keys(LOCALES) as SupportedLocale[];
export const DEFAULT_LOCALE: SupportedLocale = 'en';
