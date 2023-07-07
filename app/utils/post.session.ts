import type {Post} from '@prisma/client'
import {db} from './db.server'

type UpdateType = {
  id: string
  title: string
  content?: string
  authorId: string
  published: boolean
}

export async function createPost({title, content, authorId, published}: Post) {
  await db.post.create({
    data: {
      title,
      published,
      authorId,
      content: JSON.stringify(content),
    },
  })
  return null
}

export async function updatePost({
  id,
  title,
  content,
  authorId,
  published,
}: UpdateType) {
  await db.post.update({
    where: {
      id: id,
    },
    data: {
      title,
      published,
      authorId,
      content,
    },
  })
  return null
}
