import {TabList, TabPanel, TabPanels, Tabs, TabsOrientation} from '@reach/tabs'
import {type LoaderFunction} from '@remix-run/node'
import {Link, Outlet, useLoaderData, useLocation} from '@remix-run/react'
import clsx from 'clsx'
import {AnimatePresence, motion, useReducedMotion} from 'framer-motion'
import React from 'react'
import {getUserRole, requireUserSession} from '~/utils/session.server'

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
  const role = await getUserRole(request)
  if (!user) {
    throw new Response('Unauthorized', {status: 401})
  }
  if (role === 'BASIC') {
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
  const isRouteSelected = (to: string, child?: Array<string>) =>
    to === location.pathname || child?.includes(location.pathname)

  return (
    <main className="flex flex-col gap-x-5 pb-44 lg:gap-x-9">
      <LayoutTitle />
      <div className="pb-9 lg:px-[4vw] lg:pb-12 xl:px-10vw">
        <div className="relative mx-auto grid lg:max-w-7xl">
          <Tabs
            style={{display: isDesktopScreen ? 'grid' : ''}}
            orientation={
              isMobileScreen
                ? TabsOrientation.Horizontal
                : TabsOrientation.Vertical
            }
            className="w-full grid-cols-12 gap-x-8 overflow-visible"
          >
            <TabList
              className={clsx(
                'z-0 mt-4 flex gap-1 overflow-x-scroll bg-transparent px-5vw lg:col-span-3 lg:overflow-x-hidden lg:px-0',
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
                    'z-10 rounded-md px-4 pb-2.5 pt-2 text-left text-sm font-medium text-gray-300 lg:text-md',
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
            <TabPanels className="mt-4 lg:col-span-9 lg:mt-0">
              <TabPanel key={location.pathname} className="block">
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
                    <div className="relative h-full min-h-[50vh] w-full">
                      <div className="w-full border-b border-t border-gray-600 bg-black shadow-[1px_10px_47px_0px_#19191987] lg:-mt-16 lg:rounded-lg lg:border xl:-mt-20">
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
  // const location = useLocation()
  // const routeName = location.pathname
  //   .replace('/admin', '')
  //   .replace(/-/g, ' ')
  //   .replace(/[/]/g, ' / ')

  return (
    <>
      <div className="absolute -z-10 h-[50vh] w-screen bg-red-900 bg-gradient-to-b from-black to-gray-900"></div>
      <div className="w-full px-[4vw] xl:px-10vw">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between py-9 lg:pb-4 lg:pt-14">
          <div className="text-left">
            <h1 className="leading-tigh px-0 text-xl font-medium capitalize md:text-lg lg:text-xl xl:text-3xl">
              Admin Panel Settings
            </h1>
            <p className="text-secondary mt-1 text-md font-light">
              2 years of proven experience in helping.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
