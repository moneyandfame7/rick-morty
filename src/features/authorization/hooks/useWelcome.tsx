import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import countryList from 'react-select-country-list'
import { useFormik } from 'formik'

import { useWelcomeMutation } from 'features/authorization/services'
import { UserWelcomeDetails } from 'features/users/type'
import { setUser } from 'features/users/services'

import { welcomeValidationSchema } from 'shared/utils'
import { CountryData } from '../type'

export const useWelcome = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const countries: CountryData[] = useMemo(() => countryList().getData(), [])
  const [welcome, { isSuccess, isLoading, error }] = useWelcomeMutation()

  const onSubmit = async (details: UserWelcomeDetails) => {
    const info = await welcome(details)
    if ('data' in info) {
      dispatch(setUser(info.data.user))
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
