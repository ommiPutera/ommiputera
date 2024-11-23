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
    <div className="flex items-start gap-2 md:gap-2 bg-white">
      {children}
      <div className="min-h-10 flex flex-col justify-center gap-1">
        <h2 className="text-sm md:text-base font-bold tracking-normal md:leading-5 max-w-[280px] md:max-w-[360px]">
          {text}
        </h2>
        {description && (
          <p className="text-xs text-neutral-500">{description}</p>
        )}
      </div>
    </div>
  );
}
