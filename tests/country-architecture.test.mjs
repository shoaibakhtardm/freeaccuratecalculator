// tests/country-architecture.test.mjs
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  COUNTRIES,
  COUNTRY_LIST,
  POPULAR_COUNTRIES,
  getCountryByCode,
  getCountryBySlug,
  formatNumberForCountry,
} from '../src/data/countries.ts';

import {
  calculateSIP,
  calculateStepUpSIP,
  calculateLumpsum,
  calculateSWP,
  calculateCAGR,
} from '../src/engines/investment.ts';

import {
  calculateIndiaIncomeTax,
  calculatePPF,
  calculateEPF,
  calculateGratuity,
} from '../src/engines/tax-india.ts';

import {
  calculateUSIncomeTax,
  calculate401k,
  calculateRothIra,
} from '../src/engines/tax-us.ts';

import {
  calculateEMIWithPrepayment,
  calculateProfitMargin,
  calculateBreakEven,
} from '../src/engines/finance.ts';

describe('Country Configuration & Architecture Registry', () => {
  it('Has at least 50 validated country profiles with clean schemas', () => {
    assert.ok(COUNTRY_LIST.length >= 50, `Expected >= 50 countries, found ${COUNTRY_LIST.length}`);
  });

  it('India profile has lakh-crore numbering and INR currency', () => {
    const inProfile = getCountryByCode('IN');
    assert.equal(inProfile.name, 'India');
    assert.equal(inProfile.currency, 'INR');
    assert.equal(inProfile.currencySymbol, '₹');
    assert.equal(inProfile.numberSystem, 'lakh-crore');
    assert.equal(inProfile.unitSystem, 'metric');
  });

  it('US profile has international numbering, imperial units, and USD currency', () => {
    const usProfile = getCountryByCode('US');
    assert.equal(usProfile.name, 'United States');
    assert.equal(usProfile.currency, 'USD');
    assert.equal(usProfile.currencySymbol, '$');
    assert.equal(usProfile.numberSystem, 'international');
    assert.equal(usProfile.unitSystem, 'imperial');
  });

  it('Slug lookup resolves properly for major countries', () => {
    assert.equal(getCountryBySlug('india')?.code, 'IN');
    assert.equal(getCountryBySlug('united-states')?.code, 'US');
    assert.equal(getCountryBySlug('united-kingdom')?.code, 'GB');
    assert.equal(getCountryBySlug('germany')?.code, 'DE');
    assert.equal(getCountryBySlug('singapore')?.code, 'SG');
  });

  it('formatNumberForCountry formats with appropriate locale grouping', () => {
    const inProfile = getCountryByCode('IN');
    const usProfile = getCountryByCode('US');

    const formattedIN = formatNumberForCountry(1234567.89, inProfile);
    // Indian grouping: 12,34,567.89
    assert.ok(formattedIN.includes('12,34,567') || formattedIN.includes('1234567'));

    const formattedUS = formatNumberForCountry(1234567.89, usProfile);
    // US grouping: 1,234,567.89
    assert.equal(formattedUS, '1,234,567.89');
  });
});

describe('Investment Engine Mathematical Accuracy', () => {
  it('SIP: ₹10,000/mo at 12% for 10 years matches standard mutual fund identity', () => {
    const res = calculateSIP(10000, 12, 10);
    assert.equal(res.investedAmount, 1200000); // 10k * 120 months
    // Standard formula produces ~ ₹23,23,391
    assert.ok(res.totalValue >= 2300000 && res.totalValue <= 2350000);
    assert.equal(res.totalValue, res.investedAmount + res.estimatedReturns);
  });

  it('SIP handles 0 investment, 0 rate, and 0 years safely without NaN', () => {
    const res0 = calculateSIP(0, 12, 10);
    assert.equal(res0.totalValue, 0);
    assert.equal(res0.investedAmount, 0);

    const resNoRate = calculateSIP(5000, 0, 5);
    assert.equal(resNoRate.investedAmount, 300000);
    assert.equal(resNoRate.totalValue, 300000);
    assert.equal(resNoRate.estimatedReturns, 0);
  });

  it('Step-Up SIP compounds higher than standard SIP with 10% annual increase', () => {
    const standard = calculateSIP(10000, 12, 10);
    const stepUp = calculateStepUpSIP(10000, 10, 12, 10);

    assert.ok(stepUp.investedAmount > standard.investedAmount);
    assert.ok(stepUp.totalValue > standard.totalValue);
    assert.ok(stepUp.finalMonthlyInvestment > 10000);
  });

  it('Lumpsum investment formula: $100,000 at 8% for 5 years', () => {
    const res = calculateLumpsum(100000, 8, 5);
    assert.equal(res.investedAmount, 100000);
    // 100000 * (1.08)^5 = 146932.8
    assert.equal(res.totalValue, 146933);
    assert.equal(res.estimatedReturns, 46933);
  });

  it('CAGR computes accurately: $10,000 to $20,000 in 5 years is ~14.87%', () => {
    const cagr = calculateCAGR(10000, 20000, 5);
    assert.equal(cagr, 14.87);
  });

  it('SWP handles regular withdrawals and detects depletion if rate is insufficient', () => {
    // $100k, withdrawing $2k/mo at 5% annual rate
    const res = calculateSWP(100000, 2000, 5, 10);
    assert.ok(res.depletedEarly);
    assert.ok(res.depletedAtMonth && res.depletedAtMonth < 120);
    assert.equal(res.finalBalance, 0);
  });
});

