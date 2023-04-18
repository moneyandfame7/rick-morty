import React, { type FC } from 'react'
import { Box, Stack } from '@mui/material'

import { OutlinedButton, PrimaryButton } from 'shared/components/common/buttons'

import { useTable } from 'features/admin/components/ManagementTable/utils'
import { useDeleteUsersMutation, useLazyGetUsersQuery, useUpdateUserMutation } from 'features/users/services'
import { ManagementTable } from 'features/admin/components/ManagementTable'
import { useSnackbar } from 'shared/components'
import { useUserColumns } from './users/utils'

export const UserManagement: FC = () => {
  const { Snackbar, setSnackbar } = useSnackbar()
  const columns = useUserColumns()
  const {
    isLoading,
    onRemove,
    onSelect,
    handleUpdate,
    processRowUpdate,
    paginationModel,
    setPaginationModel,
    data,
    selected
  } = useTable({
    useGet: useLazyGetUsersQuery,
    useRemove: useDeleteUsersMutation,
    useUpdate: useUpdateUserMutation,
    setSnackbar
  })

  return (
    <>
      <ManagementTable
        height="400px"
        handleUpdate={handleUpdate}
        onRemove={onRemove}
        selected={selected}
        processRowUpdate={processRowUpdate}
        columns={columns}
        loading={isLoading}
        getRowId={row => row.id}
        rows={(data && data.users) || []}
        rowCount={(data && data.count) || 0}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowSelectionModel={selected}
        onRowSelectionModelChange={onSelect}
        pageSizeOptions={[10, 20, 50]}
      />
      <Snackbar />
    </>
  )
}
