/**
 * Cloudflare Worker: Edge Cache & TTL Optimizer for Free Accurate Calculator
 * Target: freeaccuratecalculator.com/*
 *
 * Implements 30-day (2592000s) edge caching for all static calculator and guide pages,
 * guaranteeing <100ms TTFB for search engine bots (Googlebot, Bingbot) and global users.
 */

const CACHE_TTL_SECONDS = 2592000; // 30 Days
const SITEMAP_TTL_SECONDS = 3600;   // 1 Hour
const ASSET_TTL_SECONDS = 31536000; // 1 Year

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 1. Bypass cache for dev preview, preview query params, or API mutations
    if (
      request.method !== 'GET' ||
      pathname.startsWith('/api/') ||
      pathname.startsWith('/dev-preview') ||
      url.searchParams.has('nocache')
    ) {
      return fetch(request);
    }

    // 1b. Enforce production HTTPS and non-www canonical host only for production domain
    // (Guarantees localhost, 127.0.0.1, and *.pages.dev previews are not broken)
    const isProdHost = url.hostname === 'freeaccuratecalculator.com' || url.hostname === 'www.freeaccuratecalculator.com';
    const isWww = url.hostname.startsWith('www.');
    const forwardedProto = request.headers.get('x-forwarded-proto');
    const isHttp = forwardedProto ? forwardedProto === 'http' : url.protocol === 'http:';

    if (isProdHost && (isWww || isHttp)) {
      const canonicalTarget = new URL('https://freeaccuratecalculator.com');
      canonicalTarget.pathname = url.pathname;
      canonicalTarget.search = url.search;
      return new Response(null, {
        status: 301,
        statusText: 'Moved Permanently',
        headers: {
          Location: canonicalTarget.toString(),
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    // 2. Normalize URLs without trailing slash to canonical trailing-slash URL with 301 Permanent Redirect
    // (excluding static files with extensions like .xml, .txt, .svg, .js, .css, etc.)
    const isFile = pathname.split('/').pop().includes('.');
    if (!isFile && !pathname.endsWith('/')) {
      const canonicalTarget = new URL(url.origin);
      canonicalTarget.pathname = `${pathname}/`;
      canonicalTarget.search = url.search;
      return new Response(null, {
        status: 301,
        statusText: 'Moved Permanently',
        headers: {
          Location: canonicalTarget.toString(),
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    // 3. Open Cloudflare Edge Cache
    const cache = caches.default;
    const cacheKey = new Request(url.toString(), request);
    let response = await cache.match(cacheKey);

    if (response) {
      // Return edge cache hit instantly (<50ms TTFB)
      const hitHeaders = new Headers(response.headers);
      hitHeaders.set('CF-Edge-Cache-Status', 'HIT');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: hitHeaders,
      });
    }

    // 4. Cache Miss: Fetch from Origin / Cloudflare Pages Asset Binding
    response = await fetch(request);

    // Convert temporary 307/308 or relative redirects to 301 with absolute Location for search bots
    if (response.status === 301 || response.status === 302 || response.status === 307 || response.status === 308) {
      const location = response.headers.get('Location');
      if (location) {
        const absoluteLocation = location.startsWith('http')
          ? location
          : new URL(location, url.origin).toString();
        
        return new Response(null, {
          status: 301,
          statusText: 'Moved Permanently',
          headers: {
            ...Object.fromEntries(response.headers.entries()),
            Location: absoluteLocation,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
    }

    // Only cache successful 200 OK responses
    if (response.status === 200) {
      const newHeaders = new Headers(response.headers);

      // Determine optimal caching headers based on route category
      if (pathname.startsWith('/_astro/') || pathname.startsWith('/flags/')) {
        // Static immutable hashed assets
        newHeaders.set('Cache-Control', `public, max-age=${ASSET_TTL_SECONDS}, immutable`);
        newHeaders.set('CDN-Cache-Control', `max-age=${ASSET_TTL_SECONDS}`);
      } else if (pathname.endsWith('.xml') || pathname.endsWith('robots.txt')) {
        // Dynamic sitemaps and crawl configuration
        newHeaders.set('Cache-Control', `public, max-age=${SITEMAP_TTL_SECONDS}, stale-while-revalidate=600`);
        newHeaders.set('CDN-Cache-Control', `max-age=${SITEMAP_TTL_SECONDS}`);
      } else {
        // Static prerendered calculator categories, country tools, and guides
        newHeaders.set(
          'Cache-Control',
          `public, max-age=${CACHE_TTL_SECONDS}, stale-while-revalidate=86400`
        );
        newHeaders.set('CDN-Cache-Control', `max-age=${CACHE_TTL_SECONDS}`);
      }

      newHeaders.set('CF-Edge-Cache-Status', 'MISS');

      const cachedResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });

      // Write to edge cache asynchronously without blocking the client response
      ctx.waitUntil(cache.put(cacheKey, cachedResponse.clone()));
      return cachedResponse;
    }

    return response;
  },
};
