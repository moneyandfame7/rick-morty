import React, { FC } from 'react'
import { styled } from '@mui/material'
import { LoadingButton, LoadingButtonProps } from '@mui/lab'
import { useBaseButtonStyles } from './baseButtonStyles'

const StyledPrimaryButton = styled(LoadingButton)<LoadingButtonProps>(({ theme }) => ({
  ...useBaseButtonStyles(theme.palette.error.main)
})) as typeof LoadingButton

export const RedButton: FC<LoadingButtonProps> = ({ ...props }) => {
  return <StyledPrimaryButton size="small" disableRipple {...props} />
}
