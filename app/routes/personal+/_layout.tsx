import type {LoaderFunction} from '@remix-run/node'
import {Outlet, useLocation} from '@remix-run/react'
import clsx from 'clsx'
import React from 'react'
import {ButtonLink} from '~/components/button'
import {Profile} from '~/components/me'
import {DarkModeToggle, Logo, MoreAction} from '~/components/navbar'
import {requireUserSession} from '~/utils/session.server'

export const loader: LoaderFunction = async ({request}) => {
  const user = await requireUserSession(request)
  if (!user) {
    throw new Response('Unauthorized', {status: 401})
  }
  return {}
}

export default function Index() {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="bg-white dark:bg-black">
      <div className="relative mx-auto flex w-full">
        <div className="hidden max-w-[14rem] md:block">
          <Navigation />
        </div>
        <div className="mx-auto grid w-full max-w-4xl grid-cols-12 xl:max-w-5xl">
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
        <NavbarItem
          title="Lainnya"
          route="/personal/templates"
          icon="/icons/hamburger.png"
        />
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
  ...props
}: {
  children: JSX.Element | React.ReactNode
}) {
  return (
    <div
      {...props}
      className={clsx(
        'col-span-12 min-h-screen w-full border-l border-gray-100 dark:border-gray-800 lg:col-span-8 lg:border-r xl:col-span-9',
      )}
    >
      {children}
    </div>
  )
}

export function OutletRight({
  children,
  ...props
}: {
  children: JSX.Element | React.ReactNode
}) {
  return (
    <div className="hidden w-full lg:col-span-4 lg:block xl:col-span-3">
      <div
        {...props}
        className={clsx(
          'sticky top-0 flex h-full min-h-screen w-full flex-col gap-6 bg-white px-6 dark:bg-black',
        )}
      >
        <div className="sticky top-0 z-50 w-full bg-white py-3 dark:bg-black">
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
    <div className="flex flex-col justify-center gap-8 py-5">
      <div className="my-2 flex flex-col gap-8">
        <Logo size="md" />
      </div>
      <div className="flex flex-col">
        <NavbarItem title="Beranda" route="/personal" icon="/icons/home.png" />
      </div>
    </div>
  )
}

function NavbarItem({
  route,
  title,
  icon,
}: {
  route: string
  title: string
  icon: string
}) {
  const location = useLocation()
  const isSelected = route === location.pathname

  return (
    <ButtonLink
      type="button"
      variant="subtle"
      to={route}
      prefetch="intent"
      align="left"
      className={clsx(
        'group flex items-center gap-4 px-0 py-2 hover:text-black hover:dark:text-white',
        {
          'text-gray-300 dark:text-gray-200': !isSelected,
          'text-black dark:text-white': isSelected,
        },
      )}
    >
      <img
        src={icon}
        alt=""
        className={clsx('h-5 w-5 group-hover:grayscale-0', {
          grayscale: !isSelected,
        })}
      />
      <h2 className="pb-0.5 text-md font-medium">{title}</h2>
    </ButtonLink>
  )
}
