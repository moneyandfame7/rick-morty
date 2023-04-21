import React, { type FC, useState } from 'react'

import { Alert, type AlertProps, Snackbar as MuiSnackbar, Slide, type SlideProps } from '@mui/material'

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="down" />
}

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)

  const handleCloseSnackbar = () => setSnackbar(null)
  const Snackbar: FC = () => (
    <MuiSnackbar
      sx={{ mt: 3 }}
      open={!!snackbar}
      onClose={handleCloseSnackbar}
      autoHideDuration={6000}
      TransitionComponent={SlideTransition}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
    >
      <Alert {...snackbar} onClose={handleCloseSnackbar} />
    </MuiSnackbar>
  )

  return { Snackbar, setSnackbar }
}
