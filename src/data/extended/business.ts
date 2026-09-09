// src/data/extended/business.ts
import type { CalculatorEntry } from '../calculatorRegistry';

export const businessCalculators: CalculatorEntry[] = [
  {
    id: 'break-even-calculator',
    category: 'business',
    name: 'Break-Even Analysis',
    title: 'Free Break-Even Calculator — Units, Revenue & Contribution Margin',
    description: 'Calculate exact unit volume and dollar revenue required to cover fixed overhead costs with contribution margin analysis.',
    badge: 'Managerial Math',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Break-Even Volume & Revenue Equations',
      expression: 'Break-Even Units = Fixed Costs ÷ (Price - Variable Cost) ; Break-Even Revenue = Units × Price',
      explanation: 'Calculates the operating volume threshold where gross operating profits exactly match fixed structural overhead.',
      variables: [
        { symbol: 'Price - Variable Cost', meaning: 'Unit Contribution Margin ($)' },
      ],
    },
    example: {
      title: 'Worked Example: $20,000 Monthly Fixed Overhead',
      scenario: 'Fixed costs of $20,000/mo, unit selling price of $80, and variable material/labor cost of $30 per unit.',
      steps: [
        {
          number: 1,
          title: 'Calculate Contribution Margin',
          description: '$80 - $30 = $50 per unit (62.5% margin).',
          mathExpression: '$50',
        },
        {
          number: 2,
          title: 'Calculate Break-Even Units',
          description: '$20,000 ÷ $50 = 400 units.',
          mathExpression: '400 units',
        },
      ],
      conclusion: 'You must sell 400 units ($32,000 in revenue) to achieve net zero operating loss.',
    },
    faqs: [
      {
        question: 'What happens if variable costs increase?',
        answer: 'Rising variable costs compress your contribution margin, requiring significantly more units to cover the same fixed overhead.',
      },
    ],
    inputs: [
      { id: 'fixed_costs', label: 'Total Fixed Costs (Rent, Salaries, SaaS)', type: 'number', defaultValue: 20000, min: 0, max: 100000000, unit: '$' },
      { id: 'unit_price', label: 'Selling Price Per Unit', type: 'number', defaultValue: 80, min: 0.01, max: 1000000, unit: '$' },
      { id: 'variable_cost', label: 'Variable Cost Per Unit (Materials, Labor)', type: 'number', defaultValue: 30, min: 0, max: 1000000, unit: '$' },
    ],
    defaultResult: {
      label: 'Break-Even Sales Volume',
      initialValue: 400,
      decimals: 0,
      secondaryText: 'Break-Even Revenue: $32,000 | Contribution Margin: $50.00/unit (62.5%)',
      suffix: ' units',
      accent: 'cyan',
    },
    computeScript: `
      const fixed = Math.max(0, Number(inputs.fixed_costs) || 20000);
      const price = Math.max(0.01, Number(inputs.unit_price) || 80);
      const variable = Math.max(0, Number(inputs.variable_cost) || 30);
      const cm = Math.max(0.01, price - variable);
      const units = Math.ceil(fixed / cm);
      const revenue = units * price;
      const cmRatio = (cm / price) * 100;
      return {
        value: units,
        secondaryText: 'Break-Even Revenue: $' + Math.round(revenue).toLocaleString() + ' | CM: $' + cm.toFixed(2) + ' (' + cmRatio.toFixed(1) + '%)',
        badge: 'Operating Threshold'
      };
    `,
  },
  {
    id: 'roi-calculator',
    category: 'business',
    name: 'ROI Calculator',
    title: 'Free ROI Calculator — Return on Investment & Annualized CAGR',
    description: 'Calculate percentage Return on Investment (ROI) and annualized investment yields across business initiatives and capital expenditures.',
    badge: 'Capital Allocation',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Return on Investment Formula',
      expression: 'ROI = [(Net Profit) ÷ Initial Cost] × 100 ; Annualized ROI = [(1 + ROI/100)^(1/Years) - 1] × 100',
      explanation: 'Evaluates the monetary efficiency and percentage return generated per dollar of invested capital.',
      variables: [
        { symbol: 'Net Profit', meaning: 'Gross Return Value - Initial Cost Invested' },
      ],
    },
    example: {
      title: 'Worked Example: $50,000 Marketing Tech Investment',
      scenario: 'You invest $50,000 in software, yielding $85,000 in gross revenue over 2 years.',
      steps: [
        {
          number: 1,
          title: 'Calculate Net Profit',
          description: '$85,000 - $50,000 = $35,000.',
          mathExpression: '$35,000',
        },
        {
          number: 2,
          title: 'Calculate Percentage ROI',
          description: '($35,000 ÷ $50,000) × 100 = 70.00%.',
          mathExpression: '70.00%',
        },
      ],
      conclusion: 'The initiative delivers a 70.00% total ROI, or 30.38% annualized CAGR.',
    },
    faqs: [
      {
        question: 'What is a good ROI for business investments?',
        answer: 'Generally, investments exceeding your cost of capital (WACC) or broader stock index historical returns (8%-10% annualized) are considered positive.',
      },
    ],
    inputs: [
      { id: 'amount_invested', label: 'Total Amount Invested', type: 'number', defaultValue: 50000, min: 1, max: 1000000000, unit: '$' },
      { id: 'amount_returned', label: 'Total Returned / Realized', type: 'number', defaultValue: 85000, min: 0, max: 1000000000, unit: '$' },
      { id: 'investment_period', label: 'Holding Period (Years)', type: 'number', defaultValue: 2, min: 0.1, max: 50, step: 0.1, unit: 'yrs' },
    ],
    defaultResult: {
      label: 'Total Return on Investment',
      initialValue: 70.00,
      decimals: 2,
      secondaryText: 'Net Profit: $35,000 | Annualized ROI (CAGR): 30.38%',
      suffix: '%',
      accent: 'link',
    },
    computeScript: `
      const invested = Math.max(1, Number(inputs.amount_invested) || 50000);
      const returned = Math.max(0, Number(inputs.amount_returned) || 85000);
      const yrs = Math.max(0.1, Number(inputs.investment_period) || 2);
      const net = returned - invested;
      const roi = (net / invested) * 100;
      const cagr = ((Math.pow(returned / invested, 1 / yrs)) - 1) * 100;
      return {
        value: roi,
        secondaryText: 'Net Gain: $' + Math.round(net).toLocaleString() + ' | Annualized CAGR: ' + cagr.toFixed(2) + '%',
        badge: roi > 0 ? 'Profitable' : 'Loss'
      };
    `,
  },
  {
    id: 'business-valuation-calculator',
    category: 'business',
    name: 'Business Valuation Tool',
    title: 'Free Business Valuation Calculator — SDE & EBITDA Multiple Model',
    description: 'Estimate small business enterprise valuation using Seller’s Discretionary Earnings (SDE) or EBITDA industry multiples.',
    badge: 'M&A Valuation',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Earnings Multiple Valuation Formula',
      expression: 'Enterprise Value = (Annual SDE or EBITDA × Multiple) + Cash & Inventory - Long-Term Liabilities',
      explanation: 'Standard private market valuation model based on cash flow capitalization multiples.',
      variables: [
        { symbol: 'SDE', meaning: 'Seller’s Discretionary Earnings: Net profit + Owner Salary + Depreciation + Discretionary add-backs' },
      ],
    },
    example: {
      title: 'Worked Example: $250,000 SDE Service Business',
      scenario: 'A company produces $250,000 annual SDE with a 3.0x industry multiple, $30,000 inventory, and $20,000 debt.',
      steps: [
        {
          number: 1,
          title: 'Calculate Core Operations',
          description: '$250,000 × 3.0 = $750,000.',
          mathExpression: '$750,000',
        },
        {
          number: 2,
          title: 'Adjust Balance Sheet',
          description: '$750,000 + $30,000 - $20,000 = $760,000.',
          mathExpression: '$760,000',
        },
      ],
      conclusion: 'Estimated fair enterprise value is $760,000.',
    },
    faqs: [
      {
        question: 'What is a typical SDE multiple for main street businesses?',
        answer: 'Small businesses earning under $1 million SDE typically sell for between 2.0x and 4.0x SDE, depending on growth, customer concentration, and recurring contracts.',
      },
    ],
    inputs: [
      { id: 'annual_earnings', label: 'Annual SDE or EBITDA', type: 'number', defaultValue: 250000, min: 1000, max: 100000000, unit: '$' },
      { id: 'industry_multiple', label: 'Valuation Multiple', type: 'number', defaultValue: 3.0, min: 0.5, max: 25, step: 0.1, unit: 'x' },
      { id: 'net_balance_assets', label: 'Net Liquid Assets & Inventory Less Debt', type: 'number', defaultValue: 10000, min: -10000000, max: 50000000, unit: '$' },
    ],
    defaultResult: {
      label: 'Estimated Enterprise Valuation',
      initialValue: 760000,
      decimals: 0,
      secondaryText: 'Valuation multiple: 3.0x SDE',
      prefix: '$',
      accent: 'violet',
    },
    computeScript: `
      const earnings = Math.max(0, Number(inputs.annual_earnings) || 250000);
      const mult = Math.max(0.1, Number(inputs.industry_multiple) || 3.0);
      const assets = Number(inputs.net_balance_assets) || 10000;
      const val = Math.max(0, (earnings * mult) + assets);
      return {
        value: val,
        secondaryText: 'Core Multiple Value: $' + Math.round(earnings * mult).toLocaleString() + ' | Multiple: ' + mult.toFixed(1) + 'x',
        badge: 'Estimated Fair Value'
      };
    `,
  },
];
