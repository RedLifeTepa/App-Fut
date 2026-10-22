// Service Worker Oficial — LigaPro PWA (Offline Cache + Web Push Notifications)
const CACHE_NAME = 'ligapro-pwa-v1.0.0';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/js/firebase-service.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Estrategia Network-First con respaldo en Caché para datos frescos de la liga
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const cloned = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Receptor de Notificaciones Push en segundo plano (Firebase Cloud Messaging / Web Push)
self.addEventListener('push', (event) => {
  let payload = {
    title: '⚽ Actualización de la Liga',
    body: 'Nuevo resultado o aviso oficial disponible en la aplicación.',
    url: '/index.html'
  };
  if (event.data) {
    try {
      payload = Object.assign(payload, event.data.json());
    } catch (e) {
      payload.body = event.data.text();
    }
  }
  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/26bd.png',
      badge: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/26bd.png',
      vibrate: [200, 100, 200],
      data: { url: payload.url || '/index.html' }
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || '/index.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url.includes(targetUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
