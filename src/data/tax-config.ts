// Shared statutory tax configuration for global tax calculators.

export interface TaxBracketConfig {
  min: number;
  max: number | null;
  rate: number;
}

export interface SurchargeTier {
  min: number;
  max: number | null;
  rate: number;
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

export interface TaxConfig2026 {
  taxYear: string;
  sourceAuthority: string;
  sourceUrl: string;
  lastVerifiedDate: string;
  cessRate?: number;
  standardDeductions: Record<string, number>;
  limits?: Record<string, number>;
  regimes?: Record<string, TaxRegimeConfig>;
  brackets?: Record<string, TaxBracketConfig[]>;
  surchargeTiers?: SurchargeTier[];
  notes?: string;
}

export const INDIA_TAX_CONFIG_2026: TaxConfig2026 = {
  taxYear: 'FY 2026–27 (AY 2027–28)',
  sourceAuthority: 'Income Tax Department, Ministry of Finance, Government of India',
  sourceUrl: 'https://incometaxindia.gov.in',
  lastVerifiedDate: '2026-09-09',
  cessRate: 0.04,
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
      rebate: { name: 'Section 87A Rebate', threshold: 700000, maxAmount: 25000 },
      surchargeTiers: [
        { min: 5000000, max: 10000000, rate: 0.10 },
        { min: 10000000, max: 20000000, rate: 0.15 },
        { min: 20000000, max: 50000000, rate: 0.25 },
        { min: 50000000, max: null, rate: 0.25 },
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
      rebate: { name: 'Section 87A Rebate', threshold: 500000, maxAmount: 12500 },
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

export const US_TAX_CONFIG_2026: TaxConfig2026 = {
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
