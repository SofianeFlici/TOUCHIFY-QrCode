const CACHE_NAME = 'v1';
const STATIC_RESOURCES = [
    '/'
];
self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(STATIC_RESOURCES);
    }));
});
self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
    }));
});
