// scripts/update-homepage-dict.mjs
import fs from 'node:fs';
import path from 'node:path';

// Load existing file to keep structure and interface
const targetFile = path.resolve('src/i18n/homepageDict.ts');
const original = fs.readFileSync(targetFile, 'utf8');

// 33 Popular calculator keys in exact order
const POPULAR_KEYS = [
  'percentage-calculator',
  'bmi-calculator',
  'age-calculator',
  'love-calculator',
  'scientific-calculator',
  'emi-calculator',
  'mortgage-calculator',
  'loan-calculator',
  'time-calculator',
  'date-calculator',
  'salary-calculator',
  'compound-interest-calculator',
  'conversion-calculator',
  'body-fat-calculator',
  'bmr-calculator',
  'sip-calculator',
  'auto-loan-calculator',
  'gpa-calculator',
  'roi-calculator',
  'tip-calculator',
  'income-tax-calculator',
  'probability-calculator',
  'password-generator',
  'discount-calculator',
  'ovulation-calculator',
  'ohms-law-calculator',
  'pregnancy-due-date-calculator',
  'concrete-calculator',
  'paint-calculator',
  'amortization-calculator',
  'inflation-calculator',
  'square-footage-calculator',
  'ruler'
];

// 21 Category keys
const CATEGORY_KEYS = [
  'finance',
  'insurance',
  'legal',
  'business',
  'construction',
  'real-estate',
  'technology',
  'health',
  'statistics',
  'marketing',
  'math',
  'automotive',
  'biology',
  'chemistry',
  'physics',
  'food',
  'sports',
  'ecology',
  'everyday',
  'converter',
  'love'
];

console.log('Script initialized. Ready to generate localized data.');
