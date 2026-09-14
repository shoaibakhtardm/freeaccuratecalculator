// src/utils/math.ts
/**
 * Safely performs decimal arithmetic to avoid JS floating-point errors (e.g., 0.1 + 0.2)
 */
export function preciseAdd(a: number, b: number, decimals: number = 2): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round(((a + b) + Number.EPSILON) * multiplier) / multiplier;
}

export function preciseSubtract(a: number, b: number, decimals: number = 2): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round(((a - b) + Number.EPSILON) * multiplier) / multiplier;
}

export function preciseMultiply(a: number, b: number, decimals: number = 2): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round(((a * b) + Number.EPSILON) * multiplier) / multiplier;
}

export function preciseDivide(a: number, b: number, decimals: number = 2): number {
  if (b === 0) return 0;
  const multiplier = Math.pow(10, decimals);
  return Math.round(((a / b) + Number.EPSILON) * multiplier) / multiplier;
}

export function roundToPrecision(num: number, decimals: number = 2): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
}
