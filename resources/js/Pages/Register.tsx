import { AuthLayout } from '../layout/Auth'
import { styled } from 'styled-system/jsx'
import { css } from 'styled-system/css'
import React, { ChangeEvent } from 'react'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Link, useForm, usePage } from '@inertiajs/inertia-react'

const Page: React.FC = () => {
  const props = usePage().props
  const flashMessage = props.errors
  const { errors, post, data, setData, reset } = useForm({
    email: '',
    password: '',
    confirm: '',
  })

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) =>
    setData('email', event.target.value)
  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) =>
    setData('password', event.target.value)
  const onConfirmChange = (event: ChangeEvent<HTMLInputElement>) =>
    setData('confirm', event.target.value)

  const onSubmit = () => {
    post('/api/auth/register')
    reset('password')
    reset('confirm')
  }

  return (
    <AuthLayout onSubmit={onSubmit}>
      <styled.h2 textStyle="heading.m" color="black" mb="0.5rem">
        Create account
      </styled.h2>
      <styled.p textStyle="body.m" color="grey.normal" mb="2.5rem">
        Let’s get you started sharing your links!
      </styled.p>

      <Input
        containerCss={css({ mb: '1.5rem' })}
        label="Email Address"
        icon="/email.svg"
        placeholder="e.g. alex@email.com"
        error={errors.email}
        onChange={onEmailChange}
      />
      <Input
        type="password"
        containerCss={css({ mb: '1.5rem' })}
        label="Create Password"
        icon="/password-lock.svg"
        placeholder="At least 8 characters"
        value={data.password}
        error={errors.password}
        onChange={onPasswordChange}
      />
      <Input
        type="password"
        containerCss={css({ mb: '1.5rem' })}
        label="Confirm Password"
        icon="/password-lock.svg"
        placeholder="At least 8 characters"
        value={data.confirm}
        error={errors.confirm}
        onChange={onConfirmChange}
      />

      {flashMessage?.message && (
        <styled.p textStyle="body.s" mb="0.5rem" color="red">
          {flashMessage?.message}
        </styled.p>
      )}

      <Button w="100%" mb="1.5rem" type="primary">
        Create new account
      </Button>

      <styled.p textStyle="body.m" textAlign="center" color="grey.normal">
        Already have an account?{' '}
        <Link className={css({ color: 'purple.default' })} href="/auth/login">
          Login
        </Link>
      </styled.p>
    </AuthLayout>
  )
}

export default Page
