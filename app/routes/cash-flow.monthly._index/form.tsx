import { Form, useActionData, useLoaderData } from '@remix-run/react'
import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import {
  type LoaderData,
  type FormType,
  type ActionData,
  EditorJs,
  useMonthlyState,
} from './route'
import { useRootData } from '~/utils/use-root-data'
import type { EditorCore } from '~/components/editor'

export default function EditorForm({ type }: { type: FormType }) {
  const { post } = useLoaderData<LoaderData>()
  const { user } = useRootData()
  const { isSubmited, setIsSubmited, isRequestForDismis, setIsEditorReady } = useMonthlyState()
  const submitRef = React.useRef<HTMLInputElement>(null)
  const postJSONRef = React.useRef<HTMLInputElement>(null)

  const actionData = useActionData<ActionData | undefined>()
  const [isContentChange, setIsContentChange] = React.useState(false)
  const [, setFormValues] = React.useState({
    title: '',
    postJSON: '',
  })

  const editorCore = React.useRef<EditorCore>(null)
  const handleInitialize = React.useCallback((instance: EditorCore) => {
    // @ts-ignore
    editorCore.current = instance
  }, [])

  const handleSave = React.useCallback(async () => {
    // retrieve data inserted
    if (!editorCore.current) return 'some thing went wrong!'
    const savedData = await editorCore.current.save()

    // save data
    if (postJSONRef.current) {
      postJSONRef.current.value = JSON.stringify(savedData)
    }

    if (savedData) {
      setIsContentChange(true)
    }
  }, [editorCore])

  const handleEditorReady = React.useCallback(() => {
    setIsEditorReady(true)
  }, [setIsEditorReady])

  React.useEffect(() => {
    if (submitRef.current && isRequestForDismis && !isSubmited) {
      // Dismis
      console.log('dismis')
      setIsSubmited(true)
    }
    // submit JSON
    if (
      submitRef.current &&
      isRequestForDismis &&
      !isSubmited &&
      isContentChange
    ) {
      console.log('submit', type)
      setIsSubmited(true)
      // @ts-ignore
      submitRef.current.click()
    }
  }, [isContentChange, isRequestForDismis, isSubmited, setIsSubmited, type])

  return (
    <Form
      method="POST"
      className="overflow-scroll py-4 lg:py-14"
      onChange={e => {
        const form = e.currentTarget
        setFormValues({
          title: form.title,
          postJSON: form.postJSON,
        })
      }}
      onSubmit={() => setIsSubmited(true)}
    >
      <div className="wrapperEditor px-6 md:px-0">
        <TextareaAutosize
          autoFocus
          id="title-field"
          name="title"
          defaultValue={post?.title}
          placeholder="Post title"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold leading-tight focus:outline-none md:text-4xl"
        />
      </div>
      <EditorJs
        placeholder="Type here to write your post..."
        defaultValue={post?.content}
        holder={post?.title}
        onInitialize={handleInitialize}
        handleSave={handleSave}
        onReady={handleEditorReady}
      />
      <input type="text" className="hidden" name="_action" value={type} />
      <input type="text" className="hidden" name="authorId" value={user?.id} />
      <input ref={postJSONRef} type="text" className="hidden" name="postJSON" />
      <input
        type="text"
        className="hidden"
        name="newPostId"
        value={actionData?.newPostId}
      />
      <input
        type="text"
        className="hidden"
        name="postId"
        value={actionData?.newPostId || post?.id}
      />
      <input ref={submitRef} type="submit" className="hidden" />
    </Form>
  )
}
