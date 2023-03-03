import React, { FC, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  Zoom
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import useTheme from '@mui/material/styles/useTheme'
import { grey } from '@mui/material/colors'
import { WELCOME_ROUTE } from '../../../../routes/routesConfig'

interface ILinkConfig {
  url: string
  name: string
  id: number
}

interface IUserMenu {
  id: number
  url: string
  name: string
  icon: React.ReactNode
}

const LINKS_CONFIG: ILinkConfig[] = [
  {
    url: '/characters?page=1',
    name: 'Characters',
    id: 0
  },
  {
    url: '/episodes?page=1',
    name: 'Episodes',
    id: 1
  },
  {
    url: '/locations?page=1',
    name: 'Locations',
    id: 2
  }
]
const userMenu: IUserMenu[] = [
  { id: 0, name: 'Profile', icon: <AccountCircleIcon sx={{ fontSize: 16 }} />, url: '/profile' },
  { id: 1, name: 'Account', icon: <ManageAccountsIcon sx={{ fontSize: 16 }} />, url: '/account' },
  { id: 2, name: 'Favorites', icon: <FavoriteIcon sx={{ fontSize: 16 }} />, url: '/favorites' },
  { id: 3, name: 'Logout', icon: <LogoutIcon sx={{ fontSize: 16 }} />, url: '/logout' }
]

interface IHeaderProps {
  window?: () => Window
}

const Header: FC<IHeaderProps> = ({ window }) => {
  const location = useLocation()
  const container = window !== undefined ? () => window().document.body : undefined
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const forUnauthorizedHeader = (
    <>
      <AppBar
        component='nav'
        position='sticky'
        sx={{
          backgroundColor: 'background.default',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'neutral.main',
          color: 'text.primary',
          display: 'flex'
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: { xs: 'space-between' } }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <Typography
              variant='h6'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1, userSelect: 'none' }}
              fontWeight='bolder'
            >
              Rick & morty
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
  const userAvatarMenu = (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title='You' arrow TransitionComponent={Zoom}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt='Remy Sharp'
            src='https://rick-morty.s3.eu-central-1.amazonaws.com/users/0ac43113-faaa-4974-b876-68a1df0a0a44.jpeg'
            sx={{ width: 28, height: 28 }}
          />
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
          <Avatar
            alt='Remy Sharp'
            src='https://rick-morty.s3.eu-central-1.amazonaws.com/users/0ac43113-faaa-4974-b876-68a1df0a0a44.jpeg'
            sx={{ width: 50, height: 50 }}
          />

          <Typography sx={{ fontWeight: 500, margin: '7px 0 0', fontSize: 14, color: grey[600] }}>
            moneyandfame
          </Typography>

          <Typography sx={{ fontWeight: 500, fontSize: 12, color: grey[600] }}>davidoo1234e@gmail.com</Typography>
        </Box>
        <Divider color={grey[300]} />
        {userMenu.map(item => (
          <MenuItem
            key={item.id}
            onClick={() => {
              handleCloseUserMenu()
            }}
            component={Link}
            to={item.url}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
  const forWelcomePage = (
    <>
      <AppBar
        component='nav'
        position='sticky'
        sx={{
          backgroundColor: 'background.default',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'neutral.main',
          color: 'text.primary',
          display: 'flex'
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: { xs: 'space-between' } }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <Typography
              variant='h6'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1, userSelect: 'none' }}
              fontWeight='bolder'
            >
              Rick & morty
            </Typography>
          </Box>
          {userAvatarMenu}
        </Toolbar>
      </AppBar>
    </>
  )

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', height: '70px' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        RICK & MORTY
      </Typography>
      <Divider />
      <List>
        {LINKS_CONFIG.map(
          ({ url, name, id }) =>
            name !== 'Favorites' && (
              <ListItem key={id} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <NavLink
                    to={url}
                    key={id}
                    style={({ isActive }) => (isActive ? { color: theme.palette.primary.dark } : undefined)}
                  >
                    <ListItemText primary={name} />
                  </NavLink>
                </ListItemButton>
              </ListItem>
            )
        )}
      </List>
    </Box>
  )

  const demo = (
    <>
      <AppBar
        component='nav'
        position='sticky'
        sx={{
          backgroundColor: 'background.default',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'neutral.main',
          color: 'text.primary',
          display: 'flex'
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: { xs: 'space-between' } }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <Typography
              variant='h6'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1, userSelect: 'none' }}
              fontWeight='bolder'
            >
              Rick & morty
            </Typography>
            <Stack sx={{ display: { xs: 'none', sm: 'flex' } }} direction='row' gap={1}>
              {LINKS_CONFIG.map(({ id, name, url }) => (
                <Button component={Link} to={url} key={id} sx={{ '&:hover': { color: 'rgba(255,0,0)' } }}>
                  {name}
                </Button>
              ))}
            </Stack>
          </Box>
          {userAvatarMenu}
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  )

  if (location.pathname === '/login' || location.pathname === '/signup') {
    return forUnauthorizedHeader
  }
  if (location.pathname === WELCOME_ROUTE.path) {
    return forWelcomePage
  }

  return demo
}
export default Header
