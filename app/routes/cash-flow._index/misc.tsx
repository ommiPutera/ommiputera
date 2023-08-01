import { useLocation } from "@remix-run/react"
import clsx from "clsx"
import { BookOpenCheck, ChevronRight, ChevronsUpDown, FilePlus, LogOut, MoreHorizontal, Settings } from "lucide-react"
import { ButtonLink } from "~/components/button"
import { Logo } from "~/components/navbar"
import { Avatar, AvatarImage } from "~/components/shadcn/avatar"
import { UIButton } from "~/components/shadcn/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/shadcn/dropdown-menu"
import { useRootData } from "~/utils/use-root-data"

function LayoutTitle({ title }: { title: string }) {
  const { user } = useRootData()
  const location = useLocation()
  const isSelected = (to: string) => to === location.pathname || location.pathname.startsWith(`${to}/`)
  return (
    <div className="sticky top-0 z-50 w-full border-b border-b-gray-600 bg-black px-[4vw] py-3 xl:px-10vw">
      <div className="relative mx-auto grid max-w-7xl grid-cols-12 items-center">
        <div className="col-span-4 flex items-center gap-x-4 text-left">
          <Logo size="md" />
        </div>
        <div className="col-span-4 text-center">
          <h1 className="leading-tigh px-0 text-xl font-medium capitalize lg:text-base">
            {title}
          </h1>
          <p className="text-secondary text-sm font-light">Powerd by Ommi</p>
        </div>
        <div className="col-span-4 flex items-center justify-end gap-x-2">
          <ButtonLink
            type="button"
            size="sm"
            variant="subtle"
            prefetch='intent'
            to="/cash-flow/templates"
            className={clsx('flex items-center gap-x-2 hover:bg-gray-600 hover:text-white', {
              'text-secondary': !isSelected('/cash-flow/templates'),
              'text-white': isSelected('/cash-flow/templates'),
            })}
          >
            <FilePlus size={18} />
            <p>Template</p>
          </ButtonLink>
          <UIButton
            size="sm"
            variant="subtle"
            className="text-secondary flex items-center gap-x-2 hover:bg-gray-600 hover:text-white"
          >
            <Settings size={18} />
            <p>Settings</p>
          </UIButton>
          <div className="ml-2 flex items-center gap-x-2 rounded-md bg-gray-800 px-3 py-1.5">
            <Avatar className="relative h-5 w-5">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>
            <p className="-mb-0.5 text-xs font-light">{user?.username}</p>
            <ChevronsUpDown size={14} />
          </div>
          <MoreAction />
        </div>
      </div>
    </div>
  )
}

function MoreAction() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UIButton
          size="sm"
          variant="subtle"
          className="flex items-center rounded-md px-2 hover:bg-gray-600"
        >
          <MoreHorizontal size={18} />
        </UIButton>
      </DropdownMenuTrigger>
      <MoreMenus />
    </DropdownMenu>
  )
}

function MoreMenus() {
  return (
    <DropdownMenuContent className="">
      <DropdownMenuLabel className="px-2">
        <p className="font-semibold">View Options</p>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup className="p-1">
        <DropdownMenuItem className="flex items-center gap-x-12 rounded-md border border-transparent px-2 hover:border-gray-700 hover:bg-gray-800">
          <div className="flex items-center gap-x-2">
            <BookOpenCheck size={18} />
            <p>Guide</p>
          </div>
          <div className="text-secondary flex items-center gap-x-1">
            <p className="">Pengaturan</p>
            <ChevronRight size={16} />
          </div>
        </DropdownMenuItem>
        <form action="/logout" method="post">
          <UIButton
            variant="subtle"
            type="submit"
            className="w-full cursor-default"
          >
            <DropdownMenuItem className="w-full rounded-md border border-transparent px-2 hover:border-red-300 hover:bg-red-200">
              <div className="flex items-center gap-x-2">
                <LogOut size={18} className="text-red-800" />
                <p className="text-red-800">Log Out</p>
              </div>
            </DropdownMenuItem>
          </UIButton>
        </form>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  )
}

export { LayoutTitle }
