import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, Typography } from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined'
import { ForgotCredentials } from 'features/users/type'
import { LoadingButton } from '@mui/lab'
import { PrimaryIcon } from '../../../shared/components/common/icons/PrimaryIcon'

interface CheckEmailProps {
  email: string
  sendLink: (credentials: ForgotCredentials) => void
  isLoading: boolean
  setIsForgotForm: (val: boolean) => void
}

export const CheckEmail: FC<CheckEmailProps> = ({ email, sendLink, isLoading, setIsForgotForm }) => {
  const googleEmail = 'https://mail.google.com'
  useEffect(() => {
    setIsForgotForm(false)
  }, [])
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1
      }}
    >
      <PrimaryIcon icon={<EmailOutlinedIcon />} />
      <Typography variant="h5" fontWeight="500">
        Check your email
      </Typography>
      <Typography variant="body2" fontWeight="500" color="text.secondary" textAlign="center">
        We sent a password reset link to <strong>{email}</strong>
      </Typography>
      <LoadingButton
        loading={isLoading}
        fullWidth
        variant="contained"
        sx={{ fontWeight: 500, my: 3 }}
        onClick={() => {
          window.open(googleEmail, '_blank')
        }}
      >
        Open email app
      </LoadingButton>
      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, opacity: 0.9 }}>
        Didn't receive the email?{' '}
        <Button
          variant="text"
          sx={{ fontWeight: 500 }}
          onClick={async () => {
            await sendLink({ email })
          }}
        >
          Click to resend
        </Button>
      </Typography>
    </Box>
  )
}
