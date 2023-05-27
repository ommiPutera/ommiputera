import {Link, useLocation} from '@remix-run/react'
import {
  Menu,
  MenuButton,
  MenuLink,
  useMenuButtonContext,
  MenuPopover,
  MenuItems,
} from '@reach/menu-button'
import {BurgerMenu} from '~/utils/icons'
import {AnimatePresence, useReducedMotion, motion} from 'framer-motion'

const LINKS = [
  {name: 'Post', to: '/post'},
  {name: 'About', to: '/about'},
]

const MOBILE_LINKS = [{name: 'Home', to: '/'}, ...LINKS]

function Index() {
  return (
    <div className="px-5vw py-9 lg:py-12">
      <nav className="text-primary mx-auto flex max-w-8xl items-center justify-between">
        <Logo />
        <DesktopNav />
        <MobileNav />
      </nav>
    </div>
  )
}

function MobileNav() {
  return (
    <div className="flex items-center justify-center lg:hidden">
      <div className="block ">
        <MobileMenu />
      </div>
    </div>
  )
}

function MobileMenu() {
  return (
    <Menu>
      {({isExpanded}) => {
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
  )
}

function MobileMenuList() {
  const {isExpanded} = useMenuButtonContext()
  const shouldReduceMotion = useReducedMotion()
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
          style={{display: 'block'}}
          className="z-50"
        >
          <motion.div
            initial={{y: -50, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            exit={{y: -50, opacity: 0}}
            transition={{
              opacity: {duration: shouldReduceMotion ? 0 : 0.2},
              rotate: {duration: shouldReduceMotion ? 0 : 0.5},
              scale: {duration: shouldReduceMotion ? 0 : 0.5},
              ease: 'linear',
            }}
            className="bg-primary flex h-full flex-col overflow-y-scroll pb-12 dark:border-gray-600"
          >
            <MenuItems className="border-none bg-transparent p-0">
              <h5 className="text px-5vw pb-4 text-xs font-medium tracking-wider text-gray-200">
                NAVIGATION
              </h5>
              {MOBILE_LINKS.map(link => (
                <MobileNavLink key={link.to} to={link.to}>
                  {link.name}
                </MobileNavLink>
              ))}
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
}: Omit<Parameters<typeof Link>['0'], 'to'> & {to: string}) {
  const location = useLocation()
  return (
    <MenuLink
      className="hover:bg-secondary focus:bg-secondary text-primary px-5vw py-0 text-left text-4xl font-light dark:border-gray-600"
      as={Link}
      to={to}
    >
      <div className="flex items-center justify-between">
        {children}
        {location.pathname === to && (
          <div className="h-2 w-2 rounded-full bg-white"></div>
        )}
      </div>
    </MenuLink>
  )
}

function DesktopNav() {
  return (
    <ul className="hidden lg:flex">
      {LINKS.map(link => (
        <DesktopNavLink key={link.to} to={link.to} className="underlined">
          {link.name}
        </DesktopNavLink>
      ))}
    </ul>
  )
}

function DesktopNavLink({
  to,
  children,
  ...rest
}: Omit<Parameters<typeof Link>['0'], 'to'> & {to: string}) {
  return (
    <li className="px-5 py-2">
      <Link prefetch="intent" to={to} {...rest}>
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
      className="block whitespace-nowrap text-xl font-medium transition focus:outline-none"
    >
      <h1>ommiputera.com</h1>
    </Link>
  )
}

export {Index as Navbar}
