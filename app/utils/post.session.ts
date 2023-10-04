import {redirect} from '@remix-run/node'
import {db} from './db.server'
import type {JSONContent} from '@tiptap/core'
import type { PostStatus } from '@prisma/client'

type CreateType = {
  title: string
  content?: JSONContent
  authorId: string
  isPublished: boolean
  redirectTo?: string
}

export async function getPost({id}: {id: string}) {
  return await db.post.findUnique({where: {id: id}})
}

export async function deletePost({id}: {id: string}) {
  return await db.post.delete({where: {id: id}})
}

export async function favoritePost({id, bool}: {id: string; bool: boolean}) {
  return await db.post.update({
    where: {
      id: id,
    },
    data: {
      isFavorite: bool,
    },
  })
}

export async function updateStatusPost({id, status}: {id: string; status: PostStatus}) {
  return await db.post.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  })
}

export async function createPost({
  title,
  content,
  authorId,
  isPublished,
  redirectTo,
}: CreateType) {
  const post = await db.post.create({
    data: {
      title,
      isPublished,
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
      updatedAt: new Date(),
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
      updatedAt: new Date(),
    },
  })
}
