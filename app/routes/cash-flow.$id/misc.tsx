import { UIButton } from '~/components/shadcn/button'
import React from 'react'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { Button } from '~/components/button'
import type { SaveStatus } from './route'
import { FormType } from './route'
import { Form, Link, useLoaderData } from '@remix-run/react'
import {
  ChevronRight,
  FilePlus,
  MoreHorizontal,
  MoveLeftIcon,
  Trash2,
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
// import {useToast} from '~/components/shadcn/use-toast'
// import {ToastAction} from '~/components/shadcn/toast'

type LoaderData = {
  postId: string
}

export const loader = async ({ request, params }: LoaderArgs) => {
  const { id } = params
  if (!id) return redirect('/cash-flow')
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
    <div className="sticky left-0 top-0 z-50 mx-auto flex h-full w-full max-w-5xl justify-center bg-black py-4">
      <div className="grid w-full grid-cols-12 items-center justify-start gap-x-4">
        <div className="col-span-4 flex items-center gap-x-2 text-md font-normal">
          <BackButton saveStatus={saveStatus} submitContent={submitContent} />
          <p className="ml-1.5 font-semibold">{title ?? '- Untitled'}</p>
          <div className="ml-2.5 flex items-center gap-2 rounded-md bg-gray-600 px-3 py-1">
            <span
              className={clsx('block h-2 w-2 rounded-full', {
                'bg-green-900': saveStatus === 'Saved',
                'bg-red-900': saveStatus === 'Unsaved',
                'bg-orange-900': saveStatus === 'Saving..',
              })}
            ></span>
            <p>{saveStatus}</p>
          </div>
        </div>
        <div className="col-span-8 flex items-center justify-end gap-x-4">
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
        <DropdownMenuItem className="flex items-center gap-x-12 rounded-md border border-transparent px-2 hover:border-gray-800 hover:bg-gray-800">
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
    <Link to="/cash-flow" prefetch="intent">
      <UIButton
        type="button"
        variant="subtle"
        size="sm"
        className="flex items-center gap-x-2 hover:bg-gray-600"
      >
        <MoveLeftIcon size={18} />
        <p>Back</p>
      </UIButton>
    </Link>
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
    <DialogOverlay
      aria-label="Delete project"
      isOpen={isShowDeleteModal}
      onDismiss={closeDeleteModal}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      className="z-50 flex w-full items-center"
    >
      <DialogContent className="mx-4 flex w-full max-w-[100vw] flex-col gap-y-6 rounded-lg border border-gray-800 bg-black p-0 lg:mx-auto lg:max-w-[20vw]">
        <div className="border-b border-gray-800 px-6 py-4 text-center">
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
        <div className="flex w-full justify-between border-t border-gray-800 px-6 py-4">
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
      </DialogContent>
    </DialogOverlay>
  )
}
