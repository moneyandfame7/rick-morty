import React from 'react'
import { useNavigate } from 'react-router-dom'

import dayjs from 'dayjs'

import { Avatar, Chip, IconButton, useMediaQuery } from '@mui/material'
import { type GridColDef } from '@mui/x-data-grid'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'

export const RoleBackground = ({ role }: { role: string }) => {
  const getRoleBackground = () => {
    switch (role) {
      case 'owner':
        return 'warning'
      case 'admin':
        return 'info'
      default:
        return 'default'
    }
  }
  return <Chip color={getRoleBackground()} label={role} />
}

export const VerifiedStatus = ({ isVerified }: { isVerified: boolean }) => {
  if (isVerified) {
    return <Chip color="success" label="Verified" />
  }
  return <Chip label="Unverified" />
}

export const ProfileColumn = ({ id }: { id: string }) => {
  const navigate = useNavigate()
  return (
    <IconButton
      onClick={() => {
        navigate({ pathname: `/profile/${id}` })
      }}
    >
      <RemoveRedEyeOutlinedIcon />
    </IconButton>
  )
}

export const useUserColumns = () => {
  const isNotDesktop = useMediaQuery('(max-width:900px)')

  const columns: GridColDef[] = [
    {
      field: 'photo',
      headerName: 'Avatar',
      sortable: false,
      editable: false,
      renderCell: ({ value }) => <Avatar src={value} sx={{ width: 30, height: 30 }} />,
      disableColumnMenu: true,
      flex: isNotDesktop ? undefined : 0.3
    },
    {
      field: 'username',
      headerName: 'Username',
      sortable: false,
      editable: true,
      hideable: false,
      disableColumnMenu: true,
      flex: isNotDesktop ? undefined : 0.5
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: false,
      hideable: false,
      disableColumnMenu: true,
      flex: isNotDesktop ? undefined : 0.5
    },
    {
      field: 'role',
      headerName: 'Role',
      sortable: false,
      disableColumnMenu: true,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['user', 'admin'],
      flex: isNotDesktop ? undefined : 0.3,
      renderCell: ({ value }) => <RoleBackground role={value} />,
      valueGetter: params => params.value.value,
      valueSetter: params => {
        const newRole = { ...params.row.role, value: params.value }
        return { ...params.row, role: newRole }
      }
    },
    {
      field: 'auth_type',
      headerName: 'Auth type',
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      flex: isNotDesktop ? undefined : 0.3
    },
    {
      field: 'is_verified',
      headerName: 'Verified status',
      sortable: false,
      editable: true,
      type: 'boolean',
      disableColumnMenu: true,
      renderCell: ({ value }) => <VerifiedStatus isVerified={value} />,
      flex: isNotDesktop ? undefined : 0.5
    },
    {
      field: 'created_at',
      headerName: 'Created at',
      sortable: false,
      editable: false,
      type: 'date',
      disableColumnMenu: true,
      valueFormatter: ({ value }) => dayjs(value).format('DD/MM/YYYY'),
      flex: isNotDesktop ? undefined : 0.4
    },
    {
      field: 'id',
      headerName: 'Profile',
      sortable: false,
      editable: false,
      flex: isNotDesktop ? undefined : 0.2,
      hideable: false,
      disableColumnMenu: true,
      renderCell: ({ value }) => <ProfileColumn id={value} />
    }
  ]

  return columns
}
