import { type V2_MetaFunction } from '@remix-run/react'

export const meta: V2_MetaFunction = ({ matches }) => {
  return [{ title: 'Auth' }]
}

export default function Index() {
  return (
    <main className="flex flex-col gap-5 pb-44 lg:gap-16">
      {/* <button onClick={register} type="button">Register</button>
      <button onClick={login} type="button">Log In</button> */}
    </main>
  )
}