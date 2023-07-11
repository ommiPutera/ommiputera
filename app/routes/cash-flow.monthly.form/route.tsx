import {
  Form,
  useActionData,
  useLoaderData,
  useSearchParams,
} from '@remix-run/react'
import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import loadable from '@loadable/component'
import type { Post } from '@prisma/client'
import {
  redirect,
  type ActionFunction,
  type LoaderFunction,
} from '@remix-run/node'
import { MoveLeftIcon, RocketIcon } from 'lucide-react'
import type { EditorCore } from '~/components/editor'
import { UIButton } from '~/components/shadcn/button'
import {
  createPost,
  deletePost,
  getPost,
  getPostByAuthor,
  updatePost,
} from '~/utils/post.session'
import { getUserId } from '~/utils/session.server'
import { useRootData } from '~/utils/use-root-data'
import { Header } from './misc'
import { create } from 'zustand'
import { Alert, AlertDescription, AlertTitle } from '~/components/shadcn/alert'
import type { OutputData } from '@editorjs/editorjs'

const EditorJs = loadable(() => import('~/components/editor'))

export enum FormType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

type LoaderData = {
  posts: Post[] | null
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

interface FormValues {
  title: string
  setTitle: (value: string) => void

  postJSON: OutputData
  setPostJSON: (value: OutputData) => void
}

export const useFormFields = create<FormValues>(set => ({
  title: '',
  setTitle: (value: string) => set(state => ({ title: value })),

  postJSON: {
    version: '',
    time: 0,
    blocks: [],
  },
  setPostJSON: (value: OutputData) => set(() => ({ postJSON: value })),
}))

export async function getLoaderData({ request }: { request: Request }) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const userId = await getUserId(request)

  const post = await getPost({ id: id ?? '' })
  const posts = await getPostByAuthor({ authorId: userId })
  return { post, posts }
}

export const loader: LoaderFunction = async ({ request }) => {
  const { post, posts } = await getLoaderData({ request })
  const data: LoaderData = { post, posts }
  return data
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const { _action, postId, title, authorId, postJSON } =
    Object.fromEntries(formData)

  console.table({
    _action,
    postId,
    title,
    authorId,
    postJSON,
  })

  switch (_action) {
    case FormType.DELETE: {
      if (typeof postId !== 'string') {
        return { formError: `Form not submitted correctly.` }
      }
      await deletePost({ id: postId })
      return redirect('/cash-flow/monthly', {})
    }
    case FormType.CREATE: {
      if (
        typeof title !== 'string' ||
        typeof authorId !== 'string' ||
        typeof postJSON !== 'string'
      ) {
        return { formError: `Form not submitted correctly.` }
      }
      if (!postJSON || !title) return { formError: 'No data at all to save.' }
      const post = await createPost({
        title,
        authorId,
        published: true,
        content: JSON.parse(postJSON),
      })
      return {
        post,
        formMessage: 'Data telah di publish',
      }
    }
    case FormType.UPDATE: {
      if (
        typeof title !== 'string' ||
        typeof authorId !== 'string' ||
        typeof postId !== 'string' ||
        typeof postJSON !== 'string'
      ) {
        return { formError: `Form not submitted correctly.` }
      }
      await updatePost({
        id: postId,
        title,
        authorId,
        published: true,
        content: JSON.parse(postJSON),
      })
      return redirect('/cash-flow/monthly', {})
    }
    default: {
      return { formError: `Action type invalid` }
    }
  }
}

