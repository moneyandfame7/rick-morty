import React, { type PropsWithChildren, type FC } from 'react'

import { Paper as MuiPaper } from '@mui/material'

export const Paper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MuiPaper
      sx={{
        p: 2,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        position: 'relative',
        overflowX: 'hidden'
      }}
    >
      {children}
    </MuiPaper>
  )
}
