import React, { type FC, useEffect } from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'

import { ForgotTitle } from 'features/authorization/components/titles'
import { type ForgotCredentials } from 'features/users/type'

import { BaseIcon } from 'shared/components/common/icons'
import { PrimaryButton } from 'shared/components/common/buttons'

interface CheckEmailProps {
  email: string
  sendLink: (credentials: ForgotCredentials) => void
  isLoading: boolean
  setIsForgotForm: (val: boolean) => void
}

export const CheckEmail: FC<CheckEmailProps> = ({ email, sendLink, isLoading, setIsForgotForm }) => {
  const googleEmail = 'https://mail.google.com'
  const theme = useTheme()
  useEffect(() => {
    setIsForgotForm(false)
    /*  eslint-disable-next-line */
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
      <BaseIcon icon={<EmailOutlinedIcon />} color={theme.palette.primary.main} />
      <ForgotTitle.CheckEmail email={email} />
      <PrimaryButton
        loading={isLoading}
        fullWidth
        variant="contained"
        sx={{ my: 3 }}
        onClick={() => {
          window.open(googleEmail, '_blank')
        }}
      >
        Open email app
      </PrimaryButton>
      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, opacity: 0.9 }}>
        Didn&apos;t receive the email?{' '}
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
