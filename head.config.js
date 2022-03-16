const { nuxtMetaTags } = require('./meta.config')

const meta = [
  { charset: 'utf-8' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ...nuxtMetaTags,
]

if (process.env.APP_GOOGLE_SITE_VERIFICATION_KEY) {
  meta.push({
    name: 'google-site-verification',
    content: process.env.APP_GOOGLE_SITE_VERIFICATION_KEY,
  })
}

module.exports = {
  titleTemplate: process.env.APP_NAME || 'Injective Guilds',
  meta,
  htmlAttrs: {
    class: 'font-sans',
  },
  bodyAttrs: {
    class: '',
  },
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    { rel: 'shortcut-icon', type: 'image/png', href: '/favicon.png' },
    { rel: 'apple-touch-icon', type: 'image/png', href: '/favicon.png' },
  ],
}
