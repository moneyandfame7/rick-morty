import React, { type FC } from 'react'

import { Avatar, Box, Grid, Typography } from '@mui/material'

import { useAppSelector } from 'application/store'

import { selectCurrentUser } from 'features/users/services'

import { EditMenu } from './Menu'

export const UploadPhoto: FC = () => {
  const currentUser = useAppSelector(selectCurrentUser)

  if (!currentUser) {
    return null
  }
  return (
    <Grid item xs={12} md={5.5} sx={{ order: { xs: 1, md: 2 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography fontSize={14} fontWeight={600}>
        Profile picture
      </Typography>
      <Box sx={{ position: 'relative', width: 200, height: 200 }}>
        <Avatar src={currentUser.photo} sx={{ width: '100%', height: '100%' }} />
        <EditMenu />
      </Box>
    </Grid>
  )
}
