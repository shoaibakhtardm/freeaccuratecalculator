// src/data/extended/index.ts
import type { CalculatorEntry } from '../calculatorRegistry.ts';
import { realEstateCalculators } from './realEstate.ts';
import { insuranceCalculators } from './insurance.ts';
import { legalCalculators } from './legal.ts';
import { businessCalculators } from './business.ts';
import { constructionCalculators } from './construction.ts';
import { technologyCalculators } from './technology.ts';
import { statisticsCalculators } from './statistics.ts';
import { marketingCalculators } from './marketing.ts';
import { automotiveCalculators } from './automotive.ts';
import { scienceCalculators } from './sciences.ts';
import { lifestyleCalculators } from './lifestyle.ts';
import { professionCalculators } from './profession.ts';

export const ALL_EXTENDED_CALCULATORS: CalculatorEntry[] = [
  ...realEstateCalculators,
  ...insuranceCalculators,
  ...legalCalculators,
  ...businessCalculators,
  ...constructionCalculators,
  ...technologyCalculators,
  ...statisticsCalculators,
  ...marketingCalculators,
  ...automotiveCalculators,
  ...scienceCalculators,
  ...lifestyleCalculators,
  ...professionCalculators,
];
