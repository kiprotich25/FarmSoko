// public/sw.js
self.addEventListener('install', event => {
  console.log('Service worker installing.')
  // You can do caching here
})

self.addEventListener('fetch', event => {
  // Optionally intercept requests and return cached responses
})
