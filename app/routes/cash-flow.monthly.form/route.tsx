import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useSearchParams,
} from '@remix-run/react'
import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { EditorJs, FormType } from '../cash-flow.monthly._index/route'
import type { Post } from '@prisma/client'
import {
  redirect,
  type ActionFunction,
  type LoaderFunction,
} from '@remix-run/node'
import { getUserId } from '~/utils/session.server'
import {
  createPost,
  deletePost,
  getPost,
  getPostByAuthor,
  updatePost,
} from '~/utils/post.session'
import type { EditorCore } from '~/components/editor'
import { useRootData } from '~/utils/use-root-data'
import { UIButton } from '~/components/shadcn/button'
import { MoveLeftIcon } from 'lucide-react'
import { Header } from './components'
import { useToast } from '~/components/shadcn/use-toast'

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
    title: string
    postJSON: string
  }
}

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
      const post = await createPost({
        title,
        authorId,
        published: true,
        content: JSON.parse(postJSON),
      })
      return { post }
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
      const post = await updatePost({
        id: postId,
        title,
        authorId,
        published: true,
        content: JSON.parse(postJSON),
      })
      return { post }
    }
    default: {
      return { formError: `Action type invalid` }
    }
  }
}

export default function Index() {
  const actionData = useActionData<ActionData | undefined>()
  const [searchParams, setSearchParams] = useSearchParams()
  const postId = searchParams.get('id') || actionData?.post?.id
  const submitRef = React.useRef<HTMLInputElement>(null)
  const [type, setType] = React.useState<FormType>(
    postId ? FormType.UPDATE : FormType.CREATE,
  )
  const { toast } = useToast()

  const submit = () => {
    if (submitRef.current) {
      submitRef.current.click()
      toast({
        title: 'Saved!',
        description: "Data berhasil disimpan",
      })
    }
  }

  const handleSave = () => {
    // SUBMIT TRIGER
    submit()
    // SET POST ID
    if (postId && !searchParams.get('id')) {
      setSearchParams({ id: postId })
    }
  }

  const handleDelete = () => {
    setType(FormType.DELETE)
  }

  return (
    <div className="">
      <BackButton />
      <div className="flex items-center justify-between py-4">
        <div className="text-left">
          <h1 className="leading-tigh px-0 text-xl font-medium capitalize lg:text-lg">
            {type.toLowerCase()} Data Monthly Expense
          </h1>
          <p className="text-secondary mt-1 text-md font-light">
            Query and visualize your Vercel usage.
          </p>
        </div>
        <Header
          type={type}
          handleSave={handleSave}
          handleDelete={handleDelete}
          submit={submit}
        />
      </div>
      <FormEditor submitRef={submitRef} type={type} />
    </div>
  )
}

function BackButton() {
  return (
    <Link to="/cash-flow/monthly" prefetch="intent">
      <UIButton
        type="button"
        variant="subtle"
        className="text-md text-orange-500"
      >
        <MoveLeftIcon className="mr-2.5" size="20" />
        <p>Back to monthly expense</p>
      </UIButton>
    </Link>
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
  const actionData = useActionData<ActionData | undefined>()
  const postId = searchParams.get('id') || actionData?.post?.id

  const [, setFormValues] = React.useState({
    title: '',
    postJSON: '',
  })

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
      console.log('JSON.stringify(savedData): ', JSON.stringify(savedData))
      postJSONRef.current.value = JSON.stringify(savedData)
    }
  }, [editorCore])

  return (
    <Form
      method="POST"
      className="py-4 lg:py-14"
      onChange={e => {
        const form = e.currentTarget
        setFormValues({
          title: form.title,
          postJSON: form.postJSON,
        })
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
        ref={postJSONRef}
        defaultValue={JSON.stringify(post?.content)}
        type="hidden"
        name="postJSON"
      />
      <input readOnly type="hidden" name="postId" value={postId} />
      <input ref={submitRef} type="submit" readOnly className="hidden" />
    </Form>
  )
}
