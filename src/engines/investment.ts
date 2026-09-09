// src/engines/investment.ts

export type ContributionTiming = 'beginning' | 'end';

/**
 * Returns the regional standard contribution timing:
 * - India ('IN') standardly defaults to 'beginning' (Annuity Due for SIPs)
 * - United States ('US') and international standardly default to 'end' (Ordinary Annuity)
 */
export function getDefaultContributionTiming(countryCode?: string | null): ContributionTiming {
  if (!countryCode) return 'beginning';
  return countryCode.toUpperCase() === 'IN' ? 'beginning' : 'end';
}

export interface SIPResult {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
  contributionTiming: ContributionTiming;
  yearlyBreakdown?: Array<{
    year: number;
    invested: number;
    interestEarned: number;
    balance: number;
  }>;
}

/**
 * Calculates Systematic Investment Plan (SIP) returns.
 *
 * Formulas:
 * - Beginning of period (Annuity Due / India standard):
 *     FV = P * [((1 + i)^n - 1) / i] * (1 + i)
 * - End of period (Ordinary Annuity / US standard):
 *     FV = P * [((1 + i)^n - 1) / i]
 *
 * Robustly protected against division-by-zero (when return rate is 0%).
 */
export function calculateSIP(
  monthlyInvestment: number,
  expectedReturnRate: number, // annual percentage e.g. 12
  timeHorizonYears: number,
  contributionTiming: ContributionTiming = 'beginning'
): SIPResult {
  const p = Math.max(0, Number(monthlyInvestment) || 0);
  const annualRate = Math.max(0, Number(expectedReturnRate) || 0);
  const years = Math.max(0, Number(timeHorizonYears) || 0);

  if (
    isNaN(p) ||
    !isFinite(p) ||
    isNaN(annualRate) ||
    !isFinite(annualRate) ||
    isNaN(years) ||
    !isFinite(years) ||
    p === 0 ||
    years === 0
  ) {
    return {
      investedAmount: 0,
      estimatedReturns: 0,
      totalValue: 0,
      contributionTiming,
    };
  }

  const months = Math.round(years * 12);
  const monthlyRate = annualRate / 12 / 100;
  const investedAmount = p * months;

  let totalValue = 0;

  // Zero or negligible return rate guard (division by zero protection)
  if (monthlyRate <= 0 || !isFinite(monthlyRate) || Math.abs(monthlyRate) < 1e-12) {
    totalValue = investedAmount;
  } else {
    const compoundFactor = Math.pow(1 + monthlyRate, months);
    if (!isFinite(compoundFactor)) {
      totalValue = investedAmount;
    } else {
      const ordinaryAnnuity = p * ((compoundFactor - 1) / monthlyRate);

      totalValue = contributionTiming === 'beginning'
        ? ordinaryAnnuity * (1 + monthlyRate)
        : ordinaryAnnuity;
    }
  }

  if (isNaN(totalValue) || !isFinite(totalValue)) {
    totalValue = investedAmount;
  }

  const estimatedReturns = Math.max(0, totalValue - investedAmount);

  return {
    investedAmount: Math.round(investedAmount),
    estimatedReturns: Math.round(estimatedReturns),
    totalValue: Math.round(totalValue),
    contributionTiming,
  };
}

export interface StepUpSIPResult extends SIPResult {
  finalMonthlyInvestment: number;
}

/**
 * Calculates Step-Up SIP returns where monthly investment increases annually.
 * Accommodates beginning vs end of period deposit timing.
 */
