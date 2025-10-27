if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + '.js', i).href),
    s[a] ||
      new Promise(s => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = a), (e.onload = s), document.head.appendChild(e));
        } else ((e = a), importScripts(a), s());
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, n) => {
    const t =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[t]) return;
    let c = {};
    const o = e => a(e, t),
      r = { module: { uri: t }, exports: c, require: o };
    s[t] = Promise.all(i.map(e => r[e] || o(e))).then(e => (n(...e), c));
  };
}
define(['./workbox-b7fab36e'], function (e) {
  'use strict';
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/ZLAQ6pk8hIPBwy-o7BqfL/_buildManifest.js',
          revision: 'd89c8eae03b9dc83cd7bd37a869e47d5',
        },
        {
          url: '/_next/static/ZLAQ6pk8hIPBwy-o7BqfL/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/0b7b90cd.d3c65c02bb3783bb.js',
          revision: 'd3c65c02bb3783bb',
        },
        {
          url: '/_next/static/chunks/651.315acd74c359d21f.js',
          revision: '315acd74c359d21f',
        },
        {
          url: '/_next/static/chunks/741.540fab4294b5281b.js',
          revision: '540fab4294b5281b',
        },
        {
          url: '/_next/static/chunks/752-eab8cbac17353535.js',
          revision: 'eab8cbac17353535',
        },
        {
          url: '/_next/static/chunks/90.005f2d3794e846f1.js',
          revision: '005f2d3794e846f1',
        },
        {
          url: '/_next/static/chunks/framework-caa50651a91d07b1.js',
          revision: 'caa50651a91d07b1',
        },
        {
          url: '/_next/static/chunks/main-8d1aa4df406f51bf.js',
          revision: '8d1aa4df406f51bf',
        },
        {
          url: '/_next/static/chunks/pages/_app-e00fd8b40c051425.js',
          revision: 'e00fd8b40c051425',
        },
        {
          url: '/_next/static/chunks/pages/_error-2368f2bbbb3169cf.js',
          revision: '2368f2bbbb3169cf',
        },
        {
          url: '/_next/static/chunks/pages/index-4b5eec585184a4ec.js',
          revision: '4b5eec585184a4ec',
        },
        {
          url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        {
          url: '/_next/static/chunks/webpack-2bc3edf7522281f8.js',
          revision: '2bc3edf7522281f8',
        },
        {
          url: '/assets/img/contributors-1.jpg',
          revision: '07681395f0a066cc37af664d83a3ce76',
        },
        {
          url: '/assets/img/contributors-2.jpg',
          revision: '092d6a2802f4caba070004d5b7559798',
        },
        {
          url: '/assets/img/contributors-3.jpg',
          revision: '5b0af919c354391ce66a334d64af7f33',
        },
        {
          url: '/assets/img/foto_indisponivel.jpg',
          revision: 'a859a8732047769eaaa0c4ae3625ccd8',
        },
        {
          url: '/assets/img/icon-logo.png',
          revision: 'e05dddcd8ad716deda763c0196ce60af',
        },
        {
          url: '/assets/img/image-about.png',
          revision: 'c7b5466e3056219de088d73d2aef30c8',
        },
        {
          url: '/assets/img/logotipo-144-144.png',
          revision: 'b57fa2813806cd3e947c1b3f505240a9',
        },
        {
          url: '/assets/img/logotipo-192-192.png',
          revision: 'f6bee4e44a257837191d39a74b338038',
        },
        {
          url: '/assets/img/logotipo-36-36.png',
          revision: '20a03281390b4ce8fd1c4ac39af4df82',
        },
        {
          url: '/assets/img/logotipo-48-48.png',
          revision: '675c8a925292a07739c404adca390da0',
        },
        {
          url: '/assets/img/logotipo-512-512.png',
          revision: '48cfdf72af21d61c33df00b74828bea4',
        },
        {
          url: '/assets/img/logotipo-72-72.png',
          revision: '19cf0fafd2e0df8494ea8b0a851ee34a',
        },
        {
          url: '/assets/img/logotipo-96-96.png',
          revision: '7668c631cac1bc9cb30d523cc24f9ee3',
        },
        {
          url: '/assets/img/slide-1.jpg',
          revision: '2afc44f29276b65d47618bf69d5a81cc',
        },
        {
          url: '/assets/img/slide-2.jpg',
          revision: 'eb385ca659cda13ed027022094199226',
        },
        {
          url: '/assets/img/slide-3.jpg',
          revision: 'cbf1e177caadd1f25bbc3b8a55f63859',
        },
        {
          url: '/assets/img/slide-4.jpg',
          revision: 'e3cb4e3903592ef883763b78980d3128',
        },
        {
          url: '/assets/img/testUser.png',
          revision: 'ee28e9b8fe6d2c908fc15a744c30422d',
        },
        {
          url: '/assets/svg/icon-about.svg',
          revision: '69cf62b49ebf024a4916093b13d1c9d2',
        },
        {
          url: '/assets/svg/icon-error.svg',
          revision: '476cc55624fe1650560d3a3a2b4e7db6',
        },
        {
          url: '/assets/svg/icon-success.svg',
          revision: '7504fe93d35286fc13bbe1df2fa7dd9e',
        },
        {
          url: '/assets/svg/instagram-icon.svg',
          revision: '7be99f606132f8b22e3b572bbadfb80e',
        },
        {
          url: '/assets/svg/logo-readme.svg',
          revision: '3a0f8fc6b4dc67ebcb1a76b282dcca5d',
        },
        {
          url: '/assets/svg/whatsapp-icon.svg',
          revision: '7b4fb150e586c273dd3f40e2dcc2ed55',
        },
        {
          url: '/fonts/abril-fatface-v12-latin-regular.woff2',
          revision: '5a0942575703a294a74a6341bdcdde2a',
        },
        {
          url: '/fonts/dancing-script-v16-latin-500.woff2',
          revision: '884eeb85840393bda9e5feb3d1becfd0',
        },
        {
          url: '/fonts/dancing-script-v16-latin-700.woff2',
          revision: '2935249ce032925b09daf9056b3ff49b',
        },
        {
          url: '/fonts/dancing-script-v16-latin-regular.woff2',
          revision: '5c1198f377ebf0fe64dd1a42476f0309',
        },
        {
          url: '/fonts/kaushan-script-v9-latin-regular.woff2',
          revision: 'e2ea67e80b95334da4768bffdf3d4f9d',
        },
        {
          url: '/fonts/poppins-v15-latin-300.woff2',
          revision: '9ddc04912d6e8f88d9de4045b8b89c59',
        },
        {
          url: '/fonts/poppins-v15-latin-500.woff2',
          revision: '84780596e268aa0cb2be48af2ed5c375',
        },
        {
          url: '/fonts/poppins-v15-latin-600.woff2',
          revision: '087457026965f98466618a478c4b1b07',
        },
        {
          url: '/fonts/poppins-v15-latin-700.woff2',
          revision: 'f4f17fd53c7d040e56f91a3ecb692b22',
        },
        {
          url: '/fonts/poppins-v15-latin-regular.woff2',
          revision: '9ed361bba8488aeb2797b82befda20f1',
        },
        { url: '/manifest.json', revision: '33df8b45d858fb2e7d053970b6cb39d9' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: i,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    ));
});
