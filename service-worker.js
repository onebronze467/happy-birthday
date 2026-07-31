const CACHE_NAME = "happy-birthday-v6";

const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",

  "./music/bgm.mp3",
  "./music/slide.mp3",

  "./image/1.png",
  "./image/2.jpeg",
  "./image/3.png",
  "./image/4.jpeg",
  "./image/5.png",
  "./image/6.jpeg",
  "./image/7.jpeg",
  "./image/8.png",
  "./image/9.jpeg",
  "./image/10.png",
  "./image/11.png",

  "./icons/icon-192.png",
  "./icons/icon-512.png",

  "./image/final.jpg",

  "./image/last.jpeg",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});
