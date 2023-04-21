import React, { type FC } from 'react'

import { Box, Divider, Typography } from '@mui/material'

interface SubheaderProps {
  title: string
}

export const Subheader: FC<SubheaderProps> = ({ title }) => {
  return (
    <Box mt={2}>
      <Typography component="h1" fontSize={26} fontWeight={500}>
        {title}
      </Typography>
      <Divider sx={{ mt: 1, mb: 3 }} />
    </Box>
  )
}
