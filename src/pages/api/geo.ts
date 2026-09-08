import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  // Cloudflare injects the `cf` object on Request in the edge worker
  // @ts-ignore
  const cf = request.cf;
  const country = (cf?.country || 'US').toUpperCase();

  const countryDefaults: Record<
    string,
    { currency: string; symbol: string; unitSystem: 'metric' | 'imperial'; numberFormat: 'standard' | 'lakh-crore' }
  > = {
    US: { currency: 'USD', symbol: '$', unitSystem: 'imperial', numberFormat: 'standard' },
    GB: { currency: 'GBP', symbol: '£', unitSystem: 'metric', numberFormat: 'standard' },
    CA: { currency: 'CAD', symbol: '$', unitSystem: 'metric', numberFormat: 'standard' },
    AU: { currency: 'AUD', symbol: '$', unitSystem: 'metric', numberFormat: 'standard' },
    IN: { currency: 'INR', symbol: '₹', unitSystem: 'metric', numberFormat: 'lakh-crore' },
    IE: { currency: 'EUR', symbol: '€', unitSystem: 'metric', numberFormat: 'standard' },
    NZ: { currency: 'NZD', symbol: '$', unitSystem: 'metric', numberFormat: 'standard' },
    SG: { currency: 'SGD', symbol: '$', unitSystem: 'metric', numberFormat: 'standard' },
    AE: { currency: 'AED', symbol: 'AED', unitSystem: 'metric', numberFormat: 'standard' },
    ZA: { currency: 'ZAR', symbol: 'R', unitSystem: 'metric', numberFormat: 'standard' },
  };

  const defaults = countryDefaults[country] || {
    currency: 'USD',
    symbol: '$',
    unitSystem: 'metric',
    numberFormat: 'standard',
  };

  return new Response(
    JSON.stringify({
      country,
      city: cf?.city || null,
      region: cf?.region || null,
      ...defaults,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, no-cache, no-store',
      },
    }
  );
};
