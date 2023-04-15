import React, { FC } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  useTheme,
  Tooltip,
  Box,
  Stack
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
  },
  {
    path: '/statistics',
    icon: <SignalCellularAltIcon />,
    label: 'Statistics'
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
      <Box width="100%" display="flex" justifyContent="center" py={2}>
        <Box onClick={navigateToHome} sx={{ cursor: 'pointer' }}>
          <LogoIcon />
        </Box>
      </Box>
    </Tooltip>
  )
}

export const Sidebar: FC = () => {
  const theme = useTheme()

  const { makeLogout } = useLogout()

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'background.default'
        }
      }}
      variant="permanent"
      anchor="left"
    >
      <DrawerHeader />
      <Divider />
      <Stack justifyContent="space-between" height="100%">
        <List>
          {sidebarItems.map((item, index) => (
            <Tooltip title={item.label} key={index} placement="right">
              <ListItem disablePadding>
                <ListItemButton
                  disableRipple
                  sx={{
                    justifyContent: 'center',
                    py: 2,
                    '&.active .MuiListItemIcon-root .MuiSvgIcon-root': {
                      fill: theme.palette.primary.main
                    }
                  }}
                  component={NavLink}
                  to={{ pathname: item.path }}
                  end={true}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
        <List>
          {getSidebarItems2().map(item => (
            <Tooltip title={item.label} key={item.label} placement="right">
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  disableRipple
                  sx={{ justifyContent: 'center', py: 2 }}
                  component={item.path ? NavLink : 'button'}
                  to={item.path}
                  onClick={async () => {
                    if (!item.path) {
                      await makeLogout()
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Stack>
    </Drawer>
  )
}
