import type { UserRole } from 'features/authorization/type'

export interface User {
  readonly id: string
  readonly email: string
  readonly username?: string
  readonly auth_type: string
  readonly password: string
  readonly banned: boolean
  readonly role: UserRole
  readonly country?: string
  readonly photo?: string
  is_verified: boolean
  readonly mail_subscribe?: boolean
  readonly created_at: Date
}

export interface UpdateUser {
  id: string
  updated: Partial<User>
}

export type EditSettings = Partial<User>

export interface UserWelcomeDetails {
  username: string
  country: string
  mail_subscribe: boolean
}

export interface ForgotCredentials {
  email: string
}

export interface UpdatePassword {
  oldPassword: string
  newPassword: string
  confirmPassword: string
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

export interface GetManyUsers {
  readonly users: User[]

  readonly count: number
}

export type UserPublicProfile = Omit<User, 'mail_subscribe' | 'auth_type' | 'role'>
