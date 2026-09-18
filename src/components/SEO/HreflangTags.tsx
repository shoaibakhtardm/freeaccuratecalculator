// src/components/SEO/HreflangTags.tsx

export interface HreflangLink {
  lang: string;
  href: string;
}

export interface HreflangTagsProps {
  currentPath: string;
  siteOrigin?: string;
  customAlternates?: Record<string, string>; // lang -> relative or absolute url
}

export interface HreflangResult {
  canonicalUrl: string;
  hreflangLinks: HreflangLink[];
}

export const SUPPORTED_LOCALES = [
  'en',
  'es',
  'fr',
  'de',
  'ar',
  'nl',
  'pt',
  'it',
  'ru',
  'ja',
  'hi',
  'zh',
] as const;

export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

const DEFAULT_ORIGIN = 'https://freeaccuratecalculator.com';

/**
 * Universal Multi-Language Verification Registry
 * Maps base canonical path to confirmed live routes in alternate languages.
 */
export const MULTILANG_ROUTES_REGISTRY: Record<string, Partial<Record<SupportedLocale, string>>> = {
  // Percentage Calculator
  '/math/percentage-calculator/': {
    en: '/math/percentage-calculator/',
    es: '/es/math/percentage-calculator/',
    fr: '/fr/math/percentage-calculator/',
    hi: '/hi/math/percentage-calculator/',
  },
  // EMI Calculator
  '/finance/emi-calculator/': {
    en: '/finance/emi-calculator/',
    hi: '/hi/finance/emi-calculator/',
  },
  // Guides Hub
  '/guides/': {
    en: '/guides/',
    es: '/es/guides/',
    fr: '/fr/guides/',
    hi: '/hi/guides/',
  },
  // Specific Multilingual Guides
  '/guides/how-compound-interest-works/': {
    en: '/guides/how-compound-interest-works/',
    fr: '/fr/guides/how-compound-interest-works/',
  },
  '/guides/how-to-calculate-percentages-accurately/': {
    en: '/guides/how-to-calculate-percentages-accurately/',
    fr: '/fr/guides/how-to-calculate-percentages-accurately/',
  },
};

/**
 * Normalizes any URL path to have leading and trailing slashes without query or hashes.
 */
