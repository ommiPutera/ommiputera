import { Link } from "@remix-run/react";

const LINKS = [{ name: "Post", to: "/post" }];

function Navbar() {
  return (
    <nav className="text-primary mx-auto flex max-w-8xl items-center justify-between">
      NavbarIndex
      <ul className="hidden lg:flex">
        {LINKS.map((link) => (
          <NavLink key={link.to} to={link.to}>
            {link.name}
          </NavLink>
        ))}
      </ul>
    </nav>
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

export { Navbar };
