import {UIButton} from '~/components/shadcn/button'
import React from 'react'
import {DialogContent, DialogOverlay} from '@reach/dialog'
import {Button} from '~/components/button'
import type {SaveStatus} from './route'
import {FormType} from './route'
import {Link} from '@remix-run/react'
import {MoveLeftIcon} from 'lucide-react'
import clsx from 'clsx'
// import {useToast} from '~/components/shadcn/use-toast'
// import {ToastAction} from '~/components/shadcn/toast'

export function Header({
  type,
  submit,
  handleDelete,
  title,
  saveStatus,
}: {
  type: FormType
  submit: () => void
  handleDelete: () => void
  title?: string
  saveStatus: SaveStatus
}) {
  const [isShowDeleteModal, setIsShowDeleteModal] = React.useState(false)

  const handleDeletePost = () => {
    setIsShowDeleteModal(true)
    handleDelete()
  }

  return (
    <div className="glass fixed left-0 top-0 z-50 flex w-full justify-center border-b border-gray-800 bg-black py-2">
      <div className="grid w-full max-w-7xl grid-cols-12 items-center justify-start gap-x-4">
        <div className="col-span-4">
          <BackButton />
        </div>
        <div className="col-span-4 flex items-center justify-center gap-x-2 text-md font-normal">
          <p>{title ?? '- Untitled'}</p>
          <p>/</p>
          <p className="flex items-center gap-2">
            <span
              className={clsx('mt-0.5 block h-2 w-2 rounded-full', {
                'bg-green-900': saveStatus === 'Saved',
                'bg-red-900': saveStatus === 'Unsaved',
                'bg-orange-900': saveStatus === 'Saving..',
              })}
            ></span>
            {saveStatus}
          </p>
        </div>
        <div className="col-span-4 flex items-center justify-end">
          {type !== FormType.CREATE && (
            <UIButton size="sm" variant="danger" onClick={handleDeletePost}>
              Delete
            </UIButton>
          )}
        </div>
        <DeleteDialog
          submit={submit}
          isShowDeleteModal={isShowDeleteModal}
          setIsShowDeleteModal={setIsShowDeleteModal}
        />
      </div>
    </div>
  )
}

function BackButton() {
  return (
    <Link to="/cash-flow/monthly" prefetch="intent">
      <UIButton variant="subtle" className="text-md text-orange-500">
        <MoveLeftIcon className="mr-2.5" size="20" />
        <p>Back</p>
      </UIButton>
    </Link>
  )
}

const DeleteDialog = ({
  submit,
  isShowDeleteModal,
  setIsShowDeleteModal,
}: {
  submit: () => void
  isShowDeleteModal: boolean
  setIsShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  // const {toast} = useToast()
  const closeDeleteModal = () => setIsShowDeleteModal(false)

  const handleDelete = () => {
    submit()
    closeDeleteModal()
    // toast({
    //   title: 'Deleted',
    //   description: 'Data berhasil dihapus',
    //   action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    // })
  }

  return (
    <DialogOverlay
      aria-label="Delete project"
      isOpen={isShowDeleteModal}
      onDismiss={closeDeleteModal}
      style={{backgroundColor: 'rgba(0, 0, 0, 0.682)'}}
      className="z-50 flex w-full items-center"
    >
      <DialogContent className="mx-4 flex w-full max-w-[100vw] flex-col gap-y-6 rounded-lg border border-gray-800 bg-black p-0 lg:mx-auto lg:max-w-[24vw]">
        <div className="border-b border-gray-800 px-6 py-4 text-center">
          <h1 className="text-lg">Are you sure you want to delete?</h1>
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
          <Button
            onClick={handleDelete}
            size="sm"
            className="w-min"
            variant="danger"
          >
            Yes, delete.
          </Button>
        </div>
      </DialogContent>
    </DialogOverlay>
  )
}
