import React, { FC } from 'react'
import { Stack } from '@mui/material'
import Typography from '@mui/material/Typography'

export const HomeTitle: FC = () => {
  return (
    <Stack direction="column" gap={0.3} alignItems="center" sx={{ py: 3 }}>
      <Typography fontWeight={600} fontSize={48}>
        Rickmorty API
      </Typography>
      <Typography fontSize={16} sx={{ lineHeight: '30px' }} color="text.secondary">
        Hundreds of characters, images, locations, and episodes.
      </Typography>
    </Stack>
  )
}
