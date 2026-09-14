// src/types/i18n.ts

export type SupportedLocale = 'en' | 'fr' | 'de' | 'es' | 'ar' | 'nl' | 'pt' | 'it' | 'ru' | 'ja' | 'zh' | 'hi';

export interface LocaleConfig {
  code: SupportedLocale;
  name: string;           // Native name (e.g., "Français")
  englishName: string;    // English name (e.g., "French")
  flag: string;           // Emoji flag
  dir: 'ltr' | 'rtl';     // Text direction
  dateFormat: string;     // Intl.DateTimeFormat locale
  numberFormat: string;   // Intl.NumberFormat locale
  currency: string;       // Default currency code
}

export interface TranslationKeys {
  // Navigation
  'nav.home': string;
  'nav.finance': string;
  'nav.health': string;
  'nav.math': string;
  'nav.everyday': string;
  'nav.blog': string;
  'nav.about': string;
  'nav.contact': string;
  
  // Common UI
  'ui.calculate': string;
  'ui.reset': string;
  'ui.copy': string;
  'ui.copied': string;
  'ui.share': string;
  'ui.print': string;
  'ui.darkMode': string;
  'ui.lightMode': string;
  'ui.loading': string;
  'ui.error': string;
  'ui.required': string;
  'ui.selectCountry': string;
  'ui.language': string;
  
  // BMI Calculator
  'calc.bmi.title': string;
  'calc.bmi.description': string;
  'calc.bmi.height': string;
  'calc.bmi.weight': string;
  'calc.bmi.age': string;
  'calc.bmi.gender': string;
  'calc.bmi.result': string;
  'calc.bmi.underweight': string;
  'calc.bmi.normal': string;
  'calc.bmi.overweight': string;
  'calc.bmi.obese': string;
  'calc.bmi.unitMetric': string;
  'calc.bmi.unitImperial': string;
  
  // EMI Calculator
  'calc.emi.title': string;
  'calc.emi.description': string;
  'calc.emi.loanAmount': string;
  'calc.emi.interestRate': string;
  'calc.emi.tenure': string;
  'calc.emi.monthlyEmi': string;
  'calc.emi.totalInterest': string;
  'calc.emi.totalPayment': string;
  'calc.emi.currency': string;
  
  // SIP Calculator
  'calc.sip.title': string;
  'calc.sip.description': string;
  'calc.sip.monthlyInvestment': string;
  'calc.sip.expectedReturn': string;
  'calc.sip.timePeriod': string;
  'calc.sip.investedAmount': string;
  'calc.sip.estimatedReturns': string;
  'calc.sip.totalValue': string;
  'calc.sip.yearByYear': string;
  
  // Footer
  'footer.privacy': string;
  'footer.terms': string;
  'footer.disclaimer': string;
  'footer.copyright': string;
  
  // SEO
  'seo.homeTitle': string;
  'seo.homeDescription': string;
}

export type TranslationDictionary = Record<keyof TranslationKeys, string>;
