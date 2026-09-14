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
  {
    id: 'homeowners-insurance-calculator',
    category: 'insurance',
    name: 'Homeowners Insurance Calculator',
    title: 'Free Homeowners Insurance Calculator — Coverage & Premium Estimator',
    description: 'Estimate dwelling replacement cost, personal property protection, and annual homeowners insurance premium.',
    badge: 'Property Risk',
    badgeColor: 'text-amber-500 border-amber-500/30 bg-amber-500/10',
    formula: {
      name: 'Dwelling Replacement & Premium Estimation Formula',
      expression: 'Dwelling = Square Footage × Local Construction Cost/SqFt; Personal Property = 50% × Dwelling; Est Premium = (Dwelling × 0.0035) + Deductible Factor',
      explanation: 'Calculates structural replacement costs rather than market land value, aligning coverage with insurer underwriting standards.',
      variables: [
        { symbol: 'SqFt', meaning: 'Finished home square footage' },
        { symbol: 'Cost/SqFt', meaning: 'Local replacement rebuild cost per sq ft' },
      ],
    },
    example: {
      title: 'Worked Example: 2,500 Sq Ft Single Family Home',
      scenario: 'A 2,500 sq ft home with $160/sq ft rebuild cost and $1,000 deductible.',
      steps: [
        {
          number: 1,
          title: 'Calculate Dwelling Replacement',
          description: '2,500 sq ft × $160 = $400,000.',
          mathExpression: '$400,000',
        },
        {
          number: 2,
          title: 'Estimate Premium',
          description: '$400,000 × 0.0035 = $1,400 per year.',
          mathExpression: '$1,400',
        },
      ],
      conclusion: 'Estimated annual premium is $1,400 ($116/month).',
    },
    faqs: [
      {
        question: 'What is dwelling coverage vs market value?',
        answer: 'Dwelling coverage reflects only the cost to rebuild the structure after a total loss, excluding the land value included in real estate market price.',
      },
    ],
    inputs: [
      { id: 'square_feet', label: 'Home Living Area', type: 'number', defaultValue: 2500, min: 400, max: 25000, unit: 'sq ft' },
      { id: 'rebuild_cost', label: 'Local Rebuild Cost / Sq Ft', type: 'number', defaultValue: 160, min: 50, max: 600, unit: '$' },
      { id: 'deductible', label: 'Policy Deductible', type: 'select', defaultValue: '1000', options: [
        { label: '$500 Deductible', value: '500' },
        { label: '$1,000 Deductible', value: '1000' },
        { label: '$2,500 Deductible', value: '2500' },
      ]},
    ],
    defaultResult: {
      label: 'Estimated Annual Premium',
      initialValue: 1400,
      decimals: 0,
      secondaryText: 'Dwelling Coverage: $400,000 | Personal Property: $200,000',
      prefix: '$',
      accent: 'amber',
    },
    computeScript: `
      const sqft = Math.max(400, Number(inputs.square_feet) || 2500);
      const cost = Math.max(50, Number(inputs.rebuild_cost) || 160);
      const ded = Number(inputs.deductible) || 1000;
      const dwelling = sqft * cost;
      let prem = dwelling * 0.0035;
      if (ded === 500) prem *= 1.10;
      if (ded === 2500) prem *= 0.88;
      return {
        value: prem,
        secondaryText: 'Dwelling: $' + dwelling.toLocaleString() + ' | Personal Property: $' + Math.round(dwelling * 0.5).toLocaleString(),
        badge: 'Estimated Premium'
      };
    `,
  },
  {
    id: 'renters-insurance-calculator',
    category: 'insurance',
    name: 'Renters Insurance Calculator',
    title: 'Free Renters Insurance Calculator — Personal Property & Liability',
    description: 'Estimate total personal property value and recommended renters insurance policy coverage and monthly premium.',
    badge: 'Tenant Guard',
    badgeColor: 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10',
    formula: {
      name: 'Renters Personal Property Inventory Formula',
      expression: 'Personal Property = Electronics + Furniture + Clothing + Valuables; Premium ≈ (Property × 0.005) + Base Liability',
      explanation: 'Summarizes replacement cost of household belongings plus baseline tenant liability protection.',
      variables: [
        { symbol: 'Property', meaning: 'Sum total replacement value of personal belongings' },
      ],
    },
    example: {
      title: 'Worked Example: 2-Bedroom Apartment',
      scenario: 'Personal belongings totaling $35,000 and $100,000 liability.',
      steps: [
        {
          number: 1,
          title: 'Sum Belongings',
          description: '$12,000 furniture + $8,000 electronics + $10,000 clothing + $5,000 misc = $35,000.',
          mathExpression: '$35,000',
        },
        {
          number: 2,
          title: 'Estimate Premium',
          description: '$35,000 × 0.005 + $50 liability = $225/yr.',
          mathExpression: '$225 / year',
        },
      ],
      conclusion: 'Estimated renters insurance premium is $225/year ($18.75/month).',
    },
    faqs: [
      {
        question: 'Does renters insurance cover landlord building damage?',
        answer: 'No, your landlord insurance covers the building structure. Renters insurance protects your personal contents and personal legal liability if someone is injured in your rental.',
      },
    ],
    inputs: [
      { id: 'electronics_value', label: 'Electronics & Computers', type: 'number', defaultValue: 8000, min: 0, max: 100000, unit: '$' },
      { id: 'furniture_value', label: 'Furniture & Appliances', type: 'number', defaultValue: 12000, min: 0, max: 200000, unit: '$' },
      { id: 'clothing_value', label: 'Clothing & Accessories', type: 'number', defaultValue: 10000, min: 0, max: 100000, unit: '$' },
      { id: 'other_valuables', label: 'Jewelry & Other Valuables', type: 'number', defaultValue: 5000, min: 0, max: 100000, unit: '$' },
    ],
    defaultResult: {
      label: 'Estimated Annual Premium',
      initialValue: 225,
      decimals: 0,
      secondaryText: 'Total Property Value: $35,000 | Approx. $18.75/mo',
      prefix: '$',
      accent: 'emerald',
    },
    computeScript: `
      const elec = Math.max(0, Number(inputs.electronics_value) || 0);
      const furn = Math.max(0, Number(inputs.furniture_value) || 0);
      const cloth = Math.max(0, Number(inputs.clothing_value) || 0);
      const other = Math.max(0, Number(inputs.other_valuables) || 0);
      const totalProp = Math.max(10000, elec + furn + cloth + other);
      const prem = Math.max(120, (totalProp * 0.005) + 50);
      return {
        value: prem,
        secondaryText: 'Coverage: $' + totalProp.toLocaleString() + ' | Approx. $' + (prem / 12).toFixed(2) + '/mo',
        badge: 'Estimated Premium'
      };
    `,
  },
  {
    id: 'disability-insurance-calculator',
    category: 'insurance',
    name: 'Disability Insurance Calculator',
    title: 'Free Disability Insurance Calculator — Income Replacement Protection',
    description: 'Calculate your income gap and recommended monthly disability insurance benefit in the event of illness or injury.',
    badge: 'Income Protection',
    badgeColor: 'text-indigo-500 border-indigo-500/30 bg-indigo-500/10',
    formula: {
      name: 'Individual Disability Need Formula',
      expression: 'Recommended Monthly Benefit = (Monthly Essential Expenses - Passive Income) or Max 60% Gross Monthly Salary',
      explanation: 'Determines the after-tax replacement benefit required to sustain ongoing mortgage, utilities, and living costs.',
      variables: [
        { symbol: 'Gross Salary', meaning: 'Pre-tax monthly wages earned' },
        { symbol: 'Essential Expenses', meaning: 'Monthly mandatory living costs' },
      ],
    },
    example: {
      title: 'Worked Example: $8,000 Monthly Gross Salary',
      scenario: 'Gross monthly salary of $8,000 ($96k/yr), $4,500 monthly necessary expenses, and no passive income.',
      steps: [
        {
          number: 1,
          title: 'Calculate Insurable Cap',
          description: '60% of $8,000 gross = $4,800 monthly limit.',
          mathExpression: '$4,800',
        },
        {
          number: 2,
          title: 'Compare With Expenses',
          description: '$4,500 monthly expenses is within the $4,800 cap.',
          mathExpression: '$4,500',
        },
      ],
      conclusion: 'Recommended monthly benefit is $4,500 to $4,800/month.',
    },
    faqs: [
      {
        question: 'Why does disability insurance cap at 60% of income?',
        answer: 'Insurers cap individual disability at 60% to 70% of gross pay because individual disability benefits are received tax-free, and to maintain an incentive to return to work.',
      },
    ],
    inputs: [
      { id: 'monthly_gross', label: 'Gross Monthly Income', type: 'number', defaultValue: 8000, min: 1000, max: 100000, unit: '$' },
      { id: 'monthly_expenses', label: 'Essential Monthly Living Expenses', type: 'number', defaultValue: 4500, min: 500, max: 80000, unit: '$' },
      { id: 'passive_income', label: 'Existing Passive / Spousal Income', type: 'number', defaultValue: 0, min: 0, max: 50000, unit: '$' },
    ],
    defaultResult: {
      label: 'Recommended Monthly Benefit',
      initialValue: 4500,
      decimals: 0,
      secondaryText: 'Insurable Cap: $4,800/mo (60% Gross) | Essential Need: $4,500/mo',
      prefix: '$',
      accent: 'indigo',
    },
    computeScript: `
      const gross = Math.max(1000, Number(inputs.monthly_gross) || 8000);
      const exp = Math.max(500, Number(inputs.monthly_expenses) || 4500);
      const passive = Math.max(0, Number(inputs.passive_income) || 0);
      const cap = gross * 0.60;
      const need = Math.max(0, exp - passive);
      const benefit = Math.min(cap, need);
      return {
        value: benefit,
        secondaryText: 'Insurable Cap: $' + Math.round(cap).toLocaleString() + '/mo | Expense Need: $' + Math.round(need).toLocaleString() + '/mo',
        badge: 'Target Benefit'
      };
    `,
  },
  {
    id: 'umbrella-insurance-calculator',
    category: 'insurance',
    name: 'Umbrella Insurance Calculator',
    title: 'Free Umbrella Insurance Calculator — Excess Liability Coverage',
    description: 'Calculate recommended excess umbrella liability insurance protection based on net worth, properties, and legal liability exposure.',
    badge: 'Asset Shield',
    badgeColor: 'text-blue-500 border-blue-500/30 bg-blue-500/10',
    formula: {
      name: 'Net Worth Liability Umbrella Formula',
      expression: 'Umbrella Limit = Net Worth (Home Equity + Investments + Savings) + (5 × Annual Income)',
      explanation: 'Shields personal assets and future earnings from major catastrophic lawsuits exceeding primary auto/home liability caps.',
      variables: [
        { symbol: 'Net Worth', meaning: 'Sum of real estate equity, non-retirement accounts, and liquid savings' },
      ],
    },
    example: {
      title: 'Worked Example: $850,000 Net Worth Family',
      scenario: '$400,000 home equity, $450,000 retirement/savings, and $150,000 annual household income.',
      steps: [
        {
          number: 1,
          title: 'Sum Net Worth',
          description: '$400,000 + $450,000 = $850,000 net worth.',
          mathExpression: '$850,000',
        },
        {
          number: 2,
          title: 'Round to Standard Increment',
          description: 'Umbrella policies sell in $1M increments. Net worth of $850k justifies a $1,000,000 to $2,000,000 policy.',
          mathExpression: '$2,000,000',
        },
      ],
      conclusion: 'Recommended umbrella coverage is $2,000,000.',
    },
    faqs: [
      {
        question: 'How much does umbrella insurance cost?',
        answer: 'A standard $1,000,000 personal umbrella policy typically costs between $150 and $350 per year, making it one of the most cost-effective forms of wealth protection.',
      },
    ],
    inputs: [
      { id: 'home_equity', label: 'Home Equity Value', type: 'number', defaultValue: 400000, min: 0, max: 20000000, unit: '$' },
      { id: 'liquid_investments', label: 'Savings & Non-Retirement Investments', type: 'number', defaultValue: 450000, min: 0, max: 50000000, unit: '$' },
      { id: 'annual_income', label: 'Annual Household Income', type: 'number', defaultValue: 150000, min: 20000, max: 10000000, unit: '$' },
    ],
    defaultResult: {
      label: 'Recommended Umbrella Policy',
      initialValue: 2000000,
      decimals: 0,
      secondaryText: 'Net Asset Exposure: $850,000 | Est. Premium: $250 - $400/yr',
      prefix: '$',
      accent: 'blue',
    },
    computeScript: `
      const equity = Math.max(0, Number(inputs.home_equity) || 0);
      const inv = Math.max(0, Number(inputs.liquid_investments) || 0);
      const inc = Math.max(20000, Number(inputs.annual_income) || 150000);
      const totalAssets = equity + inv;
      let target = totalAssets + (inc * 2);
      let roundedPolicy = Math.max(1000000, Math.ceil(target / 1000000) * 1000000);
      const estPrem = 200 + ((roundedPolicy / 1000000) - 1) * 100;
      return {
        value: roundedPolicy,
        secondaryText: 'Total Asset Exposure: $' + Math.round(totalAssets).toLocaleString() + ' | Approx. $' + estPrem + '/yr',
        badge: 'Recommended Policy'
      };
    `,
  },
  {
    id: 'whole-life-insurance-calculator',
    category: 'insurance',
    name: 'Whole Life Insurance Calculator',
    title: 'Free Whole Life Insurance Calculator — Cash Value & Death Benefit',
    description: 'Project guaranteed cash value growth, death benefits, and estimated dividend returns for permanent whole life policies.',
    badge: 'Permanent Growth',
    badgeColor: 'text-purple-500 border-purple-500/30 bg-purple-500/10',
    formula: {
      name: 'Permanent Life Cash Value Model',
      expression: 'Future Cash Value = Principal × (1 + Guaranteed Rate)ᵗ + Cumulative Dividends',
      explanation: 'Projects internal rate of return (IRR) on permanent life insurance cash value accumulations over policy horizons.',
      variables: [
        { symbol: 'Annual Premium', meaning: 'Scheduled annual premium payments' },
        { symbol: 'Guaranteed Rate', meaning: 'Statutory policy guaranteed minimum cash accumulation rate' },
      ],
    },
    example: {
      title: 'Worked Example: $3,600 Annual Premium for 20 Years',
      scenario: '$300/month premium ($3,600/year), $250,000 initial death benefit, and 4.25% average dividend crediting rate.',
      steps: [
        {
          number: 1,
          title: 'Sum Net Contributions',
          description: '$3,600 × 20 years = $72,000 total premium paid.',
          mathExpression: '$72,000',
        },
        {
          number: 2,
          title: 'Estimate Cash Value',
          description: 'Compound cash value at year 20 yields approx. $104,500.',
          mathExpression: '$104,500',
        },
      ],
      conclusion: 'Estimated cash surrender value at 20 years is $104,500 with death benefit growing to $312,000.',
    },
    faqs: [
      {
        question: 'Can I borrow against whole life cash value?',
        answer: 'Yes, policyholders can take tax-free policy loans against accumulated cash value with no credit check or mandatory repayment schedule.',
      },
    ],
    inputs: [
      { id: 'annual_premium', label: 'Annual Premium Paid', type: 'number', defaultValue: 3600, min: 500, max: 100000, unit: '$' },
      { id: 'initial_death_benefit', label: 'Initial Death Benefit', type: 'number', defaultValue: 250000, min: 25000, max: 10000000, unit: '$' },
      { id: 'policy_years', label: 'Horizon (Years)', type: 'number', defaultValue: 20, min: 5, max: 50, unit: 'yrs' },
      { id: 'dividend_rate', label: 'Estimated Dividend Rate (%)', type: 'number', defaultValue: 4.25, min: 1, max: 10, step: 0.25, unit: '%' },
    ],
    defaultResult: {
      label: 'Projected Cash Value',
      initialValue: 104500,
      decimals: 0,
      secondaryText: 'Total Premiums: $72,000 | Enhanced Death Benefit: $312,000',
      prefix: '$',
      accent: 'purple',
    },
    computeScript: `
      const prem = Math.max(500, Number(inputs.annual_premium) || 3600);
      const death = Math.max(25000, Number(inputs.initial_death_benefit) || 250000);
      const years = Math.max(5, Number(inputs.policy_years) || 20);
      const rate = Math.max(1, Number(inputs.dividend_rate) || 4.25) / 100;
      let cashValue = 0;
      for (let i = 1; i <= years; i++) {
        const savingsFactor = i <= 2 ? 0.35 : (i <= 5 ? 0.70 : 0.88);
        cashValue = (cashValue + (prem * savingsFactor)) * (1 + rate);
      }
      const enhancedDeath = death + (cashValue * 0.35);
      const totalPaid = prem * years;
      return {
        value: cashValue,
        secondaryText: 'Total Paid: $' + Math.round(totalPaid).toLocaleString() + ' | Enhanced Death Benefit: $' + Math.round(enhancedDeath).toLocaleString(),
        badge: 'Projected Cash Value'
      };
    `,
  },
];
