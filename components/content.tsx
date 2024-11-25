import { Suspense } from "react";

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
    <div className="ml-[48px] -mt-10 flex flex-col gap-3 md:gap-4 bg-white dark:bg-black">
      <div>
        <h2 className="text-sm md:text-base font-bold tracking-normal">
          {title}
        </h2>
        {description && (
          <Suspense fallback={<p className="h-5" />}>
            <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mb-1.5">
              {description}
            </p>
          </Suspense>
        )}
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
      <h2 className="text-[15px] leading-5 break-all md:text-base font-bold tracking-normal md:leading-4 mt-0.5 md:mt-0">
        {title}
      </h2>
      {description && (
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mb-1.5">
            {description}
          </p>
        </Suspense>
      )}
    </>
  );
}
