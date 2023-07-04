import { styled } from 'styled-system/jsx'
import React, { FormEvent } from 'react'
import { Button } from '../Button'
import { Dropdown, DropdownDivider, DropdownItem } from '../Dropdown'
import { Provider, ProvidersList } from '../../constants/providers'
import { Input } from '../Input'
import { LinkEdit } from '../svg/LinkEdit'
import { Reorder, useDragControls } from 'framer-motion'

export type LinkItemProps = {
  index: number
  item?: {
    provider: Provider
    link: string
  }
  errors?: string[]
  onPlatformChange?: (value: any) => void
  onLinkChange?: (value: any) => void
  onRemove?: () => void
}

export const LinkItem: React.FC<LinkItemProps> = (props) => {
  const controls = useDragControls()
  const errorMessage = props.errors?.[0] ?? ''

  return (
    <Reorder.Item dragListener={false} dragControls={controls} value={props.item}>
      <styled.div
        w="100%"
        p="1.25rem"
        display="flex"
        flexDirection="column"
        gap="0.75rem"
        bg="grey.light"
      >
        <styled.div display="flex" justifyContent="space-between">
          <styled.h3
            display="flex"
            justifyContent="center"
            textStyle="heading.s"
            color="grey.normal"
          >
            <styled.button p=".25rem" onPointerDown={(e) => controls.start(e)}>
              <styled.img pointerEvents="none" src="/grabber.svg" alt="" />
            </styled.button>{' '}
            Link #{props.index + 1}
          </styled.h3>

          <styled.button color="grey.normal" textStyle="body.m" onClick={props?.onRemove}>
            Removed
          </styled.button>
        </styled.div>

        <Dropdown
          label="Platform"
          defaultSelected={props.item.provider}
          dispatcher={props.onPlatformChange}
        >
          {ProvidersList.map((item, index) => (
            <React.Fragment key={item.valueId}>
              <DropdownItem value={item.value} valueId={item.valueId}>
                <img src={`/platform/${item.valueId}.svg`} alt="" /> {item.value}
              </DropdownItem>
              {index + 1 !== ProvidersList.length && <DropdownDivider />}
            </React.Fragment>
          ))}
        </Dropdown>

        <Input
          placeholder="e.g. https://www.github.com/johnappleseed"
          label="Link"
          error={errorMessage}
          icon={<LinkEdit />}
          value={props.item.link}
          onChange={props.onLinkChange}
        />
      </styled.div>
    </Reorder.Item>
  )
}

export type LinkFormProps = React.PropsWithChildren<{
  onSubmit?: () => void
  onAddLink?: () => void
}>

export const LinkForm: React.FC<LinkFormProps> = (props) => {
  const privateOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.onSubmit?.()
  }

  return (
    <styled.form
      w="100%"
      h="100%"
      p="2.5rem"
      bg="white"
      display="flex"
      flexDirection="column"
      onSubmit={privateOnSubmit}
    >
      <styled.h2 textStyle="heading.m" mb="0.5rem" color="grey.default">
        Customize your links
      </styled.h2>
      <styled.p mb="2.5rem" color="grey.normal">
        Add/edit/remove links below and then share all your profiles with the world!
      </styled.p>

      <Button type="secondary" mb="1.5rem" onClick={props.onAddLink}>
        + Add new link
      </Button>

      {props.children}
    </styled.form>
  )
}

export const NoLinkItem: React.FC = () => {
  return (
    <styled.div mt="4.01rem" display="flex" flexDirection="column" alignItems="center">
      <styled.img maxW="250px" mb="2.5rem" src="./no-links.svg" alt="" />

      <styled.h2 mb="1.5rem" textAlign="center" textStyle="heading.m" color="grey.default">
        Let’s get you started
      </styled.h2>

      <styled.p maxW="488px" textStyle="body.m" textAlign="center" color="grey.normal">
        Use the “Add new link” button to get started. Once you have more than one link, you can
        reorder and edit them. We’re here to help you share your profiles with everyone!
      </styled.p>
    </styled.div>
  )
}
