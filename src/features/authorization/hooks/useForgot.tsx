import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'

import { useForgotMutation } from 'features/authorization/services'
import { LOGIN_ROUTE } from 'features/authorization/routes'
import { ForgotCredentials } from 'features/users/type'

import { forgotValidationSchema } from 'shared/utils'

export const useForgot = () => {
  const navigate = useNavigate()

  const [sendLink, { isLoading, isSuccess, error }] = useForgotMutation()

  const onSubmit = async (credentials: ForgotCredentials) => {
    await sendLink(credentials)
  }

  const onClickBack = () => {
    navigate({ pathname: LOGIN_ROUTE.path })
  }
  const formik = useFormik<ForgotCredentials>({
    initialValues: {
      email: ''
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: forgotValidationSchema,
    onSubmit
  })

  return { formik, isLoading, error, onClickBack, isSuccess, sendLink }
}
