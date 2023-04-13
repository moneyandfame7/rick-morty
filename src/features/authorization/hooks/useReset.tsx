import { useSearchParams } from 'react-router-dom'
import { useFormik } from 'formik'

import type { ResetPasswordDetails } from '@features/authorization/type'
import { useResetMutation } from '@features/authorization/services'

import { resetValidationSchema } from '@shared/utils'
import { useActions } from '@shared/hooks/useActions'

export const useReset = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const token = searchParams.get('token')

  const { setUser } = useActions()
  const [reset, { isLoading, error, isSuccess }] = useResetMutation()
  const onSubmit = async (body: ResetPasswordDetails) => {
    if (!id || !token) {
      throw new Error('pizda')
    }
    const info = await reset({
      body,
      query: {
        id,
        token
      }
    })
    if ('data' in info) {
      setUser(info.data.user)
      return
    }
  }

  const formik = useFormik<ResetPasswordDetails>({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: resetValidationSchema,
    onSubmit
  })

  return { formik, isLoading, error, isSuccess }
}
