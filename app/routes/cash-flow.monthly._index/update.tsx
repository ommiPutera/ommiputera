import { useSearchParams } from '@remix-run/react'
import { EditorJs, FormType, HeaderEditor, useMonthlyState } from './route'
import React from 'react'
import type { Post } from '@prisma/client'
import { FolderClosed, FolderOpen } from 'lucide-react'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import clsx from 'clsx'
import EditorForm from './form'

export default function UpdateData({ id, title }: Post) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { setShowEditorUpdate } = useMonthlyState()

  return (
    <>
      <button
        type="button"
        onClick={() => setShowEditorUpdate(true)}
        onMouseOver={() => {
          EditorJs.preload()
          if (searchParams.get('id') !== id) {
            setSearchParams({ id: id })
          }
        }}
        className={clsx(
          'flex w-full cursor-pointer items-center gap-x-3 rounded-lg border border-gray-800 px-4 py-2.5 hover:border-gray-700',
          {
            'border-orange-200 bg-orange-100 hover:border-orange-300': !title,
          },
        )}
      >
        {!title && <FolderOpen className="m-0 h-5 w-5 p-0" />}
        {title && <FolderClosed className="m-0 h-5 w-5 p-0" />}
        <p className="mt-0.5 text-md">{title}</p>
      </button>
      {searchParams.get('id') === id && <EditorUpdateData />}
    </>
  )
}

function EditorUpdateData() {
  const { isShowEditorUpdate, setShowEditorUpdate } = useMonthlyState()

  return (
    <DialogOverlay
      aria-label=""
      isOpen={isShowEditorUpdate}
      onDismiss={() => setShowEditorUpdate(false)}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.682)' }}
      className="z-50 flex w-full items-center whitespace-nowrap"
    >
      <DialogContent className="fixed left-0 right-0 mx-auto flex h-screen w-screen flex-col bg-gray-900 p-0 lg:h-[88vh] lg:w-fit lg:rounded-md lg:border lg:border-gray-800">
        <HeaderEditor type={FormType.UPDATE} />
        <EditorForm type={FormType.UPDATE} />
      </DialogContent>
    </DialogOverlay>
  )
}
