import { TabList, TabPanel, TabPanels, Tabs, TabsOrientation } from '@reach/tabs'
import { type LoaderFunction } from '@remix-run/node'
import { Link, Outlet, useLoaderData, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import React from 'react'
import { getUserRole, requireUserSession } from '~/utils/session.server'

type LoaderData = {
  device: {
    isDesktop: boolean
    isMobile: boolean
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const userAgent = await request.headers.get('user-agent')
  const isAndroid = () => Boolean(userAgent?.match(/Android/i))
  const isIos = () => Boolean(userAgent?.match(/iPhone|iPad|iPod/i))
  const isOpera = () => Boolean(userAgent?.match(/Opera Mini/i))
  const isWindows = () => Boolean(userAgent?.match(/IEMobile/i))
  const isSSR = () => Boolean(userAgent?.match(/SSR/i))
  const isMobile = () =>
    Boolean(isAndroid() || isIos() || isOpera() || isWindows())
  const isDesktop = () => Boolean(!isMobile() && !isSSR())

  const user = await requireUserSession(request)
  const role = await getUserRole(request)
  if (!user) {
    throw new Response('Unauthorized', { status: 401 })
  }
  if (role === 'USER') {
    throw new Response('Unauthorized', { status: 401 })
  }
  const data: LoaderData = {
    device: {
      isDesktop: isDesktop(),
      isMobile: isMobile(),
    },
  }
  return data
}

enum Screen {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
}

const LINKS = [
  { name: 'General', to: '/admin' },
  {
    name: 'Manage Project',
    to: '/admin/manage-project',
    child: ['/admin/manage-project/form'],
  },
]

const mq = 'screen and (min-width: 1066px)'
const getScreen = () =>
  window.matchMedia(mq).matches ? Screen.DESKTOP : Screen.MOBILE

export default function Index() {
  const shouldReduceMotion = useReducedMotion()
  const data = useLoaderData<LoaderData>()

  const { isMobile, isDesktop } = data.device
  const [screen, setScreen] = React.useState(() => {
    if (isDesktop) return Screen.DESKTOP
    if (isMobile || typeof window !== 'object') return Screen.MOBILE
    return getScreen()
  })

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(mq)
    const handleChange = () => {
      setScreen(mediaQuery.matches ? Screen.DESKTOP : Screen.MOBILE)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const isDesktopScreen = screen === Screen.DESKTOP
  const isMobileScreen = screen === Screen.MOBILE

  const location = useLocation()
  const isRouteSelected = (to: string, child?: Array<string>) =>
    to === location.pathname || child?.includes(location.pathname)

  return (
    <main className="flex flex-col gap-5 pb-44 lg:gap-9">
      <LayoutTitle />
      <div className="pb-9 lg:px-10vw lg:pb-12">
        <div className="relative mx-auto grid lg:max-w-7xl">
          <Tabs
            style={{ display: isDesktopScreen ? 'grid' : '' }}
            orientation={
              isMobileScreen
                ? TabsOrientation.Horizontal
                : TabsOrientation.Vertical
            }
            className="w-full grid-cols-9 gap-x-8 overflow-visible"
          >
            <TabList
              className={clsx(
                'z-0 flex gap-1 overflow-x-scroll bg-transparent px-5vw lg:col-span-2 lg:overflow-x-hidden lg:px-0',
                {
                  'flex-col': isDesktopScreen,
                  'flex-row lg:pb-3': isMobileScreen,
                },
              )}
            >
              {LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  prefetch="intent"
                  className={clsx(
                    'z-10 rounded-md px-4 pt-2 pb-2.5 text-left text-sm font-medium text-gray-300 lg:text-md',
                    {
                      active: isRouteSelected(link.to, link.child),
                      'bg-gray-800 text-white': isRouteSelected(
                        link.to,
                        link.child,
                      ),
                      'w-full hover:bg-gray-800': isDesktopScreen,
                      'inline w-fit': isMobileScreen,
                    },
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </TabList>
            <TabPanels className="mt-4 lg:col-span-7 lg:mt-0">
              <TabPanel key={location.pathname} className="block">
                <AnimatePresence>
                  <motion.div
                    initial={{ y: 220, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }}
                    exit={{ y: 220, opacity: 0 }}
                    transition={{
                      opacity: { duration: shouldReduceMotion ? 0 : 0.1 },
                      ease: 'linear',
                    }}
                  >
                    <div className="relative h-full w-full min-h-[50vh]">
                      <div className="w-full shadow-[1px_10px_47px_0px_#19191987] border-b border-t border-gray-700 bg-black lg:-mt-24 lg:rounded-lg lg:border xl:-mt-36">
                        <Outlet />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

function LayoutTitle() {
  const location = useLocation()
  const routeName = location.pathname
    .replace('/admin', '')
    .replace(/-/g, ' ')
    .replace(/[/]/g, ' / ')

  return (
    <div className="w-full bg-gradient-to-b from-black to-gray-900 px-5vw lg:px-10vw">
      <div className="relative mx-auto py-9 lg:pb-9 lg:pt-24 border-b border-gray-700 flex max-w-7xl items-center justify-between">
        <div className="text-left">
          <h1 className="leading-tigh px-0 text-xl font-medium capitalize lg:text-3xl">
            Admin Panel Settings
          </h1>
          <p className="text-secondary mt-1 text-sm font-medium">
            2 years of proven experience in helping.
          </p>
        </div>
        <div className="hidden lg:block -mt-36">
          <h1 className="leading-tigh text-secondary px-0 text-base font-medium capitalize">
            {routeName.trim() || '/ General'}
          </h1>
        </div>
      </div>
    </div>
  )
}
