import {Link, useLocation} from '@remix-run/react'
import clsx from 'clsx'
import {
  BookOpenCheck,
  ChevronRight,
  FilePlus,
  LogOut,
  MoreHorizontal,
  Settings,
} from 'lucide-react'
import {ButtonLink} from '~/components/button'
import {Profile} from '~/components/me'
import {Logo} from '~/components/navbar'
import {UIButton} from '~/components/shadcn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/shadcn/dropdown-menu'

function LayoutTitle({
  title,
  subTitle,
  float = false,
}: {
  title: string
  subTitle?: string
  float: boolean
}) {
  const location = useLocation()
  const isSelected = (to: string) =>
    to === location.pathname || location.pathname.startsWith(`${to}/`)
  return (
    <>
      <div className="sticky top-0 z-50 w-full border-b border-b-gray-800 bg-black px-[4vw] py-5 xl:px-10vw">
        <div className="relative mx-auto grid max-w-5xl grid-cols-12 items-center">
          <div className="col-span-4 flex items-center gap-x-4 text-left">
            <Logo size="md" />
          </div>
          <div className="col-span-8 flex items-center justify-end gap-x-2">
            <ButtonLink
              type="button"
              size="sm"
              variant="subtle"
              prefetch="intent"
              to="/personal-finance/templates"
              className={clsx(
                'flex items-center gap-x-2 hover:bg-gray-600 hover:text-white',
                {
                  'text-secondary': !isSelected('/personal-finance/templates'),
                  'text-white': isSelected('/personal-finance/templates'),
                },
              )}
            >
              <FilePlus size={18} />
              <p>Templates</p>
            </ButtonLink>
            <ButtonLink
              type="button"
              size="sm"
              variant="subtle"
              prefetch="intent"
              to="/personal-finance/settings"
              className={clsx(
                'flex items-center gap-x-2 hover:bg-gray-600 hover:text-white',
                {
                  'text-secondary': !isSelected('/personal-finance/settings'),
                  'text-white': isSelected('/personal-finance/settings'),
                },
              )}
            >
              <Settings size={18} />
              <p>Settings</p>
            </ButtonLink>
            <Profile />
            <MoreAction />
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'w-full border-b border-b-gray-800 bg-black px-[4vw] xl:px-10vw',
          {'pb-44 pt-10': float, 'py-10': !float},
        )}
      >
        <div className="relative mx-auto w-full max-w-5xl items-center">
          <h3 className="whitespace-nowrap text-center text-lg font-medium">
            {title}
          </h3>
          <p className="text-secondary text-center text-md font-normal">
            {subTitle}
          </p>
        </div>
      </div>
    </>
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
        <Link to="/personal-finance/guides">
          <DropdownMenuItem className="flex items-center gap-x-12 rounded-md border border-transparent px-2 hover:border-gray-100 hover:bg-gray-800 dark:border-gray-800">
            <div className="flex items-center gap-x-2">
              <BookOpenCheck size={18} />
              <p>Guides</p>
            </div>
            <div className="text-secondary flex items-center gap-x-1">
              <p className="">Pengaturan</p>
              <ChevronRight size={16} />
            </div>
          </DropdownMenuItem>
        </Link>
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

export {LayoutTitle}
