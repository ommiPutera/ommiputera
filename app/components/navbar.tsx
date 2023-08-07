import { Menu } from '@headlessui/react'
import { Link, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { LogOut, MoonIcon, MoreHorizontal, SunIcon } from 'lucide-react'
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '~/components/shadcn/navigation-menu'
import { BurgerMenu } from '~/utils/icons'
import { Theme, Themed, useTheme } from '~/utils/theme-provider'
import { useRootData } from '~/utils/use-root-data'
import { ButtonLink } from './button'
import { Profile } from './me'
import { UIButton } from './shadcn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './shadcn/dropdown-menu'
import { RowAdmin, RowProducts, RowSoftwares } from './menu-elements'
import { Badge } from './shadcn/badge'

type TypeLinks = {
  name: string | JSX.Element
  to?: string
  asParent: boolean
  child?: {
    component: string | React.ReactNode
  }[]
}[]

const LINKS: TypeLinks = [
  { name: 'Blog', to: '/blog', asParent: false },
  { name: 'Project', to: '/project', asParent: false },
  { name: 'About', to: '/about', asParent: false },
  {
    name: (
      <div className="flex gap-x-2">
        <div>Softwares</div>
        <Badge variant="success" size="xs">Free</Badge>
      </div>
    ),
    asParent: true,
    child: [{ component: <RowSoftwares /> }],
  },
  {
    name: 'Products',
    asParent: true,
    child: [{ component: <RowProducts /> }],
  },
]

const MOBILE_LINKS = [{ name: 'Home', to: '/', asParent: false }, ...LINKS]
const ROUTE_WITHOUT_NAVBAR = [
  '/login',
  '/cash-flow',
  '/personal-finance',
  '/personal-finance/analytics'
]

function Index() {
  const { user } = useRootData()
  const location = useLocation()
  const isShowNavbar = ROUTE_WITHOUT_NAVBAR.includes(location.pathname)

  if (isShowNavbar) return <></>
  if (!user) return <PublicRoute />
  return <ProtectedRoute />
}

function PublicRoute() {
  const { user } = useRootData()
  return (
    <div className="relative">
      <div
        className={clsx('z-[2] px-5vw py-9 lg:px-10vw lg:py-8', {
          'dark:bg-gray-900': !user,
          'bg-black': user,
        })}
      >
        <nav className="text-primary mx-auto flex max-w-5xl items-center justify-between">
          <Logo />
          <DesktopNav />
          <MobileNav />
        </nav>
      </div>
    </div>
  )
}

function ProtectedRoute({ children }: { children?: JSX.Element | React.ReactNode }) {
  const { user } = useRootData()
  const location = useLocation()
  const isSelected = (to: string) => location.pathname === to
  const isOwner = user?.role == 'OWNER'
  return (
    <div className="relative">
      <div
        className={clsx('z-[2] px-5vw py-9 lg:px-10vw lg:py-8', {
          'dark:bg-gray-900': !user,
          'bg-gray-100 dark:bg-black': user,
        })}
      >
        <nav className="text-primary mx-auto my-0 flex max-w-5xl items-center justify-between md:my-[11.5px]">
          <div className="relative hidden items-center justify-end md:block lg:flex">
            <div className="mr-3">
              <Logo />
            </div>
            {
              children ?
                children
                :
                <>
                  {isOwner && (
                    <div className="px-2">
                      <ButtonLink
                        type="button"
                        size="sm"
                        variant="subtle"
                        to="/overview"
                        prefetch="intent"
                        className={clsx(
                          'flex items-center gap-x-2 hover:text-black hover:dark:text-white',
                          {
                            'text-gray-400 dark:text-gray-300':
                              !isSelected('/overview'),
                            'text-black dark:text-white': isSelected('/overview'),
                          },
                        )}
                      >
                        <p className="text-md">Overview</p>
                      </ButtonLink>
                    </div>
                  )}
                  <div>
                    <NavigationMenu>
                      <NavigationMenuList>
                        {isOwner && (
                          <NavigationMenuItem>
                            <NavigationMenuTrigger className="w-full whitespace-nowrap px-2 pb-3 pt-2.5 text-md font-medium text-gray-400 hover:text-black focus:outline-none dark:text-gray-300 hover:dark:text-white dark:data-[state=open]:text-white lg:tracking-wide">
                              Admin
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="bg-white pb-[8px] pl-[6px] pr-[8px] pt-[6px] dark:bg-gray-900">
                              <RowAdmin />
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        )}
                        <NavigationMenuItem>
                          <NavigationMenuTrigger className="w-full whitespace-nowrap px-2 pb-3 pt-2.5 text-md font-medium text-gray-400 hover:text-black focus:outline-none dark:text-gray-300 hover:dark:text-white dark:data-[state=open]:text-white lg:tracking-wide">
                            Softwares
                          </NavigationMenuTrigger>
                          <NavigationMenuContent className="bg-white pb-[8px] pl-[6px] pr-[8px] pt-[6px] dark:bg-gray-900">
                            <RowSoftwares />
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  </div>
                </>
            }
          </div>
          <div className="flex items-center justify-center gap-x-2">
            <DarkModeToggle />
            <Profile />
            <MoreAction />
          </div>
          <MobileNav />
        </nav>
      </div>
    </div>
  )
}

function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className="flex items-center justify-end lg:hidden">
      <div className="flex items-center gap-x-2">
        <div className="text-primary inline-flex h-12 w-12 items-center justify-center rounded-full p-1 transition focus:outline-none">
          <DarkModeToggle />
        </div>
        <Menu>
          <Menu.Button className="focus:border-primary hover:border-primary border-secondary text-primary inline-flex h-12 w-12 items-center justify-center rounded-full border-2 p-1 transition focus:outline-none">
            {({ open }) => {
              const state = open ? 'open' : 'closed'
              setIsOpen(open)
              return <BurgerMenu state={state} />
            }}
          </Menu.Button>
          <MobileMenuList isOpen={isOpen} />
        </Menu>
      </div>
    </div>
  )
}

