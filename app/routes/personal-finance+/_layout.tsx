import { Tab } from '@headlessui/react'
import type { LoaderFunction } from '@remix-run/node'
import { Link, Outlet, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import {
  PieChart,
  BookOpenCheck,
  FilePlus,
  Layout,
  Settings,
  X,
  Trash,
} from 'lucide-react'
import React from 'react'
import { ButtonLink } from '~/components/button'
import { Profile } from '~/components/me'
import { DarkModeToggle, Logo, MoreAction } from '~/components/navbar'
import { UIButton } from '~/components/shadcn/button'
import { requireUserSession } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUserSession(request)
  if (!user) {
    throw new Response('Unauthorized', { status: 401 })
  }
  return {}
}

export default function Index() {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className='bg-white dark:bg-black'>
      <div className='relative grid grid-cols-5 mx-auto max-w-7xl'>
        <div className='col-span-1 min-h-screen'>
          <div className="sticky top-0 h-[100vh] bg-white w-full dark:bg-black pr-6 py-3 flex flex-col gap-6">
            <NavbarMenus />
            <div className='absolute w-full pt-6 pb-8 px-3 bottom-0 border-t border-gray-100 dark:border-gray-800'>
              <Logo />
              <p className="mt-1 text-left text-xs leading-snug font-normal text-gray-300 dark:text-gray-200">So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on.</p>
            </div>
          </div>
        </div>
        <div className='col-span-3 border-r border-l border-gray-100 dark:border-gray-800 min-h-screen'>
          <Section />
          <Guides />
          <Tab.Group
            as="div"
            className="w-full grid-cols-12 gap-x-8 overflow-visible"
          >
            <Tab.List className="z-0 mx-auto flex overflow-x-scroll border-b border-gray-100 px-6 dark:border-gray-800 lg:col-span-3 lg:overflow-x-hidden">
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
        </div>
        <div className='col-span-1 min-h-screen'>
          <div className="sticky top-0 h-[100vh] bg-white w-full dark:bg-black pl-6 py-3">
            <div className="flex items-center justify-center gap-x-2">
              <DarkModeToggle />
              <Profile />
              <MoreAction />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function Section() {
  return (
    <div className="sticky top-0 z-[99] bg-white border-b w-full border-gray-100 dark:border-gray-800 dark:bg-black px-6 py-3">
      <h2 className='text-xl font-semibold'>Beranda</h2>
    </div>
  )
}

function Guides() {
  const [isClose, setIsClose] = React.useState(false)

  if (isClose) return <></>
  return (
    <div className="m-3 relative flex flex-col items-center justify-center gap-6 rounded-md border border-gray-100 dark:border-gray-800 md:gap-8">
      <div className="grid grid-cols-2 gap-6 px-3 py-4">
        <div className="col-span-1 flex flex-col">
          <h1 className="text-left text-3xl font-semibold leading-10">
            Personal Financial
          </h1>
          <p className="px-0 text-left text-md font-normal leading-snug text-gray-400 dark:text-gray-200">
            So I started to walk into the water. I won't lie to you boys, I was
            terrified.
          </p>
          <ButtonLink className='mt-4' size='sm' type="button" to="/personal-finance/new">
            <p className="text-sm">Get Started</p>
          </ButtonLink>
        </div>
        <div className="col-span-1 flex flex-col">
          <h1 className="text-left text-3xl font-semibold leading-10">
            Read Guides
          </h1>
          <p className="px-0 text-left text-md font-normal leading-snug text-gray-400 dark:text-gray-200">
            So I started to walk into the water. I won't lie to you boys, I was
            terrified. But I pressed on.
          </p>
          <ButtonLink
            type="button"
            size='sm'
            to="/personal-finance/new"
            className="flex items-center gap-x-2 mt-4"
          >
            <BookOpenCheck size={16} />
            <p className="text-sm">Guides</p>
          </ButtonLink>
        </div>
      </div>
      <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200 hover:dark:bg-gray-800">
        <UIButton
          onClick={() => setIsClose(true)}
          type="button"
          size="sm"
          variant="subtle"
        >
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
    <div className="flex flex-col justify-center gap-2">
      <div className='py-1 mb-6'>
        <p className='whitespace-nowrap text-2xl font-semibold leading-none text-black dark:text-white'>
          Personal Financial
        </p>
      </div>
      <ButtonLink
        type="button"
        variant="subtle"
        to="/personal-finance/templates"
        prefetch="intent"
        className={clsx(
          'flex items-center gap-x-2 px-0 hover:text-black hover:dark:text-white',
          {
            'text-gray-400 dark:text-gray-200': !isSelected(
              '/personal-finance/templates',
            ),
            'text-black dark:text-white': isSelected(
              '/personal-finance/templates',
            ),
          },
        )}
      >
        <FilePlus size={18} />
        <p className="text-md font-normal">Create Your Templates</p>
      </ButtonLink>
      <ButtonLink
        type="button"
        variant="subtle"
        to="/personal-finance/templates"
        prefetch="intent"
        className={clsx(
          'flex items-center gap-x-2 px-0 hover:text-black hover:dark:text-white',
          {
            'text-gray-400 dark:text-gray-200': !isSelected(
              '/personal-finance/templates',
            ),
            'text-black dark:text-white': isSelected(
              '/personal-finance/templates',
            ),
          },
        )}
      >
        <Settings size={18} />
        <p className="text-md font-normal">Settings & Members</p>
      </ButtonLink>
      <ButtonLink
        type="button"
        variant="subtle"
        to="/personal-finance/templates"
        prefetch="intent"
        className={clsx(
          'flex items-center gap-x-2 px-0 hover:text-black hover:dark:text-white',
          {
            'text-gray-400 dark:text-gray-200': !isSelected(
              '/personal-finance/templates',
            ),
            'text-black dark:text-white': isSelected(
              '/personal-finance/templates',
            ),
          },
        )}
      >
        <Trash size={18} />
        <p className="text-md font-normal">Trash</p>
      </ButtonLink>
    </div>
  )
}
