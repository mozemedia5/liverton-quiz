// Cache name – bump this string when you update the quiz
const CACHE = "liverton-v1";

// Assets that must work offline
const ASSETS = [
  "/",
  "/index.html",
  "/favicon-192×192.png",
  "/favicon-512×512.png"
];

// Install → cache shell
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // activate immediately
});

// Activate → delete old caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim(); // control open tabs
});

// Fetch → cache-first, fallback to network
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
