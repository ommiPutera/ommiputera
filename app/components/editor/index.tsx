import Header from '@editorjs/header'
// @ts-ignore
import List from '@editorjs/list'
// @ts-ignore
import Delimiter from '@editorjs/delimiter'
import { createReactEditorJS } from "react-editor-js";
import type { Post } from '@prisma/client';
import TextareaAutosize from "react-textarea-autosize"

const EDITOR_JS_TOOLS = {
  header: Header,
  list: List,
  delimiter: Delimiter
}

interface EditorProps {
  post: Pick<Post, "id" | "title" | "content" | "published">
}

export default function Editor({ post }: EditorProps) {
  const ReactEditorJS = createReactEditorJS();

  return (
    <form className='overflow-scroll'>
      <div className='wrapperEditor px-4 md:px-0'>
        <TextareaAutosize
          autoFocus
          id="title"
          defaultValue={post.title}
          placeholder="Post title"
          className="w-full leading-tight resize-none appearance-none overflow-hidden bg-transparent text-3xl md:text-4xl font-bold focus:outline-none"
        />
      </div>
      <ReactEditorJS holder="custom" tools={EDITOR_JS_TOOLS}>
        <div id="custom" className="min-h-[500px] overflow-scroll w-[760px] my-2" />
      </ReactEditorJS>
    </form>
  )
}
