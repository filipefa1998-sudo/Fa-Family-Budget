// Fa Family Budget service worker: lets the app open offline.
// Bump VERSION whenever you change index.html so phones pick up the update.
const VERSION = "ffb-v1";
const SHELL = ["./", "index.html", "firebase-config.js", "manifest.json", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  // Never cache Firebase / Google API traffic; Firestore handles its own offline data.
  if (/googleapis\.com|firebaseio\.com|identitytoolkit|securetoken|firebaseapp\.com/.test(url.host)) return;
  if (url.origin === location.origin) {
    // Your own files: network first so updates show up, cache as the offline fallback.
    e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match("index.html"))));
  } else if (/gstatic\.com|fonts\.googleapis\.com/.test(url.host)) {
    // Firebase SDK + fonts: cache first.
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return res; })));
  }
});
