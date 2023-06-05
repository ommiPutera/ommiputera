import {json, type LoaderFunction, type ActionFunction, redirect} from '@remix-run/node'
import {type V2_MetaFunction, useLoaderData, Form} from '@remix-run/react'
import React from 'react'
import {db} from '~/utils/db.server'

type LoaderData = {email: string}

// export const loader: LoaderFunction = async ({request}) => {
//   const user = await getUser(request)
//   let data: LoaderData = {jokes}
//    return json(data, {headers})
// }

export const meta: V2_MetaFunction = ({matches}) => {
  // const parentMeta = matches.flatMap(match => match.meta ?? [])
  return [{title: `Login to`}]
}

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData()
  const emailAddress = formData.get('email')
  if (emailAddress === 'omiputraakaruni@gmail.com') return redirect('/admin')
  return {}
}

export default function Index() {
  // const data = useLoaderData<LoaderData>()
  const [submitted, setSubmitted] = React.useState(false)

  const [formValues, setFormValues] = React.useState({
    email: '',
  })

  const formIsValid = formValues.email.match(/.+@.+/)

  return (
    <main className="flex flex-col gap-5 pb-44 lg:gap-16">
      <div className="px-5vw py-9 lg:px-15vw lg:py-12">
        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="px-0 text-center text-3xl font-medium leading-tight md:w-2/3 lg:px-9 lg:text-5xl xl:w-3/5">
            Log in to your account.
          </h1>
          <p className="mt-2 px-0 text-center font-medium text-gray-300 md:w-2/3 lg:mt-0 lg:px-9 xl:w-3/5">
            2 years of proven experience in helping to create and maintain a
            better code base for re-usability and best practices. Experience in
            developing projects from concept to launch. Eager to tackle more
            complex problems, and continues to find ways to maximize user
            efficiency
          </p>
          <Form
            onChange={e => {
              const form = e.currentTarget
              setFormValues({email: form.email.value})
            }}
            method="POST"
            onSubmit={() => setSubmitted(true)}
          >
            <div>
              <div>
                <label htmlFor="">Email address</label>
              </div>
              <input type="text" name="email" />
            </div>
            <br />
            <button
              type="submit"
              className="button"
              disabled={!formIsValid || submitted}
            >
              Submit
            </button>
          </Form>
        </div>
      </div>
    </main>
  )
}
