import React, { FC, MouseEventHandler, useState } from 'react'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  IconButton,
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
import { useAppDispatch, useAppSelector } from 'application/store'

import { removeUser, selectCurrentUser } from 'features/users/services'

import { UserAvatar } from 'shared/components/UserAvatar'
import { useGetUserMenu } from 'shared/hooks/useGetUserMenu'
import { borderColor } from '@mui/system'
import { useLogoutMutation, useVerificationSendMutation } from 'features/authorization/services'
import { Menu, MenuItem } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import { Key } from '@mui/icons-material'
import { Backdrop } from 'shared/components/Backdrop'
interface AvatarMenuProps {
  isWelcomePage?: boolean
}
interface MenuItems {
  id: number
  name: string
  url?: string
  handle?: boolean
}

const defaultMenu: MenuItems[] = [
  {
    id: 0,
    name: 'Profile',
    url: '/profile'
  },
  {
    id: 1,
    name: 'Account',
    url: '/account'
  },
  {
    id: 2,
    name: 'Favorites',
    url: '/favorites'
  },
  {
    id: 3,
    name: 'Logout',
    handle: true
  }
]

const menuForWelcome: MenuItems[] = [
  {
    id: 1,
    name: 'Logout',
    url: '/logout',
    handle: true
  }
]
export const AvatarMenu: FC<AvatarMenuProps> = ({ isWelcomePage = false }) => {
  const [resendVerification, { isLoading, isSuccess }] = useVerificationSendMutation()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const [logout, { isLoading: logoutIsLoading }] = useLogoutMutation()
  const dispatch = useAppDispatch()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const createHandleClose = (item?: MenuItems) => async () => {
    setAnchorEl(null)
    console.log(item)
    if (item) {
      if (typeof item.id === 'number') {
        setSelectedIndex(item.id)
        navigate({ pathname: item.url })
      }
      if (item.handle) {
        await logout()
        dispatch(removeUser())
      }
    }
  }
  const handleClickSend = async () => {
    await resendVerification()
    console.log('Send verification message', isLoading, isSuccess)
  }
  const currentUser = useAppSelector(selectCurrentUser)

  const currentMenu = useGetUserMenu(isWelcomePage, createHandleClose)
  return (
    <Box component='div' sx={{ flexGrow: 0, width: '30px' }}>
      <Backdrop isLoading={logoutIsLoading} />
      <Tooltip title='You' arrow TransitionComponent={Zoom} TransitionProps={{ timeout: 400 }}>
        <IconButton onClick={handleClick} sx={{ p: 0 }}>
          <UserAvatar user={currentUser} sx={{ width: 28, height: 28 }} />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={open} onClose={createHandleClose()}>
        {isWelcomePage
          ? menuForWelcome.map(item => (
              <MenuItem
                {...(selectedIndex === item.id && { selected: true, variant: 'soft' })}
                key={item.id}
                component='span'
                onClick={createHandleClose(item)}
              >
                {item.name}
              </MenuItem>
            ))
          : defaultMenu.map(item => (
              <MenuItem
                {...(selectedIndex === item.id && { selected: true, variant: 'soft' })}
                component='span'
                key={item.id}
                onClick={createHandleClose(item)}
              >
                {item.name}
              </MenuItem>
            ))}
        {/* <Box
          component='div'
          sx={{
            p: '15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
            bgcolor: 'background.surface'
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
        {currentMenu} */}
      </Menu>
    </Box>
  )
}
