import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {logout} from '~/utils/session.server'

export const action: ActionFunction = ({request}) => logout(request)

export const loader: LoaderFunction = () => redirect('/')
