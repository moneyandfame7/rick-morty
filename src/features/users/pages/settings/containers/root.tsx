import React, { type FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { Grid } from '@mui/material'

import { AdminContainer } from './admin'
import { AppearenceContainer } from './appearence'
import { EmailContainer } from './email'
import { PublicProfileContainer } from './public-profile'
import { SecurityContainer } from './security'

export const RootContainer: FC = () => {
  return (
    <Grid item xs={12} md={8} lg={9} component="main" px={1}>
      <Routes>
        <Route path="/" index element={<Navigate to="profile" />} />
        <Route path="*" element={<Navigate to="profile" />} />

        <Route path="appearance" element={<AppearenceContainer />} />
        <Route path="profile" element={<PublicProfileContainer />} />
        <Route path="admin" element={<AdminContainer />} />
        <Route path="email" element={<EmailContainer />} />
        <Route path="security" element={<SecurityContainer />} />
      </Routes>
    </Grid>
  )
}
