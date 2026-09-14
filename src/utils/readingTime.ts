// src/utils/readingTime.ts

/**
 * Calculates estimated reading time for articles and blog posts.
 * Based on an average adult reading speed of 200 words per minute.
 *
 * @param content - Raw text or markdown string
 * @param wordsPerMinute - Average reading speed (defaults to 200)
 * @returns Estimated reading time in minutes (minimum 1 minute if content exists)
 */
export const calculateReadingTime = (content: string = '', wordsPerMinute: number = 200): number => {
  if (!content || !content.trim()) return 1;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};
