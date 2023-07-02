import { styled } from 'styled-system/jsx'

export const Button = styled('button', {
  base: {
    padding: '0.6875rem 1.6875rem',
    rounded: '.5rem',
    textStyle: 'heading.s',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'purple.default',
  },
  variants: {
    type: {
      primary: {
        background: {
          base: 'purple.default',
          _hover: 'purple.hover',
          _focus: 'purple.hover',
          _disabled: 'purple.default',
        },
        opacity: {
          _disabled: '0.25',
        },
        color: 'white',
      },
      secondary: {
        background: {
          base: 'white',
          _hover: 'purple.light',
          _focus: 'purple.light',
          _disabled: 'white',
        },
        opacity: {
          _disabled: '0.25',
        },
        color: 'purple.default',
      },
    },
  },
})
