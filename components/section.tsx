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
}: {
  children: React.ReactNode;
  href?: LinkProps["href"];
  className?: string;
  connectorClassName?: string;
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
      <div className="z-[2]">{children}</div>
      {withConnector && (
        <TimelineConnector
          className={cn(
            "left-9 md:left-11 top-14 z-[1] h-[calc(100%_-_44px)]",
            connectorClassName,
          )}
        />
      )}
    </div>
  );
}
