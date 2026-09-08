// src/engines/tax-india.ts
import {
  INDIA_TAX_CONFIG_2026,
  type TaxBracketConfig,
  type SurchargeTier,
} from '../data/countries.ts';

export interface IndiaIncomeTaxInput {
  annualSalary: number;
  otherIncome?: number;
  section80C?: number; // up to 150000 for old regime
  section80D?: number; // health insurance for old regime
  hraExemption?: number; // for old regime
  otherDeductions?: number; // NPS 80CCD(1B), home loan interest 24b
}

export interface RegimeTaxBreakdown {
  regime: 'new' | 'old';
  grossTotalIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  taxBeforeCess: number;
  rebate87A: number;
  surcharge?: number;
  cess: number;
  netTaxPayable: number;
  effectiveTaxRate: number;
  monthlyTakeHome: number;
}

export interface IndiaTaxComparisonResult {
  newRegime: RegimeTaxBreakdown;
  oldRegime: RegimeTaxBreakdown;
  recommendedRegime: 'new' | 'old';
  annualSavings: number;
}

/**
 * Computes progressive tax across structured bracket slices.
 * Eliminates hardcoded magic numbers.
 */
function computeProgressiveTax(taxableIncome: number, brackets: TaxBracketConfig[]): number {
  if (taxableIncome <= 0 || !brackets || brackets.length === 0) return 0;
  let tax = 0;
  for (const b of brackets) {
    if (taxableIncome > b.min) {
      const span = b.max !== null ? Math.min(taxableIncome, b.max) - b.min : taxableIncome - b.min;
      if (span > 0) {
        tax += span * b.rate;
      }
    }
  }
  return tax;
}

/**
 * Evaluates tiered surcharges according to statutory thresholds.
 */
function computeSurcharge(tax: number, taxableIncome: number, tiers?: SurchargeTier[]): number {
  if (!tiers || tiers.length === 0 || taxableIncome <= 0 || tax <= 0) return 0;
  let surchargeRate = 0;
  for (const tier of tiers) {
    if (taxableIncome > tier.min) {
      surchargeRate = tier.rate;
    }
  }
  return tax * surchargeRate;
}

/**
 * Computes India Income Tax comparison between Old and New Regime for FY 2026–27 (AY 2027–28).
 * Uses authoritative rules from INDIA_TAX_CONFIG_2026:
 * - Verified Section 115BAC slabs
 * - Salaried Standard Deduction (₹75,000 New / ₹50,000 Old)
 * - Section 87A rebate rules
 * - Statutory Surcharge tiers
 * - Mandatory 4% Health & Education Cess
 */
