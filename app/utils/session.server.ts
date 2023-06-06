import {createCookieSessionStorage, redirect} from '@remix-run/node'
import { db } from './db.server'
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

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'))
}

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

export async function logout(req: Request) {
  let session = await getUserSession(req)
  return redirect('/', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  })
}

export async function getUser(req: Request) {
  let userId = await getUserId(req)
  if (!userId) return null
  return db.user.findUnique({where: {id: userId}})
}

export async function getUserId(req: Request) {
  let session = await getUserSession(req)
  let userId = session.get('userId')
  if (typeof userId !== 'string') return null
  return userId
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

// somewhere you've got a session storage
const {getSession} = createCookieSessionStorage()

export async function requireUserSession(req: Request) {
  // get the session
  const cookie = req.headers.get('cookie')
  const session = await getSession(cookie)

  // validate the session, `userId` is just an example, use whatever value you
  // put in the session when the user authenticated
  if (!session.has('userId')) {
    // if there is no user session, redirect to login
    throw redirect('/login')
  }

  return session
}
