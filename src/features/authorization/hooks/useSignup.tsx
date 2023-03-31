import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'

import { useAppDispatch } from 'application/store'

import type { AuthCredentials, SignupCredentials } from 'features/authorization/type'
import { useSignupMutation } from 'features/authorization/services'
import { setUser } from 'features/users/services'

import { signupValidationSchema } from 'shared/utils'
import { WELCOME_ROUTE } from '../routes'

export const useSignup = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [signup, { isSuccess, isLoading, error, isError }] = useSignupMutation()

  const onSubmit = async (values: AuthCredentials) => {
    console.log(values)
    const info = await signup(values)

    if ('data' in info) {
      dispatch(setUser(info.data.user))

      return
    }
  }

  const formik = useFormik<SignupCredentials>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: signupValidationSchema,
    onSubmit
  })

  return { formik, isLoading, isSuccess, error, isError }
}
