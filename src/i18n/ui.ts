import {
  LOCALES,
  DEFAULT_LOCALE,
  isValidLocale,
  type SupportedLocale,
} from './config.ts';
import { DICTIONARIES, useTranslations as newUseTranslations } from './utils.ts';

export const languages = Object.fromEntries(
  Object.entries(LOCALES).map(([code, loc]) => [
    code,
    {
      code: loc.code,
      label: loc.nativeName,
      short: loc.short,
      flag: loc.flag,
      name: loc.name,
      dir: loc.dir,
    },
  ])
) as Record<
  SupportedLocale,
  {
    code: string;
    label: string;
    short: string;
    flag: string;
    name: string;
    dir: 'ltr' | 'rtl';
  }
>;

export type SupportedLanguage = SupportedLocale;
export const defaultLang: SupportedLanguage = DEFAULT_LOCALE;

/**
 * Legacy flat ui map for existing components
 */
export const ui = Object.fromEntries(
  Object.entries(DICTIONARIES).map(([code, dict]) => [
    code,
    {
      'nav.finance': dict.nav.finance,
      'nav.health': dict.nav.health,
      'nav.math': dict.nav.math,
      'nav.everyday': dict.nav.everyday,
      'nav.guides': dict.nav.guides,
      'action.calculate': dict.common.calculate,
      'action.share': dict.common.share,
      'action.copied': dict.common.copied,
      'action.history': dict.common.history,
      'action.clear_history': dict.common.clearHistory,
      'action.no_history': dict.common.noHistory,
      'label.advertisement': dict.common.advertisement,
      'label.formula': dict.common.formula,
      'label.example': dict.common.example,
      'label.faq': dict.common.faq,
      'label.presets': dict.common.presets,
      'label.notation': dict.common.notation,
      'label.unit_system': dict.common.unitSystem,
      'unit.metric': dict.common.metric,
      'unit.imperial': dict.common.imperial,
      'footer.disclaimer': dict.common.disclaimer,
      'footer.rights': dict.common.allRightsReserved,
    },
  ])
) as Record<string, Record<string, string>>;

export function useTranslations(lang: string = defaultLang) {
  const active = isValidLocale(lang) ? (lang as SupportedLanguage) : defaultLang;
  const legacyMap = ui[active] || ui[defaultLang];
  const newT = newUseTranslations(active);

  return function t(key: string): string {
    if (legacyMap && legacyMap[key]) {
      return legacyMap[key];
    }
    return newT(key);
  };
}
