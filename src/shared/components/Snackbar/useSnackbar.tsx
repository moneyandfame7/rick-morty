import React, { FC, useState } from 'react'

import { Alert, AlertProps, Snackbar as MuiSnackbar, Slide, SlideProps } from '@mui/material'

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="up" />
}

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)

  const handleCloseSnackbar = () => setSnackbar(null)
  const Snackbar: FC = () => (
    <MuiSnackbar
      open={!!snackbar}
      onClose={handleCloseSnackbar}
      autoHideDuration={6000}
      TransitionComponent={SlideTransition}
    >
      <Alert {...snackbar} onClose={handleCloseSnackbar} />
    </MuiSnackbar>
  )

  return { Snackbar, setSnackbar }
}
