import clsx from "clsx"
import { Plus, FolderClosed, FolderOpen, Info } from "lucide-react"
import { UIButton } from "~/components/shadcn/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/shadcn/tooltip"


type data = {
  name: string
  isClosed: boolean
}

const dataJSON: data[] = [
  {
    name: 'October 2022 first',
    isClosed: true,
  },
  {
    name: 'October 2022',
    isClosed: true,
  },
  {
    name: 'October 2022',
    isClosed: true,
  },
  {
    name: 'October 2022',
    isClosed: true,
  },
  {
    name: 'October 2022',
    isClosed: true,
  },
  {
    name: 'October 2022',
    isClosed: true,
  },
  {
    name: 'October 2022',
    isClosed: true,
  },
  {
    name: 'October 2022',
    isClosed: true,
  },
  {
    name: 'October 2022',
    isClosed: true,
  },
  {
    name: 'November 2022 last',
    isClosed: false,
  }
]

export default function Monthly() {
  return (
    <div className="">
      <div className="py-4 flex justify-between items-center">
        <div className="text-left">
          <h1 className="leading-tigh px-0 text-xl font-medium capitalize lg:text-lg">
            Monthly Expense
          </h1>
          <p className="text-secondary mt-1 text-md font-light">
            Query and visualize your Vercel usage.
          </p>
        </div>
        <NewMonth />
      </div>
      <div className="pb-4 md:hidden block border border-gray-800 rounded-md">
        tools
      </div>
      <div className="py-4 grid grid-cols-12 gap-x-5 md:gap-x-7">
        <div className="col-span-6 md:col-span-9">
          <div className="mb-3 py-4 hidden md:block border border-gray-800 rounded-md">
            tools
          </div>
          <div className="md:py-4 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-3">
            {dataJSON.map(month => (
              <div className="col-span-3" key={month.name}>
                <Month {...month} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-6 md:col-span-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-1 gap-2 text-center border border-gray-800 rounded-md px-3 py-6 flex flex-col text-secondary justify-center items-center">
              <img src="/vectors/budget.png" alt="" className="h-8 w-8" />
              <h3 className="text-lg text-green-900 font-medium">100%</h3>
              <h5 className="text-sm leading-snug font-light">Kesehatan Financial</h5>
            </div>
            <div className="col-span-1 gap-2 text-center border border-gray-800 rounded-md px-3 py-6 flex flex-col text-secondary justify-center items-center">
              <img src="/vectors/budget.png" alt="" className="h-8 w-8" />
              <h3 className="text-lg text-green-900 font-medium">100%</h3>
              <h5 className="text-sm leading-snug font-light">Kesehatan Financial</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NewMonth() {
  return (
    <UIButton size="sm">
      <Plus className="h-3.5 w-3.5 p-0 m-0 mt-[1px] mr-1.5" />
      Create Data
    </UIButton>
  )
}

function Month({ name, isClosed }: data) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full">
          <div className={clsx("flex items-center gap-x-3 border border-gray-800 cursor-pointer hover:border-gray-800 rounded-lg px-4 py-2.5", {
            'bg-orange-100 border-orange-200 hover:border-orange-300': !isClosed
          })}>
            {!isClosed && <FolderOpen className="h-5 w-5 p-0 m-0" />}
            {isClosed && <FolderClosed className="h-5 w-5 p-0 m-0" />}
            <p className="text-md mt-0.5">{name}</p>
          </div>
        </TooltipTrigger>
        <TooltipContent className="flex items-center gap-x-2">
          <Info className="h-4 w-4 -mt-1" />
          {!isClosed && <p className="font-light text-sm">Folder Open Query and visualize your Vercel usage.</p>}
          {isClosed && <p className="font-light text-sm">Folder Closed</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

  )
}