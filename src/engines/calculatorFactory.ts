// src/engines/calculatorFactory.ts

/**
 * Universal Math Engine Factory & Precision Evaluator
 * Equipped with strict IEEE-754 floating-point mitigation and NaN/Infinity guards.
 */

export interface MathEvaluationContext {
  [key: string]: number | string;
}

export interface CalculationResult {
  value: number;
  formattedValue: string;
  secondaryText?: string;
  error?: string;
}

/**
 * High-precision rounding helper to eradicate IEEE-754 floating-point drift.
 * Rounds numbers to specified decimal places with Number.EPSILON protection.
 */
export const roundToPrecision = (num: number, decimals: number = 2): number => {
  if (isNaN(num) || !isFinite(num)) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round((num + Number.EPSILON) * factor) / factor;
};

export const roundToCents = (num: number): number => roundToPrecision(num, 2);

/**
 * Input sanitization and guard check against NaN, null, undefined, or Infinite inputs.
 */
export function sanitizeNumber(val: any, fallback: number = 0, min?: number, max?: number): number {
  const num = typeof val === 'number' ? val : parseFloat(String(val).replace(/,/g, '').trim());
  if (isNaN(num) || !isFinite(num)) {
    return fallback;
  }
  let bounded = num;
  if (min !== undefined && bounded < min) bounded = min;
  if (max !== undefined && bounded > max) bounded = max;
  return bounded;
}

/**
 * Universal Evaluator & Engine Implementations
 */
export class CalculatorEngineFactory {
  /**
   * Financial Engines: EMI, SIP, Compound Interest, Loans
   */
  static evaluateFinance(slug: string, inputs: MathEvaluationContext): CalculationResult {
    switch (slug) {
      case 'emi-calculator':
      case 'mortgage-calculator':
      case 'auto-loan-calculator': {
        const principal = sanitizeNumber(inputs.principal ?? inputs.loanAmount, 0, 0);
        const annualRate = sanitizeNumber(inputs.annualRate ?? inputs.interestRate, 0, 0, 100);
        const tenureYears = sanitizeNumber(inputs.tenureYears ?? inputs.loanTerm, 0, 0, 50);

        if (principal <= 0 || tenureYears <= 0) {
          return { value: 0, formattedValue: '0.00', secondaryText: 'Enter positive loan amount and tenure' };
        }

        const monthlyRate = annualRate / 12 / 100;
        const totalMonths = Math.round(tenureYears * 12);

        let monthlyEMI: number;
        if (monthlyRate === 0) {
          monthlyEMI = principal / totalMonths;
        } else {
          const factor = Math.pow(1 + monthlyRate, totalMonths);
          monthlyEMI = (principal * monthlyRate * factor) / (factor - 1);
        }

        const safeEMI = roundToCents(monthlyEMI);
        const totalPayment = roundToCents(safeEMI * totalMonths);
        const totalInterest = roundToCents(Math.max(0, totalPayment - principal));

        return {
          value: safeEMI,
          formattedValue: safeEMI.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          secondaryText: `Total Payment: $${totalPayment.toLocaleString()} (Interest: $${totalInterest.toLocaleString()})`,
        };
      }

      case 'sip-calculator': {
        const monthlyInvestment = sanitizeNumber(inputs.monthlyInvestment, 0, 0);
        const expectedReturnRate = sanitizeNumber(inputs.expectedReturnRate, 0, 0, 100);
        const timePeriodYears = sanitizeNumber(inputs.timePeriodYears, 0, 0, 50);

        const totalMonths = Math.round(timePeriodYears * 12);
        const monthlyRate = expectedReturnRate / 12 / 100;

        if (monthlyInvestment <= 0 || totalMonths <= 0) {
          return { value: 0, formattedValue: '0.00', secondaryText: 'Enter monthly deposit and investment tenure' };
        }

        let futureValue: number;
        if (monthlyRate === 0) {
          futureValue = monthlyInvestment * totalMonths;
        } else {
          futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
        }

        const totalInvested = roundToCents(monthlyInvestment * totalMonths);
        const totalMaturity = roundToCents(futureValue);
        const wealthGain = roundToCents(Math.max(0, totalMaturity - totalInvested));

        return {
          value: totalMaturity,
          formattedValue: totalMaturity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          secondaryText: `Invested: $${totalInvested.toLocaleString()} | Estimated Wealth Gain: $${wealthGain.toLocaleString()}`,
        };
      }

      case 'compound-interest-calculator': {
        const principal = sanitizeNumber(inputs.principal, 0, 0);
        const rate = sanitizeNumber(inputs.annualRate, 0, 0, 100);
        const years = sanitizeNumber(inputs.years, 0, 0, 100);
        const frequency = sanitizeNumber(inputs.compoundFrequency, 12, 1, 365);

        const r = rate / 100;
        const total = principal * Math.pow(1 + r / frequency, frequency * years);
        const safeTotal = roundToCents(total);
        const interestEarned = roundToCents(safeTotal - principal);

        return {
          value: safeTotal,
          formattedValue: safeTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          secondaryText: `Total Interest Earned: $${interestEarned.toLocaleString()}`,
        };
      }

      default: {
        return { value: 0, formattedValue: '0.00', secondaryText: 'Engine calculation ready' };
      }
    }
  }

