import { styled } from 'styled-system/jsx'

export const Notify = styled('div', {
  base: {
    p: '1rem',
    bg: 'grey.default',
    textStyle: 'heading.s',
    color: 'white',
    display: 'flex',
    gap: '0.5rem',
    rounded: '.75rem',
    justifyContent: 'center',
    textAlign: {
      base: 'center',
      md: 'left',
    },
  },
})
