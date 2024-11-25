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
          <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mb-1.5">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
