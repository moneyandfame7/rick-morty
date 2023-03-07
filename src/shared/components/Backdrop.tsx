import { CircularProgress, Modal } from '@mui/joy'
import { FC } from 'react'

interface BackdropProps {
  isLoading: boolean
}
export const Backdrop: FC<BackdropProps> = ({ isLoading }) => {
  return (
    <Modal
      open={isLoading}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', userSelect: 'none' }}
    >
      <CircularProgress color='primary' size='md' variant='soft' />
    </Modal>
  )
}
