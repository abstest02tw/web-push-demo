navigator.serviceWorker.register('/sw.js?v=1.0');

self.addEventListener('install', event => {
    console.log('Service Worker installing.');
});

self.addEventListener('activate', event => {
    console.log('Service Worker activating.');
});

self.addEventListener('fetch', event => {
    console.log('Service Worker fetching:', event.request.url);
});
