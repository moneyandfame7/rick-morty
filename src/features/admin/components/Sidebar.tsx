import React, { FC } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import {
  useTheme,
  Tooltip,
  Box,
  Stack,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon
} from '@mui/material'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'
import WindowIcon from '@mui/icons-material/Window'
import CategoryIcon from '@mui/icons-material/Category'
import { LogoIcon } from 'shared/components/common/icons'
import { HOME_ROUTE } from 'shared/routes'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { useLogout } from 'features/authorization/hooks'
import { useAppSelector } from 'application/store'
import { selectCurrentUser } from 'features/users/services'
const drawerWidth = 80

const sidebarItems = [
  {
    path: '/dashboard',
    icon: <WindowIcon />,
    label: 'Dashboard'
  },
  {
    path: '/management',
    icon: <CategoryIcon />,
    label: 'Management'
  }
]

const getSidebarItems2 = () => {
  const user = useAppSelector(selectCurrentUser)
  return [
    {
      icon: <AccountCircleIcon />,
      label: 'Profile',
      path: `/profile/${user?.id}`
    },
    {
      icon: <ManageAccountsIcon />,
      label: 'Account settings',
      path: '/account'
    },
    {
      icon: <LogoutIcon />,
      label: 'Logout'
    }
  ]
}

const DrawerHeader: FC = () => {
  const navigate = useNavigate()
  const navigateToHome = () => {
    navigate({ pathname: HOME_ROUTE.path })
  }
  return (
    <Tooltip title="Home" placement="right">
      <Box onClick={navigateToHome} sx={{ cursor: 'pointer' }}>
        <LogoIcon />
      </Box>
    </Tooltip>
  )
}

export const Sidebar: FC = () => {
  const theme = useTheme()

  const { makeLogout } = useLogout()
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: theme.palette.background.default,
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
            minHeight: '50px !important',
            gap: 10
          }}
        >
          <DrawerHeader />
          <Stack direction="row" justifyContent="space-between" width="100%">
            <Stack direction="row" gap={2}>
              {sidebarItems.map((item, index) => (
                <Tooltip title={item.label} key={index} placement="bottom">
                  <ListItem disablePadding>
                    <ListItemButton
                      disableRipple
                      sx={{
                        justifyContent: 'center',
                        py: 2,
                        '&.active .MuiListItemIcon-root .MuiSvgIcon-root': {
                          fill: theme.palette.primary.main
                        },
                        gap: 2
                      }}
                      component={NavLink}
                      to={{ pathname: item.path }}
                      end={true}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          color: 'text.secondary'
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{
                          fontWeight: 600,
                          color: 'text.secondary'
                        }}
                        sx={{
                          display: { xs: 'none', md: 'block' }
                        }}
                      >
                        {item.label}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              ))}
            </Stack>
            <Stack gap={2} direction="row">
              {getSidebarItems2().map((item, index) => (
                <Tooltip title={item.label} key={index} placement="bottom">
                  <ListItem disablePadding>
                    <ListItemButton
                      disableRipple
                      component={NavLink}
                      to={{ pathname: item.path }}
                      end={true}
                      onClick={async () => {
                        if (!item.path) {
                          await makeLogout()
                        }
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          color: 'text.secondary'
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              ))}
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
