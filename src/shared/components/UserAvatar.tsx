import React, { FC } from 'react'
import type { User } from 'features/users/type'
import { Avatar, AvatarProps, Tooltip } from '@mui/material'

interface UserAvatarProps extends AvatarProps {
  user: User | null
}

// const defaultAvatar = 'https://i0.wp.com/dashboard.browse.ai/assets/default-avatar-96x96.png?ssl=1'

export const UserAvatar: FC<UserAvatarProps> = ({ user, sx }) => {
  const withFirstLetter = (firstLetter: string) => (
    <Tooltip title='You'>
      <Avatar color='primary' sx={sx}>
        {firstLetter}
      </Avatar>
    </Tooltip>
  )
  const withPhoto = (photo: string) => (
    <Tooltip title='You'>
      <Avatar alt={'User avatar'} src={photo} sx={sx} variant='rounded' />
    </Tooltip>
  )

  const defaultAvatar = () => (
    <Tooltip title='You'>
      <Avatar alt={'User avatar'} sx={sx} variant='rounded' />
    </Tooltip>
  )

  if (user?.username && !user.photo) {
    return withFirstLetter(user?.username[0].toUpperCase())
  } else if (user?.photo) {
    return withPhoto(user?.photo)
  } else {
    return defaultAvatar()
  }
}
