import { useMemo } from 'react'
import countryList from 'react-select-country-list'
import { useFormik } from 'formik'

import { useAppSelector } from 'application/store'

import { useWelcomeMutation } from 'features/authorization/services'
import type { UserWelcomeDetails } from 'features/users/type'
import { selectCurrentUser } from 'features/users/services'

import { type CountryData } from 'shared/components/forms'
import { useActions } from 'shared/hooks/useActions'
import { welcomeValidationSchema } from 'shared/validations/authorization'

export const useWelcome = () => {
  const user = useAppSelector(selectCurrentUser)
  const countries: CountryData[] = useMemo(() => countryList().getData(), [])
  const [welcome, { isSuccess, isLoading, error }] = useWelcomeMutation()
  const { updateUser } = useActions()

  const onSubmit = async (details: UserWelcomeDetails) => {
    const info = await welcome(details)
    if ('data' in info) {
      updateUser(info.data.user)
      return
    }
  }

  const formik = useFormik<UserWelcomeDetails>({
    initialValues: {
      username: user?.username ?? '',
      country: '',
      mail_subscribe: false
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: welcomeValidationSchema,
    onSubmit
  })

  return { countries, formik, isLoading, error, isSuccess }
}
