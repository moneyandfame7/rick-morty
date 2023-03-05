import { Backdrop as MuiBackdrop, CircularProgress } from '@mui/material'
import { FC } from 'react'

interface BackdropProps {
  isLoading: boolean
}
export const Backdrop: FC<BackdropProps> = ({ isLoading }) => {
  return (
    <MuiBackdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
      <CircularProgress color='inherit' />
    </MuiBackdrop>
  )
}
