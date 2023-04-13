import React, { type FC } from 'react'
import { Grid } from '@mui/material'

import { ColorSchemeToggle } from 'features/authorization/components'
import { Logo } from 'shared/components/icons'

export const Header: FC = () => {
  return (
    <Grid item xs={1} width="100%" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Logo
        logoIcon={{
          color: '#fff'
        }}
        textProps={{
          color: '#fff'
        }}
      />
      <ColorSchemeToggle sx={{ color: '#fff' }} />
    </Grid>
  )
}
