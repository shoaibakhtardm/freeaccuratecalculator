// src/utils/validation.ts

export interface ValidationRule {
  min?: number;
  max?: number;
  required?: boolean;
  integerOnly?: boolean;
  customValidator?: (val: number) => boolean;
  errorMessage?: string;
}

export interface ValidationResult {
  isValid: boolean;
  value: number;
  errorMessage?: string;
}

/**
 * Sanitizes an input value (string, number, or null/undefined).
 * Defends against extreme inputs (1e100), NaN, Infinity, negative values when prohibited,
 * empty strings, and non-numeric strings ("abc").
 *
 * @param value The raw input value to sanitize
 * @param max The maximum allowable upper bound. Values exceeding this are sanitized to fallback.
 * @param fallback The fallback number to return if input is invalid or out of bounds (default: 0)
 * @param min The minimum allowable lower bound (default: 0)
 */
export function sanitizeInput(
  value: string | number | null | undefined,
  max: number = 1e12,
  fallback: number = 0,
  min: number = 0
): number {
  if (value === null || value === undefined) {
    return fallback;
  }

  // If string, trim and inspect
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (
      trimmed === '' ||
      trimmed.toLowerCase() === 'nan' ||
      trimmed.toLowerCase().includes('infinity')
    ) {
      return fallback;
    }
  }

  const num = Number(value);

  // Strict NaN and non-finite guard
  if (isNaN(num) || !isFinite(num)) {
    return fallback;
  }

  // Extreme range boundaries check (e.g. 1e100 or huge exponents)
  if (typeof max === 'number' && isFinite(max) && num > max) {
    return fallback;
  }

  if (typeof min === 'number' && isFinite(min) && num < min) {
    return fallback;
  }

  return num;
}

/**
 * Validates a single input value against comprehensive mathematical & domain boundaries.
 */
export function validateInput(
  value: string | number | null | undefined,
  rules: ValidationRule = {}
): ValidationResult {
  const { min = 0, max = 1e12, required = true, integerOnly = false, customValidator, errorMessage } = rules;

  if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
    if (required) {
      return {
        isValid: false,
        value: min,
        errorMessage: errorMessage || 'This field is required and cannot be empty.',
      };
    }
    return { isValid: true, value: min };
  }

  const num = Number(value);

  if (isNaN(num) || !isFinite(num)) {
    return {
      isValid: false,
      value: min,
      errorMessage: errorMessage || 'Please enter a valid numeric value.',
    };
  }

  if (num < min) {
    return {
      isValid: false,
      value: min,
      errorMessage: errorMessage || `Value must be at least ${min}.`,
    };
  }

  if (num > max) {
    return {
      isValid: false,
      value: max,
      errorMessage: errorMessage || `Value cannot exceed ${max.toLocaleString()}.`,
    };
  }

  if (integerOnly && !Number.isInteger(num)) {
    return {
      isValid: false,
      value: Math.round(num),
      errorMessage: errorMessage || 'Value must be a whole integer number.',
    };
  }

  if (customValidator && !customValidator(num)) {
    return {
      isValid: false,
      value: num,
      errorMessage: errorMessage || 'Value did not satisfy the validation criteria.',
    };
  }

  return { isValid: true, value: num };
}

/**
 * Validates an entire HTML form and decorates invalid input fields with accessible ARIA alerts.
 */
export function validateFormElements(
  form: HTMLFormElement | null
): { isValid: boolean; errors: Record<string, string> } {
  if (!form) return { isValid: true, errors: {} };

  const inputs = form.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input, select');
  let isValid = true;
  const errors: Record<string, string> = {};

  inputs.forEach((input) => {
    const rawVal = input.value;
    const minAttr = input.getAttribute('min');
    const maxAttr = input.getAttribute('max');
    const min = minAttr !== null ? parseFloat(minAttr) : 0;
    const max = maxAttr !== null ? parseFloat(maxAttr) : 1e12;

    const res = validateInput(rawVal, {
      min: isFinite(min) ? min : 0,
      max: isFinite(max) ? max : 1e12,
      required: input.hasAttribute('required'),
    });

    const errorDisplay = document.getElementById(`${input.id}-error`);

    if (!res.isValid) {
      isValid = false;
      errors[input.id] = res.errorMessage || 'Invalid input';
      input.setAttribute('aria-invalid', 'true');
      input.classList.add('border-red-500', 'focus:ring-red-500');

      if (errorDisplay) {
        errorDisplay.textContent = res.errorMessage || 'Invalid input';
        errorDisplay.classList.remove('hidden');
      }
    } else {
      input.removeAttribute('aria-invalid');
      input.classList.remove('border-red-500', 'focus:ring-red-500');

      if (errorDisplay) {
        errorDisplay.textContent = '';
        errorDisplay.classList.add('hidden');
      }
    }
  });

  return { isValid, errors };
}
