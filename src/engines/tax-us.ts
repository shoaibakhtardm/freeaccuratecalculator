// src/engines/tax-us.ts
import {
  US_TAX_CONFIG_2026,
  type TaxBracketConfig,
} from '../data/countries.ts';

export interface USIncomeTaxInput {
  grossAnnualIncome: number;
  filingStatus?: 'single' | 'married_joint';
  traditional401k?: number;
  itemizedDeductions?: number;
}

export interface USIncomeTaxResult {
  grossIncome: number;
  taxableIncome: number;
  federalIncomeTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  totalFicaTax: number;
  totalTax: number;
  effectiveTaxRate: number;
  annualTakeHome: number;
  monthlyTakeHome: number;
}

/**
 * Helper to compute progressive tax across 2026 bracket tiers without magic numbers.
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
 * Calculates US Federal Income Tax and FICA for Tax Year 2026 using IRS inflation-adjusted projections.
 * Source: US_TAX_CONFIG_2026
 * - Single Standard Deduction: $16,100 (Married Joint: $32,200)
 * - 401(k) Elective Deferral Cap: $24,500
 * - Social Security Taxable Wage Base: $176,100 (6.2%)
 * - Medicare Tax: 1.45% + 0.9% Additional Medicare above statutory threshold
 */
export function calculateUSIncomeTax(input: USIncomeTaxInput): USIncomeTaxResult {
  const gross = Math.max(0, Number(input.grossAnnualIncome) || 0);
  const status = input.filingStatus || 'single';

  if (isNaN(gross) || !isFinite(gross)) {
    return {
      grossIncome: 0,
      taxableIncome: 0,
      federalIncomeTax: 0,
      socialSecurityTax: 0,
      medicareTax: 0,
      totalFicaTax: 0,
      totalTax: 0,
      effectiveTaxRate: 0,
      annualTakeHome: 0,
      monthlyTakeHome: 0,
    };
  }

  const max401k = US_TAX_CONFIG_2026.limits?.traditional401k ?? 24500;
  const preTax401k = Math.min(max401k, Math.max(0, Number(input.traditional401k) || 0));

  // Adjusted Gross Income (AGI)
  const agi = Math.max(0, gross - preTax401k);

  // 2026 Standard Deductions
  const stdDeductions = US_TAX_CONFIG_2026.standardDeductions;
  const standardDeduction = status === 'married_joint'
    ? (stdDeductions.married_joint ?? 32200)
    : (stdDeductions.single ?? 16100);

  const deduction = Math.max(standardDeduction, Math.max(0, Number(input.itemizedDeductions) || 0));
  const taxableIncome = Math.max(0, agi - deduction);

  // 2026 Federal Progressive Tax Brackets
  const brackets = (US_TAX_CONFIG_2026.brackets && US_TAX_CONFIG_2026.brackets[status])
    ? US_TAX_CONFIG_2026.brackets[status]
    : (US_TAX_CONFIG_2026.brackets?.single ?? []);

  const federalTax = computeProgressiveTax(taxableIncome, brackets);

  // 2026 FICA Taxes (FICA applies to gross; 401(k) is not exempt from FICA)
  const ssWageCap = US_TAX_CONFIG_2026.limits?.socialSecurityWageBase ?? 176100;
  const ssRate = US_TAX_CONFIG_2026.limits?.socialSecurityRate ?? 0.062;
  const socialSecurity = Math.min(gross, ssWageCap) * ssRate;

  // Medicare: 1.45% base + 0.9% additional over statutory threshold ($200k single, $250k joint)
  const medRate = US_TAX_CONFIG_2026.limits?.medicareRate ?? 0.0145;
  const addMedRate = US_TAX_CONFIG_2026.limits?.additionalMedicareRate ?? 0.009;
  const medicareThreshold = status === 'married_joint'
    ? (US_TAX_CONFIG_2026.limits?.additionalMedicareThresholdJoint ?? 250000)
    : (US_TAX_CONFIG_2026.limits?.additionalMedicareThresholdSingle ?? 200000);

  let medicare = gross * medRate;
  if (gross > medicareThreshold) {
    medicare += (gross - medicareThreshold) * addMedRate;
  }

  const totalFica = Math.round(socialSecurity + medicare);
  const totalFedTax = Math.round(federalTax);
  const totalTax = totalFedTax + totalFica;
  const netTakeHome = Math.max(0, gross - totalTax - preTax401k);

  return {
    grossIncome: Math.round(gross),
    taxableIncome: Math.round(taxableIncome),
    federalIncomeTax: totalFedTax,
    socialSecurityTax: Math.round(socialSecurity),
    medicareTax: Math.round(medicare),
    totalFicaTax: totalFica,
    totalTax,
    effectiveTaxRate: (gross > 0 && isFinite(totalTax)) ? Number(((totalTax / gross) * 100).toFixed(2)) : 0,
    annualTakeHome: Math.round(netTakeHome),
    monthlyTakeHome: isFinite(netTakeHome) ? Math.round(netTakeHome / 12) : 0,
  };
}

