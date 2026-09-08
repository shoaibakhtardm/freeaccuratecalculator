// src/data/countries.ts

export interface TaxBracketConfig {
  min: number;
  max: number | null; // null for open-ended top bracket
  rate: number; // decimal, e.g. 0.05 for 5%
}

export interface SurchargeTier {
  min: number;
  max: number | null;
  rate: number; // decimal, e.g. 0.10 for 10%
}

export interface TaxRegimeConfig {
  name: string;
  standardDeduction: number;
  brackets: TaxBracketConfig[];
  rebate?: {
    name: string;
    threshold: number;
    maxAmount: number;
  };
  surchargeTiers?: SurchargeTier[];
}

export interface CountryTaxConfig2026 {
  taxYear: string;
  sourceAuthority: string;
  sourceUrl: string;
  lastVerifiedDate: string;
  cessRate?: number; // e.g. 0.04 for India 4% Health and Education Cess
  standardDeductions: Record<string, number>;
  limits?: Record<string, number>; // e.g. 401k: 24500, ssWageBase: 176100
  regimes?: Record<string, TaxRegimeConfig>;
  brackets?: Record<string, TaxBracketConfig[]>;
  surchargeTiers?: SurchargeTier[];
  notes?: string;
}

export interface CountryConfig {
  code: string; // ISO 3166-1 alpha-2 (e.g., 'IN', 'US', 'GB')
  slug: string; // URL-safe slug (e.g., 'india', 'united-states', 'united-kingdom')
  name: string;
  nativeName: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  locale: string;
  numberSystem: 'lakh-crore' | 'international';
  dateFormat: string;
  unitSystem: 'metric' | 'imperial';
  isPopular?: boolean;
  taxSystemName?: string;
  popularCalculators: string[];
  tax2026?: CountryTaxConfig2026;
}

/**
 * 2026 Indian Income Tax Rules (FY 2026–27 / AY 2027–28)
 * Section 115BAC New Regime and Optional Old Regime
 */
export const INDIA_TAX_CONFIG_2026: CountryTaxConfig2026 = {
  taxYear: 'FY 2026–27 (AY 2027–28)',
  sourceAuthority: 'Income Tax Department, Ministry of Finance, Government of India',
  sourceUrl: 'https://incometaxindia.gov.in',
  lastVerifiedDate: '2026-09-09',
  cessRate: 0.04, // Mandatory 4% Health & Education Cess
  standardDeductions: {
    newRegimeSalaried: 75000,
    oldRegimeSalaried: 50000,
  },
  limits: {
    section80C: 150000,
    section80D: 100000,
    rebate87ANewLimit: 700000,
    rebate87ANewMax: 25000,
    rebate87AOldLimit: 500000,
    rebate87AOldMax: 12500,
  },
  surchargeTiers: [
    { min: 5000000, max: 10000000, rate: 0.10 },
    { min: 10000000, max: 20000000, rate: 0.15 },
    { min: 20000000, max: 50000000, rate: 0.25 },
    { min: 50000000, max: null, rate: 0.25 },
  ],
  regimes: {
    new: {
      name: 'New Tax Regime (Section 115BAC Default)',
      standardDeduction: 75000,
      brackets: [
        { min: 0, max: 300000, rate: 0.0 },
        { min: 300000, max: 700000, rate: 0.05 },
        { min: 700000, max: 1000000, rate: 0.10 },
        { min: 1000000, max: 1200000, rate: 0.15 },
        { min: 1200000, max: 1500000, rate: 0.20 },
        { min: 1500000, max: null, rate: 0.30 },
      ],
      rebate: {
        name: 'Section 87A Rebate',
        threshold: 700000,
        maxAmount: 25000,
      },
      surchargeTiers: [
        { min: 5000000, max: 10000000, rate: 0.10 },
        { min: 10000000, max: 20000000, rate: 0.15 },
        { min: 20000000, max: 50000000, rate: 0.25 },
        { min: 50000000, max: null, rate: 0.25 }, // Capped at 25% under New Regime
      ],
    },
    old: {
      name: 'Old Tax Regime (Optional with Chapter VI-A Deductions)',
      standardDeduction: 50000,
      brackets: [
        { min: 0, max: 250000, rate: 0.0 },
        { min: 250000, max: 500000, rate: 0.05 },
        { min: 500000, max: 1000000, rate: 0.20 },
        { min: 1000000, max: null, rate: 0.30 },
      ],
      rebate: {
        name: 'Section 87A Rebate',
        threshold: 500000,
        maxAmount: 12500,
      },
      surchargeTiers: [
        { min: 5000000, max: 10000000, rate: 0.10 },
        { min: 10000000, max: 20000000, rate: 0.15 },
        { min: 20000000, max: 50000000, rate: 0.25 },
        { min: 50000000, max: null, rate: 0.37 },
      ],
    },
  },
  notes: 'Salaried individuals receive ₹75,000 standard deduction under the default New Regime. 4% Health & Education Cess applies on all net tax liability.',
};

