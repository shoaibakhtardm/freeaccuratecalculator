// src/engines/finance.ts

/**
 * Robust financial rounding helper to eradicate JS IEEE-754 floating-point drift.
 * Rounds standard monetary amounts to 2 decimal places (cents) with Number.EPSILON protection.
 */
export const roundToCents = (num: number): number => Math.round((num + Number.EPSILON) * 100) / 100;

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
  finalBalance: number;
}

export interface AmortizationScheduleRow {
  month: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export interface LoanAmortizationResult {
  regularEMI: number;
  totalInterest: number;
  totalPayment: number;
  finalBalance: number;
  schedule: AmortizationScheduleRow[];
}

/**
 * Calculates Loan EMI with optional monthly extra prepayment or one-time lump-sum prepayment.
 * Uses roundToCents at every arithmetic step and safely eliminates floating point drift.
 */
export function calculateEMIWithPrepayment(
  loanAmount: number,
  annualInterestRate: number,
  tenureYears: number,
  extraMonthlyPayment: number = 0,
  lumpSumPrepayment: number = 0,
  lumpSumMonth: number = 12
): PrepaymentEMIResult {
  if (
    isNaN(loanAmount) ||
    !isFinite(loanAmount) ||
    isNaN(annualInterestRate) ||
    !isFinite(annualInterestRate) ||
    isNaN(tenureYears) ||
    !isFinite(tenureYears) ||
    isNaN(extraMonthlyPayment) ||
    !isFinite(extraMonthlyPayment) ||
    isNaN(lumpSumPrepayment) ||
    !isFinite(lumpSumPrepayment) ||
    isNaN(lumpSumMonth) ||
    !isFinite(lumpSumMonth)
  ) {
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
      finalBalance: 0,
    };
  }

  const p = roundToCents(Math.max(0, Number(loanAmount) || 0));
  const annualRate = Math.max(0, Number(annualInterestRate) || 0);
  const years = Math.max(0, Number(tenureYears) || 0);
  const extraMonthly = roundToCents(Math.max(0, Number(extraMonthlyPayment) || 0));
  const lumpSum = roundToCents(Math.max(0, Number(lumpSumPrepayment) || 0));
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
      finalBalance: 0,
    };
  }

  const originalMonths = Math.round(years * 12);
  const monthlyRate = annualRate / 12 / 100;

  // Standard EMI: [P * r * (1 + r)^n] / [(1 + r)^n - 1]
  let regularEMI = 0;
  if (monthlyRate === 0 || !isFinite(monthlyRate)) {
    regularEMI = originalMonths > 0 ? roundToCents(p / originalMonths) : 0;
  } else {
    const factor = Math.pow(1 + monthlyRate, originalMonths);
    const denom = factor - 1;
    if (denom <= 0 || !isFinite(factor)) {
      regularEMI = originalMonths > 0 ? roundToCents(p / originalMonths) : 0;
    } else {
      regularEMI = roundToCents((p * monthlyRate * factor) / denom);
    }
  }

  if (isNaN(regularEMI) || !isFinite(regularEMI)) {
    regularEMI = 0;
  }

  const totalPaymentWithout = roundToCents(regularEMI * originalMonths);
  const totalInterestWithout = Math.max(0, roundToCents(totalPaymentWithout - p));

  // Simulation with prepayment using strict cents rounding and safe zero checks
  let balance = p;
  let totalInterestWith = 0;
  let totalPaidWith = 0;
  let month = 0;

  while (roundToCents(balance) > 0 && month < originalMonths * 2) {
    month++;
    const interest = roundToCents(balance * monthlyRate);
    totalInterestWith = roundToCents(totalInterestWith + interest);

    let payment = roundToCents(regularEMI + extraMonthly);
    if (month === lumpMonth) {
      payment = roundToCents(payment + lumpSum);
    }

    // Critical Bug #3: Negative amortization protection (payment must exceed interest)
    if (monthlyRate > 0 && payment <= interest && balance > 0) {
      return {
        regularEMI,
        totalInterestWithoutPrepayment: roundToCents(totalInterestWithout),
        totalPaymentWithoutPrepayment: roundToCents(totalPaymentWithout),
        totalInterestWithPrepayment: totalInterestWithout,
        totalPaymentWithPrepayment: totalPaymentWithout,
        interestSaved: 0,
        originalTenureMonths: originalMonths,
        newTenureMonths: originalMonths,
        monthsSaved: 0,
        finalBalance: balance,
      };
    }

    let principalPaid = roundToCents(payment - interest);
    if (principalPaid >= balance || (month === originalMonths && extraMonthly === 0 && lumpSum === 0)) {
      principalPaid = balance;
      payment = roundToCents(principalPaid + interest);
      balance = 0;
    } else {
      balance = roundToCents(balance - principalPaid);
    }

    totalPaidWith = roundToCents(totalPaidWith + payment);

    if (roundToCents(balance) <= 0) {
      balance = 0;
      break;
    }
  }

  const newMonths = month;
  const interestSaved = Math.max(0, roundToCents(totalInterestWithout - totalInterestWith));
  const monthsSaved = Math.max(0, originalMonths - newMonths);

  return {
    regularEMI,
    totalInterestWithoutPrepayment: roundToCents(totalInterestWithout),
    totalPaymentWithoutPrepayment: roundToCents(totalPaymentWithout),
    totalInterestWithPrepayment: roundToCents(totalInterestWith),
    totalPaymentWithPrepayment: roundToCents(totalPaidWith),
    interestSaved: roundToCents(interestSaved),
    originalTenureMonths: originalMonths,
    newTenureMonths: newMonths,
    monthsSaved,
    finalBalance: roundToCents(balance),
  };
}

