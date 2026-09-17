import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = 4321;
const DIST = path.resolve('dist/client');
const PUBLIC_DIR = path.resolve('public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8'
};

// Load redirects from public/_redirects
const redirects = new Map();
const redirectsFile = path.join(PUBLIC_DIR, '_redirects');
if (fs.existsSync(redirectsFile)) {
  const lines = fs.readFileSync(redirectsFile, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 2) {
      const from = parts[0];
      const to = parts[1];
      const code = parseInt(parts[2], 10) || 301;
      redirects.set(from, { to, code });
    }
  }
}

const server = http.createServer((req, res) => {
  const rawPath = req.url.split('?')[0];

  // Check redirects
  const normalizedWithSlash = rawPath.endsWith('/') ? rawPath : rawPath + '/';
  const normalizedNoSlash = rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath;

  if (redirects.has(rawPath)) {
    const { to, code } = redirects.get(rawPath);
    res.writeHead(code, { Location: to });
    return res.end();
  }
  if (redirects.has(normalizedWithSlash)) {
    const { to, code } = redirects.get(normalizedWithSlash);
    res.writeHead(code, { Location: to });
    return res.end();
  }
  if (redirects.has(normalizedNoSlash)) {
    const { to, code } = redirects.get(normalizedNoSlash);
    res.writeHead(code, { Location: to });
    return res.end();
  }

  let urlPath = rawPath;
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  if (!path.extname(urlPath)) urlPath += '/index.html';

  let filePath = path.join(DIST, urlPath);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(DIST, '404.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
