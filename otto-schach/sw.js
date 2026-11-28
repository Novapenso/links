/* Offline-Speicher Ottos Schach-Training, Stand 28.11.2026. Erst das Netz (Aktualisierungen kommen sofort an), sonst der Speicher. */
const CACHE = "otto-schach-28112026";
const DATEIEN = ["./", "index.html", "chess.js", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "otto-froh.png", "otto-jubel.png", "otto-denken.png", "otto-staunen.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(DATEIEN)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const k = r.clone(); caches.open(CACHE).then(c => c.put(e.request, k)); return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match("index.html"))));
});
