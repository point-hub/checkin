/* eslint-disable no-undef */
workbox.core.setCacheNameDetails({ prefix: "@point-hub/checkin" });

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener("message", msg => {
  if (msg.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
