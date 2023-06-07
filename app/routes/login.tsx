import {
  json,
  type LoaderFunction,
  type ActionFunction,
  redirect,
} from '@remix-run/node'
import {
  type V2_MetaFunction,
  useLoaderData,
  Form,
  useActionData,
  useSearchParams,
} from '@remix-run/react'
import React from 'react'
import { Input, Label } from '~/components/form-elements'
import { db } from '~/utils/db.server'
import { register, createUserSession, login } from '~/utils/session.server'

type LoaderData = { username: string }

type ActionData = {
  formError?: string
  fieldErrors?: {
    username: string | undefined
    password: string | undefined
  }
  fields?: {
    loginType: string
    username: string
    password: string
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  return {}
}

export const meta: V2_MetaFunction = ({ matches }) => {
  // const domain = new URL(requestInfo.origin).host

  return [{ title: `Login to` }]
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')
  const loginType = formData.get('loginType')
  const redirectTo = formData.get('redirectTo') || '/admin'
  console.table({
    password: password,
    username: username,
    loginType: loginType,
    redirectTo: redirectTo,
  })
  if (
    typeof loginType !== 'string' ||
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string'
  ) {
    return { formError: `Form not submitted correctly.` }
  }

  let fields = { loginType, username, password }
  switch (loginType) {
    case 'login': {
      const user = await login({ username, password })
      if (!user) {
        return {
          fields,
          formError: `Username/Password combination is incorrect`,
        }
      }
      return createUserSession({ userId: user.id, redirectUrl: redirectTo })
    }
    case 'register': {
      let userExists = await db.user.findFirst({
        where: { username },
      })
      if (userExists) {
        return {
          fields,
          formError: `User with username ${username} already exists`,
        }
      }
      const user = await register({ username, password })
      if (!user) {
        console.log('Something went wrong')
        return {
          fields,
          formError: `Something went wrong trying to create a new user.`,
        }
      }
      return createUserSession({ userId: user.id, redirectUrl: redirectTo })
    }
    default: {
      return {}
    }
  }
}

export default function Index() {
  // const data = useLoaderData<LoaderData>()
  let actionData = useActionData<ActionData | undefined>()
  let [searchParams] = useSearchParams()
  const [submitted, setSubmitted] = React.useState(false)
  const [formValues, setFormValues] = React.useState({
    username: '',
    password: '',
  })

  const formIsValid = formValues.username.match(/.+@.+/)

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
        </div>
        <div className="flex items-center justify-center lg:py-12">
          <Form
            onChange={e => {
              const form = e.currentTarget
              setFormValues({
                username: form.username.value,
                password: form.password.value,
              })
            }}
            method="POST"
            className='w-[22rem]'
            onSubmit={() => setSubmitted(true)}
          >
            <fieldset>
              <legend className="sr-only">Login or Register?</legend>
              <Label>
                <input
                  type="radio"
                  name="loginType"
                  value="login"
                  defaultChecked={
                    !actionData?.fields?.loginType ||
                    actionData?.fields?.loginType === 'login'
                  }
                />{' '}
                Login
              </Label>
              <br />
              <label>
                <input
                  type="radio"
                  name="loginType"
                  value="register"
                  defaultChecked={actionData?.fields?.loginType === 'register'}
                />{' '}
                Register
              </label>
            </fieldset>
            <div className='flex flex-col gap-2'>
              <div className='mb-3'>
                <div className="mb-2 flex flex-wrap items-baseline justify-between">
                  <Label htmlFor="username-field">username</Label>
                </div>
                <Input type="text" name="username" id="username-field" />
              </div>
              <div className='mb-6'>
                <div className="mb-2 flex flex-wrap items-baseline justify-between">
                  <Label htmlFor="password-field">password</Label>
                </div>
                <Input
                  type="password"
                  id="password-field"
                  name="password"
                  autoComplete="nope"
                />
              </div>
            </div>
            <div className="sr-only" aria-live="polite">
              {formIsValid
                ? 'Sign in form is now valid and ready to submit'
                : 'Sign in form is now invalid.'}
            </div>
            <button type="submit" className="button">
              Submit
            </button>
            <br />
          </Form>
        </div>
      </div>
    </main>
  )
}
