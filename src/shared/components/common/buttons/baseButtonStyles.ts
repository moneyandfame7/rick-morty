import { alpha, darken } from '@mui/material'

export const getBaseButtonStyles = (backgroundColor: string) => ({
  background: backgroundColor,
  border: `1px solid ${backgroundColor}`,
  borderRadius: '8px',
  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
  fontWeight: 600,
  transition: 'all 0.2s ease',
  color: '#fff',
  '&: hover': {
    backgroundColor: darken(backgroundColor, 0.15),
    borderColor: darken(backgroundColor, 0.15)
  },
  '&: active': {
    backgroundColor: darken(backgroundColor, 0.2),
    borderColor: darken(backgroundColor, 0.2)
  },
  '&.Mui-disabled': {
    color: alpha('#fff', 0.7),
    backgroundColor: alpha(backgroundColor, 0.3),
    borderColor: alpha(backgroundColor, 0.05)
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
})
