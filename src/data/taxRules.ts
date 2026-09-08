// src/data/taxRules.ts

export interface TaxBracket {
  thresholdMin: number;
  thresholdMax: number | null; // null for open-ended top bracket
  rate: number; // decimal, e.g. 0.10 for 10%
}

export interface CountryTaxRule {
  countryCode: string; // e.g. 'IN', 'US', 'GB', 'CA', 'AU'
  countryName: string;
  jurisdiction: string; // e.g. 'Federal', 'England, Wales & NI', 'Scotland'
  taxYear: string; // Official tax year nomenclature e.g. 'FY 2025–26 (AY 2026–27)'
  effectiveStartDate: string;
  effectiveEndDate: string;
  sourceAuthority: string;
  sourceUrl: string;
  lastVerifiedDate: string; // e.g. '2026-09-09'
  currency: string;
  standardDeductions?: Record<string, number>;
  personalAllowance?: {
    baseAmount: number;
    taperThreshold?: number;
    taperRate?: number; // e.g. 0.5 (£1 lost per £2 above threshold)
  };
  brackets: TaxBracket[];
  rebates?: {
    name: string;
    maxIncomeThreshold: number;
    maxRebateAmount: number;
  };
  statutoryCessOrLevy?: {
    name: string;
    rate: number; // e.g. 0.04 for 4% cess
  };
  notes: string;
}

