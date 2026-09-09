// src/data/extended/marketing.ts
import type { CalculatorEntry } from '../calculatorRegistry';

export const marketingCalculators: CalculatorEntry[] = [
  {
    id: 'conversion-rate-calculator',
    category: 'marketing',
    name: 'Conversion Rate Calculator',
    title: 'Free Conversion Rate Calculator — Funnel & Lead Optimization',
    description: 'Calculate e-commerce and lead generation conversion rate percentages from visitor traffic and successful transaction counts.',
    badge: 'Growth Metric',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Conversion Rate Percentage Formula',
      expression: 'Conversion Rate = (Total Conversions ÷ Total Visitors) × 100',
      explanation: 'Evaluates website funnel efficiency by measuring the percentage of site visitors who complete a desired goal action.',
      variables: [
        { symbol: 'Total Visitors', meaning: 'Unique visitor sessions landing on page' },
        { symbol: 'Total Conversions', meaning: 'Orders, signups, or form submissions completed' },
      ],
    },
    example: {
      title: 'Worked Example: 250 Conversions from 10,000 Visitors',
      scenario: 'An e-commerce store receives 10,000 monthly visitors and achieves 250 sales.',
      steps: [
        {
          number: 1,
          title: 'Calculate Conversion Rate',
          description: '(250 ÷ 10,000) × 100 = 2.50%.',
          mathExpression: '2.50%',
        },
      ],
      conclusion: 'The website achieves a 2.50% conversion rate.',
    },
    faqs: [
      {
        question: 'What is an average e-commerce conversion rate?',
        answer: 'Across major retail and direct-to-consumer sectors, standard benchmark conversion rates range between 1.5% and 3.5%.',
      },
    ],
    inputs: [
      { id: 'total_visitors', label: 'Total Visitors / Sessions', type: 'number', defaultValue: 10000, min: 1, max: 100000000, unit: '' },
      { id: 'total_conversions', label: 'Total Conversions / Orders', type: 'number', defaultValue: 250, min: 0, max: 100000000, unit: '' },
    ],
    defaultResult: {
      label: 'Conversion Rate',
      initialValue: 2.50,
      decimals: 2,
      secondaryText: '1 conversion every 40 visitors',
      suffix: '%',
      accent: 'cyan',
    },
    computeScript: `
      const visitors = Math.max(1, Number(inputs.total_visitors) || 10000);
      const conv = Math.max(0, Number(inputs.total_conversions) || 250);
      const rate = (conv / visitors) * 100;
      const ratio = conv > 0 ? Math.round(visitors / conv) : 0;
      return {
        value: rate,
        secondaryText: conv > 0 ? '1 order every ' + ratio + ' visitors' : '0 conversions recorded',
        badge: rate >= 3 ? 'Top Tier' : 'Standard Funnel'
      };
    `,
  },
  {
    id: 'cac-calculator',
    category: 'marketing',
    name: 'Customer Acquisition Cost',
    title: 'Free CAC Calculator — Customer Acquisition Cost & Blended Unit Economics',
    description: 'Calculate customer acquisition cost (CAC) by combining paid media ad spend, marketing salaries, and agency software overhead.',
    badge: 'Unit Economics',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Customer Acquisition Cost Formula',
      expression: 'CAC = (Total Marketing & Sales Expenses) ÷ New Customers Acquired',
      explanation: 'Calculates the comprehensive blended expense required to secure one incremental paying customer.',
      variables: [
        { symbol: 'Total Expenses', meaning: 'Ad spend + agency retainers + sales commissions + marketing software' },
      ],
    },
    example: {
      title: 'Worked Example: $15,000 Spend, 200 Customers',
      scenario: 'Paid media ad spend of $12,000 plus $3,000 marketing software/tools yielding 200 new paying customers.',
      steps: [
        {
          number: 1,
          title: 'Calculate Total Expenditure',
          description: '$12,000 + $3,000 = $15,000 total spend.',
          mathExpression: '$15,000',
        },
        {
          number: 2,
          title: 'Divide by Acquired Customers',
          description: '$15,000 ÷ 200 = $75.00 per customer.',
          mathExpression: '$75.00',
        },
      ],
      conclusion: 'Blended Customer Acquisition Cost is $75.00.',
    },
    faqs: [
      {
        question: 'What is the optimal LTV to CAC ratio?',
        answer: 'Healthy venture-backed and bootstrapped companies target a Customer Lifetime Value (LTV) to CAC ratio of at least 3:1 (e.g. $300 LTV for a $100 CAC).',
      },
    ],
    inputs: [
      { id: 'ad_spend', label: 'Paid Advertising Spend', type: 'number', defaultValue: 12000, min: 0, max: 100000000, unit: '$' },
      { id: 'other_sales_cost', label: 'Sales Salaries & Software Overhead', type: 'number', defaultValue: 3000, min: 0, max: 100000000, unit: '$' },
      { id: 'customers_acquired', label: 'New Customers Acquired', type: 'number', defaultValue: 200, min: 1, max: 10000000, unit: '' },
    ],
    defaultResult: {
      label: 'Customer Acquisition Cost (CAC)',
      initialValue: 75.00,
      decimals: 2,
      secondaryText: 'Total Spend: $15,000 across 200 customers',
      prefix: '$',
      accent: 'link',
    },
    computeScript: `
      const ads = Math.max(0, Number(inputs.ad_spend) || 12000);
      const other = Math.max(0, Number(inputs.other_sales_cost) || 3000);
      const cust = Math.max(1, Number(inputs.customers_acquired) || 200);
      const total = ads + other;
      const cac = total / cust;
      return {
        value: cac,
        secondaryText: 'Total Acquisition Spend: $' + total.toLocaleString() + ' | ' + cust.toLocaleString() + ' customers',
        badge: 'Blended CAC'
      };
    `,
  },
  {
    id: 'roas-calculator',
    category: 'marketing',
    name: 'ROAS Calculator',
    title: 'Free ROAS Calculator — Return on Ad Spend & Advertising Efficiency',
    description: 'Calculate Return on Ad Spend (ROAS) as a percentage or multiple ratio to evaluate marketing campaign profitability.',
    badge: 'Ad Performance',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Return on Ad Spend (ROAS) Formula',
      expression: 'ROAS Multiple = Total Ad Revenue ÷ Total Ad Spend ; ROAS % = Multiple × 100',
      explanation: 'Evaluates immediate gross revenue yielded per single unit of currency spent on digital advertising channels.',
      variables: [
        { symbol: 'Revenue', meaning: 'Gross attributable sales generated by ad campaign' },
      ],
    },
    example: {
      title: 'Worked Example: $5,000 Spend, $20,000 Revenue',
      scenario: 'A Meta/Google ad campaign spends $5,000 and generates $20,000 in tracked gross store sales.',
      steps: [
        {
          number: 1,
          title: 'Calculate ROAS Multiple',
          description: '$20,000 ÷ $5,000 = 4.00x.',
          mathExpression: '4.00x',
        },
      ],
      conclusion: 'The campaign achieves a 4.00x ROAS (400% return).',
    },
    faqs: [
      {
        question: 'What is a break-even ROAS?',
        answer: 'Break-even ROAS equals 1 ÷ Gross Margin. For example, if your product gross margin is 50%, your break-even ROAS is 1 ÷ 0.50 = 2.0x (200%).',
      },
    ],
    inputs: [
      { id: 'ad_revenue', label: 'Gross Revenue Generated', type: 'number', defaultValue: 20000, min: 0, max: 1000000000, unit: '$' },
      { id: 'ad_spend', label: 'Total Advertising Spend', type: 'number', defaultValue: 5000, min: 1, max: 1000000000, unit: '$' },
    ],
    defaultResult: {
      label: 'ROAS Multiple',
      initialValue: 4.00,
      decimals: 2,
      secondaryText: 'Equivalent: 400.00% ROAS | Net Ad Profit: $15,000',
      suffix: 'x',
      accent: 'violet',
    },
    computeScript: `
      const rev = Math.max(0, Number(inputs.ad_revenue) || 20000);
      const spend = Math.max(1, Number(inputs.ad_spend) || 5000);
      const roas = rev / spend;
      const profit = rev - spend;
      return {
        value: roas,
        secondaryText: (roas * 100).toFixed(0) + '% return | Net Campaign Profit: $' + Math.round(profit).toLocaleString(),
        badge: roas >= 3 ? 'High Profit' : 'Standard'
      };
    `,
  },
  {
    id: 'email-roi-calculator',
    category: 'marketing',
    name: 'Email ROI Calculator',
    title: 'Free Email Marketing ROI Calculator — Campaign Yield & Net Returns',
    description: 'Calculate Return on Investment (ROI) and net profit generated by email marketing newsletters and automation flows.',
    badge: 'Retention Math',
    badgeColor: 'text-magenta border-magenta/30 bg-magenta/10',
    formula: {
      name: 'Email Marketing ROI Formula',
      expression: 'Email ROI % = [(Campaign Revenue - Campaign Costs) ÷ Campaign Costs] × 100',
      explanation: 'Measures net earnings generated per dollar invested in email copy, software (Klaviyo/Mailchimp), and designer costs.',
      variables: [
        { symbol: 'Costs', meaning: 'ESP monthly subscription fees + copy & design costs' },
      ],
    },
    example: {
      title: 'Worked Example: $800 Campaign Cost, $12,000 Revenue',
      scenario: 'An email blast costs $800 in software and copywriting, producing $12,000 in direct attributed purchases.',
      steps: [
        {
          number: 1,
          title: 'Calculate Net Profit',
          description: '$12,000 - $800 = $11,200.',
          mathExpression: '$11,200',
        },
        {
          number: 2,
          title: 'Calculate Percentage ROI',
          description: '($11,200 ÷ $800) × 100 = 1,400%.',
          mathExpression: '1,400%',
        },
      ],
      conclusion: 'The email campaign yields an exceptional 1,400% ROI.',
    },
    faqs: [
      {
        question: 'Why does email marketing typically have high ROI?',
        answer: 'Unlike paid media where you pay per click or impression, email communicates with an owned subscriber audience that has already opted in and expressed high purchase intent.',
      },
    ],
    inputs: [
      { id: 'email_revenue', label: 'Attributed Email Sales Revenue', type: 'number', defaultValue: 12000, min: 0, max: 100000000, unit: '$' },
      { id: 'email_costs', label: 'Total Email Campaign Costs', type: 'number', defaultValue: 800, min: 1, max: 10000000, unit: '$' },
    ],
    defaultResult: {
      label: 'Email Marketing ROI',
      initialValue: 1400,
      decimals: 0,
      secondaryText: 'Net Revenue: $11,200 ($15.00 generated per $1.00 spent)',
      suffix: '%',
      accent: 'magenta',
    },
    computeScript: `
      const rev = Math.max(0, Number(inputs.email_revenue) || 12000);
      const cost = Math.max(1, Number(inputs.email_costs) || 800);
      const net = rev - cost;
      const roi = (net / cost) * 100;
      const perDollar = (rev / cost).toFixed(2);
      return {
        value: roi,
        secondaryText: 'Net Profit: $' + Math.round(net).toLocaleString() + ' ($' + perDollar + ' per $1 spent)',
        badge: 'High ROI Channel'
      };
    `,
  },
];
