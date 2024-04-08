self.addEventListener('install', event => {
    // console.log('Service worker install event!');
});

self.addEventListener('fetch', event => {
    // console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(fetch(event.request));
});
