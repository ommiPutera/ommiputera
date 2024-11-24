import { cn } from "~/lib/utils";

export default function Title({
  children,
  text,
  description,
}: {
  children: React.ReactNode;
  text: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="bg-white dark:bg-black">{children}</div>
      <div
        className={cn(
          "min-h-10 flex flex-col justify-center -mt-1 md:-mt-1.5",
          description && "mt-1.5 md:mt-0",
        )}
      >
        <h2 className="text-sm md:text-base font-bold tracking-normal">
          {text}
        </h2>
        {description && (
          <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mb-4 md:mb-5">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
