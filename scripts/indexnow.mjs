// scripts/indexnow.mjs
import fs from 'node:fs';
import path from 'node:path';

const INDEXNOW_KEY = 'fac948a31e804f90918ef86520b22a07';
const HOST = 'freeaccuratecalculator.com';
const SITEMAP_PATH = path.resolve('dist/client/sitemap.xml');
const FALLBACK_SITEMAP = path.resolve('public/sitemap.xml');

async function submitIndexNow() {
  const targetFile = fs.existsSync(SITEMAP_PATH) ? SITEMAP_PATH : FALLBACK_SITEMAP;

  if (!fs.existsSync(targetFile)) {
    console.log('⚠️ No sitemap.xml found. Run npm run build first.');
    return;
  }

  const sitemapXml = fs.readFileSync(targetFile, 'utf-8');
  const urls = [...sitemapXml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map((m) => m[1]);

  if (urls.length === 0) {
    console.log('⚠️ No URLs extracted from sitemap.');
    return;
  }

  // Deduplicate URLs
  const uniqueUrls = Array.from(new Set(urls));
  // IndexNow allows up to 10,000 URLs per batch request
  const batch = uniqueUrls.slice(0, 1000);

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: batch,
  };

  try {
    console.log(`📡 Pinging IndexNow (Bing / Yandex / Naver / Seznam) with ${batch.length} URLs...`);
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    if (response.status === 200 || response.status === 202) {
      console.log(`✅ IndexNow successfully submitted ${batch.length} URLs (HTTP ${response.status}).`);
    } else {
      console.log(`ℹ️ IndexNow response: HTTP ${response.status} ${response.statusText}`);
    }
  } catch (err) {
    console.warn(`⚠️ IndexNow ping skipped or network offline: ${err.message}`);
  }
}

submitIndexNow();
