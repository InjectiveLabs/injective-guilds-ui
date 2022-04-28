const routes = require('./routes.config')
const head = require('./head.config')
const modules = require('./modules.config')
const build = require('./build.config')

export default {
  // Target: https://go.nuxtjs.dev/config-target
  ssr: false,
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/icons',
    '~/plugins/elements',
    '~/plugins/i18n',
    '~/plugins/utils',
    '~/plugins/store',

    { src: '~/plugins/clipboard', ssr: false },
    { src: '~/plugins/tooltip', ssr: false },
    { src: '~/plugins/veevalidate', ssr: false },
    { src: './plugins/touch-events.ts', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/vendor',
    'nuxt-typed-vuex'
  ],

  modules,

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    ...build,
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]]
    }
  },

  'google-gtag': {
    id: process.env.APP_GOOGLE_ANALYTICS_KEY
  },

  sitemap: {
    hostname: process.env.APP_BASE_URL || 'https://guilds.ai',
    gzip: true
  },

  loading: { color: '#00f2ff' },

  env: {
    APP_TITLE: process.env.APP_TITLE || 'Trading Guilds',
    APP_BASE_URL: process.env.APP_BASE_URL || 'https://guilds.ai',
    APP_NETWORK: process.env.APP_NETWORK,
    APP_CHAIN_ID: process.env.APP_CHAIN_ID,
    APP_ALCHEMY_KEY: process.env.APP_ALCHEMY_KEY,
    APP_ALCHEMY_KOVAN_KEY: process.env.APP_ALCHEMY_KOVAN_KEY,
    APP_GOOGLE_ANALYTICS_KEY: process.env.APP_GOOGLE_ANALYTICS_KEY,
    APP_GOOGLE_SITE_VERIFICATION_KEY:
      process.env.APP_GOOGLE_SITE_VERIFICATION_KEY,
    NODE_ENV: process.env.NODE_ENV,
    APP_ENV: process.env.APP_ENV || 'production',
    APP_VER: process.env.npm_package_version,
    APP_GUILDS_API_ENDPOINT: process.env.APP_GUILDS_API_ENDPOINT,
    APP_EXCHANGE_API_ENDPOINT: process.env.APP_EXCHANGE_API_ENDPOINT,
    APP_SENTRY_GRPC_ENDPOINT: process.env.APP_SENTRY_GRPC_ENDPOINT,
    GEO_IP_RESTRICTIONS_ENABLED: process.env.GEO_IP_RESTRICTIONS_ENABLED
  },

  router: {
    linkActiveClass: 'is-active',
    scrollBehavior(to) {
      if (to.hash) {
        const el = document.getElementById(to.hash.replace('#', ''))?.offsetTop

        return window.scrollTo({
          top: el ? el - 12 : 0,
          behavior: 'smooth'
        })
      }

      return window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },

  toast: {
    position: 'bottom-right',
    duration: 6000,
    theme: 'bubble'
  },

  generate: {
    routes
  },

  vendor: [
    {
      src: '@injectivelabs/token-metadata/dist/images',
      dst: './static/vendor/@injectivelabs/token-metadata'
    }
  ],

  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  },

  tailwindcss: {
    config: './tailwind.config.js',
    cssPath: './assets/css/tailwind.scss'
  }
}
