import type {Post} from '@prisma/client'
import {db} from './db.server'

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
}: Post) {
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
