import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertProps, Avatar, Chip, IconButton, useMediaQuery } from '@mui/material'

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import { useSnackbar } from 'shared/components/Snackbar/useSnackbar'
import { User } from 'features/users/type'
import _ from 'lodash'
import { useDeleteUsersMutation, useLazyGetUsersQuery, useUpdateUserMutation } from 'features/users/services'

const getRoleBackground = (role: string) => {
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

const getVerifiedStatus = (isVerified: boolean) => {
  if (isVerified) {
    return <Chip color="success" label="Verified" />
  }
  return <Chip label="Unverified" />
}

const getProfileColumn = (id: string) => {
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

export const useUserTable = (
  setSnackbar: React.Dispatch<React.SetStateAction<Pick<AlertProps, 'children' | 'severity'> | null>>
) => {
  const isNotDesktop = useMediaQuery('(max-width:900px)')

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0
  })
  const [selected, setSelected] = useState<string[]>([])

  const [get, { data, isLoading: isDataLoading }] = useLazyGetUsersQuery()
  const [update, { isLoading: isUpdateLoading, error: onUpdateError }] = useUpdateUserMutation()
  const [deleteUsers, { isLoading: isDeleteloading, error: onDeleteError }] = useDeleteUsersMutation()

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
      renderCell: ({ value }) => getRoleBackground(value),
      valueGetter: params => params.value.value,
      valueSetter: params => {
        const newRole = { ...params.row.role, value: params.value }
        return { ...params.row, role: newRole }
      }
    },
    {
      field: 'is_verified',
      headerName: 'Verified status',
      sortable: false,
      editable: true,
      type: 'boolean',
      disableColumnMenu: true,
      renderCell: ({ value }) => getVerifiedStatus(value),
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
      renderCell: ({ value }) => getProfileColumn(value)
    }
  ]

  const processRowUpdate = async (newRow: User, oldRow: User) => {
    if (_.isEqual(newRow, oldRow)) {
      return oldRow
    }
    const updated = _.pickBy(newRow, (value, key) => {
      return !_.isEqual(value, oldRow[key as keyof User])
    })

    const info = await update({ id: newRow.id, updated })
    if ('data' in info) {
      setSnackbar({ children: 'User successfully updated', severity: 'success' })
      return info.data
    }

    setSnackbar({ children: 'User update failed', severity: 'error' })
    return oldRow
  }

  const onSelect = async (ids: GridRowSelectionModel) => {
    setSelected(ids as string[])
  }
  const onRemove = async () => {
    const info = await deleteUsers(selected as string[])
    if ('data' in info) {
      setSnackbar({ children: 'Users successfully removed', severity: 'success' })
      await handleUpdate()
    } else {
      setSnackbar({ children: 'User removing failed', severity: 'error' })
    }
  }
  const handleUpdate = async () => {
    await get({ ...paginationModel })
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      await handleUpdate()
    })()
  }, [])
  return {
    data,
    columns,
    selected,
    paginationModel,
    isDataLoading,
    isUpdateLoading,
    isDeleteloading,
    onUpdateError,
    onDeleteError,
    processRowUpdate,
    handleUpdate,
    onSelect,
    onRemove,
    setPaginationModel
  }
}
