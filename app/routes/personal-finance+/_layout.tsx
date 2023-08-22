import type { LoaderFunction } from '@remix-run/node'
import { Link, Outlet, useLocation } from '@remix-run/react'
import clsx from 'clsx'
// @ts-ignore
import { icons } from 'lucide-react'
import React from 'react'
import { ButtonLink } from '~/components/button'
import { Profile } from '~/components/me'
import { DarkModeToggle, Logo, MoreAction } from '~/components/navbar'
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
    <main className="bg-white dark:bg-black">
      <div className="relative mx-auto flex max-w-[85rem]">
        <div className="hidden min-w-[15.5rem] md:block">
          <Navigation />
        </div>
        <div className="grid w-full grid-cols-12">
          <Outlet />
        </div>
      </div>
    </main>
  )
}

function Navigation() {
  return (
    <div className="sticky top-0 flex h-auto min-h-screen w-full flex-col gap-6 bg-white px-6 dark:bg-black">
      <NavbarMenu />
      <div className="absolute bottom-0 w-full py-4">
        <Logo size="lg" />
      </div>
    </div>
  )
}

export function WrapperOutlet({
  children,
}: {
  children: JSX.Element | React.ReactNode
}) {
  return <>{children}</>
}

export function OutletCenter({
  children,
}: {
  children: JSX.Element | React.ReactNode
}) {
  return (
    <div className="col-span-12 min-h-screen w-full border-l border-gray-100 dark:border-gray-800 lg:border-r xl:col-span-8">
      {children}
    </div>
  )
}

export function OutletRight({
  children,
}: {
  children: JSX.Element | React.ReactNode
}) {
  return (
    <div className="hidden w-full lg:col-span-4 xl:block">
      <div className="sticky top-0 flex h-auto min-h-screen w-full flex-col gap-6 bg-white pl-6 dark:bg-black">
        <div className="sticky top-0 w-full bg-white py-3 dark:bg-black">
          <div className="flex items-center justify-between gap-2 py-1">
            <div>
              <Profile />
            </div>
            <div className="flex items-center gap-2">
              <DarkModeToggle />
              <MoreAction />
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}


function NavbarMenu() {
  return (
    <div className="flex flex-col justify-center py-5">
      <Link to="/" prefetch="intent" className="flex gap-1 mb-1.5 mt-0.5 items-center">
        <span className='text-2xl font-normal pb-2'>Omition</span>
        <span className='text-2xl font-semibold bg-gradient-to-tr from-green-900 to-[#01BAEF] bg-clip-text text-transparent'>Finance</span>
      </Link>
      <NavbarItem
        title='Beranda'
        route='/personal-finance'
        iconName='Home'
      />
      <NavbarItem
        title='Pengaturan'
        route='/personal-finance/settings'
        iconName='Settings'
      />
      <NavbarItem
        title='Panduan'
        route='/personal-finance/guide'
        iconName='BookOpen'
      />
      <NavbarItem
        title='Templates'
        route='/personal-finance/templates'
        iconName='FilePlus'
      />
    </div>
  )
}

function NavbarItem({ route, title, iconName }: { route: string, title: string, iconName: string }) {
  const location = useLocation()
  const isSelected = route === location.pathname

  const LucideIcon = icons[iconName]
  return (
    <ButtonLink
      type="button"
      variant="subtle"
      to={route}
      prefetch="intent"
      align="left"
      className={clsx(
        'flex items-center gap-2.5 hover:text-black hover:dark:text-white py-4 px-0',
        {
          'text-gray-300 dark:text-gray-200': !isSelected,
          'text-black dark:text-white': isSelected,
        },
      )}
    >
      <LucideIcon size={22} strokeWidth={2.5} />
      <h2 className="text-lg font-semibold pt-0.5">{title}</h2>
    </ButtonLink>
  )
}
