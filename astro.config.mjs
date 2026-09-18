import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

const isDev = process.argv.includes('dev') || process.env.NODE_ENV === 'development';

export default defineConfig({
  site: 'https://freeaccuratecalculator.com',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'de', 'ar', 'nl', 'pt', 'it', 'ru', 'ja', 'hi', 'zh'],
    routing: 'manual',
  },
  trailingSlash: 'always',
  // Redirects are managed directly and cleanly in public/_redirects
  integrations: [],
  adapter: !isDev
    ? cloudflare({
        prerenderEnvironment: 'node',
        imageService: 'cloudflare-binding',
      })
    : undefined,
  vite: {
    plugins: [tailwindcss()],
  },
});
