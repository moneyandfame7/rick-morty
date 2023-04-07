import { useFormik } from 'formik'

import type { AuthCredentials, SignupCredentials } from 'features/authorization/type'
import { useSignupMutation } from 'features/authorization/services'

import { signupValidationSchema } from 'shared/utils'
import { useActions } from 'shared/hooks/useActions'

export const useSignup = () => {
  const { setUser } = useActions()

  const [signup, { isSuccess, isLoading, error, isError }] = useSignupMutation()

  const onSubmit = async (values: AuthCredentials) => {
    const info = await signup(values)

    if ('data' in info) {
      setUser(info.data.user)

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
