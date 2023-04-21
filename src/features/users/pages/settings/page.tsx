import React, { type FC } from 'react'

import { Container, Grid } from '@mui/material'

import { Header, Sidebar } from './components'

import { RootContainer } from './containers/root'

export const AccountSettingsPage: FC = () => {
  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, md: 5, lg: 10 }, py: 4 }}>
      <Header />

      <Grid container>
        <Sidebar />
        <RootContainer />
      </Grid>
    </Container>
  )
}
