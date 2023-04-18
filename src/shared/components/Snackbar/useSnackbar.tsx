import React from 'react'

import { Alert, AlertProps, Snackbar as MuiSnackbar } from '@mui/material'

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)

  const handleCloseSnackbar = () => setSnackbar(null)

  const Snackbar = (
    <MuiSnackbar
      open={!!snackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={handleCloseSnackbar}
      autoHideDuration={6000}
    >
      <Alert {...snackbar} onClose={handleCloseSnackbar} />
    </MuiSnackbar>
  )

  return { Snackbar, setSnackbar }
}
