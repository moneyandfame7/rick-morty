import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { Box, Grid, useTheme } from '@mui/material'

import { ColorSchemeToggle } from '@features/authorization/components'

import { Logo } from '@shared/components/icons'
import { HOME_ROUTE } from '@shared/routes'

export const Header: FC = () => {
  const theme = useTheme()

  return (
    <Grid item xs={1} width="100%" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box component={Link} to={{ pathname: HOME_ROUTE.path }} sx={{ textDecoration: 'none' }}>
        <Logo logoIcon={{ color: theme.palette.primary.dark }} />
      </Box>
      <ColorSchemeToggle />
    </Grid>
  )
}
