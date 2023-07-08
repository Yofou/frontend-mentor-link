import React from 'react'
import { useCopyToClipboard } from 'react-use'
import { styled } from 'styled-system/jsx'
import { Button } from '../components/Button'
import { Notify } from '../components/Dashboard/Notify'
import { SidePreviewItem } from '../components/Dashboard/Preview'
import { LinkType } from '../constants/LinkType'
import { useEphemeralToggle } from '../hooks/ephemeralToggle'

export type PageProps = {
  isPreview: boolean
  url: string
  user: {
    email: string
    first: string
    last: string
    avatar?: string | null
  }
  links: LinkType[]
  onBack?: () => void
}

const Page: React.FC<PageProps> = (props) => {
  const [notUsed, copyToClipboard] = useCopyToClipboard()
  const [hasCopied, setHasCopied] = useEphemeralToggle()
  const onCopyUrl = () => {
    copyToClipboard(props.url)
    setHasCopied(true)
  }

  return (
    <styled.main
      bg="grey.light"
      w="100%"
      minH="100vh"
      display="grid"
      gridTemplateRows="4.875rem 1fr"
    >
      <styled.div
        pos="absolute"
        top="0"
        left="0"
        w="100%"
        h="357px"
        roundedBottom="2rem"
        bg="purple.default"
        zIndex="0"
        hideBelow="sm"
      />

      {props.isPreview && (
        <styled.nav p={{ base: '0', md: '1.5rem' }} w="100%" zIndex="1">
          <styled.div
            w="100%"
            bg="white"
            rounded="0.75rem"
            display="flex"
            justifyContent="space-between"
            p="1rem 1.5rem"
          >
            <Button onClick={props.onBack} type="secondary">
              Back to Editor
            </Button>

            <Button type="primary" onClick={onCopyUrl}>
              Share Link
            </Button>
          </styled.div>
        </styled.nav>
      )}

      <styled.section
        w="100%"
        mt={{ base: '3.75rem', md: '6.3rem' }}
        justifySelf="center"
        maxW="349px"
        minH="35rem"
        p="3rem 3.5rem"
        bg="white"
        rounded="1.5rem"
        zIndex="1"
        gridRow="2 / 3"
        alignSelf="start"
        boxShadow="0px 0px 32px 0px rgba(0, 0, 0, 0.10);"
      >
        <styled.img
          w="6.5rem"
          h="6.5rem"
          rounded="100%"
          borderWidth="4px"
          borderStyle="solid"
          borderColor="purple.default"
          mb="1.5rem"
          mx="auto"
          objectFit="cover"
          src={props.user.avatar}
          alt=""
        />
        <styled.h2
          fontSize="2rem"
          textStyle="heading.m"
          color="grey.default"
          textAlign="center"
          mb=".5rem"
        >
          {props.user.first} {props.user.last}
        </styled.h2>
        <styled.p textStyle="body.m" color="grey.normal" textAlign="center" mb="3.5rem">
          {props.user.email}
        </styled.p>

        <styled.div display="flex" flexDirection="column" gap="1.25rem">
          {props.links.length > 0 &&
            props.links.map((item) => {
              if (!item.provider.valueId) return <React.Fragment key={item.id}></React.Fragment>
              return (
                <SidePreviewItem
                  key={item.id}
                  type={item.provider.valueId as any}
                  href={item.link.length > 0 ? item.link : null}
                  target="_blank"
                >
                  <img src={`/links/${item.provider.valueId}.svg`} alt="" />
                  <styled.p w="100%">{item.provider.value}</styled.p>
                  <img src={`/right-arrow.svg`} alt="" />
                </SidePreviewItem>
              )
            })}
        </styled.div>
      </styled.section>

      {hasCopied && (
        <Notify zIndex="1" pos="absolute" left="50%" bottom="2.5rem" transform="translateX(-50%)">
          <img src="/copy-link.svg" alt="" />
          The link has been copied to your clipboard!
        </Notify>
      )}
    </styled.main>
  )
}

export default Page
