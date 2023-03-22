import { FC } from 'react'
import { Backdrop as MuiBackdrop, CircularProgress } from '@mui/material'

export const Backdrop: FC = () => {
  return (
    <MuiBackdrop
      sx={{
        color: 'primary.lighter',
        zIndex: 10000
      }}
      open={true}
    >
      <CircularProgress thickness={7} />
    </MuiBackdrop>
  )
}
