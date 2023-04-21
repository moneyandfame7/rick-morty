import React, { type FC } from 'react'
import { Box } from '@mui/material'

import { AdminHeader, Wrapper } from 'features/admin/components'

export const StatisticsPage: FC = () => {
  return (
    <Wrapper>
      <Box height="100%" position="relative">
        <AdminHeader title="Statistics" subtitle="You can show entities stats here" />
      </Box>
    </Wrapper>
  )
}
