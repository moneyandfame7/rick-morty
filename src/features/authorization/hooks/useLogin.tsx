import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'

import { useAppDispatch } from 'application/store'

import { type IAuthCredentials } from 'features/authorization/type'
import { useLoginMutation } from 'features/authorization/services'

import { setUser } from 'features/users/services'

import { loginValidationSchema } from 'shared/utils'

export const useLogin = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [login, { isSuccess, isLoading }] = useLoginMutation()

  const onSubmit = async (values: IAuthCredentials) => {
    const info = await login(values)
    if ('data' in info) {
      dispatch(setUser(info.data.user))

      return
    }
    console.log(info.error)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validateOnBlur: true,
    validationSchema: loginValidationSchema,
    onSubmit
  })
  useEffect(() => {
    if (isSuccess) {
      navigate('/')
    }
  }, [isSuccess])

  return { formik, isLoading, isSuccess }
}
