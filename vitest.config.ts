/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: [
      'src/**/*.{test,spec}.{ts,js}',
      'tests/**/*.{test,spec}.{ts,js,mjs}',
    ],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.astro/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/engines/**', 'src/utils/**'],
      exclude: ['**/*.d.ts', '**/*.test.ts'],
    },
    testTimeout: 10000,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src'),
    },
  },
});
