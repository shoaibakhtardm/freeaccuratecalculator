// src/data/extended/lifestyle.ts
import type { CalculatorEntry } from '../calculatorRegistry';

export const lifestyleCalculators: CalculatorEntry[] = [
  // FOOD
  {
    id: 'recipe-scaler-calculator',
    category: 'food',
    name: 'Recipe Scaler & Converter',
    title: 'Free Recipe Scaler Calculator — Scale Servings & Ingredient Ratios',
    description: 'Scale culinary recipes up or down proportionally by desired serving size or pan yield without changing culinary balances.',
    badge: 'Culinary Math',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Linear Recipe Scaling Multiplier',
      expression: 'Scaled Ingredient = Original Ingredient × (Target Servings ÷ Original Servings)',
      explanation: 'Applies proportional geometric scaling across ingredient lists to maintain flavor and texture integrity.',
      variables: [
        { symbol: 'Scaling Factor', meaning: 'Target Servings ÷ Original Recipe Servings' },
      ],
    },
    example: {
      title: 'Worked Example: Scaling 4 Servings to 10 Servings',
      scenario: 'A cake recipe for 4 servings requires 250 grams of flour. Scale to 10 servings.',
      steps: [
        {
          number: 1,
          title: 'Calculate Scaling Factor',
          description: '10 ÷ 4 = 2.50x multiplier.',
          mathExpression: '2.50x',
        },
        {
          number: 2,
          title: 'Scale Flour',
          description: '250 g × 2.50 = 625 grams.',
          mathExpression: '625 grams',
        },
      ],
      conclusion: 'Use 625 grams of flour for 10 servings.',
    },
    faqs: [
      {
        question: 'Do baking spices and leaveners scale linearly?',
        answer: 'Most ingredients scale directly, but intense spices and leaveners should generally be scaled at ~80% when quadrupling recipes.',
      },
    ],
    inputs: [
      { id: 'original_servings', label: 'Original Recipe Servings', type: 'number', defaultValue: 4, min: 1, max: 1000, unit: 'servings' },
      { id: 'target_servings', label: 'Desired Target Servings', type: 'number', defaultValue: 10, min: 1, max: 5000, unit: 'servings' },
      { id: 'ingredient_amount', label: 'Ingredient Quantity (e.g. Flour)', type: 'number', defaultValue: 250, min: 0.1, max: 100000, step: 0.1, unit: 'g' },
    ],
    defaultResult: {
      label: 'Scaled Ingredient Quantity',
      initialValue: 625,
      decimals: 1,
      secondaryText: 'Recipe Scaling Factor: 2.50x multiplier',
      suffix: ' g',
      accent: 'cyan',
    },
    computeScript: `
      const orig = Math.max(1, Number(inputs.original_servings) || 4);
      const target = Math.max(1, Number(inputs.target_servings) || 10);
      const amt = Math.max(0, Number(inputs.ingredient_amount) || 250);
      const factor = target / orig;
      const scaled = amt * factor;
      return {
        value: scaled,
        secondaryText: 'Multiplier: ' + factor.toFixed(2) + 'x | Original: ' + amt + ' for ' + orig + ' servings',
        badge: factor.toFixed(2) + 'x Scale'
      };
    `,
  },
  {
    id: 'macronutrient-calculator',
    category: 'food',
    name: 'Macronutrient Ratio Tool',
    title: 'Free Macronutrient Calculator — Grams from Caloric Percentages',
    description: 'Convert daily calorie targets into exact gram breakdowns for carbohydrates (4 kcal/g), protein (4 kcal/g), and dietary fat (9 kcal/g).',
    badge: 'Nutrition Partitioning',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Macronutrient Energy Density Standard',
      expression: 'Carb Grams = (Total kcal × Carb %) ÷ 4 ; Protein Grams = (Total kcal × Protein %) ÷ 4 ; Fat Grams = (Total kcal × Fat %) ÷ 9',
      explanation: 'Translates percentage macro targets into physical food mass based on standard Atwater energy values.',
      variables: [
        { symbol: 'Carbohydrates & Protein', meaning: '4 calories per gram of mass' },
        { symbol: 'Dietary Fat', meaning: '9 calories per gram of mass' },
      ],
    },
    example: {
      title: 'Worked Example: 2,000 kcal Diet (40/30/30 Macro Split)',
      scenario: '2,000 daily calories targeted at 40% carbs, 30% protein, and 30% fat.',
      steps: [
        {
          number: 1,
          title: 'Calculate Grams',
          description: 'Carbs: (2000 × 0.40) ÷ 4 = 200g ; Protein: (2000 × 0.30) ÷ 4 = 150g ; Fat: (2000 × 0.30) ÷ 9 = 67g.',
          mathExpression: '200g C / 150g P / 67g F',
        },
      ],
      conclusion: 'Target 200g carbohydrates, 150g protein, and 67g healthy fats daily.',
    },
    faqs: [
      {
        question: 'What is a standard balanced macro ratio?',
        answer: 'The USDA Dietary Guidelines recommend 45%-65% carbohydrates, 10%-35% protein, and 20%-35% healthy dietary fats.',
      },
    ],
    inputs: [
      { id: 'daily_calories', label: 'Daily Caloric Target', type: 'number', defaultValue: 2000, min: 500, max: 10000, unit: 'kcal' },
      { id: 'carb_pct', label: 'Carbohydrates %', type: 'number', defaultValue: 40, min: 0, max: 100, unit: '%' },
      { id: 'protein_pct', label: 'Protein %', type: 'number', defaultValue: 30, min: 0, max: 100, unit: '%' },
      { id: 'fat_pct', label: 'Fat %', type: 'number', defaultValue: 30, min: 0, max: 100, unit: '%' },
    ],
    defaultResult: {
      label: 'Daily Protein Target',
      initialValue: 150,
      decimals: 0,
      secondaryText: 'Carbohydrates: 200g | Dietary Fat: 67g',
      suffix: ' g protein',
      accent: 'link',
    },
    computeScript: `
      const kcal = Math.max(500, Number(inputs.daily_calories) || 2000);
      const cPct = Number(inputs.carb_pct) || 40;
      const pPct = Number(inputs.protein_pct) || 30;
      const fPct = Number(inputs.fat_pct) || 30;
      const carbGrams = (kcal * (cPct / 100)) / 4;
      const protGrams = (kcal * (pPct / 100)) / 4;
      const fatGrams = (kcal * (fPct / 100)) / 9;
      return {
        value: protGrams,
        secondaryText: 'Carbs: ' + Math.round(carbGrams) + 'g (' + cPct + '%) | Fat: ' + Math.round(fatGrams) + 'g (' + fPct + '%)',
        badge: 'Macros Calculated'
      };
    `,
  },
  {
    id: 'bakers-percentage-calculator',
    category: 'food',
    name: 'Baker’s Percentage Tool',
    title: 'Free Baker’s Percentage Calculator — Bread Dough Hydration & Ratios',
    description: 'Calculate professional artisan bread formulas where flour is indexed at 100% and hydration, salt, and yeast scale proportionally.',
    badge: 'Artisan Baking',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Baker’s Math Percentage Notation',
      expression: 'Ingredient % = (Ingredient Weight ÷ Total Flour Weight) × 100',
      explanation: 'The universal baking notation where flour is always defined as the 100% reference baseline.',
      variables: [
        { symbol: 'Hydration', meaning: 'Water weight relative to total flour weight' },
      ],
    },
    example: {
      title: 'Worked Example: 1,000g Flour at 70% Hydration',
      scenario: '1,000g bread flour with 70% hydration, 2% salt, and 1% yeast.',
      steps: [
        {
          number: 1,
          title: 'Calculate Ingredient Masses',
          description: 'Water = 700g ; Salt = 20g ; Yeast = 10g.',
          mathExpression: '700g water / 20g salt / 10g yeast',
        },
      ],
      conclusion: 'Total dough batch is 1,730 grams.',
    },
    faqs: [
      {
        question: 'Why is hydration so important in bread making?',
        answer: 'Higher hydration doughs (75%-85%) produce more open, airy crumb structures with thin crispy crusts, typical of ciabatta and sourdough.',
      },
    ],
    inputs: [
      { id: 'flour_weight', label: 'Total Flour Weight (100%)', type: 'number', defaultValue: 1000, min: 10, max: 100000, unit: 'g' },
      { id: 'hydration_pct', label: 'Hydration % (Water)', type: 'number', defaultValue: 70, min: 40, max: 100, step: 0.5, unit: '%' },
      { id: 'salt_pct', label: 'Salt %', type: 'number', defaultValue: 2.0, min: 0.5, max: 5, step: 0.1, unit: '%' },
      { id: 'yeast_pct', label: 'Yeast / Sourdough Starter %', type: 'number', defaultValue: 1.0, min: 0.1, max: 30, step: 0.1, unit: '%' },
    ],
    defaultResult: {
      label: 'Water Quantity (Hydration)',
      initialValue: 700,
      decimals: 1,
      secondaryText: 'Salt: 20g | Yeast: 10g | Total Dough: 1,730g',
      suffix: ' g water',
      accent: 'violet',
    },
    computeScript: `
      const flour = Math.max(10, Number(inputs.flour_weight) || 1000);
      const hyd = Number(inputs.hydration_pct) || 70;
      const saltPct = Number(inputs.salt_pct) || 2.0;
      const yeastPct = Number(inputs.yeast_pct) || 1.0;
      const water = flour * (hyd / 100);
      const salt = flour * (saltPct / 100);
      const yeast = flour * (yeastPct / 100);
      const total = flour + water + salt + yeast;
      return {
        value: water,
        secondaryText: 'Salt: ' + salt.toFixed(1) + 'g | Yeast: ' + yeast.toFixed(1) + 'g | Batch: ' + Math.round(total) + 'g dough',
        badge: hyd + '% Hydration'
      };
    `,
  },
  {
    id: 'calorie-per-serving-calculator',
    category: 'food',
    name: 'Calorie per Serving Tool',
    title: 'Free Calorie per Serving Calculator — Recipe Nutritional Breakdown',
    description: 'Calculate nutritional energy per single food portion from gross batch calories and designated portion counts.',
    badge: 'Portion Control',
    badgeColor: 'text-magenta border-magenta/30 bg-magenta/10',
    formula: {
      name: 'Portion Calorie Division Formula',
      expression: 'Calories per Serving = Total Recipe Calories ÷ Number of Servings',
      explanation: 'Allocates aggregate macro caloric yield evenly across prepared food portions.',
      variables: [
        { symbol: 'Total Recipe Calories', meaning: 'Sum of all raw recipe ingredients before cooking' },
      ],
    },
    example: {
      title: 'Worked Example: 2,400 kcal Casserole in 6 Servings',
      scenario: 'A dinner recipe totaling 2,400 calories sliced into 6 equal portions.',
      steps: [
        {
          number: 1,
          title: 'Divide Calories by Servings',
          description: '2,400 kcal ÷ 6 servings = 400 kcal per serving.',
          mathExpression: '400 kcal',
        },
      ],
      conclusion: 'Each individual serving provides 400 calories.',
    },
    faqs: [
      {
        question: 'Does cooking evaporate calories?',
        answer: 'No. Water evaporates during cooking which concentrates caloric density per gram, but total calories across the entire dish remain unchanged.',
      },
    ],
    inputs: [
      { id: 'total_recipe_calories', label: 'Total Recipe Calories', type: 'number', defaultValue: 2400, min: 10, max: 100000, unit: 'kcal' },
      { id: 'servings_count', label: 'Number of Servings', type: 'number', defaultValue: 6, min: 1, max: 100, unit: 'portions' },
    ],
    defaultResult: {
      label: 'Calories per Portion',
      initialValue: 400,
      decimals: 0,
      secondaryText: 'Total meal batch: 2,400 kcal across 6 portions',
      suffix: ' kcal',
      accent: 'magenta',
    },
    computeScript: `
      const total = Math.max(1, Number(inputs.total_recipe_calories) || 2400);
      const servings = Math.max(1, Number(inputs.servings_count) || 6);
      const perPortion = total / servings;
      return {
        value: perPortion,
        secondaryText: 'Total: ' + total.toLocaleString() + ' kcal across ' + servings + ' portions',
        badge: Math.round(perPortion) + ' kcal/portion'
      };
    `,
  },

  // SPORTS
  {
    id: 'heart-rate-zone-calculator',
    category: 'sports',
    name: 'Target Heart Rate Zone',
    title: 'Free Target Heart Rate Zone Calculator — Tanaka & Karvonen Aerobic Bands',
    description: 'Calculate athletic heart rate training zones (Zone 1 Recovery through Zone 5 VO2 Max) based on age and resting pulse.',
    badge: 'Cardio Physiology',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Tanaka & Karvonen Target Heart Rate Equations',
      expression: 'HR_max = 208 - (0.7 × Age) ; Zone Target = HR_rest + [(HR_max - HR_rest) × Intensity %]',
      explanation: 'Uses Heart Rate Reserve (HRR) to calibrate personalized aerobic and anaerobic conditioning zones.',
      variables: [
        { symbol: 'Zone 2 (Aerobic Base)', meaning: '60% to 70% of Heart Rate Reserve' },
      ],
    },
    example: {
      title: 'Worked Example: 30-Year-Old Runner (Resting HR 60)',
      scenario: 'Age 30 with a resting heart rate of 60 bpm.',
      steps: [
        {
          number: 1,
          title: 'Calculate Zone 2 (60-70%)',
          description: '60 + [(187 - 60) × 0.60] to 60 + [(187 - 60) × 0.70] = 136 to 149 bpm.',
          mathExpression: '136 - 149 bpm',
        },
      ],
      conclusion: 'Zone 2 aerobic endurance training range is 136 to 149 bpm.',
    },
    faqs: [
      {
        question: 'Why is Zone 2 training important?',
        answer: 'Zone 2 training stimulates mitochondrial density and maximizes fat oxidation without accumulating systemic muscular fatigue.',
      },
    ],
    inputs: [
      { id: 'athlete_age', label: 'Age', type: 'number', defaultValue: 30, min: 10, max: 100, unit: 'yrs' },
      { id: 'resting_hr', label: 'Resting Heart Rate', type: 'number', defaultValue: 60, min: 30, max: 120, unit: 'bpm' },
    ],
    defaultResult: {
      label: 'Zone 2 Target (Aerobic Base)',
      initialValue: 142,
      decimals: 0,
      secondaryText: 'Zone 2 Range: 136 - 149 bpm | Max HR: 187 bpm',
      suffix: ' bpm',
      accent: 'cyan',
    },
    computeScript: `
      const age = Math.max(10, Number(inputs.athlete_age) || 30);
      const rhr = Math.max(30, Number(inputs.resting_hr) || 60);
      const maxHr = 208 - (0.7 * age);
      const hrr = maxHr - rhr;
      const z2Low = rhr + (hrr * 0.60);
      const z2High = rhr + (hrr * 0.70);
      const z2Mid = (z2Low + z2High) / 2;
      return {
        value: z2Mid,
        secondaryText: 'Zone 2: ' + Math.round(z2Low) + '–' + Math.round(z2High) + ' bpm | Max HR: ' + Math.round(maxHr) + ' bpm',
        badge: 'Zone 2 Aerobic'
      };
    `,
  },
  {
    id: 'one-rep-max-calculator',
    category: 'sports',
    name: 'One-Rep Max (1RM) Tool',
    title: 'Free One-Rep Max Calculator — Brzycki & Epley Strength Formula',
    description: 'Calculate maximum single-repetition lift capacity (1RM) and percentage training loads (60% to 95%) from submaximal working sets.',
    badge: 'Strength Standards',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Brzycki 1RM Equation',
      expression: '1RM = Weight Lifted ÷ [1.0278 - (0.0278 × Repetitions)]',
      explanation: 'Scientifically validated powerlifting equation predicting maximal neuromuscular force from submaximal lift repetitions.',
      variables: [
        { symbol: 'Weight Lifted', meaning: 'Weight successfully lifted with strict form' },
      ],
    },
    example: {
      title: 'Worked Example: 225 lbs for 5 Repetitions',
      scenario: 'Bench pressing 225 lbs for 5 clean repetitions.',
      steps: [
        {
          number: 1,
          title: 'Calculate Predicted 1RM',
          description: '225 ÷ [1.0278 - (0.0278 × 5)] = 253.15 lbs.',
          mathExpression: '253 lbs',
        },
      ],
      conclusion: 'Estimated 1RM is 253 lbs.',
    },
    faqs: [
      {
        question: 'Why is testing submaximal reps safer than true 1RM?',
        answer: 'True 1RM attempts pose higher tendon and joint injury risks. Submaximal estimation provides equal programming accuracy without extreme fatigue.',
      },
    ],
    inputs: [
      { id: 'weight_lifted', label: 'Weight Lifted', type: 'number', defaultValue: 225, min: 10, max: 1500, unit: 'lbs' },
      { id: 'reps_performed', label: 'Repetitions Completed', type: 'number', defaultValue: 5, min: 1, max: 15, unit: 'reps' },
    ],
    defaultResult: {
      label: 'Estimated One-Rep Max (1RM)',
      initialValue: 253,
      decimals: 0,
      secondaryText: '90% Working Load: 228 lbs | 80% Hypertrophy: 202 lbs',
      suffix: ' lbs',
      accent: 'link',
    },
    computeScript: `
      const w = Math.max(1, Number(inputs.weight_lifted) || 225);
      const r = Math.min(15, Math.max(1, Number(inputs.reps_performed) || 5));
      const oneRm = r === 1 ? w : w / (1.0278 - (0.0278 * r));
      return {
        value: oneRm,
        secondaryText: '90%: ' + Math.round(oneRm * 0.90) + ' lbs | 80%: ' + Math.round(oneRm * 0.80) + ' lbs | 70%: ' + Math.round(oneRm * 0.70) + ' lbs',
        badge: 'Calculated 1RM'
      };
    `,
  },
  {
    id: 'golf-handicap-calculator',
    category: 'sports',
    name: 'Golf Handicap Estimator',
    title: 'Free Golf Handicap Calculator — USGA WHS Score Differential',
    description: 'Calculate World Handicap System (WHS) score differentials based on 18-hole gross scores, course rating, and slope rating.',
    badge: 'USGA WHS Standard',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'WHS Score Differential Equation',
      expression: 'Differential = (Adjusted Gross Score - Course Rating) × (113 ÷ Slope Rating)',
      explanation: 'Normalizes raw golf scores against standard reference course difficulty (standard slope = 113).',
      variables: [
        { symbol: 'Course Rating', meaning: 'Expected 18-hole score for a scratch (0 handicap) golfer' },
        { symbol: 'Slope Rating', meaning: 'Relative course difficulty for a bogey golfer compared to scratch' },
      ],
    },
    example: {
      title: 'Worked Example: Score of 85 on Rating 71.5 / Slope 125',
      scenario: 'Shot an 85 on a course with 71.5 course rating and 125 slope.',
      steps: [
        {
          number: 1,
          title: 'Calculate Differential',
          description: '(85 - 71.5) × (113 ÷ 125) = 13.5 × 0.904 = 12.20.',
          mathExpression: '12.2',
        },
      ],
      conclusion: 'The round generates a score differential of 12.2.',
    },
    faqs: [
      {
        question: 'How is a handicap index determined under WHS?',
        answer: 'The World Handicap System averages the lowest 8 score differentials from your most recent 20 posted 18-hole rounds.',
      },
    ],
    inputs: [
      { id: 'gross_score', label: '18-Hole Gross Score', type: 'number', defaultValue: 85, min: 50, max: 150, unit: 'strokes' },
      { id: 'course_rating', label: 'Course Rating', type: 'number', defaultValue: 71.5, min: 60, max: 80, step: 0.1, unit: '' },
      { id: 'slope_rating', label: 'Slope Rating', type: 'number', defaultValue: 125, min: 55, max: 155, unit: '' },
    ],
    defaultResult: {
      label: 'Score Differential',
      initialValue: 12.20,
      decimals: 1,
      secondaryText: 'Normalized against standard difficulty (113)',
      accent: 'violet',
    },
    computeScript: `
      const score = Math.max(50, Number(inputs.gross_score) || 85);
      const rating = Math.max(50, Number(inputs.course_rating) || 71.5);
      const slope = Math.max(55, Number(inputs.slope_rating) || 125);
      const diff = (score - rating) * (113 / slope);
      return {
        value: diff,
        secondaryText: 'Course Rating: ' + rating + ' | Slope: ' + slope + ' | Over Par: +' + (score - Math.round(rating)),
        badge: 'WHS Official'
      };
    `,
  },

  // ECOLOGY
  {
    id: 'carbon-footprint-calculator',
    category: 'ecology',
    name: 'Carbon Footprint Calculator',
    title: 'Free Carbon Footprint Calculator — Annual Greenhouse Gas Emissions',
    description: 'Calculate your annual household greenhouse gas footprint in metric tons of CO₂ equivalent across electricity, vehicle fuel, and air travel.',
    badge: 'EPA Emissions Factor',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Annual GHG Carbon Intensity Formula',
      expression: 'CO₂e = (kWh × 0.85 lb) + (Miles ÷ MPG × 19.6 lb) + (Flight Hours × 200 lb)',
      explanation: 'Applies EPA emission factors converting electricity consumption, gasoline combustion, and aviation into metric tons of CO₂e.',
      variables: [
        { symbol: '1 Metric Ton', meaning: '2,204.62 pounds of CO₂ emissions' },
      ],
    },
    example: {
      title: 'Worked Example: Average Household',
      scenario: '800 kWh monthly electricity, 12,000 annual driving miles (25 MPG), and 4 annual flight hours.',
      steps: [
        {
          number: 1,
          title: 'Calculate Emissions',
          description: 'Electricity: 3.7 t + Vehicle: 4.3 t + Flights: 0.4 t = 8.4 metric tons.',
          mathExpression: '8.4 tons CO₂e',
        },
      ],
      conclusion: 'Total annual footprint is 8.4 metric tons of CO₂ equivalent.',
    },
    faqs: [
      {
        question: 'What is the largest contributor to household emissions?',
        answer: 'For most households, gasoline vehicle transportation and home electricity/heating make up over 70% of total annual carbon footprint.',
      },
    ],
    inputs: [
      { id: 'monthly_kwh', label: 'Monthly Electricity Use', type: 'number', defaultValue: 800, min: 0, max: 10000, unit: 'kWh' },
      { id: 'annual_miles', label: 'Annual Vehicle Miles Driven', type: 'number', defaultValue: 12000, min: 0, max: 100000, unit: 'miles' },
      { id: 'vehicle_mpg', label: 'Vehicle Fuel Economy (MPG)', type: 'number', defaultValue: 25, min: 10, max: 100, unit: 'MPG' },
      { id: 'flight_hours', label: 'Annual Commercial Flight Hours', type: 'number', defaultValue: 4, min: 0, max: 500, unit: 'hrs' },
    ],
    defaultResult: {
      label: 'Annual Carbon Footprint',
      initialValue: 8.40,
      decimals: 2,
      secondaryText: '8,400 kg of carbon dioxide equivalent (CO₂e)',
      suffix: ' metric tons',
      accent: 'cyan',
    },
    computeScript: `
      const kwh = Math.max(0, Number(inputs.monthly_kwh) || 800) * 12;
      const miles = Math.max(0, Number(inputs.annual_miles) || 12000);
      const mpg = Math.max(1, Number(inputs.vehicle_mpg) || 25);
      const flights = Math.max(0, Number(inputs.flight_hours) || 4);

      const elecLbs = kwh * 0.85;
      const autoLbs = (miles / mpg) * 19.6;
      const flightLbs = flights * 200;
      const totalLbs = elecLbs + autoLbs + flightLbs;
      const metricTons = totalLbs / 2204.62;

      return {
        value: metricTons,
        secondaryText: 'Power: ' + (elecLbs / 2204.62).toFixed(1) + ' t | Auto: ' + (autoLbs / 2204.62).toFixed(1) + ' t | Flights: ' + (flightLbs / 2204.62).toFixed(1) + ' t',
        badge: metricTons < 10 ? 'Below National Avg' : 'Standard Footprint'
      };
    `,
  },
  {
    id: 'solar-energy-calculator',
    category: 'ecology',
    name: 'Solar Panel Energy Tool',
    title: 'Free Solar Panel Calculator — Photovoltaic kWh Generation & Utility Savings',
    description: 'Calculate annual solar photovoltaic power generation and electric utility bill savings from system kilowatt size and peak sun hours.',
    badge: 'NREL Photovoltaic',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'NREL Solar Photovoltaic Generation Model',
      expression: 'Annual kWh = System Size (kW) × Peak Sun Hours × 365 × 0.78 System Derate',
      explanation: 'Applies National Renewable Energy Laboratory (NREL) derate factors for inverter conversion, thermal loss, and wiring resistance.',
      variables: [
        { symbol: '0.78 Derate', meaning: 'Standard industry efficiency after DC-to-AC conversion and shading' },
      ],
    },
    example: {
      title: 'Worked Example: 8 kW Solar System in 4.5 Sun Hours',
      scenario: 'An 8 kW rooftop array with 4.5 average daily peak sun hours and $0.16/kWh electricity cost.',
      steps: [
        {
          number: 1,
          title: 'Calculate Annual Energy',
          description: '8 kW × 4.5 hrs × 365 × 0.78 = 10,249 kWh/year.',
          mathExpression: '10,249 kWh',
        },
      ],
      conclusion: 'The solar array produces 10,249 kWh annually, saving $1,639.84.',
    },
    faqs: [
      {
        question: 'What is a peak sun hour?',
        answer: 'One peak sun hour represents 1,000 Watts per square meter of solar irradiance over a one-hour period, typically averaging 4 to 6 hours daily.',
      },
    ],
    inputs: [
      { id: 'system_size_kw', label: 'Solar Array Capacity (kW DC)', type: 'number', defaultValue: 8, min: 0.5, max: 1000, step: 0.5, unit: 'kW' },
      { id: 'peak_sun_hours', label: 'Average Daily Peak Sun Hours', type: 'number', defaultValue: 4.5, min: 1, max: 10, step: 0.1, unit: 'hrs/day' },
      { id: 'electricity_cost', label: 'Electricity Cost per kWh', type: 'number', defaultValue: 0.16, min: 0.01, max: 2, step: 0.01, unit: '$/kWh' },
    ],
    defaultResult: {
      label: 'Estimated Annual Generation',
      initialValue: 10249,
      decimals: 0,
      secondaryText: 'Annual Utility Bill Savings: $1,639.84/year',
      suffix: ' kWh/yr',
      accent: 'link',
    },
    computeScript: `
      const kw = Math.max(0.1, Number(inputs.system_size_kw) || 8);
      const sun = Math.max(0.5, Number(inputs.peak_sun_hours) || 4.5);
      const cost = Math.max(0.01, Number(inputs.electricity_cost) || 0.16);
      const annualKwh = kw * sun * 365 * 0.78;
      const annualSavings = annualKwh * cost;
      return {
        value: annualKwh,
        secondaryText: 'Annual Savings: $' + Math.round(annualSavings).toLocaleString() + '/yr | Monthly Avg: ' + Math.round(annualKwh / 12) + ' kWh',
        badge: 'Renewable Power'
      };
    `,
  },
  {
    id: 'water-conservation-calculator',
    category: 'ecology',
    name: 'Water Conservation Tool',
    title: 'Free Water Conservation Calculator — Gallons Saved & Utility Reduction',
    description: 'Calculate annual water and money saved by upgrading fixtures to high-efficiency WaterSense showerheads, aerators, and dual-flush toilets.',
    badge: 'WaterSense Model',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Fixture Water Savings Equation',
      expression: 'Gallons Saved = (Old Flow GPM - New Flow GPM) × Minutes × Daily Uses × 365',
      explanation: 'Estimates volumetric potable water conserved by swapping standard fixtures for low-flow EPA WaterSense hardware.',
      variables: [
        { symbol: 'GPM', meaning: 'Gallons per minute volumetric water flow' },
      ],
    },
    example: {
      title: 'Worked Example: Upgrading 2.5 GPM to 1.5 GPM Showerhead',
      scenario: 'Two 10-minute daily showers upgraded from 2.5 GPM to 1.5 GPM.',
      steps: [
        {
          number: 1,
          title: 'Calculate Daily Savings',
          description: '(2.5 - 1.5) × 10 min × 2 showers = 20 gallons/day.',
          mathExpression: '20 gal/day',
        },
      ],
      conclusion: 'Saves 7,300 gallons of water and reduces water heating energy annually.',
    },
    faqs: [
      {
        question: 'Does low-flow mean lower water pressure?',
        answer: 'No. Modern low-flow aerating showerheads mix air into the water stream, maintaining strong sensory pressure while using 30% to 40% less water.',
      },
    ],
    inputs: [
      { id: 'daily_showers', label: 'Daily Showers in Household', type: 'number', defaultValue: 2, min: 1, max: 20, unit: 'showers' },
      { id: 'shower_duration', label: 'Average Shower Duration', type: 'number', defaultValue: 10, min: 1, max: 60, unit: 'mins' },
      { id: 'old_flow_rate', label: 'Old Showerhead Flow Rate', type: 'number', defaultValue: 2.5, min: 1, max: 5, step: 0.1, unit: 'GPM' },
      { id: 'new_flow_rate', label: 'New Low-Flow Rate', type: 'number', defaultValue: 1.5, min: 0.5, max: 2.5, step: 0.1, unit: 'GPM' },
    ],
    defaultResult: {
      label: 'Annual Water Conserved',
      initialValue: 7300,
      decimals: 0,
      secondaryText: 'Daily savings: 20.0 gallons/day',
      suffix: ' gallons/yr',
      accent: 'violet',
    },
    computeScript: `
      const count = Math.max(1, Number(inputs.daily_showers) || 2);
      const mins = Math.max(1, Number(inputs.shower_duration) || 10);
      const oldFlow = Math.max(0.5, Number(inputs.old_flow_rate) || 2.5);
      const newFlow = Math.max(0.1, Number(inputs.new_flow_rate) || 1.5);
      const diff = Math.max(0, oldFlow - newFlow);
      const dailySaved = diff * mins * count;
      const annualSaved = dailySaved * 365;
      return {
        value: annualSaved,
        secondaryText: 'Daily savings: ' + dailySaved.toFixed(1) + ' gal/day | Equivalent to ~' + Math.round(annualSaved / 300) + ' bathtubs',
        badge: 'WaterSense Eco'
      };
    `,
  },
  {
    id: 'compost-ratio-calculator',
    category: 'ecology',
    name: 'Composting C:N Ratio Tool',
    title: 'Free Compost C:N Ratio Calculator — Carbon to Nitrogen Balance',
    description: 'Calculate the optimal Carbon-to-Nitrogen (C:N) ratio for rapid organic composting by balancing browns (carbon) and greens (nitrogen).',
    badge: 'Organic Soil Ecology',
    badgeColor: 'text-magenta border-magenta/30 bg-magenta/10',
    formula: {
      name: 'Ideal Compost Carbon-Nitrogen Equation',
      expression: 'Target Ratio = 30:1 ; Balanced C:N = (C_browns + C_greens) ÷ (N_browns + N_greens)',
      explanation: 'Microorganisms consume carbon for metabolic energy and nitrogen for cellular protein synthesis, thriving optimally at a 25:1 to 30:1 ratio.',
      variables: [
        { symbol: 'Browns', meaning: 'Dry leaves, cardboard, straw (approx. 60:1 C:N)' },
        { symbol: 'Greens', meaning: 'Food scraps, coffee grounds, fresh grass (approx. 15:1 C:N)' },
      ],
    },
    example: {
      title: 'Worked Example: 2 Parts Browns to 1 Part Greens',
      scenario: 'Mixing 20 lbs of dry leaves (60:1) with 10 lbs of vegetable kitchen scraps (15:1).',
      steps: [
        {
          number: 1,
          title: 'Calculate Blended Ratio',
          description: 'Leaves + food scraps combine to produce an optimal ~30:1 C:N blend.',
          mathExpression: '30:1 Target',
        },
      ],
      conclusion: 'The pile reaches ideal 30:1 balance for active aerobic decomposition without foul odors.',
    },
    faqs: [
      {
        question: 'What happens if there is too much nitrogen in compost?',
        answer: 'Excess nitrogen leads to anaerobic ammonia gas release, resulting in strong unpleasant odors and a soggy, compact pile.',
      },
    ],
    inputs: [
      { id: 'browns_weight', label: 'Browns Weight (Dry leaves, paper, straw)', type: 'number', defaultValue: 20, min: 1, max: 10000, unit: 'lbs' },
      { id: 'greens_weight', label: 'Greens Weight (Food scraps, grass clippings)', type: 'number', defaultValue: 10, min: 1, max: 10000, unit: 'lbs' },
    ],
    defaultResult: {
      label: 'Blended Compost Ratio',
      initialValue: 30,
      decimals: 1,
      secondaryText: 'Optimal target: 30:1 | Excellent active decomposition balance',
      suffix: ':1 C:N',
      accent: 'magenta',
    },
    computeScript: `
      const b = Math.max(0.1, Number(inputs.browns_weight) || 20);
      const g = Math.max(0.1, Number(inputs.greens_weight) || 10);
      const totalC = (b * 0.45) + (g * 0.25);
      const totalN = (b * 0.45 / 60) + (g * 0.25 / 15);
      const ratio = totalC / totalN;
      let note = 'Optimal Balance (30:1 target)';
      if (ratio > 40) note = 'Too much carbon (add more greens/scraps)';
      if (ratio < 20) note = 'Too much nitrogen (add more leaves/paper)';
      return {
        value: ratio,
        secondaryText: note + ' | Weight ratio: ' + (b / g).toFixed(1) + ' parts browns per part greens',
        badge: ratio >= 25 && ratio <= 35 ? 'Perfect Balance' : 'Adjust Mix'
      };
    `,
  },

  // CONVERTER
  {
    id: 'length-converter',
    category: 'converter',
    name: 'Length & Distance Converter',
    title: 'Free Length Converter — Meters, Kilometers, Miles, Feet & Inches',
    description: 'Convert distance and length units seamlessly between Metric (m, km, cm) and Imperial (miles, feet, yards, inches) systems.',
    badge: 'NIST Standards',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Standard Metric-Imperial Distance Multipliers',
      expression: '1 Mile = 1.609344 km ; 1 Foot = 0.3048 m ; 1 Inch = 2.54 cm',
      explanation: 'Converts distances using standard international treaty definitions ratified by the National Institute of Standards and Technology.',
      variables: [
        { symbol: 'International Foot', meaning: 'Exactly 0.3048 meters' },
      ],
    },
    example: {
      title: 'Worked Example: Convert 10 Kilometers to Miles',
      scenario: 'Convert 10 km to miles.',
      steps: [
        {
          number: 1,
          title: 'Divide by Conversion Factor',
          description: '10 km ÷ 1.609344 = 6.2137 miles.',
          mathExpression: '6.21 miles',
        },
      ],
      conclusion: '10 kilometers equals 6.2137 miles (or 32,808.4 feet).',
    },
    faqs: [
      {
        question: 'What is the exact definition of an inch?',
        answer: 'Since the 1959 International Yard and Pound Agreement, one inch is legally defined as exactly 25.4 millimeters.',
      },
    ],
    inputs: [
      { id: 'length_val', label: 'Value to Convert', type: 'number', defaultValue: 10, min: 0, max: 1000000000, step: 0.1, unit: '' },
      { id: 'from_unit', label: 'From Unit', type: 'select', defaultValue: 'km', options: [
        { label: 'Kilometers (km)', value: 'km' },
        { label: 'Meters (m)', value: 'm' },
        { label: 'Miles (mi)', value: 'mi' },
        { label: 'Feet (ft)', value: 'ft' },
        { label: 'Yards (yd)', value: 'yd' },
        { label: 'Inches (in)', value: 'in' },
      ]},
      { id: 'to_unit', label: 'To Unit', type: 'select', defaultValue: 'mi', options: [
        { label: 'Miles (mi)', value: 'mi' },
        { label: 'Kilometers (km)', value: 'km' },
        { label: 'Meters (m)', value: 'm' },
        { label: 'Feet (ft)', value: 'ft' },
        { label: 'Yards (yd)', value: 'yd' },
        { label: 'Inches (in)', value: 'in' },
      ]},
    ],
    defaultResult: {
      label: 'Converted Distance',
      initialValue: 6.21,
      decimals: 2,
      secondaryText: '10 km = 6.2137 miles (32,808.40 ft)',
      suffix: ' mi',
      accent: 'cyan',
    },
    computeScript: `
      const val = Math.max(0, Number(inputs.length_val) || 10);
      const from = inputs.from_unit || 'km';
      const to = inputs.to_unit || 'mi';

      const toMeters = {
        m: 1,
        km: 1000,
        mi: 1609.344,
        yd: 0.9144,
        ft: 0.3048,
        in: 0.0254
      };

      const meters = val * (toMeters[from] || 1);
      const result = meters / (toMeters[to] || 1);

      return {
        value: result,
        secondaryText: val + ' ' + from + ' = ' + result.toFixed(4) + ' ' + to + ' (' + meters.toFixed(1) + ' meters)',
        badge: 'Exact Conversion'
      };
    `,
  },
  {
    id: 'weight-converter',
    category: 'converter',
    name: 'Weight & Mass Converter',
    title: 'Free Weight Converter — Kilograms, Grams, Pounds, Ounces & Stone',
    description: 'Convert mass units between Metric (kg, g, metric ton) and Imperial (pounds, ounces, stone) standards with exact decimal precision.',
    badge: 'Standard Mass',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'International Standard Mass Conversions',
      expression: '1 Pound (lb) = 0.45359237 kg ; 1 Kilogram = 2.20462262 lb',
      explanation: 'Precision conversion based on the international avoirdupois pound standard definition.',
      variables: [
        { symbol: '1 Stone (UK)', meaning: 'Exactly 14 avoirdupois pounds (6.35029 kg)' },
      ],
    },
    example: {
      title: 'Worked Example: Convert 70 Kilograms to Pounds',
      scenario: 'Convert 70 kg to pounds.',
      steps: [
        {
          number: 1,
          title: 'Multiply by Factor',
          description: '70 kg × 2.20462 = 154.32 lbs.',
          mathExpression: '154.32 lbs',
        },
      ],
      conclusion: '70 kilograms equals 154.32 pounds.',
    },
    faqs: [
      {
        question: 'What is the difference between weight and mass?',
        answer: 'Mass is an invariant measure of matter quantity (kg), whereas weight is the downward gravitational force exerted on that mass.',
      },
    ],
    inputs: [
      { id: 'mass_val', label: 'Value to Convert', type: 'number', defaultValue: 70, min: 0, max: 1000000000, step: 0.1, unit: '' },
      { id: 'from_mass_unit', label: 'From Unit', type: 'select', defaultValue: 'kg', options: [
        { label: 'Kilograms (kg)', value: 'kg' },
        { label: 'Pounds (lbs)', value: 'lbs' },
        { label: 'Grams (g)', value: 'g' },
        { label: 'Ounces (oz)', value: 'oz' },
        { label: 'Stone (st)', value: 'st' },
      ]},
      { id: 'to_mass_unit', label: 'To Unit', type: 'select', defaultValue: 'lbs', options: [
        { label: 'Pounds (lbs)', value: 'lbs' },
        { label: 'Kilograms (kg)', value: 'kg' },
        { label: 'Grams (g)', value: 'g' },
        { label: 'Ounces (oz)', value: 'oz' },
        { label: 'Stone (st)', value: 'st' },
      ]},
    ],
    defaultResult: {
      label: 'Converted Mass',
      initialValue: 154.32,
      decimals: 2,
      secondaryText: '70 kg = 154.32 lbs (11 stone 0.32 lbs)',
      suffix: ' lbs',
      accent: 'link',
    },
    computeScript: `
      const val = Math.max(0, Number(inputs.mass_val) || 70);
      const from = inputs.from_mass_unit || 'kg';
      const to = inputs.to_mass_unit || 'lbs';

      const toGrams = {
        g: 1,
        kg: 1000,
        lbs: 453.59237,
        oz: 28.349523,
        st: 6350.29318
      };

      const grams = val * (toGrams[from] || 1000);
      const result = grams / (toGrams[to] || 453.59237);

      return {
        value: result,
        secondaryText: val + ' ' + from + ' = ' + result.toFixed(2) + ' ' + to + ' (' + (grams / 1000).toFixed(2) + ' kg)',
        badge: 'Mass Exact'
      };
    `,
  },
  {
    id: 'temperature-converter',
    category: 'converter',
    name: 'Temperature Converter',
    title: 'Free Temperature Converter — Celsius, Fahrenheit & Kelvin Scales',
    description: 'Convert thermal temperatures instantly between Celsius (°C), Fahrenheit (°F), and absolute thermodynamic Kelvin (K) scales.',
    badge: 'Thermodynamics',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Temperature Scale Conversion Equations',
      expression: '°F = (°C × 9 ÷ 5) + 32 ; °C = (°F - 32) × 5 ÷ 9 ; K = °C + 273.15',
      explanation: 'Transforms thermal scale readings between imperial freezing/boiling points (32°F / 212°F) and metric Celsius (0°C / 100°C).',
      variables: [
        { symbol: 'Absolute Zero', meaning: '0 Kelvin (-273.15°C / -459.67°F)' },
      ],
    },
    example: {
      title: 'Worked Example: Convert 20°C to Fahrenheit',
      scenario: 'Convert comfortable room temperature 20°C to Fahrenheit.',
      steps: [
        {
          number: 1,
          title: 'Apply Formula',
          description: '(20 × 9 ÷ 5) + 32 = 36 + 32 = 68°F.',
          mathExpression: '68°F',
        },
      ],
      conclusion: '20°C equals exactly 68°F (and 293.15 K).',
    },
    faqs: [
      {
        question: 'At what temperature are Celsius and Fahrenheit equal?',
        answer: 'Celsius and Fahrenheit read the exact same numerical value at -40 degrees (-40°C = -40°F).',
      },
    ],
    inputs: [
      { id: 'temp_val', label: 'Temperature Value', type: 'number', defaultValue: 20, min: -500, max: 1000000, step: 0.1, unit: '' },
      { id: 'from_temp', label: 'From Scale', type: 'select', defaultValue: 'C', options: [
        { label: 'Celsius (°C)', value: 'C' },
        { label: 'Fahrenheit (°F)', value: 'F' },
        { label: 'Kelvin (K)', value: 'K' },
      ]},
      { id: 'to_temp', label: 'To Scale', type: 'select', defaultValue: 'F', options: [
        { label: 'Fahrenheit (°F)', value: 'F' },
        { label: 'Celsius (°C)', value: 'C' },
        { label: 'Kelvin (K)', value: 'K' },
      ]},
    ],
    defaultResult: {
      label: 'Converted Temperature',
      initialValue: 68.0,
      decimals: 1,
      secondaryText: '20.0°C = 68.0°F | Absolute: 293.15 K',
      suffix: '°F',
      accent: 'violet',
    },
    computeScript: `
      const val = Number(inputs.temp_val) || 20;
      const from = inputs.from_temp || 'C';
      const to = inputs.to_temp || 'F';

      let c = val;
      if (from === 'F') c = (val - 32) * 5 / 9;
      else if (from === 'K') c = val - 273.15;

      let res = c;
      let suffix = '°C';
      if (to === 'F') {
        res = (c * 9 / 5) + 32;
        suffix = '°F';
      } else if (to === 'K') {
        res = c + 273.15;
        suffix = ' K';
      }

      const kelvin = c + 273.15;
      return {
        value: res,
        secondaryText: 'Absolute Kelvin: ' + kelvin.toFixed(2) + ' K | Celsius: ' + c.toFixed(2) + '°C',
        badge: 'Exact Temperature'
      };
    `,
  },
];
