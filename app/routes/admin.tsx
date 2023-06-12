import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  TabsOrientation,
} from '@reach/tabs'
import {type LoaderFunction} from '@remix-run/node'
import {Link, Outlet, useLoaderData, useLocation} from '@remix-run/react'
import clsx from 'clsx'
import {AnimatePresence, motion, useReducedMotion} from 'framer-motion'
import React from 'react'
import {requireUserSession} from '~/utils/session.server'

type LoaderData = {
  device: {
    isDesktop: boolean
    isMobile: boolean
  }
}

export const loader: LoaderFunction = async ({request}) => {
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
    throw new Response('Unauthorized', {status: 401})
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
  {name: 'General', to: '/admin'},
  {name: 'Manage Project', to: '/admin/manage-project'},
]

const mq = 'screen and (min-width: 1066px)'
const getScreen = () =>
  window.matchMedia(mq).matches ? Screen.DESKTOP : Screen.MOBILE

export default function Index() {
  const shouldReduceMotion = useReducedMotion()
  const data = useLoaderData<LoaderData>()

  const {isMobile, isDesktop} = data.device
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
      <LayoutTitle />
      <div className="pb-9 lg:px-15vw lg:pb-12">
        <div className="relative mx-auto grid lg:max-w-8xl">
          <Tabs
            style={{
              display: isDesktopScreen ? 'grid' : '',
              overflow: 'visible',
            }}
            orientation={
              isMobileScreen
                ? TabsOrientation.Horizontal
                : TabsOrientation.Vertical
            }
            className="w-full grid-cols-12 gap-x-14 overflow-x-auto"
          >
            <TabList
              className={clsx(
                'flex gap-1 overflow-x-scroll lg:overflow-x-hidden bg-transparent px-5vw lg:col-span-3 lg:px-0',
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
                    'rounded-md px-2 pb-2 pt-1 text-left font-medium text-gray-300',
                    {
                      active: isRouteSelected(link.to),
                      'bg-gray-800 text-white': isRouteSelected(link.to),
                      'w-full hover:bg-gray-800': isDesktopScreen,
                      'inline w-fit': isMobileScreen,
                    },
                  )}
                >
                  <Tab className="w-max border-none bg-transparent text-md">
                    {link.name}
                  </Tab>
                </Link>
              ))}
            </TabList>
            <TabPanels className="mt-4 lg:col-span-9 lg:mt-0">
              <TabPanel key={location.pathname} style={{display: 'block'}}>
                <AnimatePresence>
                  <motion.div
                    initial={{y: 220, opacity: 0}}
                    animate={{y: 0, opacity: 1, transition: {duration: 0.3}}}
                    exit={{y: 220, opacity: 0}}
                    transition={{
                      opacity: {duration: shouldReduceMotion ? 0 : 0.1},
                      ease: 'linear',
                    }}
                  >
                    <div className="relative h-full min-h-[40vh] w-full">
                      <div className="absolute w-full border-b border-t border-gray-600 bg-black lg:rounded-md lg:border xl:-top-20">
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
    .replace('admin', '')
    .replace(/-/g, ' ')
    .replace(/[/]/g, '')

  return (
    <div className="border-b border-gray-600 bg-black px-5vw py-9 lg:px-15vw lg:py-12">
      <div className="relative mx-auto flex max-w-8xl items-center justify-between">
        <div className="text-left">
          <h1 className="leading-tigh px-0 text-xl font-medium capitalize lg:text-3xl">
            Admin Panel Settings
          </h1>
          <p className="text-secondary mt-1 text-sm font-medium">
            2 years of proven experience in helping.
          </p>
        </div>
        <div className="hidden lg:block">
          <h1 className="leading-tigh px-0 text-lg font-medium capitalize lg:text-lg">
            {routeName || 'General'}
          </h1>
        </div>
      </div>
    </div>
  )
}
