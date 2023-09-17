import React, { type FC } from 'react'

import { Grid, Divider } from '@mui/material'

import { NavigationList } from './NavigationList'
import { mainLinks, accessLinks } from './utils'

export const Sidebar: FC = () => {
  return (
    <Grid item xs={12} md={4} lg={3} component="nav" sx={{ pr: { md: 5 } }} width="100%">
      <NavigationList links={mainLinks} />
      <Divider sx={{ my: 1 }} />
      <NavigationList header="Access" links={accessLinks} />
    </Grid>
  )
}