export function calculateIndiaIncomeTax(input: IndiaIncomeTaxInput): IndiaTaxComparisonResult {
  const grossSalary = Math.max(0, Number(input.annualSalary) || 0);
  const otherIncome = Math.max(0, Number(input.otherIncome) || 0);
  const grossTotal = grossSalary + otherIncome;

  const cessRate = INDIA_TAX_CONFIG_2026.cessRate ?? 0.04;
  const newRegimeConfig = INDIA_TAX_CONFIG_2026.regimes!.new;
  const oldRegimeConfig = INDIA_TAX_CONFIG_2026.regimes!.old;

  // 1. NEW REGIME COMPUTATION
  const newStdLimit = newRegimeConfig.standardDeduction; // ₹75,000
  const newStdDeduction = grossSalary > 0 ? Math.min(newStdLimit, grossSalary) : 0;
  const newTaxableIncome = Math.max(0, grossTotal - newStdDeduction);

  let newTaxBeforeRebate = computeProgressiveTax(newTaxableIncome, newRegimeConfig.brackets);

  // Section 87A rebate for New Regime: taxable income up to threshold gets full rebate
  let newRebate = 0;
  let newTaxAfterRebate = newTaxBeforeRebate;
  if (newRegimeConfig.rebate && newTaxableIncome <= newRegimeConfig.rebate.threshold) {
    newRebate = Math.min(newTaxBeforeRebate, newRegimeConfig.rebate.maxAmount);
    newTaxAfterRebate = Math.max(0, newTaxBeforeRebate - newRebate);
  }

  const newSurcharge = computeSurcharge(newTaxAfterRebate, newTaxableIncome, newRegimeConfig.surchargeTiers);
  const newCess = Math.round((newTaxAfterRebate + newSurcharge) * cessRate);
  const newNetTax = Math.round(newTaxAfterRebate + newSurcharge + newCess);
  const newMonthlyTakeHome = Math.round((grossTotal - newNetTax) / 12);

  const newBreakdown: RegimeTaxBreakdown = {
    regime: 'new',
    grossTotalIncome: Math.round(grossTotal),
    totalDeductions: Math.round(newStdDeduction),
    taxableIncome: Math.round(newTaxableIncome),
    taxBeforeCess: Math.round(newTaxAfterRebate + newSurcharge),
    rebate87A: Math.round(newRebate),
    surcharge: Math.round(newSurcharge),
    cess: newCess,
    netTaxPayable: newNetTax,
    effectiveTaxRate: grossTotal > 0 ? Number(((newNetTax / grossTotal) * 100).toFixed(2)) : 0,
    monthlyTakeHome: newMonthlyTakeHome,
  };

  // 2. OLD REGIME COMPUTATION
  const oldStdLimit = oldRegimeConfig.standardDeduction; // ₹50,000
  const oldStdDeduction = grossSalary > 0 ? Math.min(oldStdLimit, grossSalary) : 0;

  const sec80CLimit = INDIA_TAX_CONFIG_2026.limits?.section80C ?? 150000;
  const sec80DLimit = INDIA_TAX_CONFIG_2026.limits?.section80D ?? 100000;

  const sec80C = Math.min(sec80CLimit, Math.max(0, Number(input.section80C) || 0));
  const sec80D = Math.min(sec80DLimit, Math.max(0, Number(input.section80D) || 0));
  const hra = Math.max(0, Number(input.hraExemption) || 0);
  const otherDed = Math.max(0, Number(input.otherDeductions) || 0);

  const totalOldDeductions = oldStdDeduction + sec80C + sec80D + hra + otherDed;
  const oldTaxableIncome = Math.max(0, grossTotal - totalOldDeductions);

  let oldTaxBeforeRebate = computeProgressiveTax(oldTaxableIncome, oldRegimeConfig.brackets);

  // Section 87A rebate for Old Regime
  let oldRebate = 0;
  let oldTaxAfterRebate = oldTaxBeforeRebate;
  if (oldRegimeConfig.rebate && oldTaxableIncome <= oldRegimeConfig.rebate.threshold) {
    oldRebate = Math.min(oldTaxBeforeRebate, oldRegimeConfig.rebate.maxAmount);
    oldTaxAfterRebate = Math.max(0, oldTaxBeforeRebate - oldRebate);
  }

  const oldSurcharge = computeSurcharge(oldTaxAfterRebate, oldTaxableIncome, oldRegimeConfig.surchargeTiers);
  const oldCess = Math.round((oldTaxAfterRebate + oldSurcharge) * cessRate);
  const oldNetTax = Math.round(oldTaxAfterRebate + oldSurcharge + oldCess);
  const oldMonthlyTakeHome = Math.round((grossTotal - oldNetTax) / 12);

  const oldBreakdown: RegimeTaxBreakdown = {
    regime: 'old',
    grossTotalIncome: Math.round(grossTotal),
    totalDeductions: Math.round(totalOldDeductions),
    taxableIncome: Math.round(oldTaxableIncome),
    taxBeforeCess: Math.round(oldTaxAfterRebate + oldSurcharge),
    rebate87A: Math.round(oldRebate),
    surcharge: Math.round(oldSurcharge),
    cess: oldCess,
    netTaxPayable: oldNetTax,
    effectiveTaxRate: grossTotal > 0 ? Number(((oldNetTax / grossTotal) * 100).toFixed(2)) : 0,
    monthlyTakeHome: oldMonthlyTakeHome,
  };

  const savings = Math.abs(newNetTax - oldNetTax);
  const recommendedRegime = newNetTax <= oldNetTax ? 'new' : 'old';

  return {
    newRegime: newBreakdown,
    oldRegime: oldBreakdown,
    recommendedRegime,
    annualSavings: savings,
  };
}

export interface PPFResult {
  totalDeposit: number;
  totalInterestEarned: number;
  maturityAmount: number;
}

/**
 * Calculates Public Provident Fund (PPF) growth
 * 15-year tenure with annual deposits at government fixed rate (7.1%)
 */
