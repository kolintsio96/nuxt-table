export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'transoftgroup',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // PWA Configuration
  pwa: {
    manifest: {
      theme_color: "#000000",
      background_color: "#000000",
      display: "browser",
      scope: "/",
      start_url: "/",
      name: "TransoftGroup",
      short_name: "TG",
      icons: [
          {
              src: "/icon-192x192.png",
              sizes: "192x192",
              type: "image/png"
          },
          {
              src: "/icon-256x256.png",
              sizes: "256x256",
              type: "image/png"
          },
          {
              src: "/icon-384x384.png",
              sizes: "384x384",
              type: "image/png"
          },
          {
              src: "/icon-512x512.png",
              sizes: "512x512",
              type: "image/png"
          }
      ]
    }
  },

  // Workbox Configuration
  workbox: {
    runtimeCaching: [
      {
        urlPattern: 'https://jsonplaceholder.typicode.com/todos/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      }
    ]
  },

  target: 'static',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/pwa'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {
        implementation: require('sass'),
      },
    },
  }
}