export function calculateStepUpSIP(
  initialMonthlyInvestment: number,
  annualStepUpPercent: number, // annual increase percentage e.g. 10
  expectedReturnRate: number, // annual rate e.g. 12
  timeHorizonYears: number,
  contributionTiming: ContributionTiming = 'beginning'
): StepUpSIPResult {
  const p = Math.max(0, Number(initialMonthlyInvestment) || 0);
  const stepUp = Math.max(0, Number(annualStepUpPercent) || 0) / 100;
  const annualRate = Math.max(0, Number(expectedReturnRate) || 0) / 100;
  const monthlyRate = annualRate / 12;
  const years = Math.max(0, Math.round(Number(timeHorizonYears) || 0));

  if (
    isNaN(p) ||
    !isFinite(p) ||
    isNaN(stepUp) ||
    !isFinite(stepUp) ||
    isNaN(annualRate) ||
    !isFinite(annualRate) ||
    isNaN(years) ||
    !isFinite(years) ||
    p === 0 ||
    years === 0
  ) {
    return {
      investedAmount: 0,
      estimatedReturns: 0,
      totalValue: 0,
      finalMonthlyInvestment: 0,
      contributionTiming,
    };
  }

  let balance = 0;
  let totalInvested = 0;
  let currentMonthlyP = p;

  for (let y = 1; y <= years; y++) {
    for (let m = 1; m <= 12; m++) {
      if (contributionTiming === 'beginning') {
        // Deposited at the start: earns monthly interest in full
        balance = (balance + currentMonthlyP) * (1 + monthlyRate);
      } else {
        // Deposited at the end: existing balance earns interest, then installment added
        balance = balance * (1 + monthlyRate) + currentMonthlyP;
      }
      totalInvested += currentMonthlyP;
    }
    if (y < years) {
      currentMonthlyP = currentMonthlyP * (1 + stepUp);
    }
  }

  if (isNaN(balance) || !isFinite(balance)) {
    balance = totalInvested;
  }

  return {
    investedAmount: Math.round(totalInvested),
    estimatedReturns: Math.round(Math.max(0, balance - totalInvested)),
    totalValue: Math.round(balance),
    finalMonthlyInvestment: Math.round(currentMonthlyP),
    contributionTiming,
  };
}

export interface CompoundInterestInput {
  principal: number;
  monthlyContribution?: number;
  annualRate: number;
  years: number;
  compoundingFrequency?: number | 'continuous'; // 1, 2, 4, 12, 365, or 'continuous'
  contributionTiming?: ContributionTiming;
}

export interface CompoundInterestResult {
  investedPrincipal: number;
  totalContributions: number;
  totalInvested: number;
  interestEarned: number;
  futureValue: number;
  contributionTiming: ContributionTiming;
}

/**
 * Calculates compound interest across all discrete frequencies and continuous compounding.
 * Supports annuity due (beginning) vs ordinary annuity (end).
 * Zero-division protected.
 */
