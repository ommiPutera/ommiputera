import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  TabsOrientation,
} from '@reach/tabs'
import { type LoaderFunction } from '@remix-run/node'
import { Link, Outlet, useLoaderData, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import React from 'react'
import { requireUserSession } from '~/utils/session.server'

type LoaderData = {
  device: {
    isDesktop: boolean,
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
  if (!user) {
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
  { name: 'Manage Project', to: '/admin/manage-project' },
]

const mq = 'screen and (min-width: 1066px)'
const getScreen = () =>
  window.matchMedia(mq).matches ? Screen.DESKTOP : Screen.MOBILE

function Index() {
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
  const isRouteSelected = (to: string) => to === location.pathname

  return (
    <main className="flex flex-col gap-5 pb-44 lg:gap-9">
      <div className="px-5vw py-9 lg:px-15vw lg:py-12 border-b bg-black border-gray-600">
        <div className="relative mx-auto text-left grid max-w-8xl">
          <h1 className="px-0 text-xl font-medium leading-tigh lg:text-3xl">
            Admin Panel Settings
          </h1>
          <p className="text-sm mt-1 text-secondary font-medium">2 years of proven experience in helping.</p>
        </div>
      </div>
      <div className="px-5vw pb-9 lg:px-15vw lg:pb-12">
        <div className="relative mx-auto grid lg:max-w-8xl">
          <Tabs
            style={{ display: isDesktopScreen ? 'grid' : '', overflow: 'visible' }}
            orientation={
              isMobileScreen
                ? TabsOrientation.Horizontal
                : TabsOrientation.Vertical
            }
            className="grid-cols-12 gap-x-14 w-full overflow-x-auto"
          >
            <TabList
              className={clsx(
                'lg:col-span-3 flex gap-1 overflow-x-scroll bg-transparent',
                {
                  'flex-col': isDesktopScreen,
                  'flex-row pb-3': isMobileScreen,
                },
              )}
            >
              {LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  prefetch="intent"
                  className={clsx(
                    'rounded-md px-2 pb-2 pt-1 text-left font-medium text-gray-300',
                    {
                      active: isRouteSelected(link.to),
                      'bg-gray-800 text-white': isRouteSelected(link.to),
                      'w-full hover:bg-gray-800': isDesktopScreen,
                      'w-fit inline': isMobileScreen,
                    },
                  )}
                >
                  <Tab className="text-md w-max border-none bg-transparent">
                    {link.name}
                  </Tab>
                </Link>
              ))}
            </TabList>
            <TabPanels className="lg:col-span-9 mt-4 lg:mt-0">
              <TabPanel key={location.pathname} style={{ display: 'block' }}>
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
                    <div className="relative h-full min-h-screen w-full">
                      <div className="border bg-black border-gray-600 w-full xl:-top-20 rounded-md absolute">
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

export default Index
