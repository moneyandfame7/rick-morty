import React, { type FC, type PropsWithChildren } from 'react'
import { type LinkProps, useNavigate } from 'react-router-dom'

import { StyledOutlineButton } from './OutlinedButton'
import { StyledPrimaryButton } from './PrimaryButton'
import { type ButtonProps } from '@mui/material'

type ButtonVariant = 'outlined' | 'primary'
type ButtonSize = 'small' | 'medium' | 'large'

interface LinkButtonProps {
  variant?: ButtonVariant
  to: LinkProps['to']
  onClick?: () => void
  size?: ButtonSize
  sx?: ButtonProps['sx']
}

export const LinkButton: FC<LinkButtonProps & PropsWithChildren> = ({
  variant = 'primary',
  to,
  children,
  onClick,
  size = 'medium',
  sx
}) => {
  const navigate = useNavigate()
  const navigateTo = () => {
    if (onClick) {
      onClick()
    }
    navigate(to)
  }
  switch (variant) {
    case 'primary':
      return (
        <StyledPrimaryButton onClick={navigateTo} size={size} sx={sx}>
          {children}
        </StyledPrimaryButton>
      )
    case 'outlined':
      return (
        <StyledOutlineButton onClick={navigateTo} size={size} sx={sx}>
          {children}
        </StyledOutlineButton>
      )
    default:
      return (
        <StyledPrimaryButton onClick={navigateTo} size={size}>
          {children}
        </StyledPrimaryButton>
      )
  }
}
