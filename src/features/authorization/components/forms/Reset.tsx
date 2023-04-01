import React, { FC } from 'react'
import { FormikProps } from 'formik'

import { Box } from '@mui/material'

import { PasswordInput } from 'shared/components/forms'
import { ResetPasswordDetails } from 'features/authorization/type'
import { PrimaryButton } from 'shared/components/common/buttons'

interface FormProps<Type> {
  formik: FormikProps<Type>
  isLoading: boolean
  badCredentials: { [key: string]: string | undefined } | undefined
}

export const ResetPasswordForm: FC<FormProps<ResetPasswordDetails>> = ({ formik, isLoading, badCredentials }) => {
  return (
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
        autoComplete="new-password"
        size="small"
        label="Password"
        value={formik.values.password}
        helperText="Must be at least 8 characters."
        errorText={formik.errors.password || badCredentials?.password}
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
      <PrimaryButton loading={isLoading} type="submit" fullWidth>
        Reset password
      </PrimaryButton>
    </Box>
  )
}
