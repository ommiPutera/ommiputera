const path = require('path');
const fromRoot = p => path.join(__dirname, p);
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [fromRoot('./app/**/*.+(js|jsx|ts|tsx|mdx|md)')],
  darkMode: 'class',
  theme: {
    screens: {
      md: '640px',
      lg: '1024px',
      xl: '1500px', // this is the "design resolution"
    },
    colors: {
      gray: {
        100: 'var(--color-gray-100)',
        200: 'var(--color-gray-200)',
        300: 'var(--color-gray-300)',
        400: 'var(--color-gray-400)',
        500: 'var(--color-gray-500)',
        600: 'var(--color-gray-600)',
        700: 'var(--color-gray-700)',
        800: 'var(--color-gray-800)',
        900: 'var(--color-gray-900)',
      },
      red: {
        500: 'var(--color-red-500)',
      },
    },
    extend: {
      maxWidth: {
        '8xl': '96rem',
      },
      fontFamily: {
        sans: ['Matter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xl: '1.375rem', // 22px
        '2xl': '1.5625rem', // 25px
        '3xl': '1.875rem', // 30px
        '4xl': '2.5rem', // 40px
        '5xl': '3.125rem', // 50px
        '6xl': '3.75rem', // 60px
        '7xl': '4.375rem', // 70px
      },
    },
  },
  plugins: [],
}

