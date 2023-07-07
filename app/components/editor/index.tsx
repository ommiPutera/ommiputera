import { createReactEditorJS } from 'react-editor-js'
import { EDITOR_JS_TOOLS } from './tools'
import clsx from 'clsx'

export default function Editor({
  defaultValue,
  holder,
  onInitialize,
  handleSave,
  onReady,
  className,
}: {
  className?: string
  onReady?: any
  holder?: string
  handleSave: any
  defaultValue: any
  onInitialize: (instance: any) => void
}) {
  const ReactEditorJS = createReactEditorJS()

  return (
    <ReactEditorJS
      onInitialize={onInitialize}
      defaultValue={defaultValue}
      holder={holder || 'custom'}
      onChange={handleSave}
      tools={EDITOR_JS_TOOLS}
      onReady={onReady}
    >
      <div
        id={holder || 'custom'}
        className={clsx(
          'my-2 block min-h-[500px] overflow-scroll lg:w-[680px]',
          className,
        )}
      />
    </ReactEditorJS>
  )
}
