"use client";

import { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { TimelineConnector } from "~/components/ui/timeline";

import { cn } from "~/lib/utils";

export default function Section({
  children,
  href,
  className = "",
  withConnector = false,
}: {
  children: React.ReactNode;
  href?: LinkProps["href"];
  className?: string;
  withConnector?: boolean;
}) {
  const router = useRouter();
  return (
    <div
      className={cn(
        "flex flex-col px-4 py-8 md:p-6 overflow-hidden cursor-pointer relative",
        className,
      )}
      onClick={() => (href ? router.push(href.toString()) : null)}
    >
      {withConnector && (
        <TimelineConnector className="left-11 top-14 z-[1] h-[calc(100%_-_44px)]" />
      )}
      {children}
    </div>
  );
}
