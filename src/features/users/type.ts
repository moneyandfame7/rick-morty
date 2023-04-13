import type { UserRole } from '@features/authorization/type'

export interface User {
  readonly id: string
  readonly email: string
  readonly username: string | null
  readonly auth_type: string
  readonly banned: boolean
  readonly role: UserRole
  readonly country: string | null
  readonly photo: string | null
  readonly is_verified: boolean
  readonly mail_subscribe: boolean | null
}

export interface UserWelcomeDetails {
  username: string
  country: string
  mail_subscribe: boolean
}

export interface ForgotCredentials {
  email: string
}

export interface ResetPasswordParams {
  body: {
    password: string
    confirmPassword: string
  }
  query: {
    id: string
    token: string
  }
}

export interface UserCurrentCountry {
  country_code: string
  country_name: string
}

export type UserPublicProfile = Omit<User, 'mail_subscribe' | 'auth_type' | 'role'>
