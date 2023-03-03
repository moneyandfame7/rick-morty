import { IRole } from '../authorization/type'

export interface IUser {
  readonly id: string
  readonly email: string
  readonly username: string | null
  readonly auth_type: string
  readonly banned: boolean
  readonly role: IRole
  readonly country: string | null
  readonly photo: string | null
  readonly mail_subscribe: boolean | null
}

export type IUserProfile = Omit<IUser, 'mail_subscribe' | 'auth_type' | 'role'>