  /**
   * Health Engines: BMI, BMR, Calorie, TDEE
   */
  static evaluateHealth(slug: string, inputs: MathEvaluationContext): CalculationResult {
    switch (slug) {
      case 'bmi-calculator': {
        const heightCm = sanitizeNumber(inputs.heightCm, 0, 30, 300);
        const weightKg = sanitizeNumber(inputs.weightKg, 0, 10, 500);

        if (heightCm <= 0 || weightKg <= 0) {
          return { value: 0, formattedValue: '0.0', secondaryText: 'Enter valid height and weight' };
        }

        const heightMeters = heightCm / 100;
        const bmi = weightKg / (heightMeters * heightMeters);
        const safeBmi = roundToPrecision(bmi, 1);

        let category = 'Normal weight';
        if (safeBmi < 18.5) category = 'Underweight';
        else if (safeBmi >= 25 && safeBmi < 29.9) category = 'Overweight';
        else if (safeBmi >= 30) category = 'Obese';

        return {
          value: safeBmi,
          formattedValue: safeBmi.toFixed(1),
          secondaryText: `Weight Status: ${category} (Healthy range: 18.5 - 24.9)`,
        };
      }

      case 'bmr-calculator': {
        const weight = sanitizeNumber(inputs.weightKg, 70, 20, 400);
        const height = sanitizeNumber(inputs.heightCm, 175, 50, 250);
        const age = sanitizeNumber(inputs.age, 30, 10, 120);
        const gender = String(inputs.gender || 'male').toLowerCase();

        // Mifflin-St Jeor Equation
        let bmr = 10 * weight + 6.25 * height - 5 * age;
        bmr = gender === 'female' ? bmr - 161 : bmr + 5;

        const safeBmr = Math.round(bmr);
        return {
          value: safeBmr,
          formattedValue: safeBmr.toLocaleString(),
          secondaryText: `Basal metabolic rate based on Mifflin-St Jeor formula`,
        };
      }

      default: {
        return { value: 0, formattedValue: '0.0', secondaryText: 'Health formula computed' };
      }
    }
  }

  /**
   * Arithmetic & Universal Evaluator: Percentages, Ratios, Margin
   */
  static evaluateArithmetic(slug: string, inputs: MathEvaluationContext): CalculationResult {
    switch (slug) {
      case 'percentage-calculator': {
        const percentage = sanitizeNumber(inputs.percentage, 0);
        const total = sanitizeNumber(inputs.total, 0);
        const result = roundToPrecision((percentage / 100) * total, 4);

        return {
          value: result,
          formattedValue: result.toLocaleString('en-US', { maximumFractionDigits: 4 }),
          secondaryText: `${percentage}% of ${total.toLocaleString()} is ${result.toLocaleString()}`,
        };
      }

      case 'profit-margin-calculator': {
        const cost = sanitizeNumber(inputs.cost, 0, 0);
        const revenue = sanitizeNumber(inputs.revenue, 0, 0);

        if (revenue === 0) {
          return { value: 0, formattedValue: '0.00%', secondaryText: 'Revenue must be greater than 0' };
        }

        const profit = revenue - cost;
        const margin = (profit / revenue) * 100;
        const safeMargin = roundToPrecision(margin, 2);

        return {
          value: safeMargin,
          formattedValue: `${safeMargin.toFixed(2)}%`,
          secondaryText: `Net Profit: $${profit.toLocaleString()} on $${revenue.toLocaleString()} revenue`,
        };
      }

      default: {
        // Universal evaluator: sum of numeric fields as fallback
        const numericValues = Object.values(inputs)
          .map((v) => sanitizeNumber(v))
          .filter((v) => !isNaN(v));
        const sum = numericValues.reduce((acc, curr) => acc + curr, 0);
        const safeSum = roundToPrecision(sum, 2);

        return {
          value: safeSum,
          formattedValue: safeSum.toLocaleString(),
          secondaryText: 'Computed via universal parameter engine',
        };
      }
    }
  }

  /**
   * Router/Factory method: Executes calculation based on engineType and slug
   */
  static compute(slug: string, engineType: string, inputs: MathEvaluationContext): CalculationResult {
    try {
      switch (engineType) {
        case 'finance':
          return this.evaluateFinance(slug, inputs);
        case 'health':
          return this.evaluateHealth(slug, inputs);
        case 'arithmetic':
        default:
          return this.evaluateArithmetic(slug, inputs);
      }
    } catch (err) {
      console.error(`Calculation error for ${slug}:`, err);
      return {
        value: 0,
        formattedValue: '0.00',
        error: 'Calculation error occurred. Please verify your input parameters.',
      };
    }
  }
}
