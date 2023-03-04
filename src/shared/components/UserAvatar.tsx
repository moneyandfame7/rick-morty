import React, { FC } from 'react'
import type { IUser } from 'features/users/type'
import { Avatar, AvatarProps } from '@mui/material'

interface UserAvatarProps extends AvatarProps {
  user: IUser | null
}

const defaultAvatar = 'https://i0.wp.com/dashboard.browse.ai/assets/default-avatar-96x96.png?ssl=1'

export const UserAvatar: FC<UserAvatarProps> = ({ user, sx }) => {
  return user?.photo ? (
    <Avatar alt={user.username ?? 'User avatar'} src={user.photo} sx={sx} />
  ) : (
    <Avatar alt={user?.username ?? 'User avatar'} src={defaultAvatar} sx={sx} />
  )
}
