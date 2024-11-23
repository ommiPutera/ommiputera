export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-2 md:pl-[48px] md:pt-0 flex flex-col gap-4 bg-white">
      {children}
    </div>
  );
}
