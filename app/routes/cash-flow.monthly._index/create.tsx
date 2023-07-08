import { useActionData, useSearchParams } from "@remix-run/react"
import { UIButton } from "~/components/shadcn/button"
import type { ActionData } from "./route";
import { EditorJs, FormType, HeaderEditor, useMonthlyState } from "./route"
import React from "react"
import { Plus } from "lucide-react"
import { DialogContent, DialogOverlay } from "@reach/dialog"
import EditorForm from "./form";

export default function CreateData() {
  const [, setSearchParams] = useSearchParams()
  const { setShowEditorCreate } = useMonthlyState()
  // Need for rerender Editor
  const [isEditorReady, setEditorReady] = React.useState(false)

  return (
    <div>
      <UIButton
        type="button"
        size="sm"
        onClick={() => {
          setShowEditorCreate(true)
          setEditorReady(true)
        }}
        onMouseOver={() => {
          EditorJs.preload()
          setSearchParams({})
        }}
      >
        <Plus className="m-0 mr-1 h-3.5 w-3.5 p-0" />
        Create Data
      </UIButton>
      {isEditorReady && <EditorCreateData setEditorReady={setEditorReady} />}
    </div>
  )
}

function EditorCreateData({
  setEditorReady,
}: {
  setEditorReady: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const actionData = useActionData<ActionData | undefined>()
  const { isShowEditorCreate, setShowEditorCreate } = useMonthlyState()
  const [isCreated, setIsCreated] = React.useState(false)

  React.useEffect(() => {
    if (!isShowEditorCreate) {
      setEditorReady(false)
    }
    if (actionData?.newPostId) {
      setIsCreated(true)
    }
  }, [actionData?.newPostId, isShowEditorCreate, setEditorReady])

  return (
    <DialogOverlay
      aria-label=""
      isOpen={isShowEditorCreate}
      onDismiss={() => {
        setShowEditorCreate(false)
      }}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.682)' }}
      className="z-50 flex w-full items-center whitespace-nowrap"
    >
      <DialogContent className="fixed left-0 right-0 mx-auto flex h-screen w-screen flex-col bg-gray-900 p-0 lg:h-[88vh] lg:w-fit lg:rounded-md lg:border lg:border-gray-800">
        <HeaderEditor type={FormType.CREATE} />
        <EditorForm type={isCreated ? FormType.UPDATE : FormType.CREATE} />
      </DialogContent>
    </DialogOverlay>
  )
}