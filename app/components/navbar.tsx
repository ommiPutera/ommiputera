import {Link} from '@remix-run/react'

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
      </nav>
    </div>
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
