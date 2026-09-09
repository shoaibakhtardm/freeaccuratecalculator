// src/utils/seoSchema.ts

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CalculatorSchemaInput {
  name: string;
  description: string;
  url: string;
  category?: string;
  faqs?: FAQItem[];
  lang?: string;
  softwareVersion?: string;
  price?: string;
  currency?: string;
}

/**
 * Maps internal category names to standard Schema.org applicationCategory.
 */
export function mapApplicationCategory(category: string = ''): string {
  const cat = category.toLowerCase();
  if (cat.includes('finance') || cat.includes('money') || cat.includes('tax') || cat.includes('loan') || cat.includes('emi')) {
    return 'FinanceApplication';
  }
  if (cat.includes('health') || cat.includes('fitness') || cat.includes('medical')) {
    return 'HealthApplication';
  }
  if (cat.includes('math') || cat.includes('science') || cat.includes('education') || cat.includes('physics')) {
    return 'EducationalApplication';
  }
  return 'UtilityApplication';
}

/**
 * Generates Schema.org WebApplication & SoftwareApplication structured data.
 */
export function generateWebApplicationSchema(input: CalculatorSchemaInput): Record<string, any> {
  const appCategory = mapApplicationCategory(input.category || '');

  return {
    '@context': 'https://schema.org',
    '@type': ['SoftwareApplication', 'WebApplication'],
    name: input.name,
    applicationCategory: appCategory,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    url: input.url,
    inLanguage: input.lang || 'en',
    softwareVersion: input.softwareVersion || '2026.1',
    offers: {
      '@type': 'Offer',
      price: input.price || '0.00',
      priceCurrency: input.currency || 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'Free Accurate Calculator',
      url: 'https://freeaccuratecalculator.com/',
    },
    description: input.description,
  };
}

/**
 * Generates Schema.org FAQPage structured data from question/answer pairs.
 */
export function generateFAQPageSchema(faqs?: FAQItem[]): Record<string, any> | null {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates combined WebApplication and FAQPage schemas ready for Layout head injection.
 */
export function generateCalculatorSchemas(input: CalculatorSchemaInput): Array<Record<string, any>> {
  const schemas: Array<Record<string, any>> = [generateWebApplicationSchema(input)];

  if (input.faqs && input.faqs.length > 0) {
    const faqSchema = generateFAQPageSchema(input.faqs);
    if (faqSchema) {
      schemas.push(faqSchema);
    }
  }

  return schemas;
}
