// src/engines/tax-india.ts

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
 * Computes India Income Tax comparison between Old and New Regime (Budget FY 2024-25 / FY 2025-26)
 */
export function calculateIndiaIncomeTax(input: IndiaIncomeTaxInput): IndiaTaxComparisonResult {
  const grossSalary = Math.max(0, Number(input.annualSalary) || 0);
  const otherIncome = Math.max(0, Number(input.otherIncome) || 0);
  const grossTotal = grossSalary + otherIncome;

  // 1. NEW REGIME COMPUTATION
  // Standard Deduction: ₹75,000
  const newStdDeduction = grossSalary > 0 ? Math.min(75000, grossSalary) : 0;
  const newTaxableIncome = Math.max(0, grossTotal - newStdDeduction);

  let newTax = 0;
  if (newTaxableIncome > 1500000) {
    newTax += (newTaxableIncome - 1500000) * 0.30;
    newTax += 300000 * 0.20; // 12L to 15L
    newTax += 200000 * 0.15; // 10L to 12L
    newTax += 300000 * 0.10; // 7L to 10L
    newTax += 400000 * 0.05; // 3L to 7L
  } else if (newTaxableIncome > 1200000) {
    newTax += (newTaxableIncome - 1200000) * 0.20;
    newTax += 200000 * 0.15;
    newTax += 300000 * 0.10;
    newTax += 400000 * 0.05;
  } else if (newTaxableIncome > 1000000) {
    newTax += (newTaxableIncome - 1000000) * 0.15;
    newTax += 300000 * 0.10;
    newTax += 400000 * 0.05;
  } else if (newTaxableIncome > 700000) {
    newTax += (newTaxableIncome - 700000) * 0.10;
    newTax += 400000 * 0.05;
  } else if (newTaxableIncome > 300000) {
    newTax += (newTaxableIncome - 300000) * 0.05;
  }

  // Section 87A rebate for New Regime: up to ₹7,00,000 taxable income receives 100% rebate (up to ₹25,000)
  let newRebate = 0;
  if (newTaxableIncome <= 700000) {
    newRebate = newTax;
    newTax = 0;
  }

  const newCess = Math.round(newTax * 0.04);
  const newNetTax = Math.round(newTax + newCess);
  const newMonthlyTakeHome = Math.round((grossTotal - newNetTax) / 12);

  const newBreakdown: RegimeTaxBreakdown = {
    regime: 'new',
    grossTotalIncome: Math.round(grossTotal),
    totalDeductions: Math.round(newStdDeduction),
    taxableIncome: Math.round(newTaxableIncome),
    taxBeforeCess: Math.round(newTax),
    rebate87A: Math.round(newRebate),
    cess: newCess,
    netTaxPayable: newNetTax,
    effectiveTaxRate: grossTotal > 0 ? Number(((newNetTax / grossTotal) * 100).toFixed(2)) : 0,
    monthlyTakeHome: newMonthlyTakeHome,
  };

  // 2. OLD REGIME COMPUTATION
  const oldStdDeduction = grossSalary > 0 ? Math.min(50000, grossSalary) : 0;
  const sec80C = Math.min(150000, Math.max(0, Number(input.section80C) || 0));
  const sec80D = Math.min(100000, Math.max(0, Number(input.section80D) || 0));
  const hra = Math.max(0, Number(input.hraExemption) || 0);
  const otherDed = Math.max(0, Number(input.otherDeductions) || 0);

  const totalOldDeductions = oldStdDeduction + sec80C + sec80D + hra + otherDed;
  const oldTaxableIncome = Math.max(0, grossTotal - totalOldDeductions);

  let oldTax = 0;
  if (oldTaxableIncome > 1000000) {
    oldTax += (oldTaxableIncome - 1000000) * 0.30;
    oldTax += 500000 * 0.20; // 5L to 10L
    oldTax += 250000 * 0.05; // 2.5L to 5L
  } else if (oldTaxableIncome > 500000) {
    oldTax += (oldTaxableIncome - 500000) * 0.20;
    oldTax += 250000 * 0.05;
  } else if (oldTaxableIncome > 250000) {
    oldTax += (oldTaxableIncome - 250000) * 0.05;
  }

  // Section 87A rebate for Old Regime: up to ₹5,00,000 taxable income receives 100% rebate (up to ₹12,500)
  let oldRebate = 0;
  if (oldTaxableIncome <= 500000) {
    oldRebate = oldTax;
    oldTax = 0;
  }

  const oldCess = Math.round(oldTax * 0.04);
  const oldNetTax = Math.round(oldTax + oldCess);
  const oldMonthlyTakeHome = Math.round((grossTotal - oldNetTax) / 12);

  const oldBreakdown: RegimeTaxBreakdown = {
    regime: 'old',
    grossTotalIncome: Math.round(grossTotal),
    totalDeductions: Math.round(totalOldDeductions),
    taxableIncome: Math.round(oldTaxableIncome),
    taxBeforeCess: Math.round(oldTax),
    rebate87A: Math.round(oldRebate),
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
  const p = Math.min(150000, Math.max(500, Number(annualDeposit) || 0));
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
 * 12% employee + 3.67% employer EPF at 8.25% interest rate with annual salary increase
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
