self.addEventListener('install', (e) => {
    console.log('[Service Worker] Installed');
});

self.addEventListener('fetch', (e) => {
    // В будущем тут можно настроить полное оффлайн-кэширование
});
