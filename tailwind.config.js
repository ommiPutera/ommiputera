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
      green: {
        100: 'var(--color-green-100)',
        200: 'var(--color-green-200)',
        300: 'var(--color-green-300)',
        400: 'var(--color-green-400)',
        500: 'var(--color-green-500)',
        600: 'var(--color-green-600)',
        700: 'var(--color-green-700)',
        800: 'var(--color-green-800)',
        900: 'var(--color-green-900)',
      },
      orange: {
        100: 'var(--color-orange-100)',
        200: 'var(--color-orange-200)',
        300: 'var(--color-orange-300)',
        400: 'var(--color-orange-400)',
        500: 'var(--color-orange-500)',
        600: 'var(--color-orange-600)',
        700: 'var(--color-orange-700)',
        800: 'var(--color-orange-800)',
        900: 'var(--color-orange-900)',
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
        sm: '0.75rem', // 12px
        md: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.625rem', // 26px
        '4xl': '2.125rem', // 34px
        '5xl': '2.875rem', // 46px
        '6xl': '3.375rem', // 54px
        '7xl': '4.125rem', // 66px
      },
      spacing: {
        '5vw': '5vw', // pull featured sections and navbar in the margin
        '8vw': '8vw', // positions hero img inside the margin
        '10vw': '10vw',
        '15vw': '15vw', // page margin
      },
      keyframes: {
        'accordion-down': {
          from: {height: 0},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: 0},
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
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
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
}
