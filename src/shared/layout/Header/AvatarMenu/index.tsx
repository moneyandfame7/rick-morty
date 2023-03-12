import React, { FC, useState } from 'react'
import { Avatar, Box, BoxProps, Divider, IconButton, LinearProgress, Menu, Typography } from '@mui/material'

import { useAppSelector } from 'application/store'

import { selectCurrentUser } from 'features/users/services'
import { useVerificationSendMutation } from 'features/authorization/services'

import { UserAvatar } from 'shared/components/UserAvatar'
import { useGetUserMenu } from 'shared/hooks'
import { useLogout } from 'features/authorization/hooks'
import { Backdrop } from 'shared/components/Backdrop'
import { width } from '@mui/system'

interface AvatarMenuProps {
  isWelcomePage?: boolean
}

export const AvatarMenu: FC<AvatarMenuProps & BoxProps> = ({ isWelcomePage = false }) => {
  const [resendVerification, { isLoading: isVerificationLoading, isSuccess }] = useVerificationSendMutation()
  const { logout, isLoading: isLogoutLoading } = useLogout()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }
  const handleClickSend = async () => {
    await resendVerification()
    console.log('Send verification message', isVerificationLoading, isSuccess)
  }
  const currentUser = useAppSelector(selectCurrentUser)

  const currentMenu = useGetUserMenu({ isWelcomePage, logout, handleCloseMenu })
  return (
    <Box component='div'>
      {isLogoutLoading && <Backdrop />}
      <UserAvatar onClick={handleClick} user={currentUser} sx={{ width: 30, height: 30 }} />
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
        sx={{
          top: { xs: 0, md: 20 }
        }}
      >
        <Box
          component='div'
          sx={{
            display: 'flex',
            gap: 5,
            width: 300,
            mb: 2
          }}
        >
          <Avatar src={currentUser ? (currentUser.photo ? currentUser.photo : '') : ''} />
          <div>
            <Typography variant='body1'>{currentUser?.username}</Typography>
            <Typography variant='body2' sx={{ opacity: 0.8 }}>
              {currentUser?.email}
            </Typography>
          </div>
        </Box>
        <Divider sx={{ mb: 2 }} />

        {currentMenu}
      </Menu>
    </Box>
  )
}
