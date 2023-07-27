import {type V2_MetaFunction} from '@remix-run/node'

export const meta: V2_MetaFunction = () => {
  return [{title: "Ain't nothing here"}]
}

export default function NotFoundPage() {
  return <main>404 bro</main>
}
