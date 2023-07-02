import { styled, Grid } from 'styled-system/jsx'
import React, { ChangeEvent, useEffect } from 'react'
import { LogoSvg } from '../components/svg/Logo'
import { Tab } from '../components/Tab'
import { Button } from '../components/Button'
import { LinkForm, LinkItem, NoLinkItem } from '../components/Dashboard/LinkForm'
import { useForm } from '@inertiajs/inertia-react'
import { Provider } from '../constants/providers'
import { LinkEdit } from '../components/svg/LinkEdit'
import { ProfileEdit } from '../components/svg/ProfileEdit'
import { ProfileForm } from '../components/Dashboard/ProfileForm'
import { SidePreview } from '../components/Dashboard/Preview'

export type PageFormType = {
  links: {
    provider: {
      valueId: string
      value: string
    }
    link: string
  }[]
  avatar: string
  profile: {
    first: string
    last: string
    email: string
  }
  isOnLink: boolean
}

export type PageProps = {
  user: {
    email: string
    first: string
    last: string
  }
}

const Page: React.FC<PageProps> = (props) => {
  const { data, setData } = useForm<PageFormType>({
    links: [],
    avatar: '',
    profile: {
      first: '',
      last: '',
      email: '',
    },
    isOnLink: true,
  })

  useEffect(() => {
    setData('profile', {
      email: props.user.email,
      first: props.user.first,
      last: props.user.last,
    })
  }, [])

  const onAddNewLink = () => {
    setData('links', [
      ...data.links,
      {
        link: '',
        provider: { valueId: '', value: '' },
      },
    ])
  }

  const onLinkRemove = (index: number) => () => {
    const clone = [...data.links]
    clone.splice(index, 1)

    setData('links', clone)
  }

  const onLinkChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const clone = [...data.links]
    clone[index].link = event.target.value

    setData('links', clone)
  }

  const onPlatformChange = (index: number) => (newProvider: Provider) => {
    const clone = [...data.links]
    clone[index].provider = newProvider

    setData('links', clone)
  }

  const onProfileAvatarChange = (value: string) => {
    setData('avatar', value)
  }

  const onFirstChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clone = { ...data.profile }
    clone.first = event.target.value

    setData('profile', clone)
  }

  const onLastChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clone = { ...data.profile }
    clone.last = event.target.value

    setData('profile', clone)
  }

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clone = { ...data.profile }
    clone.email = event.target.value

    setData('profile', clone)
  }

  return (
    <styled.main
      display="grid"
      w="100vw"
      minH="100vh"
      gridTemplateColumns="1fr 2fr"
      gridTemplateRows="max-content 1fr max-content"
      gap="1.5rem"
      p="1.5rem"
      bg="grey.light"
    >
      <styled.nav
        p="1.5rem"
        rounded=".75rem"
        display="flex"
        justifyContent="space-between"
        bg="white"
        gridColumn="1 / -1"
      >
        <LogoSvg />

        <styled.div display="flex" gap="1rem">
          <Tab active={data.isOnLink} onClick={() => setData('isOnLink', true)}>
            <LinkEdit /> Links
          </Tab>
          <Tab active={!data.isOnLink} onClick={() => setData('isOnLink', false)}>
            <ProfileEdit /> Profile Details
          </Tab>
        </styled.div>

        <Button type="secondary">Preview</Button>
      </styled.nav>

      <SidePreview avatar={data.avatar} links={data.links} profile={data.profile} />

      {!data.isOnLink && (
        <ProfileForm
          profile={data.avatar}
          email={data.profile.email}
          first={data.profile.first}
          last={data.profile.last}
          onProfileChange={onProfileAvatarChange}
          onFirstChange={onFirstChange}
          onLastChange={onLastChange}
          onEmailChange={onEmailChange}
        />
      )}

      {data.isOnLink && (
        <LinkForm onAddLink={onAddNewLink}>
          {data.links.length === 0 && <NoLinkItem />}
          {data.links.length > 0 &&
            data.links.map((item, index) => (
              <LinkItem
                key={`${item.provider.valueId}:${index}`}
                platform={item.provider}
                link={item.link}
                onLinkChange={onLinkChange(index)}
                onPlatformChange={onPlatformChange(index)}
                onRemove={onLinkRemove(index)}
                index={index}
              />
            ))}
        </LinkForm>
      )}

      <styled.div
        gridRow="3 / 4"
        borderTop="1px"
        borderStyle="solid"
        borderColor="borders"
        gridColumn="2 / 3"
        p="2.5rem"
        display="flex"
        justifyContent="end"
      >
        <Button type="primary">Save</Button>
      </styled.div>
    </styled.main>
  )
}

export default Page
