import {Link} from '@remix-run/react'
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
              duration: shouldReduceMotion ? 0 : 0.15,
              ease: 'linear',
            }}
            className="bg-primary flex h-full flex-col overflow-y-scroll border-t border-gray-200 pb-12 dark:border-gray-600"
          >
            <MenuItems className="border-none bg-transparent p-0">
              {MOBILE_LINKS.map(link => (
                <MenuLink
                  className="hover:bg-secondary focus:bg-secondary text-primary border-b border-gray-200 px-5vw py-9 text-center text-base dark:border-gray-600"
                  key={link.to}
                  as={Link}
                  to={link.to}
                >
                  {link.name}
                </MenuLink>
              ))}
            </MenuItems>
          </motion.div>
        </MenuPopover>
      ) : null}
    </AnimatePresence>
  )
}

function DesktopNav() {
  return (
    <ul className="hidden lg:flex">
      {LINKS.map(link => (
        <NavLink key={link.to} to={link.to} className="underlined">
          {link.name}
        </NavLink>
      ))}
    </ul>
  )
}

function NavLink({
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
      className="block whitespace-nowrap text-xl transition focus:outline-none"
    >
      <h1>ommiputera.com</h1>
    </Link>
  )
}

export {Index as Navbar}
