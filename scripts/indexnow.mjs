// scripts/indexnow.mjs
import fs from 'node:fs';
import path from 'node:path';

const INDEXNOW_KEY = 'fac948a31e804f90918ef86520b22a07';
const HOST = 'freeaccuratecalculator.com';
const SITEMAP_PATH = path.resolve('dist/client/sitemap.xml');
const FALLBACK_SITEMAP = path.resolve('public/sitemap.xml');
const KEY_FILE = path.resolve(`public/${INDEXNOW_KEY}.txt`);

// Direct Bing endpoint and global IndexNow aggregator
const ENDPOINTS = [
  'https://www.bing.com/indexnow',
  'https://api.indexnow.org/indexnow',
];

// Streaming chunk size (Bing recommends streaming smaller batches for faster updates)
const STREAM_CHUNK_SIZE = 100;

function verifyKeyFile() {
  if (!fs.existsSync(KEY_FILE)) {
    console.error(`❌ IndexNow key verification file missing at public/${INDEXNOW_KEY}.txt`);
    return false;
  }
  const content = fs.readFileSync(KEY_FILE, 'utf-8').trim();
  if (content !== INDEXNOW_KEY) {
    console.error(`❌ Key file content "${content}" does not match key "${INDEXNOW_KEY}"`);
    return false;
  }
  return true;
}

async function sendChunk(endpoint, urlList) {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urlList,
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'User-Agent': 'FreeAccurateCalculator-IndexNow/1.0',
    },
    body: JSON.stringify(payload),
  });

  return response;
}

async function submitUrls(urls) {
  if (!verifyKeyFile()) return;

  const uniqueUrls = Array.from(new Set(urls.filter((u) => u && u.startsWith('http'))));

  if (uniqueUrls.length === 0) {
    console.log('⚠️ No valid URLs provided for IndexNow submission.');
    return;
  }

  console.log(`🚀 Preparing IndexNow submission for ${uniqueUrls.length} URLs (Streaming in chunks of ${STREAM_CHUNK_SIZE})...`);

  // Split into streaming chunks
  const chunks = [];
  for (let i = 0; i < uniqueUrls.length; i += STREAM_CHUNK_SIZE) {
    chunks.push(uniqueUrls.slice(i, i + STREAM_CHUNK_SIZE));
  }

  for (let chunkIdx = 0; chunkIdx < chunks.length; chunkIdx++) {
    const chunk = chunks[chunkIdx];
    console.log(`📦 Streaming chunk ${chunkIdx + 1}/${chunks.length} (${chunk.length} URLs)...`);

    for (const endpoint of ENDPOINTS) {
      const endpointName = new URL(endpoint).hostname;
      try {
        const res = await sendChunk(endpoint, chunk);
        if (res.status === 200 || res.status === 202) {
          console.log(`   ✅ [${endpointName}] Received chunk ${chunkIdx + 1} (HTTP ${res.status})`);
        } else {
          console.warn(`   ℹ️ [${endpointName}] HTTP ${res.status}: ${res.statusText}`);
        }
      } catch (err) {
        console.warn(`   ⚠️ [${endpointName}] Ping failed: ${err.message}`);
      }
    }

    if (chunkIdx < chunks.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }

  console.log(`🎉 IndexNow streaming submission complete.`);
}

async function main() {
  // Check if specific URLs were passed via command line arguments (e.g. node scripts/indexnow.mjs https://...)
  const cliArgs = process.argv.slice(2).filter((arg) => arg.startsWith('http'));

  if (cliArgs.length > 0) {
    console.log(`📡 Direct CLI URL submission requested for ${cliArgs.length} URL(s).`);
    await submitUrls(cliArgs);
    return;
  }

  // Otherwise read canonical sitemap
  const targetFile = fs.existsSync(SITEMAP_PATH) ? SITEMAP_PATH : FALLBACK_SITEMAP;

  if (!fs.existsSync(targetFile)) {
    console.log('⚠️ No sitemap.xml found. Run npm run build first.');
    return;
  }

  const sitemapXml = fs.readFileSync(targetFile, 'utf-8');
  const urls = [...sitemapXml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map((m) => m[1]);

  await submitUrls(urls);
}

main();
