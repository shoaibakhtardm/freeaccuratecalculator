// src/data/categories.ts
import type { CategoryId } from './calculatorRegistry';

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
  { id: 'love', name: 'Love', icon: '❤️' },
] as const;

/**
 * Helper to retrieve a single category item by its ID
 */
export function getCategoryById(id: string): CategoryItem | undefined {
  return CATEGORY_ITEMS.find((c) => c.id === id);
}
