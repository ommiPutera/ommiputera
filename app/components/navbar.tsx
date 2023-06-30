import {
  Menu,
  MenuButton,
  MenuItems,
  MenuLink,
  MenuPopover,
  useMenuButtonContext,
} from '@reach/menu-button'
import {Link, useLocation} from '@remix-run/react'
import clsx from 'clsx'
import {AnimatePresence, motion, useReducedMotion} from 'framer-motion'
import {capitalize} from 'lodash'
import {BurgerMenu} from '~/utils/icons'
import {useRootData} from '~/utils/use-root-data'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '~/components/shadcn/navigation-menu'

type TypeLinks = {
  name: string
  to?: string
  asParent: boolean
  child?: {
    layout: '1' | '2'
    component: string | React.ReactNode
    to: string
  }[]
}[]

const LinkDropDown = ({name, desc}: {name: string; desc: string}) => {
  return (
    <div className="min-w-[200px] max-w-[250px] rounded-lg px-5 pb-3 pt-2 hover:bg-gray-800">
      <p className="whitespace-nowrap text-md font-medium">{name}</p>
      <p className="mt-1 text-sm font-light leading-tight text-gray-300">
        {desc}
      </p>
    </div>
  )
}

const LINKS: TypeLinks = [
  {
    name: 'App',
    asParent: true,
    child: [
      {
        layout: '1',
        component: (
          <LinkDropDown
            name="Finance App"
            desc="A collection of links for navigating websites."
          />
        ),
        to: '/about',
      },
      {
        layout: '2',
        component: (
          <LinkDropDown
            name="Finance App"
            desc="A collection of links for navigating websites."
          />
        ),
        to: '/about',
      },
    ],
  },
  {
    name: 'App',
    asParent: true,
    child: [
      {
        layout: '1',
        component: (
          <LinkDropDown
            name="Finance Appaaaxxxxxxxxxx"
            desc="A collection of links for navigating websites."
          />
        ),
        to: '/about',
      },
      {
        layout: '2',
        component: (
          <LinkDropDown
            name="Finance App"
            desc="A collection of links for navigating websites."
          />
        ),
        to: '/about',
      },
    ],
  },
  {name: 'Project', to: '/project', asParent: false},
  {name: 'About', to: '/about', asParent: false},
]

const OWNERLINKS = [
  {name: 'Dashboard', to: '/dashboard'},
  {name: 'Admin Panel', to: '/admin'},
]

const MOBILE_LINKS = [{name: 'Home', to: '/', asParent: false}, ...LINKS]

function Index() {
  const {user} = useRootData()
  return (
    <>
      <div
        className={clsx('px-5vw py-9 lg:px-10vw lg:py-12', {
          'bg-black lg:pb-6 lg:pt-12': user,
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
      </div>
    </div>
  )
}

function MobileMenuList() {
  const {isExpanded} = useMenuButtonContext()
  const shouldReduceMotion = useReducedMotion()
  const {user} = useRootData()
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
            className="bg-primary fixed flex h-full w-full flex-col overflow-y-scroll pb-12 dark:border-gray-600"
          >
            <MenuItems className="border-none bg-transparent py-0">
              <h5 className="text border-t border-gray-600 px-5vw pb-4 pt-12 text-xs font-medium tracking-wider md:pb-6">
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
                <MenuLink className="hover:bg-secondary focus:bg-secondary text-primary pointers-none px-5vw py-2 text-left text-3xl font-medium dark:border-gray-600">
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

  if (to && asParent) {
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
  return <></>
}

function DesktopNav() {
  const {user} = useRootData()
  return (
    <ul className="-mr-5 hidden lg:flex lg:items-center">
      <NavigationMenu>
        <NavigationMenuList>
          {LINKS.map(link => (
            <DesktopNavLink
              key={link.to}
              to={link.to}
              child={link?.child}
              asParent={link.asParent}
            >
              {link.name}
            </DesktopNavLink>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      {user && (
        <li className="px-5 py-2">
          <form action="/logout" method="post">
            <button
              type="submit"
              className="block whitespace-nowrap rounded-md border border-red-300 bg-red-100 px-4 pb-2 pt-1 text-lg font-medium text-red-800"
            >
              Log Out
            </button>
          </form>
        </li>
      )}
    </ul>
  )
}

function DesktopNavLink({
  to,
  child,
  asParent,
  children,
  ...rest
}: Omit<Parameters<typeof Link>['0'], 'to'> & {
  to?: string
  child?: {layout: '1' | '2'; component: string | React.ReactNode; to: string}[]
  asParent: boolean
}) {
  const location = useLocation()
  const isSelected =
    to === location.pathname || location.pathname.startsWith(`${to}/`)

  if (asParent && child?.length) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger
          className={clsx(
            'w-full whitespace-nowrap text-lg font-medium focus:outline-none lg:tracking-wide',
            {
              active: isSelected,
              'text-secondary': !isSelected,
            },
          )}
        >
          {children}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-gray-900 px-3 pb-3.5 pt-3">
          {child.map(link => (
            <Link
              key={link.to}
              prefetch="intent"
              to={link.to}
              className="block"
            >
              <NavigationMenuLink asChild>{link.component}</NavigationMenuLink>
            </Link>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }
  if (to && !asParent) {
    return (
      <NavigationMenuItem className="px-5 py-2">
        <NavigationMenuLink>
          <Link
            prefetch="intent"
            to={to}
            className={clsx(
              'underlined block whitespace-nowrap text-lg font-medium focus:outline-none lg:tracking-wide',
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

function Logo() {
  return (
    <Link
      prefetch="intent"
      to="/"
      className="underlined block transition focus:outline-none"
    >
      <h1 className="whitespace-nowrap text-3xl font-medium">
        ommiputera
        <span className="ml-[1px] text-base font-light text-gray-100">
          .com
        </span>
      </h1>
    </Link>
  )
}

function ProtectedNav() {
  const {user} = useRootData()
  if (!user) return <></>
  return (
    <div className="no-scrollbar overflow-y-hidden overflow-x-scroll border-b border-gray-600 bg-black px-5vw lg:px-10vw">
      <nav className="text-primary mx-auto flex max-w-8xl items-center justify-between gap-x-4">
        <ul className="-mx-2 flex gap-x-2">
          {OWNERLINKS.map(link => (
            <ProtectedpNavLink key={link.to} to={link.to}>
              {link.name}
            </ProtectedpNavLink>
          ))}
        </ul>
        <ul className="lg:-mx-2">
          <ProtectedpNavLink to="/me">
            {user.fullName} - {capitalize(user.role)}
            <span className="ml-2 hidden text-xl lg:inline-block">🙂</span>
          </ProtectedpNavLink>
        </ul>
      </nav>
    </div>
  )
}

function ProtectedpNavLink({
  to,
  children,
  ...rest
}: Omit<Parameters<typeof Link>['0'], 'to'> & {to: string}) {
  const location = useLocation()
  const isSelected =
    to === location.pathname || location.pathname.startsWith(`${to}/`)
  return (
    <li className="mb-1 px-2">
      <Link
        prefetch="intent"
        to={to}
        className={clsx(
          'underlined block whitespace-nowrap pb-3 pt-1 text-md font-medium focus:outline-none lg:text-lg lg:tracking-wide',
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

export {Index as Navbar}