function MobileMenuList({ isOpen }: { isOpen: boolean }) {
  const shouldReduceMotion = useReducedMotion()
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('fixed')
      document.body.classList.add('overflow-y-scroll')
      document.body.style.height = '100vh'
    } else {
      document.body.classList.remove('fixed')
      document.body.classList.remove('overflow-y-scroll')
      document.body.style.removeProperty('height')
    }
  }, [isOpen])
  return (
    <AnimatePresence>
      <Menu.Items
        className="absolute left-0 right-0 z-[9999] mt-8 w-full origin-top-right rounded-md bg-white shadow-lg focus:outline-none"
        as="div"
      >
        {({ open }) => {
          const state = open ? 'open' : 'closed'
          if (state === 'closed') return <></>
          return (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{
                opacity: { duration: shouldReduceMotion ? 0 : 0.2 },
                rotate: { duration: shouldReduceMotion ? 0 : 0.5 },
                scale: { duration: shouldReduceMotion ? 0 : 0.5 },
                ease: 'linear',
              }}
              className="fixed mt-12 flex h-full w-full flex-col overflow-y-scroll bg-white pb-12 dark:border-gray-100 dark:bg-gray-900"
            >
              <div className="border-none bg-transparent">
                {MOBILE_LINKS.map(link => (
                  <MobileNavLink
                    key={link.to}
                    to={link.to}
                    asParent={link.asParent}
                  >
                    {link.name}
                  </MobileNavLink>
                ))}
              </div>
            </motion.div>
          )
        }}
      </Menu.Items>
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
  const isSelected = Boolean(
    to === location.pathname || location.pathname.startsWith(`${to}/`),
  )

  if (to && !asParent) {
    return (
      <Menu.Item as={Link} to={to}>
        <div className="m-0 flex items-center justify-between border-t border-gray-200 px-5vw py-10 text-md dark:border-gray-600">
          {children}
          {isSelected && <div className="h-2 w-2 rounded-full bg-white"></div>}
        </div>
      </Menu.Item>
    )
  }
  return <></>
}

