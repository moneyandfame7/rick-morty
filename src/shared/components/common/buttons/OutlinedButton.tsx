import React, { type FC } from 'react'
import { styled } from '@mui/material'
import { LoadingButton, type LoadingButtonProps } from '@mui/lab'
import { getContrastColor } from 'shared/utils/getContrastColor'

export const StyledOutlineButton = styled(LoadingButton)<LoadingButtonProps>(({ theme }) => ({
  background: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px',
  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
  fontWeight: 600,
  fontSize: 14,
  color: theme.palette.text.primary,
  transition: 'none !important',
  '&: hover': {
    backgroundColor: getContrastColor(theme, 0.02)
  },
  '&: active': {
    backgroundColor: getContrastColor(theme, 0.05)
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

export const OutlinedButton: FC<LoadingButtonProps> = ({ ...props }) => {
  return <StyledOutlineButton size="small" disableRipple {...props} />
}
