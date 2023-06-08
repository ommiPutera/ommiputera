import {Link, Outlet, useLocation} from '@remix-run/react'
import {type LoaderFunction} from '@remix-run/node'
import {requireUserSession} from '~/utils/session.server'
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabsOrientation,
} from '@reach/tabs'
import clsx from 'clsx'
import React from 'react'

export const loader: LoaderFunction = async ({request}) => {
  const user = await requireUserSession(request)
  if (!user) {
    throw new Response('Unauthorized', {status: 401})
  }
  return {}
}

enum Screen {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
}

const LINKS = [
  {name: 'Index', to: '/admin'},
  {name: 'Dashboard', to: '/admin/dashboard'},
  {name: 'Index', to: '/admin/1'},
  {name: 'Index', to: '/admin/2'},
  {name: 'Index', to: '/admin/3'},
  {name: 'Index', to: '/admin/4'},
  {name: 'Index', to: '/admin/5'},
  {name: 'Index', to: '/admin/6'},
  {name: 'Index', to: '/admin/7'},
  {name: 'Index', to: '/admin/8'},
  {name: 'Index', to: '/admin/9'},
  {name: 'Index', to: '/admin/10'},
]

const mq = 'screen and (min-width: 1366px)'
const getScreen = () =>
  window.matchMedia(mq).matches ? Screen.DESKTOP : Screen.MOBILE
function Index() {
  const [screen, setScreen] = React.useState(() => {
    if (typeof window !== 'object') return Screen.DESKTOP
    return getScreen()
  })
  const location = useLocation()
  const isSelected = (to: string) => to === location.pathname

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(mq)
    const handleChange = () => {
      setScreen(mediaQuery.matches ? Screen.DESKTOP : Screen.MOBILE)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const isDesktop = screen === Screen.DESKTOP
  const isMobile = screen === Screen.MOBILE

  return (
    <main className="flex flex-col gap-5 pb-44 lg:gap-16">
      <div className="px-5vw py-9 lg:px-15vw lg:py-12">
        <div className="relative mx-auto grid max-w-8xl">
          <Tabs
            style={{display: isDesktop ? 'grid' : ''}}
            orientation={
              isDesktop ? TabsOrientation.Vertical : TabsOrientation.Horizontal
            }
            className="grid-cols-10 gap-x-8 overflow-x-scroll"
          >
            <TabList
              className={clsx(
                'col-span-2 flex flex-row gap-y-1 overflow-x-scroll bg-transparent',
                {
                  'flex-col': isDesktop,
                  'pb-4': isMobile,
                },
              )}
            >
              {LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={clsx(
                    'rounded-md px-3 pb-2 pt-1 text-left font-medium text-gray-300 hover:bg-gray-800',
                    {
                      active: isSelected(link.to),
                      'bg-gray-800 text-white': isSelected(link.to),
                      'w-full': isDesktop,
                      'w-fit': isMobile,
                    },
                  )}
                >
                  <Tab className="text-md border-none bg-transparent">
                    {link.name}
                  </Tab>
                </Link>
              ))}
            </TabList>
            <TabPanels className="col-span-8 pt-1">
              {LINKS.map(link => (
                <TabPanel key={link.to}>
                  <Outlet />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

export default Index
