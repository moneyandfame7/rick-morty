import type * as yup from 'yup'

import type { AuthCredentials, ResetPasswordDetails, SignupCredentials } from 'features/authorization/type'
import type { ForgotCredentials, UpdatePassword, User, UserWelcomeDetails } from 'features/users/type'
import type { CreateCharacter } from 'features/characters/type'

type ObjectShapeValues = yup.ObjectShape extends Record<string, infer V> ? V : never
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Shape<T extends Record<any, any>> = Partial<Record<keyof T, ObjectShapeValues>>
export type ValidationSchemaType<T> = yup.ObjectSchema<
  object,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Partial<Record<keyof T, yup.ISchema<any, any, any, any> | any>>,
  object,
  ''
>
export type AuthSchema = Shape<AuthCredentials>
export type SignupSchema = Shape<SignupCredentials>
export type WelcomeSchema = Shape<UserWelcomeDetails>
export type ForgotSchema = Shape<ForgotCredentials>
export type ResetSchema = Shape<ResetPasswordDetails>

export type CreateCharacterSchema = Shape<CreateCharacter>

export type UpdatePasswordSchema = Shape<UpdatePassword>
export type EmailValidationSchema = Shape<Pick<User, 'email'>>
