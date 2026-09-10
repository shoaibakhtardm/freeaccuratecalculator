// src/i18n/slugs.ts
import type { SupportedLocale } from './config';
import { ALL_SUPPORTED_LOCALES, DEFAULT_LOCALE } from './config';

export interface LocalizedSlugMapping {
  canonicalPath: string; // e.g., '/health/bmi-calculator/'
  category: string;
  slugs: Record<SupportedLocale, string>;
}

/**
 * Universal Matrix of Localized Calculator Slugs across all 11 global languages.
 * Enables true native in-market URL optimization for Google SERP international targeting.
 */
export const LOCALIZED_SLUGS: Record<string, LocalizedSlugMapping> = {
  'bmi-calculator': {
    canonicalPath: '/health/bmi-calculator/',
    category: 'health',
    slugs: {
      en: 'bmi-calculator',
      fr: 'calculateur-imc',
      de: 'bmi-rechner',
      es: 'calculadora-imc',
      ar: 'hasibat-kutlat-al-jism',
      nl: 'bmi-calculator',
      pt: 'calculadora-de-imc',
      it: 'calcolatore-bmi',
      ru: 'kalkulyator-imt',
      ja: 'bmi-keisanki',
      hi: 'bmi-calculator',
    },
  },
  'percentage-calculator': {
    canonicalPath: '/math/percentage-calculator/',
    category: 'math',
    slugs: {
      en: 'percentage-calculator',
      fr: 'calculateur-de-pourcentage',
      de: 'prozentrechner',
      es: 'calculadora-de-porcentaje',
      ar: 'hasibat-al-nisba-al-maawiyya',
      nl: 'percentage-calculator',
      pt: 'calculadora-de-porcentagem',
      it: 'calcolatore-percentuale',
      ru: 'kalkulyator-protsentov',
      ja: 'paasento-keisanki',
      hi: 'percentage-calculator',
    },
  },
  'emi-calculator': {
    canonicalPath: '/finance/emi-calculator/',
    category: 'finance',
    slugs: {
      en: 'emi-calculator',
      fr: 'calculateur-mensualite-pret',
      de: 'kreditrechner-tilgungsplan',
      es: 'calculadora-cuota-prestamo',
      ar: 'hasibat-al-qist-al-shahri',
      nl: 'lening-aflossing-calculator',
      pt: 'calculadora-prestacao-financiamento',
      it: 'calcolo-rata-finanziamento',
      ru: 'kreditnyj-kalkulyator-annuitet',
      ja: 'roan-hensai-keisanki',
      hi: 'emi-calculator',
    },
  },
  'compound-interest-calculator': {
    canonicalPath: '/finance/compound-interest-calculator/',
    category: 'finance',
    slugs: {
      en: 'compound-interest-calculator',
      fr: 'calculateur-interets-composes',
      de: 'zinseszinsrechner',
      es: 'calculadora-interes-compuesto',
      ar: 'hasibat-al-fawaid-al-murakkaba',
      nl: 'samengestelde-interest-calculator',
      pt: 'calculadora-juros-compostos',
      it: 'calcolo-interesse-composto',
      ru: 'kalkulyator-slozhnyh-protsentov',
      ja: 'fukuri-keisanki',
      hi: 'compound-interest-calculator',
    },
  },
};

/**
 * Resolves the full international alternate URLs for a given canonical route or slug.
 */
export function getAlternateHreflangLinks(
  currentPath: string,
  siteOrigin: string = 'https://freeaccuratecalculator.com'
): Array<{ lang: string; url: string }> {
  // 1. Clean path to find matching calculator key
  const normalizedPath = currentPath.replace(/^\/(?:en|fr|de|es|ar|nl|pt|it|ru|ja|hi)\//, '/');
  const slugMatch = normalizedPath.match(/\/([^/]+)\/?$/);
  const currentSlug = slugMatch ? slugMatch[1] : '';

  // Check if we have an explicit localized slug mapping
  let mapping: LocalizedSlugMapping | undefined;
  for (const key of Object.keys(LOCALIZED_SLUGS)) {
    if (key === currentSlug || LOCALIZED_SLUGS[key].canonicalPath.includes(`/${currentSlug}/`)) {
      mapping = LOCALIZED_SLUGS[key];
      break;
    }
  }

  const links: Array<{ lang: string; url: string }> = [];

  if (mapping) {
    // Generate localized URL for each of the 11 supported locales
    for (const locale of ALL_SUPPORTED_LOCALES) {
      const localizedSlug = mapping.slugs[locale] || mapping.slugs[DEFAULT_LOCALE];
      const category = mapping.category;
      const pathSuffix = locale === DEFAULT_LOCALE
        ? `/${category}/${localizedSlug}/`
        : `/${locale}/${category}/${localizedSlug}/`;
      
      links.push({
        lang: locale,
        url: `${siteOrigin}${pathSuffix}`,
      });
    }

    // Add x-default pointing to the default English canonical URL
    links.push({
      lang: 'x-default',
      url: `${siteOrigin}${mapping.canonicalPath}`,
    });
  } else {
    // Universal path-mirrored fallback for standard hubs and pages
    for (const locale of ALL_SUPPORTED_LOCALES) {
      const clean = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
      const localizedUrl = locale === DEFAULT_LOCALE
        ? `${siteOrigin}${clean.endsWith('/') ? clean : `${clean}/`}`
        : `${siteOrigin}/${locale}${clean.endsWith('/') ? clean : `${clean}/`}`;

      links.push({
        lang: locale,
        url: localizedUrl.replace(/([^:]\/)\/+/g, '$1'),
      });
    }

    links.push({
      lang: 'x-default',
      url: `${siteOrigin}${normalizedPath.endsWith('/') ? normalizedPath : `${normalizedPath}/`}`,
    });
  }

  return links;
}
