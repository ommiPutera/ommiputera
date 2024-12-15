import Link, { type LinkProps } from "next/link";
import { Suspense } from "react";

import { cn } from "~/lib/utils";

export default function Content({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="ml-[48px] md:ml-[52px] -mt-10 flex flex-col gap-3 md:gap-4 bg-white dark:bg-black">
      <div>
        <ContentTitle title={title} description={description} />
        {children}
      </div>
    </div>
  );
}

export function ContentTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <>
      <h2
        className={cn(
          "text-sm font-bold text-black dark:text-white tracking-normal md:leading-4 mt-0.5 md:mt-1",
          !description && "mb-1 md:mb-1.5",
        )}
      >
        {title}
      </h2>
      {description && (
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mb-1 md:mt-1">
            {description}
          </p>
        </Suspense>
      )}
    </>
  );
}

export function ContentParagraph({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-sm prose dark:prose-invert font-medium", className)}>
      {children}
    </p>
  );
}

type AnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;
export function ContentLink({
  text,
  ...props
}: LinkProps & AnchorProps & { text: string }) {
  return (
    <Link
      className="text-sm font-semibold text-blue-600 dark:text-blue-400 underline"
      {...props}
    >
      {text}
    </Link>
  );
}
