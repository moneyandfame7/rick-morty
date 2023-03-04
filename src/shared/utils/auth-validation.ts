import { AuthCredentials } from 'features/authorization/type'
import { UserWelcomeDetails } from 'features/users/type'
import * as yup from 'yup'

type ObjectShapeValues = yup.ObjectShape extends Record<string, infer V> ? V : never
type Shape<T extends Record<any, any>> = Partial<Record<keyof T, ObjectShapeValues>>

type AuthSchema = Shape<AuthCredentials>
type WelcomeSchema = Shape<UserWelcomeDetails>

export const signupValidationSchema = yup.object<AuthSchema>({
  email: yup.string().email('Please enter a valid email address').required('Please enter a email address'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password must be no more than 20 characters long')
    .required('Please enter a password')
})

export const loginValidationSchema = yup.object<AuthSchema>({
  email: yup.string().email('Please enter a valid email address').required('Please enter a email address'),
  password: yup.string().required('Please enter a password')
})

export const welcomeValidationSchema = yup.object<WelcomeSchema>({
  username: yup
    .string()
    .min(8, 'Username must be at least 8 characters long')
    .max(32, 'Username must be no more than 32 characters long')
    .required('Please enter a username'),
  country: yup.string().required('Please select a country'),
  mail_subscribe: yup.boolean().notRequired()
})
