import { Menu } from '@headlessui/react'
import { Link, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { includes, some } from 'lodash'
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
import { LogOut, MoonIcon, MoreHorizontal, SunIcon, Wallet2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './shadcn/dropdown-menu'
import { UIButton } from './shadcn/button'
import { ButtonLink } from './button'
import { Profile } from './me'
import { Theme, Themed, useTheme } from '~/utils/theme-provider'

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
    '/intro/cashflow' === location.pathname ||
    location.pathname.startsWith(`/cash-flow`)
  return (
    <div className="grid w-[420px] grid-cols-1 gap-x-2 px-3 pb-3.5">
      <Link
        to="/intro/cashflow"
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
    name: 'Free Products',
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
  { name: 'Blog', to: '/blog', asParent: false },
  { name: 'Project', to: '/project', asParent: false },
  { name: 'About', to: '/about', asParent: false },
]

const USER_LINKS = [
  { name: 'Personal Finance', to: '/cash-flow', Icon: <Wallet2 size={18} /> },
]
const OWNER_LINKS = [
  { name: 'Overview', to: '/overview' },
  { name: 'Admin Panel', to: '/admin' },
  ...USER_LINKS,
]
const MOBILE_LINKS = [{ name: 'Home', to: '/', asParent: false }, ...LINKS]
const ROUTE_WITHOUT_NAVBAR = ['/login', '/cash-flow']

function Index() {
  const { user } = useRootData()
  const location = useLocation()
  const isShowNavbar = some(ROUTE_WITHOUT_NAVBAR, el =>
    includes(location.pathname, el),
  )

  if (isShowNavbar) return <></>
  if (!user) return <PublicRoute />
  return <ProtectedRoute />
}

function PublicRoute() {
  const { user } = useRootData()
  return (
    <div className="relative">
      <div
        className={clsx(
          'z-[2] px-5vw py-9 lg:px-10vw lg:py-8',
          {
            'dark:bg-gray-900': !user,
            'bg-black': user,
          },
        )}
      >
        <nav className="text-primary mx-auto flex max-w-7xl items-center justify-between">
          <Logo />
          <DesktopNav />
          <MobileNav />
        </nav>
      </div>
    </div>
  )
}

function ProtectedRoute() {
  const { user } = useRootData()
  const [links] = React.useState<{ name: string; to: string; Icon?: JSX.Element | React.ReactNode }[]>(user?.role === 'BASIC' ? USER_LINKS : OWNER_LINKS)
  return (
    <div className="relative">
      <div
        className={clsx(
          'z-[2] px-5vw py-9 lg:px-10vw lg:py-8',
          {
            'dark:bg-gray-900': !user,
            'bg-gray-100 dark:bg-black': user,
          },
        )}
      >
        <nav className="text-primary mx-auto flex max-w-7xl my-0 md:my-[11.5px] items-center justify-between">
          <Logo />
          <div className='hidden md:block items-center justify-end lg:flex'>
            {links.map(link => (
              <ProtectedpNavLink key={link.to} to={link.to} Icon={link?.Icon}>
                {link.name}
              </ProtectedpNavLink>
            ))}
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
      // don't use overflow-hidden, as that toggles the scrollbar and causes layout shift
      document.body.classList.add('fixed')
      document.body.classList.add('overflow-y-scroll')
      // alternatively, get bounding box of the menu, and set body height to that.
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
              className="fixed flex h-full w-full flex-col overflow-y-scroll mt-12 bg-white dark:bg-gray-900 pb-12 dark:border-gray-100"
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
        <div className="m-0 flex items-center justify-between border-t border-gray-200 dark:border-gray-600 px-5vw py-10 text-md">
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
  return (
    <ul className="hidden lg:flex lg:items-center">
      <NavigationMenu value={open} onValueChange={setOpen}>
        <NavigationMenuList className="">
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
      <li className="px-2 py-2">
        <Link to="/login" prefetch="intent">
          <button
            type="button"
            className="flex items-center gap-x-2 rounded-full bg-gray-100 border-2 border-gray-200 hover:border-black dark:border-gray-600 dark:hover:border-gray-200 dark:bg-gray-800 px-4 py-1.5"
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
  const location = useLocation()
  const isSelected =
    to === location.pathname || location.pathname.startsWith(`${to}/`)

  if (asParent && child?.length) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger className="w-full whitespace-nowrap px-4 pb-3 pt-2.5 text-md font-medium text-gray-400 hover:text-black focus:outline-none dark:data-[state=open]:text-white dark:text-gray-300 hover:dark:text-white lg:tracking-wide">
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
              'block whitespace-nowrap px-4 py-1.5 text-md font-medium text-gray-400 hover:text-black focus:outline-none dark:text-gray-300 hover:dark:text-white lg:tracking-wide',
              {
                active: isSelected,
                'text-black': !isSelected,
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
      className={clsx('block transition focus:outline-none', className)}
    >
      <p
        className={clsx('whitespace-nowrap font-medium leading-none text-black dark:text-white', {
          'text-2xl lg:text-3xl': size === 'lg',
          'text-lg lg:text-2xl': size === 'md',
          'text-md': size === 'xs',
        })}
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
          className="flex items-center rounded-md px-2 hover:bg-gray-600"
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
    <DropdownMenuContent className="">
      <DropdownMenuLabel className="px-2">
        <p className="font-semibold">View Options</p>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup className="p-1">
        <form action="/logout" method="post">
          <UIButton
            variant="subtle"
            type="submit"
            className="w-full cursor-default"
          >
            <DropdownMenuItem className="w-full rounded-md border border-transparent px-2 hover:border-red-300 hover:bg-red-200">
              <div className="flex items-center gap-x-2">
                <LogOut size={18} className="text-red-800" />
                <p className="text-red-800">Log Out</p>
              </div>
            </DropdownMenuItem>
          </UIButton>
        </form>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  )
}

function ProtectedpNavLink({
  to,
  children,
  className,
  Icon,
  ...rest
}: Omit<Parameters<typeof Link>['0'], 'to'> & {
  to: string
  className?: string
  Icon?: JSX.Element | React.ReactNode
}) {
  const location = useLocation()
  const isSelected =
    to === location.pathname || location.pathname.startsWith(`${to}/`)
  return (
    <ButtonLink
      type="button"
      size="sm"
      variant="subtle"
      to={to}
      prefetch="intent"
      className={clsx(
        'flex items-center gap-x-2 hover:bg-gray-800 hover:text-white',
        {
          'text-secondary': !isSelected,
          'text-white': isSelected,
        },
      )}
      {...rest}
    >
      {Icon}
      <p>{children}</p>
    </ButtonLink>
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
    return () => clearTimeout(timer);
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
        'focus:border-secondary inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full p-1 transition focus:outline-none',
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

export { Index as Navbar }
