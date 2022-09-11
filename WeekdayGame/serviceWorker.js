const CACHE_NAME = 'WeekdayGame-1';

const FORCE_UPDATE = true;

const FILES_TO_CACHE = [
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
];

self.addEventListener('install', (event)=>{
    console.log('service worker install event triggered');
    if (caches.has(CACHE_NAME)){
        if (!FORCE_UPDATE){
            return;
        }
        event.waitUntil(caches.delete(CACHE_NAME).then(() => fillCache(CACHE_NAME)));
    } else {
        event.waitUntil(fillCache(CACHE_NAME));
    }
});

self.addEventListener('fetch', (event)=>{
    event.respondWith(getCachedData(CACHE_NAME, event.request));
});

async function fillCache(cacheName){
    const cacheStorage = await caches.open(cacheName);
    await cacheStorage.addAll(FILES_TO_CACHE);
}

async function getCachedData(cacheName, url) {
    if (url === ''){
        url = 'index.html';
    }
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);

    if (!cachedResponse || !cachedResponse.ok) {
        return await fetch(url);
    }

    return cachedResponse;
}