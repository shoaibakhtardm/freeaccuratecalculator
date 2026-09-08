// src/engines/tax-us.ts

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
 * Calculates US Federal Income Tax and FICA for Tax Year 2024 / 2025
 */
export function calculateUSIncomeTax(input: USIncomeTaxInput): USIncomeTaxResult {
  const gross = Math.max(0, Number(input.grossAnnualIncome) || 0);
  const status = input.filingStatus || 'single';
  const preTax401k = Math.min(23000, Math.max(0, Number(input.traditional401k) || 0)); // 2024 IRS limit: $23,000

  // Adjusted Gross Income (AGI)
  const agi = Math.max(0, gross - preTax401k);

  // Standard Deductions 2024
  const standardDeduction = status === 'married_joint' ? 29200 : 14600;
  const deduction = Math.max(standardDeduction, Math.max(0, Number(input.itemizedDeductions) || 0));
  const taxableIncome = Math.max(0, agi - deduction);

  // 2024 Federal Tax Brackets (Single)
  let federalTax = 0;
  if (status === 'married_joint') {
    if (taxableIncome > 731200) {
      federalTax += (taxableIncome - 731200) * 0.37;
      federalTax += (731200 - 487450) * 0.35;
      federalTax += (487450 - 383900) * 0.32;
      federalTax += (383900 - 201050) * 0.24;
      federalTax += (201050 - 94300) * 0.22;
      federalTax += (94300 - 23200) * 0.12;
      federalTax += 23200 * 0.10;
    } else if (taxableIncome > 487450) {
      federalTax += (taxableIncome - 487450) * 0.35;
      federalTax += (487450 - 383900) * 0.32;
      federalTax += (383900 - 201050) * 0.24;
      federalTax += (201050 - 94300) * 0.22;
      federalTax += (94300 - 23200) * 0.12;
      federalTax += 23200 * 0.10;
    } else if (taxableIncome > 383900) {
      federalTax += (taxableIncome - 383900) * 0.32;
      federalTax += (383900 - 201050) * 0.24;
      federalTax += (201050 - 94300) * 0.22;
      federalTax += (94300 - 23200) * 0.12;
      federalTax += 23200 * 0.10;
    } else if (taxableIncome > 201050) {
      federalTax += (taxableIncome - 201050) * 0.24;
      federalTax += (201050 - 94300) * 0.22;
      federalTax += (94300 - 23200) * 0.12;
      federalTax += 23200 * 0.10;
    } else if (taxableIncome > 94300) {
      federalTax += (taxableIncome - 94300) * 0.22;
      federalTax += (94300 - 23200) * 0.12;
      federalTax += 23200 * 0.10;
    } else if (taxableIncome > 23200) {
      federalTax += (taxableIncome - 23200) * 0.12;
      federalTax += 23200 * 0.10;
    } else if (taxableIncome > 0) {
      federalTax += taxableIncome * 0.10;
    }
  } else {
    // Single
    if (taxableIncome > 609350) {
      federalTax += (taxableIncome - 609350) * 0.37;
      federalTax += (609350 - 243725) * 0.35;
      federalTax += (243725 - 191950) * 0.32;
      federalTax += (191950 - 100525) * 0.24;
      federalTax += (100525 - 47150) * 0.22;
      federalTax += (47150 - 11600) * 0.12;
      federalTax += 11600 * 0.10;
    } else if (taxableIncome > 243725) {
      federalTax += (taxableIncome - 243725) * 0.35;
      federalTax += (243725 - 191950) * 0.32;
      federalTax += (191950 - 100525) * 0.24;
      federalTax += (100525 - 47150) * 0.22;
      federalTax += (47150 - 11600) * 0.12;
      federalTax += 11600 * 0.10;
    } else if (taxableIncome > 191950) {
      federalTax += (taxableIncome - 191950) * 0.32;
      federalTax += (191950 - 100525) * 0.24;
      federalTax += (100525 - 47150) * 0.22;
      federalTax += (47150 - 11600) * 0.12;
      federalTax += 11600 * 0.10;
    } else if (taxableIncome > 100525) {
      federalTax += (taxableIncome - 100525) * 0.24;
      federalTax += (100525 - 47150) * 0.22;
      federalTax += (47150 - 11600) * 0.12;
      federalTax += 11600 * 0.10;
    } else if (taxableIncome > 47150) {
      federalTax += (taxableIncome - 47150) * 0.22;
      federalTax += (47150 - 11600) * 0.12;
      federalTax += 11600 * 0.10;
    } else if (taxableIncome > 11600) {
      federalTax += (taxableIncome - 11600) * 0.12;
      federalTax += 11600 * 0.10;
    } else if (taxableIncome > 0) {
      federalTax += taxableIncome * 0.10;
    }
  }

  // FICA Taxes (FICA applies to gross minus certain pre-tax benefits; 401k is NOT exempt from FICA)
  const ssWageCap = 168600; // 2024 Social Security wage base limit
  const socialSecurity = Math.min(gross, ssWageCap) * 0.062;

  // Medicare: 1.45% + 0.9% additional over $200,000 ($250k for joint)
  let medicare = gross * 0.0145;
  const medicareThreshold = status === 'married_joint' ? 250000 : 200000;
  if (gross > medicareThreshold) {
    medicare += (gross - medicareThreshold) * 0.009;
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
    effectiveTaxRate: gross > 0 ? Number(((totalTax / gross) * 100).toFixed(2)) : 0,
    annualTakeHome: Math.round(netTakeHome),
    monthlyTakeHome: Math.round(netTakeHome / 12),
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

  const finalBalance = Math.round(balance);
  const totalContrib = totalEmp + totalEmpr + currentBalance;
  const interestEarned = Math.round(Math.max(0, finalBalance - totalContrib));

  return {
    totalBalance: finalBalance,
    employeeContributions: Math.round(totalEmp),
    employerContributions: Math.round(totalEmpr),
    totalInterestEarned: interestEarned,
  };
}

export interface RothIraResult {
  totalBalance: number;
  totalContributions: number;
  taxFreeEarnings: number;
}

/**
 * Calculates Roth IRA Compounding (Tax-Free Growth)
 */
export function calculateRothIra(
  currentBalance: number,
  annualContribution: number = 7000,
  years: number = 30,
  expectedReturnRate: number = 7
): RothIraResult {
  let balance = Math.max(0, Number(currentBalance) || 0);
  const annualContrib = Math.min(8000, Math.max(0, Number(annualContribution) || 0)); // 2024 IRS limit
  const rate = Math.max(0, Number(expectedReturnRate) || 0) / 100;
  const totalYears = Math.max(1, Math.round(Number(years) || 1));

  let totalContrib = balance;

  for (let y = 1; y <= totalYears; y++) {
    balance = (balance + annualContrib) * (1 + rate);
    totalContrib += annualContrib;
  }

  const finalBalance = Math.round(balance);
  const earnings = Math.round(Math.max(0, finalBalance - totalContrib));

  return {
    totalBalance: finalBalance,
    totalContributions: Math.round(totalContrib),
    taxFreeEarnings: earnings,
  };
}
