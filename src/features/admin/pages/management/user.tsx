import React, { type FC } from 'react'
import { Box, LinearProgress, Stack } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import type { User } from 'features/users/type'
import { NoRowsOverlay, CustomToolbar } from 'features/admin/components'

import { OutlinedButton, PrimaryButton } from 'shared/components/common/buttons'
import { useSnackbar } from 'shared/components'

import { useUserTable } from './utils'

export const UserManagement: FC = () => {
  const { Snackbar, setSnackbar } = useSnackbar()
  const {
    data,
    columns,
    handleUpdate,
    onRemove,
    selected,
    setPaginationModel,
    paginationModel,
    onSelect,
    processRowUpdate,
    isDataLoading,
    isUpdateLoading,
    isDeleteloading
  } = useUserTable(setSnackbar)

  return (
    <Box height="400px">
      <Stack direction="row" gap={2}>
        <PrimaryButton onClick={handleUpdate}>Update table</PrimaryButton>
        <OutlinedButton onClick={onRemove} disabled={!selected.length}>
          Delete selected
        </OutlinedButton>
      </Stack>

      <DataGrid
        sx={{
          backgroundColor: 'background.default',
          borderColor: 'divider',
          '& .MuiDataGrid-withBorderColor': {
            borderColor: 'divider'
          },
          mt: 2
        }}
        editMode="row"
        slots={{
          loadingOverlay: LinearProgress,
          noRowsOverlay: NoRowsOverlay,
          toolbar: CustomToolbar
        }}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={onSelect}
        processRowUpdate={processRowUpdate}
        columns={columns}
        loading={isDataLoading || isUpdateLoading || isDeleteloading}
        getRowId={(row: User) => row.id}
        rows={(data && data.users) || []}
        rowCount={(data && data.count) || 0}
        paginationMode="server"
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 20, 50]}
      />
      {Snackbar}
    </Box>
  )
}
