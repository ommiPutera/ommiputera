import { createReactEditorJS } from 'react-editor-js'
import { EDITOR_JS_TOOLS } from './tools'
import clsx from 'clsx'
import type { OutputData } from '@editorjs/editorjs'

export interface EditorCore {
  destroy(): Promise<void>
  clear(): Promise<void>
  save(): Promise<OutputData>
  render(data: OutputData): Promise<void>
}

export default function Editor({
  defaultValue,
  holder,
  onInitialize,
  handleSave,
  onReady,
  placeholder,
  className,
}: {
  className?: string
  onReady?: any
  holder?: string
  handleSave: any
  defaultValue: any
  placeholder?: string
  onInitialize?: (core: EditorCore) => void
}) {
  const ReactEditorJS = createReactEditorJS()

  return (
    <ReactEditorJS
      onInitialize={onInitialize}
      defaultValue={defaultValue}
      inlineToolbar={true}
      holder={holder || 'custom'}
      placeholder={placeholder}
      onChange={handleSave}
      tools={EDITOR_JS_TOOLS}
      onReady={onReady}
    >
      <div
        id={holder || 'custom'}
        className={clsx(
          'my-2 block min-h-[500px] overflow-visible md:px-12 md:-mx-12 lg:w-full',
          className,
        )}
      />
    </ReactEditorJS>
  )
}
