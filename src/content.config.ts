// src/content.config.ts
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

// Calculator Translation Variant Schema (allows localized variants without duplicating mathematical rules/presets)
const localizedContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  formulaExplanation: z.string().optional(),
  exampleProblem: z.string().optional(),
  exampleSteps: z.array(z.string()).optional(),
  exampleSolution: z.string().optional(),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).optional(),
});

// Calculators Collection
const calculators = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/calculators' }),
  schema: z.object({
    id: z.string(),
    category: z.enum(['math', 'finance', 'health', 'everyday']),
    title: z.string(),
    shortTitle: z.string().optional(),
    description: z.string(),
    type: z.enum(['universal', 'country_aware']).default('universal'),
    supportedLocales: z.array(z.string()).default(['en']),
    formula: z.object({
      name: z.string(),
      expression: z.string(),
      variables: z.record(z.string(), z.string()).optional(),
      explanation: z.string(),
    }),
    example: z.object({
      problem: z.string(),
      steps: z.array(z.string()),
      solution: z.string(),
    }),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })),
    relatedCalculators: z.array(z.string()).default([]),
    relatedBlogSlugs: z.array(z.string()).default([]),
    // Localized text overrides for multilingual support (es, fr, etc.)
    translations: z.record(z.string(), localizedContentSchema).optional(),
  }),
});

// Blog Collection
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Editorial Team'),
    category: z.enum(['math', 'finance', 'health', 'everyday', 'guides']),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'es', 'fr', 'hi']).default('en'),
    relatedCalculators: z.array(z.string()).default([]),
  }),
});

export const collections = {
  calculators,
  blog,
};
