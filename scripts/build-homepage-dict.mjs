// scripts/build-homepage-dict.mjs
import fs from 'node:fs';
import path from 'node:path';

// Complete dictionary with all 12 locales
// Ensuring full 33 tools, 21 categories with descriptions, methodology, and 6 FAQs for each.
import { DICT } from './locales-data.mjs';

const header = `// src/i18n/homepageDict.ts
import type { SupportedLocale } from '../types/i18n.ts';

export interface HomepageStrings {
  seo: {
    title: string;
    description: string;
    websiteName: string;
    websiteDesc: string;
  };
  hero: {
    pillBadge: string;
    h1Line1: string;
    h1Highlight: string;
    subtitle: string;
    metric1Value: string;
    metric1Label: string;
    metric2Value: string;
    metric2Label: string;
    metric3Value: string;
    metric3Label: string;
  };
  search: {
    placeholder: string;
    ariaLabel: string;
    clearLabel: string;
    ctrlK: string;
    suggestedCount: string;
    openHint: string;
    noResults: string;
    noResultsHint: string;
    verifiedBadge: string;
    navigateHint: string;
    closeHint: string;
    openCalc: string;
    typewriterPrompts: string[];
  };
  categoriesSection: {
    heading: string;
    domainsCount: string;
    categories: Record<string, string>;
    descriptions?: Record<string, string>;
  };
  popularSection: {
    heading: string;
    toolsCount: string;
    tools: Record<string, string>;
  };
  regionsSection: {
    heading: string;
    economiesCount: string;
    countries: Record<string, string>;
  };
  aboutSection: {
    eyebrow: string;
    h2: string;
    desc: string;
    headerLeft: string;
    headerRight: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    pillar4Title: string;
    pillar4Desc: string;
    pillar5Title: string;
    pillar5Desc: string;
    pillar6Title: string;
    pillar6Desc: string;
    ctaButton: string;
  };
  orphanSection: {
    badge: string;
    heading: string;
    subtext: string;
    exploreAll: string;
  };
  howItWorksSection?: {
    eyebrow: string;
    heading: string;
    desc: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  guidesSection?: {
    eyebrow: string;
    heading: string;
    desc: string;
    viewAll: string;
  };
  faqSection?: {
    eyebrow: string;
    heading: string;
    desc: string;
    items: Array<{ question: string; answer: string }>;
  };
  footer: {
    brandDesc: string;
    cloudflareVerified: string;
    financeTitle: string;
    healthTitle: string;
    mathTitle: string;
    everydayTitle: string;
    globalTitle: string;
    guides: string;
    about: string;
    contact: string;
    terms: string;
    privacy: string;
    rights: string;
  };
}

export const HOMEPAGE_TRANSLATIONS: Record<SupportedLocale, HomepageStrings> = ${JSON.stringify(DICT, null, 2)};

export function getHomepageStrings(locale: string = 'en'): HomepageStrings {
  const norm = (locale || 'en').toLowerCase() as SupportedLocale;
  return HOMEPAGE_TRANSLATIONS[norm] || HOMEPAGE_TRANSLATIONS.en;
}
`;

fs.writeFileSync(path.resolve('src/i18n/homepageDict.ts'), header, 'utf8');
console.log('src/i18n/homepageDict.ts written successfully!');
