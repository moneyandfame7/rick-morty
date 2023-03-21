import React, { FC, useState } from 'react'
import { Alert, Avatar, Box, BoxProps, Divider, Menu, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import { useAppSelector } from 'application/store'

import { selectCurrentUser } from 'features/users/services'
import { useVerificationSendMutation } from 'features/authorization/services'

import { UserAvatar } from 'shared/components/UserAvatar'
import { useGetUserMenu } from 'shared/hooks'
import { useLogout } from 'features/authorization/hooks'
import { Backdrop } from 'shared/components/Backdrop'

interface AvatarMenuProps {
  isWelcomePage?: boolean
}

export const AvatarMenu: FC<AvatarMenuProps & BoxProps> = ({ isWelcomePage = false }) => {
  const [resendVerification, { isLoading: isVerificationLoading }] = useVerificationSendMutation()
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
            gap: 3,
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
        {/* {currentUser.} */}
        {!currentUser?.is_verified ? (
          <Alert severity='warning' sx={{ maxWidth: 300 }}>
            <Typography variant='h6' fontSize={14} fontWeight={600}>
              You haven't verified your email address yet.
            </Typography>
            <Typography variant='body2' fontWeight={500} sx={{ py: 1, opacity: 0.8 }}>
              Please click on the link we emailed you to verify your email.
            </Typography>
            <Typography variant='body2' fontWeight={500} sx={{ opacity: 0.8 }}>
              Did not receive the email?
            </Typography>
            <LoadingButton
              loading={isVerificationLoading}
              loadingPosition='start'
              variant='contained'
              color='success'
              onClick={handleClickSend}
              sx={{ fontWeight: 600, mt: 1 }}
              startIcon={<SendIcon />}
              size='small'
            >
              Resend verification email
            </LoadingButton>
          </Alert>
        ) : null}

        {currentMenu}
      </Menu>
    </Box>
  )
}