export function calculatePPF(
  annualDeposit: number,
  interestRate: number = 7.1,
  years: number = 15
): PPFResult {
  const maxDeposit = INDIA_TAX_CONFIG_2026.limits?.section80C ?? 150000;
  const p = Math.min(maxDeposit, Math.max(500, Number(annualDeposit) || 0));
  const rate = Math.max(0, Number(interestRate) || 7.1) / 100;
  const tenure = Math.max(15, Math.round(Number(years) || 15));

  let balance = 0;
  let totalDeposit = 0;

  for (let i = 1; i <= tenure; i++) {
    balance += p;
    totalDeposit += p;
    const interest = balance * rate;
    balance += interest;
  }

  const maturityAmount = Math.round(balance);
  const totalInterestEarned = Math.round(maturityAmount - totalDeposit);

  return {
    totalDeposit: Math.round(totalDeposit),
    totalInterestEarned,
    maturityAmount,
  };
}

export interface EPFResult {
  employeeContribution: number;
  employerContribution: number;
  totalInterestEarned: number;
  maturityCorpus: number;
}

/**
 * Calculates Employees' Provident Fund (EPF)
 * 12% employee + 3.67% employer EPF at statutory interest rate with annual salary increase
 */
export function calculateEPF(
  monthlyBasicDA: number,
  currentAge: number = 25,
  retirementAge: number = 58,
  annualSalaryIncreasePercent: number = 5,
  interestRate: number = 8.25
): EPFResult {
  let basic = Math.max(0, Number(monthlyBasicDA) || 0);
  const age = Math.max(18, Number(currentAge) || 25);
  const retire = Math.max(age + 1, Number(retirementAge) || 58);
  const years = retire - age;
  const annualIncrement = Math.max(0, Number(annualSalaryIncreasePercent) || 0) / 100;
  const monthlyRate = (Math.max(0, Number(interestRate) || 8.25) / 100) / 12;

  let balance = 0;
  let totalEmployee = 0;
  let totalEmployer = 0;

  for (let y = 1; y <= years; y++) {
    const monthlyEmp = basic * 0.12;
    const monthlyEmpr = basic * 0.0367; // 3.67% to EPF (8.33% goes to EPS)
    const totalMonthlyDeposit = monthlyEmp + monthlyEmpr;

    for (let m = 1; m <= 12; m++) {
      balance = (balance + totalMonthlyDeposit) * (1 + monthlyRate);
      totalEmployee += monthlyEmp;
      totalEmployer += monthlyEmpr;
    }

    basic = basic * (1 + annualIncrement);
  }

  const maturityCorpus = Math.round(balance);
  const totalContributed = totalEmployee + totalEmployer;
  const totalInterestEarned = Math.round(Math.max(0, maturityCorpus - totalContributed));

  return {
    employeeContribution: Math.round(totalEmployee),
    employerContribution: Math.round(totalEmployer),
    totalInterestEarned,
    maturityCorpus,
  };
}

export interface GratuityResult {
  totalGratuity: number;
  taxExemptAmount: number;
  taxableAmount: number;
}

/**
 * Calculates Indian Gratuity under Payment of Gratuity Act, 1972
 * Formula: (15 * Last Drawn Salary * Tenure in Years) / 26
 */
export function calculateGratuity(
  monthlyLastDrawnSalary: number, // Basic + DA
  completedYearsOfService: number
): GratuityResult {
  const salary = Math.max(0, Number(monthlyLastDrawnSalary) || 0);
  const tenure = Math.max(0, Math.round(Number(completedYearsOfService) || 0));

  if (salary === 0 || tenure < 5) {
    // Under the Act, minimum 5 years of continuous service required (except in case of death/disability)
    return {
      totalGratuity: 0,
      taxExemptAmount: 0,
      taxableAmount: 0,
    };
  }

  const gratuity = Math.round((15 * salary * tenure) / 26);
  const statutoryLimit = 2000000; // ₹20 Lakh statutory tax exemption limit
  const taxExemptAmount = Math.min(gratuity, statutoryLimit);
  const taxableAmount = Math.max(0, gratuity - taxExemptAmount);

  return {
    totalGratuity: gratuity,
    taxExemptAmount,
    taxableAmount,
  };
}
