// src/utils/smartParser.ts

/**
 * Smart Unit & Financial Shorthand Parser
 * Automatically parses human inputs including:
 * - Financial shorthands: "25L", "25 Lakh", "1.5L" (150,000), "1.5Cr" (15,000,000), "50k" (50,000), "2M" (2,000,000)
 * - Height/Length units: "5'10\"" or "5ft 10in" -> 70 (inches)
 * - Weight units: "150 lbs" or "150 lb" -> 68.04 (kg)
 * - Volume / Liquid: "1.5L" when specified or financial 1.5 Lakhs
 * - Handles currency symbols (₹, $, €, £), whitespace, and commas
 */

export function parseSmartInput(input: string | number): number {
  if (typeof input === 'number') {
    return isFinite(input) ? input : NaN;
  }

  if (!input || typeof input !== 'string') {
    return NaN;
  }

  const raw = input.trim();
  if (!raw) return NaN;

  // 1. Height feet & inches: e.g. 5'10", 5'10, 5ft 10in, 5 ft 10 in
  const feetInchesRegex = /^(\d+)\s*(?:'|ft|feet)\s*(\d*(?:\.\d+)?)\s*(?:"|in|inches)?$/i;
  const feetInchesMatch = raw.match(feetInchesRegex);
  if (feetInchesMatch) {
    const feet = parseFloat(feetInchesMatch[1]) || 0;
    const inches = parseFloat(feetInchesMatch[2]) || 0;
    return Math.round(((feet * 12 + inches) + Number.EPSILON) * 100) / 100;
  }

  // 2. Weight in pounds (lbs) to kg: e.g. "150 lbs", "150lb", "150 pounds"
  const lbsRegex = /^([\d,]+(?:\.\d+)?)\s*(?:lbs?|pounds?)$/i;
  const lbsMatch = raw.match(lbsRegex);
  if (lbsMatch) {
    const val = parseFloat(lbsMatch[1].replace(/,/g, ''));
    if (!isNaN(val)) {
      // 1 lb = 0.45359237 kg
      return Math.round(((val * 0.45359237) + Number.EPSILON) * 100) / 100;
    }
  }

  // 3. Remove leading currency signs and cleanup commas/whitespace
  let cleaned = raw.replace(/^[₹$€£\s]+/, '').replace(/,/g, '').trim();

  // 4. Financial Lakhs: e.g. "25L", "25 Lakh", "25 Lakhs", "25lac", "1.5L" -> 1.5 * 100,000 = 150,000
  const lakhRegex = /^([\d.]+)\s*(?:l|lac|lacs|lakh|lakhs)$/i;
  const lakhMatch = cleaned.match(lakhRegex);
  if (lakhMatch) {
    const num = parseFloat(lakhMatch[1]);
    if (!isNaN(num)) {
      return Math.round(((num * 100000) + Number.EPSILON) * 100) / 100;
    }
  }

  // 5. Financial Crores: e.g. "1.5Cr", "1.5 Crore", "1.5 Crores" -> 1.5 * 10,000,000
  const croreRegex = /^([\d.]+)\s*(?:cr|crore|crores)$/i;
  const croreMatch = cleaned.match(croreRegex);
  if (croreMatch) {
    const num = parseFloat(croreMatch[1]);
    if (!isNaN(num)) {
      return Math.round(((num * 10000000) + Number.EPSILON) * 100) / 100;
    }
  }

  // 6. Thousands: "50k", "50K", "50 thousand"
  const thousandRegex = /^([\d.]+)\s*(?:k|thousand)$/i;
  const thousandMatch = cleaned.match(thousandRegex);
  if (thousandMatch) {
    const num = parseFloat(thousandMatch[1]);
    if (!isNaN(num)) {
      return Math.round(((num * 1000) + Number.EPSILON) * 100) / 100;
    }
  }

  // 7. Millions: "2M", "2.5 Million", "2.5m"
  const millionRegex = /^([\d.]+)\s*(?:m|million|millions)$/i;
  const millionMatch = cleaned.match(millionRegex);
  if (millionMatch) {
    const num = parseFloat(millionMatch[1]);
    if (!isNaN(num)) {
      return Math.round(((num * 1000000) + Number.EPSILON) * 100) / 100;
    }
  }

  // 8. Billions: "1B", "1.2 Billion"
  const billionRegex = /^([\d.]+)\s*(?:b|billion|billions)$/i;
  const billionMatch = cleaned.match(billionRegex);
  if (billionMatch) {
    const num = parseFloat(billionMatch[1]);
    if (!isNaN(num)) {
      return Math.round(((num * 1000000000) + Number.EPSILON) * 100) / 100;
    }
  }

  // 9. Standard numeric value
  const standardNum = parseFloat(cleaned);
  if (!isNaN(standardNum) && isFinite(standardNum)) {
    return Math.round((standardNum + Number.EPSILON) * 100) / 100;
  }

  return NaN;
}
