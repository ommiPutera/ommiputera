import type { LoaderFunction } from '@remix-run/node'
import { Link, Outlet, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import { BookOpen, FilePlus, Home, Settings, Trash } from 'lucide-react'
import React from 'react'
import { ButtonLink } from '~/components/button'
import { Profile } from '~/components/me'
import { DarkModeToggle, Logo, MoreAction } from '~/components/navbar'
import { requireUserSession } from '~/utils/session.server'
import { useTheme } from '~/utils/theme-provider'

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
        <div className="hidden min-w-[13rem] lg:block">
          <div className="sticky top-0 flex h-auto min-h-screen w-full flex-col gap-6 bg-white pr-6 dark:bg-black">
            <NavbarMenus />
            <div className="absolute bottom-0 w-full py-4">
              <Logo size="md" />
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-12">
          <Outlet />
        </div>
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
    <div className="col-span-12 min-h-screen w-full border-l border-r border-gray-100 dark:border-gray-800 lg:col-span-8">
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
    <div className="hidden w-full lg:col-span-4 lg:block">
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

function NavbarMenus() {
  const location = useLocation()
  const isSelected = (to: string) => to === location.pathname
  const [theme] = useTheme()
  return (
    <div className="flex flex-col justify-center gap-7 py-6">
      <Link to="/personal-finance" prefetch="intent" className="mb-1">
        <div className="flex gap-3">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.9998 0C11.5741 0 9.60767 1.96644 9.60767 4.39216C9.60767 6.81788 11.5741 8.78431 13.9998 8.78431H23.6077C26.0334 8.78431 27.9998 6.81788 27.9998 4.39216C27.9998 1.96644 26.0334 0 23.6077 0H13.9998Z"
              fill={theme === 'dark' ? '#fff' : '#000'}
            />
            <rect
              x="8.78418"
              y="9.60785"
              width="8.78431"
              height="8.78431"
              rx="4.39216"
              transform="rotate(90 8.78418 9.60785)"
              fill={theme === 'dark' ? '#fff' : '#000'}
            />
            <rect
              x="18.2549"
              y="19.2156"
              width="8.78431"
              height="8.78431"
              rx="4.39216"
              transform="rotate(90 18.2549 19.2156)"
              fill={theme === 'dark' ? '#fff' : '#000'}
            />
          </svg>
        </div>
      </Link>
      <ButtonLink
        type="button"
        variant="subtle"
        to="/personal-finance"
        prefetch="intent"
        align="left"
        className={clsx(
          'flex items-center gap-2 px-0 hover:text-black hover:dark:text-white',
          {
            'text-gray-400 dark:text-gray-200':
              !isSelected('/personal-finance'),
            'text-black dark:text-white': isSelected('/personal-finance'),
          },
        )}
      >
        <Home size={20} strokeWidth={2.5} />
        <h2 className="text-md font-semibold">Beranda</h2>
      </ButtonLink>
      <ButtonLink
        type="button"
        variant="subtle"
        to="/personal-finance/guide"
        prefetch="intent"
        align="left"
        className={clsx(
          'flex items-center gap-2 px-0 hover:text-black hover:dark:text-white',
          {
            'text-gray-400 dark:text-gray-200': !isSelected(
              '/personal-finance/guide',
            ),
            'text-black dark:text-white': isSelected('/personal-finance/guide'),
          },
        )}
      >
        <BookOpen size={20} strokeWidth={2.5} />
        <h2 className="text-md font-semibold">Guide</h2>
      </ButtonLink>
      <ButtonLink
        type="button"
        variant="subtle"
        to="/personal-finance/templates"
        prefetch="intent"
        align="left"
        className={clsx(
          'flex items-center gap-2 px-0 hover:text-black hover:dark:text-white',
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
        <FilePlus size={20} strokeWidth={2.5} />
        <h2 className="text-md font-semibold">Templates</h2>
      </ButtonLink>
      <ButtonLink
        type="button"
        variant="subtle"
        to="/personal-finance/settings"
        prefetch="intent"
        align="left"
        className={clsx(
          'flex items-center gap-2 px-0 hover:text-black hover:dark:text-white',
          {
            'text-gray-400 dark:text-gray-200': !isSelected(
              '/personal-finance/settings',
            ),
            'text-black dark:text-white': isSelected(
              '/personal-finance/settings',
            ),
          },
        )}
      >
        <Settings size={20} strokeWidth={2.5} />
        <h2 className="text-md font-semibold">Settings</h2>
      </ButtonLink>
      <ButtonLink
        type="button"
        variant="subtle"
        to="/personal-finance/trash"
        prefetch="intent"
        align="left"
        className={clsx(
          'flex items-center gap-2 px-0 hover:text-black hover:dark:text-white',
          {
            'text-gray-400 dark:text-gray-200': !isSelected(
              '/personal-finance/trash',
            ),
            'text-black dark:text-white': isSelected('/personal-finance/trash'),
          },
        )}
      >
        <Trash size={20} strokeWidth={2.5} />
        <h2 className="text-md font-semibold">Trash</h2>
      </ButtonLink>
    </div>
  )
}
