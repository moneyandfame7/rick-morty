import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { ForUnauthorizedHeader } from './forUnauthorized'
import { ForWelcomePageHeader } from './forWelcomePage'
import { AvatarMenu } from './AvatarMenu'
import { LINKS_CONFIG } from './utils/links'
import { HeaderDrawer } from './Drawer'
import { useAppSelector } from '../../../application/store'
import { selectHasPassedWelcome, selectIsAuthenticated, useLogoutMutation } from 'features/authorization/services'

export const Header: FC = () => {
  const isUserAuthenticated = useAppSelector(selectIsAuthenticated)
  const hasUserPassedWelcome = useAppSelector(selectHasPassedWelcome)
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  if (!isUserAuthenticated) {
    return <ForUnauthorizedHeader />
  }
  if (!hasUserPassedWelcome) {
    return <ForWelcomePageHeader />
  }

  return (
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
          <AvatarMenu />
        </Toolbar>
      </AppBar>
      <HeaderDrawer isOpen={mobileOpen} onClose={handleDrawerToggle} />
    </>
  )
}
