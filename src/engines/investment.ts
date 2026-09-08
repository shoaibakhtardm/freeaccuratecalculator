// src/engines/investment.ts

export interface SIPResult {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
  yearlyBreakdown?: Array<{
    year: number;
    invested: number;
    interestEarned: number;
    balance: number;
  }>;
}

/**
 * Calculates Systematic Investment Plan (SIP) returns
 * Formula: FV = P * [((1 + i)^n - 1) / i] * (1 + i)
 */
export function calculateSIP(
  monthlyInvestment: number,
  expectedReturnRate: number, // annual percentage e.g. 12
  timeHorizonYears: number
): SIPResult {
  const p = Math.max(0, Number(monthlyInvestment) || 0);
  const annualRate = Math.max(0, Number(expectedReturnRate) || 0);
  const years = Math.max(0, Number(timeHorizonYears) || 0);

  if (p === 0 || years === 0) {
    return { investedAmount: 0, estimatedReturns: 0, totalValue: 0 };
  }

  const months = Math.round(years * 12);
  const monthlyRate = annualRate / 12 / 100;

  let totalValue = 0;
  if (monthlyRate === 0) {
    totalValue = p * months;
  } else {
    totalValue = p * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  }

  const investedAmount = p * months;
  const estimatedReturns = Math.max(0, totalValue - investedAmount);

  return {
    investedAmount: Math.round(investedAmount),
    estimatedReturns: Math.round(estimatedReturns),
    totalValue: Math.round(totalValue),
  };
}

export interface StepUpSIPResult extends SIPResult {
  finalMonthlyInvestment: number;
}

/**
 * Calculates Step-Up SIP returns where monthly investment increases annually
 */
export function calculateStepUpSIP(
  initialMonthlyInvestment: number,
  annualStepUpPercent: number, // annual increase percentage e.g. 10
  expectedReturnRate: number, // annual rate e.g. 12
  timeHorizonYears: number
): StepUpSIPResult {
  let p = Math.max(0, Number(initialMonthlyInvestment) || 0);
  const stepUp = Math.max(0, Number(annualStepUpPercent) || 0) / 100;
  const annualRate = Math.max(0, Number(expectedReturnRate) || 0) / 100;
  const monthlyRate = annualRate / 12;
  const years = Math.max(0, Math.round(Number(timeHorizonYears) || 0));

  if (p === 0 || years === 0) {
    return { investedAmount: 0, estimatedReturns: 0, totalValue: 0, finalMonthlyInvestment: 0 };
  }

  let balance = 0;
  let totalInvested = 0;
  let currentMonthlyP = p;

  for (let y = 1; y <= years; y++) {
    for (let m = 1; m <= 12; m++) {
      balance = (balance + currentMonthlyP) * (1 + monthlyRate);
      totalInvested += currentMonthlyP;
    }
    if (y < years) {
      currentMonthlyP = currentMonthlyP * (1 + stepUp);
    }
  }

  return {
    investedAmount: Math.round(totalInvested),
    estimatedReturns: Math.round(Math.max(0, balance - totalInvested)),
    totalValue: Math.round(balance),
    finalMonthlyInvestment: Math.round(currentMonthlyP),
  };
}

export interface LumpsumResult {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
}

/**
 * Calculates Lumpsum Mutual Fund / Investment growth
 * Formula: A = P * (1 + r)^t
 */
export function calculateLumpsum(
  investmentAmount: number,
  expectedReturnRate: number,
  timeHorizonYears: number
): LumpsumResult {
  const p = Math.max(0, Number(investmentAmount) || 0);
  const rate = Math.max(0, Number(expectedReturnRate) || 0) / 100;
  const years = Math.max(0, Number(timeHorizonYears) || 0);

  if (p === 0 || years === 0) {
    return { investedAmount: p, estimatedReturns: 0, totalValue: p };
  }

  const totalValue = p * Math.pow(1 + rate, years);
  const estimatedReturns = Math.max(0, totalValue - p);

  return {
    investedAmount: Math.round(p),
    estimatedReturns: Math.round(estimatedReturns),
    totalValue: Math.round(totalValue),
  };
}

export interface SWPResult {
  totalInvested: number;
  totalWithdrawn: number;
  finalBalance: number;
  depletedEarly: boolean;
  depletedAtMonth?: number;
}

/**
 * Calculates Systematic Withdrawal Plan (SWP) returns
 */
export function calculateSWP(
  initialInvestment: number,
  monthlyWithdrawal: number,
  expectedReturnRate: number,
  timeHorizonYears: number
): SWPResult {
  let balance = Math.max(0, Number(initialInvestment) || 0);
  const withdrawal = Math.max(0, Number(monthlyWithdrawal) || 0);
  const monthlyRate = (Math.max(0, Number(expectedReturnRate) || 0) / 100) / 12;
  const totalMonths = Math.round(Math.max(0, Number(timeHorizonYears) || 0) * 12);

  let totalWithdrawn = 0;
  let depletedEarly = false;
  let depletedAtMonth: number | undefined;

  for (let m = 1; m <= totalMonths; m++) {
    // Accrue interest for the month
    balance = balance * (1 + monthlyRate);

    if (balance < withdrawal) {
      totalWithdrawn += balance;
      balance = 0;
      depletedEarly = true;
      depletedAtMonth = m;
      break;
    } else {
      balance -= withdrawal;
      totalWithdrawn += withdrawal;
    }
  }

  return {
    totalInvested: Math.round(initialInvestment),
    totalWithdrawn: Math.round(totalWithdrawn),
    finalBalance: Math.round(balance),
    depletedEarly,
    depletedAtMonth,
  };
}

/**
 * Calculates Compound Annual Growth Rate (CAGR)
 * Formula: ((Ending Value / Beginning Value) ^ (1 / Years)) - 1
 */
export function calculateCAGR(
  beginningValue: number,
  endingValue: number,
  years: number
): number {
  const bv = Number(beginningValue);
  const ev = Number(endingValue);
  const y = Number(years);

  if (bv <= 0 || ev <= 0 || y <= 0) return 0;

  const cagr = (Math.pow(ev / bv, 1 / y) - 1) * 100;
  return Number(cagr.toFixed(2));
}
