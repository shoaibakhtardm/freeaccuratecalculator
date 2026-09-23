// src/types/calculator.ts

export type MathInputType = 'number' | 'select';

export interface MathInputOption {
  label: string;
  value: string | number;
}

export interface MathInput {
  id: string;
  label: string;
  type: MathInputType;
  defaultValue: number | string;
  min?: number;
  max?: number;
  step?: number | string;
  unit?: string;
  options?: MathInputOption[];
  helpText?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CalculatorEntity {
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  name: string;
  badge?: string;
  formula: string; // mathematical formula representation for visual rendering
  formulaExplanation?: string;
  mathInputs: MathInput[];
  faqs: FAQItem[];
  resultLabel: string;
  resultUnit?: string;
  resultPrefix?: string;
  decimals?: number;
  engineType: 'arithmetic' | 'finance' | 'health' | 'custom';
  computeScript?: string;
  secondaryText?: string;
  initialValue?: number;
  example?: {
    title: string;
    scenario: string;
    steps: Array<{
      number: number;
      title: string;
      description: string;
      mathExpression: string;
    }>;
    conclusion: string;
  };
}

export interface CalculatorCatalogItem {
  name: string;
  slug: string;
  category: string;
  href: string;
}
