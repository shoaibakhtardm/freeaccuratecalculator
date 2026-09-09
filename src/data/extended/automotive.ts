// src/data/extended/automotive.ts
import type { CalculatorEntry } from '../calculatorRegistry';

export const automotiveCalculators: CalculatorEntry[] = [
  {
    id: 'fuel-cost-calculator',
    category: 'automotive',
    name: 'Fuel Cost Calculator',
    title: 'Free Fuel Cost Calculator — Trip Gas Mileage & Commute Expense',
    description: 'Calculate gasoline and diesel fuel costs for road trips, daily commutes, and annual vehicle travel based on fuel economy and pump prices.',
    badge: 'Commute Economics',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Fuel Cost Equation',
      expression: 'Fuel Cost = (Distance ÷ MPG) × Gas Price per Gallon',
      explanation: 'Computes total gallons consumed during a vehicle journey multiplied by current pump fuel price.',
      variables: [
        { symbol: 'Distance', meaning: 'Trip length in miles' },
        { symbol: 'MPG', meaning: 'Miles per gallon fuel efficiency rating' },
      ],
    },
    example: {
      title: 'Worked Example: 600-Mile Road Trip',
      scenario: 'A 600-mile trip in a car averaging 28 MPG with gas priced at $3.60 per gallon.',
      steps: [
        {
          number: 1,
          title: 'Calculate Gallons Consumed',
          description: '600 miles ÷ 28 MPG = 21.43 gallons.',
          mathExpression: '21.43 gal',
        },
        {
          number: 2,
          title: 'Calculate Total Fuel Cost',
          description: '21.43 gallons × $3.60 = $77.14.',
          mathExpression: '$77.14',
        },
      ],
      conclusion: 'Total fuel expense for the trip is $77.14.',
    },
    faqs: [
      {
        question: 'How does highway vs city driving affect fuel costs?',
        answer: 'City stop-and-go driving burns significantly more fuel due to frequent acceleration, reducing efficiency by 20% to 35% compared to steady highway cruising.',
      },
    ],
    inputs: [
      { id: 'trip_distance', label: 'Trip Distance', type: 'number', defaultValue: 600, min: 1, max: 100000, unit: 'miles' },
      { id: 'vehicle_mpg', label: 'Vehicle Fuel Economy', type: 'number', defaultValue: 28, min: 1, max: 150, step: 0.5, unit: 'MPG' },
      { id: 'fuel_price', label: 'Gas Price per Gallon', type: 'number', defaultValue: 3.60, min: 0.1, max: 30, step: 0.05, unit: '$' },
    ],
    defaultResult: {
      label: 'Estimated Fuel Expense',
      initialValue: 77.14,
      decimals: 2,
      secondaryText: 'Gallons required: 21.43 gal | Cost per mile: $0.13/mile',
      prefix: '$',
      accent: 'cyan',
    },
    computeScript: `
      const dist = Math.max(0, Number(inputs.trip_distance) || 600);
      const mpg = Math.max(1, Number(inputs.vehicle_mpg) || 28);
      const price = Math.max(0.01, Number(inputs.fuel_price) || 3.60);
      const gallons = dist / mpg;
      const cost = gallons * price;
      const cpm = dist > 0 ? (cost / dist) : 0;
      return {
        value: cost,
        secondaryText: 'Gallons needed: ' + gallons.toFixed(2) + ' gal | Cost: $' + cpm.toFixed(2) + '/mile',
        badge: 'Trip Fuel Total'
      };
    `,
  },
  {
    id: 'mpg-calculator',
    category: 'automotive',
    name: 'Gas Mileage (MPG)',
    title: 'Free Gas Mileage Calculator — Calculate Actual MPG & L/100km',
    description: 'Calculate actual vehicle fuel economy in miles per gallon (MPG) and liters per 100km based on odometer fill-up records.',
    badge: 'Real-World Economy',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Miles Per Gallon Formula',
      expression: 'MPG = (Odometer Ending - Odometer Starting) ÷ Gallons Pumped',
      explanation: 'Calculates true real-world vehicle efficiency by tracking actual miles traveled between full fuel tank fills.',
      variables: [
        { symbol: 'Gallons Pumped', meaning: 'Gallons required to refill tank back to full' },
      ],
    },
    example: {
      title: 'Worked Example: 340 Miles on 11.5 Gallons',
      scenario: 'You drive 340 miles between fuel fills and pump 11.5 gallons to top off the tank.',
      steps: [
        {
          number: 1,
          title: 'Calculate Fuel Economy',
          description: '340 miles ÷ 11.5 gallons = 29.57 MPG.',
          mathExpression: '29.57 MPG',
        },
      ],
      conclusion: 'Your vehicle achieved 29.57 miles per gallon (approx. 7.95 L/100km).',
    },
    faqs: [
      {
        question: 'How do I accurately calculate my car’s MPG?',
        answer: 'Fill your tank completely and reset your trip odometer. At your next fill-up, divide the trip miles by the exact number of gallons shown on the fuel pump receipt.',
      },
    ],
    inputs: [
      { id: 'miles_driven', label: 'Miles Driven Between Fills', type: 'number', defaultValue: 340, min: 1, max: 2000, step: 0.1, unit: 'miles' },
      { id: 'gallons_pumped', label: 'Gallons Pumped to Full', type: 'number', defaultValue: 11.5, min: 0.1, max: 200, step: 0.1, unit: 'gal' },
    ],
    defaultResult: {
      label: 'Fuel Economy (MPG)',
      initialValue: 29.57,
      decimals: 2,
      secondaryText: 'Metric Equivalent: 7.95 Liters / 100 km',
      suffix: ' MPG',
      accent: 'link',
    },
    computeScript: `
      const miles = Math.max(1, Number(inputs.miles_driven) || 340);
      const gal = Math.max(0.1, Number(inputs.gallons_pumped) || 11.5);
      const mpg = miles / gal;
      const l100km = 235.215 / mpg;
      return {
        value: mpg,
        secondaryText: 'Metric: ' + l100km.toFixed(2) + ' L/100km | Range per 10 gal: ' + (mpg * 10).toFixed(0) + ' mi',
        badge: mpg >= 30 ? 'High Efficiency' : 'Standard MPG'
      };
    `,
  },
  {
    id: 'car-depreciation-calculator',
    category: 'automotive',
    name: 'Car Depreciation Tool',
    title: 'Free Car Depreciation Calculator — Vehicle Resale Value Over Time',
    description: 'Calculate vehicle depreciation rate curves and future trade-in resale values year-by-year from initial purchase price.',
    badge: 'Asset Curve',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Compound Vehicle Depreciation Model',
      expression: 'Value = Purchase Price × (1 - First Year Rate) × (1 - Subsequent Annual Rate)ⁿ⁻¹',
      explanation: 'Models standard vehicle depreciation where vehicles lose ~20% in year one and ~15% annually thereafter.',
      variables: [
        { symbol: 'n', meaning: 'Vehicle age in years' },
      ],
    },
    example: {
      title: 'Worked Example: $40,000 New Car after 5 Years',
      scenario: 'A new car purchased for $40,000 depreciating 20% in year 1 and 15% annually in years 2 through 5.',
      steps: [
        {
          number: 1,
          title: 'Year 1 Value',
          description: '$40,000 × (1 - 0.20) = $32,000.',
          mathExpression: '$32,000',
        },
        {
          number: 2,
          title: 'Year 5 Value',
          description: '$32,000 × (0.85)⁴ = $16,704.',
          mathExpression: '$16,704',
        },
      ],
      conclusion: 'The car retains approximately $16,704 (41.8% of original value) after 5 years.',
    },
    faqs: [
      {
        question: 'When do vehicles experience the highest depreciation?',
        answer: 'The highest depreciation occurs in the first 12 months (typically 15% to 25%), after which annual depreciation stabilizes to between 10% and 15%.',
      },
    ],
    inputs: [
      { id: 'purchase_price', label: 'Vehicle Purchase Price', type: 'number', defaultValue: 40000, min: 1000, max: 500000, unit: '$' },
      { id: 'vehicle_age', label: 'Vehicle Age (Years)', type: 'number', defaultValue: 5, min: 1, max: 20, unit: 'yrs' },
    ],
    defaultResult: {
      label: 'Estimated Current Resale Value',
      initialValue: 16704,
      decimals: 0,
      secondaryText: 'Retains 41.8% of original value | Total Depreciation: $23,296',
      prefix: '$',
      accent: 'violet',
    },
    computeScript: `
      const price = Math.max(1000, Number(inputs.purchase_price) || 40000);
      const age = Math.max(1, Number(inputs.vehicle_age) || 5);
      let val = price * 0.80;
      for (let i = 1; i < age; i++) {
        val *= 0.85;
      }
      const retained = (val / price) * 100;
      return {
        value: val,
        secondaryText: 'Retained: ' + retained.toFixed(1) + '% | Cumulative Depreciation: $' + Math.round(price - val).toLocaleString(),
        badge: 'Resale Estimate'
      };
    `,
  },
];
