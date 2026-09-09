// src/data/extended/legal.ts
import type { CalculatorEntry } from '../calculatorRegistry';

export const legalCalculators: CalculatorEntry[] = [
  {
    id: 'child-support-calculator',
    category: 'legal',
    name: 'Child Support Calculator',
    title: 'Free Child Support Calculator — Income Shares Model Guidelines',
    description: 'Estimate statutory monthly child support obligations using standard Income Shares Model rules based on parental incomes and child count.',
    badge: 'Guideline Standard',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Income Shares Support Model',
      expression: 'Obligation = Basic Combined Support × (Parent Income ÷ Combined Parental Income)',
      explanation: 'Apportions the statutory basic support schedule according to each parent’s pro-rata share of combined net disposable income.',
      variables: [
        { symbol: 'Basic Support', meaning: 'Statutory standard of living allowance for children' },
      ],
    },
    example: {
      title: 'Worked Example: 2 Children, 60/40 Income Split',
      scenario: 'Parent A earns $6,000/mo net, Parent B earns $4,000/mo net ($10,000 combined), supporting 2 children.',
      steps: [
        {
          number: 1,
          title: 'Calculate Pro-Rata Share',
          description: 'Parent A share = $6,000 ÷ $10,000 = 60%.',
          mathExpression: '60%',
        },
        {
          number: 2,
          title: 'Calculate Estimated Payment',
          description: 'Base support of $1,800 × 60% = $1,080/month.',
          mathExpression: '$1,080',
        },
      ],
      conclusion: 'Estimated monthly child support obligation is $1,080.',
    },
    faqs: [
      {
        question: 'Does parenting time (overnights) affect support?',
        answer: 'Yes, in most jurisdictions, exceeding 35% to 40% of annual overnights qualifies for substantial shared-custody support adjustments.',
      },
    ],
    inputs: [
      { id: 'paying_parent_income', label: 'Obligor (Paying) Net Monthly Income', type: 'number', defaultValue: 6000, min: 0, max: 200000, unit: '$' },
      { id: 'receiving_parent_income', label: 'Obligee (Receiving) Net Monthly Income', type: 'number', defaultValue: 4000, min: 0, max: 200000, unit: '$' },
      { id: 'children_count', label: 'Number of Children', type: 'select', defaultValue: '2', options: [
        { label: '1 Child', value: '1' },
        { label: '2 Children', value: '2' },
        { label: '3 Children', value: '3' },
        { label: '4+ Children', value: '4' },
      ]},
    ],
    defaultResult: {
      label: 'Estimated Monthly Support',
      initialValue: 1080,
      decimals: 2,
      secondaryText: 'Paying parent pro-rata responsibility: 60.0%',
      prefix: '$',
      accent: 'violet',
    },
    computeScript: `
      const inc1 = Math.max(0, Number(inputs.paying_parent_income) || 6000);
      const inc2 = Math.max(0, Number(inputs.receiving_parent_income) || 4000);
      const kids = Number(inputs.children_count) || 2;
      const combined = inc1 + inc2;
      const share = combined > 0 ? (inc1 / combined) : 0.5;
      const basePct = kids === 1 ? 0.17 : (kids === 2 ? 0.25 : (kids === 3 ? 0.29 : 0.32));
      const totalSupport = combined * basePct;
      const payment = totalSupport * share;
      return {
        value: payment,
        secondaryText: 'Pro-Rata Share: ' + (share * 100).toFixed(1) + '% | Combined Support Need: $' + Math.round(totalSupport).toLocaleString(),
        badge: 'Guideline Baseline'
      };
    `,
  },
  {
    id: 'alimony-calculator',
    category: 'legal',
    name: 'Alimony Estimator',
    title: 'Free Alimony Calculator — Spousal Support & Duration Estimator',
    description: 'Estimate potential spousal maintenance and duration based on income differential formulas used across family court jurisdictions.',
    badge: 'Court Formulas',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'AAML Spousal Support Guideline Formula',
      expression: 'Support = (Higher Earner Net × 30%) - (Lower Earner Net × 20%)',
      explanation: 'Standard benchmark formulated by the American Academy of Matrimonial Lawyers, subject to combined net income caps.',
      variables: [
        { symbol: 'Support Duration', meaning: 'Typically 30% to 50% of total marriage length for marriages under 20 years' },
      ],
    },
    example: {
      title: 'Worked Example: 10-Year Marriage',
      scenario: 'Higher earner earns $10,000/mo net, lower earner earns $3,000/mo net over a 10-year marriage.',
      steps: [
        {
          number: 1,
          title: 'Calculate Standard Support',
          description: '($10,000 × 0.30) - ($3,000 × 0.20) = $3,000 - $600 = $2,400/month.',
          mathExpression: '$2,400',
        },
      ],
      conclusion: 'Estimated spousal support is $2,400 per month for approximately 5 years.',
    },
    faqs: [
      {
        question: 'When does alimony terminate?',
        answer: 'Alimony traditionally ends upon the recipient’s remarriage, cohabitation in a marriage-like relationship, death, or completion of the specified duration.',
      },
    ],
    inputs: [
      { id: 'higher_earner', label: 'Higher Earner Monthly Net Income', type: 'number', defaultValue: 10000, min: 0, max: 500000, unit: '$' },
      { id: 'lower_earner', label: 'Lower Earner Monthly Net Income', type: 'number', defaultValue: 3000, min: 0, max: 500000, unit: '$' },
      { id: 'marriage_years', label: 'Marriage Duration (Years)', type: 'number', defaultValue: 10, min: 1, max: 60, unit: 'yrs' },
    ],
    defaultResult: {
      label: 'Estimated Spousal Support',
      initialValue: 2400,
      decimals: 2,
      secondaryText: 'Estimated Duration: 5.0 years (50% of marriage)',
      prefix: '$',
      accent: 'cyan',
    },
    computeScript: `
      const h = Math.max(0, Number(inputs.higher_earner) || 10000);
      const l = Math.max(0, Number(inputs.lower_earner) || 3000);
      const yrs = Math.max(1, Number(inputs.marriage_years) || 10);
      let pmt = Math.max(0, (h * 0.30) - (l * 0.20));
      const maxRecipient = (h + l) * 0.40;
      if (l + pmt > maxRecipient) {
        pmt = Math.max(0, maxRecipient - l);
      }
      const dur = yrs >= 20 ? 'Permanent / Indefinite' : (yrs * 0.5).toFixed(1) + ' years';
      return {
        value: pmt,
        secondaryText: 'Estimated Duration: ' + dur + ' | Monthly Differential: $' + (h - l).toLocaleString(),
        badge: 'Guideline Estimate'
      };
    `,
  },
  {
    id: 'settlement-value-calculator',
    category: 'legal',
    name: 'Settlement Value Estimator',
    title: 'Free Personal Injury Settlement Calculator — Multiplier Method',
    description: 'Calculate fair personal injury settlement claim values using medical bills, lost wages, and pain & suffering multipliers.',
    badge: 'Tort Standard',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Insurance Settlement Multiplier Formula',
      expression: 'Settlement = (Special Damages × Multiplier) + Lost Wages + Future Care',
      explanation: 'Insurance adjusters scale hard economic damages (medical treatments) by a pain & suffering multiplier from 1.5x (minor) to 5.0x (severe).',
      variables: [
        { symbol: 'Special Damages', meaning: 'Verifiable out-of-pocket medical bills and rehabilitation expenses' },
        { symbol: 'Multiplier', meaning: 'Injury severity rating (1.5 for soft tissue, up to 5+ for permanent impairment)' },
      ],
    },
    example: {
      title: 'Worked Example: Moderate Auto Accident',
      scenario: '$12,000 in medical bills, $4,000 in lost wages, with a 2.5x pain & suffering multiplier.',
      steps: [
        {
          number: 1,
          title: 'Calculate General Damages',
          description: '$12,000 × 2.5 = $30,000.',
          mathExpression: '$30,000',
        },
        {
          number: 2,
          title: 'Add Lost Wages',
          description: '$30,000 + $4,000 = $34,000.',
          mathExpression: '$34,000',
        },
      ],
      conclusion: 'Estimated settlement target range is $34,000.',
    },
    faqs: [
      {
        question: 'What factors determine the multiplier?',
        answer: 'Type of injury (broken bones vs soft tissue), length of treatment recovery, objective diagnostic scans, and permanent physical restrictions.',
      },
    ],
    inputs: [
      { id: 'medical_expenses', label: 'Total Medical Treatment Bills', type: 'number', defaultValue: 12000, min: 0, max: 5000000, unit: '$' },
      { id: 'lost_wages', label: 'Total Lost Wages', type: 'number', defaultValue: 4000, min: 0, max: 2000000, unit: '$' },
      { id: 'multiplier', label: 'Pain & Suffering Multiplier', type: 'select', defaultValue: '2.5', options: [
        { label: '1.5x — Minor Sprain / Brief Recovery', value: '1.5' },
        { label: '2.5x — Moderate / Physical Therapy', value: '2.5' },
        { label: '4.0x — Severe / Surgery Required', value: '4.0' },
        { label: '5.0x — Catastrophic / Permanent Injury', value: '5.0' },
      ]},
    ],
    defaultResult: {
      label: 'Estimated Claim Settlement',
      initialValue: 34000,
      decimals: 2,
      secondaryText: 'Economic: $16,000 | Non-Economic (Pain & Suffering): $30,000',
      prefix: '$',
      accent: 'link',
    },
    computeScript: `
      const med = Math.max(0, Number(inputs.medical_expenses) || 12000);
      const wages = Math.max(0, Number(inputs.lost_wages) || 4000);
      const mult = Number(inputs.multiplier) || 2.5;
      const nonEco = med * mult;
      const total = nonEco + wages;
      return {
        value: total,
        secondaryText: 'Medical + Wages: $' + (med + wages).toLocaleString() + ' | General Damages: $' + Math.round(nonEco).toLocaleString(),
        badge: 'Negotiation Target'
      };
    `,
  },
  {
    id: 'legal-fee-calculator',
    category: 'legal',
    name: 'Legal Fee Calculator',
    title: 'Free Legal Fee Calculator — Hourly vs Contingency Fee Estimator',
    description: 'Calculate expected attorney legal costs comparing hourly retainer billing rates with standard contingency percentage agreements.',
    badge: 'Transparent Fees',
    badgeColor: 'text-mute border-mute/30 bg-mute/10',
    formula: {
      name: 'Hourly & Contingency Fee Equations',
      expression: 'Hourly Total = Rate × Hours + Expenses ; Contingency Total = Gross Recovery × Percentage',
      explanation: 'Compares total client legal expenses between direct hourly retainers and percentage-of-recovery contingent legal representation.',
      variables: [
        { symbol: 'Contingency Fee', meaning: 'Typically 33.3% pre-trial or 40% if trial litigation is filed' },
      ],
    },
    example: {
      title: 'Worked Example: $100,000 Settlement at 33.3%',
      scenario: 'A personal injury settlement recovers $100,000 with a 33.3% contingency fee and $2,000 litigation expenses.',
      steps: [
        {
          number: 1,
          title: 'Calculate Contingency Fee',
          description: '$100,000 × 33.33% = $33,333.',
          mathExpression: '$33,333',
        },
        {
          number: 2,
          title: 'Net to Client',
          description: '$100,000 - $33,333 - $2,000 = $64,667.',
          mathExpression: '$64,667',
        },
      ],
      conclusion: 'Attorney receives $33,333 and the client nets $64,667.',
    },
    faqs: [
      {
        question: 'Who pays litigation filing expenses in contingency cases?',
        answer: 'Attorneys typically front litigation expenses (filing fees, expert depositions) and deduct them from the client’s net share upon recovery.',
      },
    ],
    inputs: [
      { id: 'recovery_amount', label: 'Expected Total Recovery / Settlement', type: 'number', defaultValue: 100000, min: 1000, max: 100000000, unit: '$' },
      { id: 'contingency_rate', label: 'Contingency Fee Percentage', type: 'number', defaultValue: 33.33, min: 1, max: 60, step: 0.01, unit: '%' },
      { id: 'litigation_costs', label: 'Estimated Case Costs & Expenses', type: 'number', defaultValue: 2000, min: 0, max: 1000000, unit: '$' },
    ],
    defaultResult: {
      label: 'Attorney Legal Fee',
      initialValue: 33330,
      decimals: 2,
      secondaryText: 'Net Payout to Client: $64,670.00',
      prefix: '$',
      accent: 'violet',
    },
    computeScript: `
      const recovery = Math.max(0, Number(inputs.recovery_amount) || 100000);
      const rate = Math.max(0, Number(inputs.contingency_rate) || 33.33);
      const costs = Math.max(0, Number(inputs.litigation_costs) || 2000);
      const fee = recovery * (rate / 100);
      const netClient = Math.max(0, recovery - fee - costs);
      return {
        value: fee,
        secondaryText: 'Net to Client: $' + Math.round(netClient).toLocaleString() + ' | Case Costs: $' + costs.toLocaleString(),
        badge: 'Fee Split'
      };
    `,
  },
];
