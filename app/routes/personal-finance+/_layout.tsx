import {Tab} from '@headlessui/react'
import type {LoaderFunction} from '@remix-run/node'
import {Link, Outlet, useLocation} from '@remix-run/react'
import clsx from 'clsx'
import {AnimatePresence, motion, useReducedMotion} from 'framer-motion'
import {
  PieChart,
  BookOpenCheck,
  FilePlus,
  Layout,
  Plus,
  Settings,
  X,
} from 'lucide-react'
import React from 'react'
import {ButtonLink} from '~/components/button'
import {ProtectedRoute} from '~/components/navbar'
import {UIButton} from '~/components/shadcn/button'
import {getUserRole, requireUserSession} from '~/utils/session.server'

export const loader: LoaderFunction = async ({request}) => {
  const user = await requireUserSession(request)
  const role = await getUserRole(request)
  if (!user) {
    throw new Response('Unauthorized', {status: 401})
  }
  if (role === 'BASIC') {
    throw new Response('Unauthorized', {status: 401})
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
          'bg-gradient flex flex-col gap-5 dark:bg-gray-900 lg:gap-32 lg:py-8',
        )}
      >
        <div className="text-primary relative grid gap-4 lg:gap-6">
          <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-center gap-6 rounded-lg border border-white bg-gray-100 py-12 dark:border-gray-800 dark:bg-gray-900 md:gap-8">
            <h1 className="2xl:w-3/5 w-[85vw] px-0 text-center text-4xl font-semibold leading-10 md:w-2/3 lg:w-3/4 lg:text-7xl lg:leading-[4.5rem]">
              Welcome to Your Personal Financial
            </h1>
            <p className="px-0 text-center text-lg font-normal leading-normal text-gray-400 dark:text-gray-200 md:w-2/3 lg:px-9 lg:text-xl xl:w-3/5">
              First of all, thank you for interested in reading about me, On
              this page, I will tell all about my life and my experiences
            </p>
            <ButtonLink
              type="button"
              size="sm"
              variant="subtle"
              to="/cash-flow/new"
              className="flex items-center gap-x-2 px-0"
            >
              <Plus size={16} />
              <p>New Plan</p>
            </ButtonLink>
            <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200 hover:dark:bg-gray-800">
              <UIButton type="button" size="sm" variant="subtle">
                <X size={16} />
              </UIButton>
            </div>
          </div>
          <div className="relative mx-auto flex w-full max-w-5xl items-end justify-between rounded-lg border border-white bg-gray-100 px-6 py-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="">
              <h4 className="mb-4 text-2xl font-medium">Read Guides</h4>
              <p className="text-base font-normal leading-normal text-gray-400 dark:text-gray-200 md:w-2/3">
                First of all, thank you for interested in reading about me, On
                this page, I will tell all about my life and my experiences
              </p>
            </div>
            <div className="flex items-center gap-x-4">
              <ButtonLink
                type="button"
                size="md"
                variant="primary"
                to="/cash-flow/new"
                className="flex items-center gap-x-2 rounded-lg px-4"
              >
                <BookOpenCheck size={16} />
                <p>Guides</p>
              </ButtonLink>
            </div>
            <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200 hover:dark:bg-gray-800">
              <UIButton type="button" size="sm" variant="subtle">
                <X size={16} />
              </UIButton>
            </div>
          </div>
          <AnimatePresence>
            <motion.div
              className="mx-auto mb-44 w-full max-w-7xl"
              initial={{y: 140, opacity: 0}}
              animate={{y: 0, opacity: 1, transition: {duration: 0.3}}}
              exit={{y: 220, opacity: 0}}
              transition={{
                opacity: {duration: shouldReduceMotion ? 0 : 0.5},
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
    <Tab
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
    </Tab>
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
    <div>
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