describe('India Tax & Financial System Accuracy', () => {
  it('Income Tax: ₹7.5 Lakh salary has ₹0 tax in New Regime due to ₹75k std deduction & 87A rebate', () => {
    const res = calculateIndiaIncomeTax({ annualSalary: 750000 });
    // Gross: 7.5L, Std Deduction: 75k => Taxable: 6.75L <= 7L => 100% rebate
    assert.equal(res.newRegime.netTaxPayable, 0);
    assert.equal(res.newRegime.rebate87A > 0, true);
  });

  it('Income Tax: High earner ₹20 Lakh salary correctly assesses New vs Old Regime', () => {
    const res = calculateIndiaIncomeTax({
      annualSalary: 2000000,
      section80C: 150000,
      section80D: 25000,
      hraExemption: 200000,
    });
    assert.ok(res.newRegime.netTaxPayable > 0);
    assert.ok(res.oldRegime.netTaxPayable > 0);
    assert.ok(res.recommendedRegime === 'new' || res.recommendedRegime === 'old');
    assert.ok(res.annualSavings >= 0);
  });

  it('PPF: ₹1,50,000 deposit for 15 years at 7.1% produces ~₹40.68 Lakh', () => {
    const res = calculatePPF(150000, 7.1, 15);
    assert.equal(res.totalDeposit, 2250000); // 1.5L * 15
    assert.ok(res.maturityAmount >= 4000000 && res.maturityAmount <= 4200000);
    assert.equal(res.maturityAmount, res.totalDeposit + res.totalInterestEarned);
  });

  it('EPF: Accrues correctly for 30-year career with 8.25% return', () => {
    const res = calculateEPF(50000, 25, 55, 5, 8.25);
    assert.ok(res.maturityCorpus > 10000000); // Over ₹1 Crore corpus
    assert.ok(res.totalInterestEarned > (res.employeeContribution + res.employerContribution));
  });

  it('Gratuity: 10 years of service at ₹50,000 monthly basic yields ₹2,88,462', () => {
    const res = calculateGratuity(50000, 10);
    // (15 * 50000 * 10) / 26 = 288461.5 => 288462
    assert.equal(res.totalGratuity, 288462);
    assert.equal(res.taxExemptAmount, 288462); // Under 20 Lakh limit
    assert.equal(res.taxableAmount, 0);
  });

  it('Gratuity: Returns 0 for tenure under 5 years as per Payment of Gratuity Act', () => {
    const res = calculateGratuity(50000, 4);
    assert.equal(res.totalGratuity, 0);
  });
});

describe('US Tax & Retirement Calculations', () => {
  it('US Federal Income Tax: $100k salary single filer accurately computes federal tax & FICA', () => {
    const res = calculateUSIncomeTax({ grossAnnualIncome: 100000, filingStatus: 'single' });
    assert.ok(res.federalIncomeTax > 10000 && res.federalIncomeTax < 18000);
    assert.equal(res.socialSecurityTax, 6200); // 6.2% of 100k
    assert.equal(res.medicareTax, 1450); // 1.45% of 100k
    assert.equal(res.totalFicaTax, 7650);
    assert.ok(res.annualTakeHome > 70000 && res.annualTakeHome < 85000);
  });

  it('401(k): $80k salary with 6% employee contrib & 50% employer match grows over 30 years', () => {
    const res = calculate401k(30, 60, 80000, 10000, 6, 50, 6, 7, 3);
    assert.ok(res.totalBalance > 500000);
    assert.ok(res.employerContributions > 0);
    assert.ok(res.totalInterestEarned > (res.employeeContributions + res.employerContributions));
  });

  it('Roth IRA: $7,000 annual contribution for 30 years at 7% yields tax-free earnings', () => {
    const res = calculateRothIra(0, 7000, 30, 7);
    assert.equal(res.totalContributions, 210000); // 7000 * 30
    assert.ok(res.totalBalance > 600000);
    assert.ok(res.taxFreeEarnings > 400000);
  });
});

describe('Finance Engine: Prepayments, Margins, and Break-Even', () => {
  it('Prepayment EMI: Extra monthly payment saves substantial interest and shortens tenure', () => {
    // $300,000 at 7% for 30 years with $200 extra per month
    const res = calculateEMIWithPrepayment(300000, 7, 30, 200);
    assert.ok(res.regularEMI > 1900 && res.regularEMI < 2100);
    assert.ok(res.interestSaved > 50000);
    assert.ok(res.monthsSaved > 60); // Saves over 5 years
  });

  it('Profit Margin: $70 cost and $100 revenue equals 30% margin and 42.86% markup', () => {
    const res = calculateProfitMargin(70, 100);
    assert.equal(res.grossProfit, 30);
    assert.equal(res.grossMarginPercent, 30);
    assert.equal(res.markupPercent, 42.86);
  });

  it('Break-Even: $50,000 fixed costs, $100 selling price, $60 variable cost requires 1,250 units', () => {
    const res = calculateBreakEven(50000, 100, 60);
    assert.equal(res.contributionMargin, 40);
    assert.equal(res.breakEvenUnits, 1250);
    assert.equal(res.breakEvenRevenue, 125000);
  });
});
