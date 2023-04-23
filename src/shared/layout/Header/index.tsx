import React, { type FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Box, IconButton, Tooltip, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { useAppSelector } from 'application/store'

import { selectIsAuthenticated } from 'features/authorization/services'

import { Logo } from 'shared/components/icons/Logo'
import { SettingDrawer } from 'shared/components'
import { getIsAuthorizationRoute } from 'shared/utils/getIsAuthorizationRoute'
import { HOME_ROUTE } from 'shared/routes'
import { getIsAdminRoute } from 'shared/utils'

import { LINKS_CONFIG } from './utils/links'
import { HeaderDrawer } from './Drawer'
import { UserMenu } from './AvatarMenu'
import { HeaderWrapper } from './Wrapper'
import { HeaderLink } from './Link'
import { UnauthorizedHeader } from './UnauthorizedHeader'

export const Header: FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const location = useLocation()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isMobile = useMediaQuery('(max-width:900px)')

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState)
  }

  if (getIsAuthorizationRoute(location.pathname) || getIsAdminRoute(location.pathname)) {
    return null
  }
  if (location.pathname === HOME_ROUTE.path && !isAuthenticated) {
    return <UnauthorizedHeader />
  }

  return (
    <React.Fragment>
      <HeaderWrapper>
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
            <HeaderLink key={link.id} {...link} />
          ))}
        </Box>
        <Box component="div" sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
          <UserMenu />
          <SettingDrawer />
        </Box>
      </HeaderWrapper>

      {isMobile && <HeaderDrawer onClose={handleDrawerToggle} isOpen={mobileOpen} />}
    </React.Fragment>
  )
}