function DesktopNav() {
  const [open, setOpen] = React.useState('')
  const location = useLocation()
  const isSelected = (to?: string) =>
    to === location.pathname || location.pathname.startsWith(`${to}/`)
  return (
    <ul className="hidden lg:flex lg:items-center">
      <NavigationMenu value={open} onValueChange={setOpen}>
        <NavigationMenuList>
          {LINKS.map(link => (
            <DesktopNavLink
              isOpen={Boolean(open)}
              closeContent={() => setOpen('')}
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
      {LINKS.map(link => {
        if (link.asParent && link.child?.length) return <></>
        return (
          <Link
            key={link.to}
            prefetch="intent"
            to={link.to ?? ''}
            className={clsx(
              'block whitespace-nowrap px-4 py-1.5 text-md font-medium text-gray-400 hover:text-black focus:outline-none dark:text-gray-300 hover:dark:text-white lg:tracking-wide',
              {
                active: isSelected(link.to),
                'text-black': !isSelected(link?.to),
              },
            )}
          >
            {link.name}
          </Link>
        )
      })}
      <li className="px-2 py-2">
        <Link to="/login" prefetch="intent">
          <button
            type="button"
            className="flex items-center gap-x-2 rounded-full border-2 border-gray-200 bg-gray-100 px-4 py-1.5 hover:border-black dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-200"
          >
            <p className="text-sm font-medium">Log in</p>
          </button>
        </Link>
      </li>
      <li className="px-2 py-2">
        <DarkModeToggle />
      </li>
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
  if (asParent && child?.length) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger className="w-full whitespace-nowrap px-2 pb-3 pt-2.5 text-md font-medium text-gray-400 hover:text-black focus:outline-none dark:text-gray-300 hover:dark:text-white dark:data-[state=open]:text-white lg:tracking-wide">
          {children}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-white pb-[8px] pl-[6px] pr-[8px] pt-[6px] dark:bg-gray-900">
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
  return <></>
}

export function Logo({
  size = 'lg',
  className,
}: {
  size?: 'md' | 'lg' | 'xs'
  className?: string
}) {
  return (
    <Link
      prefetch="intent"
      to="/"
      className={clsx(
        'block pb-[10px] transition focus:outline-none',
        className,
      )}
    >
      <p
        className={clsx(
          'whitespace-nowrap font-medium leading-none text-black dark:text-white',
          {
            'text-3xl': size === 'lg',
            'text-lg lg:text-2xl': size === 'md',
            'text-md': size === 'xs',
          },
        )}
      >
        ommiputera
        <span
          className={clsx(
            'ml-[1px] font-light text-gray-700 dark:text-gray-100',
            {
              'text-md': size === 'lg',
              'text-sm': size === 'md',
              'text-[10px]': size === 'xs',
            },
          )}
        >
          .com
        </span>
      </p>
    </Link>
  )
}

function MoreAction() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UIButton
          size="sm"
          variant="subtle"
          className="flex items-center rounded-full px-2 hover:bg-gray-200 hover:dark:bg-gray-800"
        >
          <MoreHorizontal size={18} />
        </UIButton>
      </DropdownMenuTrigger>
      <MoreMenus />
    </DropdownMenu>
  )
}

function MoreMenus() {
  return (
    <DropdownMenuContent>
      <DropdownMenuLabel className="px-2">
        <p className="text-secondary px-1 py-1 text-sm font-normal">
          More Options
        </p>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup className="p-1">
        <form action="/logout" method="post">
          <UIButton
            variant="subtle"
            type="submit"
            className="w-full cursor-default"
          >
            <DropdownMenuItem className="w-full rounded-md border border-transparent px-2 hover:border-red-800 hover:dark:border-red-300 hover:bg-transparent hover:dark:bg-red-200">
              <div className="flex items-center gap-x-2">
                <LogOut size={18} className="text-red-700 dark:text-red-800" />
                <p className="text-red-700 dark:text-red-800">Log Out</p>
              </div>
            </DropdownMenuItem>
          </UIButton>
        </form>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  )
}

const iconTransformOrigin = { transformOrigin: '50% 100px' }
function DarkModeToggle({ variant = 'icon' }: { variant?: 'icon' | 'labelled' }) {
  const [, setTheme] = useTheme()
  const handleTransition = () => {
    document.body.classList.add('transition-none')
    const timer = setTimeout(() => {
      document.body.classList.remove('transition-none')
    }, 750)
    return () => clearTimeout(timer)
  }

  return (
    <button
      onClick={() => {
        setTheme(previousTheme =>
          previousTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK,
        )
        handleTransition()
      }}
      className={clsx(
        'focus:border-secondary inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full p-1 transition hover:bg-gray-200 focus:outline-none hover:dark:bg-gray-800',
        {
          '': variant === 'icon',
          'px-8': variant === 'labelled',
        },
      )}
    >
      <div className="relative h-5 w-5">
        <span
          className="absolute inset-0 flex rotate-90 transform items-center justify-center text-black transition duration-1000 dark:rotate-0 dark:text-white"
          style={iconTransformOrigin}
        >
          <MoonIcon />
        </span>
        <span
          className="absolute inset-0 flex rotate-0 transform items-center justify-center text-black transition duration-1000 dark:-rotate-90 dark:text-white"
          style={iconTransformOrigin}
        >
          <SunIcon />
        </span>
      </div>
      <span
        className={clsx('ml-4 text-black dark:text-white', {
          'sr-only': variant === 'icon',
        })}
      >
        <Themed dark="switch to light mode" light="switch to dark mode" />
      </span>
    </button>
  )
}

export { Index as Navbar, ProtectedRoute }
