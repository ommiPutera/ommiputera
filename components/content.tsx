import Link, { type LinkProps } from "next/link";

import { HTMLAttributes, Suspense } from "react";

import { cn } from "~/lib/utils";

export default function Content({
  children,
  title,
  description,
  className,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "ml-[48px] md:ml-[52px] -mt-10 flex flex-col gap-3 md:gap-4",
        className,
      )}
    >
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
          "text-sm font-bold text-black dark:text-white tracking-normal md:leading-4 md:mt-0.5",
          !description && "mb-0.5 md:mb-1",
        )}
      >
        {title}
      </h2>
      {description && (
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mb-1 md:mt-0.5">
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
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-sm prose dark:prose-invert font-normal md:font-medium",
        className,
      )}
      {...props}
    >
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
