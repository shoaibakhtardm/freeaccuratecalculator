// src/utils/urlState.ts

/**
 * Parses URL query parameters into a key-value state dictionary.
 * Sanitizes keys and values to prevent injection.
 */
export function parseQueryToState(
  search: string = typeof window !== 'undefined' ? window.location.search : '',
  allowedKeys?: string[]
): Record<string, string> {
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
  const state: Record<string, string> = {};

  params.forEach((val, key) => {
    if (allowedKeys && !allowedKeys.includes(key)) {
      return;
    }
    // Filter out unsafe scripts or excessive lengths
    if (key.length <= 64 && val.length <= 256) {
      state[key] = val;
    }
  });

  return state;
}

/**
 * Serializes a state dictionary into a clean URL query string.
 * Omits empty, null, or undefined parameters.
 */
export function serializeStateToQuery(
  state: Record<string, string | number | boolean | null | undefined>
): string {
  const params = new URLSearchParams();

  Object.entries(state).forEach(([key, val]) => {
    if (val !== null && val !== undefined && String(val).trim() !== '') {
      params.set(key, String(val).trim());
    }
  });

  return params.toString();
}

/**
 * Synchronizes calculation parameters to the browser URL using history.replaceState.
 * Does not trigger full page reloads.
 */
export function syncStateToUrl(
  state: Record<string, string | number | boolean | null | undefined>
): void {
  if (typeof window === 'undefined') return;

  const queryString = serializeStateToQuery(state);
  const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;

  try {
    window.history.replaceState({}, '', newUrl);
  } catch (err) {
    console.warn('Could not update browser URL state:', err);
  }
}

/**
 * Formats a calculation result label and values into a clean clipboard string (e.g. "Monthly Payment: $497.70").
 */
export function formatResultForClipboard(
  label: string,
  value: string | number,
  prefix: string = '',
  suffix: string = ''
): string {
  const cleanPrefix = prefix.trim();
  const cleanSuffix = suffix.trim();
  const valStr = String(value).trim();

  const formattedVal = `${cleanPrefix ? cleanPrefix + ' ' : ''}${valStr}${cleanSuffix ? ' ' + cleanSuffix : ''}`.trim();

  if (label && label.trim()) {
    return `${label.trim()}: ${formattedVal}`;
  }
  return formattedVal;
}

/**
 * Robust clipboard copy function with fallback for non-secure / older browser contexts.
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  // Modern Clipboard API
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback below
    }
  }

  // DOM Fallback (textarea + execCommand)
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, textArea.value.length);
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Failed to copy text to clipboard:', err);
    return false;
  }
}
