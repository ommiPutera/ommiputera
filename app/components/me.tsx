import { BookOpenCheck, ChevronRight } from 'lucide-react'
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
        <div className="ml-1 flex w-fit max-w-[200px] items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Avatar className="relative h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>
            <div>
              <p className="-mb-1 text-sm font-medium">
                {user?.username
                  ? user?.username.length >= 16
                    ? user?.username.slice(0, 16) + '..'
                    : user?.username
                  : '~'}
              </p>
              <p className="text-[12px] font-normal capitalize text-gray-400 dark:text-gray-200">
                {user?.role.toLowerCase()}
              </p>
            </div>
          </div>
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
