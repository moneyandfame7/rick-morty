import React, { type FC } from 'react'

import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector } from '@mui/x-data-grid'

export const CustomToolbar: FC = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  )
}
