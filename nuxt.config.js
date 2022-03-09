/* eslint-disable nuxt/no-cjs-in-config */
const routes = require('./routes.config')
const head = require('./head.config')
const modules = require('./modules.config')
const build = require('./build.config')

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  modules,

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    ...build,
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
  },

  'google-gtag': {
    id: process.env.APP_GOOGLE_ANALYTICS_KEY,
  },

  sitemap: {
    hostname: process.env.APP_BASE_URL || 'https://guilds.injective.app',
    gzip: true,
  },

  loading: { color: '#00f2ff' },

  env: {
    APP_TITLE: process.env.APP_TITLE || 'Injective Guilds',
    APP_BASE_URL: process.env.APP_BASE_URL || 'https://guilds.injective.app',
    APP_GOOGLE_ANALYTICS_KEY: process.env.APP_GOOGLE_ANALYTICS_KEY,
    APP_GOOGLE_SITE_VERIFICATION_KEY:
      process.env.APP_GOOGLE_SITE_VERIFICATION_KEY,
    NODE_ENV: process.env.NODE_ENV,
    APP_ENV: process.env.APP_ENV || 'production',
    APP_VER: process.env.npm_package_version,
  },

  router: {
    linkActiveClass: 'is-active',
  },

  toast: {
    position: 'bottom-right',
    duration: 20000,
  },

  generate: {
    routes,
  },

  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}',
      },
    },
  },

  tailwindcss: {
    config: './tailwind.config.js',
    cssPath: './assets/css/tailwind.scss',
  },
}