export function calculateCompoundInterest(input: CompoundInterestInput): CompoundInterestResult {
  const p = Math.max(0, Number(input.principal) || 0);
  const pmt = Math.max(0, Number(input.monthlyContribution) || 0);
  const r = Math.max(0, Number(input.annualRate) || 0) / 100;
  const t = Math.max(0, Number(input.years) || 0);
  const freq = input.compoundingFrequency ?? 12;
  const timing: ContributionTiming = input.contributionTiming ?? 'end';
  const isBeginning = timing === 'beginning';

  if (
    isNaN(p) ||
    !isFinite(p) ||
    isNaN(pmt) ||
    !isFinite(pmt) ||
    isNaN(r) ||
    !isFinite(r) ||
    isNaN(t) ||
    !isFinite(t)
  ) {
    return {
      investedPrincipal: 0,
      totalContributions: 0,
      totalInvested: 0,
      interestEarned: 0,
      futureValue: 0,
      contributionTiming: timing,
    };
  }

  const totalContributions = pmt * 12 * t;
  const totalInvested = p + totalContributions;

  if (t === 0) {
    return {
      investedPrincipal: p,
      totalContributions: 0,
      totalInvested: p,
      interestEarned: 0,
      futureValue: p,
      contributionTiming: timing,
    };
  }

  // Zero-rate edge case
  if (r <= 0 || !isFinite(r) || Math.abs(r) < 1e-12) {
    return {
      investedPrincipal: p,
      totalContributions,
      totalInvested,
      interestEarned: 0,
      futureValue: totalInvested,
      contributionTiming: timing,
    };
  }

  let futureValue = 0;

  if (freq === 'continuous') {
    const principalGrowth = p * Math.exp(r * t);
    const effectiveMonthlyR = Math.exp(r / 12) - 1;
    const months = 12 * t;
    const annuityFactor = (effectiveMonthlyR > 0 && isFinite(effectiveMonthlyR))
      ? (Math.pow(1 + effectiveMonthlyR, months) - 1) / effectiveMonthlyR
      : months;
    const pmtGrowth = pmt * annuityFactor * (isBeginning ? (1 + effectiveMonthlyR) : 1);
    futureValue = principalGrowth + pmtGrowth;
  } else {
    const n = Math.max(1, typeof freq === 'number' ? freq : (parseFloat(String(freq)) || 12));
    const principalGrowth = p * Math.pow(1 + r / n, n * t);

    // Monthly contributions with frequency n compounding
    const effectiveMonthlyR = Math.pow(1 + r / n, n / 12) - 1;
    const months = 12 * t;
    let pmtGrowth = 0;
    if (effectiveMonthlyR > 0 && isFinite(effectiveMonthlyR)) {
      const annuityFactor = (Math.pow(1 + effectiveMonthlyR, months) - 1) / effectiveMonthlyR;
      pmtGrowth = pmt * annuityFactor * (isBeginning ? (1 + effectiveMonthlyR) : 1);
    } else {
      pmtGrowth = totalContributions;
    }
    futureValue = principalGrowth + pmtGrowth;
  }

  if (isNaN(futureValue) || !isFinite(futureValue)) {
    futureValue = totalInvested;
  }

  const interestEarned = Math.max(0, futureValue - totalInvested);

  return {
    investedPrincipal: p,
    totalContributions: Math.round(totalContributions),
    totalInvested: Math.round(totalInvested),
    interestEarned: Number(interestEarned.toFixed(2)),
    futureValue: Number(futureValue.toFixed(2)),
    contributionTiming: timing,
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

  if (
    isNaN(p) ||
    !isFinite(p) ||
    isNaN(rate) ||
    !isFinite(rate) ||
    isNaN(years) ||
    !isFinite(years) ||
    p === 0 ||
    years === 0
  ) {
    return { investedAmount: p, estimatedReturns: 0, totalValue: p };
  }

  const factor = Math.pow(1 + rate, years);
  const totalValue = isFinite(factor) ? p * factor : p;
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
  withdrawalTiming: ContributionTiming;
}

/**
 * Calculates Systematic Withdrawal Plan (SWP) returns
 */
export function calculateSWP(
  initialInvestment: number,
  monthlyWithdrawal: number,
  expectedReturnRate: number,
  timeHorizonYears: number,
  withdrawalTiming: ContributionTiming = 'beginning'
): SWPResult {
  let balance = Math.max(0, Number(initialInvestment) || 0);
  const withdrawal = Math.max(0, Number(monthlyWithdrawal) || 0);
  const monthlyRate = (Math.max(0, Number(expectedReturnRate) || 0) / 100) / 12;
  const totalMonths = Math.round(Math.max(0, Number(timeHorizonYears) || 0) * 12);

  if (
    isNaN(balance) ||
    !isFinite(balance) ||
    isNaN(withdrawal) ||
    !isFinite(withdrawal) ||
    isNaN(monthlyRate) ||
    !isFinite(monthlyRate) ||
    isNaN(totalMonths) ||
    !isFinite(totalMonths)
  ) {
    return {
      totalInvested: 0,
      totalWithdrawn: 0,
      finalBalance: 0,
      depletedEarly: false,
      withdrawalTiming,
    };
  }

  let totalWithdrawn = 0;
  let depletedEarly = false;
  let depletedAtMonth: number | undefined;

  for (let m = 1; m <= totalMonths; m++) {
    if (withdrawalTiming === 'beginning') {
      if (balance < withdrawal) {
        totalWithdrawn += balance;
        balance = 0;
        depletedEarly = true;
        depletedAtMonth = m;
        break;
      }
      balance -= withdrawal;
      totalWithdrawn += withdrawal;
      balance = balance * (1 + monthlyRate);
    } else {
      // Accrue interest first, then withdraw
      balance = balance * (1 + monthlyRate);
      if (balance < withdrawal) {
        totalWithdrawn += balance;
        balance = 0;
        depletedEarly = true;
        depletedAtMonth = m;
        break;
      }
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
    withdrawalTiming,
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

  if (
    isNaN(bv) ||
    isNaN(ev) ||
    isNaN(y) ||
    !isFinite(bv) ||
    !isFinite(ev) ||
    !isFinite(y) ||
    bv <= 0 ||
    ev <= 0 ||
    y <= 0
  ) {
    return 0;
  }

  const cagr = (Math.pow(ev / bv, 1 / y) - 1) * 100;
  if (isNaN(cagr) || !isFinite(cagr)) {
    return 0;
  }
  return Number(cagr.toFixed(2));
}
