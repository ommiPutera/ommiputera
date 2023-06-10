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
import { BurgerMenu } from '~/utils/icons'
import { useRootData } from '~/utils/use-root-data'

const LINKS = [
  { name: 'Post', to: '/post' },
  { name: 'About', to: '/about' },
]

const OWNERLINKS = [
  { name: 'Dashboard', to: '/dashboard' },
  { name: 'Admin Panel', to: '/admin' },
]

const MOBILE_LINKS = [{ name: 'Home', to: '/' }, ...LINKS]

function Index() {
  const { user } = useRootData()
  return (
    <>
      <div
        className={clsx('px-5vw py-9 lg:px-15vw lg:py-12', {
          'bg-black lg:pt-12 lg:pb-6': user
        })}
      >
        <nav className="text-primary mx-auto flex max-w-8xl items-center justify-between">
          <Logo />
          <DesktopNav />
          <MobileNav />
        </nav>
      </div>
      <ProtectedNav />
    </>
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
            className="bg-primary fixed flex h-full w-full flex-col overflow-y-scroll pb-12 dark:border-gray-600"
          >
            <MenuItems className="border-none bg-transparent py-0">
              <h5 className="text border-t border-gray-600 px-5vw pb-4 pt-12 text-xs font-medium tracking-wider md:pb-6">
                NAVIGATION
              </h5>
              {MOBILE_LINKS.map(link => (
                <MobileNavLink key={link.to} to={link.to}>
                  {link.name}
                </MobileNavLink>
              ))}
              {user && (
                <MenuLink className="hover:bg-secondary focus:bg-secondary text-primary pointers-none px-5vw py-2 text-left text-3xl font-medium dark:border-gray-600">
                  <form action="/logout" method="post">
                    <button
                      type="submit"
                      className="block whitespace-nowrap text-lg font-medium text-red-500"
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
  children,
}: Omit<Parameters<typeof Link>['0'], 'to'> & { to: string }) {
  const location = useLocation()
  const isSelected =
    to === location.pathname || location.pathname.startsWith(`${to}/`)
  return (
    <MenuLink
      className="hover:bg-secondary focus:bg-secondary text-primary px-5vw py-2 text-left text-3xl font-medium dark:border-gray-600"
      as={Link}
      to={to}
    >
      <div className="flex items-center justify-between">
        {children}
        {isSelected && <div className="h-2 w-2 rounded-full bg-white"></div>}
      </div>
    </MenuLink>
  )
}

function DesktopNav() {
  const { user } = useRootData()
  return (
    <ul className="hidden lg:flex">
      {LINKS.map(link => (
        <DesktopNavLink key={link.to} to={link.to}>
          {link.name}
        </DesktopNavLink>
      ))}
      {user && 
        <li className="px-5 py-2">
          <form action="/logout" method="post">
            <button
              type="submit"
              className="block whitespace-nowrap text-lg font-medium text-red-500"
            >
              Log Out
            </button>
          </form>
        </li>
      }
    </ul>
  )
}

function DesktopNavLink({
  to,
  children,
  ...rest
}: Omit<Parameters<typeof Link>['0'], 'to'> & { to: string }) {
  const location = useLocation()
  const isSelected =
    to === location.pathname || location.pathname.startsWith(`${to}/`)
  return (
    <li className="px-5 py-2">
      <Link
        prefetch="intent"
        to={to}
        className={clsx(
          'underlined hover:text-team-current focus:text-team-current block whitespace-nowrap text-lg font-medium focus:outline-none',
          {
            active: isSelected,
            'text-secondary': !isSelected,
          },
        )}
        {...rest}
      >
        {children}
      </Link>
    </li>
  )
}

function Logo() {
  return (
    <Link
      prefetch="intent"
      to="/"
      className="underlined block transition focus:outline-none"
    >
      <h1 className="whitespace-nowrap text-2xl font-medium">ommiputera</h1>
    </Link>
  )
}

function ProtectedNav() {
  const { user } = useRootData()
  if (!user) return <></>
  return (
    <div className='px-5vw lg:px-15vw border-b border-gray-600 bg-black overflow-x-scroll overflow-y-hidden no-scrollbar'>
      <nav className="text-primary mx-auto flex max-w-8xl items-center justify-between">
        <ul className="flex -mx-2 gap-x-2">
          {OWNERLINKS.map(link => (
            <ProtectedpNavLink key={link.to} to={link.to}>
              {link.name}
            </ProtectedpNavLink>
          ))}
        </ul>
      </nav>
    </div>
  )
}

function ProtectedpNavLink({
  to,
  children,
  ...rest
}: Omit<Parameters<typeof Link>['0'], 'to'> & { to: string }) {
  const location = useLocation()
  const isSelected =
    to === location.pathname || location.pathname.startsWith(`${to}/`)
  return (
    <li className="mb-1 px-2">
      <Link
        prefetch="intent"
        to={to}
        className={clsx(
          'block whitespace-nowrap underlined pt-1 pb-4 text-md lg:text-md font-medium focus:outline-none',
          {
            active: isSelected,
            'text-secondary hover:after:h-0': !isSelected,
          },
        )}
        {...rest}
      >
        {children}
      </Link>
    </li>
  )
}


export { Index as Navbar }
