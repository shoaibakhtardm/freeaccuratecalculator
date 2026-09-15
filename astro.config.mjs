import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

const isDev = process.argv.includes('dev') || process.env.NODE_ENV === 'development';

export default defineConfig({
  site: 'https://freeaccuratecalculator.com',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'de', 'ar', 'nl', 'pt', 'it', 'ru', 'ja', 'hi', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  redirects: {
    '/countries/france/age-calculator': '/countries/france/retirement-calculator/',
    '/countries/france/calorie-calculator': '/countries/france/health/',
    '/countries/france/bmi-calculator': '/countries/france/health/',
    '/countries/france/date-calculator': '/countries/france/everyday/',
    '/calculateur-age': '/countries/france/retirement-calculator/',
    '/calculateur-calories': '/countries/france/health/',
    '/calculateur-imc': '/countries/france/health/',
    '/calculateur-dates': '/countries/france/everyday/',
    '/countries/france/apl-simulator': '/countries/france/simulateur-apl/',
    '/countries/france/severance-calculator': '/countries/france/indemnite-licenciement/',
    '/countries/france/real-expenses-calculator': '/countries/france/frais-reels-abattement/',
    '/countries/france/mileage-allowance-calculator': '/countries/france/indemnites-kilometriques/',
    '/countries/france/math/percentage-calculator': '/fr/math/percentage-calculator/',
    '/countries/france/percentage-calculator': '/fr/math/percentage-calculator/',
    '/countries/france/finance/simulateur-apl': '/countries/france/simulateur-apl/',
    '/countries/france/finance/indemnite-licenciement': '/countries/france/indemnite-licenciement/',
    '/countries/france/finance/frais-reels-abattement': '/countries/france/frais-reels-abattement/',
    '/countries/france/finance/indemnites-kilometriques': '/countries/france/indemnites-kilometriques/',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en', es: 'es', fr: 'fr', de: 'de', ar: 'ar',
          nl: 'nl', pt: 'pt', it: 'it', ru: 'ru', ja: 'ja', hi: 'hi', zh: 'zh',
        },
      },
      filter: (page) =>
        !page.includes('/dev-preview') &&
        !page.includes('/api/') &&
        !page.includes('/blog/') &&
        !page.endsWith('/blog') &&
        !page.includes('/calculators/') &&
        !page.includes('/calculator/') &&
        !/\/(404|500)(\/|$)/.test(page) &&
        !page.endsWith('/sitemap.xml'),
      serialize(item) {
        const url = new URL(item.url);
        const pathname = url.pathname;

        if (pathname === '/' || /^\/(en|es|fr|de|ar|nl|pt|it|ru|ja|hi|zh)\/?$/.test(pathname)) {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (/^\/(?:(?:en|es|fr|de|ar|nl|pt|it|ru|ja|hi|zh)\/)?(finance|math|health|calculators)\/?$/.test(pathname)) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        } else if (pathname.includes('-calculator')) {
          item.priority = 0.7;
          item.changefreq = 'weekly';
        } else {
          item.priority = 0.5;
          item.changefreq = 'monthly';
        }

        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
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
