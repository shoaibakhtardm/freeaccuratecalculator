// src/data/calculators.ts
import type { CalculatorEntity, CalculatorCatalogItem } from '../types/calculator';

/**
 * PHASE 1 DISCOVERY: Complete index of all calculators found across the frontend
 * (src/pages/index.astro, Navigation, Hubs, and Category Grids)
 */
export const ALL_FRONTEND_CALCULATORS: CalculatorCatalogItem[] = [
  // Finance
  { name: 'SIP & Investment Calculator', slug: 'sip-calculator', category: 'finance', href: '/sip-calculator/' },
  { name: 'EMI Calculator', slug: 'emi-calculator', category: 'finance', href: '/emi-calculator/' },
  { name: 'Mortgage Calculator', slug: 'mortgage-calculator', category: 'finance', href: '/mortgage-calculator/' },
  { name: 'Compound Interest Calculator', slug: 'compound-interest-calculator', category: 'finance', href: '/compound-interest-calculator/' },
  { name: 'Loan Amortization Calculator', slug: 'amortization-calculator', category: 'finance', href: '/amortization-calculator/' },
  { name: 'Auto Loan Calculator', slug: 'auto-loan-calculator', category: 'finance', href: '/auto-loan-calculator/' },
  { name: 'Profit Margin Calculator', slug: 'profit-margin-calculator', category: 'finance', href: '/profit-margin-calculator/' },

  // Insurance
  { name: 'Term Life Insurance Calculator', slug: 'term-life-insurance-calculator', category: 'insurance', href: '/term-life-insurance-calculator/' },
  { name: 'Health Insurance Calculator', slug: 'health-insurance-calculator', category: 'insurance', href: '/health-insurance-calculator/' },
  { name: 'Auto Insurance Estimator', slug: 'auto-insurance-calculator', category: 'insurance', href: '/auto-insurance-calculator/' },
  { name: 'Annuity Payout Calculator', slug: 'annuity-payout-calculator', category: 'insurance', href: '/annuity-payout-calculator/' },

  // Legal
  { name: 'Child Support Calculator', slug: 'child-support-calculator', category: 'legal', href: '/child-support-calculator/' },
  { name: 'Alimony Calculator', slug: 'alimony-calculator', category: 'legal', href: '/alimony-calculator/' },
  { name: 'Settlement Value Calculator', slug: 'settlement-value-calculator', category: 'legal', href: '/settlement-value-calculator/' },
  { name: 'Legal Fee Calculator', slug: 'legal-fee-calculator', category: 'legal', href: '/legal-fee-calculator/' },

  // Business
  { name: 'Break-Even Calculator', slug: 'break-even-calculator', category: 'business', href: '/break-even-calculator/' },
  { name: 'ROI Calculator', slug: 'roi-calculator', category: 'business', href: '/roi-calculator/' },
  { name: 'Business Valuation Calculator', slug: 'business-valuation-calculator', category: 'business', href: '/business-valuation-calculator/' },

  // Construction
  { name: 'Concrete Calculator', slug: 'concrete-calculator', category: 'construction', href: '/concrete-calculator/' },
  { name: 'Square Footage Calculator', slug: 'square-footage-calculator', category: 'construction', href: '/square-footage-calculator/' },
  { name: 'Paint Calculator', slug: 'paint-calculator', category: 'construction', href: '/paint-calculator/' },
  { name: 'Brick Calculator', slug: 'brick-calculator', category: 'construction', href: '/brick-calculator/' },

  // Real Estate
  { name: 'Rental Yield Calculator', slug: 'rental-yield-calculator', category: 'real-estate', href: '/rental-yield-calculator/' },
  { name: 'Property Tax Calculator', slug: 'property-tax-calculator', category: 'real-estate', href: '/property-tax-calculator/' },
  { name: 'Cap Rate Calculator', slug: 'cap-rate-calculator', category: 'real-estate', href: '/cap-rate-calculator/' },

  // Technology
  { name: 'Subnet Calculator', slug: 'subnet-calculator', category: 'technology', href: '/subnet-calculator/' },
  { name: 'Password Generator', slug: 'password-generator', category: 'technology', href: '/password-generator/' },
  { name: 'Bandwidth Calculator', slug: 'bandwidth-calculator', category: 'technology', href: '/bandwidth-calculator/' },
  { name: 'Data Transfer Calculator', slug: 'data-transfer-calculator', category: 'technology', href: '/data-transfer-calculator/' },

  // Health
  { name: 'Calorie Calculator', slug: 'calorie-calculator', category: 'health', href: '/calorie-calculator/' },
  { name: 'BMI Calculator', slug: 'bmi-calculator', category: 'health', href: '/bmi-calculator/' },
  { name: 'Body Fat Calculator', slug: 'body-fat-calculator', category: 'health', href: '/body-fat-calculator/' },
  { name: 'BMR Calculator', slug: 'bmr-calculator', category: 'health', href: '/bmr-calculator/' },
  { name: 'Ideal Weight Calculator', slug: 'ideal-weight-calculator', category: 'health', href: '/ideal-weight-calculator/' },
  { name: 'Running Pace Calculator', slug: 'pace-calculator', category: 'health', href: '/pace-calculator/' },

  // Statistics
  { name: 'Standard Deviation Calculator', slug: 'standard-deviation-calculator', category: 'statistics', href: '/standard-deviation-calculator/' },
  { name: 'Sample Size Calculator', slug: 'sample-size-calculator', category: 'statistics', href: '/sample-size-calculator/' },
  { name: 'Probability Calculator', slug: 'probability-calculator', category: 'statistics', href: '/probability-calculator/' },
  { name: 'Confidence Interval Calculator', slug: 'confidence-interval-calculator', category: 'statistics', href: '/confidence-interval-calculator/' },

  // Marketing
  { name: 'Conversion Rate Calculator', slug: 'conversion-rate-calculator', category: 'marketing', href: '/conversion-rate-calculator/' },
  { name: 'Customer Acquisition Cost (CAC)', slug: 'cac-calculator', category: 'marketing', href: '/cac-calculator/' },
  { name: 'ROAS Calculator', slug: 'roas-calculator', category: 'marketing', href: '/roas-calculator/' },
  { name: 'Email ROI Calculator', slug: 'email-roi-calculator', category: 'marketing', href: '/email-roi-calculator/' },

  // Math
  { name: 'Percentage Calculator', slug: 'percentage-calculator', category: 'math', href: '/percentage-calculator/' },
  { name: 'Scientific Calculator', slug: 'scientific-calculator', category: 'math', href: '/scientific-calculator/' },
  { name: 'Fraction Calculator', slug: 'fraction-calculator', category: 'math', href: '/fraction-calculator/' },
  { name: 'Triangle Calculator', slug: 'triangle-calculator', category: 'math', href: '/triangle-calculator/' },
  { name: 'Random Number Generator', slug: 'random-number-generator', category: 'math', href: '/random-number-generator/' },

  // Automotive
  { name: 'Fuel Cost Calculator', slug: 'fuel-cost-calculator', category: 'automotive', href: '/fuel-cost-calculator/' },
  { name: 'Gas Mileage (MPG) Calculator', slug: 'mpg-calculator', category: 'automotive', href: '/mpg-calculator/' },
  { name: 'Car Depreciation Calculator', slug: 'car-depreciation-calculator', category: 'automotive', href: '/car-depreciation-calculator/' },

  // Biology
  { name: 'Punnett Square Calculator', slug: 'punnett-square-calculator', category: 'biology', href: '/punnett-square-calculator/' },
  { name: 'Hardy-Weinberg Calculator', slug: 'hardy-weinberg-calculator', category: 'biology', href: '/hardy-weinberg-calculator/' },
  { name: 'Bacterial Growth Calculator', slug: 'bacterial-growth-calculator', category: 'biology', href: '/bacterial-growth-calculator/' },
  { name: 'Molecular Weight Calculator', slug: 'molecular-weight-calculator', category: 'biology', href: '/molecular-weight-calculator/' },

  // Chemistry
  { name: 'Molar Mass Calculator', slug: 'molar-mass-calculator', category: 'chemistry', href: '/molar-mass-calculator/' },
  { name: 'Solution Dilution Calculator', slug: 'solution-dilution-calculator', category: 'chemistry', href: '/solution-dilution-calculator/' },
  { name: 'pH Calculator', slug: 'ph-calculator', category: 'chemistry', href: '/ph-calculator/' },
  { name: 'Stoichiometry Calculator', slug: 'stoichiometry-calculator', category: 'chemistry', href: '/stoichiometry-calculator/' },

  // Physics
  { name: 'Velocity & Acceleration Calculator', slug: 'velocity-acceleration-calculator', category: 'physics', href: '/velocity-acceleration-calculator/' },
  { name: 'Kinetic Energy Calculator', slug: 'kinetic-energy-calculator', category: 'physics', href: '/kinetic-energy-calculator/' },
  { name: 'Ohms Law Calculator', slug: 'ohms-law-calculator', category: 'physics', href: '/ohms-law-calculator/' },
  { name: 'Projectile Motion Calculator', slug: 'projectile-motion-calculator', category: 'physics', href: '/projectile-motion-calculator/' },

  // Food
  { name: 'Recipe Scaler Calculator', slug: 'recipe-scaler-calculator', category: 'food', href: '/recipe-scaler-calculator/' },
  { name: 'Macronutrient Calculator', slug: 'macronutrient-calculator', category: 'food', href: '/macronutrient-calculator/' },
  { name: 'Bakers Percentage Calculator', slug: 'bakers-percentage-calculator', category: 'food', href: '/bakers-percentage-calculator/' },
  { name: 'Calorie per Serving Calculator', slug: 'calorie-per-serving-calculator', category: 'food', href: '/calorie-per-serving-calculator/' },

  // Sports
  { name: 'Target Heart Rate Zone Calculator', slug: 'heart-rate-zone-calculator', category: 'sports', href: '/heart-rate-zone-calculator/' },
  { name: 'One-Rep Max (1RM) Calculator', slug: 'one-rep-max-calculator', category: 'sports', href: '/one-rep-max-calculator/' },
  { name: 'Golf Handicap Calculator', slug: 'golf-handicap-calculator', category: 'sports', href: '/golf-handicap-calculator/' },

  // Ecology
  { name: 'Carbon Footprint Calculator', slug: 'carbon-footprint-calculator', category: 'ecology', href: '/carbon-footprint-calculator/' },
  { name: 'Solar Energy Calculator', slug: 'solar-energy-calculator', category: 'ecology', href: '/solar-energy-calculator/' },
  { name: 'Water Conservation Calculator', slug: 'water-conservation-calculator', category: 'ecology', href: '/water-conservation-calculator/' },
  { name: 'Compost Ratio Calculator', slug: 'compost-ratio-calculator', category: 'ecology', href: '/compost-ratio-calculator/' },

  // Everyday
  { name: 'Age Calculator', slug: 'age-calculator', category: 'everyday', href: '/age-calculator/' },
  { name: 'Online Ruler', slug: 'ruler', category: 'everyday', href: '/ruler/' },
  { name: 'Date Calculator', slug: 'date-calculator', category: 'everyday', href: '/date-calculator/' },
  { name: 'Time Calculator', slug: 'time-calculator', category: 'everyday', href: '/time-calculator/' },
  { name: 'GPA Calculator', slug: 'gpa-calculator', category: 'everyday', href: '/gpa-calculator/' },
  { name: 'Hours Calculator', slug: 'hours-calculator', category: 'everyday', href: '/hours-calculator/' },

  // Converter
  { name: 'Universal Conversion Calculator', slug: 'conversion-calculator', category: 'converter', href: '/conversion-calculator/' },
  { name: 'Length Converter', slug: 'length-converter', category: 'converter', href: '/length-converter/' },
  { name: 'Weight Converter', slug: 'weight-converter', category: 'converter', href: '/weight-converter/' },
  { name: 'Temperature Converter', slug: 'temperature-converter', category: 'converter', href: '/temperature-converter/' },

  { name: 'AI Prompt & Token Cost Calculator', slug: 'ai-token-cost-calculator', category: 'technology', href: '/ai-token-cost-calculator/' },

  // Finance: restored root-level routes (dedicated engines verified in FinanceCalculatorView)
  { name: 'Loan Calculator', slug: 'loan-calculator', category: 'finance', href: '/loan-calculator/' },
  { name: 'Salary Calculator', slug: 'salary-calculator', category: 'finance', href: '/salary-calculator/' },
  { name: '401(k) Calculator', slug: '401k-calculator', category: 'finance', href: '/401k-calculator/' },
  { name: 'Roth IRA Calculator', slug: 'roth-ira-calculator', category: 'finance', href: '/roth-ira-calculator/' },
  { name: 'Step-Up SIP Calculator', slug: 'step-up-sip-calculator', category: 'finance', href: '/step-up-sip-calculator/' },
  { name: 'Lumpsum Calculator', slug: 'lumpsum-calculator', category: 'finance', href: '/lumpsum-calculator/' },

  // Insurance: restored root-level routes (dedicated engines verified in FinanceCalculatorView)
  { name: 'Whole Life Insurance Calculator', slug: 'whole-life-insurance-calculator', category: 'insurance', href: '/whole-life-insurance-calculator/' },
  { name: 'Disability Insurance Calculator', slug: 'disability-insurance-calculator', category: 'insurance', href: '/disability-insurance-calculator/' },

  // Expanded Core Calculators
  { name: 'Tip Calculator', slug: 'tip-calculator', category: 'everyday', href: '/tip-calculator/' },
  { name: 'Discount Calculator', slug: 'discount-calculator', category: 'everyday', href: '/discount-calculator/' },
  { name: 'Ovulation Calculator', slug: 'ovulation-calculator', category: 'health', href: '/ovulation-calculator/' },
  { name: 'Pregnancy Due Date Calculator', slug: 'pregnancy-due-date-calculator', category: 'health', href: '/pregnancy-due-date-calculator/' },
  { name: 'Inflation Calculator', slug: 'inflation-calculator', category: 'finance', href: '/inflation-calculator/' },
];