/**
 * 2026 United States Federal Tax Limits and Brackets (IRS Inflation-Adjusted Projections)
 */
export const US_TAX_CONFIG_2026: CountryTaxConfig2026 = {
  taxYear: 'Tax Year 2026',
  sourceAuthority: 'Internal Revenue Service (IRS), US Department of the Treasury',
  sourceUrl: 'https://www.irs.gov',
  lastVerifiedDate: '2026-09-09',
  standardDeductions: {
    single: 16100,
    married_joint: 32200,
    head_of_household: 24150,
    married_separate: 16100,
  },
  limits: {
    traditional401k: 24500,
    catchUp401k50Plus: 8000,
    iraContributionLimit: 7500,
    socialSecurityWageBase: 176100,
    socialSecurityRate: 0.062,
    medicareRate: 0.0145,
    additionalMedicareRate: 0.009,
    additionalMedicareThresholdSingle: 200000,
    additionalMedicareThresholdJoint: 250000,
  },
  brackets: {
    single: [
      { min: 0, max: 12400, rate: 0.10 },
      { min: 12400, max: 50400, rate: 0.12 },
      { min: 50400, max: 107500, rate: 0.22 },
      { min: 107500, max: 205200, rate: 0.24 },
      { min: 205200, max: 260550, rate: 0.32 },
      { min: 260550, max: 651400, rate: 0.35 },
      { min: 651400, max: null, rate: 0.37 },
    ],
    married_joint: [
      { min: 0, max: 24800, rate: 0.10 },
      { min: 24800, max: 100800, rate: 0.12 },
      { min: 100800, max: 215000, rate: 0.22 },
      { min: 215000, max: 410400, rate: 0.24 },
      { min: 410400, max: 521100, rate: 0.32 },
      { min: 521100, max: 751600, rate: 0.35 },
      { min: 751600, max: null, rate: 0.37 },
    ],
  },
  notes: 'Projected 2026 inflation-adjusted parameters: $16,100 Single standard deduction, $24,500 401(k) elective deferral limit, and $176,100 Social Security taxable wage base.',
};

