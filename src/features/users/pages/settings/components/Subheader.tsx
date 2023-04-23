import React, { type FC } from 'react'

import { Box, Divider, Typography } from '@mui/material'

interface SubheaderProps {
  title: string
  color?: string
}

export const Subheader: FC<SubheaderProps> = ({ title, color }) => {
  return (
    <Box mt={2}>
      <Typography component="h1" fontSize={26} fontWeight={600} color={color}>
        {title}
      </Typography>
      <Divider sx={{ mt: 1, mb: 3 }} />
    </Box>
  )
}
