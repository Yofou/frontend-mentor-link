import { styled } from 'styled-system/jsx'
import React from 'react'
import { LogoSvg } from '../svg/Logo'
import { Tab } from '../Tab'
import { ProfileEdit } from '../svg/ProfileEdit'
import { LinkEdit } from '../svg/LinkEdit'
import { Button } from '../Button'
import type { HTMLStyledProps } from 'styled-system/jsx'

export type NavProps = {
  isOnLink?: boolean
  dispatcher?: React.Dispatch<React.SetStateAction<boolean>>
} & HTMLStyledProps<'nav'>

export const Nav: React.FC<NavProps> = (props) => {
  const { isOnLink, dispatcher, ...navProps } = props
  return (
    <styled.nav
      p="1.5rem 1rem"
      rounded=".75rem"
      display="flex"
      justifyContent="space-between"
      bg="white"
      {...navProps}
    >
      <LogoSvg display={{ base: 'none', md: 'flex' }} />
      <styled.img display={{ base: 'block', md: 'none' }} src="/square-logo.svg" alt="" />

      <styled.div display="flex" gap={{ base: '0', md: '1rem' }}>
        <Tab active={props.isOnLink} onClick={() => props.dispatcher?.(true)}>
          <LinkEdit /> <styled.span display={{ base: 'none', md: 'inline' }}>Links</styled.span>
        </Tab>
        <Tab active={!props.isOnLink} onClick={() => props.dispatcher?.(false)}>
          <ProfileEdit />{' '}
          <styled.span display={{ base: 'none', md: 'inline' }}>Profile Details</styled.span>
        </Tab>
      </styled.div>

      <Button padding={{ base: '0.69rem 1rem', md: '0.6875rem 1.6875rem' }} type="secondary">
        <styled.span display={{ base: 'inline', md: 'none' }}>
          <img src="/eye.svg" alt="" />
        </styled.span>
        <styled.span display={{ base: 'none', md: 'inline' }}>Preview</styled.span>
      </Button>
    </styled.nav>
  )
}
