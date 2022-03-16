const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },

    fontFamily: {
      sans: ['Space Grotesk', ...defaultTheme.fontFamily.sans],
      mono: ['Helvetica Neue', ...defaultTheme.fontFamily.mono],
      logo: ['Cyberway Riders'],
    },

    extend: {
      colors: {
        current: 'currentColor',
        white: '#fff',
        black: '#000',
        transparent: 'transparent',

        primary: {
          500: '#0FF4E7',
        },

        accent: {
          500: '#E03B18',
          600: '#D73513',
        },

        gray: {
          100: '#F8F8F8',
          200: '#F2F2F2',
          400: '#727376',
          500: '#EAE8E8',
        },
      },
    },
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
