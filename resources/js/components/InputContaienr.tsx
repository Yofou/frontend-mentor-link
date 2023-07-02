import { styled } from 'styled-system/jsx'
import { cva } from 'styled-system/css'

export const InputContainerStyles = cva({
  base: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    textStyle: 'body.m',
    color: 'grey.default',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'borders',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    _focusWithin: {
      borderColor: 'purple.default',
      boxShadow: '0px 0px 32px 0px rgba(99, 60, 255, 0.25);',
    },
    minHeight: '3rem',
  },
  variants: {
    error: {
      true: {
        borderColor: 'red',
        color: 'red',

        _focusWithin: {
          borderColor: 'inherit',
          boxShadow: 'none',
        },
      },
    },
    active: {
      true: {
        borderColor: 'purple.default',
        boxShadow: '0px 0px 32px 0px rgba(99, 60, 255, 0.25);',
      },
    },
  },
})

export const InputContainer = styled('label', InputContainerStyles)
