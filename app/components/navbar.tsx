import {Link} from '@remix-run/react'
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuLink,
} from '@reach/menu-button'
import {motion, useReducedMotion} from 'framer-motion'

const LINKS = [
  {name: 'Post', to: '/post'},
  {name: 'About', to: '/about'},
]

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

const topVariants = {
  open: {rotate: 45, y: 7, originX: '16px', originY: '10px'},
  closed: {rotate: 0, y: 0, originX: 0, originY: 0},
}

const centerVariants = {
  open: {opacity: 0},
  closed: {opacity: 1},
}

const bottomVariants = {
  open: {rotate: -45, y: -5, originX: '16px', originY: '22px'},
  closed: {rotate: 0, y: 0, originX: 0, originY: 0},
}

function MobileMenu() {
  const shouldReduceMotion = useReducedMotion()
  const transition = shouldReduceMotion ? {duration: 0} : {}
  return (
    <Menu>
      {({isExpanded}) => {
        const state = isExpanded ? 'open' : 'closed'
        return (
          <>
            <MenuButton className="focus:border-primary hover:border-primary border-secondary text-primary inline-flex h-12 w-12 items-center justify-center rounded-full border-2 p-1 transition focus:outline-none">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.rect
                  animate={state}
                  variants={topVariants}
                  transition={transition}
                  x="6"
                  y="9"
                  width="20"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
                <motion.rect
                  animate={state}
                  variants={centerVariants}
                  transition={transition}
                  x="6"
                  y="15"
                  width="20"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
                <motion.rect
                  animate={state}
                  variants={bottomVariants}
                  transition={transition}
                  x="6"
                  y="21"
                  width="20"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
            </MenuButton>
          </>
        )
      }}
    </Menu>
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
      className="ml-2 block whitespace-nowrap text-xl transition focus:outline-none"
    >
      <h1>ommiputera.com</h1>
    </Link>
  )
}

export {Index as Navbar}
