import { describe, it, expect } from 'vitest';
import { calculateEMIWithPrepayment, calculateLoanAmortization, roundToCents } from './finance';

describe('Finance Engine - Floating-Point Precision Eradication', () => {
  it('proves a $1,000,000 loan at 0.1% over 360 months resolves to exactly $0.00 balance without infinite loops or negative residual balances', () => {
    // 1. Amortization schedule verification: 360 monthly payments
    const amortization = calculateLoanAmortization(1000000, 0.1, 360);

    // Proves tenure completes in exactly 360 months without infinite loop
    expect(amortization.schedule.length).toBe(360);

    // Proves final balance resolves to exactly $0.00 without floating-point residual drift
    expect(amortization.finalBalance).toBe(0);
    expect(amortization.schedule[amortization.schedule.length - 1].remainingBalance).toBe(0);

    // Proves no intermediate month has negative balance or inverted principal
    amortization.schedule.forEach((monthRow) => {
      expect(monthRow.remainingBalance).toBeGreaterThanOrEqual(0);
      expect(monthRow.principalPaid).toBeGreaterThan(0);
      expect(monthRow.interestPaid).toBeGreaterThan(0);
    });

    // 2. Prepayment simulation verification: 30 years (360 months)
    const emiResult = calculateEMIWithPrepayment(1000000, 0.1, 30);
    expect(emiResult.originalTenureMonths).toBe(360);
    expect(emiResult.newTenureMonths).toBe(360);
    expect(emiResult.finalBalance).toBe(0);
    expect(emiResult.regularEMI).toBe(2819.77);
  });

  it('eliminates IEEE-754 floating-point drift in roundToCents', () => {
    // Classic JavaScript precision failure
    expect(0.1 + 0.2).not.toBe(0.3);
    expect(roundToCents(0.1 + 0.2)).toBe(0.3);
    expect(roundToCents(1.005)).toBe(1.01);
    expect(roundToCents(0.0000001)).toBe(0);
  });
});
