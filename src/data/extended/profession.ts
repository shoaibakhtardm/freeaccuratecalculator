// src/data/extended/profession.ts
import type { CalculatorEntry } from '../calculatorRegistry.ts';

export const professionCalculators: CalculatorEntry[] = [
  // 1. DOCTOR
  {
    id: 'doctor-pediatric-dosage-calculator',
    category: 'profession',
    name: 'Doctor Pediatric Dosage Calculator',
    title: 'Free Doctor Pediatric Dosage Calculator — Clark\'s Rule & Weight Dosing',
    description: 'Calculate accurate pediatric medication dosages based on child weight, adult standard dose, or mg/kg protocols.',
    badge: 'Clinical Grade',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: "Clark's Pediatric Dosing Formula",
      expression: 'Pediatric Dose = (Child Weight in kg ÷ 70 kg) × Adult Standard Dose',
      explanation: "Clark's rule is a standardized clinical method used by physicians and pediatricians to calculate safe medication doses for children based on relative weight against a standard 70 kg adult baseline.",
      variables: [
        { symbol: 'Child Weight', meaning: 'Body weight of the pediatric patient in kilograms (kg)' },
        { symbol: 'Adult Standard Dose', meaning: 'Manufacturer approved typical adult single dose in mg' },
      ],
    },
    example: {
      title: 'Worked Example: 14 kg Child on Standard 500 mg Amoxicillin',
      scenario: 'A pediatrician needs to prescribe an appropriate single dose for a 14 kg toddler where the standard adult single dose is 500 mg.',
      steps: [
        {
          number: 1,
          title: 'Determine Weight Ratio',
          description: '14 kg ÷ 70 kg = 0.20 (20% of adult dose baseline).',
          mathExpression: 'Ratio = 0.20',
        },
        {
          number: 2,
          title: 'Compute Pediatric Single Dose',
          description: '0.20 × 500 mg = 100 mg per dose.',
          mathExpression: 'Dose = 100 mg',
        },
      ],
      conclusion: 'The recommended single pediatric dose is 100.0 mg (approx 300.0 mg daily if prescribed TID).',
    },
    faqs: [
      {
        question: "When should Clark's rule be used versus mg/kg body weight dosing?",
        answer: "Clark's rule is a fast clinical cross-reference rule. For high-acuity drugs, oncologic agents, and narrow therapeutic index medications, exact mg/kg or body surface area (BSA in m²) protocols should always supersede Clark's rule.",
      },
      {
        question: 'Does this apply to neonates and premature infants?',
        answer: 'No. Neonatal pharmacokinetics differ substantially due to immature hepatic metabolism and renal clearance; consult specific neonatal drug formularies.',
      },
    ],
    inputs: [
      { id: 'child_weight', label: 'Child Weight (kg)', type: 'number', defaultValue: 14, min: 2, max: 100, step: 0.5, unit: 'kg', helpText: 'Weight in kilograms' },
      { id: 'adult_dose', label: 'Standard Adult Dose (mg)', type: 'number', defaultValue: 500, min: 5, max: 5000, step: 25, unit: 'mg', helpText: 'Standard single dose in milligrams' },
    ],
    defaultResult: {
      label: 'Recommended Pediatric Dose',
      initialValue: 100.0,
      decimals: 1,
      suffix: ' mg',
      secondaryText: 'Estimated Daily Total (TID 3x/day): 300.0 mg | Weight Fraction: 20.0%',
      accent: 'cyan',
    },
    computeScript: `
      const weight = Math.max(1, Number(inputs.child_weight) || 14);
      const adult = Math.max(1, Number(inputs.adult_dose) || 500);
      const ratio = weight / 70;
      const singleDose = Math.round(ratio * adult * 10) / 10;
      const daily = Math.round(singleDose * 3 * 10) / 10;
      return {
        value: singleDose,
        secondaryText: 'Estimated Daily Total (TID 3x/day): ' + daily.toFixed(1) + ' mg | Weight Fraction: ' + (ratio * 100).toFixed(1) + '%'
      };
    `,
  },

  // 2. NURSE
  {
    id: 'nurse-iv-drip-calculator',
    category: 'profession',
    name: 'Nurse IV Drip Rate Calculator',
    title: 'Free Nurse IV Drip Rate Calculator — Drops Per Minute (gtt/min)',
    description: 'Calculate intravenous infusion drop rate in gtt/min and hourly infusion rate in mL/hr for accurate bedside fluid delivery.',
    badge: 'Nursing Protocol',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Intravenous Gravity Drip Rate Formula',
      expression: 'Drip Rate (gtt/min) = (Total Volume in mL × Drop Factor in gtt/mL) ÷ Infusion Time in Minutes',
      explanation: 'Determines the drops per minute required to infuse a prescribed IV bag over a specified number of hours using standard tubing calibration.',
      variables: [
        { symbol: 'Total Volume', meaning: 'Total volume of IV solution in milliliters (mL)' },
        { symbol: 'Drop Factor', meaning: 'Tubing calibration rating (e.g. 20 gtt/mL standard, 60 gtt/mL microdrip)' },
        { symbol: 'Time', meaning: 'Duration of infusion in hours converted to minutes (hours × 60)' },
      ],
    },
    example: {
      title: 'Worked Example: 1,000 mL Normal Saline over 8 Hours',
      scenario: 'A nurse administers 1,000 mL 0.9% NS over 8 hours using standard 20 gtt/mL macrodrip tubing.',
      steps: [
        {
          number: 1,
          title: 'Convert Time to Minutes',
          description: '8 hours × 60 minutes = 480 minutes.',
          mathExpression: 'Time = 480 min',
        },
        {
          number: 2,
          title: 'Calculate Drops per Minute',
          description: '(1,000 mL × 20 gtt/mL) ÷ 480 min = 20,000 ÷ 480 = 41.67 gtt/min.',
          mathExpression: 'Rate = 42 gtt/min',
        },
      ],
      conclusion: 'The IV clamp should be calibrated to deliver 42 drops per minute (125.0 mL/hr).',
    },
    faqs: [
      {
        question: 'What is the difference between macrodrip and microdrip tubing?',
        answer: 'Macrodrip delivers 10, 15, or 20 drops per mL (used for adults requiring routine hydration). Microdrip delivers 60 drops per mL (used for pediatrics, ICU, and medications requiring slow precision).',
      },
    ],
    inputs: [
      { id: 'iv_volume', label: 'Infusion Volume (mL)', type: 'number', defaultValue: 1000, min: 50, max: 5000, step: 50, unit: 'mL', helpText: 'Bag volume in milliliters' },
      { id: 'iv_hours', label: 'Infusion Duration (hours)', type: 'number', defaultValue: 8, min: 0.5, max: 48, step: 0.5, unit: 'hrs', helpText: 'Prescribed delivery window' },
      { id: 'drop_factor', label: 'Tubing Drip Factor', type: 'select', defaultValue: '20', options: [
        { label: 'Macrodrip Standard (20 gtt/mL)', value: '20' },
        { label: 'Macrodrip Baxter (10 gtt/mL)', value: '10' },
        { label: 'Macrodrip Abbott (15 gtt/mL)', value: '15' },
        { label: 'Microdrip Pediatric (60 gtt/mL)', value: '60' },
      ]},
    ],
    defaultResult: {
      label: 'Infusion Drip Rate',
      initialValue: 42,
      decimals: 0,
      suffix: ' gtt/min',
      secondaryText: 'Hourly Flow Rate: 125.0 mL/hr | Total Duration: 480 minutes',
      accent: 'violet',
    },
    computeScript: `
      const vol = Math.max(10, Number(inputs.iv_volume) || 1000);
      const hrs = Math.max(0.25, Number(inputs.iv_hours) || 8);
      const factor = Number(inputs.drop_factor) || 20;
      const mins = hrs * 60;
      const drip = Math.round((vol * factor) / mins);
      const hourly = (vol / hrs).toFixed(1);
      return {
        value: drip,
        secondaryText: 'Hourly Flow Rate: ' + hourly + ' mL/hr | Total Duration: ' + Math.round(mins) + ' minutes'
      };
    `,
  },

  // 3. LAWYER
  {
    id: 'lawyer-billable-hours-calculator',
    category: 'profession',
    name: 'Lawyer Billable Hours Calculator',
    title: 'Free Lawyer Billable Hours Calculator — Targets, Quota & Realization',
    description: 'Calculate annual billable targets, daily billable hour quotas, gross legal fees, and net realized revenue.',
    badge: 'Legal Practice',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Legal Billable Realization Model',
      expression: 'Realized Revenue = (Annual Billable Hours × Billing Rate) × (Realization Rate ÷ 100)',
      explanation: 'Calculates the true economic production of a practicing attorney, accounting for invoice write-downs, collection delays, and working calendar weeks.',
      variables: [
        { symbol: 'Billable Hours', meaning: 'Annual billable hour target required by law firm or partnership' },
        { symbol: 'Billing Rate', meaning: 'Hourly legal fee billed to clients in dollars per hour ($/hr)' },
        { symbol: 'Realization Rate', meaning: 'Percentage of billed fees successfully invoiced and collected' },
      ],
    },
    example: {
      title: 'Worked Example: 1,850 Hours at $350/hr with 90% Realization',
      scenario: 'An associate attorney has an annual target of 1,850 billable hours over 48 working weeks at $350/hour with a 90% realization rate.',
      steps: [
        {
          number: 1,
          title: 'Calculate Gross Billed Fees',
          description: '1,850 hours × $350 = $647,500.',
          mathExpression: '$647,500',
        },
        {
          number: 2,
          title: 'Apply Realization Factor',
          description: '$647,500 × 0.90 = $582,750 collected revenue.',
          mathExpression: '$582,750',
        },
      ],
      conclusion: 'The attorney must record 7.7 billable hours per work day to produce $582,750 in realized revenue.',
    },
    faqs: [
      {
        question: 'What is a typical realization rate for law firms?',
        answer: 'Large law firms generally target 85% to 92% realization across billing and collections. Boutique and solo practitioners typically range between 80% and 90%.',
      },
    ],
    inputs: [
      { id: 'target_hours', label: 'Annual Billable Target (hours)', type: 'number', defaultValue: 1850, min: 500, max: 3000, step: 50, unit: 'hrs' },
      { id: 'hourly_rate', label: 'Hourly Billing Rate ($/hr)', type: 'number', defaultValue: 350, min: 50, max: 2500, step: 25, unit: '$' },
      { id: 'realization_pct', label: 'Realization / Collection Rate (%)', type: 'number', defaultValue: 90, min: 50, max: 100, step: 1, unit: '%' },
      { id: 'working_weeks', label: 'Working Weeks / Year', type: 'number', defaultValue: 48, min: 40, max: 52, step: 1, unit: 'wks' },
    ],
    defaultResult: {
      label: 'Realized Annual Revenue',
      initialValue: 582750,
      decimals: 2,
      prefix: '$',
      secondaryText: 'Daily Quota: 7.7 billable hrs/day (5-day week) | Gross Billings: $647,500.00',
      accent: 'link',
    },
    computeScript: `
      const hrs = Math.max(100, Number(inputs.target_hours) || 1850);
      const rate = Math.max(10, Number(inputs.hourly_rate) || 350);
      const real = Math.min(100, Math.max(10, Number(inputs.realization_pct) || 90));
      const wks = Math.max(1, Number(inputs.working_weeks) || 48);

      const gross = hrs * rate;
      const netRealized = gross * (real / 100);
      const dailyQuota = (hrs / (wks * 5)).toFixed(1);

      return {
        value: netRealized,
        secondaryText: 'Daily Quota: ' + dailyQuota + ' billable hrs/day (5-day week) | Gross Billings: $' + Math.round(gross).toLocaleString()
      };
    `,
  },

  // 4. ENGINEER
  {
    id: 'engineer-project-cost-calculator',
    category: 'profession',
    name: 'Engineer Project Cost Estimator',
    title: 'Free Engineering Project Cost Estimator — Fully Loaded Labor & Margin',
    description: 'Calculate fully loaded engineering project pricing with direct technical labor, fringe overhead multipliers, and risk contingency.',
    badge: 'Engineering ROI',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Loaded Engineering Cost & Proposal Formula',
      expression: 'Proposal Price = [(Hours × Base Rate × Overhead) × (1 + Contingency ÷ 100)] ÷ (1 - Profit Margin ÷ 100)',
      explanation: 'Professional engineering consulting pricing formula factoring in indirect overhead multipliers, risk buffers, and contract profit margins.',
      variables: [
        { symbol: 'Hours', meaning: 'Estimated technical labor hours required for engineering deliverables' },
        { symbol: 'Base Rate', meaning: 'Direct unburdened engineer hourly wage in $/hr' },
        { symbol: 'Overhead', meaning: 'Firm fringe benefit, CAD software, and office multiplier (typically 1.6 - 2.2)' },
      ],
    },
    example: {
      title: 'Worked Example: 160-Hour Structural Review Package',
      scenario: 'An engineering firm estimates 160 hours at $65/hr base wage, 1.8x overhead multiplier, 15% contingency, and 20% target profit.',
      steps: [
        {
          number: 1,
          title: 'Calculate Loaded Cost',
          description: '160 hrs × $65/hr × 1.8 overhead = $18,720 loaded labor.',
          mathExpression: '$18,720',
        },
        {
          number: 2,
          title: 'Add Scope Contingency & Margin',
          description: '$18,720 × 1.15 = $21,528. Proposal Price = $21,528 ÷ (1 - 0.20) = $26,910.',
          mathExpression: '$26,910',
        },
      ],
      conclusion: 'The recommended lump-sum proposal price is $26,910 with $18,720 loaded internal cost.',
    },
    faqs: [
      {
        question: 'What items are included in the overhead multiplier?',
        answer: 'Overhead includes health insurance, payroll taxes, retirement match, CAD/FEA software licenses, office leases, and non-billable administrative staff.',
      },
    ],
    inputs: [
      { id: 'eng_hours', label: 'Estimated Engineering Hours', type: 'number', defaultValue: 160, min: 10, max: 10000, step: 10, unit: 'hrs' },
      { id: 'eng_base_rate', label: 'Engineer Base Wage ($/hr)', type: 'number', defaultValue: 65, min: 20, max: 300, step: 5, unit: '$' },
      { id: 'eng_overhead', label: 'Overhead Multiplier (e.g. 1.8)', type: 'number', defaultValue: 1.8, min: 1.0, max: 3.5, step: 0.1 },
      { id: 'eng_contingency', label: 'Risk Contingency (%)', type: 'number', defaultValue: 15, min: 0, max: 50, step: 5, unit: '%' },
      { id: 'eng_profit', label: 'Target Profit Margin (%)', type: 'number', defaultValue: 20, min: 5, max: 50, step: 5, unit: '%' },
    ],
    defaultResult: {
      label: 'Recommended Proposal Price',
      initialValue: 26910,
      decimals: 2,
      prefix: '$',
      secondaryText: 'Loaded Engineering Cost: $18,720.00 | Direct Labor: $10,400.00',
      accent: 'cyan',
    },
    computeScript: `
      const hrs = Math.max(1, Number(inputs.eng_hours) || 160);
      const base = Math.max(1, Number(inputs.eng_base_rate) || 65);
      const ovh = Math.max(1, Number(inputs.eng_overhead) || 1.8);
      const cont = Math.max(0, Number(inputs.eng_contingency) || 15);
      const profit = Math.min(80, Math.max(0, Number(inputs.eng_profit) || 20));

      const directLabor = hrs * base;
      const loadedCost = directLabor * ovh;
      const withRisk = loadedCost * (1 + cont / 100);
      const proposal = withRisk / (1 - profit / 100);

      return {
        value: proposal,
        secondaryText: 'Loaded Cost: $' + Math.round(loadedCost).toLocaleString() + ' | Direct Labor: $' + Math.round(directLabor).toLocaleString()
      };
    `,
  },

  // 5. ARCHITECT
  {
    id: 'architect-far-calculator',
    category: 'profession',
    name: 'Architect Floor Area Ratio (FAR) Calculator',
    title: 'Free Architect Floor Area Ratio (FAR) Calculator — Zoning & Lot Coverage',
    description: 'Compute municipal Floor Area Ratio (FAR), maximum permissible gross building area, and lot coverage percentage.',
    badge: 'Zoning & Code',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Floor Area Ratio (FAR) & Building Envelope Formula',
      expression: 'FAR = Gross Floor Area ÷ Parcel Lot Area ; Max Area = Parcel Lot Area × Max Permissible FAR',
      explanation: 'FAR is the universal municipal metric dictating building bulk and density relative to the underlying land parcel.',
      variables: [
        { symbol: 'Gross Floor Area', meaning: 'Sum of all enclosed usable floor levels in the proposed building' },
        { symbol: 'Parcel Lot Area', meaning: 'Total square footage of the legal property parcel' },
        { symbol: 'Max Permissible FAR', meaning: 'Statutory zoning envelope density ceiling' },
      ],
    },
    example: {
      title: 'Worked Example: 7,500 sq ft Parcel with 2.5 FAR',
      scenario: 'An architect designs a 15,000 sq ft multi-family residence with a 3,000 sq ft footprint on a 7,500 sq ft lot zoned for 2.5 FAR.',
      steps: [
        {
          number: 1,
          title: 'Calculate Max Allowable Floor Area',
          description: '7,500 sq ft × 2.5 FAR = 18,750 sq ft maximum permitted building area.',
          mathExpression: 'Max = 18,750 sq ft',
        },
        {
          number: 2,
          title: 'Compute Actual FAR & Coverage',
          description: '15,000 ÷ 7,500 = 2.0 FAR. Lot Coverage = 3,000 ÷ 7,500 = 40.0%.',
          mathExpression: 'FAR = 2.0, Coverage = 40%',
        },
      ],
      conclusion: 'The design is zoning compliant: Proposed FAR is 2.0 (below the 2.5 ceiling) with 40% ground coverage.',
    },
    faqs: [
      {
        question: 'Are subterranean parking structures and balconies counted towards FAR?',
        answer: 'In most municipal building codes, below-grade parking and unenclosed exterior balconies are exempt from gross floor area calculations.',
      },
    ],
    inputs: [
      { id: 'parcel_area', label: 'Parcel Lot Area (sq ft)', type: 'number', defaultValue: 7500, min: 500, max: 5000000, step: 250, unit: 'sq ft' },
      { id: 'zoning_far', label: 'Zoning Permissible FAR', type: 'number', defaultValue: 2.5, min: 0.1, max: 25, step: 0.1 },
      { id: 'proposed_gfa', label: 'Proposed Building Area (sq ft)', type: 'number', defaultValue: 15000, min: 200, max: 5000000, step: 250, unit: 'sq ft' },
      { id: 'ground_footprint', label: 'Ground Floor Footprint (sq ft)', type: 'number', defaultValue: 3000, min: 100, max: 1000000, step: 100, unit: 'sq ft' },
    ],
    defaultResult: {
      label: 'Maximum Permissible Area',
      initialValue: 18750,
      decimals: 0,
      suffix: ' sq ft',
      secondaryText: 'Proposed Project FAR: 2.00 (Zoning: 2.50) | Lot Coverage: 40.0%',
      accent: 'violet',
    },
    computeScript: `
      const parcel = Math.max(100, Number(inputs.parcel_area) || 7500);
      const maxFar = Math.max(0.1, Number(inputs.zoning_far) || 2.5);
      const proposed = Math.max(1, Number(inputs.proposed_gfa) || 15000);
      const footprint = Math.max(1, Number(inputs.ground_footprint) || 3000);

      const maxPermitted = Math.round(parcel * maxFar);
      const actualFar = (proposed / parcel).toFixed(2);
      const coverage = ((footprint / parcel) * 100).toFixed(1);

      return {
        value: maxPermitted,
        secondaryText: 'Proposed Project FAR: ' + actualFar + ' (Zoning: ' + maxFar.toFixed(2) + ') | Lot Coverage: ' + coverage + '%'
      };
    `,
  },

  // 6. ACCOUNTANT
  {
    id: 'accountant-tax-calculator',
    category: 'profession',
    name: 'Accountant Self-Employment Tax Calculator',
    title: 'Free Accountant Self-Employment Tax Calculator — Schedule SE & Quarterly',
    description: 'Calculate 1099 self-employment tax (Schedule SE 15.3%) and quarterly estimated IRS tax payment obligations.',
    badge: 'CPA Standard',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Schedule SE & Estimated Tax Formula',
      expression: 'SE Tax = (Net Business Profit × 92.35%) × 15.3% ; Quarterly Payment = (SE Tax + Income Tax) ÷ 4',
      explanation: 'Under IRS Code, self-employed professionals pay both employer and employee halves of FICA (12.4% Social Security up to wage cap + 2.9% Medicare) on 92.35% of net business income.',
      variables: [
        { symbol: 'Gross Income', meaning: 'Total 1099 revenue and consulting invoices' },
        { symbol: 'Business Expenses', meaning: 'Ordinary and necessary Schedule C deductible expenses' },
      ],
    },
    example: {
      title: 'Worked Example: $95,000 Gross with $15,000 Expenses',
      scenario: 'A freelance consultant grosses $95,000 with $15,000 in expenses ($80,000 net profit) and a 15% estimated income tax bracket.',
      steps: [
        {
          number: 1,
          title: 'Calculate SE Tax',
          description: '$80,000 × 0.9235 = $73,880 taxable base × 15.3% = $11,304 SE tax.',
          mathExpression: '$11,304',
        },
        {
          number: 2,
          title: 'Calculate Quarterly Payment',
          description: 'Income Tax on ($80,000 - $5,652 deduction) = $11,152. Total Tax = $22,456. Quarterly = $5,614.',
          mathExpression: '$5,614/quarter',
        },
      ],
      conclusion: 'Annual self-employment tax is $11,304. Projected quarterly estimated payment is $5,614.',
    },
    faqs: [
      {
        question: 'Can I deduct half of my self-employment tax?',
        answer: 'Yes. The IRS permits an above-the-line deduction for the employer-equivalent portion (50%) of your SE tax on Form 1040 Schedule 1.',
      },
    ],
    inputs: [
      { id: 'annual_gross_1099', label: 'Gross 1099 Revenue ($)', type: 'number', defaultValue: 95000, min: 1000, max: 2000000, step: 2500, unit: '$' },
      { id: 'sched_c_expenses', label: 'Deductible Business Expenses ($)', type: 'number', defaultValue: 15000, min: 0, max: 1000000, step: 1000, unit: '$' },
      { id: 'income_tax_bracket', label: 'Estimated Income Tax Rate (%)', type: 'number', defaultValue: 15, min: 0, max: 40, step: 1, unit: '%' },
    ],
    defaultResult: {
      label: 'Annual Self-Employment Tax',
      initialValue: 11304,
      decimals: 2,
      prefix: '$',
      secondaryText: 'Quarterly Estimated Payment: $5,614.00 | Net Schedule C Profit: $80,000.00',
      accent: 'link',
    },
    computeScript: `
      const gross = Math.max(0, Number(inputs.annual_gross_1099) || 95000);
      const exp = Math.max(0, Number(inputs.sched_c_expenses) || 15000);
      const rate = Math.max(0, Number(inputs.income_tax_bracket) || 15);

      const netProfit = Math.max(0, gross - exp);
      const seTaxable = netProfit * 0.9235;
      const seTax = seTaxable * 0.153;

      const taxableIncome = Math.max(0, netProfit - (seTax / 2));
      const incomeTax = taxableIncome * (rate / 100);
      const quarterly = (seTax + incomeTax) / 4;

      return {
        value: seTax,
        secondaryText: 'Quarterly Estimated Payment: $' + Math.round(quarterly).toLocaleString() + ' | Net Schedule C Profit: $' + Math.round(netProfit).toLocaleString()
      };
    `,
  },

  // 7. REAL ESTATE AGENT
  {
    id: 'realtor-commission-calculator',
    category: 'profession',
    name: 'Real Estate Agent Commission Calculator',
    title: 'Free Real Estate Agent Commission Split Calculator — Broker Splits & Net Pay',
    description: 'Calculate real estate agent net take-home commission after listing side splits, brokerage desk fees, and franchise royalties.',
    badge: 'Realtor Standard',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Agent Commission Split Formula',
      expression: 'Agent Net Pay = (Sale Price × Total Commission % × Side Split %) × (Agent Brokerage Split %)',
      explanation: 'Apportions the gross real estate commission pool between the listing and buyer brokerages, followed by the individual agent-brokerage agreement split.',
      variables: [
        { symbol: 'Sale Price', meaning: 'Final contracted transaction closing sale price of the real estate asset' },
        { symbol: 'Total Commission', meaning: 'Gross commission agreed upon in the listing representation agreement (typically 5% - 6%)' },
      ],
    },
    example: {
      title: 'Worked Example: $450,000 Home at 5% Commission & 70/30 Split',
      scenario: 'A buyer agent closes a $450,000 home with a 5% total commission (2.5% co-op buyer side) and a 70% agent brokerage split.',
      steps: [
        {
          number: 1,
          title: 'Calculate Side Gross Commission',
          description: '$450,000 × 5% total = $22,500 pool. 50% buyer side = $11,250 gross.',
          mathExpression: '$11,250',
        },
        {
          number: 2,
          title: 'Apply Agent Split',
          description: '$11,250 × 70% = $7,875 net take-home pay.',
          mathExpression: '$7,875',
        },
      ],
      conclusion: 'The real estate agent takes home $7,875.00 before personal income tax deductions.',
    },
    faqs: [
      {
        question: 'What is a typical broker-agent split?',
        answer: 'New agents typically start on 50/50 or 60/40 splits. Experienced high-producing agents command 70/30, 80/20, or 100% flat-fee desk models.',
      },
    ],
    inputs: [
      { id: 'sale_price', label: 'Property Sale Price ($)', type: 'number', defaultValue: 450000, min: 10000, max: 50000000, step: 10000, unit: '$' },
      { id: 'total_comm_pct', label: 'Total Transaction Commission (%)', type: 'number', defaultValue: 5, min: 1, max: 10, step: 0.25, unit: '%' },
      { id: 'side_alloc_pct', label: 'Your Side Allocation (%)', type: 'number', defaultValue: 50, min: 10, max: 100, step: 5, unit: '%' },
      { id: 'broker_split_pct', label: 'Agent Brokerage Split (% to Agent)', type: 'number', defaultValue: 70, min: 30, max: 100, step: 5, unit: '%' },
    ],
    defaultResult: {
      label: 'Agent Net Take-Home Pay',
      initialValue: 7875,
      decimals: 2,
      prefix: '$',
      secondaryText: 'Side Gross Commission: $11,250.00 | Total Pool: $22,500.00',
      accent: 'cyan',
    },
    computeScript: `
      const price = Math.max(1000, Number(inputs.sale_price) || 450000);
      const totalPct = Math.max(0.1, Number(inputs.total_comm_pct) || 5);
      const sidePct = Math.max(1, Number(inputs.side_alloc_pct) || 50);
      const splitPct = Math.max(1, Number(inputs.broker_split_pct) || 70);

      const grossPool = price * (totalPct / 100);
      const sideGross = grossPool * (sidePct / 100);
      const netPay = Math.round(sideGross * (splitPct / 100) * 100) / 100;

      return {
        value: netPay,
        secondaryText: 'Side Gross Commission: $' + Math.round(sideGross).toLocaleString() + ' | Total Pool: $' + Math.round(grossPool).toLocaleString()
      };
    `,
  },

  // 8. SOFTWARE DEVELOPER
  {
    id: 'developer-sprint-velocity-calculator',
    category: 'profession',
    name: 'Software Developer Sprint Velocity Calculator',
    title: 'Free Developer Sprint Velocity & Capacity Calculator — Agile Story Points',
    description: 'Calculate agile sprint commitment capacity in story points based on engineering headcount, PTO vacation days, and focus factor.',
    badge: 'Agile & DevOps',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Agile Engineering Capacity Formula',
      expression: 'Sprint Points = [((Engineers × Sprint Days) - PTO Days) × 8 hrs × Focus Factor %] ÷ Hours per Story Point',
      explanation: 'Calculates realistic engineering story point commitments to prevent developer burnout and missed sprint delivery commitments.',
      variables: [
        { symbol: 'Engineers', meaning: 'Full-time software engineers allocated to the sprint' },
        { symbol: 'Focus Factor', meaning: 'Percentage of time spent on coding vs meetings, code reviews, and production support' },
      ],
    },
    example: {
      title: 'Worked Example: 5-Engineer Team, 2-Week Sprint (70% Focus)',
      scenario: 'A team of 5 engineers runs a 10-day sprint with 3 total PTO days, 70% focus factor, and an average of 6 hours per story point.',
      steps: [
        {
          number: 1,
          title: 'Calculate Net Engineering Hours',
          description: '[(5 × 10) - 3 PTO] = 47 days × 8 hrs = 376 gross hrs × 70% focus = 263.2 productive hrs.',
          mathExpression: '263.2 hrs',
        },
        {
          number: 2,
          title: 'Compute Story Point Commitment',
          description: '263.2 productive hours ÷ 6 hours/point = 43.87 ≈ 44 story points.',
          mathExpression: '44 Story Points',
        },
      ],
      conclusion: 'The recommended sprint commitment is 44 story points across 263 productive engineering hours.',
    },
    faqs: [
      {
        question: 'What is an optimal agile engineering focus factor?',
        answer: 'High-performing engineering teams usually experience focus factors between 65% and 75%. Unrealistic 100% assumptions consistently lead to sprint failure.',
      },
    ],
    inputs: [
      { id: 'team_engineers', label: 'Active Engineers on Team', type: 'number', defaultValue: 5, min: 1, max: 50, step: 1 },
      { id: 'sprint_days', label: 'Sprint Working Days (e.g. 10 for 2 wks)', type: 'number', defaultValue: 10, min: 3, max: 30, step: 1 },
      { id: 'pto_days', label: 'Total Team Vacation / PTO (Days)', type: 'number', defaultValue: 3, min: 0, max: 50, step: 0.5 },
      { id: 'focus_factor', label: 'Focus Factor (%)', type: 'number', defaultValue: 70, min: 30, max: 95, step: 5, unit: '%' },
      { id: 'hours_per_pt', label: 'Historical Hours / Story Point', type: 'number', defaultValue: 6, min: 1, max: 16, step: 0.5, unit: 'hrs' },
    ],
    defaultResult: {
      label: 'Recommended Sprint Commitment',
      initialValue: 44,
      decimals: 0,
      suffix: ' Story Points',
      secondaryText: 'Net Productive Engineering Hours: 263 hrs | Gross Available: 376 hrs',
      accent: 'violet',
    },
    computeScript: `
      const eng = Math.max(1, Number(inputs.team_engineers) || 5);
      const days = Math.max(1, Number(inputs.sprint_days) || 10);
      const pto = Math.max(0, Number(inputs.pto_days) || 3);
      const focus = Math.min(100, Math.max(10, Number(inputs.focus_factor) || 70));
      const perPt = Math.max(1, Number(inputs.hours_per_pt) || 6);

      const grossHours = Math.max(0, (eng * days - pto) * 8);
      const productiveHours = grossHours * (focus / 100);
      const points = Math.round(productiveHours / perPt);

      return {
        value: points,
        secondaryText: 'Net Productive Hours: ' + Math.round(productiveHours) + ' hrs | Gross Hours: ' + Math.round(grossHours) + ' hrs'
      };
    `,
  },

  // 9. TEACHER
  {
    id: 'teacher-grade-curve-calculator',
    category: 'profession',
    name: 'Teacher & Professor Grade Curve Calculator',
    title: 'Free Teacher Grade Curve Calculator — Square Root & Standard Linear Curves',
    description: 'Apply standardized academic curve algorithms (Square Root Curve or Flat Offset) to raw exam scores with fairness metrics.',
    badge: 'Academic Standard',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Square Root & Standard Grade Curve Formula',
      expression: 'Curved Score = 10 × √(Raw Score) ; Flat Curve = Raw Score + Point Boost',
      explanation: 'The classic Square Root Curve gently lifts lower and middle tier exam grades more than already high grades without breaking the 100% ceiling.',
      variables: [
        { symbol: 'Raw Score', meaning: 'Original uncurved examination score achieved by student (0 - 100)' },
      ],
    },
    example: {
      title: 'Worked Example: Raw Score of 64% on Difficult Physics Midterm',
      scenario: 'A professor applies the standard Square Root curve algorithm to an exam where a student scored 64 raw points.',
      steps: [
        {
          number: 1,
          title: 'Calculate Square Root',
          description: '√64 = 8.0.',
          mathExpression: '√64 = 8.0',
        },
        {
          number: 2,
          title: 'Multiply by 10',
          description: '8.0 × 10 = 80.0% final curved grade.',
          mathExpression: 'Curved Grade = 80.0%',
        },
      ],
      conclusion: 'The student receives an 80.0% (B-) grade, earning a 16.0 point curve advantage.',
    },
    faqs: [
      {
        question: 'Why is the square root curve preferred over a flat point bump?',
        answer: 'A flat bump (e.g. +10 points) awards the same bonus to a student who scored 95 (causing them to exceed 100) as someone who scored 50. The square root curve gives greater assistance to struggling students while respecting top performance.',
      },
    ],
    inputs: [
      { id: 'raw_score', label: 'Raw Student Exam Score (0-100)', type: 'number', defaultValue: 64, min: 0, max: 100, step: 1 },
      { id: 'curve_method', label: 'Curving Algorithm', type: 'select', defaultValue: 'sqrt', options: [
        { label: 'Square Root Curve (10 × √Raw)', value: 'sqrt' },
        { label: 'Flat Point Boost (+10 pts)', value: 'flat' },
        { label: 'Scale to Top Performer (Max 100)', value: 'top' },
      ]},
      { id: 'top_score', label: 'Highest Exam Score in Class', type: 'number', defaultValue: 88, min: 50, max: 100, step: 1 },
    ],
    defaultResult: {
      label: 'Curved Final Score',
      initialValue: 80.0,
      decimals: 1,
      suffix: '%',
      secondaryText: 'Curved Grade Advantage: +16.0 pts | Original Raw Score: 64%',
      accent: 'link',
    },
    computeScript: `
      const raw = Math.min(100, Math.max(0, Number(inputs.raw_score) || 64));
      const method = inputs.curve_method || 'sqrt';
      const top = Math.min(100, Math.max(1, Number(inputs.top_score) || 88));

      let curved = raw;
      if (method === 'sqrt') {
        curved = Math.min(100, Math.round(10 * Math.sqrt(raw) * 10) / 10);
      } else if (method === 'flat') {
        curved = Math.min(100, raw + 10);
      } else {
        curved = Math.min(100, Math.round((raw / top) * 1000) / 10);
      }
      const diff = (curved - raw).toFixed(1);

      return {
        value: curved,
        secondaryText: 'Curved Grade Advantage: +' + diff + ' pts | Original Raw Score: ' + raw + '%'
      };
    `,
  },

  // 10. PILOT
  {
    id: 'pilot-fuel-burn-calculator',
    category: 'profession',
    name: 'Pilot Flight Fuel & Endurance Calculator',
    title: 'Free Pilot Flight Fuel Burn & Endurance Calculator — FAA 45-Min Reserves',
    description: 'Calculate flight fuel required with mandatory FAA 45-minute reserves and maximum safe aircraft flight endurance.',
    badge: 'FAA Standard',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Aviation Fuel & Flight Endurance Formula',
      expression: 'Total Fuel = (Flight Time × Fuel Flow) + (Reserve Mins ÷ 60 × Fuel Flow) ; Endurance = Usable Fuel ÷ Fuel Flow',
      explanation: 'Ensures pilots adhere to FAA 14 CFR 91.151 / 91.167 legal reserve fuel requirements (30 mins VFR day, 45 mins IFR / night).',
      variables: [
        { symbol: 'Flight Time', meaning: 'Estimated enroute flight time to destination in hours' },
        { symbol: 'Fuel Flow', meaning: 'Engine cruise fuel burn consumption in gallons per hour (GPH)' },
        { symbol: 'Usable Fuel', meaning: 'Total usable fuel quantity onboard in gallons' },
      ],
    },
    example: {
      title: 'Worked Example: 2.5 Hour Cross-Country at 10.5 GPH with 48 Gal Onboard',
      scenario: 'A private pilot plans a 2.5-hour cross-country flight in a Cessna 172 burning 10.5 GPH with 48 gallons usable onboard and 45-minute reserve.',
      steps: [
        {
          number: 1,
          title: 'Calculate Trip & Reserve Fuel',
          description: 'Trip Fuel = 2.5 hrs × 10.5 GPH = 26.25 gal. Reserve = 0.75 hrs × 10.5 = 7.88 gal. Total = 34.1 gal.',
          mathExpression: '34.1 gallons',
        },
        {
          number: 2,
          title: 'Compute Aircraft Flight Endurance',
          description: '48 gallons ÷ 10.5 GPH = 4.57 hours (4 hrs 34 mins). Projected Margin = 48 - 26.25 = 21.75 gal.',
          mathExpression: '4.57 hours endurance',
        },
      ],
      conclusion: 'The flight requires 34.1 gallons minimum legal fuel. Aircraft has 4.57 hours endurance with 21.8 gallons remaining upon landing.',
    },
    faqs: [
      {
        question: 'What are the FAA minimum fuel reserve requirements?',
        answer: 'Under FAR 91.151, VFR day requires 30 minutes of reserve fuel; VFR night requires 45 minutes; IFR under FAR 91.167 requires 45 minutes past the alternate airport.',
      },
    ],
    inputs: [
      { id: 'flight_time', label: 'Enroute Flight Time (hours)', type: 'number', defaultValue: 2.5, min: 0.2, max: 15, step: 0.1, unit: 'hrs' },
      { id: 'fuel_flow', label: 'Cruise Fuel Burn Rate (gal/hr)', type: 'number', defaultValue: 10.5, min: 2, max: 250, step: 0.5, unit: 'gph' },
      { id: 'usable_fuel', label: 'Total Usable Fuel in Tanks (gal)', type: 'number', defaultValue: 48, min: 10, max: 1000, step: 1, unit: 'gal' },
      { id: 'reserve_mins', label: 'Safety Fuel Reserve (minutes)', type: 'select', defaultValue: '45', options: [
        { label: '45 Minutes (IFR / VFR Night)', value: '45' },
        { label: '30 Minutes (VFR Day)', value: '30' },
        { label: '60 Minutes (Conservative)', value: '60' },
      ]},
    ],
    defaultResult: {
      label: 'Minimum Legal Fuel Required',
      initialValue: 34.1,
      decimals: 1,
      suffix: ' gal',
      secondaryText: 'Aircraft Endurance: 4.6 hrs | Projected Fuel Margin on Landing: 21.8 gal',
      accent: 'cyan',
    },
    computeScript: `
      const time = Math.max(0.1, Number(inputs.flight_time) || 2.5);
      const burn = Math.max(1, Number(inputs.fuel_flow) || 10.5);
      const fuel = Math.max(5, Number(inputs.usable_fuel) || 48);
      const res = Number(inputs.reserve_mins) || 45;

      const tripFuel = time * burn;
      const resFuel = (res / 60) * burn;
      const totalReq = tripFuel + resFuel;
      const endurance = (fuel / burn).toFixed(1);
      const margin = (fuel - tripFuel).toFixed(1);

      return {
        value: totalReq,
        secondaryText: 'Aircraft Endurance: ' + endurance + ' hrs | Projected Fuel Margin on Landing: ' + margin + ' gal'
      };
    `,
  },
];
