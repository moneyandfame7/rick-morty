import React, { FC, useState } from 'react'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  Stack,
  styled,
  Tooltip,
  Typography,
  Zoom
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CheckIcon from '@mui/icons-material/Check'
import LoadingButton from '@mui/lab/LoadingButton'
import { grey } from '@mui/material/colors'
import { useAppSelector } from 'application/store'

import { selectCurrentUser } from 'features/users/services'

import { UserAvatar } from 'shared/components/UserAvatar'
import { useGetUserMenu } from 'shared/hooks/useGetUserMenu'
import { borderColor } from '@mui/system'
import { useVerificationSendMutation } from 'features/authorization/services'

interface AvatarMenuProps {
  isWelcomePage?: boolean
}
const AlertButton = styled(LoadingButton)({
  fontSize: 11,
  background: '#fff',
  color: '#676363',
  fontWeight: '600',
  textTransform: 'initial',
  boxShadow: '0px 1px 2px 0px #1018280d;',
  border: '1px solid #0000001f',
  borderRadius: '0.5rem',
  '&:hover': {
    backgroundColor: '#faf8f8',
    borderColor: '#0000001f',
    boxShadow: 'none'
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#fff',
    borderColor: '#0000001f'
  },
  '&:focus': {
    boxShadow: 'red'
  }
})
export const AvatarMenu: FC<AvatarMenuProps> = ({ isWelcomePage = false }) => {
  const [resendVerification, { isLoading, isSuccess }] = useVerificationSendMutation()
  const handleClick = async () => {
    await resendVerification()
    console.log('Send verification message', isLoading, isSuccess)
  }
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
    <Box component='div' sx={{ flexGrow: 0, width: '30px' }}>
      <Tooltip title='You' arrow TransitionComponent={Zoom} TransitionProps={{ timeout: 400 }}>
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
        PaperProps={{
          style: {
            width: '35ch'
          }
        }}
      >
        <Box
          component='div'
          sx={{
            p: '15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5
          }}
        >
          <UserAvatar user={currentUser} sx={{ width: 40, height: 40 }} />
          <Box component='div' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1 }}>
            {currentUser?.username && (
              <Typography sx={{ fontWeight: 500, fontSize: 13, color: grey[600] }}>{currentUser.username}</Typography>
            )}
            <Typography sx={{ fontWeight: 500, fontSize: 11, color: grey[600] }}>{currentUser?.email}</Typography>
          </Box>
          <Alert severity='warning' sx={{ fontSize: '10' }}>
            <Stack gap={0.4} mb={1}>
              <AlertTitle sx={{ fontSize: 13, opacity: 0.9, mb: 0 }}>
                You haven't verified your email address yet.
              </AlertTitle>
              <Typography fontSize='12px' fontWeight={500} sx={{ opacity: 0.75 }}>
                Please click on the link we emailed you to verify your email.
              </Typography>
              <Typography fontSize='12px' fontWeight={500} sx={{ opacity: 0.75 }}>
                Did not receive the email?
              </Typography>
            </Stack>

            {isSuccess ? (
              <Typography color='green' fontSize='12px' fontWeight={600}>
                Verification email is re-sent. Please check your email.
              </Typography>
            ) : (
              <AlertButton endIcon={<SendIcon />} onClick={handleClick} loading={isLoading} loadingPosition='end'>
                <span>Resend verification email</span>
              </AlertButton>
            )}
          </Alert>
        </Box>
        <Divider color={grey[300]} />
        {currentMenu}
      </Menu>
    </Box>
  )
}
