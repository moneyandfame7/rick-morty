import * as yup from 'yup'

import type { AuthSchema, ForgotSchema, ResetSchema, SignupSchema, WelcomeSchema } from './type'

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

export const forgotValidationSchema = yup.object<ForgotSchema>({
  email: yup.string().email('Enter a valid email address').required('Enter an email')
})

export const resetValidationSchema = yup.object<ResetSchema>({
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

export const welcomeValidationSchema = yup.object<WelcomeSchema>({
  username: yup
    .string()
    .min(3, 'Sorry, your username must be between 3 and 50 characters long.')
    .max(50, 'Sorry, your username must be between 3 and 50 characters long.')
    .required('Enter an username'),
  country: yup.string().required('Please select a country'),
  mail_subscribe: yup.boolean().notRequired()
})
