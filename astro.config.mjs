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
        !page.includes('/admin/') &&
        !page.includes('/draft/') &&
        !page.includes('/404') &&
        !page.endsWith('/sitemap.xml'),
      serialize(item) {
        const url = new URL(item.url);
        const pathname = url.pathname;

        // Exclude unwanted patterns
        if (
          pathname.includes('/admin/') ||
          pathname.includes('/draft/') ||
          pathname.includes('/404') ||
          pathname.includes('/dev-preview') ||
          pathname.includes('/api/')
        ) {
          return undefined;
        }

        // Dynamic ISO 8601 build timestamp
        item.lastmod = new Date().toISOString();

        // 1. Homepage: Root and localized homepages
        if (pathname === '/' || /^\/(en|es|fr|hi)\/?$/.test(pathname)) {
          item.priority = 1.0;
          item.changefreq = 'daily';
          return item;
        }

        // 2. High-traffic finance and health calculators (Priority 0.8)
        if (/^\/(?:(?:en|es|fr|hi)\/)?(finance|health)\/[a-z0-9-]+-calculator\/?$/.test(pathname)) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
          return item;
        }

        // 3. Category Hubs: /finance/, /math/, /health/, /calculators/
        if (/^\/(?:(?:en|es|fr|hi)\/)?(finance|math|health|calculators|insurance|business|construction|real-estate|technology|statistics|marketing|automotive|biology|chemistry|physics|food|sports|ecology|everyday|converter|profession)\/?$/.test(pathname)) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
          return item;
        }

        // 4. Standard and Utility Calculators (Priority 0.6)
        if (pathname.includes('-calculator') || pathname.includes('-converter') || pathname.includes('-generator')) {
          item.priority = 0.6;
          item.changefreq = 'weekly';
          return item;
        }

        // 5. Default / Informational Pages (e.g., about, contact, legal)
        item.priority = 0.5;
        item.changefreq = 'monthly';
        return item;
      },
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
