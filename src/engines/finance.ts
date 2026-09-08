// src/engines/finance.ts

export interface PrepaymentEMIResult {
  regularEMI: number;
  totalInterestWithoutPrepayment: number;
  totalPaymentWithoutPrepayment: number;
  totalInterestWithPrepayment: number;
  totalPaymentWithPrepayment: number;
  interestSaved: number;
  originalTenureMonths: number;
  newTenureMonths: number;
  monthsSaved: number;
}

/**
 * Calculates Loan EMI with optional monthly extra prepayment or one-time lump-sum prepayment
 */
export function calculateEMIWithPrepayment(
  loanAmount: number,
  annualInterestRate: number,
  tenureYears: number,
  extraMonthlyPayment: number = 0,
  lumpSumPrepayment: number = 0,
  lumpSumMonth: number = 12
): PrepaymentEMIResult {
  const p = Math.max(0, Number(loanAmount) || 0);
  const annualRate = Math.max(0, Number(annualInterestRate) || 0);
  const years = Math.max(0, Number(tenureYears) || 0);
  const extraMonthly = Math.max(0, Number(extraMonthlyPayment) || 0);
  const lumpSum = Math.max(0, Number(lumpSumPrepayment) || 0);
  const lumpMonth = Math.max(1, Math.round(Number(lumpSumMonth) || 12));

  if (p === 0 || years === 0) {
    return {
      regularEMI: 0,
      totalInterestWithoutPrepayment: 0,
      totalPaymentWithoutPrepayment: 0,
      totalInterestWithPrepayment: 0,
      totalPaymentWithPrepayment: 0,
      interestSaved: 0,
      originalTenureMonths: 0,
      newTenureMonths: 0,
      monthsSaved: 0,
    };
  }

  const originalMonths = Math.round(years * 12);
  const monthlyRate = annualRate / 12 / 100;

  // Standard EMI: [P * r * (1 + r)^n] / [(1 + r)^n - 1]
  let regularEMI = 0;
  if (monthlyRate === 0) {
    regularEMI = p / originalMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, originalMonths);
    regularEMI = (p * monthlyRate * factor) / (factor - 1);
  }

  const totalPaymentWithout = regularEMI * originalMonths;
  const totalInterestWithout = totalPaymentWithout - p;

  // Simulation with prepayment
  let balance = p;
  let totalInterestWith = 0;
  let totalPaidWith = 0;
  let month = 0;

  while (balance > 0.01 && month < originalMonths * 2) {
    month++;
    const interest = balance * monthlyRate;
    totalInterestWith += interest;

    let payment = regularEMI + extraMonthly;
    if (month === lumpMonth) {
      payment += lumpSum;
    }

    const principalPaid = Math.min(balance, payment - interest);
    balance -= principalPaid;
    totalPaidWith += principalPaid + interest;

    if (balance <= 0.01) {
      break;
    }
  }

  const newMonths = month;
  const interestSaved = Math.max(0, totalInterestWithout - totalInterestWith);
  const monthsSaved = Math.max(0, originalMonths - newMonths);

  return {
    regularEMI: Math.round(regularEMI),
    totalInterestWithoutPrepayment: Math.round(totalInterestWithout),
    totalPaymentWithoutPrepayment: Math.round(totalPaymentWithout),
    totalInterestWithPrepayment: Math.round(totalInterestWith),
    totalPaymentWithPrepayment: Math.round(totalPaidWith),
    interestSaved: Math.round(interestSaved),
    originalTenureMonths: originalMonths,
    newTenureMonths: newMonths,
    monthsSaved,
  };
}

export interface ProfitMarginResult {
  cost: number;
  revenue: number;
  grossProfit: number;
  grossMarginPercent: number;
  markupPercent: number;
}

/**
 * Calculates Profit Margin and Markup
 */
export function calculateProfitMargin(cost: number, revenue: number): ProfitMarginResult {
  const c = Math.max(0, Number(cost) || 0);
  const r = Math.max(0, Number(revenue) || 0);

  const grossProfit = r - c;
  const grossMarginPercent = r > 0 ? (grossProfit / r) * 100 : 0;
  const markupPercent = c > 0 ? (grossProfit / c) * 100 : 0;

  return {
    cost: Number(c.toFixed(2)),
    revenue: Number(r.toFixed(2)),
    grossProfit: Number(grossProfit.toFixed(2)),
    grossMarginPercent: Number(grossMarginPercent.toFixed(2)),
    markupPercent: Number(markupPercent.toFixed(2)),
  };
}

export interface BreakEvenResult {
  breakEvenUnits: number;
  breakEvenRevenue: number;
  contributionMargin: number;
  contributionMarginRatio: number;
}

/**
 * Calculates Break-Even Point in Units and Revenue
 */
export function calculateBreakEven(
  fixedCosts: number,
  salesPricePerUnit: number,
  variableCostPerUnit: number
): BreakEvenResult {
  const fc = Math.max(0, Number(fixedCosts) || 0);
  const price = Math.max(0, Number(salesPricePerUnit) || 0);
  const vc = Math.max(0, Number(variableCostPerUnit) || 0);

  const contributionMargin = price - vc;
  if (contributionMargin <= 0) {
    return {
      breakEvenUnits: 0,
      breakEvenRevenue: 0,
      contributionMargin: 0,
      contributionMarginRatio: 0,
    };
  }

  const breakEvenUnits = Math.ceil(fc / contributionMargin);
  const contributionMarginRatio = price > 0 ? contributionMargin / price : 0;
  const breakEvenRevenue = Math.round(fc / contributionMarginRatio);

  return {
    breakEvenUnits,
    breakEvenRevenue,
    contributionMargin: Number(contributionMargin.toFixed(2)),
    contributionMarginRatio: Number((contributionMarginRatio * 100).toFixed(2)),
  };
}