export const COUNTRIES: Record<string, CountryConfig> = {
  // 1. India
  IN: {
    code: 'IN',
    slug: 'india',
    name: 'India',
    nativeName: 'भारत',
    flag: '🇮🇳',
    currency: 'INR',
    currencySymbol: '₹',
    locale: 'en-IN',
    numberSystem: 'lakh-crore',
    dateFormat: 'DD/MM/YYYY',
    unitSystem: 'metric',
    isPopular: true,
    taxSystemName: 'Income Tax (Old vs New Regime, Slabs & Surcharges)',
    popularCalculators: [
      'sip-calculator',
      'step-up-sip-calculator',
      'income-tax-calculator',
      'emi-calculator',
      'ppf-calculator',
      'epf-calculator',
      'gratuity-calculator',
      'swp-calculator',
      'lumpsum-calculator',
      'mortgage-calculator',
    ],
    tax2026: INDIA_TAX_CONFIG_2026,
  },

  // 2. United States
  US: {
    code: 'US',
    slug: 'united-states',
    name: 'United States',
    nativeName: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    locale: 'en-US',
    numberSystem: 'international',
    dateFormat: 'MM/DD/YYYY',
    unitSystem: 'imperial',
    isPopular: true,
    taxSystemName: 'US Federal & FICA Tax',
    popularCalculators: [
      'mortgage-calculator',
      'salary-calculator',
      'income-tax-calculator',
      '401k-calculator',
      'roth-ira-calculator',
      'auto-loan-calculator',
      'compound-interest-calculator',
      'percentage-calculator',
      'bmi-calculator',
    ],
    tax2026: US_TAX_CONFIG_2026,
  },

  // 3. United Kingdom
  GB: {
    code: 'GB',
    slug: 'united-kingdom',
    name: 'United Kingdom',
    nativeName: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    currencySymbol: '£',
    locale: 'en-GB',
    numberSystem: 'international',
    dateFormat: 'DD/MM/YYYY',
    unitSystem: 'metric',
    isPopular: true,
    taxSystemName: 'HMRC PAYE & National Insurance',
    popularCalculators: [
      'mortgage-calculator',
      'salary-calculator',
      'compound-interest-calculator',
      'loan-calculator',
      'percentage-calculator',
      'vat-calculator',
    ],
  },

  // 4. Canada
  CA: {
    code: 'CA',
    slug: 'canada',
    name: 'Canada',
    nativeName: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    currencySymbol: 'C$',
    locale: 'en-CA',
    numberSystem: 'international',
    dateFormat: 'YYYY-MM-DD',
    unitSystem: 'metric',
    isPopular: true,
    taxSystemName: 'CRA Federal & Provincial Tax',
    popularCalculators: [
      'mortgage-calculator',
      'salary-calculator',
      'compound-interest-calculator',
      'auto-loan-calculator',
      'percentage-calculator',
    ],
  },

  // 5. Australia
  AU: {
    code: 'AU',
    slug: 'australia',
    name: 'Australia',
    nativeName: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    currencySymbol: 'A$',
    locale: 'en-AU',
    numberSystem: 'international',
    dateFormat: 'DD/MM/YYYY',
    unitSystem: 'metric',
    isPopular: true,
    taxSystemName: 'ATO Resident Tax & Superannuation',
    popularCalculators: [
      'mortgage-calculator',
      'salary-calculator',
      'compound-interest-calculator',
      'loan-calculator',
      'percentage-calculator',
    ],
  },

  // 6. UAE
  AE: {
    code: 'AE',
    slug: 'united-arab-emirates',
    name: 'United Arab Emirates',
    nativeName: 'الإمارات',
    flag: '🇦🇪',
    currency: 'AED',
    currencySymbol: 'د.إ',
    locale: 'en-AE',
    numberSystem: 'international',
    dateFormat: 'DD/MM/YYYY',
    unitSystem: 'metric',
    isPopular: true,
    taxSystemName: 'UAE Labour Law Gratuity & VAT',
    popularCalculators: [
      'gratuity-calculator',
      'mortgage-calculator',
      'salary-calculator',
      'sip-calculator',
      'currency-converter',
    ],
  },

  // 7. Germany
  DE: {
    code: 'DE',
    slug: 'germany',
    name: 'Germany',
    nativeName: 'Deutschland',
    flag: '🇩🇪',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'de-DE',
    numberSystem: 'international',
    dateFormat: 'DD.MM.YYYY',
    unitSystem: 'metric',
    isPopular: true,
    taxSystemName: 'Einkommensteuer & Solidarity Surcharge',
    popularCalculators: [
      'salary-calculator',
      'compound-interest-calculator',
      'mortgage-calculator',
      'percentage-calculator',
    ],
  },

  // 8. France
  FR: {
    code: 'FR',
    slug: 'france',
    name: 'France',
    nativeName: 'France',
    flag: '🇫🇷',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'fr-FR',
    numberSystem: 'international',
    dateFormat: 'DD/MM/YYYY',
    unitSystem: 'metric',
    isPopular: true,
    taxSystemName: 'Impôt sur le Revenu',
    popularCalculators: [
      'salary-calculator',
      'mortgage-calculator',
      'compound-interest-calculator',
      'percentage-calculator',
    ],
  },

  // 9. Singapore
  SG: {
    code: 'SG',
    slug: 'singapore',
    name: 'Singapore',
    nativeName: 'Singapore',
    flag: '🇸🇬',
    currency: 'SGD',
    currencySymbol: 'S$',
    locale: 'en-SG',
    numberSystem: 'international',
    dateFormat: 'DD/MM/YYYY',
    unitSystem: 'metric',
    isPopular: true,
    taxSystemName: 'IRAS Personal Income Tax & CPF',
    popularCalculators: [
      'mortgage-calculator',
      'salary-calculator',
      'compound-interest-calculator',
      'percentage-calculator',
    ],
  },

  // 10. Ireland
  IE: {
    code: 'IE',
    slug: 'ireland',
    name: 'Ireland',
    nativeName: 'Éire',
    flag: '🇮🇪',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'en-IE',
    numberSystem: 'international',
    dateFormat: 'DD/MM/YYYY',
    unitSystem: 'metric',
    isPopular: true,
    popularCalculators: ['salary-calculator', 'mortgage-calculator', 'compound-interest-calculator'],
  },

  // 11. Netherlands
  NL: {
    code: 'NL',
    slug: 'netherlands',
    name: 'Netherlands',
    nativeName: 'Nederland',
    flag: '🇳🇱',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'nl-NL',
    numberSystem: 'international',
    dateFormat: 'DD-MM-YYYY',
    unitSystem: 'metric',
    isPopular: true,
    popularCalculators: ['salary-calculator', 'mortgage-calculator', 'compound-interest-calculator'],
  },

  // 12. New Zealand
  NZ: {
    code: 'NZ',
    slug: 'new-zealand',
    name: 'New Zealand',
    nativeName: 'New Zealand',
    flag: '🇳🇿',
    currency: 'NZD',
    currencySymbol: 'NZ$',
    locale: 'en-NZ',
    numberSystem: 'international',
    dateFormat: 'DD/MM/YYYY',
    unitSystem: 'metric',
    isPopular: true,
    popularCalculators: ['mortgage-calculator', 'salary-calculator', 'compound-interest-calculator'],
  },

  // 13. Saudi Arabia
  SA: {
    code: 'SA',
    slug: 'saudi-arabia',
    name: 'Saudi Arabia',
    nativeName: 'المملكة العربية السعودية',
    flag: '🇸🇦',
    currency: 'SAR',
    currencySymbol: 'ر.س',
    locale: 'ar-SA',
    numberSystem: 'international',
    dateFormat: 'DD/MM/YYYY',
    unitSystem: 'metric',
    isPopular: true,
    popularCalculators: ['salary-calculator', 'loan-calculator', 'gratuity-calculator'],
  },

  // 14. Switzerland
  CH: {
    code: 'CH',
    slug: 'switzerland',
    name: 'Switzerland',
    nativeName: 'Schweiz',
    flag: '🇨🇭',
    currency: 'CHF',
    currencySymbol: 'CHF',
    locale: 'de-CH',
    numberSystem: 'international',
    dateFormat: 'DD.MM.YYYY',
    unitSystem: 'metric',
    isPopular: true,
    popularCalculators: ['salary-calculator', 'mortgage-calculator', 'compound-interest-calculator'],
  },

  // 15. South Africa
  ZA: {
    code: 'ZA',
    slug: 'south-africa',
    name: 'South Africa',
    nativeName: 'South Africa',
    flag: '🇿🇦',
    currency: 'ZAR',
    currencySymbol: 'R',
    locale: 'en-ZA',
    numberSystem: 'international',
    dateFormat: 'YYYY/MM/DD',
    unitSystem: 'metric',
    isPopular: true,
    popularCalculators: ['loan-calculator', 'salary-calculator', 'mortgage-calculator'],
  },

  // 16. Japan
  JP: {
    code: 'JP',
    slug: 'japan',
    name: 'Japan',
    nativeName: '日本',
    flag: '🇯🇵',
    currency: 'JPY',
    currencySymbol: '¥',
    locale: 'ja-JP',
    numberSystem: 'international',
    dateFormat: 'YYYY/MM/DD',
    unitSystem: 'metric',
    popularCalculators: ['salary-calculator', 'compound-interest-calculator', 'loan-calculator'],
  },

  // 17. Spain
  ES: {
    code: 'ES',
    slug: 'spain',
    name: 'Spain',
    nativeName: 'España',
    flag: '🇪🇸',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'es-ES',
    numberSystem: 'international',
    dateFormat: 'DD/MM/YYYY',
    unitSystem: 'metric',
    popularCalculators: ['salary-calculator', 'mortgage-calculator', 'compound-interest-calculator'],
  },

  // 18. Italy
  IT: {
    code: 'IT',
    slug: 'italy',
    name: 'Italy',
    nativeName: 'Italia',
    flag: '🇮🇹',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'it-IT',
    numberSystem: 'international',
    dateFormat: 'DD/MM/YYYY',
    unitSystem: 'metric',
    popularCalculators: ['salary-calculator', 'mortgage-calculator', 'compound-interest-calculator'],
  },

  // 19. Sweden
  SE: {
    code: 'SE',
    slug: 'sweden',
    name: 'Sweden',
    nativeName: 'Sverige',
    flag: '🇸🇪',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'sv-SE',
    numberSystem: 'international',
    dateFormat: 'YYYY-MM-DD',
    unitSystem: 'metric',
    popularCalculators: ['salary-calculator', 'mortgage-calculator', 'percentage-calculator'],
  },

  // 20. Norway
  NO: {
    code: 'NO',
    slug: 'norway',
    name: 'Norway',
    nativeName: 'Norge',
    flag: '🇳🇴',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'nb-NO',
    numberSystem: 'international',
    dateFormat: 'DD.MM.YYYY',
    unitSystem: 'metric',
    popularCalculators: ['salary-calculator', 'mortgage-calculator', 'compound-interest-calculator'],
  },

  // 21. Denmark
  DK: {
    code: 'DK',
    slug: 'denmark',
    name: 'Denmark',
    nativeName: 'Danmark',
    flag: '🇩🇰',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'da-DK',
    numberSystem: 'international',
    dateFormat: 'DD.MM.YYYY',
    unitSystem: 'metric',
    popularCalculators: ['salary-calculator', 'mortgage-calculator'],
  },

  // 22. Poland
  PL: {
    code: 'PL',
    slug: 'poland',
    name: 'Poland',
    nativeName: 'Polska',
    flag: '🇵🇱',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'pl-PL',
    numberSystem: 'international',
    dateFormat: 'DD.MM.YYYY',
    unitSystem: 'metric',
    popularCalculators: ['salary-calculator', 'loan-calculator', 'mortgage-calculator'],
  },

  // 23. Brazil
  BR: {
    code: 'BR',
    slug: 'brazil',
    name: 'Brazil',
    nativeName: 'Brasil',
    flag: '🇧🇷',
    currency: 'USD',
    currencySymbol: '$',
    locale: 'pt-BR',
    numberSystem: 'international',
    dateFormat: 'DD/MM/YYYY',
    unitSystem: 'metric',
    popularCalculators: ['compound-interest-calculator', 'loan-calculator', 'salary-calculator'],
  },

  // 24. Mexico
  MX: {
    code: 'MX',
    slug: 'mexico',
    name: 'Mexico',
    nativeName: 'México',
    flag: '🇲🇽',
    currency: 'USD',
    currencySymbol: '$',
    locale: 'es-MX',
    numberSystem: 'international',
    dateFormat: 'DD/MM/YYYY',
    unitSystem: 'metric',
    popularCalculators: ['salary-calculator', 'loan-calculator', 'mortgage-calculator'],
  },

  // 25. South Korea
  KR: {
    code: 'KR',
    slug: 'south-korea',
    name: 'South Korea',
    nativeName: '대한민국',
    flag: '🇰🇷',
    currency: 'USD',
    currencySymbol: '$',
    locale: 'ko-KR',
    numberSystem: 'international',
    dateFormat: 'YYYY. MM. DD.',
    unitSystem: 'metric',
    popularCalculators: ['compound-interest-calculator', 'salary-calculator', 'bmi-calculator'],
  },
};

