import React, { type FC } from 'react'
import { DataGrid, DataGridProps } from '@mui/x-data-grid'
import { Box, BoxProps, LinearProgress, Stack } from '@mui/material'
import { NoRowsOverlay } from '../NoRowsOverlay'
import { CustomToolbar } from '../CustomToolbar'
import { OutlinedButton, PrimaryButton } from 'shared/components/common/buttons'

interface ManagementTableInterface {
  handleUpdate: () => void
  onRemove: () => void
  selected: string[]
  height: BoxProps['height']
}
export type ManagementTableProps = Pick<
  DataGridProps,
  | 'rows'
  | 'columns'
  | 'rowCount'
  | 'paginationModel'
  | 'onPaginationModelChange'
  | 'pageSizeOptions'
  | 'getRowId'
  | 'onRowSelectionModelChange'
  | 'processRowUpdate'
  | 'loading'
  | 'rowSelectionModel'
  | 'apiRef'
> &
  ManagementTableInterface
export const ManagementTable: FC<ManagementTableProps> = ({ handleUpdate, onRemove, selected, ...props }) => {
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
        paginationMode="server"
        pagination
        {...props}
      />
    </Box>
  )
}
