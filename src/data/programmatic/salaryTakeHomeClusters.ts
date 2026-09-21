// src/data/programmatic/salaryTakeHomeClusters.ts

export interface SalaryClusterPage {
  slug: string;
  country: string;
  regionCode: string;
  currencySymbol: string;
  grossIncome: number;
  payFrequency: 'monthly' | 'annual';
  estimatedTaxRate: number; // Effective rate percentage
  mandatoryDeductionRate: number; // Social Security / EPF / National Insurance %
  title: string;
  metaDescription: string;
  h1: string;
  faqs: Array<{ question: string; answer: string }>;
}

// All obsolete salary scenario records have been permanently removed (forensic URL cleanup).
// The scenario system is retained: add new records here to generate new /finance/salary/[slug]/ pages.
export const SALARY_CLUSTERS: SalaryClusterPage[] = [];
