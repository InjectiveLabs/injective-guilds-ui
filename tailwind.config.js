// const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },

    //
  },

  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./**/*.vue'],
    whitelist: [
      //
    ],
    whitelistPatterns: [],
  },
}
