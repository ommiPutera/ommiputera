import {UIButton} from '~/components/shadcn/button'
import React from 'react'
import {DialogContent, DialogOverlay} from '@reach/dialog'
import {Button} from '~/components/button'
import {FormType} from './route'
// import {useToast} from '~/components/shadcn/use-toast'
// import {ToastAction} from '~/components/shadcn/toast'

export function Header({
  type,
  submit,
  handleSave,
  handleDelete,
  isValidPublish,
}: {
  type: FormType
  submit: () => void
  handleSave: () => void
  handleDelete: () => void
  isValidPublish: boolean
}) {
  const [isShowDeleteModal, setIsShowDeleteModal] = React.useState(false)

  const handleDeletePost = () => {
    setIsShowDeleteModal(true)
    handleDelete()
  }

  if (type === FormType.CREATE) {
    return (
      <>
        <UIButton size="sm" disabled={isValidPublish} onClick={handleSave}>
          Publish
        </UIButton>
      </>
    )
  }
  return (
    <div className="flex gap-x-4">
      <UIButton size="sm" variant="danger" onClick={handleDeletePost}>
        Delete
      </UIButton>
      <UIButton size="sm" onClick={handleSave}>
        Save
      </UIButton>

      {/* Dialog */}
      <DeleteDialog
        submit={submit}
        isShowDeleteModal={isShowDeleteModal}
        setIsShowDeleteModal={setIsShowDeleteModal}
      />
    </div>
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