/**
 * Centralized Seed Data Store for Programmatic Calculator Generation
 * Includes exact 5 intent-driven FAQs, dynamic inputs, formulas, and math engine triggers.
 */
export const PROGRAMMATIC_CALCULATORS: CalculatorEntity[] = [
  // 1. BMI Calculator (Health)
  {
    slug: 'bmi-calculator',
    title: 'BMI Calculator — Accurate Body Mass Index & Category',
    metaDescription: 'Free accurate BMI calculator. Instantly check your Body Mass Index, WHO weight classification, and healthy target weight range with zero data tracking.',
    category: 'health',
    name: 'BMI Calculator',
    badge: 'WHO Standard',
    formula: 'BMI = \\frac{\\text{Weight (kg)}}{[\\text{Height (m)}]^2}',
    formulaExplanation: 'Body Mass Index (BMI) is calculated by dividing your body weight in kilograms by the square of your height in meters.',
    engineType: 'health',
    resultLabel: 'Your Body Mass Index (BMI)',
    resultUnit: 'kg/m²',
    decimals: 1,
    mathInputs: [
      {
        id: 'heightCm',
        label: 'Height (cm)',
        type: 'number',
        defaultValue: 175,
        min: 50,
        max: 260,
        step: 0.5,
        unit: 'cm',
        helpText: 'Enter your height in centimeters (e.g., 175 cm)',
      },
      {
        id: 'weightKg',
        label: 'Weight (kg)',
        type: 'number',
        defaultValue: 70,
        min: 20,
        max: 300,
        step: 0.1,
        unit: 'kg',
        helpText: 'Enter your body weight in kilograms (e.g., 70 kg)',
      },
    ],
    faqs: [
      {
        question: 'What is a healthy BMI range for adults?',
        answer: 'According to the World Health Organization (WHO), a normal healthy BMI for adults is between 18.5 and 24.9. A BMI below 18.5 is considered underweight, 25.0 to 29.9 is overweight, and 30.0 or higher is classified as obese.',
      },
      {
        question: 'How is BMI calculated mathematically?',
        answer: 'BMI is calculated using the metric formula: weight in kilograms divided by height in meters squared (BMI = kg / m²). For imperial measurements, multiply weight in pounds by 703 and divide by height in inches squared.',
      },
      {
        question: 'Does BMI distinguish between muscle mass and body fat?',
        answer: 'No, standard BMI does not distinguish between adipose tissue (fat) and lean muscle mass. Athletes and bodybuilders with high muscle density may register as overweight despite having low body fat percentages.',
      },
      {
        question: 'Is BMI evaluated differently for men and women?',
        answer: 'The standard WHO BMI formula and classification cutoffs are identical for adult men and women. However, body fat percentages at any given BMI level tend to naturally differ between sexes.',
      },
      {
        question: 'What are the main health risks associated with a high BMI?',
        answer: 'A sustained BMI above 30 is clinically correlated with increased cardiovascular disease risk, type 2 diabetes, hypertension, sleep apnea, and osteoarthritic strain on weight-bearing joints.',
      },
    ],
  },

  // 2. EMI Calculator (Finance)
  {
    slug: 'emi-calculator',
    title: 'EMI Calculator — Loan Equated Monthly Installment & Amortization',
    metaDescription: 'Calculate accurate equated monthly installments (EMI) for home, personal, and car loans. Discover total interest, repayment breakdown, and payoff timelines.',
    category: 'finance',
    name: 'EMI Calculator',
    badge: 'Banking Grade',
    formula: 'EMI = \\frac{P \\cdot r \\cdot (1+r)^n}{(1+r)^n - 1}',
    formulaExplanation: 'Equated Monthly Installment is derived using standard reducing balance amortization, where P is loan principal, r is periodic interest rate, and n is total months.',
    engineType: 'finance',
    resultLabel: 'Monthly EMI Payment',
    resultPrefix: '$',
    decimals: 2,
    mathInputs: [
      {
        id: 'principal',
        label: 'Loan Principal ($)',
        type: 'number',
        defaultValue: 250000,
        min: 1000,
        max: 50000000,
        step: 500,
        unit: '$',
        helpText: 'Total amount borrowed or financed',
      },
      {
        id: 'annualRate',
        label: 'Annual Interest Rate (%)',
        type: 'number',
        defaultValue: 7.5,
        min: 0.1,
        max: 50,
        step: 0.05,
        unit: '%',
        helpText: 'Nominal annual percentage interest rate',
      },
      {
        id: 'tenureYears',
        label: 'Loan Tenure (Years)',
        type: 'number',
        defaultValue: 20,
        min: 1,
        max: 40,
        step: 1,
        unit: 'yrs',
        helpText: 'Total repayment duration in years',
      },
    ],
    faqs: [
      {
        question: 'What does EMI stand for and how does it work?',
        answer: 'EMI stands for Equated Monthly Installment. It is a fixed monthly payment made by a borrower to a lender on a specified date each calendar month, covering both interest and principal repayment until the debt is cleared.',
      },
      {
        question: 'How does loan tenure affect total interest payable?',
        answer: 'A longer loan tenure lowers your monthly installment amount but significantly increases the cumulative interest paid over the life of the loan. A shorter tenure increases monthly payments but saves substantial money in interest.',
      },
      {
        question: 'What is the standard reducing balance method?',
        answer: 'In reducing balance amortization, interest is calculated solely on the outstanding principal balance remaining at the start of each payment cycle, causing the interest portion of each EMI to decrease over time.',
      },
      {
        question: 'Can I reduce my loan EMI after disbursement?',
        answer: 'Yes, you can lower your EMI or shorten your repayment tenure by making lump-sum prepayments towards the principal, or by refinancing with a lender offering a lower interest rate.',
      },
      {
        question: 'Are there hidden fees not included in basic EMI calculations?',
        answer: 'Standard EMI formulas account only for principal and stated interest. Additional lender expenses such as loan origination fees, appraisal charges, processing fees, and mandatory insurance are assessed separately.',
      },
    ],
  },

  // 3. Percentage Calculator (Math)
  {
    slug: 'percentage-calculator',
    title: 'Percentage Calculator — Quick, Accurate Percentage Solver',
    metaDescription: 'Free instant percentage calculator. Calculate what percent X is of Y, percentage increase or decrease, and solve fraction-to-percentage problems in seconds.',
    category: 'math',
    name: 'Percentage Calculator',
    badge: 'Instant Math',
    formula: 'P = \\left(\\frac{\\text{Percentage}}{100}\\right) \\times \\text{Total}',
    formulaExplanation: 'The percentage calculation determines the proportional value by scaling the percentage rate per 100 against the base quantity.',
    engineType: 'arithmetic',
    resultLabel: 'Calculated Value',
    decimals: 2,
    mathInputs: [
      {
        id: 'percentage',
        label: 'Percentage (%)',
        type: 'number',
        defaultValue: 15,
        min: 0,
        max: 100000,
        step: 0.1,
        unit: '%',
        helpText: 'The percentage rate to compute',
      },
      {
        id: 'total',
        label: 'Total Value',
        type: 'number',
        defaultValue: 200,
        min: 0,
        max: 1000000000,
        step: 1,
        helpText: 'The total base amount',
      },
    ],
    faqs: [
      {
        question: 'What is the simplest formula to find a percentage of a number?',
        answer: 'To find P% of a number N, convert the percentage into a decimal by dividing by 100, then multiply by N. For instance, to find 15% of 200: (15 / 100) × 200 = 0.15 × 200 = 30.',
      },
      {
        question: 'How do you calculate percentage increase between two values?',
        answer: 'To find percentage increase: subtract the original value from the new value, divide by the absolute original value, and multiply the quotient by 100: ((New - Old) / Old) × 100.',
      },
      {
        question: 'How do you convert a decimal into a percentage?',
        answer: 'Multiply the decimal number by 100 and append the percentage symbol (%). For example, 0.425 multiplied by 100 equals 42.5%.',
      },
      {
        question: 'What is the difference between percentage and percentage points?',
        answer: 'A percentage indicates a relative proportional change, while percentage points measure the absolute arithmetic difference between two percentages. An increase from 10% to 15% is a 5 percentage point increase, but a 50% relative increase.',
      },
      {
        question: 'Why are percentage calculations reversible?',
        answer: 'Because multiplication is commutative (A × B = B × A), X% of Y is always mathematically identical to Y% of X. For example, 8% of 50 equals 50% of 8, which is 4.',
      },
    ],
  },
];

