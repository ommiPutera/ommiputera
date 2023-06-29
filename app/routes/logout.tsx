import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {logout} from '~/utils/session.server'

export const action: ActionFunction = ({request}) => logout(request)

export const loader: LoaderFunction = ({request}) => {
  let origin = request.headers.get('origin') || ''
  const routeName = request.headers.get('referer')?.replace(origin, '') || '/'
  return redirect(routeName)
}
