import {createCookieSessionStorage, redirect} from '@remix-run/node'
import {db} from './db.server'
import bcrypt from 'bcryptjs'
import type {Role} from '@prisma/client'

type LoginType = {
  username: string
  password: string
  role?: Role
}

type RegisterType = {
  username: string
  password: string
  email: string
  role?: Role
}

let sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
  throw new Error('Must enviornment variable SESSION_SECRET')
}

export let storage = createCookieSessionStorage({
  cookie: {
    name: 'RJ_session',
    secure: true,
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
})

export function getUserSession(req: Request) {
  return storage.getSession(req.headers.get('Cookie'))
}

export async function register({
  username,
  password,
  email,
  role,
}: RegisterType) {
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await db.user.create({
    data: {username, passwordHash, email, fullName: '', role},
  })
  return user
}

export async function login({username, password}: LoginType) {
  let user = await db.user.findFirst({where: {username}})
  if (!user) return

  const passwordsMatch = await bcrypt.compare(password, user.passwordHash)
  if (!passwordsMatch) return null
  return user
}

export async function logout(req: Request) {
  let session = await getUserSession(req)
  const pathname = new URL(req.url).pathname
  return redirect(pathname, {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  })
}

export async function getOwner() {
  return db.user.findMany({where: {role: 'OWNER'}})
}

export async function getUser(req: Request) {
  let userId = await getUserId(req)
  if (!userId) return null
  return db.user.findUnique({where: {id: userId}})
}

export async function getUserId(req: Request) {
  let session = await getUserSession(req)
  let userId = session.get('userId')
  if (typeof userId !== 'string') return 'null'
  return userId
}

export async function getUserRole(req: Request) {
  let user = await getUser(req)
  if (!user) return null
  return user.role
}

export async function createUserSession({
  userId,
  redirectUrl,
}: {
  userId: string
  redirectUrl: string
}) {
  let session = await storage.getSession()
  session.set('userId', userId)
  return redirect(redirectUrl, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  })
}

export async function requireUserSession(
  req: Request,
  exepctionRoute: Array<string>,
) {
  let session = await getUserSession(req)
  let userId = session.get('userId')
  const pathname = new URL(req.url).pathname

  if (exepctionRoute?.includes(pathname)) {
    return '__SKIP_THIS_SESSION__'
  }
  if (!userId) {
    throw redirect('/login')
  }
  return session
}
