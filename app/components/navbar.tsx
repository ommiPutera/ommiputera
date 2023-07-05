import {
  Menu,
  MenuButton,
  MenuItems,
  MenuLink,
  MenuPopover,
  useMenuButtonContext,
} from '@reach/menu-button'
import { Link, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { capitalize } from 'lodash'
import { BurgerMenu } from '~/utils/icons'
import { useRootData } from '~/utils/use-root-data'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '~/components/shadcn/navigation-menu'
import React from 'react'
import { SectionSpacer } from './spacer'
import { Badge } from './shadcn/badge'

type TypeLinks = {
  name: string
  to?: string
  asParent: boolean
  child?: {
    component: string | React.ReactNode
  }[]
}[]

const RowApp1 = () => {
  const isSelected =
    '/cash-flow/intro' === location.pathname ||
    location.pathname.startsWith(`/cash-flow`)

  return (
    <div className="grid w-[420px] grid-cols-1 gap-x-2 px-3 pb-3.5">
      <Link
        to="/cash-flow/intro"
        prefetch="intent"
        className={clsx(
          'col-span-1 flex w-full items-center rounded-lg pr-3 hover:bg-gray-800',
          {
            'bg-gray-800': isSelected,
          },
        )}
      >
        <div className="mr-5 h-full w-[120px] rounded-l-md border border-orange-200 bg-gradient-to-br from-orange-100 to-orange-300 px-2 pb-2 pt-4">
          <p className="text-2xl">🎷</p>
          <h4 className="text-md font-bold leading-tight">
            Lean <br /> Cashflow
          </h4>
        </div>
        <div className="mb-2 pb-2.5 pt-2">
          <div className="flex items-center gap-x-2.5">
            <p className="text-md font-medium">Personal Cash Flow</p>
            <Badge variant="success">Free</Badge>
          </div>
          <p className="mt-1 text-md font-light leading-tight text-gray-300">
            A collection of links for navigating websites.
          </p>
        </div>
      </Link>
    </div>
  )
}

const RowProducts1 = () => {
  return (
    <div className="grid h-full w-[620px] grid-cols-2 gap-x-3 px-3 pb-3">
      <div className="col-span-1 flex h-full flex-col justify-end rounded-lg bg-gray-800 p-4">
        <p className="bottom-2 text-lg font-bold">twon.com</p>
        <p className="mt-2 text-md font-light leading-tight text-gray-300">
          A collection of links for navigating websites. A collection of links
          for navigating websites.
        </p>
      </div>
      <div className="col-span-1">
        <Link to="/about" prefetch="intent">
          <div className="w-full rounded-lg px-3 pb-2.5 pt-2 hover:bg-gray-800">
            <p className="text-lg font-medium">Finance App</p>
            <p className="mt-1 text-md font-light leading-tight text-gray-300">
              A collection of links for navigating websites. A collection of
              links for navigating websites.
            </p>
          </div>
        </Link>
        <Link to="/about" prefetch="intent">
          <div className="w-full rounded-lg px-3 pb-2.5 pt-2 hover:bg-gray-800">
            <p className="text-lg font-medium">Finance App</p>
            <p className="mt-1 text-md font-light leading-tight text-gray-300">
              A collection of links for navigating websites. A collection of
              links for navigating websites.
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}

const LINKS: TypeLinks = [
  {
    name: 'Web Applications',
    asParent: true,
    child: [{ component: <RowApp1 /> }],
  },
  {
    name: 'Products',
    asParent: true,
    child: [
      { component: <RowProducts1 /> },
      { component: <SectionSpacer size="xs" className="mx-3 mt-1" /> },
      { component: <RowProducts1 /> },
    ],
  },
  { name: 'Project', to: '/project', asParent: false },
  { name: 'About', to: '/about', asParent: false },
]

const USER_LINKS = [{ name: 'Personal Cash Flow', to: '/cash-flow' }]
const OWNER_LINKS = [
  { name: 'Dashboard', to: '/dashboard' },
  { name: 'Admin Panel', to: '/admin' },
  ...USER_LINKS,
]
const MOBILE_LINKS = [{ name: 'Home', to: '/', asParent: false }, ...LINKS]

// Default is no navbar
const ROUTE_WITHOUT_NAVBAR = ['/login', 'ALL']

function Index() {
  const { user } = useRootData()
  const location = useLocation()

  if (ROUTE_WITHOUT_NAVBAR.includes(location.pathname)) return <></>
  if (!user) return <PublicRoute />

  if (ROUTE_WITHOUT_NAVBAR.includes('ALL')) return <ProtectedNav />
  return <PublicRoute />
}

function PublicRoute() {
  const { user } = useRootData()
  return (
    <div className="relative">
      <div
        className={clsx('px-5vw py-9 lg:px-[4vw] lg:pb-6 lg:pt-8', {
          'bg-black': user,
        })}
      >
        <nav className="text-primary mx-auto flex max-w-[1636px] items-center justify-between">
          <Logo />
          <DesktopNav />
          <MobileNav />
        </nav>
      </div>
      <ProtectedNav />
    </div>
  )
}

function MobileNav() {
  return (
    <div className="flex items-center justify-center lg:hidden">
      <div className="block">
        <Menu>
          {({ isExpanded }) => {
            const state = isExpanded ? 'open' : 'closed'
            return (
              <>
                <MenuButton className="focus:border-primary hover:border-primary border-secondary text-primary inline-flex h-12 w-12 items-center justify-center rounded-full border-2 p-1 transition focus:outline-none">
                  <BurgerMenu state={state} />
                </MenuButton>
                <MobileMenuList />
              </>
            )
          }}
        </Menu>
      </div>
    </div>
  )
}

function MobileMenuList() {
  const { isExpanded } = useMenuButtonContext()
  const shouldReduceMotion = useReducedMotion()
  const { user } = useRootData()
  return (
    <AnimatePresence>
      {isExpanded ? (
        <MenuPopover
          position={r => ({
            top: `calc(${Number(r?.top) + Number(r?.height)}px + 2.25rem)`, // 2.25 rem = py-9 from navbar
            left: 0,
            bottom: 0,
            right: 0,
          })}
          style={{ display: 'block' }}
          className="z-50"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{
              opacity: { duration: shouldReduceMotion ? 0 : 0.2 },
              rotate: { duration: shouldReduceMotion ? 0 : 0.5 },
              scale: { duration: shouldReduceMotion ? 0 : 0.5 },
              ease: 'linear',
            }}
            className="bg-primary fixed flex h-full w-full flex-col overflow-y-scroll pb-12 dark:border-gray-800"
          >
            <MenuItems className="border-none bg-transparent py-0">
              <h5 className="text border-t border-gray-800 px-5vw pb-4 pt-12 text-xs font-medium tracking-wider md:pb-6">
                NAVIGATION
              </h5>
              {MOBILE_LINKS.map(link => (
                <MobileNavLink
                  key={link.to}
                  to={link.to}
                  asParent={link.asParent}
                >
                  {link.name}
                </MobileNavLink>
              ))}
              {user && (
                <MenuLink className="hover:bg-secondary focus:bg-secondary text-primary pointers-none px-5vw py-2 text-left text-3xl font-medium dark:border-gray-800">
                  <form action="/logout" method="post">
                    <button
                      type="submit"
                      className="block whitespace-nowrap bg-red-100 text-lg font-medium text-red-800"
                    >
                      Log Out
                    </button>
                  </form>
                </MenuLink>
              )}
            </MenuItems>
          </motion.div>
        </MenuPopover>
      ) : null}
    </AnimatePresence>
  )
}

function MobileNavLink({
  to,
  asParent,
  children,
}: Omit<Parameters<typeof Link>['0'], 'to'> & {
  to?: string
  asParent: boolean
}) {
  const location = useLocation()
  const isSelected =
    to === location.pathname || location.pathname.startsWith(`${to}/`)

  if (to && !asParent) {
    return (
      <MenuLink
        className="hover:bg-secondary focus:bg-secondary text-primary px-5vw py-2 text-left text-3xl font-medium dark:border-gray-800"
        as={Link}
        to={to}
      >
        <div className="flex items-center justify-between">
          {children}
          {isSelected && <div className="h-2 w-2 bg-white"></div>}
        </div>
      </MenuLink>
    )
  }
  return <></>
}

function DesktopNav() {
  const { user } = useRootData()
  const [open, setOpen] = React.useState('')
  return (
    <ul className="-mr-5 hidden lg:flex lg:items-center">
      <NavigationMenu value={open} onValueChange={setOpen}>
        <NavigationMenuList>
          {LINKS.map(link => (
            <DesktopNavLink
              isOpen={Boolean(open)}
              closeContent={() => setOpen('')}
              key={link.name}
              to={link.to}
              child={link?.child}
              asParent={link.asParent}
            >
              {link.name}
            </DesktopNavLink>
          ))}
        </NavigationMenuList>
        <NavigationMenuViewport className="bg-gray-900" />
      </NavigationMenu>
      {user ? (
        <li className="px-4 py-2">
          <form action="/logout" method="post">
            <button
              type="submit"
              className="block w-fit whitespace-nowrap rounded-lg border-[1.5px] border-red-300 bg-red-100 px-3 pb-1.5 pt-1 text-md font-medium text-red-800 hover:border-red-500 hover:bg-red-200 hover:text-red-700"
            >
              Log out
            </button>
          </form>
        </li>
      ) : (
        <li className="px-4 py-2">
          <Link to="/login" prefetch="intent">
            <button
              type="button"
              className="text-secondary block w-fit whitespace-nowrap rounded-lg border border-gray-700 px-3 pb-1.5 pt-1 text-md font-medium hover:border-white hover:bg-gray-800 hover:text-white"
            >
              Log in
            </button>
          </Link>
        </li>
      )}
    </ul>
  )
}

function DesktopNavLink({
  to,
  child,
  asParent,
  isOpen,
  closeContent,
  children,
  ...rest
}: Omit<Parameters<typeof Link>['0'], 'to'> & {
  to?: string
  child?: { component: string | React.ReactNode }[]
  closeContent: () => void
  isOpen: boolean
  asParent: boolean
}) {
  const location = useLocation()
  const isSelected =
    to === location.pathname || location.pathname.startsWith(`${to}/`)

  if (asParent && child?.length) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger className="text-secondary w-full whitespace-nowrap px-3 pb-3 pt-2.5 text-md font-medium focus:outline-none data-[state=open]:text-white lg:tracking-wide">
          {children}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="w-full bg-gray-900 pt-3">
          {child.map((link, index) => (
            <li key={index} onClick={closeContent}>
              <NavigationMenuLink asChild key={index}>
                {link.component}
              </NavigationMenuLink>
            </li>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }
  if (to && !asParent) {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink>
          <Link
            prefetch="intent"
            to={to}
            className={clsx(
              'block whitespace-nowrap px-3 py-1.5 text-md font-medium hover:text-white focus:outline-none lg:tracking-wide',
              {
                active: isSelected,
                'text-secondary': !isSelected,
              },
            )}
            {...rest}
          >
            {children}
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  }
  return <></>
}

export function Logo({ withoutUnderlined, size = 'lg' }: { withoutUnderlined?: boolean, size?: 'md' | 'lg' }) {
  return (
    <Link
      prefetch="intent"
      to="/"
      className={clsx('block transition focus:outline-none', {
        '': withoutUnderlined,
        underlined: !withoutUnderlined,
      })}
    >
      <h1 className={clsx('whitespace-nowrap font-medium', {
        'text-2xl lg:text-3xl': size === 'lg',
        'text-lg lg:text-xl': size === 'md',
      })}>
        ommiputera
        <span className="ml-[1px] text-md font-light text-gray-100">.com</span>
      </h1>
    </Link>
  )
}

function ProtectedNav() {
  const { user } = useRootData()

  if (!user) return <></>
  if (user.role === 'BASIC') return <ProtectedNavItems links={USER_LINKS} />
  return <ProtectedNavItems links={OWNER_LINKS} />
}

function ProtectedNavItems({ links }: { links: { name: string; to: string }[] }) {
  const { user } = useRootData()
  const location = useLocation()
  const isHideNavbar = ROUTE_WITHOUT_NAVBAR.includes('ALL')

  const handleMode = () => {
    const indexOfALL = ROUTE_WITHOUT_NAVBAR.indexOf('ALL')
    if (!isHideNavbar) {
      ROUTE_WITHOUT_NAVBAR.push('ALL')
    } else {
      ROUTE_WITHOUT_NAVBAR.splice(indexOfALL, 1)
    }
  }

  if (!user) return <></>
  return (
    <>
      {isHideNavbar && (
        <div className="absolute h-[54px] w-screen bg-black"></div>
      )}
      <div
        className={clsx(
          'no-scrollbar z-10 overflow-y-hidden overflow-x-scroll border-b border-gray-800 bg-black px-5vw lg:px-[4vw]',
          { 'glass sticky top-0 pb-0 pt-4': isHideNavbar },
        )}
      >
        <nav className="text-primary mx-auto flex max-w-[1636px] items-center justify-between gap-x-4">
          <ul className="-mx-2 flex gap-x-2">
            {isHideNavbar && (
              <li className="-mt-2 px-1.5">
                <Logo withoutUnderlined size='md' />
              </li>
            )}
            {links.map(link => (
              <ProtectedpNavLink key={link.to} to={link.to}>
                {link.name}
              </ProtectedpNavLink>
            ))}
          </ul>
          <ul className="flex gap-x-2 lg:-mx-2">
            <ProtectedpNavLink
              withoutUnderlined
              to={location.pathname}
              onClick={handleMode}
              className="text-secondary py-0 hover:text-white"
            >
              {isHideNavbar ? 'Show Navbar' : 'Hide Navbar'}
            </ProtectedpNavLink>
            <ProtectedpNavLink to="/me">
              {user.fullName || user.username} - {capitalize(user.role)}
            </ProtectedpNavLink>
          </ul>
        </nav>
      </div>
    </>
  )
}

function ProtectedpNavLink({
  to,
  children,
  withoutUnderlined,
  className,
  ...rest
}: Omit<Parameters<typeof Link>['0'], 'to'> & {
  to: string
  withoutUnderlined?: boolean
  className?: string
}) {
  const location = useLocation()
  const isSelected =
    to === location.pathname || location.pathname.startsWith(`${to}/`)
  return (
    <li className="mb-1 px-1.5">
      <Link
        prefetch="intent"
        to={to}
        className={clsx(
          'block whitespace-nowrap pb-3 text-md font-medium hover:text-white focus:outline-none lg:tracking-wide',
          {
            underlined: !withoutUnderlined,
            '': withoutUnderlined,
            active: isSelected,
            'text-secondary hover:after:h-0': !isSelected,
          },
          className,
        )}
        {...rest}
      >
        {children}
      </Link>
    </li>
  )
}

export { Index as Navbar }
