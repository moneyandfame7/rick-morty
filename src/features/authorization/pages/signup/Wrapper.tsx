import React, { type FC, type PropsWithChildren } from 'react'
import { Grid } from '@mui/material'

export const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid item md={4}>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          display: {
            xs: 'none',
            md: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%'
          },
          backgroundColor: 'primary.dark',
          padding: '20px 30px'
        }}
      >
        {children}
      </Grid>
    </Grid>
  )
}
