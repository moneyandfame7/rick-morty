import { IUser } from '../users/type'

export interface IAuthCredentials {
  email: string
  password: string
}

export interface IRole {
  id: number
  value: string
}

export interface IAuthResponse {
  refresh_token: string
  access_token: string
  user: IUser
}

export interface IToken {
  id: number
  user_id: string
  refresh_token: string
}
