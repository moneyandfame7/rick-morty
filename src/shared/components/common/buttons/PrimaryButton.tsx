import React, { type FC } from 'react'
import { styled, darken, alpha } from '@mui/material'
import { LoadingButton, type LoadingButtonProps } from '@mui/lab'

export const StyledPrimaryButton = styled(LoadingButton)<LoadingButtonProps>(({ theme }) => ({
  background: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: '8px',
  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
  fontWeight: 600,
  transition: 'all 0.2s ease',
  color: '#fff',
  '&: hover': {
    backgroundColor: darken(theme.palette.primary.main, 0.15),
    borderColor: darken(theme.palette.primary.main, 0.15)
  },
  '&: active': {
    backgroundColor: darken(theme.palette.primary.main, 0.2),
    borderColor: darken(theme.palette.primary.main, 0.2)
  },
  '&.Mui-disabled': {
    color: alpha('#fff', 0.7),
    backgroundColor: alpha(theme.palette.primary.main, 0.3),
    borderColor: alpha(theme.palette.primary.main, 0.05)
  },
  '&.MuiLoadingButton-loading': {
    color: 'transparent'
  },
  '&.MuiButton-sizeLarge': {
    padding: '12px 20px',
    lineHeight: '28px',
    fontSize: 18,
    '& .MuiCircularProgress-root': {
      width: '22px !important',
      height: '22px !important'
    }
  },
  '&.MuiButton-sizeMedium': {
    padding: '10px 18px',
    fontSize: 16,
    lineHeight: '24px'
  },
  '&.MuiButton-sizeSmall': {
    padding: '4px 10px',
    fontSize: 13,
    lineHeight: '20px'
  }
}))
export const PrimaryButton: FC<LoadingButtonProps> = ({ ...props }) => {
  return <StyledPrimaryButton size="small" disableRipple {...props} />
}
