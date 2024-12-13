import { Globe } from "lucide-react";

import Link, { LinkProps } from "next/link";

export function Website({ href }: { href: LinkProps["href"] }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="text-sm font-semibold text-blue-600 dark:text-blue-400 underline inline-flex items-center gap-1"
    >
      <Globe className="w-4 h-4 md:w-5 md:h-5" />
      <span>Website</span>
    </Link>
  );
}
