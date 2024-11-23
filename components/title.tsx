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
      <div className="bg-white">{children}</div>
      <div
        className={cn(
          "min-h-10 flex flex-col justify-center gap-1 md:gap-0",
          description && "mt-1.5",
        )}
      >
        <h2 className="text-sm md:text-base font-bold tracking-normal leading-4 md:leading-5 max-w-[250px] md:max-w-[360px]">
          {text}
        </h2>
        {description && (
          <p className="text-xs md:text-sm text-neutral-500 mb-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