// Supplementary global country index allowing clean scale to 100+ nations
const SUPPLEMENTARY_NATIONS: Array<Pick<CountryConfig, 'code' | 'slug' | 'name' | 'flag' | 'currency' | 'currencySymbol' | 'locale' | 'unitSystem'>> = [
  { code: 'AT', slug: 'austria', name: 'Austria', flag: '🇦🇹', currency: 'EUR', currencySymbol: '€', locale: 'de-AT', unitSystem: 'metric' },
  { code: 'BE', slug: 'belgium', name: 'Belgium', flag: '🇧🇪', currency: 'EUR', currencySymbol: '€', locale: 'nl-BE', unitSystem: 'metric' },
  { code: 'PT', slug: 'portugal', name: 'Portugal', flag: '🇵🇹', currency: 'EUR', currencySymbol: '€', locale: 'pt-PT', unitSystem: 'metric' },
  { code: 'FI', slug: 'finland', name: 'Finland', flag: '🇫🇮', currency: 'EUR', currencySymbol: '€', locale: 'fi-FI', unitSystem: 'metric' },
  { code: 'GR', slug: 'greece', name: 'Greece', flag: '🇬🇷', currency: 'EUR', currencySymbol: '€', locale: 'el-GR', unitSystem: 'metric' },
  { code: 'CZ', slug: 'czech-republic', name: 'Czech Republic', flag: '🇨🇿', currency: 'EUR', currencySymbol: '€', locale: 'cs-CZ', unitSystem: 'metric' },
  { code: 'HU', slug: 'hungary', name: 'Hungary', flag: '🇭🇺', currency: 'EUR', currencySymbol: '€', locale: 'hu-HU', unitSystem: 'metric' },
  { code: 'RO', slug: 'romania', name: 'Romania', flag: '🇷🇴', currency: 'EUR', currencySymbol: '€', locale: 'ro-RO', unitSystem: 'metric' },
  { code: 'TR', slug: 'turkey', name: 'Turkey', flag: '🇹🇷', currency: 'USD', currencySymbol: '$', locale: 'tr-TR', unitSystem: 'metric' },
  { code: 'MY', slug: 'malaysia', name: 'Malaysia', flag: '🇲🇾', currency: 'USD', currencySymbol: '$', locale: 'en-MY', unitSystem: 'metric' },
  { code: 'PH', slug: 'philippines', name: 'Philippines', flag: '🇵🇭', currency: 'USD', currencySymbol: '$', locale: 'en-PH', unitSystem: 'metric' },
  { code: 'ID', slug: 'indonesia', name: 'Indonesia', flag: '🇮🇩', currency: 'USD', currencySymbol: '$', locale: 'id-ID', unitSystem: 'metric' },
  { code: 'TH', slug: 'thailand', name: 'Thailand', flag: '🇹🇭', currency: 'USD', currencySymbol: '$', locale: 'th-TH', unitSystem: 'metric' },
  { code: 'VN', slug: 'vietnam', name: 'Vietnam', flag: '🇻🇳', currency: 'USD', currencySymbol: '$', locale: 'vi-VN', unitSystem: 'metric' },
  { code: 'EG', slug: 'egypt', name: 'Egypt', flag: '🇪🇬', currency: 'USD', currencySymbol: '$', locale: 'ar-EG', unitSystem: 'metric' },
  { code: 'NG', slug: 'nigeria', name: 'Nigeria', flag: '🇳🇬', currency: 'USD', currencySymbol: '$', locale: 'en-NG', unitSystem: 'metric' },
  { code: 'KE', slug: 'kenya', name: 'Kenya', flag: '🇰🇪', currency: 'USD', currencySymbol: '$', locale: 'en-KE', unitSystem: 'metric' },
  { code: 'CL', slug: 'chile', name: 'Chile', flag: '🇨🇱', currency: 'USD', currencySymbol: '$', locale: 'es-CL', unitSystem: 'metric' },
  { code: 'CO', slug: 'colombia', name: 'Colombia', flag: '🇨🇴', currency: 'USD', currencySymbol: '$', locale: 'es-CO', unitSystem: 'metric' },
  { code: 'AR', slug: 'argentina', name: 'Argentina', flag: '🇦🇷', currency: 'USD', currencySymbol: '$', locale: 'es-AR', unitSystem: 'metric' },
  { code: 'QA', slug: 'qatar', name: 'Qatar', flag: '🇶🇦', currency: 'USD', currencySymbol: '$', locale: 'ar-QA', unitSystem: 'metric' },
  { code: 'KW', slug: 'kuwait', name: 'Kuwait', flag: '🇰🇼', currency: 'USD', currencySymbol: '$', locale: 'ar-KW', unitSystem: 'metric' },
  { code: 'OM', slug: 'oman', name: 'Oman', flag: '🇴🇲', currency: 'USD', currencySymbol: '$', locale: 'ar-OM', unitSystem: 'metric' },
  { code: 'BH', slug: 'bahrain', name: 'Bahrain', flag: '🇧🇭', currency: 'USD', currencySymbol: '$', locale: 'ar-BH', unitSystem: 'metric' },
  { code: 'IL', slug: 'israel', name: 'Israel', flag: '🇮🇱', currency: 'USD', currencySymbol: '$', locale: 'he-IL', unitSystem: 'metric' },
  { code: 'HK', slug: 'hong-kong', name: 'Hong Kong', flag: '🇭🇰', currency: 'USD', currencySymbol: '$', locale: 'zh-HK', unitSystem: 'metric' },
  { code: 'TW', slug: 'taiwan', name: 'Taiwan', flag: '🇹🇼', currency: 'USD', currencySymbol: '$', locale: 'zh-TW', unitSystem: 'metric' },
];

