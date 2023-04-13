import { Skeleton, Stack } from '@mui/material'
import React, { type FC } from 'react'

export const SkeletonChart: FC = () => {
  return (
    <Stack gap={1} alignItems="center" mt="20px" width="100%">
      <Skeleton
        variant="circular"
        sx={{
          height: { xs: 150, sm: 200, md: 250, lg: 325 },
          width: {
            xs: 150,
            sm: 200,
            md: 250,
            lg: 325
          }
        }}
      />
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          gap: { xs: 1, md: 3, lg: 5 }
        }}
      >
        <Skeleton width={50} height={20} />
        <Skeleton width={50} height={20} />
        <Skeleton width={50} height={20} />
        <Skeleton width={50} height={20} />
      </Stack>
    </Stack>
  )
}
