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
        "flex flex-col px-2 py-4 md:py-8 md:px-6 overflow-hidden cursor-pointer relative",
        className,
      )}
      onClick={() => (href ? router.push(href.toString()) : null)}
    >
      <div className="z-[2]">{children}</div>
      {withConnector && (
        <TimelineConnector
          className={cn(
            "left-7 md:left-11 top-14 z-[1] h-[calc(100%_-_44px)]",
            connectorClassName,
          )}
        />
      )}
    </section>
  );
}
