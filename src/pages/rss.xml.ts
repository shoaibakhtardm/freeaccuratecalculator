// src/pages/rss.xml.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async (context) => {
  const siteUrl = 'https://freeaccuratecalculator.com';
  const guides = await getCollection('guides');

  // Filter English primary guides and sort by publication date descending
  const sortedGuides = guides
    .filter((g) => g.data.lang === 'en' && !g.id.includes('/'))
    .sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime());

  function escapeXml(unsafe: string) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  const itemsXml = sortedGuides
    .map((post) => {
      const slug = post.id.replace(/\.(md|mdx)$/, '');
      const link = `${siteUrl}/guides/${slug}/`;
      const pubDateRfc822 = new Date(post.data.pubDate).toUTCString();

      return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(post.data.description)}</description>
      <pubDate>${pubDateRfc822}</pubDate>
      <category>${escapeXml(post.data.category)}</category>
    </item>`;
    })
    .join('\n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Free Accurate Calculator — Official Guides &amp; Research</title>
    <link>${siteUrl}</link>
    <description>Empirical mathematical guides, financial formulas, health benchmarks, and quantitative algorithms.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
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