export function normalizePath(path: string): string {
  const clean = (path || '/').split('?')[0].split('#')[0];
  const withLeading = clean.startsWith('/') ? clean : `/${clean}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

/**
 * Extracts current language and base unlocalized path.
 */
export function extractLocaleAndBasePath(pathname: string): { locale: SupportedLocale; basePath: string } {
  const normalized = normalizePath(pathname);
  const localeRegex = /^\/(es|fr|de|ar|nl|pt|it|ru|ja|hi|zh|en)\//;
  const match = normalized.match(localeRegex);

  if (match) {
    const locale = match[1] as SupportedLocale;
    const basePath = normalized.replace(localeRegex, '/');
    return { locale, basePath };
  }

  return { locale: 'en', basePath: normalized };
}

/**
 * Computes self-referencing canonical and cross-language alternate hreflang tags.
 */
export function computeHreflangTags(
  currentPath: string,
  siteOrigin: string = DEFAULT_ORIGIN,
  customAlternates?: Record<string, string>
): HreflangResult {
  const origin = siteOrigin.replace(/\/$/, '');
  const normalized = normalizePath(currentPath);
  const { locale, basePath } = extractLocaleAndBasePath(normalized);

  // 1. Strict Self-Referencing Canonical URL (Mandatory for Google indexation)
  const canonicalUrl = `${origin}${normalized}`;

  // 2. Custom manual overrides take immediate priority
  if (customAlternates && Object.keys(customAlternates).length > 0) {
    const customLinks: HreflangLink[] = Object.entries(customAlternates).map(([lang, pathOrUrl]) => ({
      lang,
      href: pathOrUrl.startsWith('http') ? pathOrUrl : `${origin}${normalizePath(pathOrUrl)}`,
    }));

    if (!customLinks.some((l) => l.lang === 'x-default')) {
      const defaultTarget = customAlternates.en || customAlternates['x-default'] || normalized;
      customLinks.push({
        lang: 'x-default',
        href: defaultTarget.startsWith('http') ? defaultTarget : `${origin}${normalizePath(defaultTarget)}`,
      });
    }

    return { canonicalUrl, hreflangLinks: customLinks };
  }

  // 3. Homepage (Root or any localized root: /, /es/, /hi/, /fr/, etc.)
  const isHomepage =
    normalized === '/' ||
    /^\/(?:es|fr|de|ar|nl|pt|it|ru|ja|hi|zh|en)\/$/.test(normalized);

  if (isHomepage) {
    const links: HreflangLink[] = SUPPORTED_LOCALES.map((loc) => ({
      lang: loc,
      href: loc === 'en' ? `${origin}/` : `${origin}/${loc}/`,
    }));

    links.push({
      lang: 'x-default',
      href: `${origin}/`,
    });

    return { canonicalUrl, hreflangLinks: links };
  }

  // 3.5. France Dedicated Bilingual URL Architecture (/countries/france/fr/* and /countries/france/en/*)
  if (normalized.startsWith('/countries/france/fr/')) {
    const frPath = normalized;
    const enPath = normalized.replace('/countries/france/fr/', '/countries/france/en/');
    return {
      canonicalUrl,
      hreflangLinks: [
        { lang: 'fr', href: `${origin}${frPath}` },
        { lang: 'en', href: `${origin}${enPath}` },
        { lang: 'x-default', href: `${origin}${frPath}` },
      ],
    };
  }

  if (normalized.startsWith('/countries/france/en/')) {
    const enPath = normalized;
    const frPath = normalized.replace('/countries/france/en/', '/countries/france/fr/');
    return {
      canonicalUrl,
      hreflangLinks: [
        { lang: 'fr', href: `${origin}${frPath}` },
        { lang: 'en', href: `${origin}${enPath}` },
        { lang: 'x-default', href: `${origin}${frPath}` },
      ],
    };
  }

  // 4. Verified Multi-Language Programmatic Registry
  const matchedConfig = MULTILANG_ROUTES_REGISTRY[basePath];
  if (matchedConfig) {
    const links: HreflangLink[] = [];

    for (const [loc, route] of Object.entries(matchedConfig)) {
      if (route) {
        links.push({
          lang: loc,
          href: `${origin}${route}`,
        });
      }
    }

    // Add x-default pointing to the canonical English equivalent
    links.push({
      lang: 'x-default',
      href: `${origin}${matchedConfig.en || basePath}`,
    });

    return { canonicalUrl, hreflangLinks: links };
  }

  // 5. English-only / Non-localized calculators:
  // Emits self-referencing 'en' and 'x-default' ONLY.
  // This completely eliminates ghost 404 hreflangs for the 1,400+ English pages.
  const defaultEnglishUrl = `${origin}${basePath}`;
  return {
    canonicalUrl,
    hreflangLinks: [
      { lang: 'en', href: defaultEnglishUrl },
      { lang: 'x-default', href: defaultEnglishUrl },
    ],
  };
}

/**
 * Generates raw HTML link tags for canonical and hreflangs.
 */
export function renderHreflangHtmlTags(
  currentPath: string,
  siteOrigin = DEFAULT_ORIGIN,
  customAlternates?: Record<string, string>
): string {
  const { canonicalUrl, hreflangLinks } = computeHreflangTags(currentPath, siteOrigin, customAlternates);
  const lines: string[] = [`<link rel="canonical" href="${canonicalUrl}" />`];

  hreflangLinks.forEach((link) => {
    lines.push(`<link rel="alternate" hreflang="${link.lang}" href="${link.href}" />`);
  });

  return lines.join('\n');
}

export default computeHreflangTags;
