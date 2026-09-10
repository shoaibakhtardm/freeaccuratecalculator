// src/i18n/schema.ts

export interface NavTranslations {
  home: string;
  finance: string;
  health: string;
  math: string;
  everyday: string;
  guides: string;
  search: string;
  allCalculators: string;
  about: string;
  contact: string;
  privacy: string;
  terms: string;
}

export interface CommonTranslations {
  calculate: string;
  share: string;
  copied: string;
  reset: string;
  history: string;
  clearHistory: string;
  noHistory: string;
  advertisement: string;
  formula: string;
  example: string;
  faq: string;
  presets: string;
  notation: string;
  unitSystem: string;
  metric: string;
  imperial: string;
  language: string;
  selectLanguage: string;
  currency: string;
  disclaimer: string;
  allRightsReserved: string;
  searchPlaceholder: string;
  close: string;
  switchNow: string;
  keepLanguage: string;
  detectedLocalePrompt: string; // e.g. "We detected you are browsing in {language}. Switch to {language}?"
}

export interface CalculatorTranslations {
  emi: {
    title: string;
    description: string;
    loanAmount: string;
    interestRate: string;
    loanTenure: string;
    tenureYears: string;
    tenureMonths: string;
    monthlyEmi: string;
    totalInterest: string;
    totalAmount: string;
    amortizationSchedule: string;
  };
  compoundInterest: {
    title: string;
    description: string;
    principal: string;
    rate: string;
    timeYears: string;
    compoundFrequency: string;
    futureValue: string;
    totalEarned: string;
  };
  percentage: {
    title: string;
    description: string;
    whatIsXPercentOfY: string;
    xIsWhatPercentOfY: string;
    percentageIncreaseDecrease: string;
    calculate: string;
    result: string;
  };
  bmi: {
    title: string;
    description: string;
    weight: string;
    height: string;
    age: string;
    gender: string;
    bmiScore: string;
    category: string;
    healthyWeightRange: string;
  };
}

export interface SeoTranslations {
  siteTitle: string;
  siteDescription: string;
  ogTitleSuffix: string;
}

export interface TranslationDictionary {
  nav: NavTranslations;
  common: CommonTranslations;
  calculators: CalculatorTranslations;
  seo: SeoTranslations;
}
