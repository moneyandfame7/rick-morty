import React, { type FC } from 'react'
import { Stack } from '@mui/material'
import { Typography } from '@mui/material'

export const HomeTitle: FC = () => {
  return (
    <Stack direction="column" gap={0.3} alignItems="center" sx={{ py: 3, px: { xs: 2, sm: 0 } }}>
      <Typography fontWeight={600} fontSize={48} textAlign="center">
        Rickmorty API
      </Typography>
      <Typography fontSize={16} sx={{ lineHeight: '30px' }} color="text.secondary" textAlign="center">
        Hundreds of characters, images, locations, and episodes.
      </Typography>
    </Stack>
  )
}
