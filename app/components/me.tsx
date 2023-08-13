import { BookOpenCheck, ChevronRight, ChevronsUpDown } from 'lucide-react'
import { Avatar, AvatarImage } from './shadcn/avatar'
import { useRootData } from '~/utils/use-root-data'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './shadcn/dropdown-menu'
import { Link } from '@remix-run/react'

function Profile() {
  const { user } = useRootData()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="ml-1 flex items-center justify-between gap-x-2 rounded-full border-2 border-gray-200 bg-gray-100 px-4 py-1.5 hover:border-black dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-200">
          <div className='flex items-center gap-2'>
            <Avatar className="relative h-5 w-5">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>
            <p className="-mb-0.5 text-sm font-normal">{user?.username}</p>
          </div>
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
    <DropdownMenuContent>
      <DropdownMenuLabel className="px-2">
        <p className="text-secondary px-1 py-1 text-sm font-normal">
          {user?.email}
        </p>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup className="p-1">
        <Link to="/me">
          <DropdownMenuItem className="flex w-full items-center justify-between gap-x-12 rounded-md border-transparent px-2 hover:bg-gray-100 hover:dark:bg-gray-800">
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
