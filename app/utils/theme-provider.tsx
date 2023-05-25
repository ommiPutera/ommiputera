import {useFetcher} from '@remix-run/react'
import * as React from 'react'

enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

type ThemeContextType = [
  Theme | null,
  React.Dispatch<React.SetStateAction<Theme | null>>,
]

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined,
)

function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

const prefersLightMQ = '(prefers-color-scheme: light)'
const getPreferredTheme = () =>
  window.matchMedia(prefersLightMQ).matches ? Theme.LIGHT : Theme.DARK

function ThemeProvider({children}: {children: React.ReactNode}) {
  const [theme, setThemeState] = React.useState<Theme | null>(() => {
    if (typeof window !== 'object') return 'dark'
    return getPreferredTheme()
  })
  const persistTheme = useFetcher()
  const persistThemeRef = React.useRef(persistTheme)
  React.useEffect(() => {
    persistThemeRef.current = persistTheme
  }, [persistTheme])

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(prefersLightMQ)
    const handleChange = () => {
      setThemeState(mediaQuery.matches ? Theme.LIGHT : Theme.DARK)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const setTheme = React.useCallback(
    (cb: Parameters<typeof setThemeState>[0]) => {
      const newTheme = typeof cb === 'function' ? cb(theme) : cb
      if (newTheme) {
        persistThemeRef.current.submit(
          {theme: newTheme},
          {action: 'action/set-theme', method: 'POST'},
        )
      }
      setThemeState(newTheme)
    },
    [theme],
  )

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}

export {useTheme, ThemeProvider}
