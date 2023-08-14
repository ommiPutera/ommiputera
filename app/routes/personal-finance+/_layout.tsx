import type {LoaderFunction} from '@remix-run/node'
import {Outlet, useLocation} from '@remix-run/react'
import clsx from 'clsx'
import {FilePlus, Settings, Trash} from 'lucide-react'
import React from 'react'
import {ButtonLink} from '~/components/button'
import {Logo} from '~/components/navbar'
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
      <div className="relative mx-auto grid max-w-6xl grid-cols-12">
        <div className="col-span-3">
          <div className="sticky top-0 flex h-auto min-h-screen w-full flex-col gap-6 bg-white pr-6 dark:bg-black">
            <div className="pb-3 pt-6">
              <p className="whitespace-nowrap text-2xl font-semibold leading-none text-black dark:text-white">
                Personal Financial
              </p>
            </div>
            <NavbarMenus />
            <div className="absolute bottom-0 w-full border-t border-gray-100 px-3 pb-8 pt-6 dark:border-gray-800">
              <Logo />
              <p className="mt-1 text-left text-xs font-normal leading-snug text-gray-300 dark:text-gray-200">
                So I started to walk into the water. I won't lie to you boys, I
                was terrified. But I pressed on.
              </p>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </main>
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
    <div className="col-span-6 min-h-screen border-l border-r border-gray-100 dark:border-gray-800">
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
    <div className="col-span-3">
      <div className="sticky top-0 flex h-auto min-h-screen w-full flex-col gap-6 bg-white pl-6 dark:bg-black">
        {children}
      </div>
    </div>
  )
}

function NavbarMenus() {
  const location = useLocation()
  const isSelected = (to: string) =>
    to === location.pathname || location.pathname.startsWith(`${to}/`)
  return (
    <div className="flex flex-col justify-center gap-2">
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
        <p className="text-sm font-medium">Create Your Templates</p>
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
        <p className="text-sm font-medium">Settings & Members</p>
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
        <p className="text-sm font-medium">Trash</p>
      </ButtonLink>
    </div>
  )
}
