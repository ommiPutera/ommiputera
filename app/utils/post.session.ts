import type {Post} from '@prisma/client'
import {db} from './db.server'
import {redirect} from '@remix-run/node'

type UpdateType = {
  id: string
  title: string
  content?: string
  authorId: string
  published: boolean
}

type CreateType = {
  title: string
  content?: string
  authorId: string
  published: boolean
}

export async function getPostByAuthor({authorId}: {authorId: string}) {
  return await db.post.findMany({where: {authorId: authorId}})
}

export async function getPost({id}: {id: string}) {
  return await db.post.findUnique({where: {id: id}})
}

export async function createPost({
  title,
  content,
  authorId,
  published,
}: CreateType) {
  return await db.post.create({
    data: {
      title,
      published,
      authorId,
      content: content,
    },
  })
}

export async function updatePost({
  id,
  title,
  content,
  authorId,
  published,
}: UpdateType) {
  return await db.post.update({
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
}
