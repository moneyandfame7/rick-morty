import React, { type FC } from 'react'
import dayjs from 'dayjs'
import { Avatar, Chip, Stack, Typography } from '@mui/material'

import { type RecentUsers } from 'features/admin/type'
import { Table } from 'features/admin/components'

const getFormattedDate = (row: RecentUsers) => {
  return dayjs(row.created_at).locale('en').format('MMMM D, YYYY')
}
export const getFormattedRole = (row: RecentUsers) => {
  const getRoleBackground = () => {
    switch (row.role) {
      case 'owner':
        return 'warning'
      case 'admin':
        return 'info'
      default:
        return 'default'
    }
  }
  return <Chip color={getRoleBackground()} label={row.role} />
}
const getUsernameWithAvatar = (row: RecentUsers) => {
  const getAvatar = () => {
    if (row?.photo) {
      return <Avatar src={row.photo} />
    }
    return <Avatar>{row.username.charAt(0)}</Avatar>
  }
  if (row.username) {
    return <Chip avatar={getAvatar()} label={row.username} />
  }
  return <Chip avatar={<Avatar />} />
}
export const getCountryImage = (row: RecentUsers) => {
  if (row.country) {
    return (
      <Stack direction="row" gap={1} justifyContent="end" sx={{ fontWeight: 500 }}>
        <img src={`https://flagcdn.com/w20/${row.country.toLowerCase()}.png`} />
        {row.country}
      </Stack>
    )
  }
  return (
    <Typography fontWeight={500} fontSize={14}>
      NONE
    </Typography>
  )
}
export const getVerifiedField = (row: RecentUsers) => {
  if (row.is_verified) {
    return <Chip color="success" label="Verified" />
  }
  return <Chip label="Unverified" />
}
const needToFormat = [
  { field: 'created_at', implement: getFormattedDate },
  { field: 'role', implement: getFormattedRole },
  { field: 'username', implement: getUsernameWithAvatar },
  { field: 'country', implement: getCountryImage },
  { field: 'is_verified', implement: getVerifiedField }
]

interface RecentUsersTableProps {
  recentUsers: RecentUsers[]
}
export const RecentUsersTable: FC<RecentUsersTableProps> = ({ recentUsers }) => {
  return <Table data={recentUsers} excludedFields={['photo']} needToFormat={needToFormat} />
}
