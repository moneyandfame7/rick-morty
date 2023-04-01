import React, { FC } from 'react'
import { Grid } from '@mui/material'
import { Logo } from '../../../../shared/components/icons'
import { ColorSchemeToggle } from '../../components'

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
