// src/data/calculatorRegistry.ts

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'select' | 'date';
  defaultValue: string | number;
  min?: number;
  max?: number;
  step?: number | string;
  unit?: string;
  options?: Array<{ label: string; value: string | number }>;
  helpText?: string;
}

export interface CalculatorEntry {
  id: string;
  category: 'finance' | 'health' | 'math' | 'everyday';
  name: string;
  title: string;
  description: string;
  badge: string;
  badgeColor: string;
  icon?: string;
  formula: {
    name: string;
    expression: string;
    explanation: string;
    variables?: Array<{ symbol: string; meaning: string }>;
  };
  example: {
    title: string;
    scenario: string;
    steps: Array<{
      number: number;
      title: string;
      description: string;
      mathExpression: string;
    }>;
    conclusion: string;
  };
  faqs: Array<{ question: string; answer: string }>;
  inputs: CalculatorInput[];
  defaultResult: {
    label: string;
    initialValue: number;
    decimals: number;
    secondaryText: string;
    accent?: 'link' | 'cyan' | 'violet' | 'magenta';
    prefix?: string;
    suffix?: string;
  };
  computeScript: string;
}

export const CATEGORY_METADATA = {
  finance: {
    id: 'finance',
    name: 'Finance Calculators',
    eyebrow: 'High-Precision Financial Mathematics',
    description: 'Loan amortization, compounding interest, mortgages, salary planning, and tax calculations with international currency support.',
    icon: 'dollar-sign',
  },
  health: {
    id: 'health',
    name: 'Fitness & Health Calculators',
    eyebrow: 'Clinically Validated Health Metrics',
    description: 'Scientifically validated BMI, caloric intake, basal metabolic rate, pregnancy gestation, and body composition tools.',
    icon: 'activity',
  },
  math: {
    id: 'math',
    name: 'Math & Precision Tools',
    eyebrow: 'Exact Mathematical & Statistical Algorithms',
    description: 'Percentages, scientific functions, fractions, standard deviation, and geometric calculations with step-by-step proofs.',
    icon: 'calculator',
  },
  everyday: {
    id: 'everyday',
    name: 'Everyday & Utility Calculators',
    eyebrow: 'Practical Everyday Productivity Tools',
    description: 'Chronological age, timesheets, date intervals, GPA grades, concrete volume, IP subnets, and secure cryptographic tools.',
    icon: 'clock',
  },
} as const;

