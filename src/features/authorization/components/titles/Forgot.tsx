import React, { type FC } from 'react'
import { Typography } from '@mui/material'

const Forgot: FC = () => {
  return (
    <>
      <Typography variant="h5" fontWeight="500">
        Forgot password?
      </Typography>
      <Typography variant="body2" fontWeight="500" color="text.secondary">
        No worries, we&apos;ll send you reset instructions.
      </Typography>
    </>
  )
}

interface CheckEmailTitleProps {
  email: string
}

const CheckEmail: FC<CheckEmailTitleProps> = ({ email }) => {
  return (
    <>
      <Typography variant="h5" fontWeight="500">
        Check your email
      </Typography>
      <Typography variant="body2" fontWeight="500" color="text.secondary" textAlign="center">
        We sent a password reset link to <strong>{email}</strong>
      </Typography>
    </>
  )
}
export default { Forgot, CheckEmail }
