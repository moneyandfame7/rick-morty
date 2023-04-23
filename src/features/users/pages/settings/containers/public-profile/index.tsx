import React, { type FC } from 'react'

import { Grid } from '@mui/material'

import { Subheader } from 'features/users/pages/settings/components'

import { Form, UploadPhoto } from './components'

export const PublicProfileContainer: FC = () => {
  return (
    <>
      <Subheader title="Public profile" />
      <Grid container spacing={8}>
        <Form />
        <UploadPhoto />
      </Grid>
    </>
  )
}
