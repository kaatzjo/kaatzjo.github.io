CACHE_NAME = 'WeekdayGame-1';

self.addEventListener('install', (event)=>{
    console.log('service worker install event triggered');
    fillCache(CACHE_NAME);
});

self.addEventListener('fetch', (event)=>{
    event.respondWith(getCachedData(CACHE_NAME, event.request));
});

async function fillCache(cacheName){
    const cacheStorage = await caches.open(cacheName);
    await cacheStorage.addAll([
        'index.html',
        'settings.html',
        'stats.html',
        'more.html',
        'scripts/index.js',
        'scripts/settings.js',
        'scripts/stats.js',
        'styles/index.css',
        'styles/main.css',
        'styles/more.css',
        'styles/settings.css',
        'styles/stats.css',
        'icons/calendar_colorful.png',
        'icons/calendar.png',
        'icons/calendar.svg',
        'icons/info.svg',
        'icons/QR.svg',
    ]);
};

async function getCachedData(cacheName, url) {
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);

    if (!cachedResponse || !cachedResponse.ok) {
        return false;
    }

    return cachedResponse;
};