self.addEventListener('install', event => {
    console.log('Service Worker installing.');
    self.skipWaiting(); // 可選：強制 Service Worker 安裝
});

self.addEventListener('activate', event => {
    console.log('Service Worker activating.');
});

self.addEventListener('fetch', event => {
    console.log('Service Worker fetching:', event.request.url);
});