/**
 * Data Access Helpers for Dynamic Routing and pSEO
 */
export function getAllCalculators(): CalculatorEntity[] {
  return PROGRAMMATIC_CALCULATORS;
}

export function getCalculatorBySlug(category: string, slug: string): CalculatorEntity | undefined {
  return PROGRAMMATIC_CALCULATORS.find(
    (c) => c.category.toLowerCase() === category.toLowerCase() && c.slug.toLowerCase() === slug.toLowerCase()
  );
}

export function getRelatedCalculators(category: string, currentSlug: string, limit: number = 3): CalculatorCatalogItem[] {
  // Find other calculators in the same category from full discovery catalog
  const filtered = ALL_FRONTEND_CALCULATORS.filter(
    (c) => c.category.toLowerCase() === category.toLowerCase() && c.slug.toLowerCase() !== currentSlug.toLowerCase()
  );

  if (filtered.length >= limit) {
    return filtered.slice(0, limit);
  }

  // If not enough in same category, pad with top finance/math/health tools
  const others = ALL_FRONTEND_CALCULATORS.filter(
    (c) => c.slug.toLowerCase() !== currentSlug.toLowerCase() && !filtered.some((f) => f.slug === c.slug)
  );

  return [...filtered, ...others].slice(0, limit);
}
