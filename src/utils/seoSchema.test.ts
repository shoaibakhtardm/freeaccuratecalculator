import { describe, it, expect } from 'vitest';
import {
  generateWebApplicationSchema,
  generateFAQPageSchema,
  generateCalculatorSchemas,
  mapApplicationCategory,
} from './seoSchema';

describe('SEO & Accessibility: Dynamic Schema.org Generator', () => {
  it('generates compliant WebApplication & SoftwareApplication schema for Loan Calculator', () => {
    const loanCalcInput = {
      name: 'Loan Calculator',
      description: 'Calculate monthly loan EMI payments, total interest payable, and amortization schedules.',
      url: 'https://freeaccuratecalculator.com/finance/loan-calculator/',
      category: 'finance',
      lang: 'en',
    };

    const schema = generateWebApplicationSchema(loanCalcInput);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toContain('WebApplication');
    expect(schema['@type']).toContain('SoftwareApplication');
    expect(schema.name).toBe('Loan Calculator');
    expect(schema.applicationCategory).toBe('FinanceApplication');
    expect(schema.operatingSystem).toBe('All');
    expect(schema.offers.price).toBe('0.00');
    expect(schema.offers.priceCurrency).toBe('USD');
    expect(schema.url).toBe('https://freeaccuratecalculator.com/finance/loan-calculator/');
  });

  it('generates valid FAQPage schema from questions and answers', () => {
    const faqs = [
      {
        question: 'How is monthly loan EMI calculated?',
        answer: 'EMI is calculated using the reducing balance equation: E = P * r * (1 + r)^n / ((1 + r)^n - 1).',
      },
      {
        question: 'Can I pay extra monthly principal to shorten my loan tenure?',
        answer: 'Yes, extra prepayments reduce the remaining principal directly, saving substantial compound interest.',
      },
    ];

    const schema = generateFAQPageSchema(faqs);
    expect(schema).not.toBeNull();
    expect(schema!['@context']).toBe('https://schema.org');
    expect(schema!['@type']).toBe('FAQPage');
    expect(schema!.mainEntity.length).toBe(2);
    expect(schema!.mainEntity[0]['@type']).toBe('Question');
    expect(schema!.mainEntity[0].name).toBe('How is monthly loan EMI calculated?');
    expect(schema!.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
  });

  it('correctly maps application categories to Schema.org standard types', () => {
    expect(mapApplicationCategory('finance')).toBe('FinanceApplication');
    expect(mapApplicationCategory('health')).toBe('HealthApplication');
    expect(mapApplicationCategory('math')).toBe('EducationalApplication');
    expect(mapApplicationCategory('other')).toBe('UtilityApplication');
  });

  it('returns combined schemas array when FAQs are provided', () => {
    const schemas = generateCalculatorSchemas({
      name: 'Loan Calculator',
      description: 'Loan amortization tool',
      url: 'https://freeaccuratecalculator.com/finance/loan-calculator/',
      category: 'finance',
      faqs: [{ question: 'Q1', answer: 'A1' }],
    });

    expect(schemas.length).toBe(2);
    expect(schemas[0]['@type']).toContain('WebApplication');
    expect(schemas[1]['@type']).toBe('FAQPage');
  });
});
