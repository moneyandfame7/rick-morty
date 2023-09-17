import * as yup from 'yup'
import type { EmailValidationSchema, UpdatePasswordSchema } from './type'

export const updatePasswordSchema = yup.object<UpdatePasswordSchema>({
  oldPassword: yup.string().required('Enter a password'),
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password must be no more than 20 characters long')
    .required('Enter a password'),
  confirmPassword: yup
    .string()
    .required('Passwords didn’t match.')
    .oneOf([yup.ref('newPassword')], 'Passwords didn’t match.')
})

export const emailValidationSchema = yup.object<EmailValidationSchema>({
  email: yup.string().email('Enter a valid email address').required('Enter an email')
})
