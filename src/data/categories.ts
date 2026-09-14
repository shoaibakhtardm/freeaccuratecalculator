// src/data/categories.ts
import type { CountryConfig } from './countries';
import { CALCULATORS, type CategoryId } from './calculatorRegistry';

export interface CategoryItem {
  id: CategoryId;
  name: string;
  icon: string;
}

/**
 * Master list of 20 categories matching the Homepage source of truth
 */
export const CATEGORY_ITEMS: readonly CategoryItem[] = [
  { id: 'finance', name: 'Finance', icon: '💰' },
  { id: 'insurance', name: 'Insurance', icon: '🛡️' },
  { id: 'legal', name: 'Legal', icon: '⚖️' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'construction', name: 'Construction', icon: '🏗️' },
  { id: 'real-estate', name: 'Real Estate', icon: '🏢' },
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'health', name: 'Health', icon: '🩺' },
  { id: 'statistics', name: 'Statistics', icon: '📊' },
  { id: 'marketing', name: 'Marketing', icon: '📈' },
  { id: 'math', name: 'Math', icon: '📐' },
  { id: 'automotive', name: 'Automotive', icon: '🚗' },
  { id: 'biology', name: 'Biology', icon: '🧬' },
  { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
  { id: 'physics', name: 'Physics', icon: '⚛️' },
  { id: 'food', name: 'Food', icon: '🍎' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'ecology', name: 'Ecology', icon: '🌱' },
  { id: 'everyday', name: 'Everyday', icon: '☀️' },
  { id: 'converter', name: 'Converter', icon: '🔄' },
] as const;

/**
 * Returns available categories for a country.
 * Filters out any category that does not have at least one verified calculator in the registry,
 * preventing thin or empty pages while providing rich topical architecture.
 */
export function getCountryCategories(country?: CountryConfig): CategoryItem[] {
  if (!country) return [...CATEGORY_ITEMS];

  // Verify that every returned category has active, verified calculators
  return CATEGORY_ITEMS.filter((cat) => {
    const hasCalculators = CALCULATORS.some((c) => c.category === cat.id);
    return hasCalculators;
  });
}

/**
 * Helper to retrieve a single category item by its ID
 */
export function getCategoryById(id: string): CategoryItem | undefined {
  return CATEGORY_ITEMS.find((c) => c.id === id);
}
