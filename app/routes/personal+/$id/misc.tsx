import { UIButton } from '~/components/shadcn/button'
import React from 'react'
import { Dialog } from '@headlessui/react'
import { Button } from '~/components/button'
import type { SaveStatus } from '.'
import { FormType } from '.'
import { Form, useLoaderData, useNavigate } from '@remix-run/react'
import {
  ChevronRight,
  FilePlus,
  MoreHorizontal,
  MoveLeftIcon,
  Trash2,
  Book,
} from 'lucide-react'
import clsx from 'clsx'
import type { LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/shadcn/dropdown-menu'

type LoaderData = {
  postId: string
}

export const loader = async ({ request, params }: LoaderArgs) => {
  const { id } = params
  if (!id) return redirect('/personal')
  const data: LoaderData = { postId: id }
  return data
}

export function Header({
  type,
  title,
  saveStatus,
  submitContent,
}: {
  type: FormType
  title?: string
  saveStatus: SaveStatus
  submitContent: () => void
}) {
  const [isShowDeleteModal, setIsShowDeleteModal] = React.useState(false)

  const handleDeletePost = () => {
    setIsShowDeleteModal(true)
  }

  return (
    <div className="sticky top-0 z-[99] mb-4 w-full border-b border-gray-100 bg-white/[0.65] px-3 pt-4 backdrop-blur-lg dark:border-gray-800 dark:bg-black/[0.65] dark:backdrop-blur-lg lg:px-6">
      <div className="mb-6 mt-2 flex items-center gap-2.5">
        <Book size={23} strokeWidth={2.5} />
        <h2 className="mt-1 text-left text-xl font-semibold">
          {title
            ? title.length >= 15
              ? title.slice(0, 15) + '..'
              : title
            : '~ Untitled'}
        </h2>
      </div>
      <div className="mb-4 flex w-full items-center justify-between gap-3">
        <div className="flex items-center gap-x-2 text-md font-normal">
          <BackButton saveStatus={saveStatus} submitContent={submitContent} />
        </div>
        <div className="flex items-center justify-end gap-2">
          <div className="ml-2.5 flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1 dark:bg-gray-700">
            <span
              className={clsx('block h-2 w-2 rounded-full', {
                'bg-green-900': saveStatus === 'Saved',
                'bg-red-900': saveStatus === 'Unsaved',
                'bg-orange-900': saveStatus === 'Saving..',
              })}
            ></span>
            <p>{saveStatus}</p>
          </div>
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
            <DropdownMenuContent className="">
              <MoreMenus type={type} handleDeletePost={handleDeletePost} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DeleteDialog
          isShowDeleteModal={isShowDeleteModal}
          setIsShowDeleteModal={setIsShowDeleteModal}
        />
      </div>
    </div>
  )
}

function MoreMenus({
  type,
  handleDeletePost,
}: {
  type: FormType
  handleDeletePost: () => void
}) {
  return (
    <>
      <DropdownMenuLabel className="px-2">
        <p className="font-semibold">View Options</p>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup className="p-1">
        <DropdownMenuItem className="flex items-center gap-x-12 rounded-md border border-transparent px-2 hover:border-gray-100 hover:bg-gray-800 dark:border-gray-800">
          <div className="flex items-center gap-x-2">
            <FilePlus size={18} />
            <p>Settings</p>
          </div>
          <div className="text-secondary flex items-center gap-x-1">
            <p className="">Pengaturan</p>
            <ChevronRight size={16} />
          </div>
        </DropdownMenuItem>
        {type !== FormType.CREATE && (
          <DropdownMenuItem className="rounded-md border border-transparent px-2 hover:border-red-300 hover:bg-red-200">
            <UIButton
              onClick={handleDeletePost}
              variant="subtle"
              type="button"
              className="h-auto cursor-default"
            >
              <div className="flex items-center gap-x-2">
                <Trash2 size={18} className="text-red-800" />
                <p className="text-red-800">Delete Page</p>
              </div>
            </UIButton>
          </DropdownMenuItem>
        )}
      </DropdownMenuGroup>
    </>
  )
}

function BackButton({
  saveStatus,
  submitContent,
}: {
  saveStatus: SaveStatus
  submitContent: () => void
}) {
  const navigate = useNavigate()
  const alertUser = React.useCallback(
    (event: any) => {
      event.preventDefault()
      if (saveStatus === 'Unsaved') {
        event.returnValue = ''
      }
    },
    [saveStatus],
  )

  React.useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    window.addEventListener('unload', submitContent)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
      window.removeEventListener('unload', submitContent)
    }
  }, [alertUser, submitContent])

  return (
    <UIButton
      onClick={() => navigate(-1)}
      type="button"
      variant="subtle"
      size="sm"
      className="flex items-center gap-2 hover:bg-gray-100 hover:dark:bg-gray-700"
    >
      <MoveLeftIcon size={18} />
      <p>Back</p>
    </UIButton>
  )
}

const DeleteDialog = ({
  isShowDeleteModal,
  setIsShowDeleteModal,
}: {
  isShowDeleteModal: boolean
  setIsShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  // const {toast} = useToast()
  const data = useLoaderData<LoaderData>()
  const closeDeleteModal = () => setIsShowDeleteModal(false)

  return (
    <Dialog
      aria-label="Delete project"
      open={isShowDeleteModal}
      onClose={closeDeleteModal}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      className="z-50 flex w-full items-center"
    >
      <Dialog.Panel className="mx-4 flex w-full max-w-[100vw] flex-col gap-y-6 rounded-lg border border-gray-100 bg-black p-0 dark:border-gray-800 lg:mx-auto lg:max-w-[20vw]">
        <div className="border-b border-gray-100 px-6 py-4 text-center dark:border-gray-800">
          <h1 className="text-lg font-semibold">
            Are you sure you want to delete?
          </h1>
        </div>
        <div className="px-6 py-4">
          <p className="text-secondary mt-4 text-md font-light leading-tight lg:mt-2 lg:leading-relaxed">
            Monitoring is a powerful query editor that allows you to visualize
            and gain insight into bandwidth, errors, performance, traffic, Top
            Paths usage, and more across all projects.
          </p>
        </div>
        <div className="flex w-full justify-between border-t border-gray-100 px-6 py-4 dark:border-gray-800">
          <UIButton
            size="sm"
            type="button"
            className="w-min"
            onClick={closeDeleteModal}
          >
            Cancel
          </UIButton>
          <Form method="POST" className="w-min">
            <Button size="sm" variant="danger" type="submit">
              Yes, delete.
            </Button>
            <input type="hidden" name="_action" value={FormType.DELETE} />
            <input type="hidden" name="postId" value={data?.postId} />
          </Form>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}
