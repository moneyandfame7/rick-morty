import React, { useCallback, type FC, useEffect } from 'react'

import { Box, Typography, Stack, Checkbox } from '@mui/material'

import { useAppSelector } from 'application/store'

import type { User } from 'features/users/type'
import { errorHandler, useVerificationSendMutation } from 'features/authorization/services'
import { useEditSettings } from 'features/users/hooks'
import { selectCurrentUser } from 'features/users/services'

import { OutlinedButton } from 'shared/components/common/buttons'
import { ValidatedInput } from 'shared/components/forms'
import { emailValidationSchema } from 'shared/validations/users'
import { useSnackbar } from 'shared/hooks'

export const Form: FC = () => {
  const currentUser = useAppSelector(selectCurrentUser)
  const [sendVerification, { isLoading: isVerifyLoading, isSuccess: isVerifySuccess }] = useVerificationSendMutation()
  const { formik, isLoading, isSuccess, error } = useEditSettings(
    {
      mail_subscribe: currentUser?.mail_subscribe,
      email: currentUser?.email
    },
    emailValidationSchema
  )
  const { Snackbar, setSnackbar } = useSnackbar()
  const serverError = errorHandler(error)
  useEffect(() => {
    if (isSuccess) {
      setSnackbar({ children: 'Email settings updated successfully', severity: 'success' })
    }
  }, [isSuccess])
  useEffect(() => {
    if (isVerifySuccess) {
      setSnackbar({ children: `Letter sent to the mail ${currentUser?.email}`, severity: 'success' })
    }
  }, [isVerifySuccess])
  if (!currentUser) {
    return null
  }

  const isValuesDifferent = useCallback(() => {
    const isFieldsEquals = Object.keys(formik.values).map(
      key => currentUser[key as keyof User] === formik.values[key as keyof User]
    )
    return isFieldsEquals.includes(false)
  }, [formik.values, currentUser])

  const getVerifyStatus = () => {
    return (
      <Stack
        gap={1}
        sx={{
          alignItems: { xs: 'left', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 0.2, sm: 1 },
          mb: { xs: 1 }
        }}
      >
        <Typography fontSize={16} fontWeight={700}>
          {currentUser?.email}
        </Typography>
        {currentUser.is_verified ? (
          <Typography fontSize={16} fontWeight={600} color="success.main">
            Verified
          </Typography>
        ) : (
          <Typography fontSize={16} fontWeight={600} color="warning.main">
            Unverified
          </Typography>
        )}
      </Stack>
    )
  }

  const handleSendVerification = async () => {
    await sendVerification()
  }
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        p: 2,
        borderRadius: '8px'
      }}
      component="form"
      noValidate
      onSubmit={formik.handleSubmit}
    >
      {getVerifyStatus()}
      <Typography fontSize={12} color="text.secondary">
        * {currentUser?.mail_subscribe ? 'Receives notifications' : 'Does not receives notifications'}
      </Typography>

      <Stack direction="row" alignItems="center">
        <Typography variant="body2" color="text.secondary" fontWeight={500} fontSize={13}>
          Subscribe to the newsletter?
        </Typography>
        <Checkbox
          disableRipple
          id="mail_subscribe"
          name="mail_subscribe"
          checked={formik.values.mail_subscribe}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Stack>

      <Box my={1}>
        <Typography fontWeight={600} fontSize={14}>
          Change email addres
        </Typography>
        <ValidatedInput
          errorText={formik.errors.email || serverError?.email}
          name="email"
          size="small"
          sx={{ width: { xs: '100%', md: 300 } }}
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </Box>
      <Stack direction="row" gap={2}>
        <OutlinedButton type="submit" disabled={!isValuesDifferent()} loading={isLoading}>
          Apply changes
        </OutlinedButton>
        {!currentUser.is_verified && (
          <OutlinedButton onClick={handleSendVerification} loading={isVerifyLoading}>
            Send verification mail
          </OutlinedButton>
        )}
      </Stack>

      <Snackbar />
    </Box>
  )
}
