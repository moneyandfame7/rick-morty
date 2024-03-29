import type { User } from 'features/users/type'

export interface UserStatistics {
  authStats: Array<{
    auth_type: string
    count: string
  }>
  userCount: number
  verifiedStats: Array<{
    verified: boolean
    count: string
  }>
  resentUsers: User[]
}

export interface RecentUsers {
  id: string
  created_at: Date
  username: string
  country: string
  role: string
  is_verified: boolean
  photo?: string
}
