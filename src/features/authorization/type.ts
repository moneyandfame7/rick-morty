import type { User } from 'features/users/type'

export interface AuthCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  email: string
  password: string
  confirmPassword: string
}

export interface ResetPasswordDetails {
  password: string
  confirmPassword: string
}

export interface UserRole {
  id: number
  value: string
}

export interface AuthResponse {
  refresh_token: string
  access_token: string
  user: User
}

export interface Token {
  id: number
  user_id: string
  refresh_token: string
}
