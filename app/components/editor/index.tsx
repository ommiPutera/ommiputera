import {createReactEditorJS} from 'react-editor-js'
import type {Post} from '@prisma/client'
import TextareaAutosize from 'react-textarea-autosize'
import {EDITOR_JS_TOOLS} from './tools'
interface EditorProps {
  post: Pick<Post, 'id' | 'title' | 'content' | 'published'>
}

export default function Editor({post}: EditorProps) {
  const ReactEditorJS = createReactEditorJS()

  return (
    <form className="overflow-scroll py-4 lg:py-14">
      <div className="wrapperEditor px-6 md:px-0">
        <TextareaAutosize
          autoFocus
          id="title"
          defaultValue={post.title}
          placeholder="Post title"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold leading-tight focus:outline-none md:text-4xl"
        />
      </div>
      <ReactEditorJS holder="custom" tools={EDITOR_JS_TOOLS}>
        <div
          id="custom"
          className="my-2 min-h-[500px] overflow-scroll lg:w-[680px]"
        />
      </ReactEditorJS>
    </form>
  )
}
