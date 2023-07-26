import type {Post} from '@prisma/client'
import type {ActionFunction} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {
  createPost,
  deletePost,
  updateContent,
  updateTitle,
} from '~/utils/post.session'
import FormEditor from './form'

export type SaveStatus = 'Saved' | 'Unsaved' | 'Saving..'
export type ActionData = {
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
      const post = await updateContent({
        id: postId,
        content,
      })
      return {post}
    }
    default: {
      return {formError: `Action type invalid`}
    }
  }
}

export default function Index() {
  return (
    <div>
      <FormEditor />
    </div>
  )
}
