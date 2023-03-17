import React, { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Chip, Container, IconButton, Toolbar, useTheme } from '@mui/material'

import { Logo } from 'shared/components/Logo'
import { HeaderDrawer } from './Drawer'
import { ForWelcomePageHeader } from './forWelcomePage'
import { LOGIN_ROUTE, SIGNUP_ROUTE, WELCOME_ROUTE } from 'features/authorization/routes'
import { UserAvatar } from 'shared/components/UserAvatar'
import { useAppDispatch, useAppSelector } from 'application/store'
import { removeUser, selectCurrentUser } from 'features/users/services'
import { SettingDrawer } from 'shared/components/SettingDrawer'
import { LINKS_CONFIG } from './utils/links'
import { useLogout } from 'features/authorization/hooks'
import { AvatarMenu } from './AvatarMenu'
import { Backdrop } from 'shared/components/Backdrop'
const settings = [
  {
    icon: <AccountBoxOutlinedIcon />,
    label: 'Profile',
    path: '/profile',
    key: 1
  },
  {
    icon: <ManageAccountsOutlinedIcon />,
    label: 'Account',
    path: '/account',
    key: 2
  },
  {
    access: true,
    icon: <DashboardOutlinedIcon fontSize='small' />,
    label: 'Dashboard',
    path: '/dashboard',
    key: 3
  },
  {
    icon: <LogoutOutlinedIcon />,
    label: 'Logout',
    key: 4
  }
]
export const Header: FC = () => {
  const { logout, isLoading: isLogoutLoading } = useLogout()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()
  const user = useAppSelector(selectCurrentUser)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState)
  }
  if (
    location.pathname === LOGIN_ROUTE.path ||
    location.pathname === SIGNUP_ROUTE.path ||
    location.pathname === WELCOME_ROUTE.path
  ) {
    return null
  }
  return (
    <React.Fragment>
      <AppBar
        position='sticky'
        sx={{
          backgroundColor: 'primary.transparent',
          boxShadow: 'none',
          borderBottom: '1px solid rgb(77 72 72 / 20%)',
          transition: '0.2s',
          backdropFilter: 'blur(6px)'
        }}
      >
        {isLogoutLoading && <Backdrop />}
        <Container maxWidth='xl'>
          <Toolbar
            disableGutters
            sx={{
              justifyContent: 'space-between'
            }}
          >
            <IconButton size='large' sx={{ display: { md: 'none' } }} onClick={handleDrawerToggle}>
              <MenuIcon sx={{ color: 'primary.lighter' }} />
            </IconButton>
            <Logo fontSize='large' fill={theme.palette.primary.lighter} />
            <Box component='div' sx={{ display: { xs: 'none', md: 'flex' }, gap: 5 }}>
              {LINKS_CONFIG.map(link => (
                <Chip
                  key={link.id}
                  label={link.name}
                  deleteIcon={link.icon}
                  onClick={() => {
                    navigate({ pathname: link.url, search: link.search })
                  }}
                  onDelete={() => {
                    navigate({ pathname: link.url, search: link.search })
                  }}
                />
              ))}
            </Box>
            <Box component='div' sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
              <AvatarMenu />
              <SettingDrawer />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <HeaderDrawer onClose={handleDrawerToggle} isOpen={mobileOpen} />
    </React.Fragment>
  )
}
