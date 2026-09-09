// src/data/extended/construction.ts
import type { CalculatorEntry } from '../calculatorRegistry';

export const constructionCalculators: CalculatorEntry[] = [
  {
    id: 'square-footage-calculator',
    category: 'construction',
    name: 'Square Footage Calculator',
    title: 'Free Square Footage Calculator — Area & Flooring Materials Estimator',
    description: 'Calculate total square footage, square yardage, and material costs for rooms, houses, landscapes, and construction sites.',
    badge: 'Area Math',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Rectangular Surface Area Formula',
      expression: 'Square Feet = Length (ft) × Width (ft) ; Square Yards = Square Feet ÷ 9',
      explanation: 'Determines the planar area of rectangular rooms, patios, or architectural envelopes.',
      variables: [
        { symbol: 'Square Feet', meaning: 'Total area measurement' },
      ],
    },
    example: {
      title: 'Worked Example: 24 ft × 16 ft Living Room',
      scenario: 'A room measuring 24 feet long by 16 feet wide with hardwood flooring priced at $4.50/sq ft and 10% waste.',
      steps: [
        {
          number: 1,
          title: 'Calculate Area',
          description: '24 ft × 16 ft = 384 sq ft.',
          mathExpression: '384 sq ft',
        },
        {
          number: 2,
          title: 'Add 10% Waste Factor',
          description: '384 × 1.10 = 422.4 sq ft.',
          mathExpression: '422.4 sq ft',
        },
      ],
      conclusion: 'Purchase 423 sq ft of material for approximately $1,900.80 total cost.',
    },
    faqs: [
      {
        question: 'Why should I include a waste factor?',
        answer: 'Cutting angles around corners, doorways, and plank trimming creates scrap. A 10% waste buffer prevents running short mid-installation.',
      },
    ],
    inputs: [
      { id: 'length_feet', label: 'Length (Feet)', type: 'number', defaultValue: 24, min: 1, max: 10000, unit: 'ft' },
      { id: 'width_feet', label: 'Width (Feet)', type: 'number', defaultValue: 16, min: 1, max: 10000, unit: 'ft' },
      { id: 'unit_cost', label: 'Material Cost per Sq Ft', type: 'number', defaultValue: 4.50, min: 0, max: 1000, step: 0.1, unit: '$' },
      { id: 'waste_pct', label: 'Waste Allowance', type: 'number', defaultValue: 10, min: 0, max: 30, unit: '%' },
    ],
    defaultResult: {
      label: 'Total Square Footage',
      initialValue: 384,
      decimals: 2,
      secondaryText: 'Material Needed (with 10% waste): 422.40 sq ft | Total Cost: $1,900.80',
      suffix: ' sq ft',
      accent: 'cyan',
    },
    computeScript: `
      const l = Math.max(0, Number(inputs.length_feet) || 24);
      const w = Math.max(0, Number(inputs.width_feet) || 16);
      const cost = Math.max(0, Number(inputs.unit_cost) || 4.50);
      const waste = Math.max(0, Number(inputs.waste_pct) || 10) / 100;
      const area = l * w;
      const withWaste = area * (1 + waste);
      const totalCost = withWaste * cost;
      return {
        value: area,
        secondaryText: 'With ' + (waste * 100).toFixed(0) + '% waste: ' + withWaste.toFixed(1) + ' sq ft (' + (withWaste / 9).toFixed(1) + ' sq yd) | Total Cost: $' + totalCost.toFixed(2),
        badge: 'Area Certified'
      };
    `,
  },
  {
    id: 'paint-calculator',
    category: 'construction',
    name: 'Paint Coverage Estimator',
    title: 'Free Paint Calculator — Gallons Needed & Wall Surface Coverage',
    description: 'Calculate paint gallons required for interior rooms and exterior walls accounting for doors, windows, and multiple coat applications.',
    badge: 'Coverage Formula',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Wall Area & Gallons Equation',
      expression: 'Net Area = (Perimeter × Height) - Openings ; Gallons = (Net Area × Coats) ÷ 350',
      explanation: 'One standard US gallon covers approximately 350 to 400 square feet of primed smooth drywall.',
      variables: [
        { symbol: 'Net Area', meaning: 'Gross wall area minus 21 sq ft per door and 15 sq ft per window' },
      ],
    },
    example: {
      title: 'Worked Example: 12 × 14 Room, 9 ft Ceilings',
      scenario: 'Room perimeter of 52 ft with 9 ft ceiling, 2 doors, 2 windows, and 2 coats of paint.',
      steps: [
        {
          number: 1,
          title: 'Calculate Gross Wall Area',
          description: '52 ft × 9 ft = 468 sq ft.',
          mathExpression: '468 sq ft',
        },
        {
          number: 2,
          title: 'Deduct Openings',
          description: '468 - (2 × 21) - (2 × 15) = 396 net sq ft.',
          mathExpression: '396 sq ft',
        },
        {
          number: 3,
          title: 'Calculate Gallons for 2 Coats',
          description: '(396 × 2) ÷ 350 = 2.26 gallons (buy 3 gallons).',
          mathExpression: '3 gallons',
        },
      ],
      conclusion: 'You will need 3 gallons of paint.',
    },
    faqs: [
      {
        question: 'Does primer count as a coat of paint?',
        answer: 'No. Primer seals unpainted drywall or dark colors, providing an even base so the topcoat achieves full manufacturer coverage.',
      },
    ],
    inputs: [
      { id: 'room_perimeter', label: 'Total Room Perimeter (Sum of all walls)', type: 'number', defaultValue: 52, min: 4, max: 1000, unit: 'ft' },
      { id: 'ceiling_height', label: 'Ceiling Height', type: 'number', defaultValue: 9, min: 6, max: 30, unit: 'ft' },
      { id: 'door_count', label: 'Doors Count', type: 'number', defaultValue: 2, min: 0, max: 20, unit: 'doors' },
      { id: 'window_count', label: 'Windows Count', type: 'number', defaultValue: 2, min: 0, max: 30, unit: 'windows' },
      { id: 'coats_count', label: 'Number of Coats', type: 'select', defaultValue: '2', options: [
        { label: '1 Coat (Touchup/Same Color)', value: '1' },
        { label: '2 Coats (Recommended Standard)', value: '2' },
      ]},
    ],
    defaultResult: {
      label: 'Estimated Paint Needed',
      initialValue: 2.26,
      decimals: 2,
      secondaryText: 'Net Wall Area: 396 sq ft | Buy: 3 Gallon Cans',
      suffix: ' gallons',
      accent: 'link',
    },
    computeScript: `
      const perim = Math.max(0, Number(inputs.room_perimeter) || 52);
      const h = Math.max(0, Number(inputs.ceiling_height) || 9);
      const doors = Math.max(0, Number(inputs.door_count) || 2);
      const windows = Math.max(0, Number(inputs.window_count) || 2);
      const coats = Number(inputs.coats_count) || 2;

      const gross = perim * h;
      const deductions = (doors * 21) + (windows * 15);
      const net = Math.max(0, gross - deductions);
      const gallons = (net * coats) / 350;
      const cansToBuy = Math.ceil(gallons);
      return {
        value: gallons,
        secondaryText: 'Net Wall Area: ' + Math.round(net) + ' sq ft | Recommend buying ' + cansToBuy + ' gallon cans',
        badge: cansToBuy + ' Cans'
      };
    `,
  },
  {
    id: 'brick-calculator',
    category: 'construction',
    name: 'Brick & Mortar Calculator',
    title: 'Free Brick Calculator — Masonry Units & Mortar Bags Estimator',
    description: 'Estimate standard modular bricks and mortar bags required for masonry walls, garden borders, and structural veneers.',
    badge: 'Masonry Standard',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Brick Quantity Equation',
      expression: 'Bricks = Length (ft) × Height (ft) × 7 bricks/sq ft × (1 + Waste)',
      explanation: 'Standard US modular brick (3⅝″ × 2¼″ × 7⅝″) requires approximately 7 units per square foot of wall surface area with standard ⅜-inch mortar joints.',
      variables: [
        { symbol: 'Mortar', meaning: '1 standard 80 lb bag of mortar typically lays approximately 35 to 40 bricks' },
      ],
    },
    example: {
      title: 'Worked Example: 20 ft × 6 ft Garden Wall',
      scenario: 'A single-wythe wall 20 feet long by 6 feet high with 10% waste allowance.',
      steps: [
        {
          number: 1,
          title: 'Calculate Wall Area',
          description: '20 ft × 6 ft = 120 sq ft.',
          mathExpression: '120 sq ft',
        },
        {
          number: 2,
          title: 'Calculate Bricks Needed',
          description: '120 × 7 = 840 bricks + 10% waste = 924 bricks.',
          mathExpression: '924 bricks',
        },
      ],
      conclusion: 'You will need 924 bricks and approximately 24 bags of mortar.',
    },
    faqs: [
      {
        question: 'What is the standard waste factor for bricks?',
        answer: 'A 5% to 10% waste factor is recommended to account for cracked units during transit and cutting around end caps and pilasters.',
      },
    ],
    inputs: [
      { id: 'wall_length', label: 'Wall Length', type: 'number', defaultValue: 20, min: 1, max: 1000, unit: 'ft' },
      { id: 'wall_height', label: 'Wall Height', type: 'number', defaultValue: 6, min: 1, max: 100, unit: 'ft' },
      { id: 'waste_pct', label: 'Waste Factor', type: 'number', defaultValue: 10, min: 0, max: 25, unit: '%' },
    ],
    defaultResult: {
      label: 'Bricks Required',
      initialValue: 924,
      decimals: 0,
      secondaryText: 'Mortar Needed: ~24 bags (80 lb each)',
      suffix: ' bricks',
      accent: 'violet',
    },
    computeScript: `
      const l = Math.max(0, Number(inputs.wall_length) || 20);
      const h = Math.max(0, Number(inputs.wall_height) || 6);
      const waste = Math.max(0, Number(inputs.waste_pct) || 10) / 100;
      const area = l * h;
      const baseBricks = area * 7;
      const totalBricks = Math.ceil(baseBricks * (1 + waste));
      const mortarBags = Math.ceil(totalBricks / 38);
      return {
        value: totalBricks,
        secondaryText: 'Wall Surface: ' + area + ' sq ft | Mortar Bags Needed: ~' + mortarBags + ' bags (80 lb)',
        badge: 'Modular Standard'
      };
    `,
  },
];
