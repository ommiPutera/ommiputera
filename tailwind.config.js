const path = require('path')
const defaultTheme = require('tailwindcss/defaultTheme')
const fromRoot = p => path.join(__dirname, p)

module.exports = {
  mode: 'jit',
  content: [fromRoot('./app/**/*.+(js|jsx|ts|tsx|mdx|md)')],
  darkMode: 'class',
  theme: {
    screens: {
      md: '640px',
      lg: '1024px',
      xl: '1500px', // this is the "design resolution"
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'var(--color-white)',
      black: 'var(--color-black)',

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
        100: 'var(--color-red-100)',
        200: 'var(--color-red-200)',
        300: 'var(--color-red-300)',
        400: 'var(--color-red-400)',
        500: 'var(--color-red-500)',
        600: 'var(--color-red-600)',
        700: 'var(--color-red-700)',
        800: 'var(--color-red-800)',
        900: 'var(--color-red-900)',
      },
      slate: {
        500: 'var(--color-slate-500)',
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
        md: '0.969rem', // 22px
        xl: '1.375rem', // 22px
        '2xl': '1.5625rem', // 25px
        '3xl': '1.875rem', // 30px
        '4xl': '2.5rem', // 40px
        '5xl': '3.125rem', // 50px
        '6xl': '3.75rem', // 60px
        '7xl': '4.375rem', // 70px
      },
      spacing: {
        '5vw': '5vw', // pull featured sections and navbar in the margin
        '8vw': '8vw', // positions hero img inside the margin
        '10vw': '10vw',
        '15vw': '15vw', // page margin
      },
      typography: theme => {
        const fontSize = size => {
          const result = theme(`fontSize.${size}`)
          return Array.isArray(result) ? result[0] : result
        }

        return {
          DEFAULT: {
            css: {
              'h1, h2, h3, h4, h5, h6': {
                marginTop: 0,
                marginBottom: 0,
                fontWeight: theme('fontWeight.normal'),

                [`@media (min-width: ${theme('screens.lg')})`]: {
                  fontWeight: theme('fontWeight.medium'),
                },
              },
              'h1, h2': {
                fontSize: fontSize('2xl'),
                marginTop: theme('spacing.20'),
                marginBottom: theme('spacing.10'),
                [`@media (min-width: ${theme('screens.lg')})`]: {
                  fontSize: fontSize('3xl'),
                },
              },
              h3: {
                fontSize: fontSize('xl'),
                marginTop: theme('spacing.16'),
                marginBottom: theme('spacing.10'),
                [`@media (min-width: ${theme('screens.lg')})`]: {
                  fontSize: fontSize('2xl'),
                },
              },
              'h4, h5, h6': {
                fontSize: fontSize('lg'),
                [`@media (min-width: ${theme('screens.lg')})`]: {
                  fontSize: fontSize('xl'),
                },
              },
            },
          },
        }
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
