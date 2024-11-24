export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-[48px] -mt-3 flex flex-col gap-3 md:gap-4 bg-white dark:bg-black">
      {children}
    </div>
  );
}
