const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '4rem',
        '3xl': '10rem'
      }
    },

    fontFamily: {
      sans: ['Space Grotesk', ...defaultTheme.fontFamily.sans],
      mono: ['Helvetica Neue', ...defaultTheme.fontFamily.mono],
      logo: ['Cyberway Riders']
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
      '4xl': '1681px'
    },

    extend: {
      colors: {
        current: 'currentColor',
        white: '#fff',
        black: '#000',
        transparent: 'transparent',

        primary: {
          400: '#22D3EE',
          500: '#0FF4E7',
          600: '#09c6bb'
        },

        accent: {
          500: '#E03B18',
          600: '#D73513'
        },

        gray: {
          100: '#F8F8F8',
          200: '#F2F2F2',
          400: '#727376',
          500: '#EAE8E8'
        }
      },

      fontSize: {
        sm: [
          '14px',
          {
            lineHeight: '18px'
          }
        ],

        '2.5xl': [
          '28px',
          {
            lineHeight: '104%'
          }
        ],

        '3.5xl': [
          '32px',
          {
            lineHeight: '40px'
          }
        ]
      },

      height: {
        banner: '537px'
      },

      minHeight: {
        6: '1.5rem',
        8: '2rem'
      },

      maxHeight: {
        guildTable: '380px'
      },

      minWidth: {
        3: '0.75rem',
        6: '1.5rem',
        12: '3rem'
      },

      maxWidth: {
        '3/4': '75%',
        card: '414px'
      },

      rotate: {
        135: '135deg'
      },

      skew: {
        45: '45deg',
        '-45': '-45deg'
      },

      zIndex: {
        60: '60'
      }
    }
  },

  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./**/*.vue'],
    whitelist: [
      //
    ],
    whitelistPatterns: []
  }
}
