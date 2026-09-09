// src/utils/financialMath.ts

export interface AmortizationRow {
  period: number; // Month or Year index
  label: string;
  principalPaid: number;
  interestPaid: number;
  extraPayment: number;
  totalPayment: number;
  remainingBalance: number;
}

export interface AdvancedEMIResult {
  regularEMI: number;
  totalInterestWithoutPrepayment: number;
  totalPaymentWithoutPrepayment: number;
  totalInterestWithPrepayment: number;
  totalPaymentWithPrepayment: number;
  interestSaved: number;
  originalTenureMonths: number;
  actualTenureMonths: number;
  monthsSaved: number;
  yearsSaved: number;
  principalRatio: number;
  interestRatio: number;
  savingsRatio: number;
  yearlySchedule: AmortizationRow[];
  monthlySchedule: AmortizationRow[];
  isVerified: boolean;
}

export interface ProofStep {
  stepNumber: number;
  title: string;
  latex?: string;
  description: string;
  substitution: string;
  result: string;
}

/**
 * Cross-checks closed-form formula result against an iterative simulation loop.
 * Divergence > 0.01 throws console warning: [MATH WARNING] Divergence detected
 */
export function verifyMath(
  p: number,
  r: number,
  n: number,
  closedFormEMI: number
): boolean {
  if (p <= 0 || n <= 0) return true;
  if (r === 0) {
    const linearEMI = Math.round(((p / n) + Number.EPSILON) * 100) / 100;
    return Math.abs(closedFormEMI - linearEMI) <= 0.01;
  }

  // Iterative binary search simulation across monthly compounding
  let low = p / n;
  let high = (p * (1 + r * n)) / n;
  for (let iter = 0; iter < 60; iter++) {
    const mid = (low + high) / 2;
    let bal = p;
    for (let m = 0; m < n; m++) {
      const interest = bal * r;
      bal = bal + interest - mid;
    }
    if (bal > 0) {
      low = mid;
    } else {
      high = mid;
    }
  }

  const iterativeEMI = Math.round((((low + high) / 2) + Number.EPSILON) * 100) / 100;
  const divergence = Math.abs(closedFormEMI - iterativeEMI);

  if (divergence > 0.01) {
    console.warn(
      `[MATH WARNING] Divergence detected: Formula (${closedFormEMI}) vs Iteration (${iterativeEMI}) divergence > 0.01 (divergence: ${divergence.toFixed(4)})`
    );
    return false;
  }

  return true;
}

/**
 * Calculates Loan EMI, total interest, and full multi-tab amortization schedules
 * with optional Extra Monthly Prepayment logic.
 */
