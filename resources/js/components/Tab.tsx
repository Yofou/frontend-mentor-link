import { styled } from 'styled-system/jsx'

export const Tab = styled('button', {
  base: {
    display: 'flex',
    gap: '0.5rem',
    px: '1.69rem',
    py: '0.69rem',
    rounded: '0.5rem',
    background: 'transparent',
    textStyle: 'heading.s',
    color: 'grey.normal',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    alignItems: 'center',
    _hover: {
      color: 'purple.default',
    },
  },
  variants: {
    active: {
      true: {
        color: 'purple.default',
        background: 'purple.light',
      },
    },
  },
})
