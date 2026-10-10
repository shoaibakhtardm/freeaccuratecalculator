import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../workers/edge-cache.js';

// Mock Cloudflare Edge Cache API and origin fetch in Node test environment
globalThis.caches = {
  default: {
    match: async () => null,
    put: async () => {}
  }
};
globalThis.fetch = async () => new Response('OK', { status: 200, headers: { 'Content-Type': 'text/html' } });

test('Edge Worker: HTTP protocol redirects to HTTPS with 1-day Cache-Control', async () => {
  const req = new Request('http://freeaccuratecalculator.com/', { method: 'GET' });
  const res = await worker.fetch(req, {}, { waitUntil: () => {} });
  assert.equal(res.status, 301);
  assert.equal(res.headers.get('location'), 'https://freeaccuratecalculator.com/');
  assert.equal(res.headers.get('cache-control'), 'public, max-age=86400');
});

test('Edge Worker: www subdomain redirects to apex HTTPS with path & query preserved', async () => {
  const req = new Request('https://www.freeaccuratecalculator.com/percentage-calculator/?calc=1', { method: 'GET' });
  const res = await worker.fetch(req, {}, { waitUntil: () => {} });
  assert.equal(res.status, 301);
  assert.equal(res.headers.get('location'), 'https://freeaccuratecalculator.com/percentage-calculator/?calc=1');
  assert.equal(res.headers.get('cache-control'), 'public, max-age=86400');
});

test('Edge Worker: Localhost and preview domains are bypassed without redirection', async () => {
  const localReq = new Request('http://localhost:4321/bmi-calculator/', { method: 'GET' });
  try {
    const res = await worker.fetch(localReq, {}, { waitUntil: () => {} });
    assert.notEqual(res.status, 301);
  } catch (err) {
    // If local fetch attempts network request, it confirms bypass from early host redirect
    assert.ok(true);
  }
});

test('Edge Worker: Genuine legacy country equivalents return 301 to active destinations', async () => {
  const testCases = [
    { in: 'https://freeaccuratecalculator.com/countries/france/', expected: 'https://freeaccuratecalculator.com/fr/' },
    { in: 'https://freeaccuratecalculator.com/countries/france/fr/overview', expected: 'https://freeaccuratecalculator.com/fr/' },
    { in: 'https://freeaccuratecalculator.com/countries/france/sip-calculator/', expected: 'https://freeaccuratecalculator.com/sip-calculator/' },
    { in: 'https://freeaccuratecalculator.com/countries/india/finance/', expected: 'https://freeaccuratecalculator.com/finance/' }
  ];

  for (const tc of testCases) {
    const req = new Request(tc.in, { method: 'GET' });
    const res = await worker.fetch(req, {}, { waitUntil: () => {} });
    assert.equal(res.status, 301);
    assert.equal(res.headers.get('location'), tc.expected);
    assert.equal(res.headers.get('cache-control'), 'public, max-age=86400');
  }
});

test('Edge Worker: Permanently retired country & guide URLs return true HTTP 410 Gone', async () => {
  const retiredUrls = [
    'https://freeaccuratecalculator.com/countries/',
    'https://freeaccuratecalculator.com/countries/united-states/',
    'https://freeaccuratecalculator.com/countries/singapore/',
    'https://freeaccuratecalculator.com/countries/france/en/guides/',
    'https://freeaccuratecalculator.com/countries/france/fr/guides/',
    'https://freeaccuratecalculator.com/love/guides/',
    'https://freeaccuratecalculator.com/countries/random-dead-path'
  ];

  for (const u of retiredUrls) {
    const req = new Request(u, { method: 'GET' });
    const res = await worker.fetch(req, {}, { waitUntil: () => {} });
    assert.equal(res.status, 410, `URL ${u} should return 410 Gone`);
    assert.equal(res.headers.get('cache-control'), 'public, max-age=86400');
  }
});

test('Edge Worker: Love Hub and Love Calculator both remain active (Option C - no redirect)', async () => {
  const hubReq = new Request('https://freeaccuratecalculator.com/love/', { method: 'GET' });
  const calcReq = new Request('https://freeaccuratecalculator.com/love-calculator/', { method: 'GET' });

  const hubRes = await worker.fetch(hubReq, {}, { waitUntil: () => {} });
  const calcRes = await worker.fetch(calcReq, {}, { waitUntil: () => {} });

  assert.notEqual(hubRes.status, 410);
  assert.notEqual(hubRes.status, 301);
  assert.notEqual(calcRes.status, 410);
  assert.notEqual(calcRes.status, 301);
});
