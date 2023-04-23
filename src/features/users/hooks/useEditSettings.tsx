import { useMemo } from 'react'
import countryList from 'react-select-country-list'

import { useFormik } from 'formik'
import _ from 'lodash'

import { useAppSelector } from 'application/store'

import { selectCurrentUser, useEditSettingsMutation } from 'features/users/services'
import type { User, EditSettings } from 'features/users/type'
import { useVerificationSendMutation } from 'features/authorization/services'

import type { CountryData } from 'shared/components/forms'

import { useActions } from 'shared/hooks'
import type { ValidationSchemaType } from 'shared/validations/type'

export const useEditSettings = <T,>(initialValues: EditSettings, validationSchema?: ValidationSchemaType<T>) => {
  const [update, { isLoading, error, isSuccess }] = useEditSettingsMutation()
  useVerificationSendMutation()

  const countries: CountryData[] = useMemo(() => countryList().getData(), [])
  const { updateUser } = useActions()
  const currentUser = useAppSelector(selectCurrentUser)

  if (!currentUser) {
    throw new Error('unauthorized')
  }
  const onSubmit = async (values: EditSettings) => {
    const unique: EditSettings = _.pickBy(values, (value, key) => {
      return !_.isEqual(value, currentUser[key as keyof User])
    })

    if ('email' in unique) {
      unique.is_verified = false
    }

    const info = await update(unique)

    if ('data' in info) {
      updateUser(info.data)
      return
    }
  }

  const formik = useFormik<EditSettings>({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit
  })
  return {
    countries,
    formik,
    isLoading: isLoading,
    error,
    isSuccess,
    update
  }
}
