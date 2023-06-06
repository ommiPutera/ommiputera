import {type LoaderFunction} from '@remix-run/node'
import {getUserId} from '~/utils/session.server'

export const loader: LoaderFunction = async ({request}) => {
  let userId = await getUserId(request)
  if (!userId) {
    throw new Response('Unauthorized', {status: 401})
  }
  return {}
}

export default function Index() {
  return (
    <div>
      <h1>Admin Page index</h1>

      <form action="/logout" method="post">
        <button type="submit" className="button">
          Logout
        </button>
      </form>
    </div>
  )
}
