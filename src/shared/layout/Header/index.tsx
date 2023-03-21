import React, { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Chip, Container, IconButton, Toolbar, useTheme } from '@mui/material'

import { FORGOT_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE, WELCOME_ROUTE } from 'features/authorization/routes'

import { Logo } from 'shared/components/Logo'
import { SettingDrawer } from 'shared/components/SettingDrawer'
import { HeaderDrawer } from './Drawer'
import { LINKS_CONFIG } from './utils/links'
import { AvatarMenu } from './AvatarMenu'

export const Header: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState)
  }
  if (
    location.pathname === LOGIN_ROUTE.path ||
    location.pathname === SIGNUP_ROUTE.path ||
    location.pathname === WELCOME_ROUTE.path ||
    location.pathname === FORGOT_ROUTE.path
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
