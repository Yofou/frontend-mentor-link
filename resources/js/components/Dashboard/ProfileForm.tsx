import React from 'react'
import { css } from 'styled-system/css'
import { styled } from 'styled-system/jsx'
import { useGetProfileString } from '../../hooks/getProfileString'
import { ImageUpload } from '../ImageUpload'
import { Input } from '../Input'
import { Head } from '@inertiajs/inertia-react'

type ProfileFormProps = {
  profile?: string | File
  first?: string
  last?: string
  email?: string
  errors?: Record<'first' | 'last', string>

  onProfileChange?: (value: any) => void
  onFirstChange?: (value: any) => void
  onLastChange?: (value: any) => void
  onEmailChange?: (value: any) => void
}

export const ProfileForm: React.FC<ProfileFormProps> = (props) => {
  const [profileString] = useGetProfileString(props.profile)

  return (
    <styled.form
      w="100%"
      h="100%"
      p={{ base: '1.5rem', md: '2.5rem' }}
      bg="white"
      display="flex"
      onSubmit={(e) => e.preventDefault()}
      flexDirection="column"
      id="profile"
    >
      <Head title="Dev-link | Edit Profile" />
      <styled.h2 mb=".5rem" textStyle="heading.m" color="grey.default">
        Profile Details
      </styled.h2>
      <styled.p mb="2.5rem" textStyle="body.m" color="grey.normal">
        Add your details to create a personal touch to your profile.
      </styled.p>

      <styled.div
        rounded=".75rem"
        p="1.25rem"
        bg="grey.light"
        mb="1.5rem"
        display="flex"
        justifyContent="space-between"
        alignItems={{ base: 'start', md: 'center' }}
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <styled.p textStyle="body.m" mb={{ base: '1rem', md: '0' }} color="grey.normal">
          Profile picture
        </styled.p>

        <styled.div
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          gap="1.5rem"
          alignItems={{ base: 'start', md: 'center' }}
        >
          <ImageUpload
            name="avatar"
            defaultValue={profileString}
            dispatcher={props.onProfileChange}
          />
          <styled.p maxW={{ base: 'auto', md: '200px' }} textStyle="body.s" color="grey.normal">
            Image must be below 1024x1024px. Use PNG or JPG format.
          </styled.p>
        </styled.div>
      </styled.div>

      <styled.div
        rounded=".75rem"
        bg="grey.light"
        p="1.25rem"
        display="flex"
        flexDirection="column"
        gap="1.5rem"
      >
        <styled.div display="flex" justifyContent="space-between" alignItems="center">
          <styled.p hideBelow="sm" textStyle="body.m" color="grey.normal">
            First name*
          </styled.p>

          <Input
            value={props.first}
            error={props.errors.first}
            label="First name*"
            labelCss={css({ display: { base: 'block', md: 'none' } })}
            containerCss={css({ w: '100%', maxW: { base: 'auto', md: '420px' } })}
            placeholder="e.g. John"
            onChange={props.onFirstChange}
          />
        </styled.div>

        <styled.div display="flex" justifyContent="space-between" alignItems="center">
          <styled.p hideBelow="sm" textStyle="body.m" color="grey.normal">
            Last name*
          </styled.p>

          <Input
            value={props.last}
            error={props.errors.last}
            label="Last name*"
            labelCss={css({ display: { base: 'block', md: 'none' } })}
            containerCss={css({ w: '100%', maxW: { base: 'auto', md: '420px' } })}
            placeholder="e.g. Appleseed"
            onChange={props.onLastChange}
          />
        </styled.div>

        <styled.div display="flex" justifyContent="space-between" alignItems="center">
          <styled.p hideBelow="sm" textStyle="body.m" color="grey.normal">
            Email
          </styled.p>

          <Input
            label="Email"
            labelCss={css({ display: { base: 'block', md: 'none' } })}
            containerCss={css({ w: '100%', maxW: { base: 'auto', md: '420px' }, opacity: '0.5' })}
            placeholder="e.g. email@example.com"
            value={props.email}
            disabled
            onChange={props.onEmailChange}
          />
        </styled.div>
      </styled.div>
    </styled.form>
  )
}
