const CACHE_NAME = 'jottly-site-cache-v1'
const urlsToCache = [
  '/',
  '/stylesheets/style.min.css',
  '/js/app.js',
  '/images/action.jpg',
  '/images/logo.png',
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response
        }

        return fetch(event.request)
      })
  )
})
