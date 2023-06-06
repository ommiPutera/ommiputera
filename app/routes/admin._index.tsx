import {
  type LoaderFunction,
} from '@remix-run/node';
import { getUserId } from '~/utils/session.server';

export const loader: LoaderFunction = async ({ request }) => {
  let userId = await getUserId(request);
  if (!userId) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return {};
};

export default function Index() {
  return <h1>Admin Page index</h1>
}
