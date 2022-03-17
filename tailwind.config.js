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

    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      '2md': '800px',
      '3md': '840px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1366px',
      '3xl': '1440px',
      '4xl': '1681px',
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

      skew: {
        45: '45deg',
        '-45': '-45deg',
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
