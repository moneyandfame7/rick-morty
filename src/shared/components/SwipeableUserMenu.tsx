import * as React from 'react'
import { Global } from '@emotion/react'
import { styled } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { grey } from '@mui/material/colors'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { useAppDispatch, useAppSelector } from 'application/store'
import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material'
import { removeUser, selectCurrentUser } from 'features/users/services'
import { defaultMenu, menuForWelcome, useGetUserMenu } from 'shared/hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, SIGNUP_ROUTE, WELCOME_ROUTE } from 'features/authorization/routes'
import { useLogout } from 'features/authorization/hooks'
import { Backdrop } from './Backdrop'

const drawerBleeding = 56

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
}

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default
}))

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}))

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.primary.lighter,
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)'
}))

export const SwipeableUserMenu = (props: Props) => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { logout, isLoading } = useLogout()
  const isWelcomePage = location.pathname === WELCOME_ROUTE.path
  const { window } = props
  const [open, setOpen] = React.useState(false)
  const currentUser = useAppSelector(selectCurrentUser)
  const navigate = useNavigate()
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  console.log(open)
  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined
  if (location.pathname === LOGIN_ROUTE.path || location.pathname === SIGNUP_ROUTE.path) {
    return null
  }
  return (
    <Root sx={{ display: { sm: 'none' } }}>
      {isLoading && <Backdrop />}
      <SwipeableDrawer
        onClick={() => {
          setOpen(prev => !prev)
        }}
        container={container}
        anchor='bottom'
        open={open}
        onClose={() => {}}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { sm: 'none' }
        }}
        PaperProps={{
          sx: {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible'
          }
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: 'text.secondary' }}>You</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto'
          }}
        >
          <Paper sx={{ width: '100%', p: 3 }} variant='outlined'>
            <Box component='div' sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <Avatar src={currentUser ? (currentUser.photo ? currentUser.photo : '') : ''} />
              <div>
                <Typography color='text.primary'>{currentUser?.username}</Typography>
                <Typography color='text.secondary'>{currentUser?.email}</Typography>
              </div>
            </Box>
            <Divider variant='fullWidth' sx={{ m: '20px 0 30px' }} />
            <List sx={{ width: '100%' }}>
              {isWelcomePage
                ? menuForWelcome.map(item => (
                    <React.Fragment key={item.id}>
                      <ListItem
                        sx={{ mb: '5px' }}
                        onClick={async () => {
                          toggleDrawer(false)
                          if (item.name === 'Logout') {
                            await logout()
                            dispatch(removeUser())
                            return
                          }
                          console.log('CLICK SUKA', item.url)

                          navigate({ pathname: item.url })
                        }}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText>{item.name}</ListItemText>
                      </ListItem>
                      <Divider variant='fullWidth' />
                    </React.Fragment>
                  ))
                : defaultMenu.map(item => (
                    <React.Fragment key={item.id}>
                      <ListItem
                        sx={{ mb: '5px' }}
                        onClick={async () => {
                          toggleDrawer(false)
                          if (item.name === 'Logout') {
                            await logout()
                            dispatch(removeUser())
                            return
                          }
                          console.log('CLICK SUKA', item.url)

                          navigate({ pathname: item.url })
                        }}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText>{item.name}</ListItemText>
                      </ListItem>
                      <Divider variant='fullWidth' />
                    </React.Fragment>
                  ))}
            </List>
          </Paper>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  )
}
