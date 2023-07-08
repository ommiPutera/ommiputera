import {useActionData, useSearchParams} from '@remix-run/react'
import {UIButton} from '~/components/shadcn/button'
import type {ActionData} from './route'
import {EditorJs, FormType, HeaderEditor, useMonthlyState} from './route'
import {Plus} from 'lucide-react'
import {DialogContent, DialogOverlay} from '@reach/dialog'
import EditorForm from './form'
import clsx from 'clsx'
import React from 'react'

export default function CreateData() {
  const [searchParams, setSearchParams] = useSearchParams()
  const {setShowEditorCreate, setIsSubmited, setIsRequestForDismis} =
    useMonthlyState()
  const [isCallEditor, setIsCallEditor] = React.useState(false)

  return (
    <div>
      <UIButton
        type="button"
        size="sm"
        onClick={() => {
          setShowEditorCreate(true)
          setIsCallEditor(true)
          setIsSubmited(false)
          setIsRequestForDismis(false)
        }}
        onMouseOver={() => {
          EditorJs.preload()
          setSearchParams({})
        }}
        onFocus={() => {
          EditorJs.preload()
          if (searchParams.get('id')) {
            setSearchParams({})
          }
        }}
      >
        <Plus className="m-0 mr-1 h-3.5 w-3.5 p-0" />
        Create Data
      </UIButton>
      {searchParams.get('id') === null && isCallEditor ? (
        <EditorCreateData />
      ) : null}
    </div>
  )
}

function EditorCreateData() {
  const actionData = useActionData<ActionData | undefined>()
  const {
    isSubmited,
    setIsRequestForDismis,
    isShowEditorCreate,
    setShowEditorCreate,
    isEditorReady,
    setIsEditorReady,
  } = useMonthlyState()
  const isCreated = Boolean(actionData?.newPostId)

  return (
    <DialogOverlay
      aria-label=""
      isOpen={isShowEditorCreate && !isSubmited}
      onDismiss={() => {
        if (isSubmited) {
          setShowEditorCreate(false)
        }
        setIsEditorReady(false)
        setIsRequestForDismis(true)
      }}
      style={{backgroundColor: 'rgba(0, 0, 0, 0.682)'}}
      className={clsx('z-50 w-full items-center whitespace-nowrap', {
        hidden: !isEditorReady,
        flex: isEditorReady,
      })}
    >
      <DialogContent className="fixed left-0 right-0 mx-auto flex h-screen w-screen flex-col bg-gray-900 p-0 lg:h-[88vh] lg:w-fit lg:rounded-md lg:border lg:border-gray-800">
        <HeaderEditor type={FormType.CREATE} />
        <EditorForm type={isCreated ? FormType.UPDATE : FormType.CREATE} />
      </DialogContent>
    </DialogOverlay>
  )
}
