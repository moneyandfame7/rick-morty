import React, { type FC } from 'react'
import { NavLink } from 'react-router-dom'

import { Typography, darken, useTheme } from '@mui/material'

import { type HeaderLinkType } from './utils/links'

export const HeaderLink: FC<HeaderLinkType> = ({ url, search, name }) => {
  const theme = useTheme()
  const styles = {
    textDecoration: 'none',
    position: 'relative',
    '&: hover': {
      color: darken(theme.palette.text.secondary, 0.2)
    },
    '&.active': {
      '&::after': {
        content: '""',
        width: '120%',
        height: '3px',
        backgroundColor: 'primary.main',
        borderRadius: '2px',
        display: 'block',
        position: 'absolute',
        bottom: -15,
        right: '50%',
        transform: 'translateX(50%)'
      }
    }
  }
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      fontWeight={600}
      component={NavLink}
      to={{ pathname: url, search: search }}
      sx={styles}
    >
      {name}
    </Typography>
  )
}