export function calculateAdvancedEMI(
  principalInput: number,
  annualRateInput: number,
  tenureMonthsInput: number,
  extraMonthlyInput: number = 0
): AdvancedEMIResult {
  // Edge-case hardening
  const p = isFinite(principalInput) && principalInput > 0 ? principalInput : 0;
  const annualRate = isFinite(annualRateInput) && annualRateInput >= 0 ? annualRateInput : 0;
  const originalMonths = isFinite(tenureMonthsInput) && tenureMonthsInput > 0 ? Math.round(tenureMonthsInput) : 0;
  const extraMonthly = isFinite(extraMonthlyInput) && extraMonthlyInput > 0 ? extraMonthlyInput : 0;

  if (p === 0 || originalMonths === 0) {
    return {
      regularEMI: 0,
      totalInterestWithoutPrepayment: 0,
      totalPaymentWithoutPrepayment: 0,
      totalInterestWithPrepayment: 0,
      totalPaymentWithPrepayment: 0,
      interestSaved: 0,
      originalTenureMonths: 0,
      actualTenureMonths: 0,
      monthsSaved: 0,
      yearsSaved: 0,
      principalRatio: 100,
      interestRatio: 0,
      savingsRatio: 0,
      yearlySchedule: [],
      monthlySchedule: [],
      isVerified: true,
    };
  }

  const monthlyRate = annualRate / 12 / 100;

  // Closed-form formula: E = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
  let rawEMI = 0;
  if (monthlyRate === 0) {
    rawEMI = p / originalMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, originalMonths);
    const denom = factor - 1;
    if (denom <= 0 || !isFinite(factor)) {
      rawEMI = p / originalMonths;
    } else {
      rawEMI = (p * monthlyRate * factor) / denom;
    }
  }

  const regularEMI = Math.round((rawEMI + Number.EPSILON) * 100) / 100;

  // Mathematical double-verification
  const isVerified = verifyMath(p, monthlyRate, originalMonths, regularEMI);

  // Baseline without prepayment
  const baselineTotalPayment = regularEMI * originalMonths;
  const baselineTotalInterest = Math.max(0, baselineTotalPayment - p);

  // Simulation loop with prepayment
  let balance = p;
  let totalInterestWith = 0;
  let totalPaidWith = 0;
  let month = 0;

  const monthlySchedule: AmortizationRow[] = [];
  const yearlySchedule: AmortizationRow[] = [];

  let currentYear = 1;
  let yearPrincipal = 0;
  let yearInterest = 0;
  let yearExtra = 0;

  while (balance > 0.001 && month < originalMonths * 2) {
    month++;
    const interestMonth = balance * monthlyRate;
    totalInterestWith += interestMonth;

    // Normal monthly installment component
    let principalFromEMI = Math.min(balance, regularEMI - interestMonth);
    let extraThisMonth = 0;

    let totalPrincipalMonth = principalFromEMI;

    // If extra prepayment applied
    if (extraMonthly > 0 && balance > totalPrincipalMonth) {
      extraThisMonth = Math.min(balance - totalPrincipalMonth, extraMonthly);
      totalPrincipalMonth += extraThisMonth;
    }

    balance = Math.max(0, balance - totalPrincipalMonth);
    const totalMonthPayment = principalFromEMI + extraThisMonth + interestMonth;
    totalPaidWith += totalMonthPayment;

    // Accumulate yearly
    yearPrincipal += totalPrincipalMonth;
    yearInterest += interestMonth;
    yearExtra += extraThisMonth;

    monthlySchedule.push({
      period: month,
      label: `Mo ${month}`,
      principalPaid: Math.round((totalPrincipalMonth + Number.EPSILON) * 100) / 100,
      interestPaid: Math.round((interestMonth + Number.EPSILON) * 100) / 100,
      extraPayment: Math.round((extraThisMonth + Number.EPSILON) * 100) / 100,
      totalPayment: Math.round((totalMonthPayment + Number.EPSILON) * 100) / 100,
      remainingBalance: Math.round((balance + Number.EPSILON) * 100) / 100,
    });

    if (month % 12 === 0 || balance <= 0.001 || month === originalMonths * 2) {
      yearlySchedule.push({
        period: currentYear,
        label: `Year ${currentYear}`,
        principalPaid: Math.round((yearPrincipal + Number.EPSILON) * 100) / 100,
        interestPaid: Math.round((yearInterest + Number.EPSILON) * 100) / 100,
        extraPayment: Math.round((yearExtra + Number.EPSILON) * 100) / 100,
        totalPayment: Math.round(((yearPrincipal + yearInterest + yearExtra) + Number.EPSILON) * 100) / 100,
        remainingBalance: Math.round((balance + Number.EPSILON) * 100) / 100,
      });
      currentYear++;
      yearPrincipal = 0;
      yearInterest = 0;
      yearExtra = 0;
    }

    if (balance <= 0.001) break;
  }

  const actualTenureMonths = month;
  const monthsSaved = Math.max(0, originalMonths - actualTenureMonths);
  const yearsSaved = Math.round(((monthsSaved / 12) + Number.EPSILON) * 10) / 10;
  const interestSaved = Math.max(0, baselineTotalInterest - totalInterestWith);

  const roundedTotalInterestWith = Math.round((totalInterestWith + Number.EPSILON) * 100) / 100;
  const roundedTotalPaidWith = Math.round((totalPaidWith + Number.EPSILON) * 100) / 100;
  const roundedInterestSaved = Math.round((interestSaved + Number.EPSILON) * 100) / 100;

  // Breakdown visual ratios
  const totalBase = p + roundedTotalInterestWith;
  const principalRatio = totalBase > 0 ? Math.round((p / totalBase) * 100) : 100;
  const interestRatio = totalBase > 0 ? 100 - principalRatio : 0;
  const savingsRatio = baselineTotalInterest > 0
    ? Math.min(100, Math.round((roundedInterestSaved / baselineTotalInterest) * 100))
    : 0;

  return {
    regularEMI: Math.round(regularEMI),
    totalInterestWithoutPrepayment: Math.round(baselineTotalInterest),
    totalPaymentWithoutPrepayment: Math.round(baselineTotalPayment),
    totalInterestWithPrepayment: Math.round(roundedTotalInterestWith),
    totalPaymentWithPrepayment: Math.round(roundedTotalPaidWith),
    interestSaved: Math.round(roundedInterestSaved),
    originalTenureMonths: originalMonths,
    actualTenureMonths,
    monthsSaved,
    yearsSaved,
    principalRatio,
    interestRatio,
    savingsRatio,
    yearlySchedule,
    monthlySchedule,
    isVerified,
  };
}

