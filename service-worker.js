// 재경혜 홈페이지 — Service Worker
// PWA 설치 조건을 충족하기 위한 최소 SW.
// Firebase Storage·Firestore·Auth 요청은 가로채지 않고 그대로 통과.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // Firebase·Google 관련 도메인은 SW가 가로채지 않음 (CORS·캐시 영향 방지)
  if (
    url.includes('firebasestorage.googleapis.com') ||
    url.includes('firestore.googleapis.com') ||
    url.includes('identitytoolkit.googleapis.com') ||
    url.includes('googleapis.com') ||
    url.includes('gstatic.com')
  ) {
    return;   // 브라우저가 직접 처리
  }

  // 그 외 요청은 그대로 통과 (캐싱 없음)
  event.respondWith(fetch(event.request));
});
