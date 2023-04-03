import React, { FC } from 'react'
import { Badge, BadgeProps, IconButton, IconButtonProps, styled, Tooltip } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'

import { useAppSelector } from 'application/store'

import type { User } from 'features/users/type'
import { selectFavoriteAmount } from 'features/characters/services'

interface UserAvatarProps extends IconButtonProps {
  user: User | null
}
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -1,
    top: 5
  }
}))
export const UserAvatar: FC<UserAvatarProps> = ({ user, sx, ...props }) => {
  const countOfFavorites = useAppSelector(selectFavoriteAmount)
  return (
    <Tooltip title="You">
      <IconButton sx={{ ...sx, borderRadius: '4px' }} onClick={props.onClick}>
        <StyledBadge color="primary" variant="dot" invisible={!countOfFavorites}>
          <PersonOutlineOutlinedIcon sx={{ color: 'primary.light' }} />
        </StyledBadge>
      </IconButton>
    </Tooltip>
  )
}
