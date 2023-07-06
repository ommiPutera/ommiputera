import {createReactEditorJS} from 'react-editor-js'
import {EDITOR_JS_TOOLS} from './tools'

export default function Editor({
  defaultValue,
  holder,
  onInitialize,
  handleSave,
}: {
  holder: string
  handleSave: any
  defaultValue: any
  onInitialize: (instance: any) => void
}) {
  const ReactEditorJS = createReactEditorJS()

  return (
    <ReactEditorJS
      onInitialize={onInitialize}
      defaultValue={defaultValue}
      holder={holder}
      onChange={handleSave}
      tools={EDITOR_JS_TOOLS}
    >
      <div
        id={holder}
        className="my-2 min-h-[500px] overflow-scroll lg:w-[680px]"
      />
    </ReactEditorJS>
  )
}
