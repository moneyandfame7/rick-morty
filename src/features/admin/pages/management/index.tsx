import React, { type FC } from 'react'

import { Alert, Typography, useMediaQuery } from '@mui/material'

import { AdminHeader, Wrapper } from 'features/admin/components'
import { UserManagement } from './user'

export const ManagementPage: FC = () => {
  const isMobile = useMediaQuery('(max-width:900px)')
  return (
    <Wrapper>
      <AdminHeader title="Management" subtitle="Planning, organizing, directing, and controlling resources" />
      {isMobile && (
        <Alert severity="error" sx={{ my: 2 }}>
          <Typography fontWeight={600}>Not working on mobile</Typography>
        </Alert>
      )}
      <UserManagement />
    </Wrapper>
  )
}
