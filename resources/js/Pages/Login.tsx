import { AuthLayout } from '../layout/Auth'
import { styled } from 'styled-system/jsx'
import { css } from 'styled-system/css'
import React from 'react'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Link, useForm, usePage } from '@inertiajs/inertia-react'
import { Head } from '@inertiajs/inertia-react'
import { Spinner } from '../components/svg/Spinner'

const Page: React.FC = () => {
  const props = usePage().props
  const flashMessage = props.errors
  const {
    post,
    errors,
    setData,
    data,
    reset,
    processing: isSubmitting,
  } = useForm({
    email: '',
    password: '',
  })

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setData('email', event.target.value)
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setData('password', event.target.value)

  const onSubmit = () => {
    post('/api/auth/login', {
      onError: () => {
        reset('password')
      },
    })
  }

  return (
    <AuthLayout onSubmit={onSubmit}>
      <Head title="Dev-link | Login" />
      <styled.h2 textStyle="heading.m" color="black" mb="0.5rem">
        Login
      </styled.h2>
      <styled.p textStyle="body.m" color="grey.normal" mb="2.5rem">
        Add your details below to get back into the app
      </styled.p>

      <Input
        containerCss={css({ mb: '1.5rem' })}
        label="Email"
        icon="/email.svg"
        placeholder="e.g. alex@email.com"
        onChange={onEmailChange}
        value={data.email}
        error={errors.email}
      />
      <Input
        type="password"
        containerCss={css({ mb: '1.5rem' })}
        label="Password"
        icon="/password-lock.svg"
        placeholder="Enter your password"
        onChange={onPasswordChange}
        value={data.password}
        error={errors.password}
      />

      {flashMessage?.message && (
        <styled.p textStyle="body.s" mb="0.5rem" color="red">
          {flashMessage?.message}
        </styled.p>
      )}

      <Button
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap=".5rem"
        w="100%"
        mb="1.5rem"
        type="primary"
      >
        {isSubmitting && <Spinner />}
        Login
      </Button>

      <styled.p textStyle="body.m" textAlign="center" color="grey.normal">
        Don’t have an account?{' '}
        <Link className={css({ color: 'purple.default' })} href="/auth/register">
          Create account
        </Link>
      </styled.p>
    </AuthLayout>
  )
}

export default Page
