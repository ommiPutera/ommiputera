import type {LoaderFunction} from '@remix-run/node'
import {type ActionFunction, redirect} from '@remix-run/node'
import {type V2_MetaFunction, Form, useActionData} from '@remix-run/react'
import React from 'react'
import {Button} from '~/components/button'
import {Input, Label} from '~/components/form-elements'
import {createUserSession, getUser, login} from '~/utils/session.server'

// type LoaderData = {username: string; error: string}

type ActionData = {
  formError?: string
  fieldErrors?: {
    username: string | undefined
    password: string | undefined
  }
  fields?: {
    username: string
    password: string
  }
}

export const loader: LoaderFunction = async ({request}) => {
  const user = await getUser(request)
  if (user) return redirect('/dashboard')
  return {}
}

export const meta: V2_MetaFunction = () => {
  return [{title: `Login to ommiputera.com`}]
}

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')
  const redirectTo = formData.get('redirectTo') || '/dashboard'
  console.table({
    password: password,
    username: username,
    redirectTo: redirectTo,
  })
  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string'
  ) {
    return {formError: `Form not submitted correctly.`}
  }

  let fields = {username, password}
  const user = await login({username, password})
  if (!user) {
    return {
      fields,
      formError: `Username/Password combination is incorrect, Please read this guide for further details`,
    }
  }
  return createUserSession({userId: user.id, redirectUrl: redirectTo})
}

export default function Index() {
  let actionData = useActionData<ActionData | undefined>()
  const [submitted, setSubmitted] = React.useState(false)
  const [formValues, setFormValues] = React.useState({
    username: '',
    password: '',
  })

  let formIsValid =
    Boolean(formValues.username) &&
    formValues.password.match(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
    )

  return (
    <main className="flex flex-col gap-5 pb-44 pt-8 lg:gap-16 lg:pt-16">
      <div className="px-10vw py-9 lg:py-12">
        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="px-0 text-center text-3xl font-medium leading-tight md:w-2/3 lg:px-9 lg:text-4xl xl:w-3/5">
            Log in to <br /> ommiputera.com
          </h1>
        </div>
        <div className="flex items-center justify-center pt-8 lg:py-12">
          <Form
            onChange={e => {
              const form = e.currentTarget
              setFormValues({
                username: form.username.value,
                password: form.password.value,
              })
              setSubmitted(false)
            }}
            method="POST"
            className="w-full lg:w-[18rem]"
            aria-describedby={
              actionData?.formError ? 'form-error-message' : undefined
            }
            onSubmit={() => setSubmitted(true)}
          >
            <div className="mb-3">
              <div className="flex flex-wrap items-baseline justify-between lg:mb-1.5">
                <Label htmlFor="username-field">Username</Label>
              </div>
              <Input
                type="text"
                name="username"
                placeholder="username"
                id="username-field"
                aria-describedby={
                  actionData?.fieldErrors?.username
                    ? 'username-error'
                    : undefined
                }
              />
              {actionData?.fieldErrors?.username ? (
                <p
                  className="form-validation-error"
                  role="alert"
                  id="username-error"
                >
                  {actionData?.fieldErrors.username}
                </p>
              ) : null}
            </div>
            <div className="mb-3">
              <div className="flex flex-wrap items-baseline justify-between lg:mb-1.5">
                <Label htmlFor="password-field">Password</Label>
              </div>
              <Input
                type="password"
                id="password-field"
                name="password"
                placeholder="password"
                autoComplete="nope"
              />
            </div>
            {actionData?.formError ? (
              <div
                id="form-error-message"
                className="mb-2 mt-4 rounded-md border border-red-200 bg-red-100 px-4 py-3 pt-2 text-center text-red-900"
              >
                <p
                  className="form-validation-error text-sm font-medium"
                  role="alert"
                >
                  {actionData?.formError}
                </p>
              </div>
            ) : null}
            <Button
              type="submit"
              size="md"
              className="button mt-2"
              disabled={!formIsValid || submitted}
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </main>
  )
}
