import { Tab } from '@headlessui/react'
import type { LoaderFunction } from '@remix-run/node'
import { Link, Outlet, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  PieChart,
  BookOpenCheck,
  FilePlus,
  Layout,
  Settings,
  X,
} from 'lucide-react'
import React from 'react'
import { ButtonLink } from '~/components/button'
import { ProtectedRoute } from '~/components/navbar'
import { UIButton } from '~/components/shadcn/button'
import { getUserRole, requireUserSession } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUserSession(request)
  const role = await getUserRole(request)
  if (!user) {
    throw new Response('Unauthorized', { status: 401 })
  }
  if (role === 'BASIC') {
    throw new Response('Unauthorized', { status: 401 })
  }
  return {}
}

export default function Index() {
  const shouldReduceMotion = useReducedMotion()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <ProtectedRoute>
        <NavbarMenus />
      </ProtectedRoute>
      <main
        className={clsx(
          'bg-gradient flex flex-col gap-5 lg:gap-32',
        )}
      >
        <div className="text-primary relative grid gap-4 lg:gap-6">
          <Guides />
          <AnimatePresence>
            <motion.div
              className="mx-auto mb-44 w-full"
              initial={{ y: 140, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }}
              exit={{ y: 220, opacity: 0 }}
              transition={{
                opacity: { duration: shouldReduceMotion ? 0 : 0.5 },
                ease: 'linear',
              }}
            >
              <Tab.Group
                as="div"
                className="w-full grid-cols-12 gap-x-8 overflow-visible"
              >
                <Tab.List className="z-0 mx-auto flex max-w-5xl overflow-x-scroll border-b border-gray-100 px-0 dark:border-gray-800 lg:col-span-3 lg:overflow-x-hidden">
                  <TabComponent
                    to="/personal-finance"
                    index={0}
                    className="flex items-center gap-x-2"
                  >
                    <Layout size={18} strokeWidth={2.5} />
                    <p className="mt-1 text-md">Board</p>
                  </TabComponent>
                  <TabComponent
                    to="/personal-finance/analytics"
                    index={1}
                    className="flex items-center gap-x-2"
                  >
                    <PieChart size={18} strokeWidth={2.5} />
                    <p className="mt-1 text-md">Analytics</p>
                  </TabComponent>
                </Tab.List>
                <Contents />
              </Tab.Group>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </>
  )
}

function Guides() {
  const [isClose, setIsClose] = React.useState(false)

  if (isClose) return <></>
  return (
    <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-center gap-6 rounded-lg border border-white bg-gray-100 dark:border-gray-800 dark:bg-gray-900 md:gap-8">
      <div className='grid grid-cols-2 gap-6 py-6 px-6'>
        <div className='col-span-1 flex flex-col gap-y-4'>
          <h1 className="text-left font-semibold leading-10 text-3xl">
            Personal Financial
          </h1>
          <p className="px-0 text-left text-md font-normal text-gray-400 dark:text-gray-200">
            So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me.
          </p>
          <ButtonLink
            type="button"
            to="/cash-flow/new"
          >
            <p className='text-sm'>Get Started</p>
          </ButtonLink>
        </div>
        <div className='col-span-1 flex flex-col gap-y-4'>
          <h1 className="text-left font-semibold leading-10 text-3xl">
            Read Guides
          </h1>
          <p className="px-0 text-left text-md font-normal text-gray-400 dark:text-gray-200">
            So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.
          </p>
          <ButtonLink
            type="button"
            to="/cash-flow/new"
            className='flex items-center gap-x-2'
          >
            <BookOpenCheck size={16} />
            <p className='text-sm'>Guides</p>
          </ButtonLink>
        </div>
      </div>
      <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200 hover:dark:bg-gray-800">
        <UIButton onClick={() => setIsClose(true)} type="button" size="sm" variant="subtle">
          <X size={16} />
        </UIButton>
      </div>
    </div>
  )
}

function TabComponent({
  children,
  index,
  className,
  to,
  ...props
}: {
  children: JSX.Element | React.ReactNode
  index: 0 | 1
  className?: string
  to: string
}) {
  const location = useLocation()
  const isSelected = location.pathname === to
  return (
    <div
      className={clsx(
        'relative my-1 rounded-md border-b-0 border-b-transparent px-2 py-1 focus:outline-none',
      )}
      {...props}
    >
      <Link to={to} prefetch="intent" preventScrollReset={true}>
        <div
          className={clsx(
            'font-semibold',
            {
              'text-black dark:text-white': isSelected,
              'text-gray-400 dark:text-gray-200': !isSelected,
            },
            className,
          )}
        >
          {children}
        </div>
        <div
          className={clsx(
            'absolute -bottom-1 left-0 h-[3.5px] w-full rounded-lg',
            {
              'bg-black dark:bg-white': isSelected,
              'bg-transparent': !isSelected,
            },
          )}
        ></div>
      </Link>
    </div>
  )
}

function Contents() {
  return (
    <Tab.Panels className="py-6">
      <Tab.Panel>
        <Outlet />
      </Tab.Panel>
    </Tab.Panels>
  )
}

function NavbarMenus() {
  const location = useLocation()
  const isSelected = (to: string) =>
    to === location.pathname || location.pathname.startsWith(`${to}/`)
  return (
    <div className='flex items-center'>
      <ButtonLink
        type="button"
        size="sm"
        variant="subtle"
        to="/personal-finance/templates"
        prefetch="intent"
        className={clsx(
          'flex items-center gap-x-1.5 px-0 hover:text-black hover:dark:text-white',
          {
            'text-gray-400 dark:text-gray-300': !isSelected(
              '/personal-finance/templates',
            ),
            'text-black dark:text-white': isSelected(
              '/personal-finance/templates',
            ),
          },
        )}
      >
        <FilePlus size={18} />
        <p className="text-md">Templates</p>
      </ButtonLink>
      <ButtonLink
        type="button"
        size="sm"
        variant="subtle"
        to="/personal-finance/settings"
        prefetch="intent"
        className={clsx(
          'flex items-center gap-x-1.5 hover:text-black hover:dark:text-white',
          {
            'text-gray-400 dark:text-gray-300': !isSelected(
              '/personal-finance/settings',
            ),
            'text-black dark:text-white': isSelected(
              '/personal-finance/settings',
            ),
          },
        )}
      >
        <Settings size={18} />
        <p className="text-md">Settings</p>
      </ButtonLink>
    </div>
  )
}
