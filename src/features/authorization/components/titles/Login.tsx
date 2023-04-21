import React, { type FC } from 'react'
import { Stack, Typography } from '@mui/material'

export const LoginTitle: FC = () => {
  return (
    <Stack direction="column" gap="3px" width="100%" sx={{ mx: 'auto', mt: 5 }}>
      <Typography fontSize={30} fontWeight="600" sx={{ width: '100%', textAlign: 'start' }}>
        Welcome back
      </Typography>
      <Typography fontSize={16} fontWeight="400" color="text.secondary">
        Welcome back! Please enter your details.
      </Typography>
    </Stack>
  )
}