/**
 * Step-by-step mathematical proof generation for formula transparency.
 */
export function generateEMIProof(
  p: number,
  annualRate: number,
  tenureMonths: number,
  emi: number,
  currencySymbol: string = '₹'
): ProofStep[] {
  const r = annualRate / 12 / 100;
  const factor = r > 0 ? Math.pow(1 + r, tenureMonths) : 1;
  const factorStr = factor.toFixed(6);
  const numerator = p * r * factor;
  const denominator = factor - 1;

  const steps: ProofStep[] = [
    {
      stepNumber: 1,
      title: 'Convert Annual Interest to Monthly Periodic Rate (r)',
      description: 'The annual interest rate is converted to a monthly decimal rate by dividing by 12 months and 100 percent.',
      substitution: `r = ${annualRate}% ÷ 12 ÷ 100`,
      result: `r = ${r.toFixed(8)}`,
    },
    {
      stepNumber: 2,
      title: 'Compute the Compounding Factor (1 + r)ⁿ',
      description: `Evaluate growth over total monthly tenure n = ${tenureMonths} installments.`,
      substitution: `(1 + ${r.toFixed(6)})^${tenureMonths}`,
      result: `Factor = ${factorStr}`,
    },
    {
      stepNumber: 3,
      title: 'Evaluate Formula Numerator [P × r × (1 + r)ⁿ]',
      description: 'Multiply the loan principal by the monthly rate and compounding factor.',
      substitution: `${currencySymbol}${p.toLocaleString()} × ${r.toFixed(8)} × ${factorStr}`,
      result: `Numerator = ${numerator.toFixed(2)}`,
    },
    {
      stepNumber: 4,
      title: 'Evaluate Formula Denominator [(1 + r)ⁿ - 1]',
      description: 'Subtract 1 from the compounding factor to evaluate the annuity amortization discount basis.',
      substitution: `${factorStr} - 1`,
      result: `Denominator = ${denominator.toFixed(6)}`,
    },
    {
      stepNumber: 5,
      title: 'Calculate Final Equated Monthly Installment (EMI)',
      description: 'Divide the evaluated numerator by denominator to arrive at the exact monthly repayment obligation.',
      substitution: `E = ${numerator.toFixed(2)} ÷ ${denominator.toFixed(6)}`,
      result: `EMI = ${currencySymbol}${emi.toLocaleString()}`,
    },
  ];

  return steps;
}
