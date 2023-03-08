import MenuIcon from '@mui/icons-material/Menu'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { LOGIN_ROUTE, SIGNUP_ROUTE, WELCOME_ROUTE } from 'features/authorization/routes'
import { selectHasPassedWelcome, selectIsAuthenticated } from 'features/authorization/services'
import { FC, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../../application/store'
import { AvatarMenu } from './AvatarMenu'
import { HeaderDrawer } from './Drawer'
import { ForUnauthorizedHeader } from './forUnauthorized'
import { ForWelcomePageHeader } from './forWelcomePage'
import { LINKS_CONFIG } from './utils/links'
import { HeaderWrapper } from './Wrapper'
import { Logo } from 'shared/components/Logo'
import { ColorSchemeToggle } from 'shared/components/ColorSchemeToggle'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
export const Header: FC = () => {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  if (location.pathname === LOGIN_ROUTE.path || location.pathname === SIGNUP_ROUTE.path) {
    return (
      <Box
        component='header'
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Logo fontSize="large" fill='primary.main' />
        <Typography fontWeight={600}>
          Rick&Morty
        </Typography>
        <ColorSchemeToggle />
      </Box>
    )
  } else if (location.pathname === WELCOME_ROUTE.path) {
    return <ForWelcomePageHeader />
  }

  return (
    <HeaderWrapper>
      <IconButton color='primary' onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
        <MenuIcon />
      </IconButton>
      {/* <Box component='div' sx={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <Stack sx={{ display: { xs: 'none', sm: 'flex' } }} direction='row' gap={1}>
          {LINKS_CONFIG.map(({ id, name, url }) => (
            <Button component={Link} to={url} key={id} sx={{ '&:hover': { color: 'rgba(255,0,0)' } }}>
              {name}
            </Button>
          ))}
        </Stack>
      </Box> */}

      <Box component='div' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <AvatarMenu />
        {/* <IconButton color='primary' variant='outlined' size='sm'>
          <FormatListBulletedOutlinedIcon />
        </IconButton> */}
        <ColorSchemeToggle sx={{ ml: 3 }} />
        <HeaderDrawer isOpen={mobileOpen} onClose={handleDrawerToggle} />
      </Box>
    </HeaderWrapper>
  )
}
