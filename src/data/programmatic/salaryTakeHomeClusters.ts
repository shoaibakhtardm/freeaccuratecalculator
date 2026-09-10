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

export const SALARY_CLUSTERS: SalaryClusterPage[] = [
  {
    slug: '50000-in-hand-salary-india-new-regime',
    country: 'India',
    regionCode: 'IN',
    currencySymbol: '₹',
    grossIncome: 50000,
    payFrequency: 'monthly',
    estimatedTaxRate: 0, // Zero under 87A rebate for ₹6L annual
    mandatoryDeductionRate: 12, // Standard EPF
    title: '₹50,000 Monthly In-Hand Salary in India (2025–26) — Net Pay & EPF Breakdown',
    metaDescription: 'Calculate the exact in-hand take-home pay for a ₹50,000 gross monthly salary in India under the New Tax Regime. Includes EPF and professional tax deductions.',
    h1: '₹50,000 Monthly In-Hand Salary (India)',
    faqs: [
      {
        question: 'How much is the in-hand salary for ₹50,000 per month in India?',
        answer: 'For a ₹50,000 gross monthly salary (₹6,00,000 annually), income tax is ₹0 under the Section 87A rebate (New Tax Regime). After deducting 12% employee EPF (approx ₹1,800–₹3,600 depending on basic pay) and ₹200 professional tax, your typical in-hand salary is approximately ₹46,200 to ₹48,000.'
      },
      {
        question: 'Is income tax deducted on ₹50,000 per month?',
        answer: 'No. Under the FY 2025–26 budget, annual income up to ₹7,75,000 (after standard deduction of ₹75,000) incurs zero net income tax under the New Regime.'
      }
    ]
  },
  {
    slug: '100000-in-hand-salary-india-new-regime',
    country: 'India',
    regionCode: 'IN',
    currencySymbol: '₹',
    grossIncome: 100000,
    payFrequency: 'monthly',
    estimatedTaxRate: 6.5,
    mandatoryDeductionRate: 12,
    title: '₹1 Lakh Monthly In-Hand Salary in India — Take-Home Calculation FY 25–26',
    metaDescription: 'Earning ₹1,00,000/month? See your exact monthly take-home salary after income tax, 4% cess, and employee PF deduction under the latest New Regime slabs.',
    h1: '₹1,00,000 Monthly In-Hand Salary (India)',
    faqs: [
      {
        question: 'What is the net take-home pay for ₹1,00,000 monthly salary?',
        answer: 'On an annual CTC of ₹12,00,000, total tax payable after the ₹75,000 standard deduction is approx ₹78,000/year (₹6,500/month). After EPF and professional tax, net take-home is approximately ₹88,500 to ₹90,200 per month.'
      }
    ]
  },
  {
    slug: '75000-salary-after-taxes-texas',
    country: 'United States',
    regionCode: 'US-TX',
    currencySymbol: '$',
    grossIncome: 75000,
    payFrequency: 'annual',
    estimatedTaxRate: 11.2, // Effective federal rate for single filer
    mandatoryDeductionRate: 7.65, // FICA (6.2% SS + 1.45% Medicare)
    title: '$75,000 Salary After Taxes in Texas (2025/2026) — Single Filer Net Pay',
    metaDescription: 'Calculate net pay on a $75,000 salary in Texas. 0% state income tax. See monthly, bi-weekly, and annual take-home after Federal tax and FICA.',
    h1: '$75,000 Salary After Taxes in Texas',
    faqs: [
      {
        question: 'How much do you take home on a $75k salary in Texas?',
        answer: 'Texas has 0% state income tax. After Federal Income Tax (~$8,400) and FICA (~$5,738), your annual take-home pay is approximately $60,862 ($5,071/month or $2,340 bi-weekly).'
      }
    ]
  },
  {
    slug: '120000-salary-after-taxes-california',
    country: 'United States',
    regionCode: 'US-CA',
    currencySymbol: '$',
    grossIncome: 120000,
    payFrequency: 'annual',
    estimatedTaxRate: 14.8, // Federal
    mandatoryDeductionRate: 14.25, // FICA (7.65%) + CA SDI (1.2%) + CA State Tax (~5.4%)
    title: '$120,000 Salary After Taxes in California — Take Home Pay Calculator',
    metaDescription: 'Find out how much you keep from a $120,000 salary in California. Breakdown includes federal tax, CA state income tax, SDI, and FICA deductions.',
    h1: '$120,000 Salary After Taxes in California',
    faqs: [
      {
        question: 'What is the bi-weekly paycheck for $120k in California?',
        answer: 'After Federal Tax (~$17,700), California State Tax (~$6,500), FICA ($9,180), and SDI ($1,440), your annual net pay is approx $85,180, giving a bi-weekly paycheck of ~$3,276.'
      }
    ]
  },
  {
    slug: '60000-salary-after-tax-uk',
    country: 'United Kingdom',
    regionCode: 'GB',
    currencySymbol: '£',
    grossIncome: 60000,
    payFrequency: 'annual',
    estimatedTaxRate: 19.1,
    mandatoryDeductionRate: 5.6, // National Insurance
    title: '£60,000 Salary After Tax UK (2025/2026) — Monthly Take Home Pay',
    metaDescription: 'Calculate take-home pay on a £60,000 UK salary. Includes 20% & 40% income tax bands, personal allowance, and class 1 employee National Insurance.',
    h1: '£60,000 Salary After Tax (UK)',
    faqs: [
      {
        question: 'What is the monthly take-home on a £60,000 salary in the UK?',
        answer: 'With a £12,570 tax-free personal allowance, income tax is £11,432 and National Insurance is approx £3,356. Your annual net pay is £45,212, which equals £3,767 per month.'
      }
    ]
  }
];
