import React, { FC, useState } from 'react'
import { Alert, Avatar, Box, BoxProps, Divider, Menu, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'

import { useAppSelector } from 'application/store'

import { useVerificationSendMutation } from 'features/authorization/services'
import { useLogout } from 'features/authorization/hooks'
import { selectCurrentUser } from 'features/users/services'

import { UserAvatar } from 'shared/components/icons'
import { useGetUserMenu } from 'shared/hooks'
import { BackdropLoader } from 'shared/components/common'

export const UserMenu: FC<BoxProps> = () => {
  const [resendVerification, { isLoading: isVerificationLoading }] = useVerificationSendMutation()
  const { makeLogout, isLoading: isLogoutLoading } = useLogout()
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

        {!user?.is_verified ? (
          <Alert severity="warning" sx={{ maxWidth: 300 }}>
            <Typography variant="h6" fontSize={14} fontWeight={600}>
              You haven&apos;t verified your email address yet.
            </Typography>
            <Typography variant="body2" fontWeight={500} sx={{ py: 1, opacity: 0.8 }}>
              Please click on the link we emailed you to verify your email.
            </Typography>
            <Typography variant="body2" fontWeight={500} sx={{ opacity: 0.8 }}>
              Did not receive the email?
            </Typography>
            <LoadingButton
              loading={isVerificationLoading}
              loadingPosition="start"
              variant="contained"
              color="success"
              onClick={handleClickSend}
              sx={{ fontWeight: 600, mt: 1 }}
              startIcon={<SendIcon />}
              size="small"
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
