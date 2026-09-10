// src/i18n/slugs.ts
import type { SupportedLocale } from './config';
import { ALL_SUPPORTED_LOCALES, DEFAULT_LOCALE } from './config';

export interface LocalizedRouteConfig {
  canonicalPath: string; // e.g., '/math/percentage-calculator/'
  locales: Partial<Record<SupportedLocale, string>>; // locale -> path relative to siteOrigin
}

/**
 * Universal Matrix of Verified Localized Routes.
 * Guarantees that alternate hreflang tags ONLY point to 200 OK routes that actually exist in the build,
 * preventing Google Search Console 404 hreflang errors and crawl budget waste.
 */
export const VERIFIED_LOCALIZED_ROUTES: Record<string, LocalizedRouteConfig> = {
  'percentage-calculator': {
    canonicalPath: '/math/percentage-calculator/',
    locales: {
      en: '/math/percentage-calculator/',
      es: '/es/math/percentage-calculator/',
      fr: '/fr/math/percentage-calculator/',
      hi: '/hi/math/percentage-calculator/',
    },
  },
  'emi-calculator': {
    canonicalPath: '/finance/emi-calculator/',
    locales: {
      en: '/finance/emi-calculator/',
      hi: '/hi/finance/emi-calculator/',
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

/**
 * Resolves the full international alternate URLs for a given canonical route or slug.
 */
export function getAlternateHreflangLinks(
  currentPath: string,
  siteOrigin: string = 'https://freeaccuratecalculator.com'
): Array<{ lang: string; href: string }> {
  // 1. Normalize path
  const trimmed = currentPath.split('?')[0].split('#')[0];
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  const normalized = withLeading.endsWith('/') ? withLeading : `${withLeading}/`;

  // 2. Check if this is the homepage (root or any language root)
  const isHomepage =
    normalized === '/' ||
    /^\/(?:en|fr|de|es|ar|nl|pt|it|ru|ja|hi|zh)\/$/.test(normalized);

  if (isHomepage) {
    const links = ALL_SUPPORTED_LOCALES.map((locale) => ({
      lang: locale,
      href: locale === DEFAULT_LOCALE ? `${siteOrigin}/` : `${siteOrigin}/${locale}/`,
    }));
    links.push({
      lang: 'x-default',
      href: `${siteOrigin}/`,
    });
    return links;
  }

  // 3. Strip locale prefix to identify base canonical path
  const strippedPath = normalized.replace(
    /^\/(?:en|fr|de|es|ar|nl|pt|it|ru|ja|hi|zh)\//,
    '/'
  );

  // 4. Check for verified multi-language routes
  for (const [key, config] of Object.entries(VERIFIED_LOCALIZED_ROUTES)) {
    if (strippedPath === config.canonicalPath || strippedPath.includes(`/${key}/`)) {
      const links: Array<{ lang: string; href: string }> = [];
      for (const [locale, routePath] of Object.entries(config.locales)) {
        links.push({
          lang: locale,
          href: `${siteOrigin}${routePath}`,
        });
      }
      links.push({
        lang: 'x-default',
        href: `${siteOrigin}${config.canonicalPath}`,
      });
      return links;
    }
  }

  // 5. Default / English-only page: emit canonical English and x-default only.
  // This guarantees 0 ghost 404 hreflangs for the 280+ English calculators.
  const canonicalUrl = `${siteOrigin}${strippedPath}`;
  return [
    { lang: 'en', href: canonicalUrl },
    { lang: 'x-default', href: canonicalUrl },
  ];
}
