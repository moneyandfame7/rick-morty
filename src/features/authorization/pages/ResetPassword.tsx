import React, { FC } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined'
import { useReset } from '../hooks/useReset'
import { PasswordInput } from 'shared/components/Form/PasswordInput'
import { errorHandler } from '../components/ErrorHandler'
import { GoBackButton } from '../components/GoBackButton'
import { ResetPasswordError } from '../components/ResetPasswordError'
import { SuccessReset } from '../components/SuccessReset'

export const ResetPasswordPage: FC = () => {
  const { formik, error, isLoading, isSuccess } = useReset()
  const resetBadCredentials = errorHandler(error)
  const showError = () => {
    if (!resetBadCredentials) {
      return null
    }
    if ('id' in resetBadCredentials) {
      return <ResetPasswordError error={resetBadCredentials.id} />
    } else if ('token' in resetBadCredentials) {
      return <ResetPasswordError error={resetBadCredentials.token} />
    }
  }
  return (
    <Container sx={{ width: { xs: '100%', sm: '450px' }, p: { xs: 0 }, mt: { xs: 7, sm: 10 } }}>
      {!resetBadCredentials?.id && !resetBadCredentials?.token && !isSuccess && (
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            mx: 'auto',
            gap: 4
          }}
        >
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
            <KeyOutlinedIcon
              sx={{ fontSize: 50, bgcolor: 'primary.lighter', p: 1.3, borderRadius: '12px', color: 'primary.dark' }}
            />
            <Typography variant="h5" fontWeight="500">
              Set new password
            </Typography>
            <Typography variant="body2" fontWeight="500" color="text.secondary" textAlign="center">
              Your new password must be different to previously used passwords.
            </Typography>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            width="100%"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <PasswordInput
              id="password"
              name="password"
              fullWidth
              size="small"
              label="Password"
              value={formik.values.password}
              helperText="Must be at least 8 characters."
              errorText={formik.errors.password || resetBadCredentials?.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
            <PasswordInput
              id="confirm-password"
              name="confirmPassword"
              fullWidth
              size="small"
              label="Confirm"
              value={formik.values.confirmPassword}
              errorText={!!formik.values.password ? formik.errors.confirmPassword : ''}
              onChange={formik.handleChange}
              disabled={isLoading}
            />
            <LoadingButton loading={isLoading} type="submit" variant="contained" fullWidth sx={{ fontWeight: 600 }}>
              Reset password
            </LoadingButton>
          </Box>

          <GoBackButton isLoading={isLoading} />
        </Box>
      )}

      {showError()}

      {isSuccess && <SuccessReset />}
    </Container>
  )
}
