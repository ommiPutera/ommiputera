export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-[48px] -mt-3 md:mt-0 flex flex-col gap-4 bg-white">
      {children}
    </div>
  );
}
