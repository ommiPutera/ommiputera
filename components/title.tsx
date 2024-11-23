export default function Title({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 md:gap-2 bg-white">
      {children}
      <h2 className="text-sm md:text-base font-bold tracking-tight">{text}</h2>
    </div>
  );
}
