import React, { FormEvent } from 'react'
import { styled } from 'styled-system/jsx'
import { LogoSvg } from '../components/svg/Logo'
import { BaseLayout } from './Base'

export type AuthLayoutProps = React.PropsWithChildren<{
  onSubmit?: () => void
}>

export const AuthLayout: React.FC<AuthLayoutProps> = (props) => {
  const innerOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props?.onSubmit?.()
  }
  return (
    <BaseLayout>
      <styled.main
        w="100%"
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap="3.66rem"
      >
        <LogoSvg />
        <styled.form
          onSubmit={innerOnSubmit}
          w="100%"
          maxW="476px"
          rounded="12px"
          p="2.5rem"
          bg="white"
        >
          {props.children}
        </styled.form>
      </styled.main>
    </BaseLayout>
  )
}
