import { Grid } from '@mui/material'
import { FC, PropsWithChildren } from 'react'

export const Root: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid container sx={{ height: '100vh' }}>
      {children}
    </Grid>
  )
}
