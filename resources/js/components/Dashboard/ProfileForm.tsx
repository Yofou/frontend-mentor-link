import React from 'react'
import { css } from 'styled-system/css'
import { styled } from 'styled-system/jsx'
import { ImageUpload } from '../ImageUpload'
import { Input } from '../Input'

type ProfileFormProps = {
  profile?: string
  first?: string
  last?: string
  email?: string

  onProfileChange?: (value: any) => void
  onFirstChange?: (value: any) => void
  onLastChange?: (value: any) => void
  onEmailChange?: (value: any) => void
}

export const ProfileForm: React.FC<ProfileFormProps> = (props) => {
  return (
    <styled.div w="100%" h="100%" p="2.5rem" bg="white" display="flex" flexDirection="column">
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
        alignItems="center"
      >
        <styled.p textStyle="body.m" color="grey.normal">
          Profile picture
        </styled.p>

        <styled.div display="flex" gap="1.5rem" alignItems="center">
          <ImageUpload defaultValue={props.profile} dispatcher={props.onProfileChange} />
          <styled.p maxW="200px" textStyle="body.s" color="grey.normal">
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
          <styled.p textStyle="body.m" color="grey.normal">
            First name*
          </styled.p>

          <Input
            value={props.first}
            containerCss={css({ w: '100%', maxW: '420px' })}
            placeholder="e.g. John"
            onChange={props.onFirstChange}
          />
        </styled.div>

        <styled.div display="flex" justifyContent="space-between" alignItems="center">
          <styled.p textStyle="body.m" color="grey.normal">
            Last name*
          </styled.p>

          <Input
            value={props.last}
            containerCss={css({ w: '100%', maxW: '420px' })}
            placeholder="e.g. Appleseed"
            onChange={props.onLastChange}
          />
        </styled.div>

        <styled.div display="flex" justifyContent="space-between" alignItems="center">
          <styled.p textStyle="body.m" color="grey.normal">
            Email
          </styled.p>

          <Input
            containerCss={css({ w: '100%', maxW: '420px' })}
            placeholder="e.g. email@example.com"
            value={props.email}
            onChange={props.onEmailChange}
          />
        </styled.div>
      </styled.div>
    </styled.div>
  )
}
