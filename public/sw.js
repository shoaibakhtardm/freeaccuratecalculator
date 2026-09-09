// public/sw.js
const CACHE_NAME = 'fac-cache-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/favicon.svg',
  '/og-image.svg'
];

// Install event - cache core app shell
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of urlsToCache) {
        try {
          await cache.add(url);
        } catch (err) {
          console.warn('[SW] Could not precache:', url, err);
        }
      }
    })
  );
});

// Activate event - clean up old caches and take immediate control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, update in background, fallback to network
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Restrict caching to same-origin requests
  if (url.origin !== self.location.origin) return;

  // Ignore admin, API, or preview paths
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/dev-preview/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached version immediately, revalidate in background
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      // Network fetch with runtime caching
      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        })
        .catch(() => {
          // Offline fallback for HTML navigation
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/');
          }
        });
    })
  );
});
