import {type LinksFunction, type V2_MetaFunction} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import {Navbar} from '~/components/navbar'
import appStyles from '~/styles/app.css'
import tailwindStyles from '~/styles/tailwind.css'
import vendorsStyles from '~/styles/vendors.css'
import {ThemeProvider, useTheme} from '~/utils/theme-provider'

export default function AppWithProviders() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}

function App() {
  const [theme] = useTheme()
  return (
    <html lang="en" className={`${theme}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          name="theme-color"
          content={theme === 'dark' ? '#1F2028' : '#FFF'}
        />
        <Meta />
        <Links />
      </head>
      <body className="bg-white transition duration-500 dark:bg-gray-900">
        <Navbar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export const meta: V2_MetaFunction = () => {
  return [{title: 'Ommi Putera - Personal Website'}]
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/Matter-Medium.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/Matter-Regular.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/Matter-SemiBold.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {rel: 'stylesheet', href: vendorsStyles},
    {rel: 'stylesheet', href: appStyles},
    {rel: 'stylesheet', href: tailwindStyles},
  ]
}
