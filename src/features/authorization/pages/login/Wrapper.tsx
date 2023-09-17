import React, { type FC, type PropsWithChildren } from 'react'
import { Grid } from '@mui/material'

export const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid item xs={12} md={5}>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: '100%', width: '100%', p: 2 }}
      >
        {children}
      </Grid>
    </Grid>
  )
}
