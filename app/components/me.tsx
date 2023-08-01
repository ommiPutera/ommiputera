import { BookOpenCheck, ChevronRight, ChevronsUpDown } from "lucide-react"
import { Avatar, AvatarImage } from "./shadcn/avatar"
import { useRootData } from "~/utils/use-root-data"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./shadcn/dropdown-menu"
import { Link } from "@remix-run/react"

function Profile() {
  const { user } = useRootData()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="ml-2 flex items-center gap-x-2 rounded-md bg-gray-600 px-3 py-1.5">
          <Avatar className="relative h-5 w-5">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>
          <p className="-mb-0.5 text-sm font-light">{user?.username}</p>
          <ChevronsUpDown size={14} />
        </div>
      </DropdownMenuTrigger>
      <MoreMenus />
    </DropdownMenu>
  )
}

function MoreMenus() {
  const { user } = useRootData()
  return (
    <DropdownMenuContent className="">
      <DropdownMenuLabel className="px-2">
        <p className="font-normal text-secondary text-sm px-2 py-1">{user?.email}</p>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup className="p-1">
        <Link to="/me">
          <DropdownMenuItem className="flex items-center justify-between w-full gap-x-12 rounded-md border border-transparent px-2 hover:border-gray-700 hover:bg-gray-800">
            <div className="flex items-center gap-x-2">
              <BookOpenCheck size={18} />
              <p>Profile</p>
            </div>
            <div className="text-secondary flex items-center gap-x-1">
              <p className="text-sm">me</p>
              <ChevronRight size={16} />
            </div>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  )
}



export { Profile }