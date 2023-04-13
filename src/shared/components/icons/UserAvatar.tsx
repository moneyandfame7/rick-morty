import React, { FC } from 'react'
import { Badge, BadgeProps, IconButton, type IconButtonProps, styled, Tooltip } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'

import { useAppSelector } from '@application/store'

import { selectFavoriteAmount } from '@features/characters/services'

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: -1,
    top: 5
  }
}))
export const UserAvatar: FC<IconButtonProps> = ({ ...props }) => {
  const countOfFavorites = useAppSelector(selectFavoriteAmount)
  return (
    <Tooltip title="You">
      <IconButton {...props}>
        <StyledBadge color="primary" variant="dot" invisible={!countOfFavorites}>
          <PersonOutlineOutlinedIcon sx={{ color: 'primary.light' }} />
        </StyledBadge>
      </IconButton>
    </Tooltip>
  )
}