export interface Plan401kResult {
  totalBalance: number;
  employeeContributions: number;
  employerContributions: number;
  totalInterestEarned: number;
}

/**
 * Calculates 401(k) Retirement Savings with Employer Matching
 */
export function calculate401k(
  currentAge: number,
  retirementAge: number,
  currentSalary: number,
  currentBalance: number,
  employeeContributionPercent: number,
  employerMatchPercent: number = 50, // e.g., 50% match
  employerMatchCapPercent: number = 6, // up to 6% of salary
  expectedAnnualReturn: number = 7,
  annualSalaryIncreasePercent: number = 3
): Plan401kResult {
  const age = Math.max(18, Number(currentAge) || 30);
  const retire = Math.max(age + 1, Number(retirementAge) || 65);
  const years = retire - age;
  let salary = Math.max(0, Number(currentSalary) || 0);
  let balance = Math.max(0, Number(currentBalance) || 0);

  const empPct = Math.max(0, Number(employeeContributionPercent) || 0) / 100;
  const matchRatio = Math.max(0, Number(employerMatchPercent) || 0) / 100;
  const matchCap = Math.max(0, Number(employerMatchCapPercent) || 0) / 100;
  const returnRate = (Math.max(0, Number(expectedAnnualReturn) || 0) / 100) / 12;
  const salaryIncrease = Math.max(0, Number(annualSalaryIncreasePercent) || 0) / 100;

  if (
    isNaN(salary) ||
    !isFinite(salary) ||
    isNaN(balance) ||
    !isFinite(balance) ||
    isNaN(empPct) ||
    !isFinite(empPct) ||
    isNaN(returnRate) ||
    !isFinite(returnRate) ||
    years <= 0
  ) {
    return {
      totalBalance: 0,
      employeeContributions: 0,
      employerContributions: 0,
      totalInterestEarned: 0,
    };
  }

  let totalEmp = 0;
  let totalEmpr = 0;

  for (let y = 1; y <= years; y++) {
    const monthlySalary = salary / 12;
    const monthlyEmp = monthlySalary * empPct;
    // Employer matches up to cap
    const matchedEmployeePortion = Math.min(monthlyEmp, monthlySalary * matchCap);
    const monthlyEmpr = matchedEmployeePortion * matchRatio;

    for (let m = 1; m <= 12; m++) {
      balance = (balance + monthlyEmp + monthlyEmpr) * (1 + returnRate);
      totalEmp += monthlyEmp;
      totalEmpr += monthlyEmpr;
    }

    salary = salary * (1 + salaryIncrease);
  }

  const finalBalance = isFinite(balance) ? Math.round(balance) : 0;
  const totalContrib = totalEmp + totalEmpr + currentBalance;
  const interestEarned = Math.round(Math.max(0, finalBalance - totalContrib));

  return {
    totalBalance: finalBalance,
    employeeContributions: Math.round(totalEmp),
    employerContributions: Math.round(totalEmpr),
    totalInterestEarned: isFinite(interestEarned) ? interestEarned : 0,
  };
}

export interface RothIraResult {
  totalBalance: number;
  totalContributions: number;
  taxFreeEarnings: number;
}

/**
 * Calculates Roth IRA Compounding (Tax-Free Growth) using 2026 limits
 */
export function calculateRothIra(
  currentBalance: number,
  annualContribution: number = 7500,
  years: number = 30,
  expectedReturnRate: number = 7
): RothIraResult {
  let balance = Math.max(0, Number(currentBalance) || 0);
  const statutoryLimit = US_TAX_CONFIG_2026.limits?.iraContributionLimit ?? 7500;
  const annualContrib = Math.min(statutoryLimit, Math.max(0, Number(annualContribution) || 0));
  const rate = Math.max(0, Number(expectedReturnRate) || 0) / 100;
  const totalYears = Math.max(1, Math.round(Number(years) || 1));

  if (
    isNaN(balance) ||
    !isFinite(balance) ||
    isNaN(annualContrib) ||
    !isFinite(annualContrib) ||
    isNaN(rate) ||
    !isFinite(rate) ||
    isNaN(totalYears) ||
    !isFinite(totalYears)
  ) {
    return {
      totalBalance: 0,
      totalContributions: 0,
      taxFreeEarnings: 0,
    };
  }

  let totalContrib = balance;

  for (let y = 1; y <= totalYears; y++) {
    balance = (balance + annualContrib) * (1 + rate);
    totalContrib += annualContrib;
  }

  const finalBalance = isFinite(balance) ? Math.round(balance) : 0;
  const earnings = Math.round(Math.max(0, finalBalance - totalContrib));

  return {
    totalBalance: finalBalance,
    totalContributions: Math.round(totalContrib),
    taxFreeEarnings: isFinite(earnings) ? earnings : 0,
  };
}
