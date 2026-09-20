// src/i18n/slugs.ts
import type { SupportedLocale } from './config';
import { ALL_SUPPORTED_LOCALES, DEFAULT_LOCALE } from './config';

export interface LocalizedRouteConfig {
  canonicalPath: string; // e.g., '/percentage-calculator/'
  locales: Partial<Record<SupportedLocale, string>>; // locale -> path relative to siteOrigin
}

/**
 * Universal Matrix of Verified Localized Routes.
 * Guarantees that alternate hreflang tags ONLY point to 200 OK routes that actually exist in the build,
 * preventing Google Search Console 404 hreflang errors and crawl budget waste.
 */
export const VERIFIED_LOCALIZED_ROUTES: Record<string, LocalizedRouteConfig> = {
  'percentage-calculator': {
    canonicalPath: '/percentage-calculator/',
    locales: {
      en: '/percentage-calculator/',
      es: '/es/percentage-calculator/',
      fr: '/fr/percentage-calculator/',
      hi: '/hi/percentage-calculator/',
    },
  },
  'emi-calculator': {
    canonicalPath: '/emi-calculator/',
    locales: {
      en: '/emi-calculator/',
      hi: '/hi/emi-calculator/',
    },
  },
  'guides': {
    canonicalPath: '/guides/',
    locales: {
      en: '/guides/',
      es: '/es/guides/',
      fr: '/fr/guides/',
      hi: '/hi/guides/',
    },
  },
};

/**
 * Backward compatibility alias for legacy mappings
 */
export const LOCALIZED_SLUGS = VERIFIED_LOCALIZED_ROUTES;

import { computeHreflangTags } from '../components/SEO/HreflangTags';

/**
 * Resolves the full international alternate URLs for a given canonical route or slug.
 */
export function getAlternateHreflangLinks(
  currentPath: string,
  siteOrigin: string = 'https://freeaccuratecalculator.com'
): Array<{ lang: string; href: string }> {
  const result = computeHreflangTags(currentPath, siteOrigin);
  return result.hreflangLinks;
}
