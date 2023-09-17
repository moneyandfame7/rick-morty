import React, { type FC, useState } from 'react'
import { Avatar, Box, type BoxProps, Divider, Menu, Typography } from '@mui/material'

import { useAppSelector } from 'application/store'

import { useLogout } from 'features/authorization/hooks'
import { selectCurrentUser } from 'features/users/services'

import { UserAvatar } from 'shared/components/icons'
import { BackdropLoader } from 'shared/components/common'
import { UnverifiedAlert } from './UnverifiedAlert'
import { useGetUserMenu } from './utils/useGetUserMenu'

export const UserMenu: FC<BoxProps> = () => {
  const { makeLogout, isLoading: isLogoutLoading } = useLogout()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const user = useAppSelector(selectCurrentUser)
  const currentMenu = useGetUserMenu({ makeLogout, handleCloseMenu })
  return (
    <Box component="div">
      {isLogoutLoading && <BackdropLoader />}
      <UserAvatar onClick={handleClick} sx={{ width: 30, height: 30 }} />
      <Menu
        PaperProps={{
          sx: {
            borderRadius: '8px',
            p: '10px 20px'
          }
        }}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        open={open}
      >
        <Box
          component="div"
          sx={{
            display: 'flex',
            gap: 3,
            width: 300,
            mb: 2
          }}
        >
          <Avatar src={user?.photo ?? ''} />
          <div>
            <Typography variant="body1">{user?.username}</Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {user?.email}
            </Typography>
          </div>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {!user?.is_verified && <UnverifiedAlert />}
        {currentMenu}
      </Menu>
    </Box>
  )
}
