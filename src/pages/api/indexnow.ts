import type { APIRoute } from 'astro';

export const prerender = false;

const INDEXNOW_KEY = 'fac948a31e804f90918ef86520b22a07';
const HOST = 'freeaccuratecalculator.com';

const ENDPOINTS = [
  'https://www.bing.com/indexnow',
  'https://api.indexnow.org/indexnow',
];

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const urls: string[] = Array.isArray(body.urls) ? body.urls : (body.url ? [body.url] : []);

    const validUrls = urls
      .map((u) => (typeof u === 'string' ? u.trim() : ''))
      .filter((u) => u.startsWith(`https://${HOST}`));

    if (validUrls.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No valid URLs provided starting with https://freeaccuratecalculator.com' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: validUrls.slice(0, 100),
    };

    const results = await Promise.allSettled(
      ENDPOINTS.map(async (endpoint) => {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'User-Agent': 'FreeAccurateCalculator-IndexNow-Edge/1.0',
          },
          body: JSON.stringify(payload),
        });
        return {
          endpoint: new URL(endpoint).hostname,
          status: res.status,
          statusText: res.statusText,
        };
      })
    );

    return new Response(
      JSON.stringify({
        success: true,
        submittedCount: validUrls.length,
        results: results.map((r) => (r.status === 'fulfilled' ? r.value : { error: r.reason?.message })),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || 'Internal IndexNow error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
