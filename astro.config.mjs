// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

const isDev = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
  site: 'https://freeaccuratecalculator.com',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/dev-preview') &&
        !page.includes('/api/') &&
        !page.endsWith('/sitemap.xml'),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          es: 'es',
          fr: 'fr',
          hi: 'hi',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'hi'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

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
