import type {Post} from '@prisma/client'
import {
  redirect,
  type ActionFunction,
  type LoaderFunction,
} from '@remix-run/node'
import {
  Form,
  useActionData,
  useLoaderData,
  useSearchParams,
} from '@remix-run/react'
import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import {useDebouncedCallback} from 'use-debounce'
import Editor from '~/components/editor'
import {createPost, deletePost, getPost, updatePost} from '~/utils/post.session'
import {useRootData} from '~/utils/use-root-data'
import {Header} from './misc'

export type SaveStatus = 'Saved' | 'Unsaved' | 'Saving..'
type LoaderData = {
  post: Post | null
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
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export async function getLoaderData({request}: {request: Request}) {
  const {searchParams} = new URL(request.url)
  const id = searchParams.get('id')
  const post = await getPost({id: id ?? ''})
  return {post}
}

export const loader: LoaderFunction = async ({request}) => {
  const {post} = await getLoaderData({request})
  const data: LoaderData = {post}
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
      if (
        typeof title !== 'string' ||
        typeof authorId !== 'string' ||
        typeof postJSON !== 'string'
      ) {
        return {formError: `Form not submitted correctly.`}
      }
      if (!title) return {formError: 'No data at all to save.'}

      let content
      if (postJSON) {
        content = JSON.parse(postJSON)
      } else {
        content = JSON.parse(JSON.stringify({blocks: ['none']}))
      }

      const post = await createPost({
        title,
        authorId,
        published: true,
        content,
      })
      return {post}
    }
    case FormType.UPDATE: {
      if (
        typeof title !== 'string' ||
        typeof authorId !== 'string' ||
        typeof postId !== 'string' ||
        typeof postJSON !== 'string'
      ) {
        return {formError: `Form not submitted correctly.`}
      }
      let content
      if (postJSON) {
        content = JSON.parse(postJSON)
      } else {
        content = JSON.parse(JSON.stringify({blocks: ['none']}))
      }
      return await updatePost({
        id: postId,
        title,
        authorId,
        published: true,
        content,
      })
    }
    default: {
      return {formError: `Action type invalid`}
    }
  }
}

export default function Index() {
  const {post} = useLoaderData<LoaderData>()
  const [searchParams, setSearchParams] = useSearchParams()
  const submitRef = React.useRef<HTMLInputElement>(null)
  const [saveStatus, setSaveStatus] = React.useState<SaveStatus>('Saved')
  const [content, setContent] = React.useState(post?.content)

  const actionData = useActionData<ActionData>()
  const {user} = useRootData()
  const postId = searchParams.get('id')

  const [type, setType] = React.useState<FormType>(
    postId ? FormType.UPDATE : FormType.CREATE,
  )

  const submitDebounce = useDebouncedCallback(() => {
    if (submitRef.current) {
      submitRef.current.click()
    }
  }, 950)

  const submit = () => {
    if (submitRef.current) {
      submitRef.current.click()
    }
  }

  const handleDelete = () => {
    setType(FormType.DELETE)
  }

  React.useEffect(() => {
    if (actionData?.post?.id) {
      setType(FormType.UPDATE)
      setSearchParams({id: actionData?.post?.id})
    }
  }, [actionData?.post?.id, content, setSearchParams])

  return (
    <>
      <Header
        type={type}
        submit={submit}
        handleDelete={handleDelete}
        title={post?.title}
        saveStatus={saveStatus}
      />
      <div className="mx-auto my-0 mt-12 flex w-full max-w-3xl flex-col items-center justify-between gap-y-6 py-4">
        <Form className="w-full" method="post">
          <div className="px-6 md:px-0">
            <TextareaAutosize
              autoFocus
              id="title-field"
              name="title"
              onChange={submitDebounce}
              defaultValue={post?.title}
              placeholder="Untitled"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold leading-tight focus:outline-none lg:text-4xl"
            />
          </div>
          <div className="">
            <Editor
              content={content}
              setContent={setContent}
              saveStatus={saveStatus}
              setSaveStatus={setSaveStatus}
              submit={submit}
            />
          </div>
          <input type="hidden" name="_action" value={type} />
          <input
            defaultValue={JSON.stringify(content)}
            type="hidden"
            name="postJSON"
          />
          <input type="hidden" name="authorId" value={user?.id} />
          <input
            type="hidden"
            name="postId"
            value={postId ?? actionData?.post?.id}
          />
          <input ref={submitRef} type="submit" className="hidden" />
        </Form>
      </div>
    </>
  )
}
