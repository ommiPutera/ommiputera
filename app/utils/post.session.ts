import {redirect} from '@remix-run/node'
import {db} from './db.server'

type CreateType = {
  title: string
  content?: string
  authorId: string
  published: boolean
  redirectTo?: string
}

export async function getPostByAuthor({authorId}: {authorId: string}) {
  return await db.post.findMany({where: {authorId: authorId}})
}

export async function getPost({id}: {id: string}) {
  return await db.post.findUnique({where: {id: id}})
}

export async function deletePost({id}: {id: string}) {
  return await db.post.delete({where: {id: id}})
}

export async function createPost({
  title,
  content,
  authorId,
  published,
  redirectTo,
}: CreateType) {
  const post = await db.post.create({
    data: {
      title,
      published,
      authorId,
      content: content,
    },
  })
  return redirect(redirectTo + post.id ?? '')
}

export async function updateTitle({id, title}: {id: string; title: string}) {
  return await db.post.update({
    where: {
      id: id,
    },
    data: {
      title,
    },
  })
}

export async function updateContent({
  id,
  content,
}: {
  id: string
  content: string
}) {
  return await db.post.update({
    where: {
      id: id,
    },
    data: {
      content,
    },
  })
}
