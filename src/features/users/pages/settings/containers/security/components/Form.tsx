import React, { useEffect, type FC } from 'react'

import { Box, Stack, Typography } from '@mui/material'

import { errorHandler } from 'features/authorization/services'
import { useUpdatePassword } from 'features/users/hooks'

import { OutlinedButton } from 'shared/components/common/buttons'
import { PasswordInput } from 'shared/components/forms'
import { useSnackbar } from 'shared/hooks'

export const Form: FC = () => {
  const { formik, isLoading, isSuccess, error } = useUpdatePassword()
  const { Snackbar, setSnackbar } = useSnackbar()
  const serverError = errorHandler(error)
  useEffect(() => {
    if (isSuccess) {
      setSnackbar({ children: 'Password updated successfully', severity: 'success' })
    }
  }, [isSuccess])
  return (
    <Box
      sx={{ maxWidth: { xs: '100%', sm: '80%', lg: '50%' }, display: 'flex', flexDirection: 'column', gap: 2 }}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <PasswordInput
        required
        errorText={formik.errors.oldPassword || serverError?.password}
        disabled={isLoading}
        value={formik.values.oldPassword}
        onChange={formik.handleChange}
        label="Old password"
        name="oldPassword"
        size="small"
        fullWidth
      />
      <PasswordInput
        required
        errorText={formik.errors.newPassword}
        disabled={isLoading}
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        label="New password"
        name="newPassword"
        size="small"
        fullWidth
      />
      <PasswordInput
        required
        errorText={formik.errors.confirmPassword}
        onChange={formik.handleChange}
        disabled={isLoading}
        value={formik.values.confirmPassword}
        label="Confirm new password"
        name="confirmPassword"
        size="small"
        fullWidth
      />
      <Stack gap={0.3}>
        <Typography fontSize={12} fontWeight={500} color="text.secondary">
          Make sure it&apos;s at least 20 characters OR at least 8 characters including a number and a lowercase letter.
        </Typography>

        <OutlinedButton sx={{ width: 'max-content' }} type="submit" loading={isLoading}>
          Update password
        </OutlinedButton>
      </Stack>
      <Snackbar />
    </Box>
  )
}
