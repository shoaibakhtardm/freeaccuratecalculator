import type { SupportedLocale } from '../types/i18n';
import { getLanguageForCountry } from './countryLanguageMap';
import { setLocale, getCurrentLocale } from './i18n';

export async function detectUserCountry(): Promise<string> {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) throw new Error('IP API failed');
    const data = await response.json();
    return data.country_code || 'US';
  } catch (error) {
    console.warn('Country detection failed, using browser language fallback');
    const browserLang = typeof navigator !== 'undefined' && navigator.language
      ? navigator.language.split('-')[1] || 'US'
      : 'US';
    return browserLang;
  }
}

export async function autoApplyLanguage(): Promise<void> {
  if (typeof window === 'undefined') return;

  const manualSelection = localStorage.getItem('fac_manual_locale_selection');
  if (manualSelection === 'true') return;
  
  const existingLocale = localStorage.getItem('fac_preferred_locale');
  if (existingLocale) return;
  
  try {
    const country = await detectUserCountry();
    const locale = getLanguageForCountry(country);
    const currentLocale = getCurrentLocale();
    
    if (locale !== currentLocale) {
      setLocale(locale);
      if (window.location.pathname === '/' && locale !== 'en') {
        window.location.href = `/${locale}/`;
      }
    }
  } catch (error) {
    console.error('Auto language application failed:', error);
  }
}

export function initializeAutoDetection(): void {
  if (typeof window === 'undefined') return;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoApplyLanguage);
  } else {
    autoApplyLanguage();
  }
}
