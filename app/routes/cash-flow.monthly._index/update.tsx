import {useSearchParams} from '@remix-run/react'
import {EditorJs, FormType, HeaderEditor, useMonthlyState} from './route'
import React from 'react'
import type {Post} from '@prisma/client'
import {FolderClosed, FolderOpen} from 'lucide-react'
import {DialogContent, DialogOverlay} from '@reach/dialog'
import clsx from 'clsx'
import EditorForm from './form'

export default function UpdateData({id, title}: Post) {
  const [searchParams, setSearchParams] = useSearchParams()
  const {setShowEditorUpdate, setIsSubmited, setIsRequestForDismis} =
    useMonthlyState()
  const [isCallEditor, setIsCallEditor] = React.useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsCallEditor(true)
          setShowEditorUpdate(true)
          setIsSubmited(false)
          setIsRequestForDismis(false)
        }}
        onMouseOver={() => {
          EditorJs.preload()
          if (searchParams.get('id') !== id) {
            setSearchParams({id: id})
          }
        }}
        onFocus={() => {
          EditorJs.preload()
          if (searchParams.get('id') !== id) {
            setSearchParams({id: id})
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
      {searchParams.get('id') === id && isCallEditor ? (
        <EditorUpdateData setIsCallEditor={setIsCallEditor} />
      ) : null}
    </>
  )
}

function EditorUpdateData({
  setIsCallEditor,
}: {
  setIsCallEditor: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const {
    isSubmited,
    setIsRequestForDismis,
    isShowEditorUpdate,
    setShowEditorUpdate,
    isEditorReady,
    setIsEditorReady,
  } = useMonthlyState()

  return (
    <DialogOverlay
      aria-label=""
      isOpen={isShowEditorUpdate && !isSubmited}
      onDismiss={() => {
        if (isSubmited) {
          setShowEditorUpdate(false)
        }
        setIsCallEditor(false)
        setIsEditorReady(false)
        setIsRequestForDismis(true)
      }}
      style={{backgroundColor: 'rgba(0, 0, 0, 0.682)'}}
      className={clsx('z-50 w-full items-center whitespace-nowrap', {
        hidden: !isEditorReady,
        flex: isEditorReady,
      })}
    >
      <DialogContent className="fixed left-0 right-0 mx-auto flex h-screen w-screen flex-col bg-black p-0 lg:h-[88vh] lg:w-fit lg:rounded-md lg:border lg:border-gray-800">
        <HeaderEditor type={FormType.UPDATE} />
        <EditorForm type={FormType.UPDATE} />
      </DialogContent>
    </DialogOverlay>
  )
}
