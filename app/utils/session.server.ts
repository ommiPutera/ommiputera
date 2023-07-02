import {createCookieSessionStorage, redirect} from '@remix-run/node'
import {db} from './db.server'
import bcrypt from 'bcryptjs'

type LoginType = {
  username: string
  password: string
  role?: string
}

let sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
  throw new Error('Must enviornment variable SESSION_SECRET')
}

let storage = createCookieSessionStorage({
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

export async function register({username, password, role}: LoginType) {
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await db.user.create({
    data: {username, passwordHash, email: '', fullName: '', role},
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
  let origin = req.headers.get('origin') || ''
  const routeName = req.headers.get('referer')?.replace(origin, '') || '/'
  return redirect(routeName, {
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

export async function requireUserSession(req: Request) {
  let session = await getUserSession(req)
  let userId = session.get('userId')
  if (!userId) {
    throw redirect('/login')
  }
  return session
}
