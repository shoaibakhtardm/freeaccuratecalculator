// src/engines/taxEngine.ts
import { COUNTRY_TAX_RULES, type CountryTaxRule, type TaxBracket } from '../data/taxRules.ts';

export interface TaxCalculationResult {
  ruleKey?: string;
  countryName?: string;
  jurisdiction?: string;
  taxYear?: string;
  grossIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  taxBeforeCess: number;
  rebate: number;
  cessOrLevy: number;
  netTaxPayable: number;
  effectiveTaxRate: number; // percentage, e.g. 14.5%
  marginalTaxRate: number; // percentage of highest bracket reached
  annualTakeHome: number;
  monthlyTakeHome: number;
  officialSource?: string;
  sourceUrl?: string;
  lastVerified?: string;
  notes?: string;
}

/**
 * Calculates progressive tax across custom or country-defined brackets.
 */
export function calculateProgressiveTax(
  taxableAmount: number,
  brackets: TaxBracket[]
): { tax: number; marginalRate: number } {
  const taxable = Math.max(0, Number(taxableAmount) || 0);
  if (isNaN(taxable) || !isFinite(taxable) || taxable === 0 || !brackets || brackets.length === 0) {
    return { tax: 0, marginalRate: 0 };
  }

  let totalTax = 0;
  let marginalRate = 0;

  for (const bracket of brackets) {
    const min = bracket.thresholdMin;
    const max = bracket.thresholdMax;
    const rate = bracket.rate;

    if (taxable > min) {
      marginalRate = rate * 100;
      const bracketSpan = max !== null ? Math.min(taxable, max) - min : taxable - min;
      if (bracketSpan > 0) {
        totalTax += bracketSpan * rate;
      }
    }
  }

  return { tax: totalTax, marginalRate };
}

/**
 * Computes tax based on a source-controlled country rule key.
 */
export function calculateCountryTax(
  ruleKey: string,
  grossIncome: number,
  userDeductions: number = 0
): TaxCalculationResult {
  const rule = COUNTRY_TAX_RULES[ruleKey];
  if (!rule) {
    throw new Error(`Tax rule '${ruleKey}' not found in registry.`);
  }

  const gross = Math.max(0, Number(grossIncome) || 0);
  let totalDeductions = Math.max(0, Number(userDeductions) || 0);

  if (isNaN(gross) || !isFinite(gross)) {
    return {
      ruleKey,
      countryName: rule.countryName,
      jurisdiction: rule.jurisdiction,
      taxYear: rule.taxYear,
      grossIncome: 0,
      totalDeductions: 0,
      taxableIncome: 0,
      taxBeforeCess: 0,
      rebate: 0,
      cessOrLevy: 0,
      netTaxPayable: 0,
      effectiveTaxRate: 0,
      marginalTaxRate: 0,
      annualTakeHome: 0,
      monthlyTakeHome: 0,
      officialSource: rule.sourceAuthority,
      sourceUrl: rule.sourceUrl,
      lastVerified: rule.lastVerifiedDate,
      notes: rule.notes,
    };
  }

  // Apply rule standard deductions if present and greater
  if (rule.standardDeductions) {
    const std = Object.values(rule.standardDeductions)[0] || 0;
    totalDeductions = Math.max(totalDeductions, std);
  }

  // Apply UK-style Personal Allowance with high-income taper
  if (rule.personalAllowance) {
    const { baseAmount, taperThreshold = 100000, taperRate = 0.5 } = rule.personalAllowance;
    let allowance = baseAmount;
    if (gross > taperThreshold) {
      const reduction = (gross - taperThreshold) * taperRate;
      allowance = Math.max(0, baseAmount - reduction);
    }
    totalDeductions = Math.max(totalDeductions, allowance);
  }

  const taxableIncome = Math.max(0, gross - totalDeductions);

  // Progressive bracket calculation
  const { tax: baseTax, marginalRate } = calculateProgressiveTax(taxableIncome, rule.brackets);

  // Apply statutory rebates (e.g. India 87A rebate)
  let rebate = 0;
  let taxAfterRebate = baseTax;
  if (rule.rebates) {
    if (taxableIncome <= rule.rebates.maxIncomeThreshold) {
      rebate = Math.min(baseTax, rule.rebates.maxRebateAmount);
      taxAfterRebate = Math.max(0, baseTax - rebate);
    }
  }

  // Apply statutory cess / levy (e.g. India 4% cess, Australia 2% Medicare levy)
  let cessOrLevy = 0;
  if (rule.statutoryCessOrLevy) {
    if (rule.countryCode === 'IN') {
      // Indian Cess is 4% of tax after rebate
      cessOrLevy = Math.round(taxAfterRebate * rule.statutoryCessOrLevy.rate);
    } else if (rule.countryCode === 'AU') {
      // Australian Medicare Levy is 2% of taxable income (for standard earners)
      cessOrLevy = taxableIncome > 26000 ? Math.round(taxableIncome * rule.statutoryCessOrLevy.rate) : 0;
    } else {
      cessOrLevy = Math.round(taxAfterRebate * rule.statutoryCessOrLevy.rate);
    }
  }

  const netTaxPayable = Math.round(taxAfterRebate + cessOrLevy);
  const effectiveRate = (gross > 0 && isFinite(netTaxPayable)) ? Number(((netTaxPayable / gross) * 100).toFixed(2)) : 0;
  const annualTakeHome = Math.max(0, gross - netTaxPayable);
  const monthlyTakeHome = isFinite(annualTakeHome) ? Math.round((annualTakeHome / 12) * 100) / 100 : 0;

  return {
    ruleKey,
    countryName: rule.countryName,
    jurisdiction: rule.jurisdiction,
    taxYear: rule.taxYear,
    grossIncome: Math.round(gross),
    totalDeductions: Math.round(totalDeductions),
    taxableIncome: Math.round(taxableIncome),
    taxBeforeCess: Math.round(baseTax),
    rebate: Math.round(rebate),
    cessOrLevy,
    netTaxPayable,
    effectiveTaxRate: isFinite(effectiveRate) ? effectiveRate : 0,
    marginalTaxRate: Number(marginalRate.toFixed(1)),
    annualTakeHome: Math.round(annualTakeHome),
    monthlyTakeHome,
    officialSource: rule.sourceAuthority,
    sourceUrl: rule.sourceUrl,
    lastVerified: rule.lastVerifiedDate,
    notes: rule.notes,
  };
}

