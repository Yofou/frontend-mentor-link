import { styled } from 'styled-system/jsx'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { LinkForm, LinkItem, NoLinkItem } from '../components/Dashboard/LinkForm'
import { useForm } from '@inertiajs/inertia-react'
import { Provider } from '../constants/providers'
import { ProfileForm } from '../components/Dashboard/ProfileForm'
import { SidePreview } from '../components/Dashboard/Preview'
import { Reorder } from 'framer-motion'
import { v4 } from 'uuid'
import { Nav } from '../components/Dashboard/Nav'
import { useEphemeralToggle } from '../hooks/ephemeralToggle'
import { Notify } from '../components/Dashboard/Notify'
import { LinkType } from '../constants/LinkType'
import Share from '../Pages/Share'
import { Inertia } from '@inertiajs/inertia'
import { Spinner } from '../components/svg/Spinner'

export type PageFormType = {
  links: LinkType[]
  avatar: string
  profile: {
    first: string
    last: string
    email: string
  }
  isOnLink: boolean
}

export type PageProps = {
  url: string
  user: {
    email: string
    first: string
    last: string
    avatar?: string | null
  }
  links: LinkType[]
}

const Page: React.FC<PageProps> = (props) => {
  const [isOnLink, setIsOnLink] = useState(true)
  const {
    data: dataLinks,
    setData: setDataLinks,
    put: putLinks,
    errors: errorsLinks,
    clearErrors,
    wasSuccessful: wasSuccessfulLinks,
    processing: isLinksSubmitting,
  } = useForm('links', {
    links: [],
  })

  const {
    setData: setProfileData,
    data: dataProfile,
    put: putProfile,
    errors: errorsProfile,
    wasSuccessful: wasSuccessfulProfile,
    processing: isProfileSubmitting,
  } = useForm('profile', {
    first: '',
    last: '',
    email: '',
  })

  const isSubmitting = isProfileSubmitting || isLinksSubmitting

  const { setData: setDataAvatar, data: dataAvatar } = useForm<{ avatar: string }>('avatar', {
    avatar: props.user.avatar ?? '',
  })

  const wasSuccessful = wasSuccessfulLinks || wasSuccessfulProfile

  useEffect(() => {
    setDataAvatar('avatar', props.user.avatar)

    setDataLinks(() => ({
      links: props.links,
    }))

    setProfileData(() => ({
      email: props.user.email,
      first: props.user.first,
      last: props.user.last,
    }))
  }, [])

  const [isSuccessful, setIsSuccessful] = useEphemeralToggle()
  const [hasUploadFailed, setHasUploadFailed] = useEphemeralToggle()
  const [showPreview, setShowPreview] = useState(false)
  const onPreview = () => {
    setShowPreview(true)
  }

  const onShowBack = () => {
    setShowPreview(false)
  }

  useEffect(() => {
    if (wasSuccessful) {
      setIsSuccessful(true)
    }
  }, [wasSuccessful])

  const onAddNewLink = () => {
    setDataLinks('links', [
      ...dataLinks.links,
      {
        id: v4(),
        link: '',
        provider: { valueId: '', value: '' },
      },
    ])
  }

  const onLinkRemove = (index: number) => () => {
    const clone = [...dataLinks.links]
    clone.splice(index, 1)

    setDataLinks('links', clone)
  }

  const onLinkChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const clone = [...dataLinks.links]
    clone[index].link = event.target.value

    setDataLinks('links', clone)
  }

  const onPlatformChange = (index: number) => (newProvider: Provider) => {
    const clone = [...dataLinks.links]
    clone[index].provider = newProvider

    setDataLinks('links', clone)
  }

  const onProfileAvatarChange = async (value: File) => {
    const body = new FormData()
    body.append('file', value)

    Inertia.post(
      '/api/dashboard/avatar',
      {
        avatar: value,
      },
      {
        onError: () => {
          setHasUploadFailed(true)
        },
      }
    )

    setDataAvatar('avatar', URL.createObjectURL(value))
  }

  const onFirstChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProfileData('first', event.target.value)
  }

  const onLastChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProfileData('last', event.target.value)
  }

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProfileData('email', event.target.value)
  }

  const onReorder = (value: LinkType[]) => {
    clearErrors()
    setDataLinks('links', value)
  }

  const onSubmit = () => {
    if (isOnLink) {
      putLinks('/api/dashboard/links', {
        preserveScroll: true,
      })
    } else {
      putProfile('/api/dashboard/profile', {
        preserveScroll: true,
        forceFormData: true,
      })
    }
  }

  if (showPreview)
    return (
      <Share
        isPreview
        url={props.url}
        user={{ ...dataProfile, avatar: dataAvatar.avatar }}
        links={dataLinks.links}
        onBack={onShowBack}
      />
    )

  return (
    <styled.main
      display="grid"
      w="100%"
      minH="100vh"
      gridTemplateColumns={{ base: '1fr', md: '1fr 2fr' }}
      gridTemplateRows="max-content 1fr max-content"
      gap={{ base: '1rem', md: '1.5rem' }}
      p="1.5rem"
      pb="0"
      bg="grey.light"
    >
      <Nav gridColumn="1 / -1" isOnLink={isOnLink} dispatcher={setIsOnLink} onPreview={onPreview} />

      <SidePreview avatar={dataAvatar.avatar} links={dataLinks.links} profile={dataProfile} />

      {!isOnLink && (
        <ProfileForm
          profile={dataAvatar.avatar}
          email={dataProfile.email}
          first={dataProfile.first}
          last={dataProfile.last}
          onProfileChange={onProfileAvatarChange}
          onFirstChange={onFirstChange}
          onLastChange={onLastChange}
          onEmailChange={onEmailChange}
          errors={errorsProfile}
        />
      )}

      {isOnLink && (
        <Reorder.Group axis="y" values={dataLinks.links} onReorder={onReorder}>
          <LinkForm onAddLink={onAddNewLink}>
            {dataLinks.links.length === 0 && <NoLinkItem />}
            {dataLinks.links.map((item, index) => {
              return (
                <LinkItem
                  key={item.id}
                  item={item}
                  errors={errorsLinks[`links.${index}.link`] ?? []}
                  onLinkChange={onLinkChange(index)}
                  onPlatformChange={onPlatformChange(index)}
                  onRemove={onLinkRemove(index)}
                  index={index}
                />
              )
            })}
          </LinkForm>
        </Reorder.Group>
      )}

      {isSuccessful && (
        <Notify
          pos="fixed"
          top={{ base: '2.5rem', md: 'unset' }}
          bottom={{ md: '2.5rem' }}
          left="50%"
          transform="translateX(-50%)"
        >
          <img src="/saved.svg" alt="" />
          Your changes have been successfully saved!
        </Notify>
      )}

      {hasUploadFailed && (
        <Notify
          pos="fixed"
          top={{ base: '2.5rem', md: 'unset' }}
          bottom={{ md: '2.5rem' }}
          left="50%"
          transform="translateX(-50%)"
        >
          <img src="/warning.svg" alt="" />
          Upload failed, please refresh and try again!
        </Notify>
      )}

      <styled.div
        gridRow="3 / 4"
        borderTop="1px"
        borderStyle="solid"
        borderColor="borders"
        gridColumn={{ base: '1 / -1', md: '2 / 3' }}
        p={{ base: '1rem', md: '2.5rem' }}
        display="flex"
        justifyContent="end"
      >
        <Button
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap=".5rem"
          w={{ base: '100%', md: 'auto' }}
          form="profile"
          onClick={onSubmit}
          type="primary"
          disabled={isSubmitting}
        >
          {isSubmitting && <Spinner />}
          Save
        </Button>
      </styled.div>
    </styled.main>
  )
}

export default Page
