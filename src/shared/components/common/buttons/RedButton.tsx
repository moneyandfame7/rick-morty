import React, { type FC } from 'react'
import { styled } from '@mui/material'
import { LoadingButton, type LoadingButtonProps } from '@mui/lab'
import { getBaseButtonStyles } from './baseButtonStyles'

export const StyledPrimaryButton = styled(LoadingButton)<LoadingButtonProps>(({ theme }) => ({
  ...getBaseButtonStyles(theme.palette.error.main)
})) as typeof LoadingButton

export const RedButton: FC<LoadingButtonProps> = ({ ...props }) => {
  return <StyledPrimaryButton size="small" disableRipple {...props} />
}