/**
 * Calculates complete month-by-month loan amortization schedule.
 * Accurately reduces balance to $0.00 without floating-point residual drift.
 */
export function calculateLoanAmortization(
  loanAmount: number,
  annualInterestRate: number,
  tenureMonths: number,
  extraMonthlyPayment: number = 0
): LoanAmortizationResult {
  if (
    isNaN(loanAmount) ||
    !isFinite(loanAmount) ||
    isNaN(annualInterestRate) ||
    !isFinite(annualInterestRate) ||
    isNaN(tenureMonths) ||
    !isFinite(tenureMonths) ||
    isNaN(extraMonthlyPayment) ||
    !isFinite(extraMonthlyPayment)
  ) {
    return {
      regularEMI: 0,
      totalInterest: 0,
      totalPayment: 0,
      finalBalance: 0,
      schedule: [],
    };
  }

  const p = roundToCents(Math.max(0, Number(loanAmount) || 0));
  const annualRate = Math.max(0, Number(annualInterestRate) || 0);
  const totalMonths = Math.max(0, Math.round(Number(tenureMonths) || 0));
  const extraMonthly = roundToCents(Math.max(0, Number(extraMonthlyPayment) || 0));

  if (p === 0 || totalMonths === 0) {
    return {
      regularEMI: 0,
      totalInterest: 0,
      totalPayment: 0,
      finalBalance: 0,
      schedule: [],
    };
  }

  const monthlyRate = annualRate / 12 / 100;
  let regularEMI = 0;

  if (monthlyRate === 0 || !isFinite(monthlyRate)) {
    regularEMI = roundToCents(p / totalMonths);
  } else {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    const denom = factor - 1;
    if (denom <= 0 || !isFinite(factor)) {
      regularEMI = roundToCents(p / totalMonths);
    } else {
      regularEMI = roundToCents((p * monthlyRate * factor) / denom);
    }
  }

  const schedule: AmortizationScheduleRow[] = [];
  let balance = p;
  let totalInterest = 0;
  let totalPayment = 0;
  let month = 0;

  while (roundToCents(balance) > 0 && month < totalMonths * 2) {
    month++;
    const interest = roundToCents(balance * monthlyRate);
    totalInterest = roundToCents(totalInterest + interest);

    let payment = roundToCents(regularEMI + extraMonthly);

    let principalPaid = roundToCents(payment - interest);
    if (principalPaid >= balance || (month === totalMonths && extraMonthly === 0)) {
      principalPaid = balance;
      payment = roundToCents(principalPaid + interest);
      balance = 0;
    } else {
      balance = roundToCents(balance - principalPaid);
    }

    totalPayment = roundToCents(totalPayment + payment);

    schedule.push({
      month,
      payment,
      principalPaid,
      interestPaid: interest,
      remainingBalance: balance,
    });

    if (roundToCents(balance) <= 0) {
      balance = 0;
      break;
    }
  }

  return {
    regularEMI,
    totalInterest,
    totalPayment,
    finalBalance: roundToCents(balance),
    schedule,
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
 * Calculates Profit Margin and Markup with cents precision.
 */
export function calculateProfitMargin(cost: number, revenue: number): ProfitMarginResult {
  if (isNaN(cost) || isNaN(revenue) || !isFinite(cost) || !isFinite(revenue)) {
    return {
      cost: 0,
      revenue: 0,
      grossProfit: 0,
      grossMarginPercent: 0,
      markupPercent: 0,
    };
  }

  const c = roundToCents(Math.max(0, Number(cost) || 0));
  const r = roundToCents(Math.max(0, Number(revenue) || 0));

  const grossProfit = roundToCents(r - c);
  const grossMarginPercent = r > 0 ? roundToCents((grossProfit / r) * 100) : 0;
  const markupPercent = c > 0 ? roundToCents((grossProfit / c) * 100) : 0;

  return {
    cost: c,
    revenue: r,
    grossProfit,
    grossMarginPercent: isFinite(grossMarginPercent) ? grossMarginPercent : 0,
    markupPercent: isFinite(markupPercent) ? markupPercent : 0,
  };
}

export interface BreakEvenResult {
  breakEvenUnits: number;
  breakEvenRevenue: number;
  contributionMargin: number;
  contributionMarginRatio: number;
}

/**
 * Calculates Break-Even Point in Units and Revenue with cents precision.
 */
export function calculateBreakEven(
  fixedCosts: number,
  salesPricePerUnit: number,
  variableCostPerUnit: number
): BreakEvenResult {
  if (
    isNaN(fixedCosts) ||
    isNaN(salesPricePerUnit) ||
    isNaN(variableCostPerUnit) ||
    !isFinite(fixedCosts) ||
    !isFinite(salesPricePerUnit) ||
    !isFinite(variableCostPerUnit)
  ) {
    return {
      breakEvenUnits: 0,
      breakEvenRevenue: 0,
      contributionMargin: 0,
      contributionMarginRatio: 0,
    };
  }

  const fc = roundToCents(Math.max(0, Number(fixedCosts) || 0));
  const price = roundToCents(Math.max(0, Number(salesPricePerUnit) || 0));
  const vc = roundToCents(Math.max(0, Number(variableCostPerUnit) || 0));

  const contributionMargin = roundToCents(price - vc);
  if (contributionMargin <= 0 || price <= 0) {
    return {
      breakEvenUnits: 0,
      breakEvenRevenue: 0,
      contributionMargin: 0,
      contributionMarginRatio: 0,
    };
  }

  const breakEvenUnits = Math.ceil(fc / contributionMargin);
  const contributionMarginRatio = price > 0 ? contributionMargin / price : 0;
  const breakEvenRevenue = contributionMarginRatio > 0 ? roundToCents(fc / contributionMarginRatio) : 0;

  return {
    breakEvenUnits: isFinite(breakEvenUnits) ? breakEvenUnits : 0,
    breakEvenRevenue: isFinite(breakEvenRevenue) ? breakEvenRevenue : 0,
    contributionMargin,
    contributionMarginRatio: roundToCents(contributionMarginRatio * 100),
  };
}

export interface SalaryBreakdownResult {
  annual: number;
  monthly: number;
  biweekly: number;
  weekly: number;
  daily: number;
  hourly: number;
  error?: string;
}

/**
 * Calculates converted salary across multiple frequencies.
 * Strictly guards against negative salaries and invalid inputs.
 */
export function calculateSalary(
  salary: number,
  hoursPerWeek: number = 40,
  frequency: 'hourly' | 'weekly' | 'biweekly' | 'monthly' | 'annual' = 'hourly'
): SalaryBreakdownResult {
  if (isNaN(salary) || !isFinite(salary) || typeof salary !== 'number') {
    return {
      annual: 0,
      monthly: 0,
      biweekly: 0,
      weekly: 0,
      daily: 0,
      hourly: 0,
      error: 'Please enter a valid positive salary amount.',
    };
  }

  // Strict negative salary check
  if (salary < 0) {
    return {
      annual: 0,
      monthly: 0,
      biweekly: 0,
      weekly: 0,
      daily: 0,
      hourly: 0,
      error: 'Salary cannot be negative. Please enter a valid positive salary amount.',
    };
  }

  const hrs = Number(hoursPerWeek);
  if (isNaN(hrs) || !isFinite(hrs) || hrs <= 0 || hrs > 168) {
    return {
      annual: 0,
      monthly: 0,
      biweekly: 0,
      weekly: 0,
      daily: 0,
      hourly: 0,
      error: 'Please enter valid weekly working hours (1 to 168).',
    };
  }

  let annual = 0;
  if (frequency === 'hourly') {
    annual = salary * hrs * 52;
  } else if (frequency === 'weekly') {
    annual = salary * 52;
  } else if (frequency === 'biweekly') {
    annual = salary * 26;
  } else if (frequency === 'monthly') {
    annual = salary * 12;
  } else {
    annual = salary;
  }

  const safeAnnual = roundToCents(annual);
  const monthly = roundToCents(safeAnnual / 12);
  const biweekly = roundToCents(safeAnnual / 26);
  const weekly = roundToCents(safeAnnual / 52);
  const daily = roundToCents(weekly / 5);
  const hourly = roundToCents(safeAnnual / (hrs * 52));

  return {
    annual: safeAnnual,
    monthly,
    biweekly,
    weekly,
    daily,
    hourly,
  };
}
