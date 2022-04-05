addEventListener("fetch", (event) => {
  var url = new URL(event.request.url);
  if (url.pathname.startsWith('/api/') || url.pathname === '/api') {
    handleApi(event, url);
  } else {
    handleFrontend(event, url);
  }
});

async function handleApi(event, url) {
  const redirect = url.toString().replace(
    new RegExp(`^${url.origin}/api`), 
    "https://raidcomp-api.stefanpuia.co.uk");
  event.respondWith(fetch(cloneRequest(redirect, event.request))); 
}

async function handleFrontend(event, url) {
  const redirect = url.toString().replace(
    new RegExp(`^${url.origin}`), 
    "https://raid-comp.pages.dev/");
  event.respondWith(fetch(cloneRequest(redirect, event.request))); 
}

function cloneRequest(url, request) {
  return new Request(url, {
    ...request
  })
}