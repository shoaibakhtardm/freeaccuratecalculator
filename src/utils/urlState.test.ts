import { describe, it, expect } from 'vitest';
import {
  parseQueryToState,
  serializeStateToQuery,
  formatResultForClipboard,
} from './urlState';

describe('UX Micro-Fixes: URL State Sharing & Clipboard Result Formatting', () => {
  it('serializes calculator inputs into URLSearchParams string for shareability', () => {
    const inputState = {
      amount: 20000,
      rate: 9,
      months: 48,
    };

    const queryString = serializeStateToQuery(inputState);
    expect(queryString).toBe('amount=20000&rate=9&months=48');
  });

  it('parses URL query params to accurately pre-fill calculator inputs on page load', () => {
    const searchUrl = '?amount=20000&rate=9&months=48';
    const state = parseQueryToState(searchUrl);

    expect(state.amount).toBe('20000');
    expect(state.rate).toBe('9');
    expect(state.months).toBe('48');
  });

  it('formats calculation result with label and currency for clean clipboard sharing', () => {
    const formatted = formatResultForClipboard('Monthly Payment', '$497.70');
    expect(formatted).toBe('Monthly Payment: $497.70');

    const formattedWithPrefix = formatResultForClipboard('Total Interest', '1,250.00', '$');
    expect(formattedWithPrefix).toBe('Total Interest: $ 1,250.00');

    const fallbackNoLabel = formatResultForClipboard('', '$497.70');
    expect(fallbackNoLabel).toBe('$497.70');
  });

  it('gracefully handles empty, missing, or malformed URL search strings', () => {
    expect(parseQueryToState('')).toEqual({});
    expect(parseQueryToState('?')).toEqual({});
    expect(serializeStateToQuery({ a: null, b: undefined, c: '' })).toBe('');
  });
});
