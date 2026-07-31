/* 배포 시 앱 파일 변경이 있으면 CACHE 버전을 올릴 것 (v1 → v2 …) */
const CACHE = 'routine-v5';
const CORE = [
  './',
  './index.html',
  './css/style.css',
  './js/storage-migration.js',
  './js/rehab.js',
  './js/app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(CORE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

/* 네트워크 우선 → 성공 시 캐시 갱신, 실패(오프라인) 시 캐시 폴백 */
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          e.waitUntil(caches.open(CACHE).then((c) => c.put(e.request, copy)));
        }
        return res;
      })
      .catch(() =>
        caches
          .match(e.request)
          .then((r) => r || (e.request.mode === 'navigate' ? caches.match('./index.html') : Response.error())),
      ),
  );
});
