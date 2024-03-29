import {redirect} from '@remix-run/node'
import type {LoaderFunction, ActionFunction} from '@remix-run/node'
import {type V2_MetaFunction, Form, useActionData} from '@remix-run/react'
import {debounce} from 'lodash'
import React from 'react'
import {Button} from '~/components/button'
import {Input, Label} from '~/components/form-elements'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '~/components/shadcn/tabs'
import {SectionSpacer} from '~/components/spacer'
import {Info} from 'lucide-react'
import {db} from '~/utils/db.server'
import {
  createUserSession,
  getUser,
  login,
  register,
} from '~/utils/session.server'
import {Logo} from '~/components/navbar'

// type LoaderData = {username: string; error: string}

type ActionData = {
  formError?: string
  fieldErrors?: {
    loginType: string | undefined
    username: string | undefined
    password: string | undefined
    email: string | undefined
  }
  fields?: {
    loginType: string
    username: string
    password: string
    email: string
  }
}

async function getLoaderData({request}: {request: Request}) {
  const {searchParams} = new URL(request.url)
  const paramsTo = searchParams.get('to')
  return {paramsTo}
}

export const loader: LoaderFunction = async ({request}) => {
  const {paramsTo} = await getLoaderData({request})
  const user = await getUser(request)
  if (!user) return null
  if (paramsTo) return redirect(paramsTo)
  if (user.role === 'BASIC') return redirect('/personal')
  if (user.role === 'OWNER' || user.role === 'CLIENT')
    return redirect('/overview')
  return null
}

export const meta: V2_MetaFunction = () => {
  return [{title: `Login to ommiputera.com`}]
}

export const action: ActionFunction = async ({request}) => {
  const {paramsTo} = await getLoaderData({request})
  const formData = await request.formData()
  const loginType = formData.get('loginType')
  const email = formData.get('email')
  const username = formData.get('username')
  const password = formData.get('password')
  console.table({
    password: password,
    username: username,
    email: email,
    paramsTo: paramsTo,
  })

  let fields = {username, password}

  switch (loginType) {
    case 'login': {
      if (typeof username !== 'string' || typeof password !== 'string') {
        return {formError: `Form not submitted correctly.`}
      }

      const user = await login({username, password})
      let redirect = '/'
      if (!user) {
        return {
          fields,
          formError: `Username/Password combination is incorrect, Please read this guide for further details`,
        }
      }

      if (user.role === 'BASIC') {
        redirect = paramsTo || '/personal'
      }
      if (user.role === 'CLIENT' || user.role === 'OWNER') {
        redirect = '/overview'
      }
      return createUserSession({userId: user.id, redirectUrl: redirect})
    }
    case 'register': {
      if (
        typeof username !== 'string' ||
        typeof password !== 'string' ||
        typeof email !== 'string'
      ) {
        return {formError: `Form not submitted correctly.`}
      }

      let userExists = await db.user.findFirst({
        where: {username},
      })
      if (userExists) {
        return {
          fields,
          formError: `User with username ${username} already exists`,
        }
      }
      const user = await register({username, password, email, role: 'BASIC'})
      let redirect = '/personal'
      if (!user) {
        return {
          fields,
          formError: `Something went wrong trying to create a new user.`,
        }
      }
      if (typeof paramsTo === 'string') {
        redirect = paramsTo
      }
      return createUserSession({userId: user.id, redirectUrl: redirect})
    }
    default: {
      return {fields, formError: `Login type invalid`}
    }
  }
}