/**
 * Calculates tax using a flat Custom Tax Rate (user override option).
 */
export function calculateCustomRateTax(
  grossIncome: number,
  flatRatePercent: number,
  deductions: number = 0
): TaxCalculationResult {
  const gross = Math.max(0, Number(grossIncome) || 0);
  const totalDeductions = Math.max(0, Number(deductions) || 0);
  const taxableIncome = Math.max(0, gross - totalDeductions);
  const rate = Math.max(0, Math.min(100, Number(flatRatePercent) || 0)) / 100;

  if (isNaN(gross) || !isFinite(gross) || isNaN(totalDeductions) || !isFinite(totalDeductions)) {
    return {
      grossIncome: 0,
      totalDeductions: 0,
      taxableIncome: 0,
      taxBeforeCess: 0,
      rebate: 0,
      cessOrLevy: 0,
      netTaxPayable: 0,
      effectiveTaxRate: 0,
      marginalTaxRate: 0,
      annualTakeHome: 0,
      monthlyTakeHome: 0,
      notes: 'Please enter valid numbers',
    };
  }

  const netTax = Math.round(taxableIncome * rate);
  const effectiveRate = (gross > 0 && isFinite(netTax)) ? Number(((netTax / gross) * 100).toFixed(2)) : 0;
  const annualTakeHome = Math.max(0, gross - netTax);

  return {
    grossIncome: Math.round(gross),
    totalDeductions: Math.round(totalDeductions),
    taxableIncome: Math.round(taxableIncome),
    taxBeforeCess: netTax,
    rebate: 0,
    cessOrLevy: 0,
    netTaxPayable: netTax,
    effectiveTaxRate: isFinite(effectiveRate) ? effectiveRate : 0,
    marginalTaxRate: flatRatePercent,
    annualTakeHome: Math.round(annualTakeHome),
    monthlyTakeHome: isFinite(annualTakeHome) ? Math.round((annualTakeHome / 12) * 100) / 100 : 0,
    notes: `Calculated using custom flat rate of ${flatRatePercent}%.`,
  };
}

/**
 * Calculates tax using Custom Tax Slabs entered by user.
 */
export function calculateCustomSlabsTax(
  grossIncome: number,
  brackets: TaxBracket[],
  deductions: number = 0
): TaxCalculationResult {
  const gross = Math.max(0, Number(grossIncome) || 0);
  const totalDeductions = Math.max(0, Number(deductions) || 0);
  const taxableIncome = Math.max(0, gross - totalDeductions);

  if (isNaN(gross) || !isFinite(gross) || isNaN(totalDeductions) || !isFinite(totalDeductions)) {
    return {
      grossIncome: 0,
      totalDeductions: 0,
      taxableIncome: 0,
      taxBeforeCess: 0,
      rebate: 0,
      cessOrLevy: 0,
      netTaxPayable: 0,
      effectiveTaxRate: 0,
      marginalTaxRate: 0,
      annualTakeHome: 0,
      monthlyTakeHome: 0,
      notes: 'Please enter valid numbers',
    };
  }

  const { tax, marginalRate } = calculateProgressiveTax(taxableIncome, brackets);
  const netTax = Math.round(tax);
  const effectiveRate = (gross > 0 && isFinite(netTax)) ? Number(((netTax / gross) * 100).toFixed(2)) : 0;
  const annualTakeHome = Math.max(0, gross - netTax);

  return {
    grossIncome: Math.round(gross),
    totalDeductions: Math.round(totalDeductions),
    taxableIncome: Math.round(taxableIncome),
    taxBeforeCess: netTax,
    rebate: 0,
    cessOrLevy: 0,
    netTaxPayable: netTax,
    effectiveTaxRate: isFinite(effectiveRate) ? effectiveRate : 0,
    marginalTaxRate: Number(marginalRate.toFixed(1)),
    annualTakeHome: Math.round(annualTakeHome),
    monthlyTakeHome: isFinite(annualTakeHome) ? Math.round((annualTakeHome / 12) * 100) / 100 : 0,
    notes: 'Calculated using user-defined custom tax brackets.',
  };
}
