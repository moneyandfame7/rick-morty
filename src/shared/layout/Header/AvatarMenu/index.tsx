import React, { FC, useState } from 'react'
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Zoom
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { useAppSelector } from 'application/store'

import { selectCurrentUser } from 'features/users/services'

import { UserAvatar } from 'shared/components/UserAvatar'
import { useGetUserMenu } from 'shared/hooks/useGetUserMenu'

interface AvatarMenuProps {
  isWelcomePage?: boolean
}

export const AvatarMenu: FC<AvatarMenuProps> = ({ isWelcomePage = false }) => {
  const currentUser = useAppSelector(selectCurrentUser)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const currentMenu = useGetUserMenu(isWelcomePage, handleCloseUserMenu)

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title='You' arrow TransitionComponent={Zoom}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <UserAvatar user={currentUser} sx={{ width: 28, height: 28 }} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Box
          sx={{
            p: '15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <UserAvatar user={currentUser} sx={{ width: 50, height: 50 }} />

          <Box sx={{ mt: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {currentUser?.username && (
              <Typography sx={{ fontWeight: 500, fontSize: 14, color: grey[600] }}>{currentUser.username}</Typography>
            )}
            <Typography sx={{ fontWeight: 500, fontSize: 12, color: grey[600] }}>{currentUser?.email}</Typography>
          </Box>
        </Box>
        <Divider color={grey[300]} />
        {currentMenu}
      </Menu>
    </Box>
  )
}
