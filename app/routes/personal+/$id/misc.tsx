import {UIButton} from '~/components/shadcn/button'
import React from 'react'
import {Dialog, Listbox, Transition} from '@headlessui/react'
import {Button} from '~/components/button'
import type {SaveStatus} from './route'
import {FormType} from './route'
import {Form, useLoaderData, useNavigate} from '@remix-run/react'
import {
  ArrowLeft,
  Check,
  ChevronRight,
  ChevronsUpDownIcon,
  MoreHorizontal,
  Trash2,
} from 'lucide-react'
import clsx from 'clsx'
import type {LoaderArgs} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '~/components/shadcn/dropdown-menu'
import {Input} from '~/components/shadcn/input'
import {capitalize} from 'lodash'

type LoaderData = {
  postId: string
}

export const loader = async ({request, params}: LoaderArgs) => {
  const {id} = params
  if (!id) return redirect('/personal')
  const data: LoaderData = {postId: id}
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
  return (
    <div className="glass glass sticky top-0 z-[99] mb-4 w-full border-b border-gray-100 bg-white/[0.65] px-3 pt-4 backdrop-blur-lg dark:border-gray-800 dark:bg-black/[0.65] dark:backdrop-blur-lg lg:px-6">
      <div className="mb-4 flex w-full items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-md font-normal">
          <BackButton saveStatus={saveStatus} submitContent={submitContent} />
          <p>/</p>
          <p className="line-clamp-1 font-medium">{title ?? '~ Untitled'}</p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <div className="ml-2.5 flex items-center gap-2 px-3 py-1">
            <span
              className={clsx('block h-3 w-3 rounded-full', {
                'bg-green-900': saveStatus === 'Saved',
                'bg-red-900': saveStatus === 'Unsaved',
                'bg-orange-900': saveStatus === 'Saving..',
              })}
            ></span>
            <p className="text-sm font-medium">{saveStatus}</p>
          </div>
          <OtherOptions type={type} />
        </div>
      </div>
    </div>
  )
}

function OtherOptions({type}: {type: FormType}) {
  const [isShowDeleteModal, setIsShowDeleteModal] = React.useState(false)
  const [isShowShareModal, setIsShowShareModal] = React.useState(false)

  const handleDeletePost = () => {
    setIsShowDeleteModal(true)
  }
  const handleSharePost = () => {
    setIsShowShareModal(true)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-600">
            <MoreHorizontal size={18} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <MoreMenus
            type={type}
            handleDeletePost={handleDeletePost}
            handleSharePost={handleSharePost}
          />
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDialog
        isShowDeleteModal={isShowDeleteModal}
        setIsShowDeleteModal={setIsShowDeleteModal}
      />
      <ShareDialog
        isShowShareModal={isShowShareModal}
        setIsShowShareModal={setIsShowShareModal}
      />
    </>
  )
}

