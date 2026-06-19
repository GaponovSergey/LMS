const CACHE_NAME = `LMS`;
self.addEventListener('install', async event => {
  console.log('INSTALL');
  
  self.skipWaiting();
    
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([
      './',
      './sw.js',
      './static/css/main.css',
      './static/js/main.js',
      './index.html',
      './favicon.ico', 
      './manifest.json',
    ]);
    console.log('added');
  
});

self.addEventListener('fetch', event => {
  console.log('fetch');


  return;
  async function answer (event) {
  let response;
  
    const cachedData = await caches.match(event.request);
    if (cachedData) {
      response = cachedData;
    } else {
      response = await fetch(event.request.url);
      let cache = await caches.open(CACHE_NAME);
      await cache.put(event.request.url, response.clone());
      
    }
    
  
  return response;
}
  event.respondWith(answer(event));
  
});

self.addEventListener("push", (e)=> {

  const data = e.data.json()

  console.log("e.data")
  console.log(data)

  self.registration.showNotification(data.title, data)
})

self.addEventListener("notificationclick", async (e)=> {

  console.log(e)
  const url = e.notification.data.url;
  e.notification.close();
  clients.openWindow(url)
})



