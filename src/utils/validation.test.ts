import { describe, it, expect } from 'vitest';
import { sanitizeInput, validateInput } from './validation';

describe('Centralized Input Validation & Edge Case Hardening', () => {
  it('safely neutralizes extreme exponential input "1e100" by returning 0 or defined fallback without throwing exceptions', () => {
    // Default max (1e12) and default fallback (0)
    const resultDefault = sanitizeInput('1e100', 1e12);
    expect(resultDefault).toBe(0);

    // Explicit custom fallback (e.g. 500)
    const resultCustomFallback = sanitizeInput('1e100', 1e12, 500);
    expect(resultCustomFallback).toBe(500);

    // Number form
    expect(sanitizeInput(1e100, 1e12, 0)).toBe(0);
  });

  it('safely neutralizes non-numeric string input "abc" by returning 0 or defined fallback without throwing exceptions', () => {
    // Default fallback (0)
    const resultDefault = sanitizeInput('abc', 1e12);
    expect(resultDefault).toBe(0);

    // Explicit custom fallback (e.g. 99)
    const resultCustomFallback = sanitizeInput('abc', 1e12, 99);
    expect(resultCustomFallback).toBe(99);

    // Special characters / malformed tokens
    expect(sanitizeInput('$#@!%', 1e12, 0)).toBe(0);
  });

  it('safely neutralizes empty string input "" by returning 0 or defined fallback without throwing exceptions', () => {
    // Default fallback (0)
    const resultDefault = sanitizeInput('', 1e12);
    expect(resultDefault).toBe(0);

    // Explicit custom fallback (e.g. -1)
    const resultCustomFallback = sanitizeInput('', 1e12, -1);
    expect(resultCustomFallback).toBe(-1);

    // Whitespace only
    expect(sanitizeInput('    ', 1e12, 0)).toBe(0);
  });

  it('neutralizes NaN, Infinity, -Infinity, null, and undefined inputs', () => {
    expect(sanitizeInput(NaN)).toBe(0);
    expect(sanitizeInput(Infinity)).toBe(0);
    expect(sanitizeInput(-Infinity)).toBe(0);
    expect(sanitizeInput('Infinity')).toBe(0);
    expect(sanitizeInput('NaN')).toBe(0);
    expect(sanitizeInput(null)).toBe(0);
    expect(sanitizeInput(undefined)).toBe(0);
  });

  it('validates comprehensive input boundaries with descriptive feedback', () => {
    // Valid input
    const valid = validateInput('25000', { min: 1000, max: 100000 });
    expect(valid.isValid).toBe(true);
    expect(valid.value).toBe(25000);

    // Below minimum
    const belowMin = validateInput('500', { min: 1000, max: 100000 });
    expect(belowMin.isValid).toBe(false);
    expect(belowMin.errorMessage).toContain('at least 1000');

    // Exceeding maximum
    const aboveMax = validateInput('1e100', { min: 1000, max: 100000 });
    expect(aboveMax.isValid).toBe(false);
    expect(aboveMax.errorMessage).toContain('cannot exceed');

    // Non-numeric
    const nonNum = validateInput('invalid-text');
    expect(nonNum.isValid).toBe(false);
    expect(nonNum.errorMessage).toContain('valid numeric');
  });
});
