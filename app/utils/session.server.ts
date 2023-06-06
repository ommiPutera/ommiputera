import { createCookieSessionStorage, redirect } from '@remix-run/node'
import {db} from './db.server'
import bcrypt from 'bcryptjs'

type LoginType = {
  username: string
  password: string
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

export async function register({username, password}: LoginType) {
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await db.user.create({data: {username, passwordHash}})
  return user
}

export async function login({username, password}: LoginType) {
  let user = await db.user.findFirst({where: {username}})
  if (!user) return

  const passwordsMatch = await bcrypt.compare(password, user.passwordHash)
  if (!passwordsMatch) return null
  return user
}

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(req: Request) {
  let session = await getUserSession(req)
    let userId = session.get("userId");
  if (typeof userId !== "string") return null;
  return userId;
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
