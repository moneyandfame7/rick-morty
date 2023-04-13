import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'

import type { AuthCredentials } from '@features/authorization/type'
import { useLoginMutation } from '@features/authorization/services'

import { loginValidationSchema } from '@shared/utils'
import { HOME_ROUTE } from '@shared/routes'
import { useActions } from '@shared/hooks/useActions'

export const useLogin = () => {
  const navigate = useNavigate()

  const [login, { isSuccess, isLoading, error }] = useLoginMutation()
  const { setUser } = useActions()

  const onSubmit = async (credentials: AuthCredentials) => {
    const info = await login(credentials)
    if ('data' in info) {
      setUser(info.data.user)
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
