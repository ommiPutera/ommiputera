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
  { name: 'Index', to: '/admin' },
  { name: 'Dashboard', to: '/admin/dashboard' },
  { name: 'Index', to: '/admin/1' },
  { name: 'Index', to: '/admin/2' },
  { name: 'Index', to: '/admin/3' },
  { name: 'Index', to: '/admin/4' },
  { name: 'Index', to: '/admin/5' },
  { name: 'Index', to: '/admin/6' },
  { name: 'Index', to: '/admin/7' },
  { name: 'Index', to: '/admin/8' },
  { name: 'Index', to: '/admin/9' },
  { name: 'Index', to: '/admin/10' },
]

const mq = 'screen and (min-width: 1066px)'
const getScreen = () =>
  window.matchMedia(mq).matches ? Screen.DESKTOP : Screen.MOBILE

function Index() {
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
    <main className="flex flex-col gap-5 pb-44 lg:gap-16">
      <div className="px-5vw py-9 lg:px-15vw lg:py-12">
        <div className="relative mx-auto grid max-w-8xl">
          <Tabs
            style={{ display: isDesktopScreen ? 'grid' : '' }}
            orientation={
              isMobileScreen
                ? TabsOrientation.Horizontal
                : TabsOrientation.Vertical
            }
            className="grid-cols-10 gap-x-8 overflow-x-scroll lg:overflow-x-hidden"
          >
            <TabList
              className={clsx(
                'col-span-2 flex gap-y-1 overflow-x-scroll bg-transparent lg:overflow-x-hidden',
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
                    'rounded-md px-3 pb-2 pt-1 text-left font-medium text-gray-300 hover:bg-gray-800',
                    {
                      active: isRouteSelected(link.to),
                      'bg-gray-800 text-white': isRouteSelected(link.to),
                      'w-full': isDesktopScreen,
                      'w-fit': isMobileScreen,
                    },
                  )}
                >
                  <Tab className="text-md border-none bg-transparent">
                    {link.name}
                  </Tab>
                </Link>
              ))}
            </TabList>
            <TabPanels className="col-span-8 mt-4 lg:mt-0">
              <TabPanel key={location.pathname} style={{ display: 'block' }}>
                <Outlet />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

export default Index
