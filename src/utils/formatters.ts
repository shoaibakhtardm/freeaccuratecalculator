// src/utils/formatters.ts

/**
 * Format a number according to locale conventions.
 * Supports standard international (comma thousands, period decimals)
 * and Indian Lakh/Crore grouping (1,23,456.78).
 */
export function formatNumber(
  value: number,
  options: {
    decimals?: number;
    currencySymbol?: string;
    isIndian?: boolean;
    unitSuffix?: string;
  } = {}
): string {
  const { decimals = 2, currencySymbol, isIndian = false, unitSuffix = '' } = options;

  if (isNaN(value) || !isFinite(value)) {
    return '0.00';
  }

  const fixed = value.toFixed(decimals);
  const parts = fixed.split('.');
  let integerPart = parts[0];
  const decimalPart = parts[1] !== undefined ? `.${parts[1]}` : '';

  let formattedInteger = '';

  if (isIndian) {
    // Indian numbering system: last 3 digits, then groups of 2 (e.g. 12,34,567)
    const isNegative = integerPart.startsWith('-');
    if (isNegative) integerPart = integerPart.substring(1);

    if (integerPart.length <= 3) {
      formattedInteger = integerPart;
    } else {
      const lastThree = integerPart.substring(integerPart.length - 3);
      const remaining = integerPart.substring(0, integerPart.length - 3);
      const grouped = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
      formattedInteger = `${grouped},${lastThree}`;
    }
    if (isNegative) formattedInteger = `-${formattedInteger}`;
  } else {
    // Standard international numbering system: groups of 3 (e.g. 1,234,567)
    formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const baseFormatted = `${formattedInteger}${decimalPart}`;

  if (currencySymbol) {
    return `${currencySymbol}${baseFormatted}${unitSuffix ? ` ${unitSuffix}` : ''}`;
  }

  return `${baseFormatted}${unitSuffix ? ` ${unitSuffix}` : ''}`;
}

/**
 * EaseOutExpo easing formula:
 * Starts fast and decelerates smoothly over 500ms.
 */
export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}
