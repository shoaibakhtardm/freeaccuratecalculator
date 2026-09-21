// src/middleware.ts
import { defineMiddleware } from 'astro:middleware';

// Permanently deleted URLs — exact-match 410 Gone (forensic URL removal cleanup).
// The generators for these routes were removed from the source data; this exact-match
// list only informs crawlers the content is gone forever. No catch-all, no redirects.
//
// NOTE: Cloudflare `_redirects` only supports 3xx/200 status codes, so 410 is emitted
// here in the worker fallback: requests to these removed paths no longer match any
// static asset and therefore always reach this middleware in production.
const PERMANENTLY_DELETED_PATHS = new Set([
  '/business/freelance/contractor-hourly-rate-uk-to-net-4000-per-month-outside-ir35',
  '/business/freelance/freelance-web-developer-hourly-rate-india-to-net-1-lakh-per-month',
  '/business/freelance/upwork-freelancer-hourly-rate-to-make-5000-a-month',
  '/finance/salary/100000-in-hand-salary-india-new-regime',
  '/finance/salary/120000-salary-after-taxes-california',
  '/finance/salary/50000-in-hand-salary-india-new-regime',
  '/finance/salary/60000-salary-after-tax-uk',
  '/finance/salary/75000-salary-after-taxes-texas',
  '/finance/sip/10000-monthly-sip-for-10-years',
  '/finance/sip/10000-monthly-sip-for-15-years',
  '/finance/sip/25000-monthly-sip-for-20-years',
  '/finance/sip/5000-monthly-sip-for-10-years',
  '/finance/sip/50000-monthly-sip-for-15-years',
  '/love/blog/love-compatibility-tips',
]);

export const onRequest = defineMiddleware((context, next) => {
  // Normalize trailing slash so both slashed and unslashed variants are covered.
  const path = context.url.pathname.replace(/\/+$/, '') || '/';

  if (path !== '/' && PERMANENTLY_DELETED_PATHS.has(path)) {
    return new Response('410 Gone', {
      status: 410,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }

  return next();
});
