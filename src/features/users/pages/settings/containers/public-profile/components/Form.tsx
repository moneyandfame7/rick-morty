import React, { type FC, useCallback, useEffect } from 'react'

import { Grid, Box } from '@mui/material'

import { useAppSelector } from 'application/store'

import { type User } from 'features/users/type'
import { authHandler } from 'features/authorization/services'
import { useEditSettings } from 'features/users/hooks'
import { selectCurrentUser } from 'features/users/services'

import { PrimaryButton } from 'shared/components/common/buttons'
import { ValidatedInput, CountryAutocompleteInput } from 'shared/components/forms'
import { useSnackbar } from 'shared/components'
import { getUserCountry } from 'shared/utils/getUserCountry'

// TODO: спитати за useCallback, useMemo, чи правильно розумію їх використання ( знаю, що тут вони не дуже потрібні )
// показати на бекенді прєкол з new Date()
export const Form: FC = () => {
  const { formik, isLoading, isSuccess, countries, error, getDefaultCountry } = useEditSettings()
  const { Snackbar, setSnackbar } = useSnackbar()
  const currentUser = useAppSelector(selectCurrentUser)

  const serverError = authHandler(error)

  if (!currentUser) {
    return null
  }

  useEffect(() => {
    if (isSuccess) {
      setSnackbar({ children: 'Profile updated successfully', severity: 'success' })
    }
  }, [isSuccess])
  const isValuesDifferent = useCallback(() => {
    const isFieldsEquals = Object.keys(formik.values).map(
      key => currentUser[key as keyof User] === formik.values[key as keyof User]
    )
    return isFieldsEquals.includes(false)
  }, [formik.values, currentUser])

  return (
    <Grid
      item
      xs={12}
      md={6.5}
      component="form"
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{ order: { xs: 2, md: 1 } }}
      onSubmit={formik.handleSubmit}
    >
      <ValidatedInput
        fullWidth
        name="username"
        label="Username"
        variant="outlined"
        value={formik.values.username}
        errorText={formik.errors.username || serverError?.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={isLoading}
        size="small"
        helperText="You can use letters, numbers & periods"
      />
      <Box sx={{ maxWidth: { xs: '100%', lg: '200px' } }}>
        <CountryAutocompleteInput
          value={getUserCountry(formik.values.country)}
          onChange={(e, country) => {
            formik.setFieldValue('country', country?.value)
          }}
          disabled={isLoading}
          items={countries}
          errorText={formik.errors.country}
        />
      </Box>
      <PrimaryButton type="submit" disabled={!isValuesDifferent()} sx={{ width: 'max-content' }}>
        Update profile
      </PrimaryButton>
      <Snackbar />
    </Grid>
  )
}
