import { useMemo } from 'react'
import countryList from 'react-select-country-list'

import { useFormik } from 'formik'

import { useAppSelector } from 'application/store'

import { selectCurrentUser, useEditSettingsMutation } from 'features/users/services'
import type { User, EditSettings } from 'features/users/type'

import type { CountryData } from 'shared/components/forms'

import { useActions } from 'shared/hooks'

export const useEditSettings = () => {
  const [update, { isLoading, error, isSuccess }] = useEditSettingsMutation()
  const countries: CountryData[] = useMemo(() => countryList().getData(), [])
  const { updateUser } = useActions()
  const currentUser = useAppSelector(selectCurrentUser)
  const getDefaultCountry = (user: User | null) => {
    if (user && user.country) {
      return {
        value: user.country,
        label: countryList().getLabel(user.country)
      }
    }
  }
  if (!currentUser) {
    throw new Error('User not authorized')
  }

  const onSubmit = async (updated: EditSettings) => {
    const info = await update(updated)
    if ('data' in info) {
      updateUser(info.data)
      return
    }
  }

  const formik = useFormik<EditSettings>({
    initialValues: {
      username: currentUser.username,
      country: currentUser.country
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit
  })
  return { countries, formik, isLoading, error, isSuccess, update, getDefaultCountry }
}
