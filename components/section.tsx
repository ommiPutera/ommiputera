"use client";

import { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { TimelineConnector } from "~/components/ui/timeline";

import { cn } from "~/lib/utils";

export default function Section({
  children,
  href,
  className = "",
  connectorClassName = "",
  withConnector = false,
  id,
}: {
  children: React.ReactNode;
  href?: LinkProps["href"];
  className?: string;
  connectorClassName?: string;
  withConnector?: boolean;
  id?: string;
}) {
  const router = useRouter();
  return (
    <section
      id={id}
      className={cn(
        "flex flex-col p-3 md:py-8 md:px-6 overflow-hidden relative",
        className,
      )}
      onClick={() => (href ? router.push(href.toString()) : null)}
    >
      <div className="z-[2]">{children}</div>
      {withConnector && (
        <TimelineConnector
          className={cn(
            "left-8 md:left-11 top-11 md:top-9 z-[1] h-[calc(100%_-_44px)]",
            connectorClassName,
          )}
        />
      )}
    </section>
  );
}

export function SectionAvatar({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 h-10 bg-neutral-100 dark:bg-neutral-800 w-10 flex justify-center items-center rounded-full">
      {children}
    </div>
  );
}
