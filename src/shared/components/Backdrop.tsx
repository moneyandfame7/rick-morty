import { FC } from 'react'
import { Backdrop as MuiBackdrop, CircularProgress } from '@mui/material'

export const Backdrop: FC = () => {
  return (
    <MuiBackdrop
      sx={{
        color: '#fff',
        zIndex: 50,
        blur: '20px',
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgb(37 37 45 / 50%)'
      }}
      open={true}
    >
      <CircularProgress color='primary' thickness={7} />
    </MuiBackdrop>
  )
}
