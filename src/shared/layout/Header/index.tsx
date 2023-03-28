import React, { FC } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Chip, Container, IconButton, LinearProgress, Toolbar, Tooltip, useTheme } from '@mui/material'

import { Logo } from 'shared/components/icons/Logo'
import { SettingDrawer } from 'shared/components/SettingDrawer'
import { HeaderDrawer } from './Drawer'
import { LINKS_CONFIG } from './utils/links'
import { AvatarMenu } from './AvatarMenu'
import { selectIsSomethingLoading } from 'application/store/selectors'
import { getIsAuthorizationRoute } from '../../utils/getIsAuthorizationRoute'
import { useAppSelector } from '../../../application/store'

export const Header: FC = () => {
  const isLoading = useAppSelector(selectIsSomethingLoading)
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState)
  }
  if (getIsAuthorizationRoute(location.pathname)) {
    return null
  }
  return (
    <React.Fragment>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'background.paper',
          boxShadow: 'none',
          borderBottom: '1px solid rgb(77 72 72 / 20%)',
          transition: '0.2s',
          position: 'relative'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: 'space-between'
            }}
          >
            <IconButton size="large" sx={{ display: { md: 'none' } }} onClick={handleDrawerToggle}>
              <MenuIcon sx={{ color: 'primary.lighter' }} />
            </IconButton>
            <Tooltip title="Home">
              <Box component={Link} to="/">
                <Logo fontSize="large" />
              </Box>
            </Tooltip>
            <Box component="div" sx={{ display: { xs: 'none', md: 'flex' }, gap: 5 }}>
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
            <Box component="div" sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
              <AvatarMenu />
              <SettingDrawer />
            </Box>
          </Toolbar>
        </Container>
        {isLoading && (
          <LinearProgress
            sx={{ position: 'absolute', bottom: 0, left: 0, borderRadius: '8px 8px 0 0', width: '100%' }}
          />
        )}
      </AppBar>

      <HeaderDrawer onClose={handleDrawerToggle} isOpen={mobileOpen} />
    </React.Fragment>
  )
}
