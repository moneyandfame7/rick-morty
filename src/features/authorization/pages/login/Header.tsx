import React, { FC } from 'react'
import { Grid, useTheme } from '@mui/material'

import { ColorSchemeToggle } from 'features/authorization/components'

import { Logo } from 'shared/components/icons'

export const Header: FC = () => {
  const theme = useTheme()

  return (
    <Grid item xs={1} width="100%" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Logo logoIcon={{ color: theme.palette.primary.dark }} />
      <ColorSchemeToggle />
    </Grid>
  )
}
