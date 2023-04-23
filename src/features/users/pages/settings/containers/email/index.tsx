import React, { useCallback, type FC } from 'react'

import { Box, Checkbox, Stack, Typography } from '@mui/material'

import { useAppSelector } from 'application/store'

import type { User } from 'features/users/type'
import { Subheader } from 'features/users/pages/settings/components'
import { selectCurrentUser } from 'features/users/services'
import { useEditSettings } from 'features/users/hooks'
import { OutlinedButton } from 'shared/components/common/buttons'
import { ValidatedInput } from 'shared/components/forms'
import { emailValidationSchema } from 'shared/utils'
import { authHandler } from 'features/authorization/services'

export const EmailContainer: FC = () => {
  const currentUser = useAppSelector(selectCurrentUser)

  const { formik, isLoading, isSuccess, error } = useEditSettings(
    {
      mail_subscribe: currentUser?.mail_subscribe,
      email: currentUser?.email
    },
    emailValidationSchema
  )
  const serverError = authHandler(error)
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
      <Stack direction="row" gap={1}>
        <Typography fontSize={16} fontWeight={700}>
          {currentUser?.email}
        </Typography>
        -
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
  return (
    <>
      <Subheader title="Email settings" />
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
            sx={{ width: 300 }}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </Box>
        <OutlinedButton type="submit" disabled={!isValuesDifferent()} loading={isLoading}>
          Apply changes
        </OutlinedButton>
      </Box>
    </>
  )
}
