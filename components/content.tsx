export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-[48px] -mt-3 md:-mt-1 flex flex-col gap-2 bg-white">
      {children}
    </div>
  );
}
