// sw.js — PWA-кэш для статики дашборда

const CACHE_NAME = 'shifts-dashboard-v1';

const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/sw.js',
  // Добавь сюда иконки, если они лежат в корне:
  // '/icon-192.png',
  // '/icon-512.png'
];

// Установка: кладём статику в кэш
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Активация: чистим старые кэши
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => (k === CACHE_NAME ? null : caches.delete(k)))
      )
    )
  );
});

// Обслуживание fetch: сначала смотрим кэш, затем сеть
self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request);
    })
  );
});
