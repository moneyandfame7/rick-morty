import React, { FC, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import {
  alpha,
  AppBar,
  Box,
  Container,
  darken,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material'

import { Logo } from 'shared/components/icons/Logo'
import { SettingDrawer } from 'shared/components/SettingDrawer'
import { HeaderDrawer } from './Drawer'
import { LINKS_CONFIG } from './utils/links'
import { AvatarMenu } from './AvatarMenu'
import { getIsAuthorizationRoute } from 'shared/utils/getIsAuthorizationRoute'
import { useAppSelector } from 'application/store'
import { HOME_ROUTE } from 'shared/routes'
import { selectIsAuthenticated } from 'features/authorization/services'
import { OutlinedButton, PrimaryButton } from '../../components/common/buttons'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '../../../features/authorization/routes'

export const Header: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState)
  }

  if (getIsAuthorizationRoute(location.pathname)) {
    return null
  }
  if (location.pathname === HOME_ROUTE.path) {
    if (!isAuthenticated) {
      return (
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: alpha(theme.palette.background.default, 0.65),
            boxShadow: 'none',
            borderBottom: '1px solid rgb(77 72 72 / 20%)',
            transition: '0.2s',
            position: 'sticky'
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{
                justifyContent: 'space-between',
                minHeight: '50px !important'
              }}
            >
              <Tooltip title="Home">
                <Box component={Link} to={{ pathname: HOME_ROUTE.path }} sx={{ textDecoration: 'none' }}>
                  <Logo sx={{ display: { xs: 'none', sm: 'flex' } }} />
                </Box>
              </Tooltip>
              <Stack direction="row" alignItems="center" gap={2}>
                <OutlinedButton
                  onClick={() => {
                    navigate({ pathname: LOGIN_ROUTE.path })
                  }}
                >
                  Login
                </OutlinedButton>
                <PrimaryButton
                  onClick={() => {
                    navigate({ pathname: SIGNUP_ROUTE.path })
                  }}
                >
                  Signup
                </PrimaryButton>
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
      )
    }
  }
  return (
    <React.Fragment>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: alpha(theme.palette.background.default, 0.65),
          backdropFilter: 'blur(6px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgb(77 72 72 / 20%)',
          transition: '0.2s',
          position: 'sticky'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: 'space-between',
              minHeight: '50px !important'
            }}
          >
            <IconButton size="large" sx={{ display: { md: 'none' } }} onClick={handleDrawerToggle}>
              <MenuIcon sx={{ color: 'primary.dark' }} />
            </IconButton>
            <Tooltip title="Home">
              <Box component={Link} to={{ pathname: HOME_ROUTE.path }} sx={{ textDecoration: 'none' }}>
                <Logo sx={{ display: { xs: 'none', sm: 'flex' } }} />
              </Box>
            </Tooltip>

            <Box component="div" sx={{ display: { xs: 'none', md: 'flex' }, gap: 5 }}>
              {LINKS_CONFIG.map(link => (
                <Typography
                  key={link.id}
                  variant="body2"
                  color="text.secondary"
                  fontWeight={600}
                  component={Link}
                  to={{ pathname: link.url, search: link.search }}
                  sx={{
                    textDecoration: 'none',
                    '&: hover': {
                      color: darken(theme.palette.text.secondary, 0.2)
                    }
                  }}
                >
                  {link.name}
                </Typography>
              ))}
            </Box>
            <Box component="div" sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
              <AvatarMenu />
              <SettingDrawer />
            </Box>
          </Toolbar>
        </Container>
        {/*    {isLoading && (
          <LinearProgress
            sx={{ position: 'absolute', bottom: 0, left: 0, borderRadius: '8px 8px 0 0', width: '100%' }}
          />
        )}*/}
      </AppBar>

      <HeaderDrawer onClose={handleDrawerToggle} isOpen={mobileOpen} />
    </React.Fragment>
  )
}
