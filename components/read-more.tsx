import { ArrowUpRight } from "lucide-react";

import Link, { LinkProps } from "next/link";

export default function ReadMore({ href }: { href: LinkProps["href"] }) {
  return (
    <div className="mt-1 ml-[48px]">
      <Link
        href={href}
        prefetch
        className="text-sm font-semibold text-blue-700 dark:text-blue-500 underline inline-flex items-center gap-1"
      >
        <span>Read more</span>
        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
      </Link>
    </div>
  );
}
