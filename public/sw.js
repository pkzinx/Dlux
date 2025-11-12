/* Dlux Barbearia — Service Worker
 * - Cache offline para páginas e assets
 * - Mantém integração com Firebase Messaging via importScripts
 */

// Push notifications/background messaging
importScripts('/firebase-messaging-sw.js');

const VERSION = 'v1';
const STATIC_CACHE = `dlux-static-${VERSION}`;
const RUNTIME_CACHE = `dlux-runtime-${VERSION}`;

const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/favicon.ico',
  '/assets/img/icon-logo.png',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => ![STATIC_CACHE, RUNTIME_CACHE].includes(key))
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

// Helpers
async function cachePut(cacheName, request, response) {
  const cache = await caches.open(cacheName);
  try {
    await cache.put(request, response);
  } catch (_e) {
    // ignore opaque responses or errors
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Apenas GET e mesma origem
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // Navegação (páginas)
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const networkResp = await fetch(request);
          // Armazena última versão navegável
          cachePut(RUNTIME_CACHE, request, networkResp.clone());
          return networkResp;
        } catch (_e) {
          // Fallback: página em cache ou offline.html
          const cache = await caches.open(STATIC_CACHE);
          const cached = await cache.match('/');
          return (
            cached || (await cache.match('/offline.html')) || Response.error()
          );
        }
      })()
    );
    return;
  }

  // Assets estáticos versionados do Next
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(STATIC_CACHE);
        const cached = await cache.match(request);
        if (cached) return cached;
        const resp = await fetch(request);
        cachePut(STATIC_CACHE, request, resp.clone());
        return resp;
      })()
    );
    return;
  }

  // CSS/JS/Font/Image — Stale While Revalidate
  const dest = request.destination;
  if (['style', 'script', 'font', 'image'].includes(dest)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(RUNTIME_CACHE);
        const cached = await cache.match(request);
        const networkPromise = fetch(request)
          .then((resp) => {
            cachePut(RUNTIME_CACHE, request, resp.clone());
            return resp;
          })
          .catch(() => undefined);
        return cached || (await networkPromise) || Response.error();
      })()
    );
    return;
  }

  // API — Network First
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      (async () => {
        try {
          const networkResp = await fetch(request);
          cachePut(RUNTIME_CACHE, request, networkResp.clone());
          return networkResp;
        } catch (_e) {
          const cache = await caches.open(RUNTIME_CACHE);
          const cached = await cache.match(request);
          return cached || Response.error();
        }
      })()
    );
    return;
  }
});

// Notificação: reuso no firebase-messaging-sw.js
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = '/';
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});