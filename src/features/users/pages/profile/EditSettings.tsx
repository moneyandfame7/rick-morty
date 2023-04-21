import React, { useState, type FC, useEffect } from 'react'

import { Box, Stack, type BoxProps, Typography, Checkbox } from '@mui/material'
import { CountryAutocompleteInput, ValidatedInput } from 'shared/components/forms'
import { useEditSettings } from 'features/users/hooks/useEditSettings'
import { authHandler } from 'features/authorization/services'
import { OutlinedButton, PrimaryButton } from 'shared/components/common/buttons'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { type LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  type QueryDefinition
} from '@reduxjs/toolkit/dist/query'
import { type User } from 'features/users/type'

interface EditSettingsProps {
  getUser: LazyQueryTrigger<
    QueryDefinition<string, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>, never, User, 'api'>
  >
  userId: string
}
export const EditSettings: FC<EditSettingsProps & BoxProps> = ({ getUser, userId, ...props }) => {
  const { formik, isLoading, isSuccess, countries, error } = useEditSettings()
  const [parent] = useAutoAnimate({ duration: 200 })
  const [showEditSettings, setShowEditSettings] = useState(false)

  const toggleShowForm = () => {
    setShowEditSettings(prev => !prev)
  }
  useEffect(() => {
    if (isSuccess) {
      closeForm()
      ;(async () => {
        await getUser(userId)
      })()
    }
  }, [isSuccess])

  const closeForm = () => {
    setShowEditSettings(false)
  }
  const serverError = authHandler(error)
  return (
    <>
      <OutlinedButton fullWidth sx={{ my: 2 }} onClick={toggleShowForm}>
        Edit profile
      </OutlinedButton>
      <div ref={parent}>
        {showEditSettings && (
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            {...props}
            display="flex"
            flexDirection="column"
            gap={1}
          >
            <ValidatedInput
              fullWidth
              disabled={isLoading}
              autoComplete="new-password"
              name="username"
              label="Username"
              size="small"
              value={formik.values.username}
              onChange={formik.handleChange}
              errorText={formik.errors.username || serverError?.username}
            />
            <CountryAutocompleteInput
              disabled={isLoading}
              items={countries}
              setFieldValue={formik.setFieldValue}
              onBlur={formik.handleBlur}
              errorText={formik.errors.country}
            />
            <Stack direction="row" alignItems="center" width="100%" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Subscribe to the newsletter?
              </Typography>
              <Checkbox
                id="mail_subscribe"
                name="mail_subscribe"
                checked={formik.values.mail_subscribe}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>

            <Stack direction="row" alignItems="center" gap={1}>
              <PrimaryButton type="submit" loading={isLoading}>
                Submit
              </PrimaryButton>
              <OutlinedButton onClick={closeForm} loading={isLoading}>
                Cancel
              </OutlinedButton>
            </Stack>
          </Box>
        )}
      </div>
    </>
  )
}
