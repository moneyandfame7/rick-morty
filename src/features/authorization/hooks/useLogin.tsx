import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'

import { useAppDispatch } from 'application/store'

import type { AuthCredentials } from 'features/authorization/type'
import { useLoginMutation } from 'features/authorization/services'

import { setUser } from 'features/users/services'

import { loginValidationSchema } from 'shared/utils'
import { HOME_ROUTE } from 'shared/routes'
import { toast } from 'react-toastify'

export const useLogin = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [login, { isSuccess, isLoading, error }] = useLoginMutation()
  const onSubmit = async (credentials: AuthCredentials) => {
    const info = await login(credentials)
    if ('data' in info) {
      console.log(info.data.user)

      dispatch(setUser(info.data.user))
      return
    }
  }

  const formik = useFormik<AuthCredentials>({
    initialValues: {
      email: '',
      password: ''
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: loginValidationSchema,
    onSubmit
  })

  useEffect(() => {
    if (isSuccess) {
      navigate({ pathname: HOME_ROUTE.path })
    }
  }, [isSuccess])

  return { formik, isLoading, isSuccess, error }
}