function MoreMenus({
  type,
  handleDeletePost,
  handleSharePost,
}: {
  type: FormType
  handleDeletePost: () => void
  handleSharePost: () => void
}) {
  return (
    <DropdownMenuGroup className="p-1">
      <DropdownMenuItem className="flex items-center gap-x-12 rounded-md border border-transparent p-0 px-2 hover:border-gray-100 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800">
        <UIButton
          onClick={handleSharePost}
          variant="subtle"
          type="button"
          className="flex h-auto w-full cursor-default justify-between px-2 py-1"
        >
          <div className="flex items-center gap-x-2">
            <p>Share</p>
          </div>
          <div className="flex items-center gap-x-1">
            <p className="font-normal text-gray-400 dark:text-gray-200">
              Bagikan
            </p>
            <ChevronRight size={16} />
          </div>
        </UIButton>
      </DropdownMenuItem>
      <DropdownMenuSeparator className="mt-2" />
      {type !== FormType.CREATE && (
        <DropdownMenuItem className="mt-2.5 rounded-md border border-transparent p-0 hover:border-red-900 hover:bg-red-900/10 dark:hover:border-red-300 dark:hover:bg-red-200">
          <UIButton
            onClick={handleDeletePost}
            variant="subtle"
            type="button"
            className="h-auto w-full cursor-default px-2 py-1"
          >
            <div className="flex items-center gap-x-2">
              <Trash2 size={18} className="text-red-800" />
              <p className="text-red-800">Hapus Halaman</p>
            </div>
          </UIButton>
        </DropdownMenuItem>
      )}
    </DropdownMenuGroup>
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
      onClick={() => navigate('/personal')}
      type="button"
      variant="subtle"
      size="sm"
      className="flex items-center gap-2 px-0"
    >
      <ArrowLeft size={12} strokeWidth={2.5} />
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
  const data = useLoaderData<LoaderData>()
  const closeModal = () => setIsShowDeleteModal(false)

  return (
    <Dialog
      aria-label="Delete project"
      open={isShowDeleteModal}
      onClose={closeModal}
      style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
      className="absolute top-0 z-[9999] flex h-screen w-full items-center"
    >
      <Dialog.Panel className="mx-4 flex w-full max-w-[100vw] flex-col gap-y-2 rounded-lg border border-gray-100 bg-white p-0 dark:border-gray-400 dark:bg-black lg:mx-auto lg:max-w-[20vw]">
        <div className="border-b border-gray-100 px-6 py-4 text-center dark:border-gray-400">
          <h1 className="text-lg font-bold">
            Apakah kamu yakin ingin menghapus halaman ini?
          </h1>
        </div>
        <div className="px-6 py-4">
          <p className="text-md">
            Halaman ini akan dihapus selamanya, kami belum memiliki fitur backup
            untuk menyimpan penghapusan halaman.
          </p>
        </div>
        <div className="flex w-full justify-end gap-4 border-t border-gray-100 px-6 py-6 dark:border-gray-400">
          <Form method="POST">
            <Button variant="danger" type="submit" className="w-min">
              Ya, Hapus
            </Button>
            <input type="hidden" name="_action" value={FormType.DELETE} />
            <input type="hidden" name="postId" value={data?.postId} />
          </Form>
          <UIButton
            size="sm"
            type="button"
            className="w-min"
            onClick={closeModal}
          >
            Batal
          </UIButton>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}

const ShareDialog = ({
  isShowShareModal,
  setIsShowShareModal,
}: {
  isShowShareModal: boolean
  setIsShowShareModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [selected, setSelected] = React.useState('VIEW_ONLY')
  const data = useLoaderData<LoaderData>()
  const closeModal = () => setIsShowShareModal(false)

  return (
    <Dialog
      aria-label="Delete project"
      open={isShowShareModal}
      onClose={closeModal}
      style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
      className="absolute top-0 z-[998] flex h-screen w-full items-center"
    >
      <Dialog.Panel className="mx-4 flex w-full max-w-[100vw] flex-col gap-y-2 rounded-lg border border-gray-100 bg-white p-0 dark:border-gray-400 dark:bg-black lg:mx-auto lg:max-w-[30vw]">
        <div className="border-b border-gray-100 px-6 py-4 dark:border-gray-400">
          <h1 className="text-xl font-bold">Bagikan halaman</h1>
        </div>
        <Form method="POST">
          <div className="gap-4 px-6 py-4">
            <div className="flex items-center gap-4">
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative w-fit">
                  <Listbox.Button className="relative w-full cursor-default rounded-sm border border-gray-100 bg-gray-100/50 py-2 pl-4 pr-9 text-left text-sm focus:bg-gray-100/50 focus:outline-none focus-visible:border-none focus-visible:ring-0 dark:border-gray-400 dark:bg-gray-800 dark:focus:bg-gray-800">
                    <p className="pointer-events-none whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-100">
                      {capitalize(selected.toString()).replace(/_/g, ' ')}
                    </p>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronsUpDownIcon
                        strokeWidth={2.5}
                        className="h-4 w-4 text-gray-500 dark:text-gray-100"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100 w-fit"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="sm:text-sm absolute z-50  mt-1 max-h-60 w-fit overflow-auto rounded-md border border-gray-100 bg-white bg-white/[0.65] p-0 py-1 text-base shadow-lg backdrop-blur-lg focus:outline-none dark:border-gray-800 dark:bg-gray-900/[0.65] dark:backdrop-blur-lg">
                      {['VIEW_ONLY', 'CAN_EDIT'].map(item => (
                        <Listbox.Option
                          key={item}
                          className={({selected}) =>
                            clsx(
                              'relative flex w-full min-w-[120px] cursor-pointer items-center justify-between gap-12 px-3 py-1',
                              {
                                'bg-green-900 hover:bg-green-900/90 dark:hover:bg-green-900/40':
                                  selected,
                                'hover:bg-gray-100 hover:dark:bg-gray-800':
                                  !selected,
                              },
                            )
                          }
                          value={item}
                        >
                          {({selected}) => (
                            <>
                              <span
                                className={clsx(
                                  'block truncate text-sm font-normal text-gray-500 dark:text-gray-100',
                                  {
                                    'text-white': selected,
                                  },
                                )}
                              >
                                {capitalize(item.toString()).replace(/_/g, ' ')}
                              </span>
                              {selected ? (
                                <Check
                                  className="visually-hidden text-white"
                                  aria-hidden={!selected}
                                  size={16}
                                  strokeWidth={2.5}
                                />
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
              <Input type="email" placeholder="Email" value={selected} />
            </div>
            <input type="hidden" name="_action" value={FormType.DELETE} />
            <input type="hidden" name="postId" value={data?.postId} />
          </div>
          <div className="flex w-full justify-end gap-4 border-t border-gray-100 px-6 py-6 dark:border-gray-400">
            <input type="hidden" name="_action" value={FormType.DELETE} />
            <input type="hidden" name="postId" value={data?.postId} />
            <UIButton
              size="sm"
              type="button"
              className="w-min"
              onClick={closeModal}
            >
              Batal
            </UIButton>
            <Button variant="primary" type="submit" className="w-min">
              Undang
            </Button>
          </div>
        </Form>
      </Dialog.Panel>
    </Dialog>
  )
}
