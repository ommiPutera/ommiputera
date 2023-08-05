export default function MiniApp() {
  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:gap-12">
      <div className="flex grid-cols-7 flex-col items-center justify-between gap-5 lg:grid lg:flex-row lg:items-start xl:gap-x-48">
        <h1 className="col-span-4 text-center text-3xl font-normal leading-tight lg:text-left lg:text-5xl">
          I build useful <b className="font-semibold">applications</b>
        </h1>
        <p className="col-span-3 mt-2 text-center text-base font-normal text-gray-200 lg:mt-3 lg:text-left lg:text-lg">
          You can explore my recent work here, or view the complete project
          portfolio at
        </p>
      </div>
      <div className="flex flex-col gap-2 lg:gap-6"></div>
    </div>
  )
}
