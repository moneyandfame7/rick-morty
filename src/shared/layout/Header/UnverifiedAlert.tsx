import React, { type FC } from 'react'

import { Alert, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

import { useVerificationSendMutation } from 'features/authorization/services'

import { PrimaryButton } from 'shared/components/common/buttons'
import { useSnackbar } from 'shared/hooks'

export const UnverifiedAlert: FC = () => {
  const [resendVerification, { isLoading: isVerificationLoading }] = useVerificationSendMutation()
  const { Snackbar, setSnackbar } = useSnackbar()
  const handleClickSend = async () => {
    await resendVerification()
    setSnackbar({ children: 'Verification mail send!', severity: 'info' })
  }
  return (
    <Alert severity="warning" sx={{ maxWidth: 300, position: 'relative' }}>
      <Typography variant="h6" fontSize={14} fontWeight={600}>
        You haven&apos;t verified your email address yet.
      </Typography>
      <Typography variant="body2" fontWeight={500} sx={{ py: 1, opacity: 0.8 }}>
        Please click on the link we emailed you to verify your email.
      </Typography>
      <Typography variant="body2" fontWeight={500} sx={{ opacity: 0.8 }}>
        Did not receive the email?
      </Typography>
      <PrimaryButton
        loading={isVerificationLoading}
        onClick={handleClickSend}
        sx={{ mt: 1 }}
        startIcon={<SendIcon />}
        size="small"
      >
        Resend verification email
      </PrimaryButton>
      <Snackbar />
    </Alert>
  )
}
