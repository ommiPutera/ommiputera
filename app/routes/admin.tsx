import { Link, Outlet, useLocation } from "@remix-run/react"
import { type LoaderFunction } from '@remix-run/node'
import { requireUserSession } from '~/utils/session.server'
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabsOrientation,
} from '@reach/tabs'
import clsx from "clsx"

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUserSession(request)
  if (!user) {
    throw new Response('Unauthorized', { status: 401 })
  }
  return {}
}


const LINKS = [
  { name: 'Dashboard', to: '/admin/dashboard' },
  { name: 'Index', to: '/admin' },
]

function Index() {
  const location = useLocation()
  const isSelected = (to: string) => to === location.pathname

  return (
    <main className="flex flex-col gap-5 pb-44 lg:gap-16">
      <div className="px-5vw py-9 lg:px-15vw lg:py-12">
        <div className="mx-auto grid max-w-8xl">
          <Tabs orientation={TabsOrientation.Vertical} style={{ display: "grid" }} className="grid-cols-10 gap-x-8">
            <TabList className="col-span-2 flex flex-col gap-y-1 bg-transparent">
              {
                LINKS.map(link => (
                  <Link key={link.to} to={link.to} className={clsx("text-gray-300 hover:bg-gray-800 w-full pb-2 pt-1 px-3 rounded-md text-left font-medium", {
                    active: isSelected(link.to),
                    'text-white bg-gray-800': isSelected(link.to),
                  })}>
                    <Tab className="border-none bg-transparent text-md">
                      {link.name}
                    </Tab>
                  </Link>
                ))
              }
            </TabList>
            <TabPanels className="col-span-8 pt-1">
              {
                LINKS.map(link => (
                  <TabPanel key={link.to}>
                    <Outlet />
                  </TabPanel>
                ))
              }
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

export default Index