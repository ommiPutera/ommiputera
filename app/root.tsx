import {
  json,
  type DataFunctionArgs,
  type LinksFunction,
  type SerializeFrom,
  type V2_MetaFunction,
} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from '@remix-run/react'
import { Analytics } from '@vercel/analytics/react'
import * as React from 'react'
import { useSpinDelay } from 'spin-delay'
import { Navbar } from '~/components/navbar'
import appStyles from '~/styles/app.css'
import tailwindStyles from '~/styles/tailwind.css'
import vendorsStyles from '~/styles/vendors.css'
import prosemirrorStyles from '~/styles/prosemirror.css'
import { ThemeProvider, useTheme } from '~/utils/theme-provider'
import Footer from './components/footer'
import { getDomainUrl, getUrl } from './utils/misc'
import { getSocialMetas } from './utils/seo'
import { getUser } from './utils/session.server'
import { Toaster } from './components/shadcn/toaster'

export type LoaderData = SerializeFrom<typeof loader>

export const handle: { id: string } = {
  id: 'root',
}

export async function loader({ request }: DataFunctionArgs) {
  const user = await getUser(request)
  const data = {
    user,
    requestInfo: {
      origin: getDomainUrl(request),
    },
  }
  const headers: HeadersInit = new Headers()
  return json(data, { headers })
}

export const meta: V2_MetaFunction = ({ data }) => {
  const requestInfo = data?.requestInfo
  const socials = getSocialMetas({
    keywords: 'Personal Website',
    url: getUrl(requestInfo),
  })

  return [{ title: 'ommiputera.com | A Personal Website' }, ...socials]
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
    { rel: 'stylesheet', href: prosemirrorStyles },
    { rel: 'stylesheet', href: vendorsStyles },
    { rel: 'stylesheet', href: tailwindStyles },
    { rel: 'stylesheet', href: appStyles },
  ]
}

export default function AppWithProviders() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}

const LOADER_WORDS = [
  'Loading page..',
  'checking cdn',
  'checking cache',
  'fetching from db',
  'compiling mdx',
  'updating cache',
  'transfer',
]

const ACTION_WORDS = [
  'packaging',
  'zapping',
  'validating',
  'processing',
  'calculating',
  'computing',
  'computering',
]

let firstRender = true
function PageLoadingMessage() {
  const navigation = useNavigation()
  const [words, setWords] = React.useState<Array<string>>([])
  const [pendingPath, setPendingPath] = React.useState('')
  const showLoader = useSpinDelay(Boolean(navigation.state !== 'idle'), {
    delay: 1000,
    minDuration: 2500,
  })

  React.useEffect(() => {
    if (firstRender) return
    if (navigation.state === 'idle') return
    if (navigation.state === 'loading') setWords(LOADER_WORDS)
    if (navigation.state === 'submitting') setWords(ACTION_WORDS)

    const interval = setInterval(() => {
      setWords(([first, ...rest]) => [...rest, first] as Array<string>)
    }, 2000)

    return () => clearInterval(interval)
  }, [navigation.state])

  React.useEffect(() => {
    if (firstRender) return
    if (navigation.state === 'idle') return
    setPendingPath(navigation.location.pathname)
  }, [navigation])

  React.useEffect(() => {
    firstRender = false
  }, [])

  const action = words[0]

  if (!showLoader) return <></>
  return (
    <div className="fixed bottom-4 z-50 mx-4 flex w-11/12 flex-col justify-center rounded-lg border border-gray-800 bg-gray-800 px-8 py-4 md:w-4/5 lg:bottom-14 lg:right-14 lg:mx-0 lg:w-72">
      <p className="text-md font-medium lg:text-lg">{action}</p>
      <p className="text-sm font-medium text-gray-400 lg:text-md">
        Path: {pendingPath}
      </p>
    </div>
  )
}

function App() {
  const [theme] = useTheme()
  return (
    <html lang="en" className={`${theme}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="theme-color"
          content={theme === 'dark' ? '#161513' : '#FFF'}
        />
        <Meta />
        <Links />
      </head>
      <body className="bg-white transition duration-500 dark:bg-gray-900">
        <PageLoadingMessage />
        <Navbar />
        <Outlet />
        <Footer />
        <Analytics />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Toaster />
      </body>
    </html>
  )
}
