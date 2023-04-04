import { FC } from 'react'
import { styled } from '@mui/material'
import { LoadingButton, LoadingButtonProps } from '@mui/lab'
import { getBaseButtonStyles } from './baseButtonStyles'

export const StyledPrimaryButton = styled(LoadingButton)<LoadingButtonProps>(({ theme }) => ({
  ...getBaseButtonStyles(theme.palette.primary.main)
})) as typeof LoadingButton
export const PrimaryButton: FC<LoadingButtonProps> = ({ ...props }) => {
  return <StyledPrimaryButton size="small" disableRipple {...props} />
}
