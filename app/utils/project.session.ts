import {redirect} from '@remix-run/node'
import {db} from './db.server'

type PropsType = {
  projectId?: string
  redirectTo?: string
  projectName: string
  type: string
  description: string
  heroId: string
  userId: string
}

export async function createProject({
  redirectTo,
  projectName,
  type,
  description,
  heroId,
  userId,
}: PropsType) {
  await db.project.create({
    data: {
      name: projectName,
      type: type,
      description: description,
      heroId: heroId,
      userId: userId,
    },
  })
  return redirect(redirectTo ?? '')
}

export async function updateProject({
  redirectTo,
  projectId,
  projectName,
  type,
  description,
  heroId,
  userId,
}: PropsType) {
  await db.project.update({
    where: {
      id: projectId,
    },
    data: {
      name: projectName,
      type: type,
      description: description,
      heroId: heroId,
      userId: userId,
    },
  })
  return redirect(redirectTo ?? '')
}
