// src/pages/rss.xml.ts
// Minimal static RSS channel. The legacy guides content collection was retired
// (src/content/guides removed), so the feed no longer derives items from
// getCollection('guides') — which previously produced an empty feed and a build
// warning. Keep the endpoint live for subscribers; extend items here if new
// editorial content is reintroduced.
import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async () => {
  const siteUrl = 'https://freeaccuratecalculator.com';

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Free Accurate Calculator — Official Updates</title>
    <link>${siteUrl}</link>
    <description>Free online calculators for finance, math, health, business, science, and everyday use.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
  </channel>
</rss>`;

  return new Response(rssFeed, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
