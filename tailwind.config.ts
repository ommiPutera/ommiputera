import typography from '@tailwindcss/typography'

import path from 'path'
import type { Config } from "tailwindcss"

const fromRoot = (p: string) => path.join(__dirname, p)

const config = {
  mode: 'jit',
  darkMode: ["class"],
  content: [fromRoot('./app/**/*.+(js|jsx|ts|tsx|mdx|md)')],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: (theme: any) => { 
        const fontSize = (size: string) => {
					const result = theme(`fontSize.${size}`)
					return Array.isArray(result) ? result[0] : result
        }
        return {
          DEFAULT: {
            css: [
              {
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
              }
            ]
          }
        }
      }
    },
  },
  plugins: [
    typography,
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
  ],
} satisfies Config

export default config