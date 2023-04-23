import React, { useMemo, type FC } from 'react'
import { NavLink } from 'react-router-dom'

import { Stack, Typography, useTheme } from '@mui/material'

import { getContrastColor } from 'shared/utils/getContrastColor'

import { type NavigationLinkType } from './utils'

export const NavigationLink: FC<NavigationLinkType> = ({ label, icon, url }) => {
  const theme = useTheme()
  const styles = useMemo(
    () => ({
      textDecoration: 'none',
      p: '8px 15px',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      transitionProperty: 'border, background',
      ':hover': {
        backgroundColor: getContrastColor(theme, 0.05)
      },
      '&.active': {
        backgroundColor: getContrastColor(theme, 0.05),
        borderLeft: '5px solid',
        borderColor: 'primary.main',
        transition: 'all 0.3s ease',
        transitionProperty: 'border, background, padding',
        pl: 2
      },
      '&.active .MuiTypography-root': {
        fontWeight: 600,
        color: 'text.primary'
      }
    }),
    [theme]
  )
  return (
    <Stack component={NavLink} to={url} key={label} direction="row" alignItems="center" gap={2} sx={styles}>
      {icon}
      <Typography fontSize="14px" display="block" color="text.secondary">
        {label}
      </Typography>
    </Stack>
  )
}
