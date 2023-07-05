import React from 'react'
import { styled, type HTMLStyledProps } from 'styled-system/jsx'
import { InputContainerStyles } from './InputContaienr'

export type InputProps = {
  error?: string
  icon?: string | React.ReactNode
  label?: string
  labelCss?: string
  containerCss?: string
  value?: string
} & HTMLStyledProps<'input'>

const InputContainer = styled('div', InputContainerStyles)

export const Input: React.FC<InputProps> = (props) => {
  return (
    <styled.label className={props.containerCss} display="flex" flexDirection="column" gap=".25rem">
      {props.label && (
        <styled.p className={props.labelCss} textStyle="body.s" color="grey.default">
          {props.label}
        </styled.p>
      )}
      <InputContainer px="1rem" gap="0.75rem" error={!!props.error}>
        {props.icon && typeof props.icon === 'string' && <img src={props.icon} alt="" />}
        {typeof props?.icon !== 'string' && props.icon}

        <styled.input
          placeholder={props.placeholder}
          type={props.type ?? 'text'}
          width="100%"
          outline="transparent"
          height="100%"
          color="inherit"
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
        />

        {props.error && (
          <styled.p textStyle="body.s" pr="0.5rem">
            {props.error}
          </styled.p>
        )}
      </InputContainer>
    </styled.label>
  )
}