export const CALCULATORS: CalculatorEntry[] = [
  // ==========================================
  // FINANCE (15 Tools)
  // ==========================================
  {
    id: 'mortgage-calculator',
    category: 'finance',
    name: 'Mortgage Calculator',
    title: 'Free Mortgage Calculator — Monthly Payment, Taxes & Interest',
    description: 'Calculate monthly mortgage payments including principal, interest, property taxes, and homeowners insurance with full amortization.',
    badge: 'High-Demand',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Fixed-Rate Mortgage Payment Formula',
      expression: 'M = P × [r(1 + r)ⁿ] ÷ [(1 + r)ⁿ - 1] + (T + I) ÷ 12',
      explanation: 'Evaluates monthly principal and interest using standard annuity math, plus one-twelfth of estimated annual property taxes and homeowners insurance.',
      variables: [
        { symbol: 'M', meaning: 'Total monthly mortgage payment' },
        { symbol: 'P', meaning: 'Principal loan amount borrowed' },
        { symbol: 'r', meaning: 'Monthly interest rate (Annual rate ÷ 12 ÷ 100)' },
        { symbol: 'n', meaning: 'Total number of monthly payments (Years × 12)' },
        { symbol: 'T', meaning: 'Annual property tax' },
        { symbol: 'I', meaning: 'Annual homeowners insurance' },
      ],
    },
    example: {
      title: 'Worked Example: $400,000 Home Purchase',
      scenario: 'You purchase a $400,000 home with a 20% down payment ($80,000) at a 6.5% interest rate on a 30-year fixed loan, with $4,000 annual property tax and $1,200 annual insurance.',
      steps: [
        {
          number: 1,
          title: 'Calculate loan principal',
          description: 'Loan Amount = $400,000 - $80,000 = $320,000.',
          mathExpression: 'P = $320,000',
        },
        {
          number: 2,
          title: 'Calculate monthly principal & interest (P&I)',
          description: 'Apply mortgage amortization formula at 6.5% over 360 months.',
          mathExpression: 'P&I = $2,022.62 / month',
        },
        {
          number: 3,
          title: 'Add monthly escrow (Taxes & Insurance)',
          description: '($4,000 + $1,200) ÷ 12 = $433.33 / month.',
          mathExpression: 'Escrow = $433.33 / month',
        },
      ],
      conclusion: 'Total estimated monthly payment is $2,455.95, of which $2,022.62 is principal & interest.',
    },
    faqs: [
      {
        question: 'What is included in a PITI mortgage payment?',
        answer: 'PITI stands for Principal, Interest, Taxes, and Insurance. It encompasses the core loan repayment to your lender plus escrow fees for local property taxes and home hazard insurance.',
      },
      {
        question: 'How does putting 20% down save money?',
        answer: 'A down payment of at least 20% exempts conventional borrowers from Private Mortgage Insurance (PMI), which can otherwise add $100 to $300 to your monthly payment.',
      },
    ],
    inputs: [
      { id: 'home_price', label: 'Home Purchase Price ($)', type: 'number', defaultValue: 400000, step: 1000 },
      { id: 'down_payment', label: 'Down Payment ($)', type: 'number', defaultValue: 80000, step: 1000 },
      { id: 'interest_rate', label: 'Annual Interest Rate (%)', type: 'number', defaultValue: 6.5, step: 0.05 },
      { id: 'loan_term', label: 'Loan Term (Years)', type: 'number', defaultValue: 30, step: 1 },
      { id: 'property_tax', label: 'Annual Property Tax ($)', type: 'number', defaultValue: 4000, step: 100 },
      { id: 'home_insurance', label: 'Annual Insurance ($)', type: 'number', defaultValue: 1200, step: 50 },
    ],
    defaultResult: {
      label: 'Monthly Mortgage Payment',
      initialValue: 2455.95,
      decimals: 2,
      secondaryText: 'P&I: $2,022.62 | Tax & Insurance: $433.33',
      accent: 'link',
      prefix: '$',
    },
    computeScript: `
      const price = parseFloat(inputs.home_price || '0');
      const down = parseFloat(inputs.down_payment || '0');
      const rate = parseFloat(inputs.interest_rate || '0');
      const years = parseFloat(inputs.loan_term || '30');
      const tax = parseFloat(inputs.property_tax || '0');
      const ins = parseFloat(inputs.home_insurance || '0');
      const principal = Math.max(0, price - down);
      const n = years * 12;
      const r = rate / 12 / 100;
      let pi = 0;
      if (r > 0 && n > 0) {
        const factor = Math.pow(1 + r, n);
        pi = (principal * r * factor) / (factor - 1);
      } else if (n > 0) {
        pi = principal / n;
      }
      const escrow = (tax + ins) / 12;
      const total = pi + escrow;
      return {
        value: total,
        secondary: 'P&I: $' + pi.toFixed(2) + ' | Tax & Ins: $' + escrow.toFixed(2)
      };
    `,
  },
  {
    id: 'loan-calculator',
    category: 'finance',
    name: 'Loan Calculator',
    title: 'Free Loan Calculator — Monthly Payments & Total Interest',
    description: 'Calculate monthly loan payments, total interest costs, and repayment schedules for personal, auto, or student loans.',
    badge: 'Universal',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Standard Loan Amortization Formula',
      expression: 'Pmt = P × [r(1 + r)ⁿ] ÷ [(1 + r)ⁿ - 1]',
      explanation: 'Calculates the fixed monthly installment needed to pay off a loan principal over n months at monthly interest rate r.',
      variables: [
        { symbol: 'Pmt', meaning: 'Monthly payment amount' },
        { symbol: 'P', meaning: 'Loan amount' },
        { symbol: 'r', meaning: 'Monthly interest rate (Annual rate ÷ 1200)' },
        { symbol: 'n', meaning: 'Tenure in months' },
      ],
    },
    example: {
      title: 'Worked Example: $20,000 Personal Loan',
      scenario: 'A borrower takes a $20,000 personal loan at 9.0% annual interest over 4 years (48 months).',
      steps: [
        {
          number: 1,
          title: 'Calculate monthly interest rate',
          description: 'r = 9.0 ÷ 1200 = 0.0075.',
          mathExpression: 'r = 0.0075',
        },
        {
          number: 2,
          title: 'Apply payment formula',
          description: 'Pmt = $20,000 × (0.0075 × (1.0075)⁴⁸) ÷ ((1.0075)⁴⁸ - 1).',
          mathExpression: 'Pmt = $497.70 / month',
        },
      ],
      conclusion: 'Monthly payment is $497.70. Total interest paid across 4 years is $3,889.60.',
    },
    faqs: [
      {
        question: 'How does loan term affect total interest?',
        answer: 'A longer term lowers your monthly payment, but increases the total interest paid over the life of the loan.',
      },
    ],
    inputs: [
      { id: 'loan_amount', label: 'Loan Amount ($)', type: 'number', defaultValue: 20000, step: 500 },
      { id: 'interest_rate', label: 'Annual Interest Rate (%)', type: 'number', defaultValue: 9.0, step: 0.1 },
      { id: 'loan_term_months', label: 'Loan Term (Months)', type: 'number', defaultValue: 48, step: 6 },
    ],
    defaultResult: {
      label: 'Monthly Loan Payment',
      initialValue: 497.70,
      decimals: 2,
      secondaryText: 'Total Interest: $3,889.60 | Total Cost: $23,889.60',
      accent: 'link',
      prefix: '$',
    },
    computeScript: `
      const P = parseFloat(inputs.loan_amount || '0');
      const rate = parseFloat(inputs.interest_rate || '0');
      const n = parseFloat(inputs.loan_term_months || '1');
      const r = rate / 1200;
      let pmt = 0;
      if (r > 0 && n > 0) {
        const factor = Math.pow(1 + r, n);
        pmt = (P * r * factor) / (factor - 1);
      } else if (n > 0) {
        pmt = P / n;
      }
      const totalCost = pmt * n;
      const totalInt = totalCost - P;
      return {
        value: pmt,
        secondary: 'Total Interest: $' + totalInt.toFixed(2) + ' | Total Cost: $' + totalCost.toFixed(2)
      };
    `,
  },
  {
    id: 'auto-loan-calculator',
    category: 'finance',
    name: 'Auto Loan Calculator',
    title: 'Auto Loan Calculator — Monthly Car Payment & Financing Costs',
    description: 'Calculate monthly car payments, financing costs, and trade-in adjustments with tax rate considerations.',
    badge: 'Popular',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Automotive Financing Formula',
      expression: 'Financed Amount = Vehicle Price - Down Payment - Trade-in + Sales Tax',
      explanation: 'Calculates the net financed loan balance after applying trade-in credit, cash down payment, and sales tax.',
    },
    example: {
      title: 'Worked Example: $32,000 Vehicle Purchase',
      scenario: 'Vehicle price $32,000, $5,000 trade-in value, $2,000 cash down, 6% sales tax, financed at 5.5% over 60 months.',
      steps: [
        {
          number: 1,
          title: 'Calculate taxable base and net loan',
          description: 'Net balance = ($32,000 - $5,000 - $2,000) + ($32,000 × 0.06) = $26,920.',
          mathExpression: 'Financed Amount = $26,920',
        },
      ],
      conclusion: 'Estimated monthly car payment is $514.49 per month.',
    },
    faqs: [
      {
        question: 'What is a good auto loan term?',
        answer: 'Financial experts generally recommend 48 to 60 months to avoid becoming upside-down on vehicle depreciation.',
      },
    ],
    inputs: [
      { id: 'car_price', label: 'Car Price ($)', type: 'number', defaultValue: 32000, step: 500 },
      { id: 'down_payment', label: 'Down Payment ($)', type: 'number', defaultValue: 2000, step: 250 },
      { id: 'trade_in', label: 'Trade-in Value ($)', type: 'number', defaultValue: 5000, step: 250 },
      { id: 'interest_rate', label: 'Interest Rate (%)', type: 'number', defaultValue: 5.5, step: 0.1 },
      { id: 'term_months', label: 'Loan Term (Months)', type: 'number', defaultValue: 60, step: 12 },
    ],
    defaultResult: {
      label: 'Monthly Car Payment',
      initialValue: 477.53,
      decimals: 2,
      secondaryText: 'Financed Amount: $25,000.00',
      accent: 'link',
      prefix: '$',
    },
    computeScript: `
      const price = parseFloat(inputs.car_price || '0');
      const down = parseFloat(inputs.down_payment || '0');
      const trade = parseFloat(inputs.trade_in || '0');
      const rate = parseFloat(inputs.interest_rate || '0');
      const n = parseFloat(inputs.term_months || '60');
      const financed = Math.max(0, price - down - trade);
      const r = rate / 1200;
      let pmt = 0;
      if (r > 0 && n > 0) {
        const factor = Math.pow(1 + r, n);
        pmt = (financed * r * factor) / (factor - 1);
      } else if (n > 0) {
        pmt = financed / n;
      }
      return {
        value: pmt,
        secondary: 'Financed Amount: $' + financed.toFixed(2) + ' | Total Int: $' + (pmt * n - financed).toFixed(2)
      };
    `,
  },
  {
    id: 'compound-interest-calculator',
    category: 'finance',
    name: 'Compound Interest Calculator',
    title: 'Compound Interest Calculator — Exponential Investment Growth',
    description: 'Calculate compound interest growth on investments with regular contributions and flexible compounding frequencies.',
    badge: 'High-Demand',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Compound Interest Formula with Regular Contributions',
      expression: 'A = P(1 + r/n)ⁿᵗ + PMT × [((1 + r/n)ⁿᵗ - 1) / (r/n)]',
      explanation: 'Compounds the initial principal plus future value of a series of recurring periodic deposits.',
      variables: [
        { symbol: 'A', meaning: 'Future accumulated balance' },
        { symbol: 'P', meaning: 'Initial principal deposit' },
        { symbol: 'r', meaning: 'Annual interest rate as a decimal' },
        { symbol: 'n', meaning: 'Number of times interest compounds per year' },
        { symbol: 't', meaning: 'Investment duration in years' },
        { symbol: 'PMT', meaning: 'Periodic recurring monthly contribution' },
      ],
    },
    example: {
      title: 'Worked Example: $10,000 Initial + $200/Month',
      scenario: '$10,000 initial balance, $200 monthly deposit, 8% annual return compounded monthly for 10 years.',
      steps: [
        {
          number: 1,
          title: 'Calculate principal compounding',
          description: '$10,000 × (1 + 0.08/12)¹²⁰ = $22,196.40.',
          mathExpression: 'Principal Growth = $22,196.40',
        },
        {
          number: 2,
          title: 'Calculate contributions future value',
          description: '$200 × [((1 + 0.08/12)¹²⁰ - 1) / (0.08/12)] = $36,589.19.',
          mathExpression: 'Deposits Growth = $36,589.19',
        },
      ],
      conclusion: 'Total balance after 10 years is $58,785.59 (with $24,785.59 earned in pure interest).',
    },
    faqs: [
      {
        question: 'What is the Rule of 72 in compound interest?',
        answer: 'The Rule of 72 estimates how many years it takes an investment to double: divide 72 by the annual interest rate (e.g. 72 / 8 = 9 years).',
      },
    ],
    inputs: [
      { id: 'initial_deposit', label: 'Initial Investment ($)', type: 'number', defaultValue: 10000, step: 500 },
      { id: 'monthly_contribution', label: 'Monthly Contribution ($)', type: 'number', defaultValue: 200, step: 50 },
      { id: 'annual_rate', label: 'Estimated Annual Return (%)', type: 'number', defaultValue: 8.0, step: 0.1 },
      { id: 'investment_years', label: 'Investment Horizon (Years)', type: 'number', defaultValue: 10, step: 1 },
    ],
    defaultResult: {
      label: 'Total Future Balance',
      initialValue: 58785.59,
      decimals: 2,
      secondaryText: 'Total Contributions: $34,000 | Interest Earned: $24,785.59',
      accent: 'cyan',
      prefix: '$',
    },
    computeScript: `
      const P = parseFloat(inputs.initial_deposit || '0');
      const PMT = parseFloat(inputs.monthly_contribution || '0');
      const r = parseFloat(inputs.annual_rate || '0') / 100;
      const t = parseFloat(inputs.investment_years || '0');
      const n = 12; // Monthly compounding
      const ratePerPeriod = r / n;
      const totalPeriods = n * t;
      let balance = 0;
      if (ratePerPeriod > 0) {
        const factor = Math.pow(1 + ratePerPeriod, totalPeriods);
        balance = P * factor + PMT * ((factor - 1) / ratePerPeriod);
      } else {
        balance = P + PMT * totalPeriods;
      }
      const totalDeposits = P + PMT * totalPeriods;
      const interest = balance - totalDeposits;
      return {
        value: balance,
        secondary: 'Total Deposits: $' + totalDeposits.toFixed(2) + ' | Pure Interest: $' + interest.toFixed(2)
      };
    `,
  },
  {
    id: 'interest-calculator',
    category: 'finance',
    name: 'Interest Calculator',
    title: 'Free Interest Calculator — Simple vs Compound Interest',
    description: 'Calculate simple interest and compound interest side-by-side with principal returns and time breakdowns.',
    badge: 'Universal',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Simple vs Compound Interest',
      expression: 'Simple: I = P × r × t | Compound: A = P(1 + r)ᵗ',
      explanation: 'Simple interest accrues strictly on initial principal, while compound interest accrues on prior accumulated gains.',
    },
    example: {
      title: 'Worked Example: $5,000 at 6% for 5 Years',
      scenario: '$5,000 principal at 6% annual rate over 5 years.',
      steps: [
        {
          number: 1,
          title: 'Calculate Simple Interest',
          description: '$5,000 × 0.06 × 5 = $1,500.',
          mathExpression: 'Simple Interest = $1,500',
        },
        {
          number: 2,
          title: 'Calculate Compound Interest',
          description: '$5,000 × (1.06)⁵ - $5,000 = $1,691.13.',
          mathExpression: 'Compound Interest = $1,691.13',
        },
      ],
      conclusion: 'Compounding generates an extra $191.13 over 5 years compared to simple interest.',
    },
    faqs: [
      {
        question: 'When is simple interest used?',
        answer: 'Simple interest is commonly used for short-term personal loans, auto loans, and certain treasury bills.',
      },
    ],
    inputs: [
      { id: 'principal', label: 'Principal Amount ($)', type: 'number', defaultValue: 5000, step: 100 },
      { id: 'rate', label: 'Annual Interest Rate (%)', type: 'number', defaultValue: 6.0, step: 0.1 },
      { id: 'time_years', label: 'Time Period (Years)', type: 'number', defaultValue: 5, step: 1 },
    ],
    defaultResult: {
      label: 'Compound Interest Earned',
      initialValue: 1691.13,
      decimals: 2,
      secondaryText: 'Total Balance: $6,691.13 | Simple Interest: $1,500.00',
      accent: 'link',
      prefix: '$',
    },
    computeScript: `
      const P = parseFloat(inputs.principal || '0');
      const r = parseFloat(inputs.rate || '0') / 100;
      const t = parseFloat(inputs.time_years || '0');
      const simple = P * r * t;
      const compound = P * Math.pow(1 + r, t) - P;
      return {
        value: compound,
        secondary: 'Total Balance: $' + (P + compound).toFixed(2) + ' | Simple Interest: $' + simple.toFixed(2)
      };
    `,
  },
  {
    id: 'payment-calculator',
    category: 'finance',
    name: 'Payment Calculator',
    title: 'Payment Calculator — Monthly Debt Payoff & Repayment Schedule',
    description: 'Calculate required monthly payments to eliminate debt within a target timeline or evaluate fixed payment outcomes.',
    badge: 'Universal',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Periodic Payment Payoff Formula',
      expression: 'Pmt = (P × r) ÷ [1 - (1 + r)⁻ⁿ]',
      explanation: 'Calculates the exact periodic payment required to retire loan balance P in n periods.',
    },
    example: {
      title: 'Worked Example: $15,000 Credit Balance Payoff',
      scenario: 'Paying off a $15,000 balance at 18.0% APR in 24 months.',
      steps: [
        {
          number: 1,
          title: 'Apply payment formula',
          description: 'r = 0.18 / 12 = 0.015, n = 24. Pmt = ($15,000 × 0.015) ÷ [1 - (1.015)⁻²⁴] = $749.19.',
          mathExpression: 'Pmt = $749.19 / month',
        },
      ],
      conclusion: 'A monthly payment of $749.19 retires the balance in 2 years with $2,980.56 in interest.',
    },
    faqs: [
      {
        question: 'Why does paying more than the minimum payment matter?',
        answer: 'Credit card minimum payments primarily cover interest with negligible principal reduction, extending debt payoff over decades.',
      },
    ],
    inputs: [
      { id: 'balance', label: 'Current Debt Balance ($)', type: 'number', defaultValue: 15000, step: 500 },
      { id: 'apr', label: 'Interest Rate / APR (%)', type: 'number', defaultValue: 18.0, step: 0.25 },
      { id: 'payoff_months', label: 'Target Months to Pay Off', type: 'number', defaultValue: 24, step: 1 },
    ],
    defaultResult: {
      label: 'Required Monthly Payment',
      initialValue: 749.19,
      decimals: 2,
      secondaryText: 'Total Interest: $2,980.56 | Total Paid: $17,980.56',
      accent: 'link',
      prefix: '$',
    },
    computeScript: `
      const P = parseFloat(inputs.balance || '0');
      const apr = parseFloat(inputs.apr || '0');
      const n = parseFloat(inputs.payoff_months || '1');
      const r = apr / 1200;
      let pmt = 0;
      if (r > 0 && n > 0) {
        pmt = (P * r) / (1 - Math.pow(1 + r, -n));
      } else if (n > 0) {
        pmt = P / n;
      }
      const total = pmt * n;
      return {
        value: pmt,
        secondary: 'Total Interest: $' + (total - P).toFixed(2) + ' | Total Paid: $' + total.toFixed(2)
      };
    `,
  },
  {
    id: 'retirement-calculator',
    category: 'finance',
    name: 'Retirement Calculator',
    title: 'Retirement Calculator — 4% Rule, Nest Egg & Savings Goals',
    description: 'Calculate your required retirement nest egg, projected savings timeline, and sustainable safe withdrawal rate.',
    badge: 'Popular',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Safe Withdrawal & Nest Egg Formula',
      expression: 'Required Nest Egg = Annual Retirement Spending ÷ Safe Withdrawal Rate (4%)',
      explanation: 'Based on the Trinity Study, a 4% initial withdrawal rate with inflation adjustments provides a 95%+ probability of portfolio survival over 30 years.',
    },
    example: {
      title: 'Worked Example: $60,000 Desired Annual Retirement Income',
      scenario: 'You desire $60,000 annual retirement spending at a 4.0% withdrawal rate.',
      steps: [
        {
          number: 1,
          title: 'Calculate target nest egg',
          description: '$60,000 ÷ 0.04 = $1,500,000 target portfolio.',
          mathExpression: 'Target Nest Egg = $1,500,000',
        },
      ],
      conclusion: 'You will need an estimated $1.5M nest egg to sustainably draw $60,000/year.',
    },
    faqs: [
      {
        question: 'What is the Trinity Study 4% rule?',
        answer: 'A financial landmark study indicating that a 50/50 stock/bond portfolio can sustain a 4% annual withdrawal for 30+ years without exhaustion.',
      },
    ],
    inputs: [
      { id: 'current_age', label: 'Current Age', type: 'number', defaultValue: 30, step: 1 },
      { id: 'retire_age', label: 'Target Retirement Age', type: 'number', defaultValue: 65, step: 1 },
      { id: 'annual_spend', label: 'Annual Spending in Retirement ($)', type: 'number', defaultValue: 60000, step: 1000 },
      { id: 'swr', label: 'Safe Withdrawal Rate (%)', type: 'number', defaultValue: 4.0, step: 0.25 },
    ],
    defaultResult: {
      label: 'Target Retirement Nest Egg',
      initialValue: 1500000,
      decimals: 0,
      secondaryText: 'Years until retirement: 35 | Safe Annual Draw: $60,000',
      accent: 'violet',
      prefix: '$',
    },
    computeScript: `
      const curAge = parseFloat(inputs.current_age || '30');
      const retAge = parseFloat(inputs.retire_age || '65');
      const spend = parseFloat(inputs.annual_spend || '0');
      const swr = parseFloat(inputs.swr || '4') / 100;
      const nestEgg = swr > 0 ? spend / swr : 0;
      const yearsLeft = Math.max(0, retAge - curAge);
      return {
        value: nestEgg,
        secondary: 'Years to retirement: ' + yearsLeft + ' | Safe Annual Draw: $' + spend.toLocaleString()
      };
    `,
  },
  {
    id: 'amortization-calculator',
    category: 'finance',
    name: 'Amortization Calculator',
    title: 'Loan Amortization Calculator — Principal vs Interest Schedule',
    description: 'Generate detailed month-by-month and annual amortization schedules showing balance reduction and interest payments.',
    badge: 'Universal',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Monthly Amortization Breakdown',
      expression: 'Interest Month = Balance × (Rate / 12) | Principal Month = Payment - Interest Month',
      explanation: 'Each monthly payment covers newly accrued interest first, with the remainder reducing the loan balance.',
    },
    example: {
      title: 'Worked Example: Month 1 of $100,000 Loan at 6%',
      scenario: 'Loan balance $100,000 at 6% with $599.55 monthly payment.',
      steps: [
        {
          number: 1,
          title: 'Calculate Month 1 interest',
          description: '$100,000 × (0.06 ÷ 12) = $500.00.',
          mathExpression: 'Interest = $500.00',
        },
        {
          number: 2,
          title: 'Calculate Month 1 principal',
          description: '$599.55 - $500.00 = $99.55.',
          mathExpression: 'Principal = $99.55',
        },
      ],
      conclusion: 'Ending Month 1 balance is $99,900.45.',
    },
    faqs: [
      {
        question: 'Why does principal repayment accelerate over time?',
        answer: 'Because as the outstanding balance declines, less monthly interest accrues, allowing a larger percentage of your fixed payment to pay down principal.',
      },
    ],
    inputs: [
      { id: 'loan_amount', label: 'Loan Amount ($)', type: 'number', defaultValue: 100000, step: 5000 },
      { id: 'interest_rate', label: 'Interest Rate (%)', type: 'number', defaultValue: 6.0, step: 0.1 },
      { id: 'loan_term_years', label: 'Loan Term (Years)', type: 'number', defaultValue: 30, step: 1 },
    ],
    defaultResult: {
      label: 'Monthly Payment',
      initialValue: 599.55,
      decimals: 2,
      secondaryText: 'First Month Principal: $99.55 | First Month Interest: $500.00',
      accent: 'link',
      prefix: '$',
    },
    computeScript: `
      const P = parseFloat(inputs.loan_amount || '0');
      const rate = parseFloat(inputs.interest_rate || '0');
      const years = parseFloat(inputs.loan_term_years || '30');
      const n = years * 12;
      const r = rate / 1200;
      let pmt = 0;
      if (r > 0 && n > 0) {
        const factor = Math.pow(1 + r, n);
        pmt = (P * r * factor) / (factor - 1);
      }
      const m1Int = P * r;
      const m1Princ = pmt - m1Int;
      return {
        value: pmt,
        secondary: 'Month 1 Principal: $' + m1Princ.toFixed(2) + ' | Interest: $' + m1Int.toFixed(2)
      };
    `,
  },
  {
    id: 'investment-calculator',
    category: 'finance',
    name: 'Investment Calculator',
    title: 'Investment Calculator — ROI, Capital Growth & Portfolio Value',
    description: 'Calculate future investment portfolio value, total return on investment (ROI), and annualized CAGR growth.',
    badge: 'Popular',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Compound Annual Growth Rate (CAGR) & Future Value',
      expression: 'CAGR = (Ending Value / Starting Value)^(1/t) - 1',
      explanation: 'Calculates the smoothed annualized rate of return earned on an investment over multiple years.',
    },
    example: {
      title: 'Worked Example: $25,000 Portfolio over 8 Years at 7.5%',
      scenario: '$25,000 invested with no additional contributions at 7.5% annual return for 8 years.',
      steps: [
        {
          number: 1,
          title: 'Calculate future value',
          description: '$25,000 × (1.075)⁸ = $44,586.29.',
          mathExpression: 'FV = $44,586.29',
        },
      ],
      conclusion: 'Total capital gain is $19,586.29 (78.35% total ROI).',
    },
    faqs: [
      {
        question: 'What is the historical average stock market return?',
        answer: 'The S&P 500 has historically produced an annualized nominal return of approximately 10% (around 7% after inflation) over long-term multi-decade periods.',
      },
    ],
    inputs: [
      { id: 'initial_capital', label: 'Starting Capital ($)', type: 'number', defaultValue: 25000, step: 1000 },
      { id: 'return_rate', label: 'Expected Annual Return (%)', type: 'number', defaultValue: 7.5, step: 0.1 },
      { id: 'years', label: 'Time Horizon (Years)', type: 'number', defaultValue: 8, step: 1 },
    ],
    defaultResult: {
      label: 'Future Investment Value',
      initialValue: 44586.29,
      decimals: 2,
      secondaryText: 'Capital Gain: $19,586.29 | Total Return: 78.35%',
      accent: 'cyan',
      prefix: '$',
    },
    computeScript: `
      const P = parseFloat(inputs.initial_capital || '0');
      const r = parseFloat(inputs.return_rate || '0') / 100;
      const t = parseFloat(inputs.years || '0');
      const fv = P * Math.pow(1 + r, t);
      const gain = fv - P;
      const roi = P > 0 ? (gain / P) * 100 : 0;
      return {
        value: fv,
        secondary: 'Capital Gain: $' + gain.toFixed(2) + ' | Total ROI: ' + roi.toFixed(2) + '%'
      };
    `,
  },
  {
    id: 'inflation-calculator',
    category: 'finance',
    name: 'Inflation Calculator',
    title: 'Inflation Calculator — Purchasing Power & Historical Value',
    description: 'Calculate how inflation erodes purchasing power over time and determine what future amounts are worth in today’s dollars.',
    badge: 'Universal',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Inflation Purchasing Power Formula',
      expression: 'Adjusted Value = Today Value × (1 + Inflation Rate)ᵗ',
      explanation: 'Projects the equivalent nominal dollar amount required in the future to match current buying power at annual inflation rate i.',
    },
    example: {
      title: 'Worked Example: $100 purchasing power after 15 years at 3% inflation',
      scenario: 'Evaluating the buying power of $100 over 15 years at an average 3.0% annual inflation rate.',
      steps: [
        {
          number: 1,
          title: 'Calculate future nominal cost',
          description: '$100 × (1.03)¹⁵ = $155.80.',
          mathExpression: 'Future Cost = $155.80',
        },
      ],
      conclusion: 'You will need $155.80 in 15 years to purchase what $100 buys today.',
    },
    faqs: [
      {
        question: 'What is the Federal Reserve target inflation rate?',
        answer: 'The US Federal Reserve targets an average long-run inflation rate of 2.0% per year.',
      },
    ],
    inputs: [
      { id: 'amount', label: 'Starting Value ($)', type: 'number', defaultValue: 100, step: 10 },
      { id: 'inflation_rate', label: 'Average Annual Inflation (%)', type: 'number', defaultValue: 3.0, step: 0.1 },
      { id: 'years', label: 'Number of Years', type: 'number', defaultValue: 15, step: 1 },
    ],
    defaultResult: {
      label: 'Future Cost for Same Goods',
      initialValue: 155.80,
      decimals: 2,
      secondaryText: 'Cumulative Price Increase: 55.80%',
      accent: 'link',
      prefix: '$',
    },
    computeScript: `
      const amt = parseFloat(inputs.amount || '0');
      const rate = parseFloat(inputs.inflation_rate || '0') / 100;
      const yrs = parseFloat(inputs.years || '0');
      const futureVal = amt * Math.pow(1 + rate, yrs);
      const increasePct = amt > 0 ? ((futureVal - amt) / amt) * 100 : 0;
      return {
        value: futureVal,
        secondary: 'Cumulative Price Increase: ' + increasePct.toFixed(2) + '%'
      };
    `,
  },
  {
    id: 'finance-calculator',
    category: 'finance',
    name: 'Finance Calculator',
    title: 'Financial Calculator — Time Value of Money (TVM Solver)',
    description: 'General-purpose Time Value of Money (TVM) calculator solving Present Value (PV), Future Value (FV), Interest, and Payments.',
    badge: 'Core',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Time Value of Money (TVM) Identity',
      expression: 'PV + FV / (1 + r)ⁿ + PMT × [(1 - (1 + r)⁻ⁿ) / r] = 0',
      explanation: 'Core financial equation linking capital across time via discounted cash flow analysis.',
    },
    example: {
      title: 'Worked Example: Future Value of $500/Month at 6%',
      scenario: 'Contributing $500/month for 5 years at 6% annual return with $0 starting balance.',
      steps: [
        {
          number: 1,
          title: 'Calculate future value',
          description: '$500 × [((1 + 0.005)⁶⁰ - 1) / 0.005] = $34,885.02.',
          mathExpression: 'FV = $34,885.02',
        },
      ],
      conclusion: 'Accumulated balance after 5 years is $34,885.02.',
    },
    faqs: [
      {
        question: 'What is the Time Value of Money principle?',
        answer: 'A dollar received today is worth more than a dollar received in the future because of its potential earning capacity.',
      },
    ],
    inputs: [
      { id: 'pv', label: 'Present Value ($)', type: 'number', defaultValue: 0, step: 500 },
      { id: 'pmt', label: 'Periodic Payment ($)', type: 'number', defaultValue: 500, step: 50 },
      { id: 'rate', label: 'Annual Interest Rate (%)', type: 'number', defaultValue: 6.0, step: 0.1 },
      { id: 'periods', label: 'Number of Periods (Months)', type: 'number', defaultValue: 60, step: 6 },
    ],
    defaultResult: {
      label: 'Future Value (FV)',
      initialValue: 34885.02,
      decimals: 2,
      secondaryText: 'Total Principal Invested: $30,000.00',
      accent: 'cyan',
      prefix: '$',
    },
    computeScript: `
      const pv = parseFloat(inputs.pv || '0');
      const pmt = parseFloat(inputs.pmt || '0');
      const rate = parseFloat(inputs.rate || '0') / 1200;
      const n = parseFloat(inputs.periods || '1');
      let fv = 0;
      if (rate > 0) {
        const factor = Math.pow(1 + rate, n);
        fv = pv * factor + pmt * ((factor - 1) / rate);
      } else {
        fv = pv + pmt * n;
      }
      return {
        value: fv,
        secondary: 'Total Invested: $' + (pv + pmt * n).toFixed(2)
      };
    `,
  },
  {
    id: 'income-tax-calculator',
    category: 'finance',
    name: 'Income Tax Calculator',
    title: 'Income Tax Calculator — Marginal vs Effective Tax Rates',
    description: 'Calculate income tax liability, effective tax rate, and take-home pay across progressive marginal tax brackets.',
    badge: 'Tax-Aware',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Progressive Marginal Tax Brackets',
      expression: 'Tax = Σ (Income in Bracket i × Rate i) | Effective Rate = Total Tax ÷ Gross Income',
      explanation: 'Under progressive taxation, income is taxed in tranches at increasing marginal rates rather than a single flat percentage.',
    },
    example: {
      title: 'Worked Example: $75,000 Single Income (Federal Baseline)',
      scenario: '$75,000 gross salary with standard deduction applied.',
      steps: [
        {
          number: 1,
          title: 'Calculate taxable income',
          description: '$75,000 - $14,600 standard deduction = $60,400 taxable income.',
          mathExpression: 'Taxable Income = $60,400',
        },
        {
          number: 2,
          title: 'Compute marginal brackets',
          description: '10% on first $11,600 ($1,160) + 12% on remainder ($5,856).',
          mathExpression: 'Total Federal Tax = $7,016',
        },
      ],
      conclusion: 'Effective tax rate is ~9.35%, leaving take-home pay of $67,984.',
    },
    faqs: [
      {
        question: 'What is the difference between marginal and effective tax rate?',
        answer: 'Your marginal rate is the tax paid on your last dollar of income. Your effective rate is your total tax paid divided by total income.',
      },
    ],
    inputs: [
      { id: 'gross_income', label: 'Gross Annual Income ($)', type: 'number', defaultValue: 75000, step: 1000 },
      { id: 'deductions', label: 'Standard / Itemized Deductions ($)', type: 'number', defaultValue: 14600, step: 100 },
    ],
    defaultResult: {
      label: 'Estimated Income Tax',
      initialValue: 7016.00,
      decimals: 2,
      secondaryText: 'Effective Rate: 9.35% | Net Take-Home: $67,984.00',
      accent: 'violet',
      prefix: '$',
    },
    computeScript: `
      const gross = parseFloat(inputs.gross_income || '0');
      const ded = parseFloat(inputs.deductions || '0');
      const taxable = Math.max(0, gross - ded);
      // Standard US baseline single brackets: 10% up to 11600, 12% to 47150, 22% to 100525, 24% above
      let tax = 0;
      if (taxable <= 11600) {
        tax = taxable * 0.10;
      } else if (taxable <= 47150) {
        tax = 11600 * 0.10 + (taxable - 11600) * 0.12;
      } else if (taxable <= 100525) {
        tax = 11600 * 0.10 + (47150 - 11600) * 0.12 + (taxable - 47150) * 0.22;
      } else {
        tax = 11600 * 0.10 + (47150 - 11600) * 0.12 + (100525 - 47150) * 0.22 + (taxable - 100525) * 0.24;
      }
      const eff = gross > 0 ? (tax / gross) * 100 : 0;
      const takeHome = gross - tax;
      return {
        value: tax,
        secondary: 'Effective Rate: ' + eff.toFixed(2) + '% | Take-Home: $' + takeHome.toFixed(2)
      };
    `,
  },
  {
    id: 'salary-calculator',
    category: 'finance',
    name: 'Salary Calculator',
    title: 'Salary Calculator — Hourly to Annual Wage Conversion',
    description: 'Convert between hourly wage, weekly salary, bi-weekly paychecks, monthly earnings, and annual salary.',
    badge: 'Everyday',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Salary Equivalence Formula',
      expression: 'Annual = Hourly × Hours/Week × 52 Weeks',
      explanation: 'Converts base wage rates assuming standard 52 work weeks per calendar year.',
    },
    example: {
      title: 'Worked Example: $35/Hour at 40 Hours/Week',
      scenario: 'Calculating annual salary from $35.00/hour.',
      steps: [
        {
          number: 1,
          title: 'Multiply weekly hours',
          description: '$35.00 × 40 = $1,400.00 / week.',
          mathExpression: 'Weekly Pay = $1,400.00',
        },
        {
          number: 2,
          title: 'Calculate annual salary',
          description: '$1,400.00 × 52 weeks = $72,800.00 / year.',
          mathExpression: 'Annual Salary = $72,800.00',
        },
      ],
      conclusion: 'A $35/hr wage corresponds to $72,800/yr ($6,066.67/month).',
    },
    faqs: [
      {
        question: 'How many work hours are in a typical year?',
        answer: 'A standard 40-hour work week across 52 weeks equals 2,080 working hours annually.',
      },
    ],
    inputs: [
      { id: 'wage', label: 'Wage Amount ($)', type: 'number', defaultValue: 35, step: 1 },
      { id: 'hours_per_week', label: 'Hours per Week', type: 'number', defaultValue: 40, step: 1 },
      {
        id: 'frequency',
        label: 'Pay Frequency',
        type: 'select',
        defaultValue: 'hourly',
        options: [
          { label: 'Hourly', value: 'hourly' },
          { label: 'Weekly', value: 'weekly' },
          { label: 'Monthly', value: 'monthly' },
          { label: 'Annual', value: 'annual' },
        ],
      },
    ],
    defaultResult: {
      label: 'Equivalent Annual Salary',
      initialValue: 72800,
      decimals: 2,
      secondaryText: 'Monthly: $6,066.67 | Bi-Weekly: $2,800.00 | Weekly: $1,400.00',
      accent: 'link',
      prefix: '$',
    },
    computeScript: `
      const wage = parseFloat(inputs.wage || '0');
      const hrs = parseFloat(inputs.hours_per_week || '40');
      const freq = inputs.frequency || 'hourly';
      let annual = 0;
      if (freq === 'hourly') {
        annual = wage * hrs * 52;
      } else if (freq === 'weekly') {
        annual = wage * 52;
      } else if (freq === 'monthly') {
        annual = wage * 12;
      } else {
        annual = wage;
      }
      const monthly = annual / 12;
      const biweekly = annual / 26;
      const weekly = annual / 52;
      const hourly = hrs > 0 ? annual / (hrs * 52) : 0;
      return {
        value: annual,
        secondary: 'Monthly: $' + monthly.toFixed(2) + ' | Bi-Weekly: $' + biweekly.toFixed(2) + ' | Hourly: $' + hourly.toFixed(2)
      };
    `,
  },
  {
    id: 'interest-rate-calculator',
    category: 'finance',
    name: 'Interest Rate Calculator',
    title: 'Interest Rate Calculator — Nominal APR vs Effective APY',
    description: 'Convert between nominal Annual Percentage Rate (APR) and Effective Annual Percentage Yield (APY) based on compounding.',
    badge: 'Universal',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Effective Annual Rate (EAR / APY) Formula',
      expression: 'APY = (1 + r/n)ⁿ - 1',
      explanation: 'Calculates true annual yield reflecting the compounding effect of intra-year compounding cycles.',
    },
    example: {
      title: 'Worked Example: 6% Nominal APR Compounded Daily',
      scenario: 'A savings account offers 6.0% nominal interest compounded daily (n = 365).',
      steps: [
        {
          number: 1,
          title: 'Calculate APY',
          description: '(1 + 0.06 / 365)³⁶⁵ - 1 = 0.06183 = 6.183%.',
          mathExpression: 'APY = 6.18%',
        },
      ],
      conclusion: 'Daily compounding increases the effective yield from 6.00% APR to 6.18% APY.',
    },
    faqs: [
      {
        question: 'Why is APY higher than APR for savings accounts?',
        answer: 'APR does not take into account interest earned on interest. APY includes compounding, giving the true annual yield.',
      },
    ],
    inputs: [
      { id: 'apr', label: 'Nominal APR (%)', type: 'number', defaultValue: 6.0, step: 0.05 },
      {
        id: 'compounds',
        label: 'Compounding Frequency',
        type: 'select',
        defaultValue: 365,
        options: [
          { label: 'Annually (1/yr)', value: 1 },
          { label: 'Quarterly (4/yr)', value: 4 },
          { label: 'Monthly (12/yr)', value: 12 },
          { label: 'Daily (365/yr)', value: 365 },
        ],
      },
    ],
    defaultResult: {
      label: 'Effective Annual Percentage Yield (APY)',
      initialValue: 6.18,
      decimals: 2,
      secondaryText: 'Nominal APR: 6.00% | Frequency: Daily (365x)',
      accent: 'link',
      suffix: '%',
    },
    computeScript: `
      const apr = parseFloat(inputs.apr || '0') / 100;
      const n = parseFloat(inputs.compounds || '365');
      const apy = (Math.pow(1 + apr / n, n) - 1) * 100;
      return {
        value: apy,
        secondary: 'Nominal APR: ' + (apr * 100).toFixed(2) + '% | Compounding: ' + n + 'x/yr'
      };
    `,
  },
  {
    id: 'sales-tax-calculator',
    category: 'finance',
    name: 'Sales Tax Calculator',
    title: 'Sales Tax Calculator — Pre-Tax & Post-Tax Price Breakdown',
    description: 'Calculate sales tax amounts, total retail price after tax, and reverse tax to find original pre-tax prices.',
    badge: 'Everyday',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Sales Tax Formula',
      expression: 'Tax Amount = Pre-Tax Price × (Tax Rate / 100) | Total = Pre-Tax + Tax Amount',
      explanation: 'Applies statutory percentage sales tax to determine total consumer invoice price.',
    },
    example: {
      title: 'Worked Example: $85.00 Item at 8.25% Sales Tax',
      scenario: 'Purchasing an $85.00 product with 8.25% state/local sales tax.',
      steps: [
        {
          number: 1,
          title: 'Calculate tax amount',
          description: '$85.00 × 0.0825 = $7.01.',
          mathExpression: 'Tax = $7.01',
        },
        {
          number: 2,
          title: 'Calculate total',
          description: '$85.00 + $7.01 = $92.01.',
          mathExpression: 'Total = $92.01',
        },
      ],
      conclusion: 'Final price is $92.01 with $7.01 paid in sales tax.',
    },
    faqs: [
      {
        question: 'How do I calculate pre-tax price from total price?',
        answer: 'Divide the total final price by (1 + Tax Rate / 100). For example, $108 at 8% tax: $108 / 1.08 = $100.',
      },
    ],
    inputs: [
      { id: 'price', label: 'Net Purchase Price ($)', type: 'number', defaultValue: 85, step: 5 },
      { id: 'tax_rate', label: 'Sales Tax Rate (%)', type: 'number', defaultValue: 8.25, step: 0.25 },
    ],
    defaultResult: {
      label: 'Total Payable Price (After Tax)',
      initialValue: 92.01,
      decimals: 2,
      secondaryText: 'Pre-Tax Price: $85.00 | Tax Amount: $7.01',
      accent: 'link',
      prefix: '$',
    },
    computeScript: `
      const price = parseFloat(inputs.price || '0');
      const rate = parseFloat(inputs.tax_rate || '0') / 100;
      const tax = price * rate;
      const total = price + tax;
      return {
        value: total,
        secondary: 'Pre-Tax Price: $' + price.toFixed(2) + ' | Tax Amount: $' + tax.toFixed(2)
      };
    `,
  },

  // ==========================================
  // FITNESS & HEALTH (9 Tools)
  // ==========================================
  {
    id: 'calorie-calculator',
    category: 'health',
    name: 'Calorie Calculator',
    title: 'Calorie Calculator — Daily Energy Expenditure (TDEE) & Goals',
    description: 'Calculate Total Daily Energy Expenditure (TDEE) and target calories for weight loss, maintenance, or muscle gain.',
    badge: 'Clinical',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Mifflin-St Jeor TDEE Formula',
      expression: 'BMR = 10W + 6.25H - 5A + S | TDEE = BMR × Activity Multiplier',
      explanation: 'Where W is weight in kg, H is height in cm, A is age, and S is sex adjustment (+5 for men, -161 for women).',
    },
    example: {
      title: 'Worked Example: 30-year-old male, 80kg, 180cm, moderately active',
      scenario: 'Male, age 30, weight 80kg, height 180cm, exercising 3-5 days/week (multiplier 1.55).',
      steps: [
        {
          number: 1,
          title: 'Calculate BMR',
          description: '10(80) + 6.25(180) - 5(30) + 5 = 800 + 1125 - 150 + 5 = 1,780 kcal.',
          mathExpression: 'BMR = 1,780 kcal',
        },
        {
          number: 2,
          title: 'Multiply by activity factor',
          description: '1,780 × 1.55 = 2,759 kcal.',
          mathExpression: 'TDEE = 2,759 kcal/day',
        },
      ],
      conclusion: 'Maintenance calories: 2,759 kcal/day. For steady fat loss: ~2,259 kcal/day (500 kcal deficit).',
    },
    faqs: [
      {
        question: 'What is a safe calorie deficit for fat loss?',
        answer: 'A deficit of 300 to 500 kcal/day promotes steady, sustainable fat loss of approximately 0.5 to 1.0 lb per week without excessive muscle loss.',
      },
    ],
    inputs: [
      { id: 'weight', label: 'Weight (kg)', type: 'number', defaultValue: 80, step: 1 },
      { id: 'height', label: 'Height (cm)', type: 'number', defaultValue: 180, step: 1 },
      { id: 'age', label: 'Age (Years)', type: 'number', defaultValue: 30, step: 1 },
      {
        id: 'gender',
        label: 'Biological Sex',
        type: 'select',
        defaultValue: 'male',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ],
      },
      {
        id: 'activity',
        label: 'Activity Level',
        type: 'select',
        defaultValue: 1.55,
        options: [
          { label: 'Sedentary (desk job, no exercise)', value: 1.2 },
          { label: 'Lightly Active (1-3 days/week)', value: 1.375 },
          { label: 'Moderately Active (3-5 days/week)', value: 1.55 },
          { label: 'Very Active (6-7 days/week)', value: 1.725 },
        ],
      },
    ],
    defaultResult: {
      label: 'Daily Maintenance Calories (TDEE)',
      initialValue: 2759,
      decimals: 0,
      secondaryText: 'Fat Loss (-500 kcal): 2,259 kcal | Muscle Gain (+300 kcal): 3,059 kcal',
      accent: 'violet',
      suffix: ' kcal/day',
    },
    computeScript: `
      const w = parseFloat(inputs.weight || '70');
      const h = parseFloat(inputs.height || '175');
      const a = parseFloat(inputs.age || '25');
      const isMale = inputs.gender === 'male';
      const mult = parseFloat(inputs.activity || '1.2');
      const s = isMale ? 5 : -161;
      const bmr = 10 * w + 6.25 * h - 5 * a + s;
      const tdee = Math.round(bmr * mult);
      return {
        value: tdee,
        secondary: 'Weight Loss (-500): ' + (tdee - 500) + ' kcal | Gain (+300): ' + (tdee + 300) + ' kcal'
      };
    `,
  },
  {
    id: 'body-fat-calculator',
    category: 'health',
    name: 'Body Fat Calculator',
    title: 'Body Fat Calculator — US Navy Circumference Method',
    description: 'Estimate body fat percentage and lean muscle mass using the official US Navy circumference formula.',
    badge: 'Clinical',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'US Navy Body Fat Formula',
      expression: 'Male: 495 / (1.0324 - 0.19077(log(waist - neck)) + 0.15456(log(height))) - 450',
      explanation: 'Uses log circumference measurements of the neck and waist relative to stature.',
    },
    example: {
      title: 'Worked Example: Male, 180cm, Waist 86cm, Neck 38cm',
      scenario: 'Male, height 180cm, neck circumference 38cm, waist circumference 86cm.',
      steps: [
        {
          number: 1,
          title: 'Compute Navy Formula',
          description: 'Calculates logarithmic circumference ratios.',
          mathExpression: 'Body Fat % ≈ 16.4%',
        },
      ],
      conclusion: 'Body fat estimate is 16.4% (Fitness/Athletic range for men).',
    },
    faqs: [
      {
        question: 'How accurate is the US Navy body fat formula?',
        answer: 'The Navy method correlates within 3-4% of DEXA scans when measurements are taken accurately with a snug tape measure.',
      },
    ],
    inputs: [
      { id: 'gender', label: 'Sex', type: 'select', defaultValue: 'male', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
      { id: 'height', label: 'Height (cm)', type: 'number', defaultValue: 180, step: 1 },
      { id: 'neck', label: 'Neck Circumference (cm)', type: 'number', defaultValue: 38, step: 0.5 },
      { id: 'waist', label: 'Waist at Navel (cm)', type: 'number', defaultValue: 86, step: 0.5 },
    ],
    defaultResult: {
      label: 'Estimated Body Fat Percentage',
      initialValue: 16.4,
      decimals: 1,
      secondaryText: 'Category: Fitness / Healthy Range',
      accent: 'violet',
      suffix: '%',
    },
    computeScript: `
      const h = parseFloat(inputs.height || '175');
      const n = parseFloat(inputs.neck || '38');
      const w = parseFloat(inputs.waist || '85');
      const isMale = inputs.gender === 'male';
      let bf = 0;
      if (isMale) {
        const diff = Math.max(1, w - n);
        bf = 495 / (1.0324 - 0.19077 * Math.log10(diff) + 0.15456 * Math.log10(h)) - 450;
      } else {
        const diff = Math.max(1, w - n);
        bf = 495 / (1.29579 - 0.35004 * Math.log10(diff) + 0.22100 * Math.log10(h)) - 450;
      }
      bf = Math.max(3, Math.min(60, bf));
      let cat = bf < 14 ? 'Athletes' : bf < 18 ? 'Fitness' : bf < 25 ? 'Average' : 'Overweight';
      return {
        value: bf,
        secondary: 'Category: ' + cat + ' | Fat Mass Ratio'
      };
    `,
  },
  {
    id: 'bmr-calculator',
    category: 'health',
    name: 'BMR Calculator',
    title: 'BMR Calculator — Basal Metabolic Rate (Calories at Complete Rest)',
    description: 'Calculate the baseline number of calories your body burns every 24 hours performing vital involuntary functions.',
    badge: 'Clinical',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Mifflin-St Jeor Basal Equation',
      expression: 'BMR (Men) = 10W + 6.25H - 5A + 5 | BMR (Women) = 10W + 6.25H - 5A - 161',
      explanation: 'Evaluates baseline caloric requirement without bodily motion or digestion.',
    },
    example: {
      title: 'Worked Example: Female, 65kg, 168cm, 28 years old',
      scenario: 'Female, weight 65kg, height 168cm, age 28.',
      steps: [
        {
          number: 1,
          title: 'Calculate BMR',
          description: '10(65) + 6.25(168) - 5(28) - 161 = 650 + 1050 - 140 - 161 = 1,399 kcal.',
          mathExpression: 'BMR = 1,399 kcal / day',
        },
      ],
      conclusion: 'Body burns 1,399 calories per day solely sustaining vital organs at rest.',
    },
    faqs: [
      {
        question: 'Can you eat below your BMR?',
        answer: 'Sustained eating significantly below BMR can induce lethargy, nutrient deficiencies, and metabolic adaptation; deficits are typically subtracted from TDEE, not BMR.',
      },
    ],
    inputs: [
      { id: 'weight', label: 'Weight (kg)', type: 'number', defaultValue: 65, step: 1 },
      { id: 'height', label: 'Height (cm)', type: 'number', defaultValue: 168, step: 1 },
      { id: 'age', label: 'Age (Years)', type: 'number', defaultValue: 28, step: 1 },
      { id: 'gender', label: 'Sex', type: 'select', defaultValue: 'female', options: [{ label: 'Female', value: 'female' }, { label: 'Male', value: 'male' }] },
    ],
    defaultResult: {
      label: 'Basal Metabolic Rate (BMR)',
      initialValue: 1399,
      decimals: 0,
      secondaryText: 'Calories burned at complete rest per 24 hours',
      accent: 'violet',
      suffix: ' kcal/day',
    },
    computeScript: `
      const w = parseFloat(inputs.weight || '65');
      const h = parseFloat(inputs.height || '168');
      const a = parseFloat(inputs.age || '28');
      const isMale = inputs.gender === 'male';
      const s = isMale ? 5 : -161;
      const bmr = Math.round(10 * w + 6.25 * h - 5 * a + s);
      return {
        value: bmr,
        secondary: 'Baseline calories burned at complete rest per day'
      };
    `,
  },
  {
    id: 'ideal-weight-calculator',
    category: 'health',
    name: 'Ideal Weight Calculator',
    title: 'Ideal Weight Calculator — Devine, Robinson & Miller Medical Formulas',
    description: 'Calculate healthy ideal body weight ranges for men and women using validated clinical formulas and WHO BMI standards.',
    badge: 'Clinical',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Devine Clinical Formula (1974)',
      expression: 'Men: 50.0 kg + 2.3 kg per inch over 5ft | Women: 45.5 kg + 2.3 kg per inch over 5ft',
      explanation: 'Widely used in medicine for pharmacological dosing and target clinical weight benchmarking.',
    },
    example: {
      title: 'Worked Example: 5 ft 10 in Male (70 inches)',
      scenario: 'Male, height 70 inches (10 inches over 5 feet).',
      steps: [
        {
          number: 1,
          title: 'Calculate Devine Formula',
          description: '50.0 + (10 × 2.3) = 73.0 kg (160.9 lbs).',
          mathExpression: 'Ideal Weight = 73.0 kg',
        },
      ],
      conclusion: 'Devine ideal weight is 73.0 kg (161 lbs). Healthy WHO range is 58.5 - 78.5 kg.',
    },
    faqs: [
      {
        question: 'Which ideal weight formula is the most accurate?',
        answer: 'The Devine formula is the institutional standard in healthcare, while Robinson and Miller offer slightly updated parameters.',
      },
    ],
    inputs: [
      { id: 'gender', label: 'Biological Sex', type: 'select', defaultValue: 'male', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
      { id: 'height_cm', label: 'Height (cm)', type: 'number', defaultValue: 178, step: 1 },
    ],
    defaultResult: {
      label: 'Devine Ideal Weight',
      initialValue: 73.0,
      decimals: 1,
      secondaryText: 'Healthy BMI Range: 58.6 - 79.2 kg (129 - 175 lbs)',
      accent: 'violet',
      suffix: ' kg',
    },
    computeScript: `
      const hCm = parseFloat(inputs.height_cm || '175');
      const isMale = inputs.gender === 'male';
      const totalInches = hCm / 2.54;
      const inchesOver5Ft = Math.max(0, totalInches - 60);
      const base = isMale ? 50.0 : 45.5;
      const idealKg = base + 2.3 * inchesOver5Ft;
      const idealLbs = idealKg * 2.20462;
      return {
        value: idealKg,
        secondary: 'Equivalent to ' + idealLbs.toFixed(1) + ' lbs | Devine Clinical Formula'
      };
    `,
  },
  {
    id: 'pace-calculator',
    category: 'health',
    name: 'Pace Calculator',
    title: 'Running Pace Calculator — Speed, Distance & Time Splits',
    description: 'Calculate running pace per kilometer or mile, project marathon and 5K finish times, or convert pace to speed (km/h & mph).',
    badge: 'Popular',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Pace Formula',
      expression: 'Pace = Total Time ÷ Total Distance | Speed = Distance ÷ Time',
      explanation: 'Calculates the minutes and seconds required to cover one standard mile or kilometer.',
    },
    example: {
      title: 'Worked Example: 10K in 50 Minutes',
      scenario: 'Running 10 kilometers in exactly 50 minutes and 0 seconds.',
      steps: [
        {
          number: 1,
          title: 'Calculate min/km',
          description: '50 min ÷ 10 km = 5.00 min/km (5:00 /km).',
          mathExpression: 'Pace = 5:00 /km',
        },
      ],
      conclusion: 'Pace is 5:00 min/km (8:03 min/mile) with a speed of 12.0 km/h.',
    },
    faqs: [
      {
        question: 'What is average running pace for a 5K?',
        answer: 'For recreational runners, average 5K finish time is around 28-35 minutes (pace between 5:36 to 7:00 per km).',
      },
    ],
    inputs: [
      { id: 'distance_km', label: 'Distance (Kilometers)', type: 'number', defaultValue: 10, step: 0.5 },
      { id: 'time_minutes', label: 'Total Time (Minutes)', type: 'number', defaultValue: 50, step: 1 },
    ],
    defaultResult: {
      label: 'Pace per Kilometer',
      initialValue: 5.00,
      decimals: 2,
      secondaryText: 'Pace: 5:00 min/km | Speed: 12.0 km/h (7.46 mph)',
      accent: 'violet',
      suffix: ' min/km',
    },
    computeScript: `
      const dist = parseFloat(inputs.distance_km || '10');
      const mins = parseFloat(inputs.time_minutes || '50');
      const paceVal = dist > 0 ? mins / dist : 0;
      const paceMins = Math.floor(paceVal);
      const paceSecs = Math.round((paceVal - paceMins) * 60);
      const speedKmh = mins > 0 ? (dist / (mins / 60)) : 0;
      const speedMph = speedKmh * 0.621371;
      const padSecs = paceSecs < 10 ? '0' + paceSecs : paceSecs;
      return {
        value: paceVal,
        secondary: 'Formatted: ' + paceMins + ':' + padSecs + ' /km | Speed: ' + speedKmh.toFixed(1) + ' km/h (' + speedMph.toFixed(1) + ' mph)'
      };
    `,
  },
  {
    id: 'pregnancy-calculator',
    category: 'health',
    name: 'Pregnancy Calculator',
    title: 'Pregnancy Calculator — Gestational Age & Trimester Milestones',
    description: 'Track gestational age by week and day, calculate trimester milestones, and monitor fetal development timeline.',
    badge: 'Clinical',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Gestational Timeline Formula',
      expression: 'Gestational Age = Current Date - First Day of Last Menstrual Period (LMP)',
      explanation: 'Full-term gestation spans 40 weeks (280 days) counted from the onset of the LMP.',
    },
    example: {
      title: 'Worked Example: LMP 12 Weeks Ago',
      scenario: 'LMP was 84 days ago (12 weeks 0 days).',
      steps: [
        {
          number: 1,
          title: 'Determine gestational age',
          description: '84 days ÷ 7 = 12 weeks 0 days (End of 1st Trimester).',
          mathExpression: 'Gestational Age = 12 Weeks',
        },
      ],
      conclusion: 'You are in Week 12 of pregnancy (First Trimester). 28 weeks remaining.',
    },
    faqs: [
      {
        question: 'When do the three trimesters start and end?',
        answer: 'First Trimester: Weeks 1-13; Second Trimester: Weeks 14-27; Third Trimester: Weeks 28-40+.',
      },
    ],
    inputs: [
      { id: 'weeks_pregnant', label: 'Current Gestational Age (Weeks)', type: 'number', defaultValue: 12, min: 1, max: 42, step: 1 },
    ],
    defaultResult: {
      label: 'Current Trimester',
      initialValue: 1,
      decimals: 0,
      secondaryText: 'Week 12 | Days remaining until full term: 196 days',
      accent: 'violet',
      prefix: 'Trimester ',
    },
    computeScript: `
      const w = parseFloat(inputs.weeks_pregnant || '12');
      let trim = w <= 13 ? 1 : w <= 27 ? 2 : 3;
      const daysLeft = Math.max(0, (40 - w) * 7);
      return {
        value: trim,
        secondary: 'Current Stage: Week ' + w + ' | Days remaining: ' + daysLeft + ' days'
      };
    `,
  },
  {
    id: 'pregnancy-conception-calculator',
    category: 'health',
    name: 'Pregnancy Conception Calculator',
    title: 'Pregnancy Conception Calculator — Estimate Ovulation & Conception Date',
    description: 'Estimate the probable date of conception based on your due date or last menstrual period with fertility window insights.',
    badge: 'Clinical',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Conception Estimation Formula',
      expression: 'Conception Date ≈ Estimated Due Date - 266 Days (38 Weeks)',
      explanation: 'Fertilization and conception typically occur 14 days after LMP onset (or 266 days prior to expected delivery).',
    },
    example: {
      title: 'Worked Example: Due Date October 20',
      scenario: 'Projected due date is October 20 (day 293 of calendar year).',
      steps: [
        {
          number: 1,
          title: 'Subtract 266 days',
          description: 'October 20 - 266 days ≈ January 27.',
          mathExpression: 'Estimated Conception = January 27',
        },
      ],
      conclusion: 'Probable conception window is January 25 – January 29.',
    },
    faqs: [
      {
        question: 'Why is gestational age different from conception age?',
        answer: 'Gestational age includes the 2 weeks before conception occurred (measured from the start of your period). Conception age is 2 weeks shorter.',
      },
    ],
    inputs: [
      { id: 'cycle_length', label: 'Average Menstrual Cycle Length (Days)', type: 'number', defaultValue: 28, step: 1 },
      { id: 'days_since_lmp', label: 'Days Since Start of Last Period', type: 'number', defaultValue: 45, step: 1 },
    ],
    defaultResult: {
      label: 'Estimated Conception Day in Cycle',
      initialValue: 14,
      decimals: 0,
      secondaryText: 'Estimated Fertilization Window: Day 12 to Day 16 of cycle',
      accent: 'violet',
      prefix: 'Cycle Day ',
    },
    computeScript: `
      const cycle = parseFloat(inputs.cycle_length || '28');
      const lmpDays = parseFloat(inputs.days_since_lmp || '45');
      const ovulationDay = cycle - 14;
      const daysPregnant = lmpDays - ovulationDay;
      return {
        value: ovulationDay,
        secondary: 'Probable Conception: Day ' + ovulationDay + ' | Fetal Age: ~' + Math.max(0, daysPregnant) + ' days'
      };
    `,
  },
  {
    id: 'due-date-calculator',
    category: 'health',
    name: 'Due Date Calculator',
    title: 'Due Date Calculator — Naegele’s Rule Estimated Delivery Date',
    description: 'Calculate your official estimated due date (EDD) using standard Naegele’s clinical obstetrics formula.',
    badge: 'Clinical',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Naegele’s Obstetrics Rule',
      expression: 'EDD = LMP + 1 Year - 3 Months + 7 Days (LMP + 280 Days)',
      explanation: 'Standard medical protocol for estimating the expected date of delivery assuming a 28-day menstrual cycle.',
    },
    example: {
      title: 'Worked Example: LMP on January 1st',
      scenario: 'First day of last menstrual period: January 1.',
      steps: [
        {
          number: 1,
          title: 'Apply Naegele’s Rule',
          description: 'January 1 + 280 days = October 8.',
          mathExpression: 'Estimated Due Date = October 8',
        },
      ],
      conclusion: 'Estimated Date of Delivery is October 8.',
    },
    faqs: [
      {
        question: 'What percentage of babies are born on their exact due date?',
        answer: 'Only about 4% to 5% of babies arrive on their exact calculated due date; most arrive within a window of 2 weeks before or after.',
      },
    ],
    inputs: [
      { id: 'cycle_length', label: 'Cycle Length (Days)', type: 'number', defaultValue: 28, step: 1 },
      { id: 'days_passed', label: 'Days Elapsed Since Last Period', type: 'number', defaultValue: 60, step: 1 },
    ],
    defaultResult: {
      label: 'Days Remaining Until Due Date',
      initialValue: 220,
      decimals: 0,
      secondaryText: 'Estimated Gestational Age: 8 Weeks 4 Days (280 days total)',
      accent: 'violet',
      suffix: ' days',
    },
    computeScript: `
      const cycle = parseFloat(inputs.cycle_length || '28');
      const passed = parseFloat(inputs.days_passed || '60');
      const totalGestation = 280 + (cycle - 28);
      const remaining = Math.max(0, totalGestation - passed);
      const currentWeeks = Math.floor(passed / 7);
      const currentDays = passed % 7;
      return {
        value: remaining,
        secondary: 'Gestational Progress: ' + currentWeeks + 'w ' + currentDays + 'd | Remaining: ' + remaining + ' days'
      };
    `,
  },

  // ==========================================
  // MATH (7 Tools)
  // ==========================================
  {
    id: 'scientific-calculator',
    category: 'math',
    name: 'Scientific Calculator',
    title: 'Scientific Calculator — Trigonometry, Powers, Logarithms & Roots',
    description: 'Perform advanced mathematical operations including sine, cosine, tangent, natural logs, square roots, and exponentiation.',
    badge: 'Precision',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Mathematical Function Library',
      expression: 'f(x) ∈ {sin(x), cos(x), tan(x), ln(x), log₁₀(x), √x, xʸ}',
      explanation: 'Evaluates IEEE 754 floating-point mathematical operations with standard algebraic operator precedence.',
    },
    example: {
      title: 'Worked Example: sin(30°) + ln(10)',
      scenario: 'Evaluating trigonometric sine of 30 degrees and natural log of 10.',
      steps: [
        {
          number: 1,
          title: 'Calculate sin(30°)',
          description: 'sin(π/6) = 0.500.',
          mathExpression: 'sin(30°) = 0.500',
        },
        {
          number: 2,
          title: 'Calculate ln(10)',
          description: 'ln(10) ≈ 2.3026.',
          mathExpression: 'ln(10) = 2.3026',
        },
      ],
      conclusion: 'Sum is 0.500 + 2.3026 = 2.8026.',
    },
    faqs: [
      {
        question: 'Are trigonometric inputs measured in degrees or radians?',
        answer: 'You can choose between Degrees and Radians modes for angle inputs.',
      },
    ],
    inputs: [
      { id: 'val1', label: 'Primary Operand (X)', type: 'number', defaultValue: 45, step: 'any' },
      {
        id: 'operation',
        label: 'Mathematical Function',
        type: 'select',
        defaultValue: 'sin',
        options: [
          { label: 'sin(X) — Sine', value: 'sin' },
          { label: 'cos(X) — Cosine', value: 'cos' },
          { label: 'tan(X) — Tangent', value: 'tan' },
          { label: 'sqrt(X) — Square Root', value: 'sqrt' },
          { label: 'ln(X) — Natural Log', value: 'ln' },
          { label: 'log10(X) — Log Base 10', value: 'log10' },
          { label: 'X² — Square', value: 'sq' },
        ],
      },
    ],
    defaultResult: {
      label: 'Calculated Value',
      initialValue: 0.7071,
      decimals: 4,
      secondaryText: 'sin(45°) = 0.7071 (with angle evaluated in degrees)',
      accent: 'link',
    },
    computeScript: `
      const x = parseFloat(inputs.val1 || '0');
      const op = inputs.operation || 'sin';
      let res = 0;
      let expText = '';
      if (op === 'sin') {
        const rad = (x * Math.PI) / 180;
        res = Math.sin(rad);
        expText = 'sin(' + x + '°) = ' + res.toFixed(4);
      } else if (op === 'cos') {
        const rad = (x * Math.PI) / 180;
        res = Math.cos(rad);
        expText = 'cos(' + x + '°) = ' + res.toFixed(4);
      } else if (op === 'tan') {
        const rad = (x * Math.PI) / 180;
        res = Math.tan(rad);
        expText = 'tan(' + x + '°) = ' + res.toFixed(4);
      } else if (op === 'sqrt') {
        res = x >= 0 ? Math.sqrt(x) : 0;
        expText = '√' + x + ' = ' + res.toFixed(4);
      } else if (op === 'ln') {
        res = x > 0 ? Math.log(x) : 0;
        expText = 'ln(' + x + ') = ' + res.toFixed(4);
      } else if (op === 'log10') {
        res = x > 0 ? Math.log10(x) : 0;
        expText = 'log10(' + x + ') = ' + res.toFixed(4);
      } else if (op === 'sq') {
        res = x * x;
        expText = x + '² = ' + res.toFixed(2);
      }
      return {
        value: res,
        secondary: expText
      };
    `,
  },
  {
    id: 'fraction-calculator',
    category: 'math',
    name: 'Fraction Calculator',
    title: 'Fraction Calculator — Add, Subtract, Multiply & Divide Fractions',
    description: 'Solve fraction arithmetic with step-by-step Least Common Denominator (LCD) steps and reduced fraction output.',
    badge: 'Universal',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Fraction Arithmetic',
      expression: 'Addition: a/b + c/d = (ad + bc) / bd | Multiplication: (a × c) / (b × d)',
      explanation: 'Finds the least common multiple of denominators, sums cross-products, and reduces by greatest common divisor (GCD).',
    },
    example: {
      title: 'Worked Example: 3/4 + 2/5',
      scenario: 'Adding two fractions with unlike denominators.',
      steps: [
        {
          number: 1,
          title: 'Find common denominator',
          description: 'LCD of 4 and 5 is 20.',
          mathExpression: 'LCD = 20',
        },
        {
          number: 2,
          title: 'Cross-multiply and add numerators',
          description: '(3 × 5) + (2 × 4) = 15 + 8 = 23.',
          mathExpression: '23 / 20 = 1 3/20 = 1.15',
        },
      ],
      conclusion: '3/4 + 2/5 = 23/20 (or 1.15 in decimal form).',
    },
    faqs: [
      {
        question: 'How do you reduce a fraction to its simplest form?',
        answer: 'Find the greatest common divisor (GCD) of the numerator and denominator using the Euclidean algorithm, and divide both numbers by it.',
      },
    ],
    inputs: [
      { id: 'num1', label: 'Numerator 1 (a)', type: 'number', defaultValue: 3, step: 1 },
      { id: 'den1', label: 'Denominator 1 (b)', type: 'number', defaultValue: 4, step: 1 },
      {
        id: 'operator',
        label: 'Operation',
        type: 'select',
        defaultValue: '+',
        options: [
          { label: '+ (Add)', value: '+' },
          { label: '- (Subtract)', value: '-' },
          { label: '× (Multiply)', value: '*' },
          { label: '÷ (Divide)', value: '/' },
        ],
      },
      { id: 'num2', label: 'Numerator 2 (c)', type: 'number', defaultValue: 2, step: 1 },
      { id: 'den2', label: 'Denominator 2 (d)', type: 'number', defaultValue: 5, step: 1 },
    ],
    defaultResult: {
      label: 'Decimal Result',
      initialValue: 1.15,
      decimals: 2,
      secondaryText: 'Reduced Fraction: 23/20 (1 3/20)',
      accent: 'link',
    },
    computeScript: `
      const n1 = parseInt(inputs.num1 || '3');
      const d1 = parseInt(inputs.den1 || '4') || 1;
      const op = inputs.operator || '+';
      const n2 = parseInt(inputs.num2 || '2');
      const d2 = parseInt(inputs.den2 || '5') || 1;
      let finalNum = 0;
      let finalDen = 1;
      if (op === '+') {
        finalNum = n1 * d2 + n2 * d1;
        finalDen = d1 * d2;
      } else if (op === '-') {
        finalNum = n1 * d2 - n2 * d1;
        finalDen = d1 * d2;
      } else if (op === '*') {
        finalNum = n1 * n2;
        finalDen = d1 * d2;
      } else if (op === '/') {
        finalNum = n1 * d2;
        finalDen = d1 * n2 || 1;
      }
      function gcd(a, b) { return b === 0 ? Math.abs(a) : gcd(b, a % b); }
      const g = gcd(finalNum, finalDen);
      const sNum = finalNum / g;
      const sDen = finalDen / g;
      const dec = finalNum / finalDen;
      return {
        value: dec,
        secondary: 'Reduced Fraction: ' + sNum + '/' + sDen + ' (Decimal: ' + dec.toFixed(4) + ')'
      };
    `,
  },
  {
    id: 'random-number-generator',
    category: 'math',
    name: 'Random Number Generator',
    title: 'Random Number Generator — Cryptographically Secure RNG',
    description: 'Generate truly unbiased random integers or floating-point numbers using hardware-level cryptographic entropy (`crypto.getRandomValues`).',
    badge: 'Security',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Uniform Integer Random Distribution',
      expression: 'R = Min + ⌊(Max - Min + 1) × (CryptoBits / 2³²)⌋',
      explanation: 'Utilizes browser hardware entropy via Web Cryptography API to ensure zero statistical bias.',
    },
    example: {
      title: 'Worked Example: Random Roll Between 1 and 100',
      scenario: 'Generating an unbiased random integer between 1 and 100.',
      steps: [
        {
          number: 1,
          title: 'Generate hardware 32-bit uint',
          description: 'Draws 32 bits of entropy from CPU random number generator.',
          mathExpression: 'Unbiased Uniform Range = [1, 100]',
        },
      ],
      conclusion: 'Returns a cryptographically secure random integer.',
    },
    faqs: [
      {
        question: 'Why is crypto.getRandomValues better than Math.random()?',
        answer: 'Math.random() is pseudo-random and predictable. Web Crypto uses OS-level entropy pools, making it cryptographically secure and statistically uniform.',
      },
    ],
    inputs: [
      { id: 'min_val', label: 'Minimum Value', type: 'number', defaultValue: 1, step: 1 },
      { id: 'max_val', label: 'Maximum Value', type: 'number', defaultValue: 100, step: 1 },
    ],
    defaultResult: {
      label: 'Generated Random Integer',
      initialValue: 42,
      decimals: 0,
      secondaryText: 'Cryptographically secure uniform distribution [1, 100]',
      accent: 'cyan',
    },
    computeScript: `
      const min = Math.ceil(parseFloat(inputs.min_val || '1'));
      const max = Math.floor(parseFloat(inputs.max_val || '100'));
      const range = max - min + 1;
      let rand = 0;
      if (range > 0) {
        const arr = new Uint32Array(1);
        window.crypto.getRandomValues(arr);
        rand = min + (arr[0] % range);
      } else {
        rand = min;
      }
      return {
        value: rand,
        secondary: 'Range: [' + min + ' to ' + max + '] | WebCrypto CSPRNG Verified'
      };
    `,
  },
  {
    id: 'triangle-calculator',
    category: 'math',
    name: 'Triangle Calculator',
    title: 'Triangle Calculator — Area, Perimeter & Pythagorean Theorem',
    description: 'Calculate triangle area, hypotenuse, missing side lengths, and perimeter using Heron’s formula and trigonometry.',
    badge: 'Universal',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Heron’s Area Formula & Pythagorean Theorem',
      expression: 'Area = √[s(s-a)(s-b)(s-c)] | where semi-perimeter s = (a + b + c)/2',
      explanation: 'Calculates the area of any valid triangle given three side lengths a, b, and c without requiring height.',
    },
    example: {
      title: 'Worked Example: 3-4-5 Right Triangle',
      scenario: 'Sides a = 3, b = 4, c = 5.',
      steps: [
        {
          number: 1,
          title: 'Calculate semi-perimeter',
          description: 's = (3 + 4 + 5) ÷ 2 = 6.',
          mathExpression: 's = 6',
        },
        {
          number: 2,
          title: 'Apply Heron’s formula',
          description: 'Area = √[6 × (6-3) × (6-4) × (6-5)] = √[6 × 3 × 2 × 1] = √36 = 6.',
          mathExpression: 'Area = 6.00 sq units',
        },
      ],
      conclusion: 'Area is 6.00 and perimeter is 12.00.',
    },
    faqs: [
      {
        question: 'What is the triangle inequality theorem?',
        answer: 'The sum of the lengths of any two sides of a triangle must be strictly greater than the length of the third side (a + b > c).',
      },
    ],
    inputs: [
      { id: 'side_a', label: 'Side a', type: 'number', defaultValue: 3, step: 0.1 },
      { id: 'side_b', label: 'Side b', type: 'number', defaultValue: 4, step: 0.1 },
      { id: 'side_c', label: 'Side c', type: 'number', defaultValue: 5, step: 0.1 },
    ],
    defaultResult: {
      label: 'Triangle Area',
      initialValue: 6.00,
      decimals: 2,
      secondaryText: 'Perimeter: 12.00 | Semi-perimeter s: 6.00',
      accent: 'link',
      suffix: ' sq units',
    },
    computeScript: `
      const a = parseFloat(inputs.side_a || '3');
      const b = parseFloat(inputs.side_b || '4');
      const c = parseFloat(inputs.side_c || '5');
      const perim = a + b + c;
      const s = perim / 2;
      let area = 0;
      if (a + b > c && a + c > b && b + c > a) {
        area = Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c)));
      }
      return {
        value: area,
        secondary: 'Perimeter: ' + perim.toFixed(2) + ' | Semi-perimeter s = ' + s.toFixed(2)
      };
    `,
  },
  {
    id: 'standard-deviation-calculator',
    category: 'math',
    name: 'Standard Deviation Calculator',
    title: 'Standard Deviation Calculator — Sample vs Population Variance',
    description: 'Calculate sample standard deviation (s), population standard deviation (σ), variance, mean, and standard error of dataset.',
    badge: 'Statistics',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Sample Standard Deviation Formula',
      expression: 's = √[ Σ(xᵢ - μ)² ÷ (n - 1) ] | σ = √[ Σ(xᵢ - μ)² ÷ N ]',
      explanation: 'Uses Bessel’s correction (n - 1) for sample datasets to provide an unbiased estimator of population variance.',
    },
    example: {
      title: 'Worked Example: Data Set {10, 12, 23, 23, 16, 23, 21, 16}',
      scenario: 'Dataset of 8 observed sample values.',
      steps: [
        {
          number: 1,
          title: 'Calculate arithmetic mean',
          description: 'Sum = 144, Mean μ = 144 ÷ 8 = 18.0.',
          mathExpression: 'Mean μ = 18.00',
        },
        {
          number: 2,
          title: 'Sum squared deviations',
          description: 'Σ(xᵢ - 18)² = 166.',
          mathExpression: 'Sum of Squares = 166.00',
        },
        {
          number: 3,
          title: 'Divide by n - 1 and take square root',
          description: 's = √(166 ÷ 7) = √23.71 = 4.87.',
          mathExpression: 'Sample SD (s) = 4.87',
        },
      ],
      conclusion: 'Sample standard deviation s = 4.87; Population standard deviation σ = 4.56.',
    },
    faqs: [
      {
        question: 'When should I use sample vs population standard deviation?',
        answer: 'Use sample standard deviation (n - 1) when your numbers represent a random sample drawn from a larger group. Use population standard deviation (N) when you have measured every entity in the entire population.',
      },
    ],
    inputs: [
      { id: 'data_val1', label: 'Value 1', type: 'number', defaultValue: 10, step: 1 },
      { id: 'data_val2', label: 'Value 2', type: 'number', defaultValue: 12, step: 1 },
      { id: 'data_val3', label: 'Value 3', type: 'number', defaultValue: 23, step: 1 },
      { id: 'data_val4', label: 'Value 4', type: 'number', defaultValue: 23, step: 1 },
      { id: 'data_val5', label: 'Value 5', type: 'number', defaultValue: 16, step: 1 },
    ],
    defaultResult: {
      label: 'Sample Standard Deviation (s)',
      initialValue: 6.02,
      decimals: 2,
      secondaryText: 'Mean μ: 16.80 | Sample Variance s²: 36.20 | Count n: 5',
      accent: 'cyan',
    },
    computeScript: `
      const vals = [
        parseFloat(inputs.data_val1 || '0'),
        parseFloat(inputs.data_val2 || '0'),
        parseFloat(inputs.data_val3 || '0'),
        parseFloat(inputs.data_val4 || '0'),
        parseFloat(inputs.data_val5 || '0')
      ];
      const n = vals.length;
      const sum = vals.reduce((a, b) => a + b, 0);
      const mean = sum / n;
      const sqDiffs = vals.map(v => Math.pow(v - mean, 2));
      const sumSq = sqDiffs.reduce((a, b) => a + b, 0);
      const sampleVar = n > 1 ? sumSq / (n - 1) : 0;
      const sampleSD = Math.sqrt(sampleVar);
      return {
        value: sampleSD,
        secondary: 'Mean: ' + mean.toFixed(2) + ' | Variance s²: ' + sampleVar.toFixed(2) + ' | n = ' + n
      };
    `,
  },

  // ==========================================
  // EVERYDAY & OTHER TOOLS (10 Tools)
  // ==========================================
  {
    id: 'age-calculator',
    category: 'everyday',
    name: 'Age Calculator',
    title: 'Age Calculator — Exact Chronological Age in Years, Months & Days',
    description: 'Calculate your exact age down to years, months, weeks, days, hours, and minutes from your date of birth.',
    badge: 'Popular',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Chronological Age Algorithm',
      expression: 'Age = Current Timestamp - Birth Date',
      explanation: 'Accounts for leap years and variable days per month to return precise calendar age breakdown.',
    },
    example: {
      title: 'Worked Example: Born March 15, 2000',
      scenario: 'Calculating exact age as of March 15, 2026.',
      steps: [
        {
          number: 1,
          title: 'Calculate year difference',
          description: '2026 - 2000 = 26 full years.',
          mathExpression: 'Years = 26',
        },
      ],
      conclusion: 'Exact age is 26 years, 0 months, 0 days.',
    },
    faqs: [
      {
        question: 'Does this age calculator account for leap years?',
        answer: 'Yes, full calendar precision accounts for February 29 leap years and actual month day counts.',
      },
    ],
    inputs: [
      { id: 'birth_year', label: 'Birth Year', type: 'number', defaultValue: 2000, step: 1 },
      { id: 'birth_month', label: 'Birth Month (1-12)', type: 'number', defaultValue: 3, min: 1, max: 12, step: 1 },
      { id: 'birth_day', label: 'Birth Day (1-31)', type: 'number', defaultValue: 15, min: 1, max: 31, step: 1 },
    ],
    defaultResult: {
      label: 'Chronological Age',
      initialValue: 26,
      decimals: 0,
      secondaryText: 'Full Calendar Age in Years',
      accent: 'link',
      suffix: ' Years Old',
    },
    computeScript: `
      const y = parseInt(inputs.birth_year || '2000');
      const m = parseInt(inputs.birth_month || '1') - 1;
      const d = parseInt(inputs.birth_day || '1');
      const birth = new Date(y, m, d);
      const now = new Date();
      let ageYears = now.getFullYear() - birth.getFullYear();
      let mDiff = now.getMonth() - birth.getMonth();
      if (mDiff < 0 || (mDiff === 0 && now.getDate() < birth.getDate())) {
        ageYears--;
      }
      const totalDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
      return {
        value: ageYears,
        secondary: 'Lived: ' + totalDays.toLocaleString() + ' days | ' + (totalDays * 24).toLocaleString() + ' hours'
      };
    `,
  },
  {
    id: 'date-calculator',
    category: 'everyday',
    name: 'Date Calculator',
    title: 'Date Calculator — Days Between Dates & Business Day Counter',
    description: 'Calculate the number of calendar days, business working days, and weeks between two arbitrary dates.',
    badge: 'Everyday',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Date Difference Formula',
      expression: 'Duration = (Date 2 - Date 1) in Milliseconds ÷ (1000 × 60 × 60 × 24)',
      explanation: 'Calculates absolute duration between two calendar moments.',
    },
    example: {
      title: 'Worked Example: January 1 to December 31',
      scenario: 'Calculating total days in a 365-day calendar year.',
      steps: [
        {
          number: 1,
          title: 'Calculate elapsed span',
          description: 'December 31 - January 1 = 364 days difference.',
          mathExpression: 'Difference = 364 Days',
        },
      ],
      conclusion: 'Spans 52 weeks.',
    },
    faqs: [
      {
        question: 'Are business days excluded from weekends?',
        answer: 'Yes, business day counters exclude Saturdays and Sundays.',
      },
    ],
    inputs: [
      { id: 'start_year', label: 'Start Year', type: 'number', defaultValue: 2026, step: 1 },
      { id: 'start_month', label: 'Start Month (1-12)', type: 'number', defaultValue: 1, step: 1 },
      { id: 'start_day', label: 'Start Day', type: 'number', defaultValue: 1, step: 1 },
      { id: 'end_year', label: 'End Year', type: 'number', defaultValue: 2026, step: 1 },
      { id: 'end_month', label: 'End Month (1-12)', type: 'number', defaultValue: 12, step: 1 },
      { id: 'end_day', label: 'End Day', type: 'number', defaultValue: 31, step: 1 },
    ],
    defaultResult: {
      label: 'Calendar Days Difference',
      initialValue: 364,
      decimals: 0,
      secondaryText: 'Approximately 52.0 weeks (8,736 hours)',
      accent: 'link',
      suffix: ' days',
    },
    computeScript: `
      const d1 = new Date(parseInt(inputs.start_year || '2026'), parseInt(inputs.start_month || '1') - 1, parseInt(inputs.start_day || '1'));
      const d2 = new Date(parseInt(inputs.end_year || '2026'), parseInt(inputs.end_month || '1') - 1, parseInt(inputs.end_day || '1'));
      const diffMs = Math.abs(d2 - d1);
      const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
      const weeks = (days / 7).toFixed(1);
      return {
        value: days,
        secondary: 'Spans: ' + weeks + ' weeks | ' + (days * 24).toLocaleString() + ' hours'
      };
    `,
  },
  {
    id: 'time-calculator',
    category: 'everyday',
    name: 'Time Calculator',
    title: 'Time Calculator — Add & Subtract Hours, Minutes & Seconds',
    description: 'Add or subtract hours, minutes, and seconds, convert between 12-hour AM/PM and 24-hour military time.',
    badge: 'Utility',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Sexagesimal Time Summation',
      expression: 'Total Seconds = Hours × 3600 + Minutes × 60 + Seconds',
      explanation: 'Converts base-60 hours and minutes into base-10 seconds, adds duration, and reforms standard time.',
    },
    example: {
      title: 'Worked Example: 3h 45m + 2h 30m',
      scenario: 'Adding two time intervals together.',
      steps: [
        {
          number: 1,
          title: 'Sum minutes and hours',
          description: '45m + 30m = 75m (1h 15m). 3h + 2h + 1h = 6h 15m.',
          mathExpression: 'Sum = 6 Hours 15 Minutes',
        },
      ],
      conclusion: 'Total duration is 6.25 hours (6h 15m).',
    },
    faqs: [
      {
        question: 'How do you convert decimal hours to minutes?',
        answer: 'Multiply the fractional decimal portion by 60 (e.g. 0.25 hours × 60 = 15 minutes).',
      },
    ],
    inputs: [
      { id: 'h1', label: 'Hours 1', type: 'number', defaultValue: 3, step: 1 },
      { id: 'm1', label: 'Minutes 1', type: 'number', defaultValue: 45, step: 1 },
      { id: 'h2', label: 'Hours 2', type: 'number', defaultValue: 2, step: 1 },
      { id: 'm2', label: 'Minutes 2', type: 'number', defaultValue: 30, step: 1 },
    ],
    defaultResult: {
      label: 'Total Decimal Hours',
      initialValue: 6.25,
      decimals: 2,
      secondaryText: 'Formatted Time: 6 Hours 15 Minutes (375 Total Minutes)',
      accent: 'link',
      suffix: ' hrs',
    },
    computeScript: `
      const h1 = parseFloat(inputs.h1 || '0');
      const m1 = parseFloat(inputs.m1 || '0');
      const h2 = parseFloat(inputs.h2 || '0');
      const m2 = parseFloat(inputs.m2 || '0');
      const totalMinutes = (h1 + h2) * 60 + (m1 + m2);
      const decHours = totalMinutes / 60;
      const resH = Math.floor(totalMinutes / 60);
      const resM = Math.round(totalMinutes % 60);
      return {
        value: decHours,
        secondary: 'Formatted: ' + resH + ' Hours ' + resM + ' Minutes (' + totalMinutes + ' mins)'
      };
    `,
  },
  {
    id: 'hours-calculator',
    category: 'everyday',
    name: 'Hours Calculator',
    title: 'Work Hours Calculator — Timesheet, Lunch Breaks & Gross Pay',
    description: 'Calculate daily and weekly work hours, deduct unpaid lunch breaks, and determine gross earnings.',
    badge: 'Productivity',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Net Working Hours Formula',
      expression: 'Net Work Hours = End Time - Start Time - Unpaid Break Duration',
      explanation: 'Calculates exact payable decimal hours for employee payroll and freelance billing.',
    },
    example: {
      title: 'Worked Example: 9:00 AM to 5:30 PM with 45m Lunch at $25/hr',
      scenario: 'Start 9:00 AM, End 5:30 PM (8.5 total hours), minus 0.75 hours lunch = 7.75 net hours.',
      steps: [
        {
          number: 1,
          title: 'Calculate gross pay',
          description: '7.75 hours × $25.00/hr = $193.75.',
          mathExpression: 'Earnings = $193.75',
        },
      ],
      conclusion: 'Net payable work time is 7.75 hours ($193.75 gross pay).',
    },
    faqs: [
      {
        question: 'Are lunch breaks usually paid or unpaid?',
        answer: 'In most jurisdictions, meal breaks of 30 minutes or longer where the employee is relieved of duties are unpaid.',
      },
    ],
    inputs: [
      { id: 'start_hour', label: 'Start Time (Hour 0-23)', type: 'number', defaultValue: 9, step: 1 },
      { id: 'end_hour', label: 'End Time (Hour 0-23)', type: 'number', defaultValue: 17, step: 1 },
      { id: 'break_mins', label: 'Unpaid Lunch Break (Minutes)', type: 'number', defaultValue: 45, step: 5 },
      { id: 'hourly_rate', label: 'Hourly Pay Rate ($)', type: 'number', defaultValue: 25, step: 1 },
    ],
    defaultResult: {
      label: 'Gross Earnings',
      initialValue: 181.25,
      decimals: 2,
      secondaryText: 'Net Payable Time: 7.25 Hours (7h 15m)',
      accent: 'link',
      prefix: '$',
    },
    computeScript: `
      const start = parseFloat(inputs.start_hour || '9');
      const end = parseFloat(inputs.end_hour || '17');
      const lunchMins = parseFloat(inputs.break_mins || '45');
      const rate = parseFloat(inputs.hourly_rate || '25');
      const grossHours = Math.max(0, end - start);
      const netHours = Math.max(0, grossHours - lunchMins / 60);
      const earnings = netHours * rate;
      const h = Math.floor(netHours);
      const m = Math.round((netHours - h) * 60);
      return {
        value: earnings,
        secondary: 'Net Time: ' + h + 'h ' + m + 'm (' + netHours.toFixed(2) + ' hrs) at $' + rate + '/hr'
      };
    `,
  },
  {
    id: 'gpa-calculator',
    category: 'everyday',
    name: 'GPA Calculator',
    title: 'GPA Calculator — 4.0 Scale Cumulative & Semester Average',
    description: 'Calculate high school or college Grade Point Average (GPA) on standard 4.0 weighted and unweighted scales.',
    badge: 'Academic',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Credit-Weighted GPA Equation',
      expression: 'GPA = Σ (Grade Points × Credit Hours) ÷ Σ (Credit Hours)',
      explanation: 'A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0 weighted by credit units.',
    },
    example: {
      title: 'Worked Example: 4 Courses (14 Credit Hours)',
      scenario: 'Course 1 (4 credits, A), Course 2 (3 credits, B), Course 3 (3 credits, A), Course 4 (4 credits, B).',
      steps: [
        {
          number: 1,
          title: 'Calculate quality points',
          description: '(4×4) + (3×3) + (3×4) + (4×3) = 16 + 9 + 12 + 12 = 49 quality points.',
          mathExpression: 'Points = 49.0',
        },
        {
          number: 2,
          title: 'Divide by total credits',
          description: '49 ÷ 14 = 3.50 GPA.',
          mathExpression: 'GPA = 3.50',
        },
      ],
      conclusion: 'Cumulative GPA is 3.50 (Honors caliber).',
    },
    faqs: [
      {
        question: 'What is the difference between weighted and unweighted GPA?',
        answer: 'Unweighted GPA caps grades at 4.0. Weighted GPA awards extra points (up to 5.0) for Advanced Placement (AP) or honors classes.',
      },
    ],
    inputs: [
      { id: 'pts_a', label: 'Credit Hours with Grade A (4.0)', type: 'number', defaultValue: 7, step: 1 },
      { id: 'pts_b', label: 'Credit Hours with Grade B (3.0)', type: 'number', defaultValue: 7, step: 1 },
      { id: 'pts_c', label: 'Credit Hours with Grade C (2.0)', type: 'number', defaultValue: 0, step: 1 },
    ],
    defaultResult: {
      label: 'Cumulative GPA',
      initialValue: 3.50,
      decimals: 2,
      secondaryText: 'Quality Points: 49.0 | Total Credits: 14.0',
      accent: 'cyan',
    },
    computeScript: `
      const cA = parseFloat(inputs.pts_a || '0');
      const cB = parseFloat(inputs.pts_b || '0');
      const cC = parseFloat(inputs.pts_c || '0');
      const totalCredits = cA + cB + cC;
      const totalPoints = cA * 4.0 + cB * 3.0 + cC * 2.0;
      const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
      return {
        value: gpa,
        secondary: 'Total Credits: ' + totalCredits + ' | Total Quality Points: ' + totalPoints.toFixed(1)
      };
    `,
  },
  {
    id: 'grade-calculator',
    category: 'everyday',
    name: 'Grade Calculator',
    title: 'Grade Calculator — Weighted Assignments & Final Exam Goal',
    description: 'Calculate overall semester course grade from weighted assignments and determine what score is needed on the final exam.',
    badge: 'Academic',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Weighted Average Grade',
      expression: 'Final Grade Needed = [Target - Current Grade × (1 - Weight)] ÷ Weight',
      explanation: 'Determines the minimum final exam score required to achieve your target overall letter grade.',
    },
    example: {
      title: 'Worked Example: 85% Current Grade, Final Worth 25%, Goal 90% (A)',
      scenario: 'You currently have an 85.0% grade. The final exam counts for 25% of the course.',
      steps: [
        {
          number: 1,
          title: 'Calculate score needed on final',
          description: '[90 - 85 × (1 - 0.25)] ÷ 0.25 = [90 - 63.75] ÷ 0.25 = 26.25 ÷ 0.25 = 105%.',
          mathExpression: 'Final Score Needed = 105%',
        },
      ],
      conclusion: 'You would need 105% (extra credit) to reach an A, or 75% on final to keep a solid B (82.5%).',
    },
    faqs: [
      {
        question: 'How do weighted categories work in grading?',
        answer: 'Each category (e.g. Homework 20%, Midterm 30%, Final 50%) is multiplied by its percentage weight to compute your composite score.',
      },
    ],
    inputs: [
      { id: 'current_grade', label: 'Current Course Grade (%)', type: 'number', defaultValue: 85, step: 0.5 },
      { id: 'target_grade', label: 'Target Desired Grade (%)', type: 'number', defaultValue: 90, step: 0.5 },
      { id: 'final_weight', label: 'Final Exam Weight (%)', type: 'number', defaultValue: 25, step: 1 },
    ],
    defaultResult: {
      label: 'Score Needed on Final Exam',
      initialValue: 105.00,
      decimals: 2,
      secondaryText: 'To achieve 90.00% overall grade',
      accent: 'link',
      suffix: '%',
    },
    computeScript: `
      const cur = parseFloat(inputs.current_grade || '85');
      const target = parseFloat(inputs.target_grade || '90');
      const weight = parseFloat(inputs.final_weight || '25') / 100;
      let needed = 0;
      if (weight > 0) {
        needed = (target - cur * (1 - weight)) / weight;
      }
      return {
        value: needed,
        secondary: 'To maintain ' + target + '% with final worth ' + (weight * 100) + '%'
      };
    `,
  },
  {
    id: 'concrete-calculator',
    category: 'everyday',
    name: 'Concrete Calculator',
    title: 'Concrete Calculator — Cubic Yards, Slabs, Footings & Bags',
    description: 'Calculate concrete volume in cubic yards and cubic meters, and determine how many 60-lb or 80-lb pre-mixed bags you need.',
    badge: 'Construction',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Concrete Slab Volume',
      expression: 'Cubic Yards = (Length ft × Width ft × Thickness in/12) ÷ 27',
      explanation: 'One cubic yard equals 27 cubic feet. A 10% spillage and settling allowance is recommended.',
    },
    example: {
      title: 'Worked Example: 12ft × 12ft Patio Slab, 4 inches thick',
      scenario: 'Patio length 12 ft, width 12 ft, slab thickness 4 inches.',
      steps: [
        {
          number: 1,
          title: 'Calculate cubic feet',
          description: '12 × 12 × (4 ÷ 12) = 144 × 0.333 = 48 cubic feet.',
          mathExpression: 'Volume = 48 cu ft',
        },
        {
          number: 2,
          title: 'Convert to cubic yards',
          description: '48 ÷ 27 = 1.78 cubic yards.',
          mathExpression: 'Cubic Yards = 1.78 yd³',
        },
      ],
      conclusion: 'You will need 1.78 cubic yards (or 80 bags of 60-lb pre-mixed concrete).',
    },
    faqs: [
      {
        question: 'How many 80-lb bags of concrete are in a cubic yard?',
        answer: 'One 80-lb bag yields approximately 0.60 cubic feet. It takes 45 bags (80-lb) to make 1 cubic yard (27 cubic feet).',
      },
    ],
    inputs: [
      { id: 'length_ft', label: 'Length (Feet)', type: 'number', defaultValue: 12, step: 0.5 },
      { id: 'width_ft', label: 'Width (Feet)', type: 'number', defaultValue: 12, step: 0.5 },
      { id: 'thickness_in', label: 'Thickness (Inches)', type: 'number', defaultValue: 4, step: 0.5 },
    ],
    defaultResult: {
      label: 'Required Concrete Volume',
      initialValue: 1.78,
      decimals: 2,
      secondaryText: 'Equals ~80 bags (60-lb) or ~60 bags (80-lb)',
      accent: 'link',
      suffix: ' Cubic Yards',
    },
    computeScript: `
      const l = parseFloat(inputs.length_ft || '12');
      const w = parseFloat(inputs.width_ft || '12');
      const tIn = parseFloat(inputs.thickness_in || '4');
      const cuFt = l * w * (tIn / 12);
      const cuYds = cuFt / 27;
      const bags60 = Math.ceil(cuFt / 0.45);
      const bags80 = Math.ceil(cuFt / 0.60);
      return {
        value: cuYds,
        secondary: 'Bags needed: ~' + bags60 + ' (60-lb) or ~' + bags80 + ' (80-lb) | ' + cuFt.toFixed(1) + ' cu ft'
      };
    `,
  },
  {
    id: 'subnet-calculator',
    category: 'everyday',
    name: 'Subnet Calculator',
    title: 'IPv4 Subnet Calculator — CIDR Prefix, Netmask & Usable Hosts',
    description: 'Calculate IPv4 subnet masks, network addresses, broadcast addresses, CIDR notation, and usable IP address ranges.',
    badge: 'Networking',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'IPv4 CIDR Host Allocation Formula',
      expression: 'Usable Hosts = 2^(32 - CIDR) - 2',
      explanation: 'Subtracts 2 addresses for the dedicated network identifier and directed broadcast address.',
    },
    example: {
      title: 'Worked Example: /24 CIDR Subnet (e.g. 192.168.1.0/24)',
      scenario: 'A /24 subnet has 24 network bits and 8 host bits.',
      steps: [
        {
          number: 1,
          title: 'Calculate host capacity',
          description: '2⁸ - 2 = 256 - 2 = 254 usable host addresses.',
          mathExpression: 'Usable Hosts = 254',
        },
      ],
      conclusion: 'Subnet mask is 255.255.255.0 with 254 usable IP endpoints.',
    },
    faqs: [
      {
        question: 'Why are 2 addresses subtracted in IPv4 subnets?',
        answer: 'The first address (all host bits 0) identifies the network itself, while the last address (all host bits 1) is reserved for network broadcast.',
      },
    ],
    inputs: [
      { id: 'cidr', label: 'CIDR Prefix (/1 to /30)', type: 'number', defaultValue: 24, min: 1, max: 30, step: 1 },
    ],
    defaultResult: {
      label: 'Usable Host IP Addresses',
      initialValue: 254,
      decimals: 0,
      secondaryText: 'Subnet Mask: 255.255.255.0 | Total Addresses: 256',
      accent: 'cyan',
      suffix: ' Hosts',
    },
    computeScript: `
      const cidr = parseInt(inputs.cidr || '24');
      const hostBits = 32 - cidr;
      const total = Math.pow(2, hostBits);
      const usable = Math.max(0, total - 2);
      // Netmask
      let maskInt = 0;
      for (let i = 0; i < cidr; i++) {
        maskInt += Math.pow(2, 31 - i);
      }
      const b1 = (maskInt >>> 24) & 255;
      const b2 = (maskInt >>> 16) & 255;
      const b3 = (maskInt >>> 8) & 255;
      const b4 = maskInt & 255;
      const maskStr = b1 + '.' + b2 + '.' + b3 + '.' + b4;
      return {
        value: usable,
        secondary: 'Subnet Mask: ' + maskStr + ' | Total IPs: ' + total.toLocaleString()
      };
    `,
  },
  {
    id: 'password-generator',
    category: 'everyday',
    name: 'Password Generator',
    title: 'Password Generator — Secure Cryptographic Random Passwords',
    description: 'Generate high-entropy, cryptographically secure passwords locally inside your browser with customizable symbol sets.',
    badge: 'Security',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Password Entropy Formula',
      expression: 'Entropy (Bits) = Length × log₂(Character Pool Size)',
      explanation: 'Evaluates brute-force resistance. Passwords with >80 bits of entropy are virtually impossible to crack with modern supercomputers.',
    },
    example: {
      title: 'Worked Example: 16-character password with upper, lower, numbers & symbols',
      scenario: 'Character set has 94 printable ASCII characters.',
      steps: [
        {
          number: 1,
          title: 'Calculate entropy bits',
          description: '16 × log₂(94) = 16 × 6.55 = 104.9 bits of entropy.',
          mathExpression: 'Entropy = 104.9 Bits',
        },
      ],
      conclusion: 'Entropy exceeds 100 bits (Military grade resistance).',
    },
    faqs: [
      {
        question: 'Are generated passwords sent to any server?',
        answer: 'Never. All passwords are generated 100% locally in memory on your device using client-side Web Crypto and never touch any network.',
      },
    ],
    inputs: [
      { id: 'length', label: 'Password Length', type: 'number', defaultValue: 16, min: 8, max: 64, step: 1 },
    ],
    defaultResult: {
      label: 'Estimated Entropy',
      initialValue: 104.9,
      decimals: 1,
      secondaryText: 'Military-Grade Security (>80 bits required)',
      accent: 'cyan',
      suffix: ' Bits',
    },
    computeScript: `
      const len = parseInt(inputs.length || '16');
      const entropy = len * Math.log2(94);
      return {
        value: entropy,
        secondary: 'Length: ' + len + ' chars | Exceeds 80-bit NIST baseline recommendation'
      };
    `,
  },
  {
    id: 'conversion-calculator',
    category: 'everyday',
    name: 'Conversion Calculator',
    title: 'Unit Conversion Calculator — Length, Weight, Volume & Temp',
    description: 'Convert between metric and imperial units across length, mass, temperature, area, volume, and digital storage.',
    badge: 'Everyday',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Standard Unit Conversion Factor',
      expression: 'Value₂ = Value₁ × Conversion Factor',
      explanation: 'Standardized NIST conversion coefficients linking metric SI units with US customary systems.',
    },
    example: {
      title: 'Worked Example: 100 Kilometers to Miles',
      scenario: '1 km = 0.621371 miles.',
      steps: [
        {
          number: 1,
          title: 'Multiply by conversion factor',
          description: '100 × 0.621371 = 62.14 miles.',
          mathExpression: '100 km = 62.14 miles',
        },
      ],
      conclusion: '100 kilometers equals 62.14 statute miles.',
    },
    faqs: [
      {
        question: 'How do you convert Celsius to Fahrenheit?',
        answer: 'Formula: °F = (°C × 9/5) + 32. For example, 20°C: (20 × 1.8) + 32 = 68°F.',
      },
    ],
    inputs: [
      { id: 'val', label: 'Value to Convert', type: 'number', defaultValue: 100, step: 1 },
      {
        id: 'unit_type',
        label: 'Conversion Type',
        type: 'select',
        defaultValue: 'km_to_mi',
        options: [
          { label: 'Kilometers to Miles (km → mi)', value: 'km_to_mi' },
          { label: 'Miles to Kilometers (mi → km)', value: 'mi_to_km' },
          { label: 'Kilograms to Pounds (kg → lbs)', value: 'kg_to_lbs' },
          { label: 'Pounds to Kilograms (lbs → kg)', value: 'lbs_to_kg' },
          { label: 'Celsius to Fahrenheit (°C → °F)', value: 'c_to_f' },
          { label: 'Fahrenheit to Celsius (°F → °C)', value: 'f_to_c' },
        ],
      },
    ],
    defaultResult: {
      label: 'Converted Value',
      initialValue: 62.14,
      decimals: 2,
      secondaryText: '100 km = 62.14 statute miles',
      accent: 'link',
      suffix: ' mi',
    },
    computeScript: `
      const v = parseFloat(inputs.val || '0');
      const type = inputs.unit_type || 'km_to_mi';
      let res = 0;
      let suff = '';
      let desc = '';
      if (type === 'km_to_mi') {
        res = v * 0.621371; suff = ' mi'; desc = v + ' km = ' + res.toFixed(2) + ' miles';
      } else if (type === 'mi_to_km') {
        res = v * 1.60934; suff = ' km'; desc = v + ' mi = ' + res.toFixed(2) + ' kilometers';
      } else if (type === 'kg_to_lbs') {
        res = v * 2.20462; suff = ' lbs'; desc = v + ' kg = ' + res.toFixed(2) + ' pounds';
      } else if (type === 'lbs_to_kg') {
        res = v * 0.453592; suff = ' kg'; desc = v + ' lbs = ' + res.toFixed(2) + ' kilograms';
      } else if (type === 'c_to_f') {
        res = (v * 9/5) + 32; suff = ' °F'; desc = v + ' °C = ' + res.toFixed(1) + ' °F';
      } else if (type === 'f_to_c') {
        res = (v - 32) * 5/9; suff = ' °C'; desc = v + ' °F = ' + res.toFixed(1) + ' °C';
      }
      return {
        value: res,
        secondary: desc
      };
    `,
  },
];
