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
        !page.includes('/500') &&
        !page.endsWith('/sitemap.xml') &&
        !page.endsWith('/sitemap-index.xml'),
      namespaces: {
        image: true,
        xhtml: true,
      },
      serialize(item) {
        const url = new URL(item.url);
        const pathname = url.pathname;

        // Exclude unwanted and draft patterns
        if (
          pathname.includes('/admin/') ||
          pathname.includes('/draft/') ||
          pathname.includes('/404') ||
          pathname.includes('/500') ||
          pathname.includes('/dev-preview') ||
          pathname.includes('/api/')
        ) {
          return undefined;
        }

        // Priority assignment logic
        if (pathname === '/' || /^\/(en|es|fr|hi)\/?$/.test(pathname)) {
          item.priority = 1.0;
          item.changefreq = 'daily';
          item.img = [
            {
              url: 'https://freeaccuratecalculator.com/og-image.png',
              title: 'Free Accurate Calculator - 100+ Free Online Calculators',
              caption: 'Fast, precise, and free calculators for finance, health, math, and everyday use',
            },
          ];
        } else if (pathname.includes('/finance/') || pathname.includes('/health/')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
          const slugMatch = pathname.match(/\/([^/]+)\/?$/);
          const slug = slugMatch ? slugMatch[1] : 'calculator';
          const title = slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          item.img = [
            {
              url: `https://freeaccuratecalculator.com/og/${slug}.png`,
              title: `${title} - Free Accurate Calculator`,
              caption: `Accurate calculation tool for ${title}`,
            },
          ];
        } else if (pathname.includes('/blog/')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
          const slugMatch = pathname.match(/\/([^/]+)\/?$/);
          const slug = slugMatch ? slugMatch[1] : 'blog';
          const title = slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          item.img = [
            {
              url: `https://freeaccuratecalculator.com/og/${slug}.png`,
              title: `${title} - Financial & Health Insights`,
              caption: `Evergreen guide for ${title}`,
            },
          ];
        } else if (pathname.includes('-calculator') || pathname.includes('-converter') || pathname.includes('-generator')) {
          item.priority = 0.7;
          item.changefreq = 'weekly';
          const slugMatch = pathname.match(/\/([^/]+)\/?$/);
          const slug = slugMatch ? slugMatch[1] : 'calculator';
          const title = slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          item.img = [
            {
              url: `https://freeaccuratecalculator.com/og/${slug}.png`,
              title: `${title} - Free Accurate Calculator`,
              caption: `Free calculation tool for ${title}`,
            },
          ];
        } else {
          item.priority = 0.5;
          item.changefreq = 'monthly';
        }

        // Dynamic lastmod
        item.lastmod = new Date().toISOString();

        return item;
      },
      // Generate separate language sitemaps indexed by sitemap-index.xml
      chunks: {
        en: (item) => {
          const pathname = new URL(item.url).pathname;
          return !/^\/(es|fr|hi)(\/|$)/.test(pathname) ? item : undefined;
        },
        es: (item) => {
          const pathname = new URL(item.url).pathname;
          return /^\/es(\/|$)/.test(pathname) ? item : undefined;
        },
        fr: (item) => {
          const pathname = new URL(item.url).pathname;
          return /^\/fr(\/|$)/.test(pathname) ? item : undefined;
        },
        hi: (item) => {
          const pathname = new URL(item.url).pathname;
          return /^\/hi(\/|$)/.test(pathname) ? item : undefined;
        },
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