export default function Index() {
  let actionData = useActionData<ActionData | undefined>()
  const [submitted, setSubmitted] = React.useState(false)
  const [error, setError] = React.useState('')
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    React.useState(false)
  const [isPasswordValid, setIsPasswordValid] = React.useState(false)
  const [formValues, setFormValues] = React.useState({
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
    loginType: '',
  })

  let loginFormIsValid =
    Boolean(formValues.username) &&
    formValues.password.match(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
    )
  let isPasswordMatch = formValues.password === formValues.confirmPassword
  let registerFormIsValid = loginFormIsValid && isPasswordMatch

  React.useEffect(() => {
    if (actionData?.formError) {
      setError(actionData?.formError)
    }
  }, [actionData?.formError])

  return (
    <main className="flex min-h-screen w-full flex-col justify-center gap-5">
      <div className="mx-auto px-5vw py-9 lg:px-10vw lg:py-10">
        <div className="flex w-[22rem] flex-col">
          <div className="mb-16 flex w-full flex-col gap-3">
            <div className="flex items-center">
              <p className="mr-1 whitespace-nowrap text-2xl font-medium leading-none text-black dark:text-white lg:text-3xl">
                Log in to
                <span className="ml-[1px] text-md font-light text-gray-700 dark:text-gray-100"></span>
              </p>
              <Logo />
            </div>
          </div>
          <Tabs
            defaultValue="login"
            className="mx-auto w-full lg:w-auto"
            onValueChange={() => setError('')}
          >
            <TabsList className="mb-2 w-full gap-x-2 border-0 p-0">
              <TabsTrigger value="login" className="w-full">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="w-full">
                Register
              </TabsTrigger>
            </TabsList>
            <SectionSpacer size="sm" />
            <TabsContent value="login">
              <Form
                onChange={e => {
                  const form = e.currentTarget
                  setFormValues({
                    username: form.username.value,
                    password: form.password.value,
                    loginType: form.loginType.value,
                    confirmPassword: '',
                    email: '',
                  })
                  setSubmitted(false)
                }}
                method="POST"
                className="my-6 w-full lg:w-[22rem]"
                aria-describedby={
                  actionData?.formError ? 'form-error-message' : undefined
                }
                onSubmit={() => setSubmitted(true)}
              >
                <div className="mb-3">
                  <input type="hidden" name="loginType" value="login" />
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
                {error ? (
                  <div
                    id="form-error-message"
                    className="mb-2 mt-4 rounded-md border border-red-200 bg-red-100 px-4 py-3 pt-2 text-center text-red-900"
                  >
                    <p
                      className="form-validation-error text-sm font-medium"
                      role="alert"
                    >
                      {error}
                    </p>
                  </div>
                ) : null}
                <Button
                  type="submit"
                  size="md"
                  className="mt-3 py-1"
                  disabled={!loginFormIsValid || submitted}
                >
                  Login
                </Button>
              </Form>
              <div>
                <p className="text-secondary text-center text-md font-light">
                  or
                </p>
              </div>
            </TabsContent>
            <TabsContent value="register">
              <Form
                onChange={e => {
                  const form = e.currentTarget
                  setFormValues({
                    username: form.username.value,
                    password: form.password.value,
                    loginType: form.loginType.value,
                    confirmPassword: form.confirmPassword.value,
                    email: form.email.value,
                  })
                  setSubmitted(false)
                }}
                method="POST"
                className="w-full lg:w-[22rem]"
                aria-describedby={
                  actionData?.formError ? 'form-error-message' : undefined
                }
                onSubmit={() => setSubmitted(true)}
              >
                <div className="mb-3">
                  <input type="hidden" name="loginType" value="register" />
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
                    <Label htmlFor="email-field">Email</Label>
                  </div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="email"
                    id="email-field"
                    aria-describedby={
                      actionData?.fieldErrors?.email ? 'email-error' : undefined
                    }
                  />
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
                    onFocus={debounce(() => setIsPasswordValid(true), 2000)}
                    onBlur={() =>
                      loginFormIsValid
                        ? setIsPasswordValid(false)
                        : setIsPasswordValid(true)
                    }
                  />
                  {isPasswordValid && !loginFormIsValid ? (
                    <div
                      id="form-error-message"
                      className="mb-4 mt-2 flex items-center gap-x-3 rounded-md border border-gray-100 bg-gray-800 px-4 py-3 text-gray-200 dark:border-gray-800"
                    >
                      <div>
                        <Info className="h-5 w-5" />
                      </div>
                      <p
                        className="form-validation-error text-sm font-light leading-tight"
                        role="alert"
                      >
                        Pastikan kata sandi terdiri dari 6 huruf dengan gabungan
                        simbol, angka, dan kapital.
                      </p>
                    </div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <div className="flex flex-wrap items-baseline justify-between lg:mb-1.5">
                    <Label htmlFor="confirm-password-field">
                      Confirm Password
                    </Label>
                  </div>
                  <Input
                    type="password"
                    id="confirm-password-field"
                    name="confirmPassword"
                    placeholder="confirm password"
                    autoComplete="nope"
                    onFocus={debounce(
                      () => setIsConfirmPasswordFocused(true),
                      2000,
                    )}
                  />
                </div>
                {error ? (
                  <div
                    id="form-error-message"
                    className="mb-2 mt-4 flex items-center gap-x-3 rounded-md border border-red-300 bg-red-100 px-4 py-3 text-center text-red-900"
                  >
                    <p
                      className="form-validation-error text-sm font-medium leading-tight"
                      role="alert"
                    >
                      {error}
                    </p>
                  </div>
                ) : null}
                {!isPasswordMatch && isConfirmPasswordFocused ? (
                  <div
                    id="form-error-message"
                    className="mb-2 mt-4 flex items-center gap-x-3 rounded-md border border-red-300 bg-red-100 px-4 py-3 text-center text-red-900"
                  >
                    <div>
                      <Info className="h-5 w-5" />
                    </div>
                    <p
                      className="form-validation-error text-sm font-medium leading-tight"
                      role="alert"
                    >
                      Password not match
                    </p>
                  </div>
                ) : null}
                <Button
                  type="submit"
                  size="md"
                  className="mt-3 py-1"
                  disabled={!registerFormIsValid || submitted}
                >
                  Register
                </Button>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
