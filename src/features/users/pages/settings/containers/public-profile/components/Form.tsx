import React, { type FC, useCallback } from 'react'

import { Grid, Box } from '@mui/material'

import { useAppSelector } from 'application/store'

import { authHandler } from 'features/authorization/services'
import { useEditSettings } from 'features/users/hooks'
import { selectCurrentUser } from 'features/users/services'

import { PrimaryButton } from 'shared/components/common/buttons'
import { ValidatedInput, CountryAutocompleteInput } from 'shared/components/forms'

// TODO: спитати за useCallback, useMemo, чи правильно розумію їх використання ( знаю, що тут вони не дуже потрібні )
// показати на бекенді прєкол з new Date()
export const Form: FC = () => {
  const { formik, isLoading, isSuccess, countries, error, getDefaultCountry } = useEditSettings()

  const serverError = authHandler(error)
  const currentUser = useAppSelector(selectCurrentUser)

  if (!currentUser) {
    return null
  }

  const isValuesDifferent = useCallback(() => {
    const isFieldsEquals = Object.keys(formik.values).map(
      key => currentUser[key as never] === formik.values[key as never]
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
      <Box width={200}>
        <CountryAutocompleteInput
          defaultValue={getDefaultCountry(currentUser)}
          disabled={isLoading}
          items={countries}
          setFieldValue={formik.setFieldValue}
          onBlur={formik.handleBlur}
          errorText={formik.errors.country}
        />
      </Box>
      <PrimaryButton disabled={!isValuesDifferent()} sx={{ width: 'max-content' }}>
        Update profile
      </PrimaryButton>
    </Grid>
  )
}
