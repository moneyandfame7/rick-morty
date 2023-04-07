import React, { FC } from 'react'
import { FormikProps } from 'formik'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { SerializedError } from '@reduxjs/toolkit'

import { Box, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { ForgotCredentials } from 'features/users/type'
import { errorHandler } from 'features/authorization/services'

import { ValidatedInput } from 'shared/components/forms/ValidatedInput'
import { PrimaryIcon } from 'shared/components/common/icons/PrimaryIcon'
import { PrimaryButton } from 'shared/components/common/buttons'

interface ForgotPasswordFormProps {
  formik: FormikProps<ForgotCredentials>
  error: FetchBaseQueryError | SerializedError | undefined
  isLoading: boolean
}

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({ formik, error, isLoading }) => {
  const forgotBadCredentials = errorHandler(error)

  return (
    <>
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        <PrimaryIcon icon={<LockOutlinedIcon />} />
        <Typography variant="h5" fontWeight="500">
          Forgot password?
        </Typography>
        <Typography variant="body2" fontWeight="500" color="text.secondary">
          No worries, we&apos;ll send you reset instructions.
        </Typography>
      </Box>

      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        width="100%"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <ValidatedInput
          fullWidth
          autoComplete="email"
          type="email"
          name="email"
          label="Email"
          variant="outlined"
          value={formik.values.email}
          size="small"
          errorText={formik.errors.email || forgotBadCredentials?.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isLoading}
        />
        <PrimaryButton loading={isLoading} type="submit" fullWidth>
          Reset password
        </PrimaryButton>
      </Box>
    </>
  )
}
