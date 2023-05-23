import { Link } from "@remix-run/react";

const LINKS = [
  { name: "Post", to: "/post" },
  { name: "About", to: "/about" },
];

function Index() {
  return (
    <div className="px-5vw py-9 lg:py-12">
      <nav className="text-primary mx-auto flex max-w-8xl items-center justify-between">
        <div className="flex justify-center gap-4 align-middle">
          <Link
            prefetch="intent"
            to="/"
            className="text-primary underlined block whitespace-nowrap text-2xl font-medium transition focus:outline-none"
          >
            <h4>ommiputera.com</h4>
          </Link>
        </div>

        <ul className="hidden lg:flex">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.name}
            </NavLink>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function NavLink({
  to,
  children,
  ...rest
}: Omit<Parameters<typeof Link>["0"], "to"> & { to: string }) {
  return (
    <li className="px-5 py-2">
      <Link prefetch="intent" to={to} {...rest}>
        {children}
      </Link>
    </li>
  );
}

export { Index as Navbar };
