import { Skeleton, Stack } from '@mui/material'
import React, { type FC } from 'react'

export const SkeletonTable: FC = () => {
  return (
    <Stack gap={1} width="100%">
      <Skeleton width="100%" height={40} />
      <Skeleton width="100%" height={40} />
      <Skeleton width="100%" height={40} />
      <Skeleton width="100%" height={40} />
    </Stack>
  )
}
