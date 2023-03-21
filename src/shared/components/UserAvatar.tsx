import React, { FC } from 'react'
import { IconButton, IconButtonProps, Tooltip } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'

import type { User } from 'features/users/type'

interface UserAvatarProps extends IconButtonProps {
  user: User | null
}

export const UserAvatar: FC<UserAvatarProps> = ({ user, sx, ...props }) => {
  return (
    <Tooltip title='You'>
      <IconButton
        sx={{ ...sx, border: '1px solid', borderColor: 'primary.border', borderRadius: '4px' }}
        onClick={props.onClick}
      >
        {/* <Avatar sx={{ ...sx, bgcolor: 'primary.lighter', color: '#fff', fontSize: 16 }}>{firstLetter}</Avatar> */}
        <PersonOutlineOutlinedIcon sx={{ color: 'primary.lighter' }} />
      </IconButton>
    </Tooltip>
  )
}
