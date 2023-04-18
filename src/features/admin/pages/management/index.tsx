import React, { type FC } from 'react'

import { AdminHeader, Wrapper } from 'features/admin/components'
import { UserManagement } from './user'

export const ManagementPage: FC = () => {
  return (
    <Wrapper>
      <AdminHeader title="Management" subtitle="Planning, organizing, directing, and controlling resources" />
      <UserManagement />
    </Wrapper>
  )
}
