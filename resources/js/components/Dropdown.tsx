import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { styled } from 'styled-system/jsx'
import { InputContainerStyles } from './InputContaienr'
import useFocusTrap from '@charlietango/use-focus-trap'
import { useClickAway, useKeyPress } from 'react-use'

const InputContainer = styled('div', InputContainerStyles)

const SelectedProvider = createContext<null | [any, React.Dispatch<React.SetStateAction<any>>]>(
  null
)

const OpenProvider = createContext<null | React.Dispatch<React.SetStateAction<boolean>>>(null)

export type DropdownProps = React.PropsWithChildren<{
  defaultSelected?: {
    valueId: string
    value: string
  }
  label?: string
  dispatcher?: React.Dispatch<React.SetStateAction<{ valueId: string; value: string }>>
  headCss?: string
}>

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(props?.defaultSelected)

  const onToggleChange = () => setIsOpen(!isOpen)
  const ref = useRef<HTMLDivElement>()
  const focusTrapRef = useFocusTrap()
  const hasEscapedPress = useKeyPress('Escape')
  useClickAway(ref, () => {
    setIsOpen(false)
  })

  useEffect(() => {
    if (hasEscapedPress) setIsOpen(false)
  }, [hasEscapedPress])

  useEffect(() => {
    props?.dispatcher?.(selected)
  }, [selected])

  return (
    <OpenProvider.Provider value={setIsOpen}>
      <styled.div className={props.headCss} position="relative" width="100%">
        <styled.label display="flex" flexDirection="column" gap="0.5rem">
          {props.label && (
            <styled.p textStyle="body.s" color="grey.default">
              {props.label}
            </styled.p>
          )}
          <InputContainer px="1rem" active={isOpen} width="100%">
            {selected.valueId && <styled.img src={`/platform/${selected.valueId}.svg`} alt="" />}
            <styled.button
              w="100%"
              h="100%"
              textAlign="left"
              outline="transparent"
              onClick={onToggleChange}
            >
              {selected.value}
            </styled.button>

            <styled.img src="/chevron.svg" alt="" />
          </InputContainer>
        </styled.label>

        {isOpen && (
          <SelectedProvider.Provider value={[selected, setSelected]}>
            <styled.div
              zIndex="2"
              ref={(elm) => {
                focusTrapRef(elm)
                ref.current = elm
              }}
              position="absolute"
              bg="white"
              top="calc(100% + .75rem)"
              left="0"
              width="100%"
              textStyle="body.m"
              rounded=".5rem"
              boxShadow="0px 0px 32px 0px rgba(0, 0, 0, 0.10);"
              borderWidth="1px"
              borderStyle="solid"
              borderColor="borders"
              display="flex"
              flexDirection="column"
              alignItems="start"
              py=".75rem"
              px="1rem"
              gap=".75rem"
            >
              {props.children}
            </styled.div>
          </SelectedProvider.Provider>
        )}
      </styled.div>
    </OpenProvider.Provider>
  )
}

export type DropdownItemProps = React.PropsWithChildren<{
  valueId: string
  value: string
}>

const DropdownItemButton = styled('button', {
  base: {
    width: '100%',
    textStyle: 'body.m',
    color: 'grey.default',
    display: 'flex',
    gap: '.75rem',
    _focus: {
      outlineWidth: '1px',
      outlineColor: 'purple.default',
      outlineStyle: 'solid',
    },
  },
  variants: {
    selected: {
      true: {
        color: 'purple.default',
      },
    },
  },
})

export const DropdownItem: React.FC<DropdownItemProps> = (props) => {
  const providerItem = useContext(SelectedProvider)
  const setIsOpen = useContext(OpenProvider)

  if (!providerItem) return
  const [selected, setSelected] = providerItem
  const isSelected = selected?.valueId === props.valueId
  const onClick = () => {
    setSelected({ value: props.value, valueId: props.valueId })
    if (setIsOpen) setIsOpen(false)
  }

  return (
    <DropdownItemButton onClick={onClick} selected={isSelected}>
      {props.children}
    </DropdownItemButton>
  )
}

export const DropdownDivider = () => {
  return <styled.div w="100%" bg="borders" h="1px"></styled.div>
}