// Hydrate supplementary nations into master COUNTRIES map
for (const n of SUPPLEMENTARY_NATIONS) {
  if (!COUNTRIES[n.code]) {
    COUNTRIES[n.code] = {
      code: n.code,
      slug: n.slug,
      name: n.name,
      nativeName: n.name,
      flag: n.flag,
      currency: n.currency,
      currencySymbol: n.currencySymbol,
      locale: n.locale,
      numberSystem: 'international',
      dateFormat: 'DD/MM/YYYY',
      unitSystem: n.unitSystem,
      isPopular: false,
      popularCalculators: ['compound-interest-calculator', 'mortgage-calculator', 'loan-calculator', 'percentage-calculator'],
    };
  }
}

export const COUNTRY_LIST: CountryConfig[] = Object.values(COUNTRIES).sort((a, b) =>
  a.name.localeCompare(b.name)
);

export const POPULAR_COUNTRIES: CountryConfig[] = Object.values(COUNTRIES).filter(
  (c) => c.isPopular
);

export function getCountryByCode(code?: string | null): CountryConfig {
  if (!code) return COUNTRIES.US;
  const upper = code.toUpperCase();
  return COUNTRIES[upper] || COUNTRIES.US;
}

export function getCountryBySlug(slug?: string | null): CountryConfig | undefined {
  if (!slug) return undefined;
  const lower = slug.toLowerCase();
  return COUNTRY_LIST.find((c) => c.slug === lower);
}

/**
 * Format any number specifically respecting the country's grouping style (e.g. Lakh/Crore vs Millions)
 */
export function formatNumberForCountry(
  val: number,
  country: CountryConfig,
  options: { decimals?: number } = {}
): string {
  if (isNaN(val) || !isFinite(val)) return '0';
  const decimals = options.decimals ?? 2;

  try {
    return new Intl.NumberFormat(country.locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(val);
  } catch (_) {
    return val.toFixed(decimals);
  }
}
