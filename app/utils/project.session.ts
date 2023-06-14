import {db} from './db.server'

type ProjectType = {
  projectId?: string
  projectName: string
  type: string
  description: string
  heroId: string
  userId: string
}

export async function createProject({
  projectName,
  type,
  description,
  heroId,
  userId,
}: ProjectType) {
  const project = await db.project.create({
    data: {
      name: projectName,
      type: type,
      description: description,
      heroId: heroId,
      userId: userId,
    },
  })
  return project
}

export async function updateProject({
  projectId,
  projectName,
  type,
  description,
  heroId,
  userId,
}: ProjectType) {
  const project = await db.project.update({
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
  return project
}