export const COUNTRY_TAX_RULES: Record<string, CountryTaxRule> = {
  // 1. India: New Tax Regime (Section 115BAC(1A), Finance Act 2024 / FY 2025–26 & AY 2026–27)
  'IN-NEW': {
    countryCode: 'IN',
    countryName: 'India',
    jurisdiction: 'Union of India (Central)',
    taxYear: 'FY 2025–26 (AY 2026–27)',
    effectiveStartDate: '2024-04-01',
    effectiveEndDate: '2026-03-31',
    sourceAuthority: 'Income Tax Department, Ministry of Finance, Government of India',
    sourceUrl: 'https://incometaxindia.gov.in',
    lastVerifiedDate: '2026-09-09',
    currency: 'INR',
    standardDeductions: {
      salaried: 75000,
    },
    brackets: [
      { thresholdMin: 0, thresholdMax: 300000, rate: 0.0 },
      { thresholdMin: 300000, thresholdMax: 700000, rate: 0.05 },
      { thresholdMin: 700000, thresholdMax: 1000000, rate: 0.10 },
      { thresholdMin: 1000000, thresholdMax: 1200000, rate: 0.15 },
      { thresholdMin: 1200000, thresholdMax: 1500000, rate: 0.20 },
      { thresholdMin: 1500000, thresholdMax: null, rate: 0.30 },
    ],
    rebates: {
      name: 'Section 87A Rebate',
      maxIncomeThreshold: 700000, // Taxable income up to ₹7,00,000 gets 100% tax rebate (up to ₹25,000)
      maxRebateAmount: 25000,
    },
    statutoryCessOrLevy: {
      name: 'Health and Education Cess',
      rate: 0.04,
    },
    notes: 'Default tax regime under Section 115BAC(1A). Salaried individuals receive ₹75,000 standard deduction. Gross salary up to ₹7,75,000 incurs ₹0 net tax liability after rebate.',
  },

  // 2. India: Old Tax Regime (Optional for individuals claiming 80C/80D/HRA)
  'IN-OLD': {
    countryCode: 'IN',
    countryName: 'India',
    jurisdiction: 'Union of India (Central)',
    taxYear: 'FY 2025–26 (AY 2026–27)',
    effectiveStartDate: '2024-04-01',
    effectiveEndDate: '2026-03-31',
    sourceAuthority: 'Income Tax Department, Ministry of Finance, Government of India',
    sourceUrl: 'https://incometaxindia.gov.in',
    lastVerifiedDate: '2026-09-09',
    currency: 'INR',
    standardDeductions: {
      salaried: 50000,
    },
    brackets: [
      { thresholdMin: 0, thresholdMax: 250000, rate: 0.0 },
      { thresholdMin: 250000, thresholdMax: 500000, rate: 0.05 },
      { thresholdMin: 500000, thresholdMax: 1000000, rate: 0.20 },
      { thresholdMin: 1000000, thresholdMax: null, rate: 0.30 },
    ],
    rebates: {
      name: 'Section 87A Rebate',
      maxIncomeThreshold: 500000,
      maxRebateAmount: 12500,
    },
    statutoryCessOrLevy: {
      name: 'Health and Education Cess',
      rate: 0.04,
    },
    notes: 'Old tax regime allowing Chapter VI-A deductions (80C, 80D, HRA). Taxable income up to ₹5,00,000 is tax-free after rebate.',
  },

  // 3. United States: Federal Single Filer (IRS Rev. Proc. 2024-40 / Tax Year 2025/2026)
  'US-FED-SINGLE': {
    countryCode: 'US',
    countryName: 'United States',
    jurisdiction: 'Federal',
    taxYear: 'Tax Year 2025 / 2026',
    effectiveStartDate: '2025-01-01',
    effectiveEndDate: '2026-12-31',
    sourceAuthority: 'Internal Revenue Service (IRS), US Department of the Treasury',
    sourceUrl: 'https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2025',
    lastVerifiedDate: '2026-09-09',
    currency: 'USD',
    standardDeductions: {
      single: 15000,
    },
    brackets: [
      { thresholdMin: 0, thresholdMax: 11925, rate: 0.10 },
      { thresholdMin: 11925, thresholdMax: 48475, rate: 0.12 },
      { thresholdMin: 48475, thresholdMax: 103350, rate: 0.22 },
      { thresholdMin: 103350, thresholdMax: 197300, rate: 0.24 },
      { thresholdMin: 197300, thresholdMax: 250525, rate: 0.32 },
      { thresholdMin: 250525, thresholdMax: 626350, rate: 0.35 },
      { thresholdMin: 626350, thresholdMax: null, rate: 0.37 },
    ],
    notes: 'Federal income tax only. Excludes state/local income taxes and employee FICA taxes (Social Security 6.2% up to $176,100 cap; Medicare 1.45%).',
  },

  // 4. United States: Federal Married Filing Jointly
  'US-FED-JOINT': {
    countryCode: 'US',
    countryName: 'United States',
    jurisdiction: 'Federal',
    taxYear: 'Tax Year 2025 / 2026',
    effectiveStartDate: '2025-01-01',
    effectiveEndDate: '2026-12-31',
    sourceAuthority: 'Internal Revenue Service (IRS), US Department of the Treasury',
    sourceUrl: 'https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2025',
    lastVerifiedDate: '2026-09-09',
    currency: 'USD',
    standardDeductions: {
      married_joint: 30000,
    },
    brackets: [
      { thresholdMin: 0, thresholdMax: 23850, rate: 0.10 },
      { thresholdMin: 23850, thresholdMax: 96950, rate: 0.12 },
      { thresholdMin: 96950, thresholdMax: 206700, rate: 0.22 },
      { thresholdMin: 206700, thresholdMax: 394600, rate: 0.24 },
      { thresholdMin: 394600, thresholdMax: 501050, rate: 0.32 },
      { thresholdMin: 501050, thresholdMax: 751600, rate: 0.35 },
      { thresholdMin: 751600, thresholdMax: null, rate: 0.37 },
    ],
    notes: 'Federal income tax for married taxpayers filing a joint return. Excludes state and local taxes.',
  },

  // 5. United Kingdom: England, Wales & Northern Ireland (HMRC)
  'GB-EWNI': {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    jurisdiction: 'England, Wales & Northern Ireland',
    taxYear: 'Tax Year 2025–26 / 2026–27',
    effectiveStartDate: '2025-04-06',
    effectiveEndDate: '2027-04-05',
    sourceAuthority: 'HM Revenue & Customs (HMRC), GOV.UK',
    sourceUrl: 'https://www.gov.uk/income-tax-rates',
    lastVerifiedDate: '2026-09-09',
    currency: 'GBP',
    personalAllowance: {
      baseAmount: 12570,
      taperThreshold: 100000,
      taperRate: 0.5,
    },
    brackets: [
      { thresholdMin: 0, thresholdMax: 37700, rate: 0.20 }, // £12,571 to £50,270 taxable above allowance
      { thresholdMin: 37700, thresholdMax: 112570, rate: 0.40 }, // £50,271 to £125,140
      { thresholdMin: 112570, thresholdMax: null, rate: 0.45 }, // over £125,140
    ],
    notes: 'Personal Allowance is £12,570. Tapers by £1 for every £2 of income over £100,000, reducing to £0 at £125,140. Excludes National Insurance.',
  },

  // 6. United Kingdom: Scotland (Scottish Income Tax Bands)
  'GB-SCOTLAND': {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    jurisdiction: 'Scotland',
    taxYear: 'Tax Year 2025–26 / 2026–27',
    effectiveStartDate: '2025-04-06',
    effectiveEndDate: '2027-04-05',
    sourceAuthority: 'Scottish Government / HMRC',
    sourceUrl: 'https://www.gov.scot/policies/taxes/income-tax/',
    lastVerifiedDate: '2026-09-09',
    currency: 'GBP',
    personalAllowance: {
      baseAmount: 12570,
      taperThreshold: 100000,
      taperRate: 0.5,
    },
    brackets: [
      { thresholdMin: 0, thresholdMax: 2306, rate: 0.19 }, // Starter: £12,571 - £14,876
      { thresholdMin: 2306, thresholdMax: 13991, rate: 0.20 }, // Basic: £14,877 - £26,561
      { thresholdMin: 13991, thresholdMax: 31092, rate: 0.21 }, // Intermediate: £26,562 - £43,662
      { thresholdMin: 31092, thresholdMax: 62430, rate: 0.42 }, // Higher: £43,663 - £75,000
      { thresholdMin: 62430, thresholdMax: 112570, rate: 0.45 }, // Advanced: £75,001 - £125,140
      { thresholdMin: 112570, thresholdMax: null, rate: 0.48 }, // Top: Over £125,140
    ],
    notes: 'Scottish Income Tax features 6 progressive tax bands set by the Scottish Parliament. Scottish rates apply to non-savings non-dividend income for Scottish residents.',
  },

  // 7. Australia: Resident Individuals (ATO Revised Stage 3 Cuts)
  'AU-RESIDENT': {
    countryCode: 'AU',
    countryName: 'Australia',
    jurisdiction: 'Commonwealth of Australia (Federal)',
    taxYear: 'FY 2025–26',
    effectiveStartDate: '2024-07-01',
    effectiveEndDate: '2026-06-30',
    sourceAuthority: 'Australian Taxation Office (ATO)',
    sourceUrl: 'https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents',
    lastVerifiedDate: '2026-09-09',
    currency: 'AUD',
    brackets: [
      { thresholdMin: 0, thresholdMax: 18200, rate: 0.0 },
      { thresholdMin: 18200, thresholdMax: 45000, rate: 0.16 },
      { thresholdMin: 45000, thresholdMax: 135000, rate: 0.30 },
      { thresholdMin: 135000, thresholdMax: 190000, rate: 0.37 },
      { thresholdMin: 190000, thresholdMax: null, rate: 0.45 },
    ],
    statutoryCessOrLevy: {
      name: 'Medicare Levy',
      rate: 0.02,
    },
    notes: 'Revised Stage 3 tax cuts effective 1 July 2024. Includes 2% standard Medicare levy for eligible Australian residents.',
  },

  // 8. Canada: Federal Individuals (CRA 2025/2026 Indexation)
  'CA-FEDERAL': {
    countryCode: 'CA',
    countryName: 'Canada',
    jurisdiction: 'Federal',
    taxYear: 'Tax Year 2025 / 2026',
    effectiveStartDate: '2025-01-01',
    effectiveEndDate: '2026-12-31',
    sourceAuthority: 'Canada Revenue Agency (CRA)',
    sourceUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/canadian-income-tax-rates-individuals-current-previous-years.html',
    lastVerifiedDate: '2026-09-09',
    currency: 'CAD',
    brackets: [
      { thresholdMin: 0, thresholdMax: 57375, rate: 0.15 },
      { thresholdMin: 57375, thresholdMax: 114750, rate: 0.205 },
      { thresholdMin: 114750, thresholdMax: 177882, rate: 0.26 },
      { thresholdMin: 177882, thresholdMax: 253414, rate: 0.29 },
      { thresholdMin: 253414, thresholdMax: null, rate: 0.33 },
    ],
    notes: 'Federal income tax only. Provincial taxes (e.g., Ontario, BC, Quebec) are additional and vary by province.',
  },
};
