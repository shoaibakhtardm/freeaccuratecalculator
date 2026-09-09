// src/data/extended/statistics.ts
import type { CalculatorEntry } from '../calculatorRegistry';

export const statisticsCalculators: CalculatorEntry[] = [
  {
    id: 'sample-size-calculator',
    category: 'statistics',
    name: 'Sample Size Calculator',
    title: 'Free Sample Size Calculator — Cochran’s Survey Population Formula',
    description: 'Calculate scientifically representative sample size targets for clinical trials, market research surveys, and A/B test experiments.',
    badge: 'Scientific Precision',
    badgeColor: 'text-violet border-violet/30 bg-violet/10',
    formula: {
      name: 'Cochran’s Sample Size Equation',
      expression: 'n = (Z² × p × (1 - p)) ÷ e² ; Adjusted n = n ÷ [1 + ((n - 1) ÷ N)]',
      explanation: 'Determines minimum statistically valid survey respondents required to achieve a specified confidence level and margin of error.',
      variables: [
        { symbol: 'Z', meaning: 'Z-score critical value (1.96 for 95% confidence, 2.576 for 99%)' },
        { symbol: 'e', meaning: 'Acceptable margin of error precision (e.g. 0.05 for ±5%)' },
        { symbol: 'p', meaning: 'Estimated population proportion (0.5 for maximum variability conservative estimate)' },
      ],
    },
    example: {
      title: 'Worked Example: 95% Confidence, 5% Margin of Error',
      scenario: 'Surveying an infinite or large population (N = 100,000) at 95% confidence and 5% margin of error.',
      steps: [
        {
          number: 1,
          title: 'Calculate Ideal Sample Size',
          description: '(1.96² × 0.5 × 0.5) ÷ 0.05² = (3.8416 × 0.25) ÷ 0.0025 = 384.16.',
          mathExpression: '385 respondents',
        },
      ],
      conclusion: 'You must survey at least 385 respondents to achieve a ±5% margin of error at 95% confidence.',
    },
    faqs: [
      {
        question: 'Why does sample size level off around 384-400?',
        answer: 'Due to the law of large numbers, once a sample reaches ~400 respondents, further increases in population size have almost negligible effect on statistical confidence.',
      },
    ],
    inputs: [
      { id: 'confidence_level', label: 'Confidence Level', type: 'select', defaultValue: '95', options: [
        { label: '90% Confidence (Z = 1.645)', value: '90' },
        { label: '95% Confidence (Z = 1.960)', value: '95' },
        { label: '99% Confidence (Z = 2.576)', value: '99' },
      ]},
      { id: 'margin_error', label: 'Margin of Error (±%)', type: 'number', defaultValue: 5, min: 0.1, max: 20, step: 0.1, unit: '%' },
      { id: 'population_size', label: 'Total Population Size (Leave 0 for infinite)', type: 'number', defaultValue: 100000, min: 0, max: 1000000000, unit: '' },
    ],
    defaultResult: {
      label: 'Required Sample Size',
      initialValue: 384,
      decimals: 0,
      secondaryText: '95% Confidence Level with ±5.0% Margin of Error',
      suffix: ' respondents',
      accent: 'violet',
    },
    computeScript: `
      const conf = Number(inputs.confidence_level) || 95;
      const err = Math.max(0.1, Number(inputs.margin_error) || 5) / 100;
      const pop = Number(inputs.population_size) || 0;
      const z = conf === 99 ? 2.576 : (conf === 90 ? 1.645 : 1.960);
      const p = 0.5;
      let n = (Math.pow(z, 2) * p * (1 - p)) / Math.pow(err, 2);
      if (pop > 0) {
        n = n / (1 + ((n - 1) / pop));
      }
      const sample = Math.ceil(n);
      return {
        value: sample,
        secondaryText: conf + '% Confidence Level | ±' + (err * 100).toFixed(1) + '% Margin of Error',
        badge: 'Statistically Significant'
      };
    `,
  },
  {
    id: 'probability-calculator',
    category: 'statistics',
    name: 'Probability Calculator',
    title: 'Free Probability Calculator — Independent, Joint & Conditional Odds',
    description: 'Calculate single event odds, joint probabilities P(A and B), union odds P(A or B), and conditional likelihoods.',
    badge: 'Probability Theory',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Joint & Union Probability Rules',
      expression: 'P(A and B) = P(A) × P(B) ; P(A or B) = P(A) + P(B) - P(A and B)',
      explanation: 'Calculates the likelihood of two independent random outcomes occurring individually or concurrently.',
      variables: [
        { symbol: 'P(A and B)', meaning: 'Intersection: both event A and event B happen' },
        { symbol: 'P(A or B)', meaning: 'Union: at least one event happens' },
      ],
    },
    example: {
      title: 'Worked Example: Two Independent Events (40% and 50%)',
      scenario: 'Event A has a 40% chance of occurring; Event B has a 50% chance.',
      steps: [
        {
          number: 1,
          title: 'Calculate Both Occurring P(A and B)',
          description: '0.40 × 0.50 = 0.20 (20%).',
          mathExpression: '20%',
        },
        {
          number: 2,
          title: 'Calculate Either Occurring P(A or B)',
          description: '0.40 + 0.50 - 0.20 = 0.70 (70%).',
          mathExpression: '70%',
        },
      ],
      conclusion: 'There is a 20% chance both happen, and a 70% chance at least one happens.',
    },
    faqs: [
      {
        question: 'What defines independent events in probability?',
        answer: 'Two events are independent if the occurrence of Event A provides no information about and does not affect the probability of Event B.',
      },
    ],
    inputs: [
      { id: 'prob_a', label: 'Probability of Event A', type: 'number', defaultValue: 40, min: 0, max: 100, step: 0.1, unit: '%' },
      { id: 'prob_b', label: 'Probability of Event B', type: 'number', defaultValue: 50, min: 0, max: 100, step: 0.1, unit: '%' },
    ],
    defaultResult: {
      label: 'Probability of Both P(A and B)',
      initialValue: 20,
      decimals: 2,
      secondaryText: 'Probability of Either P(A or B): 70.00% | Neither P(None): 30.00%',
      suffix: '%',
      accent: 'cyan',
    },
    computeScript: `
      const a = Math.min(100, Math.max(0, Number(inputs.prob_a) || 40)) / 100;
      const b = Math.min(100, Math.max(0, Number(inputs.prob_b) || 50)) / 100;
      const both = a * b * 100;
      const either = (a + b - (a * b)) * 100;
      const neither = 100 - either;
      return {
        value: both,
        secondaryText: 'Either P(A or B): ' + either.toFixed(2) + '% | Neither: ' + neither.toFixed(2) + '%',
        badge: 'Independent Events'
      };
    `,
  },
  {
    id: 'confidence-interval-calculator',
    category: 'statistics',
    name: 'Confidence Interval',
    title: 'Free Confidence Interval Calculator — Mean & Margin of Error Bounds',
    description: 'Calculate normal distribution confidence intervals for sample means with standard error margins.',
    badge: 'Inferential Math',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Confidence Interval for Normal Mean',
      expression: 'CI = x̄ ± [Z × (s ÷ √n)]',
      explanation: 'Quantifies the uncertainty around a sample mean, bounding the interval containing the true population parameter.',
      variables: [
        { symbol: 'x̄', meaning: 'Sample arithmetic mean' },
        { symbol: 's', meaning: 'Sample standard deviation' },
        { symbol: 'n', meaning: 'Sample observation size' },
      ],
    },
    example: {
      title: 'Worked Example: Mean = 100, SD = 15, n = 100',
      scenario: 'Sample mean of 100, standard deviation of 15, and sample size of 100 at 95% confidence (Z = 1.96).',
      steps: [
        {
          number: 1,
          title: 'Calculate Standard Error',
          description: '15 ÷ √100 = 15 ÷ 10 = 1.5.',
          mathExpression: '1.5',
        },
        {
          number: 2,
          title: 'Calculate Margin of Error',
          description: '1.96 × 1.5 = 2.94.',
          mathExpression: '±2.94',
        },
      ],
      conclusion: 'The 95% confidence interval is [97.06, 102.94].',
    },
    faqs: [
      {
        question: 'What does a 95% confidence interval mean?',
        answer: 'If you were to repeat the sampling process 100 times, approximately 95 of the computed confidence intervals would capture the true population parameter.',
      },
    ],
    inputs: [
      { id: 'sample_mean', label: 'Sample Mean (x̄)', type: 'number', defaultValue: 100, min: -1000000, max: 1000000, step: 0.1, unit: '' },
      { id: 'sample_sd', label: 'Sample Standard Deviation (s)', type: 'number', defaultValue: 15, min: 0.01, max: 100000, step: 0.1, unit: '' },
      { id: 'sample_n', label: 'Sample Size (n)', type: 'number', defaultValue: 100, min: 2, max: 1000000, unit: '' },
      { id: 'confidence_choice', label: 'Confidence Level', type: 'select', defaultValue: '95', options: [
        { label: '90% (Z = 1.645)', value: '90' },
        { label: '95% (Z = 1.960)', value: '95' },
        { label: '99% (Z = 2.576)', value: '99' },
      ]},
    ],
    defaultResult: {
      label: 'Margin of Error (±)',
      initialValue: 2.94,
      decimals: 2,
      secondaryText: '95% CI Range: [97.06, 102.94]',
      prefix: '±',
      accent: 'link',
    },
    computeScript: `
      const mean = Number(inputs.sample_mean) || 100;
      const sd = Math.max(0.001, Number(inputs.sample_sd) || 15);
      const n = Math.max(2, Number(inputs.sample_n) || 100);
      const conf = Number(inputs.confidence_choice) || 95;
      const z = conf === 99 ? 2.576 : (conf === 90 ? 1.645 : 1.960);
      const se = sd / Math.sqrt(n);
      const me = z * se;
      const lower = mean - me;
      const upper = mean + me;
      return {
        value: me,
        secondaryText: conf + '% CI: [' + lower.toFixed(2) + ' to ' + upper.toFixed(2) + '] | Std Error: ' + se.toFixed(3),
        badge: 'Bound Range'
      };
    `,
  },
];
