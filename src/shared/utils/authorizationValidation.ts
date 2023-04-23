import * as yup from 'yup'

import type { AuthCredentials, ResetPasswordDetails, SignupCredentials } from 'features/authorization/type'
import type { CreateCharacter } from 'features/characters/type'
import type { ForgotCredentials, UpdatePassword, UserWelcomeDetails } from 'features/users/type'

type ObjectShapeValues = yup.ObjectShape extends Record<string, infer V> ? V : never
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Shape<T extends Record<any, any>> = Partial<Record<keyof T, ObjectShapeValues>>

type AuthSchema = Shape<AuthCredentials>
type SignupSchema = Shape<SignupCredentials>
type WelcomeSchema = Shape<UserWelcomeDetails>
type ForgotSchema = Shape<ForgotCredentials>
type ResetSchema = Shape<ResetPasswordDetails>
type CreateCharacterSchema = Shape<CreateCharacter>
type UpdatePasswordSchema = Shape<UpdatePassword>

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

export const createCharacterSchema = yup.object<CreateCharacterSchema>({
  name: yup.string().required('Enter a name'),
  type: yup.string().required('Enter a type'),
  status: yup.string().required('Enter a type').oneOf(['Alive', 'Dead', 'unknown']),
  gender: yup.string().required('Enter a gender').oneOf(['Female', 'Male', 'Genderless', 'unknown']),
  species: yup.string().required('Enter a species'),
  image: yup.mixed().nullable().required('A file is required')
})
