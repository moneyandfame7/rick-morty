import { useUpdatePasswordMutation } from 'features/users/services'
import type { UpdatePassword } from 'features/users/type'
import { useFormik } from 'formik'
import { useActions } from 'shared/hooks'
import { updatePasswordSchema } from 'shared/utils'

export const useUpdatePassword = () => {
  const [update, { isLoading, isSuccess, error }] = useUpdatePasswordMutation()
  const { updateUser } = useActions()

  const onSubmit = async (values: UpdatePassword) => {
    const info = await update(values)
    if ('data' in info) {
      updateUser(info.data)
    }
  }

  const formik = useFormik<UpdatePassword>({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: updatePasswordSchema,
    onSubmit
  })

  return { formik, isLoading, isSuccess, error }
}
