import { AuthCredentials, SignupCredentials } from 'features/authorization/type'
import { UserWelcomeDetails } from 'features/users/type'
import * as yup from 'yup'

type ObjectShapeValues = yup.ObjectShape extends Record<string, infer V> ? V : never
type Shape<T extends Record<any, any>> = Partial<Record<keyof T, ObjectShapeValues>>

type AuthSchema = Shape<AuthCredentials>
type SignupSchema = Shape<SignupCredentials>
type WelcomeSchema = Shape<UserWelcomeDetails>

export const signupValidationSchema = yup.object<SignupSchema>({
  email: yup.string().email('Enter a valid email address').required('Enter an email address'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password must be no more than 20 characters long')
    .required('Enter a password'),
  confirmPassword: yup
    .string()
    .required('Passwords didn’t match.')
    .oneOf([yup.ref('password')], 'Passwords didn’t match.')
})

export const loginValidationSchema = yup.object<AuthSchema>({
  email: yup.string().email('Enter a valid email address').required('Enter an email'),
  password: yup.string().required('Enter a password')
})

export const welcomeValidationSchema = yup.object<WelcomeSchema>({
  username: yup
    .string()
    .matches(
      /^[a-zA-Z0-9]+[a-zA-Z0-9]*[a-zA-Z0-9]$/,
      'Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed.'
    )
    .min(6, 'Sorry, your username must be between 6 and 30 characters long.')
    .max(30, 'Sorry, your username must be between 6 and 30 characters long.')
    .required('Enter an username'),
  country: yup.string().required('Please select a country'),
  mail_subscribe: yup.boolean().notRequired()
})