export default function Index() {
  const submitRef = React.useRef<HTMLInputElement>(null)
  const actionData = useActionData<ActionData | undefined>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const postId = actionData?.post?.id || searchParams.get('id')
  const [type, setType] = React.useState<FormType>(
    postId ? FormType.UPDATE : FormType.CREATE,
  )

  const { title, postJSON } = useFormFields()
  const isValidPublish = title && postJSON?.blocks?.length

  const submit = () => {
    if (submitRef.current) {
      submitRef.current.click()
      // toast({
      //   title: 'Saved!',
      //   description: 'Data berhasil disimpan',
      // })
    }
  }

  const handleSave = React.useCallback(() => {
    // SUBMIT TRIGER
    submit()

    // SET POST ID
    setIsSubmitted(true)
    setType(FormType.UPDATE)
    if (actionData?.post.id && !searchParams.get('id') && isSubmitted) {
      setSearchParams({ id: actionData?.post?.id })
      setIsSubmitted(false)
    }
  }, [actionData?.post.id, isSubmitted, searchParams, setSearchParams])

  const handleDelete = () => {
    setType(FormType.DELETE)
  }

  React.useEffect(() => {
    window.onpopstate = () => handleSave()
    window.addEventListener('beforeunload', handleSave)
  }, [handleSave, postJSON.blocks.length, title])

  return (
    <div className="">
      <BackButton submit={submit} />
      <div className="flex items-center justify-between py-4">
        <Title type={type} />
        {actionData?.formMessage}
        <Header
          type={type}
          handleSave={handleSave}
          handleDelete={handleDelete}
          submit={submit}
          isValidPublish={!isValidPublish}
        />
      </div>
      <FormEditor submitRef={submitRef} type={type} />
    </div>
  )
}

function Title({ type }: { type: string }) {
  return (
    <div className="text-left">
      <h1 className="leading-tigh px-0 text-xl font-medium capitalize lg:text-lg">
        {type.toLowerCase()} Data Monthly Expense
      </h1>
      <p className="text-secondary mt-1 text-md font-light">
        Query and visualize your Vercel usage.
      </p>
    </div>
  )
}

function BackButton({ submit }: { submit: () => void }) {
  return (
    <UIButton
      onClick={() => submit()}
      type="submit"
      variant="subtle"
      className="text-md text-orange-500"
    >
      <MoveLeftIcon className="mr-2.5" size="20" />
      <p>Back to monthly expense</p>
    </UIButton>
  )
}

function FormEditor({
  submitRef,
  type,
}: {
  submitRef: React.RefObject<HTMLInputElement>
  type: FormType
}) {
  const { post } = useLoaderData<LoaderData>()
  const { user } = useRootData()
  const [searchParams] = useSearchParams()
  const { postJSON, setTitle, setPostJSON } = useFormFields()
  const actionData = useActionData<ActionData | undefined>()
  const postId = searchParams.get('id') || actionData?.post?.id

  const postJSONRef = React.useRef<HTMLInputElement>(null)
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
      // postJSONRef.current.value = JSON.stringify(savedData)
      setPostJSON(savedData)
    }
  }, [setPostJSON])

  return (
    <div className="py-4">
      {actionData?.formMessage && (
        <Alert className="mb-6">
          <RocketIcon className="h-5 w-5" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>{actionData?.formMessage}</AlertDescription>
        </Alert>
      )}
      <Form
        method="POST"
        noValidate
        replace
        onChange={e => {
          const target = e.currentTarget
          console.log(postJSON)
          // @ts-ignore
          setTitle(target.title.value)
        }}
      >
        <div className="px-6 md:px-0">
          <TextareaAutosize
            autoFocus
            id="title-field"
            name="title"
            defaultValue={post?.title}
            placeholder="Post title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold leading-tight focus:outline-none md:text-5xl"
          />
        </div>
        <EditorJs
          placeholder="Use `TAB` to open the command menu."
          defaultValue={post?.content}
          holder={post?.title}
          onInitialize={handleInitialize}
          handleSave={handleSave}
        />
        <input type="hidden" readOnly name="_action" value={type} />
        <input type="hidden" readOnly name="authorId" value={user?.id} />
        <input
          readOnly
          ref={postJSONRef}
          value={JSON.stringify(postJSON)}
          defaultValue={post?.content}
          type="hidden"
          name="postJSON"
        />
        <input readOnly type="hidden" name="postId" value={postId} />
        <input ref={submitRef} type="submit" readOnly className="hidden" />
      </Form>
    </div>
  )
}
