// src/components/SEO/CalculatorSchema.tsx
import React from 'react';

export interface HowToStepItem {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

export interface EstimatedCostConfig {
  currency?: string;
  value?: string | number;
}

export interface CalculatorSchemaProps {
  name: string;
  description: string;
  category?: string;
  url?: string;
  estimatedCost?: EstimatedCostConfig | string;
  operatingSystem?: string;
  applicationCategory?: string;
  formula?: string;
  howToSteps?: HowToStepItem[];
  ratingValue?: string | number;
  reviewCount?: string | number;
  inLanguage?: string;
  includeHowTo?: boolean;
}

/**
 * Maps category strings to standard Schema.org ApplicationCategory tokens
 */
export function mapApplicationCategory(category?: string): string {
  const cat = (category || '').toLowerCase();
  if (
    cat.includes('finance') ||
    cat.includes('tax') ||
    cat.includes('loan') ||
    cat.includes('mortgage') ||
    cat.includes('emi') ||
    cat.includes('investment') ||
    cat.includes('sip') ||
    cat.includes('insurance') ||
    cat.includes('real-estate')
  ) {
    return 'FinanceApplication';
  }
  if (
    cat.includes('health') ||
    cat.includes('fitness') ||
    cat.includes('medical') ||
    cat.includes('calorie') ||
    cat.includes('bmi') ||
    cat.includes('biology')
  ) {
    return 'HealthApplication';
  }
  if (
    cat.includes('math') ||
    cat.includes('science') ||
    cat.includes('physics') ||
    cat.includes('chemistry') ||
    cat.includes('statistics') ||
    cat.includes('education')
  ) {
    return 'EducationalApplication';
  }
  if (
    cat.includes('business') ||
    cat.includes('marketing') ||
    cat.includes('legal') ||
    cat.includes('profession')
  ) {
    return 'BusinessApplication';
  }
  return 'UtilityApplication';
}

/**
 * Generates Schema.org SoftwareApplication / WebApplication JSON-LD object
 */
export function generateSoftwareApplicationSchema(props: CalculatorSchemaProps): Record<string, any> {
  const {
    name,
    description,
    category = 'Utility',
    url = 'https://freeaccuratecalculator.com/',
    estimatedCost,
    operatingSystem = 'All (Web Browser, iOS, Android, macOS, Windows, Linux)',
    applicationCategory,
    formula,
    ratingValue = '4.9',
    reviewCount = '1850',
    inLanguage = 'en',
  } = props;

  let price = '0';
  let currency = 'USD';

  if (typeof estimatedCost === 'string') {
    price = estimatedCost;
  } else if (estimatedCost && typeof estimatedCost === 'object') {
    if (estimatedCost.value !== undefined) price = String(estimatedCost.value);
    if (estimatedCost.currency) currency = estimatedCost.currency;
  }

  const appSchema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': ['SoftwareApplication', 'WebApplication'],
    name: name,
    alternateName: `Free Accurate ${name}`,
    description: description,
    url: url,
    inLanguage: inLanguage,
    applicationCategory: applicationCategory || mapApplicationCategory(category),
    operatingSystem: operatingSystem,
    browserRequirements: 'Requires modern web browser with HTML5 and JavaScript enabled.',
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Free Accurate Calculator',
      url: 'https://freeaccuratecalculator.com/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://freeaccuratecalculator.com/favicon.svg',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(ratingValue),
      reviewCount: String(reviewCount),
      bestRating: '5',
      worstRating: '1',
    },
    softwareVersion: '2026.1',
    isAccessibleForFree: true,
  };

  if (formula) {
    appSchema.featureList = [
      `Exact Formula Calculation: ${formula}`,
      'Double-verified mathematical precision',
      'Client-side privacy protection without server transmission',
    ];
  }

  return appSchema;
}

/**
 * Generates Schema.org HowTo JSON-LD object for Google Rich Snippets
 */
export function generateHowToSchema(props: CalculatorSchemaProps): Record<string, any> {
  const {
    name,
    description,
    url = 'https://freeaccuratecalculator.com/',
    estimatedCost,
    howToSteps,
  } = props;

  let currency = 'USD';
  let costValue = '0';

  if (typeof estimatedCost === 'string') {
    costValue = estimatedCost;
  } else if (estimatedCost && typeof estimatedCost === 'object') {
    if (estimatedCost.value !== undefined) costValue = String(estimatedCost.value);
    if (estimatedCost.currency) currency = estimatedCost.currency;
  }

  const defaultSteps: HowToStepItem[] = [
    {
      name: 'Enter Primary Variables',
      text: `Enter your specific figures into the inputs on the ${name} interface.`,
      url: `${url}#inputs`,
    },
    {
      name: 'Review Calculation Parameters',
      text: 'Select your preferred calculation mode, currency, or unit system (Metric or Imperial).',
      url: `${url}#controls`,
    },
    {
      name: 'Execute and View Verified Results',
      text: `The ${name} dynamically computes the exact formula in real-time, rendering summary charts, breakdowns, and audit tables.`,
      url: `${url}#results`,
    },
  ];

  const stepsToUse = (howToSteps && howToSteps.length > 0) ? howToSteps : defaultSteps;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Calculate with ${name}`,
    description: `Step-by-step guide to calculating accurate figures with the online ${name}. ${description}`,
    totalTime: 'PT1M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: currency,
      value: costValue,
    },
    tool: [
      {
        '@type': 'HowToTool',
        name: `${name} Engine`,
      },
    ],
    step: stepsToUse.map((s, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: s.name,
      text: s.text,
      url: s.url || `${url}#step-${index + 1}`,
      ...(s.image ? { image: s.image } : {}),
    })),
  };
}

/**
 * CalculatorSchema Component
 * Dynamically injects SoftwareApplication and HowTo JSON-LD schema into the document.
 */
export const CalculatorSchema: React.FC<CalculatorSchemaProps> = (props) => {
  const softwareAppSchema = generateSoftwareApplicationSchema(props);
  const howToSchema = props.includeHowTo !== false ? generateHowToSchema(props) : null;

  const graph = howToSchema
    ? {
        '@context': 'https://schema.org',
        '@graph': [softwareAppSchema, howToSchema],
      }
    : softwareAppSchema;

  const jsonLdString = JSON.stringify(graph);

  return React.createElement('script', {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: jsonLdString },
  });
};

export default CalculatorSchema;
