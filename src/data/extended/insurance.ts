// src/data/extended/insurance.ts
import type { CalculatorEntry } from '../calculatorRegistry';

export const insuranceCalculators: CalculatorEntry[] = [
  {
    id: 'term-life-insurance-calculator',
    category: 'insurance',
    name: 'Term Life Insurance Calculator',
    title: 'Free Term Life Insurance Calculator — Recommended Death Benefit',
    description: 'Calculate adequate term life insurance coverage using income replacement duration, outstanding mortgages, and future dependent expenses.',
    badge: 'Actuarial Standard',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'DIME Method (Debt, Income, Mortgage, Education)',
      expression: 'Coverage = (Annual Income × Years) + Mortgage Debt + Consumer Debts + Education Costs - Existing Assets',
      explanation: 'Replaces lost family earnings through retirement age while liquidating all liabilities and college funds.',
      variables: [
        { symbol: 'Annual Income', meaning: 'Net annual earnings of the insured wage-earner' },
        { symbol: 'Years', meaning: 'Duration of support needed until dependents are self-sufficient' },
      ],
    },
    example: {
      title: 'Worked Example: 10-Year Family Income Protection',
      scenario: 'Income of $80,000 for 10 years ($800,000), $250,000 mortgage, $30,000 debt, and $80,000 existing liquid savings.',
      steps: [
        {
          number: 1,
          title: 'Sum Obligations',
          description: '$800,000 (Income) + $250,000 (Mortgage) + $30,000 (Debt) = $1,080,000.',
          mathExpression: '$1,080,000',
        },
        {
          number: 2,
          title: 'Subtract Existing Assets',
          description: '$1,080,000 - $80,000 = $1,000,000.',
          mathExpression: '$1,000,000',
        },
      ],
      conclusion: 'Recommended term life policy death benefit is $1,000,000.',
    },
    faqs: [
      {
        question: 'How long should a term life policy last?',
        answer: 'Most financial planners recommend matching term length to major financial obligations, such as until a 20 or 30-year mortgage is paid or children finish college.',
      },
    ],
    inputs: [
      { id: 'annual_income', label: 'Annual Income to Replace', type: 'number', defaultValue: 80000, min: 0, max: 10000000, unit: '$' },
      { id: 'replacement_years', label: 'Years of Replacement Needed', type: 'number', defaultValue: 10, min: 1, max: 40, unit: 'yrs' },
      { id: 'total_debts', label: 'Total Debts & Mortgage', type: 'number', defaultValue: 280000, min: 0, max: 20000000, unit: '$' },
      { id: 'existing_savings', label: 'Existing Liquid Savings & Coverage', type: 'number', defaultValue: 80000, min: 0, max: 20000000, unit: '$' },
    ],
    defaultResult: {
      label: 'Recommended Term Life Coverage',
      initialValue: 1000000,
      decimals: 0,
      secondaryText: 'Protects 10 years of earnings plus debt settlement',
      prefix: '$',
      accent: 'cyan',
    },
    computeScript: `
      const income = Math.max(0, Number(inputs.annual_income) || 80000);
      const years = Math.max(1, Number(inputs.replacement_years) || 10);
      const debts = Math.max(0, Number(inputs.total_debts) || 280000);
      const savings = Math.max(0, Number(inputs.existing_savings) || 80000);
      const coverage = Math.max(50000, (income * years) + debts - savings);
      return {
        value: coverage,
        secondaryText: 'Total Obligation: $' + ((income * years) + debts).toLocaleString() + ' | Net Protection: $' + coverage.toLocaleString(),
        badge: 'Recommended Policy'
      };
    `,
  },
  {
    id: 'health-insurance-calculator',
    category: 'insurance',
    name: 'Health Insurance Premium Calculator',
    title: 'Free Health Insurance Calculator — Out-of-Pocket & Premium Estimator',
    description: 'Compare health insurance plan total costs including annual premiums, deductibles, co-insurance, and maximum out-of-pocket limits.',
    badge: 'Plan Compare',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Total Annual Health Expenditure Formula',
      expression: 'Total Cost = Annual Premium + Min(Deductible + [(Claim - Deductible) × Co-Insurance], Out-of-Pocket Max)',
      explanation: 'Evaluates worst-case and expected healthcare expenditure across high-deductible vs low-deductible health insurance tiers.',
      variables: [
        { symbol: 'Annual Premium', meaning: 'Total monthly premium payments × 12' },
        { symbol: 'Claim', meaning: 'Expected annual gross medical claims' },
      ],
    },
    example: {
      title: 'Worked Example: $6,000 Medical Claim',
      scenario: 'Annual premium of $4,800 ($400/mo), $1,500 deductible, 20% co-insurance, and $6,000 out-of-pocket maximum with a $6,000 medical claim.',
      steps: [
        {
          number: 1,
          title: 'Calculate Member Claim Cost',
          description: '$1,500 deductible + 20% of ($6,000 - $1,500) = $1,500 + $900 = $2,400.',
          mathExpression: '$2,400',
        },
        {
          number: 2,
          title: 'Add Fixed Premiums',
          description: '$2,400 out-of-pocket + $4,800 premium = $7,200.',
          mathExpression: '$7,200',
        },
      ],
      conclusion: 'Total annual medical expense is $7,200.',
    },
    faqs: [
      {
        question: 'What is co-insurance vs co-pay?',
        answer: 'A co-pay is a flat fee per doctor visit (e.g. $25), while co-insurance is a percentage of total medical bills (e.g. 20%) paid after meeting the annual deductible.',
      },
    ],
    inputs: [
      { id: 'monthly_premium', label: 'Monthly Premium', type: 'number', defaultValue: 400, min: 0, max: 10000, unit: '$' },
      { id: 'annual_deductible', label: 'Annual Deductible', type: 'number', defaultValue: 1500, min: 0, max: 20000, unit: '$' },
      { id: 'coinsurance_rate', label: 'Co-Insurance Rate', type: 'number', defaultValue: 20, min: 0, max: 100, unit: '%' },
      { id: 'expected_claims', label: 'Estimated Annual Medical Claims', type: 'number', defaultValue: 6000, min: 0, max: 500000, unit: '$' },
      { id: 'oop_max', label: 'Out-of-Pocket Maximum', type: 'number', defaultValue: 6000, min: 0, max: 30000, unit: '$' },
    ],
    defaultResult: {
      label: 'Total Estimated Annual Cost',
      initialValue: 7200,
      decimals: 2,
      secondaryText: 'Premiums: $4,800/yr | Member Claim Cost: $2,400',
      prefix: '$',
      accent: 'link',
    },
    computeScript: `
      const premium = Math.max(0, Number(inputs.monthly_premium) || 400) * 12;
      const deductible = Math.max(0, Number(inputs.annual_deductible) || 1500);
      const coinsurance = Math.max(0, Number(inputs.coinsurance_rate) || 20) / 100;
      const claims = Math.max(0, Number(inputs.expected_claims) || 6000);
      const oopMax = Math.max(0, Number(inputs.oop_max) || 6000);

      let memberClaims = 0;
      if (claims <= deductible) {
        memberClaims = claims;
      } else {
        memberClaims = deductible + ((claims - deductible) * coinsurance);
      }
      memberClaims = Math.min(memberClaims, oopMax);
      const total = premium + memberClaims;
      return {
        value: total,
        secondaryText: 'Annual Premium: $' + premium.toLocaleString() + ' | Out-of-Pocket: $' + memberClaims.toFixed(2),
        badge: 'Calculated Cost'
      };
    `,
  },
  {
    id: 'auto-insurance-calculator',
    category: 'insurance',
    name: 'Auto Insurance Estimator',
    title: 'Free Auto Insurance Estimator — Vehicle Premium & Deductible Comparison',
    description: 'Estimate typical automobile insurance coverage costs based on vehicle value, driver safety tier, annual mileage, and deductible choice.',
    badge: 'Vehicle Risk',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Actuarial Automobile Premium Model',
      expression: 'Estimated Premium = Base Rate × Vehicle Value Factor × Mileage Multiplier × Deductible Tier Factor',
      explanation: 'Synthesizes insurance rating bands incorporating vehicle replacement costs and liability exposure.',
      variables: [
        { symbol: 'Base Rate', meaning: 'Average statutory state/regional liability rate' },
        { symbol: 'Vehicle Value Factor', meaning: 'Comprehensive and collision property damage factor' },
      ],
    },
    example: {
      title: 'Worked Example: $32,000 Sedan',
      scenario: 'A clean-record driver commuting 12,000 miles annually with a $1,000 collision deductible.',
      steps: [
        {
          number: 1,
          title: 'Base Coverage Analysis',
          description: 'Evaluates comprehensive collision coverage for a $32,000 vehicle.',
          mathExpression: '~$115 / month',
        },
      ],
      conclusion: 'Estimated monthly premium is approximately $115/month ($1,380/year).',
    },
    faqs: [
      {
        question: 'Does increasing my deductible lower my premium?',
        answer: 'Yes. Increasing your collision/comprehensive deductible from $500 to $1,000 typically reduces annual premium costs by 10% to 18%.',
      },
    ],
    inputs: [
      { id: 'vehicle_value', label: 'Current Vehicle Value', type: 'number', defaultValue: 32000, min: 1000, max: 200000, unit: '$' },
      { id: 'annual_mileage', label: 'Annual Mileage Driven', type: 'number', defaultValue: 12000, min: 1000, max: 100000, unit: 'miles' },
      { id: 'deductible', label: 'Collision Deductible', type: 'select', defaultValue: '1000', options: [
        { label: '$500 Deductible', value: '500' },
        { label: '$1,000 Deductible', value: '1000' },
        { label: '$2,000 Deductible', value: '2000' },
      ]},
    ],
    defaultResult: {
      label: 'Estimated Annual Premium',
      initialValue: 1380,
      decimals: 0,
      secondaryText: 'Approx. $115.00 / month',
      prefix: '$',
      accent: 'violet',
    },
    computeScript: `
      const val = Math.max(1000, Number(inputs.vehicle_value) || 32000);
      const miles = Math.max(1000, Number(inputs.annual_mileage) || 12000);
      const ded = Number(inputs.deductible) || 1000;
      let base = 650;
      base += (val * 0.022);
      base += (miles > 12000 ? (miles - 12000) * 0.02 : 0);
      if (ded === 500) base *= 1.12;
      if (ded === 2000) base *= 0.88;
      return {
        value: base,
        secondaryText: 'Monthly: $' + (base / 12).toFixed(2) + ' | Semi-Annual: $' + (base / 2).toFixed(2),
        badge: 'Estimated Average'
      };
    `,
  },
  {
    id: 'annuity-payout-calculator',
    category: 'insurance',
    name: 'Annuity Payout Calculator',
    title: 'Free Annuity Payout Calculator — Fixed Immediate Annuity Stream',
    description: 'Calculate guaranteed fixed monthly annuity income payouts based on lump sum principal, guaranteed interest rates, and payout tenure.',
    badge: 'Retirement Stream',
    badgeColor: 'text-magenta border-magenta/30 bg-magenta/10',
    formula: {
      name: 'Fixed Immediate Annuity Formula',
      expression: 'PMT = P × [r ÷ (1 - (1 + r)⁻ⁿ)]',
      explanation: 'Calculates the level periodic distribution payments that liquidate the initial premium and interest accrued over tenure n.',
      variables: [
        { symbol: 'PMT', meaning: 'Periodic guaranteed payout amount' },
        { symbol: 'P', meaning: 'Initial lump sum premium invested' },
        { symbol: 'r', meaning: 'Periodic interest rate (Annual Rate ÷ 12 ÷ 100)' },
        { symbol: 'n', meaning: 'Total payout intervals (Years × 12)' },
      ],
    },
    example: {
      title: 'Worked Example: $250,000 Annuity',
      scenario: 'A retiree invests $250,000 at a 5.5% annual return over a guaranteed 20-year fixed payout duration.',
      steps: [
        {
          number: 1,
          title: 'Calculate Monthly Payment',
          description: 'Applies fixed annuity amortization equation for 240 monthly periods.',
          mathExpression: '$1,719.72 / month',
        },
      ],
      conclusion: 'The annuity pays $1,719.72 monthly, producing $412,732 total cumulative payouts.',
    },
    faqs: [
      {
        question: 'What is the main advantage of a fixed annuity?',
        answer: 'Fixed annuities provide guaranteed, predictable cash flow sheltered from stock market volatility, offering lifetime or term-certain retirement income.',
      },
    ],
    inputs: [
      { id: 'annuity_principal', label: 'Initial Lump Sum Premium', type: 'number', defaultValue: 250000, min: 1000, max: 20000000, unit: '$' },
      { id: 'interest_rate', label: 'Guaranteed Annual Rate', type: 'number', defaultValue: 5.5, min: 0.1, max: 20, step: 0.1, unit: '%' },
      { id: 'payout_years', label: 'Payout Term (Years)', type: 'number', defaultValue: 20, min: 1, max: 50, unit: 'yrs' },
    ],
    defaultResult: {
      label: 'Guaranteed Monthly Payout',
      initialValue: 1719.72,
      decimals: 2,
      secondaryText: 'Total Lifetime Payout: $412,732.80 | Total Interest: $162,732.80',
      prefix: '$',
      accent: 'magenta',
    },
    computeScript: `
      const P = Math.max(1000, Number(inputs.annuity_principal) || 250000);
      const rate = Math.max(0.01, Number(inputs.interest_rate) || 5.5);
      const years = Math.max(1, Number(inputs.payout_years) || 20);
      const r = rate / 100 / 12;
      const n = years * 12;
      const pmt = P * (r / (1 - Math.pow(1 + r, -n)));
      const total = pmt * n;
      return {
        value: pmt,
        secondaryText: 'Total Payouts: $' + Math.round(total).toLocaleString() + ' | Total Interest: $' + Math.round(total - P).toLocaleString(),
        badge: 'Guaranteed Stream'
      };
    `,
  },
];
