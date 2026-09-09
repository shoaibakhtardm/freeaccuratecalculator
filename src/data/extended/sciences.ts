// src/data/extended/sciences.ts
import type { CalculatorEntry } from '../calculatorRegistry';

export const scienceCalculators: CalculatorEntry[] = [
  // BIOLOGY
  {
    id: 'punnett-square-calculator',
    category: 'biology',
    name: 'Punnett Square Calculator',
    title: 'Free Punnett Square Calculator — Monohybrid Genetic Cross Ratios',
    description: 'Calculate Mendelian genetic cross probabilities, genotypic ratios, and dominant vs recessive phenotype percentages.',
    badge: 'Mendelian Genetics',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Monohybrid Cross Law of Segregation',
      expression: 'Offspring Probabilities = P(Allele 1) × P(Allele 2)',
      explanation: 'Models allele segregation during gamete formation and random fertilization across heterozygous (Bb) and homozygous (BB/bb) pairings.',
      variables: [
        { symbol: 'BB', meaning: 'Homozygous dominant genotype' },
        { symbol: 'Bb', meaning: 'Heterozygous genotype' },
        { symbol: 'bb', meaning: 'Homozygous recessive genotype' },
      ],
    },
    example: {
      title: 'Worked Example: Heterozygous Cross (Bb × Bb)',
      scenario: 'Both parents carry one dominant allele (B) and one recessive allele (b).',
      steps: [
        {
          number: 1,
          title: 'Calculate Genotypes',
          description: '25% BB, 50% Bb, 25% bb (1:2:1 ratio).',
          mathExpression: '1:2:1 Genotype',
        },
        {
          number: 2,
          title: 'Calculate Phenotypes',
          description: '75% Dominant Phenotype, 25% Recessive Phenotype (3:1 ratio).',
          mathExpression: '3:1 Phenotype',
        },
      ],
      conclusion: 'There is a 75% chance offspring express the dominant trait and 25% for recessive.',
    },
    faqs: [
      {
        question: 'What is the difference between genotype and phenotype?',
        answer: 'Genotype refers to the specific genetic allele combination (e.g. Bb), whereas phenotype refers to the physical observable characteristic (e.g. brown eyes).',
      },
    ],
    inputs: [
      { id: 'parent1_genotype', label: 'Parent 1 Genotype', type: 'select', defaultValue: 'Bb', options: [
        { label: 'Heterozygous (Bb)', value: 'Bb' },
        { label: 'Homozygous Dominant (BB)', value: 'BB' },
        { label: 'Homozygous Recessive (bb)', value: 'bb' },
      ]},
      { id: 'parent2_genotype', label: 'Parent 2 Genotype', type: 'select', defaultValue: 'Bb', options: [
        { label: 'Heterozygous (Bb)', value: 'Bb' },
        { label: 'Homozygous Dominant (BB)', value: 'BB' },
        { label: 'Homozygous Recessive (bb)', value: 'bb' },
      ]},
    ],
    defaultResult: {
      label: 'Dominant Phenotype Probability',
      initialValue: 75,
      decimals: 0,
      secondaryText: 'Genotypic Ratio: 25% BB, 50% Bb, 25% bb | Recessive Phenotype: 25%',
      suffix: '%',
      accent: 'cyan',
    },
    computeScript: `
      const p1 = inputs.parent1_genotype || 'Bb';
      const p2 = inputs.parent2_genotype || 'Bb';
      const a1 = p1.split('');
      const a2 = p2.split('');
      const square = [
        [a1[0], a2[0]],
        [a1[0], a2[1]],
        [a1[1], a2[0]],
        [a1[1], a2[1]]
      ].map(pair => pair.sort().join(''));

      let bbCount = 0;
      let BbCount = 0;
      let homRecCount = 0;
      square.forEach(g => {
        if (g === 'BB') bbCount++;
        else if (g === 'Bb' || g === 'bB') BbCount++;
        else if (g === 'bb') homRecCount++;
      });

      const dominant = ((bbCount + BbCount) / 4) * 100;
      const recessive = (homRecCount / 4) * 100;
      return {
        value: dominant,
        secondaryText: 'Genotype: ' + (bbCount * 25) + '% BB, ' + (BbCount * 25) + '% Bb, ' + (homRecCount * 25) + '% bb | Recessive: ' + recessive + '%',
        badge: dominant + '% Dominant'
      };
    `,
  },
  {
    id: 'hardy-weinberg-calculator',
    category: 'biology',
    name: 'Hardy-Weinberg Estimator',
    title: 'Free Hardy-Weinberg Calculator — Allele & Genotype Frequencies',
    description: 'Calculate allele frequencies (p, q) and genotype distributions (p², 2pq, q²) under Hardy-Weinberg genetic population equilibrium.',
    badge: 'Population Genetics',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Hardy-Weinberg Equilibrium Equations',
      expression: 'p + q = 1 ; p² + 2pq + q² = 1',
      explanation: 'In the absence of evolutionary influences, allele and genotype frequencies remain constant across generations.',
      variables: [
        { symbol: 'p²', meaning: 'Frequency of homozygous dominant individuals (AA)' },
        { symbol: '2pq', meaning: 'Frequency of heterozygous individuals (Aa)' },
        { symbol: 'q²', meaning: 'Frequency of homozygous recessive individuals (aa)' },
      ],
    },
    example: {
      title: 'Worked Example: 9% Recessive Phenotype (q² = 0.09)',
      scenario: '9% of a population exhibits a recessive trait.',
      steps: [
        {
          number: 1,
          title: 'Calculate Allele Frequencies',
          description: 'q = √0.09 = 0.30 ; p = 1 - 0.30 = 0.70.',
          mathExpression: 'p = 0.70, q = 0.30',
        },
      ],
      conclusion: '49% are homozygous dominant (p²), 42% are carriers (2pq), and 9% are recessive (q²).',
    },
    faqs: [
      {
        question: 'What is the main utility of Hardy-Weinberg testing?',
        answer: 'It provides a mathematical null model to detect if evolutionary pressures (such as natural selection or non-random mating) are acting on a genetic locus.',
      },
    ],
    inputs: [
      { id: 'recessive_frequency', label: 'Frequency of Recessive Phenotype q² (or trait %)', type: 'number', defaultValue: 9, min: 0.01, max: 100, step: 0.1, unit: '%' },
    ],
    defaultResult: {
      label: 'Carrier (Heterozygous 2pq) Frequency',
      initialValue: 42,
      decimals: 2,
      secondaryText: 'Dominant Allele p = 0.70 | Recessive Allele q = 0.30 | AA (p²) = 49.00%',
      suffix: '%',
      accent: 'link',
    },
    computeScript: `
      const q2 = Math.min(100, Math.max(0.0001, Number(inputs.recessive_frequency) || 9)) / 100;
      const q = Math.sqrt(q2);
      const p = 1 - q;
      const p2 = p * p * 100;
      const two_pq = 2 * p * q * 100;
      return {
        value: two_pq,
        secondaryText: 'Alleles: p = ' + p.toFixed(3) + ', q = ' + q.toFixed(3) + ' | AA: ' + p2.toFixed(1) + '% | aa: ' + (q2 * 100).toFixed(1) + '%',
        badge: 'Equilibrium Validated'
      };
    `,
  },
  {
    id: 'bacterial-growth-calculator',
    category: 'biology',
    name: 'Bacterial Growth Calculator',
    title: 'Free Bacterial Growth Calculator — Exponential Colony Population',
    description: 'Model exponential bacterial colony reproduction rates and generation doubling times in culture media.',
    badge: 'Microbiology Model',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Exponential Bacterial Growth Equation',
      expression: 'Nₜ = N₀ × 2ⁿ ; where n = t ÷ d',
      explanation: 'Models binary fission where initial cell population N₀ doubles every generation interval d over incubation time t.',
      variables: [
        { symbol: 'Nₜ', meaning: 'Final bacterial population' },
        { symbol: 'N₀', meaning: 'Initial inoculum cell count' },
        { symbol: 'n', meaning: 'Number of generations (Time ÷ Doubling Time)' },
      ],
    },
    example: {
      title: 'Worked Example: E. coli Inoculum (20 min doubling time)',
      scenario: '1,000 bacterial cells incubated for 4 hours with a 20-minute generation doubling time.',
      steps: [
        {
          number: 1,
          title: 'Calculate Generations',
          description: '(4 hours × 60 min) ÷ 20 min = 12 generations.',
          mathExpression: '12 generations',
        },
        {
          number: 2,
          title: 'Calculate Final Population',
          description: '1,000 × 2¹² = 1,000 × 4,096 = 4,096,000 cells.',
          mathExpression: '4,096,000 cells',
        },
      ],
      conclusion: 'The colony expands to 4,096,000 bacteria in 4 hours.',
    },
    faqs: [
      {
        question: 'What factors limit bacterial growth?',
        answer: 'Depletion of essential nutrients, oxygen starvation, accumulation of toxic metabolic byproducts, and pH shifts drive bacteria from exponential to stationary phase.',
      },
    ],
    inputs: [
      { id: 'initial_count', label: 'Initial Inoculum Cell Count (N₀)', type: 'number', defaultValue: 1000, min: 1, max: 100000000, unit: 'cells' },
      { id: 'doubling_time', label: 'Doubling / Generation Time', type: 'number', defaultValue: 20, min: 1, max: 10000, unit: 'mins' },
      { id: 'incubation_hours', label: 'Total Incubation Time', type: 'number', defaultValue: 4, min: 0.1, max: 168, step: 0.5, unit: 'hrs' },
    ],
    defaultResult: {
      label: 'Final Bacterial Population',
      initialValue: 4096000,
      decimals: 0,
      secondaryText: '12 generations of binary fission completed',
      suffix: ' cells',
      accent: 'violet',
    },
    computeScript: `
      const n0 = Math.max(1, Number(inputs.initial_count) || 1000);
      const d = Math.max(1, Number(inputs.doubling_time) || 20);
      const hrs = Math.max(0.1, Number(inputs.incubation_hours) || 4);
      const gen = (hrs * 60) / d;
      const finalCount = n0 * Math.pow(2, gen);
      return {
        value: finalCount,
        secondaryText: gen.toFixed(1) + ' generations | Final Count: ' + (finalCount > 1e9 ? finalCount.toExponential(2) : Math.round(finalCount).toLocaleString()) + ' cells',
        badge: 'Exponential Phase'
      };
    `,
  },
  {
    id: 'molecular-weight-calculator',
    category: 'biology',
    name: 'DNA / RNA Molecular Weight',
    title: 'Free DNA / RNA Molecular Weight Calculator — Oligo Mass Estimator',
    description: 'Estimate molecular mass (Daltons / g/mol) of double-stranded DNA, single-stranded DNA, and RNA oligonucleotides by sequence length.',
    badge: 'Biochemistry',
    badgeColor: 'text-magenta border-magenta/30 bg-magenta/10',
    formula: {
      name: 'Oligonucleotide Average Mass Approximations',
      expression: 'dsDNA Mass = Length (bp) × 660 Da ; ssRNA Mass = Length (nt) × 340 Da',
      explanation: 'Calculates standard biochemical molar mass based on average nucleotide monophosphate dalton weights.',
      variables: [
        { symbol: '1 Dalton (Da)', meaning: '1 g/mol molar mass equivalent' },
      ],
    },
    example: {
      title: 'Worked Example: 1,000 bp dsDNA Gene Fragment',
      scenario: 'A PCR amplicon of 1,000 base pairs double-stranded DNA.',
      steps: [
        {
          number: 1,
          title: 'Calculate Molecular Weight',
          description: '1,000 bp × 660 Da/bp = 660,000 Da (660 kDa).',
          mathExpression: '660,000 Da',
        },
      ],
      conclusion: 'The DNA amplicon has a molecular weight of approximately 660,000 g/mol.',
    },
    faqs: [
      {
        question: 'Why is molecular weight important in molecular biology?',
        answer: 'Accurate molecular weight is required to calculate molar concentrations when preparing primers, PCR amplicons, and transfection vectors.',
      },
    ],
    inputs: [
      { id: 'sequence_length', label: 'Sequence Length', type: 'number', defaultValue: 1000, min: 1, max: 10000000, unit: 'bases' },
      { id: 'molecule_type', label: 'Nucleic Acid Type', type: 'select', defaultValue: 'dsDNA', options: [
        { label: 'Double-Stranded DNA (dsDNA)', value: 'dsDNA' },
        { label: 'Single-Stranded DNA (ssDNA)', value: 'ssDNA' },
        { label: 'Single-Stranded RNA (ssRNA)', value: 'ssRNA' },
      ]},
    ],
    defaultResult: {
      label: 'Estimated Molecular Weight',
      initialValue: 660,
      decimals: 2,
      secondaryText: '660,000 Daltons (g/mol)',
      suffix: ' kDa',
      accent: 'magenta',
    },
    computeScript: `
      const len = Math.max(1, Number(inputs.sequence_length) || 1000);
      const type = inputs.molecule_type || 'dsDNA';
      const factor = type === 'dsDNA' ? 660 : (type === 'ssDNA' ? 330 : 340);
      const da = len * factor;
      const kda = da / 1000;
      return {
        value: kda,
        secondaryText: da.toLocaleString() + ' g/mol (Da) | Length: ' + len.toLocaleString() + ' ' + (type === 'dsDNA' ? 'bp' : 'nt'),
        badge: type
      };
    `,
  },

  // CHEMISTRY
  {
    id: 'molar-mass-calculator',
    category: 'chemistry',
    name: 'Molar Mass Calculator',
    title: 'Free Molar Mass Calculator — Grams to Moles & Molecular Weight',
    description: 'Calculate molecular mass and convert between chemical mass in grams and molar quantity in moles using stoichiometric stoichiometry.',
    badge: 'Stoichiometry',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Molar Mass & Quantity Relation',
      expression: 'Moles (mol) = Mass (g) ÷ Molar Mass (g/mol)',
      explanation: 'Relates macroscopic substance mass to microscopic atomic quantities using Avogadro’s constant.',
      variables: [
        { symbol: 'Molar Mass', meaning: 'Sum of standard atomic weights of constituent chemical elements' },
      ],
    },
    example: {
      title: 'Worked Example: 90 Grams of Water (H₂O)',
      scenario: 'Water has a molar mass of 18.015 g/mol. Convert 90 grams to moles.',
      steps: [
        {
          number: 1,
          title: 'Calculate Moles',
          description: '90 g ÷ 18.015 g/mol = 5.00 moles.',
          mathExpression: '5.00 mol',
        },
      ],
      conclusion: '90 grams of water contains exactly 5.00 moles.',
    },
    faqs: [
      {
        question: 'Where can I find compound molar mass?',
        answer: 'Sum the atomic masses of each element from the periodic table according to their chemical formula subscript ratios.',
      },
    ],
    inputs: [
      { id: 'substance_mass', label: 'Mass of Substance', type: 'number', defaultValue: 90, min: 0.001, max: 1000000, step: 0.1, unit: 'g' },
      { id: 'molar_mass', label: 'Molar Mass of Compound', type: 'number', defaultValue: 18.015, min: 1, max: 5000, step: 0.001, unit: 'g/mol' },
    ],
    defaultResult: {
      label: 'Molar Quantity',
      initialValue: 5.00,
      decimals: 2,
      secondaryText: 'Molecule Count: ~3.01 × 10²⁴ molecules',
      suffix: ' mol',
      accent: 'cyan',
    },
    computeScript: `
      const mass = Math.max(0, Number(inputs.substance_mass) || 90);
      const mm = Math.max(0.1, Number(inputs.molar_mass) || 18.015);
      const moles = mass / mm;
      const molecules = (moles * 6.02214e23).toExponential(2);
      return {
        value: moles,
        secondaryText: 'Molecules: ~' + molecules + ' | Mass: ' + mass + ' g at ' + mm + ' g/mol',
        badge: 'Exact Stoichiometry'
      };
    `,
  },
  {
    id: 'solution-dilution-calculator',
    category: 'chemistry',
    name: 'Solution Dilution (C1V1)',
    title: 'Free Solution Dilution Calculator — C₁V₁ = C₂V₂ Concentration Formula',
    description: 'Calculate stock solution volume and solvent additions required to achieve a target working concentration.',
    badge: 'Lab Formulation',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Conservation of Solute Equation',
      expression: 'C₁ × V₁ = C₂ × V₂',
      explanation: 'Because total solute mass remains constant during dilution, the product of initial concentration and volume equals final concentration and volume.',
      variables: [
        { symbol: 'C₁', meaning: 'Initial stock solution concentration' },
        { symbol: 'V₁', meaning: 'Volume of stock solution required' },
        { symbol: 'C₂', meaning: 'Target final working concentration' },
        { symbol: 'V₂', meaning: 'Target final total volume' },
      ],
    },
    example: {
      title: 'Worked Example: Diluting 10M HCl to 2M in 500 mL',
      scenario: 'Stock acid is 10 M. Prepare 500 mL of 2 M solution.',
      steps: [
        {
          number: 1,
          title: 'Calculate Stock Volume V₁',
          description: 'V₁ = (C₂ × V₂) ÷ C₁ = (2 M × 500 mL) ÷ 10 M = 100 mL.',
          mathExpression: '100 mL',
        },
      ],
      conclusion: 'Add 100 mL of 10M stock to 400 mL of solvent to yield 500 mL of 2M solution.',
    },
    faqs: [
      {
        question: 'What is the safety rule for acid dilutions?',
        answer: 'Always add acid to water, never water to acid, to prevent rapid heat accumulation and corrosive splattering.',
      },
    ],
    inputs: [
      { id: 'initial_conc', label: 'Stock Concentration (C₁)', type: 'number', defaultValue: 10, min: 0.001, max: 10000, step: 0.1, unit: 'M' },
      { id: 'target_conc', label: 'Target Final Concentration (C₂)', type: 'number', defaultValue: 2, min: 0.001, max: 10000, step: 0.1, unit: 'M' },
      { id: 'final_vol', label: 'Final Total Volume (V₂)', type: 'number', defaultValue: 500, min: 0.1, max: 1000000, step: 1, unit: 'mL' },
    ],
    defaultResult: {
      label: 'Stock Solution Required (V₁)',
      initialValue: 100,
      decimals: 2,
      secondaryText: 'Add 400.00 mL of solvent (water) to complete dilution',
      suffix: ' mL',
      accent: 'link',
    },
    computeScript: `
      const c1 = Math.max(0.001, Number(inputs.initial_conc) || 10);
      const c2 = Math.max(0.001, Number(inputs.target_conc) || 2);
      const v2 = Math.max(0.1, Number(inputs.final_vol) || 500);
      const v1 = (c2 * v2) / c1;
      const solvent = Math.max(0, v2 - v1);
      return {
        value: v1,
        secondaryText: 'Solvent to add: ' + solvent.toFixed(1) + ' mL | Dilution factor: ' + (c1 / c2).toFixed(1) + 'x',
        badge: 'Accurate Dilution'
      };
    `,
  },
  {
    id: 'ph-calculator',
    category: 'chemistry',
    name: 'pH & pOH Calculator',
    title: 'Free pH Calculator — Hydrogen Ion Concentration [H⁺] & pOH',
    description: 'Calculate solution pH, pOH, hydronium concentration [H⁺], and hydroxide concentration [OH⁻] across acids and bases.',
    badge: 'Acid-Base Equilibria',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Logarithmic pH Equations',
      expression: 'pH = -log₁₀[H⁺] ; pOH = 14 - pH ; [OH⁻] = 10⁻ᵖᴼᴴ',
      explanation: 'Measures aqueous acidity on a negative logarithmic scale of hydrogen ion thermodynamic activity at 25°C.',
      variables: [
        { symbol: '[H⁺]', meaning: 'Molar hydrogen / hydronium concentration in mol/L' },
      ],
    },
    example: {
      title: 'Worked Example: 0.001 M HCl Solution',
      scenario: 'Hydrochloric acid with [H⁺] = 1 × 10⁻³ mol/L.',
      steps: [
        {
          number: 1,
          title: 'Calculate pH',
          description: '-log₁₀(1 × 10⁻³) = 3.00.',
          mathExpression: 'pH 3.00',
        },
      ],
      conclusion: 'The solution is strongly acidic with a pH of 3.00.',
    },
    faqs: [
      {
        question: 'What is the neutral pH at standard temperature?',
        answer: 'At 25°C (room temperature), neutral pure water has [H⁺] = [OH⁻] = 1.0 × 10⁻⁷ M, yielding exactly pH 7.00.',
      },
    ],
    inputs: [
      { id: 'hydrogen_conc', label: 'Hydrogen Ion Concentration [H⁺]', type: 'number', defaultValue: 0.001, min: 1e-15, max: 10, step: 0.0001, unit: 'mol/L' },
    ],
    defaultResult: {
      label: 'Solution pH',
      initialValue: 3.00,
      decimals: 2,
      secondaryText: 'pOH: 11.00 | Strongly Acidic',
      accent: 'violet',
    },
    computeScript: `
      const h = Math.max(1e-15, Number(inputs.hydrogen_conc) || 0.001);
      const ph = -Math.log10(h);
      const poh = 14 - ph;
      const status = ph < 6.5 ? 'Acidic' : (ph > 7.5 ? 'Basic / Alkaline' : 'Neutral');
      return {
        value: ph,
        secondaryText: 'pOH: ' + poh.toFixed(2) + ' | Classification: ' + status,
        badge: status
      };
    `,
  },
  {
    id: 'stoichiometry-calculator',
    category: 'chemistry',
    name: 'Stoichiometry Calculator',
    title: 'Free Stoichiometry Calculator — Theoretical Yield & Percent Yield',
    description: 'Calculate theoretical product yield and reaction percent efficiency based on molar stoichiometric ratios and actual isolated yield.',
    badge: 'Reaction Yield',
    badgeColor: 'text-magenta border-magenta/30 bg-magenta/10',
    formula: {
      name: 'Chemical Percent Yield Formula',
      expression: 'Percent Yield = (Actual Isolated Mass ÷ Theoretical Mass) × 100',
      explanation: 'Compares practical laboratory synthesized yield with maximum stoichiometric theoretical product mass.',
      variables: [
        { symbol: 'Theoretical Yield', meaning: 'Maximum product mass possible assuming 100% complete reaction' },
      ],
    },
    example: {
      title: 'Worked Example: 45g Actual vs 50g Theoretical',
      scenario: 'A synthesis predicts 50.0 grams theoretical yield, yielding 45.0 grams after purification.',
      steps: [
        {
          number: 1,
          title: 'Calculate Percent Yield',
          description: '(45.0 g ÷ 50.0 g) × 100 = 90.00%.',
          mathExpression: '90.00%',
        },
      ],
      conclusion: 'The reaction completed with a 90.00% chemical yield.',
    },
    faqs: [
      {
        question: 'What is a limiting reagent?',
        answer: 'The limiting reagent is the reactant completely consumed first in a chemical reaction, thereby limiting the theoretical maximum amount of product formed.',
      },
    ],
    inputs: [
      { id: 'actual_yield', label: 'Actual Isolated Product Mass', type: 'number', defaultValue: 45, min: 0, max: 100000, step: 0.1, unit: 'g' },
      { id: 'theoretical_yield', label: 'Theoretical Maximum Yield', type: 'number', defaultValue: 50, min: 0.1, max: 100000, step: 0.1, unit: 'g' },
    ],
    defaultResult: {
      label: 'Percent Reaction Yield',
      initialValue: 90.00,
      decimals: 2,
      secondaryText: 'Mass Loss: 5.00 grams (10.00% deficiency)',
      suffix: '%',
      accent: 'magenta',
    },
    computeScript: `
      const actual = Math.max(0, Number(inputs.actual_yield) || 45);
      const theo = Math.max(0.01, Number(inputs.theoretical_yield) || 50);
      const yieldPct = (actual / theo) * 100;
      const diff = theo - actual;
      return {
        value: yieldPct,
        secondaryText: 'Isolated: ' + actual.toFixed(1) + ' g | Theoretical: ' + theo.toFixed(1) + ' g | Unrecovered: ' + diff.toFixed(1) + ' g',
        badge: yieldPct >= 80 ? 'High Yield' : 'Moderate Yield'
      };
    `,
  },

  // PHYSICS
  {
    id: 'velocity-acceleration-calculator',
    category: 'physics',
    name: 'Velocity & Acceleration',
    title: 'Free Velocity & Acceleration Calculator — Kinematic Equations of Motion',
    description: 'Solve classical Newtonian kinematics: final velocity, constant acceleration, elapsed time, and total displacement.',
    badge: 'Newtonian Mechanics',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Kinematic Equations of Uniform Acceleration',
      expression: 'v = u + at ; s = ut + ½at²',
      explanation: 'Relates velocity, acceleration, elapsed time, and displacement in a reference frame with constant acceleration.',
      variables: [
        { symbol: 'v', meaning: 'Final velocity (m/s)' },
        { symbol: 'u', meaning: 'Initial starting velocity (m/s)' },
        { symbol: 'a', meaning: 'Constant acceleration (m/s²)' },
        { symbol: 't', meaning: 'Time interval (s)' },
      ],
    },
    example: {
      title: 'Worked Example: Car accelerating from 0 to 20 m/s',
      scenario: 'Starting from rest (u = 0) with a constant acceleration of 4 m/s² over 5 seconds.',
      steps: [
        {
          number: 1,
          title: 'Calculate Final Velocity',
          description: 'v = 0 + (4 × 5) = 20 m/s (72 km/h).',
          mathExpression: '20 m/s',
        },
      ],
      conclusion: 'The car reaches 20 m/s after traversing 50 meters.',
    },
    faqs: [
      {
        question: 'What is the difference between speed and velocity?',
        answer: 'Speed is a scalar quantity indicating only magnitude, whereas velocity is a vector quantity possessing both speed magnitude and spatial direction.',
      },
    ],
    inputs: [
      { id: 'initial_velocity', label: 'Initial Velocity (u)', type: 'number', defaultValue: 0, min: -10000, max: 10000, step: 0.1, unit: 'm/s' },
      { id: 'acceleration', label: 'Acceleration (a)', type: 'number', defaultValue: 4, min: -1000, max: 1000, step: 0.1, unit: 'm/s²' },
      { id: 'time_seconds', label: 'Elapsed Time (t)', type: 'number', defaultValue: 5, min: 0.01, max: 10000, step: 0.1, unit: 's' },
    ],
    defaultResult: {
      label: 'Final Velocity (v)',
      initialValue: 20,
      decimals: 2,
      secondaryText: 'Displacement (s): 50.00 meters | 72.00 km/h',
      suffix: ' m/s',
      accent: 'cyan',
    },
    computeScript: `
      const u = Number(inputs.initial_velocity) || 0;
      const a = Number(inputs.acceleration) || 4;
      const t = Math.max(0.01, Number(inputs.time_seconds) || 5);
      const v = u + (a * t);
      const s = (u * t) + (0.5 * a * Math.pow(t, 2));
      const kmh = v * 3.6;
      return {
        value: v,
        secondaryText: 'Displacement (Distance): ' + s.toFixed(2) + ' m | Speed in km/h: ' + kmh.toFixed(1) + ' km/h',
        badge: 'Kinematics Solved'
      };
    `,
  },
  {
    id: 'kinetic-energy-calculator',
    category: 'physics',
    name: 'Kinetic Energy Calculator',
    title: 'Free Kinetic Energy Calculator — Mass & Velocity KE = ½mv²',
    description: 'Calculate kinetic mechanical energy in Joules (J) and kilojoules (kJ) based on object mass and moving velocity.',
    badge: 'Energy Mechanics',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Classical Kinetic Energy Equation',
      expression: 'KE = ½ × m × v²',
      explanation: 'Represents the mechanical work required to accelerate a body of mass m from rest to stated velocity v.',
      variables: [
        { symbol: 'm', meaning: 'Mass of moving body in kilograms (kg)' },
        { symbol: 'v', meaning: 'Velocity in meters per second (m/s)' },
      ],
    },
    example: {
      title: 'Worked Example: 1,200 kg Vehicle at 25 m/s',
      scenario: 'A 1,200 kg compact car traveling at 25 m/s (90 km/h).',
      steps: [
        {
          number: 1,
          title: 'Calculate Energy',
          description: '½ × 1,200 kg × 25² = 600 × 625 = 375,000 Joules (375 kJ).',
          mathExpression: '375 kJ',
        },
      ],
      conclusion: 'The vehicle carries 375,000 Joules of kinetic energy.',
    },
    faqs: [
      {
        question: 'What happens to kinetic energy during braking?',
        answer: 'Friction between brake pads and rotors converts kinetic energy into thermal energy (heat) dissipated into the surrounding atmosphere.',
      },
    ],
    inputs: [
      { id: 'object_mass', label: 'Object Mass (m)', type: 'number', defaultValue: 1200, min: 0.001, max: 100000000, step: 1, unit: 'kg' },
      { id: 'object_velocity', label: 'Velocity (v)', type: 'number', defaultValue: 25, min: 0, max: 300000000, step: 0.1, unit: 'm/s' },
    ],
    defaultResult: {
      label: 'Kinetic Energy',
      initialValue: 375,
      decimals: 2,
      secondaryText: '375,000 Joules (J)',
      suffix: ' kJ',
      accent: 'link',
    },
    computeScript: `
      const m = Math.max(0, Number(inputs.object_mass) || 1200);
      const v = Math.max(0, Number(inputs.object_velocity) || 25);
      const joules = 0.5 * m * Math.pow(v, 2);
      const kj = joules / 1000;
      return {
        value: kj,
        secondaryText: Math.round(joules).toLocaleString() + ' Joules (J) | ' + (joules / 4184).toFixed(1) + ' nutritional kcal',
        badge: 'Energy Conservation'
      };
    `,
  },
  {
    id: 'ohms-law-calculator',
    category: 'physics',
    name: 'Ohm’s Law Calculator',
    title: 'Free Ohm’s Law Calculator — Voltage, Current, Resistance & Power',
    description: 'Calculate electrical circuit parameters: Voltage (V), Current (I), Resistance (R), and Power dissipation (W) across DC circuits.',
    badge: 'Circuit Analysis',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Ohm’s Law & Joule Electrical Power Laws',
      expression: 'V = I × R ; P = V × I = I²R = V² ÷ R',
      explanation: 'Defines the linear fundamental relationship between electric potential difference, current flow, and ohmic impedance.',
      variables: [
        { symbol: 'V', meaning: 'Voltage electric potential (Volts)' },
        { symbol: 'I', meaning: 'Current flow (Amperes)' },
        { symbol: 'R', meaning: 'Resistance (Ohms Ω)' },
      ],
    },
    example: {
      title: 'Worked Example: 12V Battery with 4Ω Load',
      scenario: 'A 12 Volt DC circuit powering a 4 Ohm resistive load.',
      steps: [
        {
          number: 1,
          title: 'Calculate Current & Power',
          description: 'I = 12 ÷ 4 = 3.00 A ; Power = 12 × 3 = 36.00 W.',
          mathExpression: '3 A, 36 W',
        },
      ],
      conclusion: 'The circuit draws 3.00 Amps and dissipates 36.00 Watts.',
    },
    faqs: [
      {
        question: 'Does Ohm’s law apply to AC circuits?',
        answer: 'Yes, but pure resistance is replaced by complex impedance (Z), which accounts for phase angles introduced by capacitors and inductors.',
      },
    ],
    inputs: [
      { id: 'voltage', label: 'Voltage (V)', type: 'number', defaultValue: 12, min: 0.01, max: 100000, step: 0.1, unit: 'V' },
      { id: 'resistance', label: 'Resistance (R)', type: 'number', defaultValue: 4, min: 0.01, max: 10000000, step: 0.1, unit: 'Ω' },
    ],
    defaultResult: {
      label: 'Current Flow (I)',
      initialValue: 3.00,
      decimals: 2,
      secondaryText: 'Power Dissipated: 36.00 Watts (W)',
      suffix: ' A',
      accent: 'violet',
    },
    computeScript: `
      const v = Math.max(0.001, Number(inputs.voltage) || 12);
      const r = Math.max(0.001, Number(inputs.resistance) || 4);
      const i = v / r;
      const p = v * i;
      return {
        value: i,
        secondaryText: 'Power: ' + p.toFixed(2) + ' W | Current: ' + (i * 1000).toFixed(0) + ' mA',
        badge: 'Ohmic Match'
      };
    `,
  },
  {
    id: 'projectile-motion-calculator',
    category: 'physics',
    name: 'Projectile Motion Tool',
    title: 'Free Projectile Motion Calculator — Maximum Height, Range & Flight Time',
    description: 'Calculate 2D parabolic ballistic projectile trajectory: horizontal range, peak apex altitude, and total flight hangtime.',
    badge: 'Ballistics',
    badgeColor: 'text-magenta border-magenta/30 bg-magenta/10',
    formula: {
      name: 'Ideal Parabolic Trajectory Equations',
      expression: 'Range = (v² × sin(2θ)) ÷ g ; Max Height = (v² × sin²(θ)) ÷ (2g) ; Time = (2v × sin(θ)) ÷ g',
      explanation: 'Models unpowered flight under constant vertical gravitational acceleration ignoring aerodynamic drag.',
      variables: [
        { symbol: 'v', meaning: 'Launch velocity (m/s)' },
        { symbol: 'θ', meaning: 'Launch elevation angle in degrees' },
      ],
    },
    example: {
      title: 'Worked Example: 50 m/s Launch at 45°',
      scenario: 'Launching an object at 50 m/s at a 45-degree angle.',
      steps: [
        {
          number: 1,
          title: 'Calculate Max Range',
          description: '(50² × sin(90°)) ÷ 9.80665 = 2,500 ÷ 9.80665 = 254.93 meters.',
          mathExpression: '254.93 m',
        },
      ],
      conclusion: 'The projectile reaches a peak altitude of 63.73 m and lands 254.93 m away after 7.21 seconds.',
    },
    faqs: [
      {
        question: 'How does air resistance change real-world projectile flight?',
        answer: 'Air resistance reduces maximum range, decreases flight time, and skews the parabolic curve into an asymmetric trajectory with a steeper landing angle.',
      },
    ],
    inputs: [
      { id: 'launch_velocity', label: 'Initial Launch Velocity', type: 'number', defaultValue: 50, min: 0.1, max: 5000, step: 0.5, unit: 'm/s' },
      { id: 'launch_angle', label: 'Launch Angle', type: 'number', defaultValue: 45, min: 1, max: 89, step: 0.5, unit: '°' },
    ],
    defaultResult: {
      label: 'Maximum Horizontal Range',
      initialValue: 254.93,
      decimals: 2,
      secondaryText: 'Peak Height: 63.73 m | Total Flight Time: 7.21 sec',
      suffix: ' meters',
      accent: 'magenta',
    },
    computeScript: `
      const v = Math.max(0.1, Number(inputs.launch_velocity) || 50);
      const deg = Math.min(89.9, Math.max(0.1, Number(inputs.launch_angle) || 45));
      const rad = deg * (Math.PI / 180);
      const g = 9.80665;
      const range = (Math.pow(v, 2) * Math.sin(2 * rad)) / g;
      const height = (Math.pow(v, 2) * Math.pow(Math.sin(rad), 2)) / (2 * g);
      const time = (2 * v * Math.sin(rad)) / g;
      return {
        value: range,
        secondaryText: 'Max Altitude: ' + height.toFixed(2) + ' m | Flight Duration: ' + time.toFixed(2) + ' s',
        badge: 'Parabolic Path'
      };
    `,
  },
];
