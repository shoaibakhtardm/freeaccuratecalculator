// src/pages/api/subscribe.ts
export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const email = body?.email;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Free Accurate Calculator <newsletter@freeaccuratecalculator.com>',
          to: [email],
          subject: 'Your 2026 Financial Planning Spreadsheet',
          html: `<h2>Welcome to Free Accurate Calculator</h2><p>Here is your direct download link: <a href="https://freeaccuratecalculator.com/sheets/amortization-2026.xlsx">Download Master Spreadsheet</a></p>`,
        }),
      }).catch((err) => console.error('Resend error:', err));
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
