import React, { FC } from 'react'
import type { User } from 'features/users/type'
import { Avatar, AvatarProps } from "@mui/material";

interface UserAvatarProps extends AvatarProps {
  user: User | null
}

// const defaultAvatar = 'https://i0.wp.com/dashboard.browse.ai/assets/default-avatar-96x96.png?ssl=1'

export const UserAvatar: FC<UserAvatarProps> = ({ user, sx }) => {
  if (user?.username && !user.photo) {
    return (
      <Avatar color='primary' variant="rounded" sx={sx}>
        {user.username[0].toUpperCase()}
      </Avatar>
    )
  } else if (user?.photo) {
    return <Avatar alt={'User avatar'} src={user.photo} sx={sx} variant='rounded' />
  } else {
    return <Avatar color='primary' variant='rounded' />
  }

  // return <Avatar color='primary' variant='soft' alt='Aboba ' />
}
