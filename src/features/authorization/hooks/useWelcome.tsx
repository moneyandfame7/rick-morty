import { useMemo } from 'react'
import countryList from 'react-select-country-list'
import { useFormik } from 'formik'

import { useWelcomeMutation } from 'features/authorization/services'
import { UserWelcomeDetails } from 'features/users/type'

import { welcomeValidationSchema } from 'shared/utils'
import { CountryData } from 'shared/components/forms'
import { useActions } from 'shared/hooks/useActions'

export const useWelcome = () => {
  const countries: CountryData[] = useMemo(() => countryList().getData(), [])
  const [welcome, { isSuccess, isLoading, error }] = useWelcomeMutation()
  const { setUser } = useActions()

  const onSubmit = async (details: UserWelcomeDetails) => {
    const info = await welcome(details)
    if ('data' in info) {
      setUser(info.data.user)
      return
    }
  }

  const formik = useFormik<UserWelcomeDetails>({
    initialValues: {
      username: '',
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
