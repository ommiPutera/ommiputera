import type {Post} from '@prisma/client'
import type {LoaderArgs, ActionFunction} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {Form, useActionData, useLoaderData} from '@remix-run/react'
import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import {useDebouncedCallback} from 'use-debounce'
import Editor from '~/components/editor'
import {
  createPost,
  deletePost,
  getPost,
  updateContent,
  updateTitle,
} from '~/utils/post.session'
import {useUser} from '~/utils/use-root-data'
import {Header} from './misc'
import type {JSONContent} from '@tiptap/core'

export type SaveStatus = 'Saved' | 'Unsaved' | 'Saving..'
type LoaderData = {
  post?: Post | null
  postId?: string
  isNewPage: boolean
}
type ActionData = {
  formError?: string
  fieldErrors?: {
    title: string | undefined
  }
  post?: Post
  fields?: {
    title?: string
    postJSON?: string
  }
  formMessage?: string
}

export enum FormType {
  CREATE = 'CREATE',
  UPDATE_TITLE = 'UPDATE_TITLE',
  UPDATE_CONTENT = 'UPDATE_CONTENT',
  DELETE = 'DELETE',
}

export const loader = async ({request, params}: LoaderArgs) => {
  const {id} = params
  const post = await getPost({id: id ?? ''})
  if (id === 'new') return {postId: id, isNewPage: true}

  if (!id || !post) return redirect('/cash-flow/monthly')
  const data: LoaderData = {post, postId: id, isNewPage: false}
  return data
}

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData()
  const {_action, postId, title, authorId, postJSON} =
    Object.fromEntries(formData)

  switch (_action) {
    case FormType.DELETE: {
      if (typeof postId !== 'string') {
        return {formError: `Form not submitted correctly.`}
      }
      await deletePost({id: postId})
      return redirect('/cash-flow/monthly', {})
    }
    case FormType.CREATE: {
      if (typeof authorId !== 'string' || typeof postJSON !== 'string') {
        return {formError: `Form not submitted correctly.`}
      }

      let content
      if (postJSON) {
        content = JSON.parse(postJSON)
      } else {
        content = JSON.parse(JSON.stringify({blocks: ['none']}))
      }

      return await createPost({
        title: title ? String(title) : 'Untitled Page...',
        authorId,
        published: true,
        content,
        redirectTo: '/cash-flow/monthly/',
      })
    }
    case FormType.UPDATE_TITLE: {
      if (typeof title !== 'string' || typeof postId !== 'string') {
        return {formError: `Form not submitted correctly.`}
      }
      const post = await updateTitle({
        id: postId,
        title,
      })
      return {post}
    }
    case FormType.UPDATE_CONTENT: {
      if (typeof postId !== 'string' || typeof postJSON !== 'string') {
        return {formError: `Form not submitted correctly.`}
      }
      let content
      if (postJSON) {
        content = JSON.parse(postJSON)
      } else {
        content = JSON.parse(JSON.stringify({blocks: ['none']}))
      }
      return await updateContent({
        id: postId,
        content,
      })
    }
    default: {
      return {formError: `Action type invalid`}
    }
  }
}

export default function Index() {
  const {post, postId} = useLoaderData<LoaderData>()
  const submitContentRef = React.useRef<HTMLInputElement>(null)
  const submitTitleRef = React.useRef<HTMLInputElement>(null)
  const [saveStatus, setSaveStatus] = React.useState<SaveStatus>('Saved')
  // @ts-ignore
  const [content, setContent] = React.useState<JSONContent | null>(
    post?.content,
  )
  const [pageTitle, setPageTitle] = React.useState(post?.title)

  const actionData = useActionData<ActionData>()
  const user = useUser()

  const submitTitleDebounce = useDebouncedCallback(() => {
    if (submitTitleRef.current) {
      submitTitleRef.current.click()
    }
  }, 1950)

  const submitContentDebounce = useDebouncedCallback(() => {
    submitContent()
  }, 1950)

  const submitContent = React.useCallback(() => {
    if (submitContentRef.current) {
      submitContentRef.current.click()
    }
  }, [])

  const alertUser = React.useCallback(
    (event: any) => {
      event.preventDefault()
      if (saveStatus === 'Unsaved') {
        event.returnValue = ''
      }
    },
    [saveStatus],
  )

  React.useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    window.addEventListener('unload', () => {
      submitContent()
      submitTitleDebounce()
    })
    return () => {
      window.removeEventListener('beforeunload', alertUser)
      window.removeEventListener('unload', () => {
        submitContent()
        submitTitleDebounce()
      })
    }
  }, [alertUser, submitContent, submitTitleDebounce])

  return (
    <>
      <Header
        type={postId === 'new' ? FormType.CREATE : FormType.UPDATE_CONTENT}
        title={pageTitle}
        saveStatus={saveStatus}
        submitContent={submitContent}
      />
      <div className="mx-auto my-0 mt-12 flex w-full max-w-3xl flex-col items-center justify-between gap-y-6 py-4">
        <Form method="POST" className="w-full" action=".">
          <div className="px-6 md:px-0">
            <TextareaAutosize
              autoFocus
              id="title-field"
              name="title"
              onChange={e => {
                submitTitleDebounce()
                setPageTitle(e.target.value)
              }}
              defaultValue={post?.title}
              placeholder="Untitled"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold leading-tight focus:outline-none lg:text-4xl"
            />
          </div>
          <input
            type="hidden"
            name="_action"
            value={postId === 'new' ? FormType.CREATE : FormType.UPDATE_TITLE}
          />
          <input ref={submitTitleRef} type="submit" className="hidden" />
          <input type="hidden" name="authorId" value={user?.id} />
          <input
            type="hidden"
            name="postId"
            value={postId ?? actionData?.post?.id}
          />
        </Form>
        <Form method="POST" className="w-full">
          <div className="">
            <Editor
              content={content}
              setContent={setContent}
              saveStatus={saveStatus}
              setSaveStatus={setSaveStatus}
              submit={submitContentDebounce}
            />
          </div>
          <input
            type="hidden"
            name="_action"
            value={postId === 'new' ? FormType.CREATE : FormType.UPDATE_CONTENT}
          />
          <input type="hidden" name="authorId" value={user?.id} />
          <input ref={submitContentRef} type="submit" className="hidden" />
          <input
            defaultValue={JSON.stringify(content)}
            type="hidden"
            name="postJSON"
          />
          <input
            type="hidden"
            name="postId"
            value={postId ?? actionData?.post?.id}
          />
        </Form>
      </div>
    </>
  )
}
