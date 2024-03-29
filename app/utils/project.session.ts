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
  liveLink: string
  content: string
}

export async function createProject({
  redirectTo,
  projectName,
  type,
  description,
  heroId,
  userId,
  liveLink,
  content,
}: PropsType) {
  await db.project.create({
    data: {
      name: projectName,
      type,
      description,
      heroId,
      userId,
      liveLink,
      content,
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
  liveLink,
  content,
}: PropsType) {
  await db.project.update({
    where: {
      id: projectId,
    },
    data: {
      name: projectName,
      type,
      description,
      heroId,
      userId,
      liveLink,
      content,
    },
  })
  return redirect(redirectTo ?? '')
}

export async function deleteProject(projectId: string, redirectTo: string) {
  await db.project.delete({
    where: {
      id: projectId,
    },
  })
  return redirect(redirectTo ?? '')
}
