import React, { useEffect, type FC } from 'react'

import { ToastContainer, toast } from 'react-toastify'

import { useTheme } from '@mui/material'

import './styles.scss'

interface AlertProps {
  text: string
  variant: 'error' | 'info' | 'success' | 'warning'
}

export const Alert: FC<AlertProps> = ({ text, variant }) => {
  const theme = useTheme()
  useEffect(() => {
    toast[variant](text, { toastId: text })
  }, [])

  return (
    <ToastContainer
      toastStyle={{
        borderRadius: '12px'
      }}
      theme={theme.palette.mode}
      autoClose={1000}
      hideProgressBar
      limit={1}
      pauseOnFocusLoss={false}
      pauseOnHover={false}
    />
  )
}
