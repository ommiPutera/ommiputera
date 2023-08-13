const path = require('path')
const defaultTheme = require('tailwindcss/defaultTheme')
const fromRoot = (p: string) => path.join(__dirname, p)

/** @type {import('tailwindcss').Config} */
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
    borderRadius: {
      none: '0',
      sm: '0.225rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
      large: '12px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'var(--color-white)',
      black: 'var(--color-black)',
      blue: {
        100: 'var(--color-blue-100)',
        500: 'var(--color-blue-500)',
      },
      gray: {
        100: 'rgb(var(--color-gray-100) / <alpha-value>)',
        200: 'rgb(var(--color-gray-200) / <alpha-value>)',
        300: 'rgb(var(--color-gray-300) / <alpha-value>)',
        400: 'rgb(var(--color-gray-400) / <alpha-value>)',
        500: 'rgb(var(--color-gray-500) / <alpha-value>)',
        600: 'rgb(var(--color-gray-600) / <alpha-value>)',
        700: 'rgb(var(--color-gray-700) / <alpha-value>)',
        800: 'rgb(var(--color-gray-800) / <alpha-value>)',
        900: 'rgb(var(--color-gray-900) / <alpha-value>)',
      },
      red: {
        100: 'rgb(var(--color-red-100) / <alpha-value>)',
        200: 'rgb(var(--color-red-200) / <alpha-value>)',
        300: 'rgb(var(--color-red-300) / <alpha-value>)',
        400: 'rgb(var(--color-red-400) / <alpha-value>)',
        500: 'rgb(var(--color-red-500) / <alpha-value>)',
        600: 'rgb(var(--color-red-600) / <alpha-value>)',
        700: 'rgb(var(--color-red-700) / <alpha-value>)',
        800: 'rgb(var(--color-red-800) / <alpha-value>)',
        900: 'rgb(var(--color-red-900) / <alpha-value>)',
      },
      green: {
        100: 'rgb(var(--color-green-100) / <alpha-value>)',
        200: 'rgb(var(--color-green-200) / <alpha-value>)',
        300: 'rgb(var(--color-green-300) / <alpha-value>)',
        400: 'rgb(var(--color-green-400) / <alpha-value>)',
        500: 'rgb(var(--color-green-500) / <alpha-value>)',
        600: 'rgb(var(--color-green-600) / <alpha-value>)',
        700: 'rgb(var(--color-green-700) / <alpha-value>)',
        800: 'rgb(var(--color-green-800) / <alpha-value>)',
        900: 'rgb(var(--color-green-900) / <alpha-value>)',
      },
      orange: {
        100: 'rgb(var(--color-orange-100) / <alpha-value>)',
        200: 'rgb(var(--color-orange-200) / <alpha-value>)',
        300: 'rgb(var(--color-orange-300) / <alpha-value>)',
        400: 'rgb(var(--color-orange-400) / <alpha-value>)',
        500: 'rgb(var(--color-orange-500) / <alpha-value>)',
        600: 'rgb(var(--color-orange-600) / <alpha-value>)',
        700: 'rgb(var(--color-orange-700) / <alpha-value>)',
        800: 'rgb(var(--color-orange-800) / <alpha-value>)',
        900: 'rgb(var(--color-orange-900) / <alpha-value>)',
      },
      violet: {
        100: 'rgb(var(--color-violet-100) / <alpha-value>)',
        200: 'rgb(var(--color-violet-200) / <alpha-value>)',
        300: 'rgb(var(--color-violet-300) / <alpha-value>)',
        400: 'rgb(var(--color-violet-400) / <alpha-value>)',
        500: 'rgb(var(--color-violet-500) / <alpha-value>)',
        600: 'rgb(var(--color-violet-600) / <alpha-value>)',
        700: 'rgb(var(--color-violet-700) / <alpha-value>)',
        800: 'rgb(var(--color-violet-800) / <alpha-value>)',
        900: 'rgb(var(--color-violet-900) / <alpha-value>)',
      },
    },
    extend: {
      opacity: {
        '5': '.5',
      },
      maxWidth: {
        '8xl': '96rem',
      },
      fontFamily: {
        sans: ['Matter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        sm: '0.85rem', // 12px
        md: '0.925rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.625rem', // 26px
        '4xl': '2.125rem', // 34px
        '5xl': '2.475rem', // 46px
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
      typography: (theme: any) => {
        const fontSize = (size: string) => {
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
