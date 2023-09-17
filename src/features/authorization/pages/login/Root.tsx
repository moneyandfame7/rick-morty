import React, { type FC, type PropsWithChildren } from 'react'
import { Grid } from '@mui/material'

export const Root: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid container sx={{ height: '100vh' }}>
      {children}
    </Grid>
  )
}
