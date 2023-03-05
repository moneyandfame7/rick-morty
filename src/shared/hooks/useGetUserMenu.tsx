import React from 'react'
import { useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LogoutIcon from '@mui/icons-material/Logout'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { useLogoutMutation } from '../../features/authorization/services'
import { useAppDispatch } from '../../application/store'
import { removeUser } from '../../features/users/services'

interface MenuItems {
  id: number
  name: string
  icon: React.ReactNode
  url?: string
  handle?: boolean
}

const defaultMenu: MenuItems[] = [
  {
    id: 0,
    name: 'Profile',
    icon: <AccountCircleIcon sx={{ fontSize: 16 }} />,
    url: '/profile'
  },
  {
    id: 1,
    name: 'Account',
    icon: <ManageAccountsIcon sx={{ fontSize: 16 }} />,
    url: '/account'
  },
  {
    id: 2,
    name: 'Favorites',
    icon: <FavoriteIcon sx={{ fontSize: 16 }} />,
    url: '/favorites'
  },
  {
    id: 3,
    name: 'Logout',
    icon: <LogoutIcon sx={{ fontSize: 16 }} />,
    handle: true
  }
]

const menuForWelcome: MenuItems[] = [
  {
    id: 1,
    name: 'Logout',
    icon: <LogoutIcon sx={{ fontSize: 16 }} />,
    url: '/logout',
    handle: true
  }
]

export const useGetUserMenu = (isWelcomePage: boolean, handleCloseMenu: () => void) => {
  const navigate = useNavigate()
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()
  return isWelcomePage
    ? menuForWelcome.map(item => (
        <MenuItem
          key={item.id}
          onClick={async () => {
            handleCloseMenu()
            if (item.handle) {
              await logout()
              dispatch(removeUser())
            }
          }}
        >
          <ListItemIcon sx={{ color: '#000' }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: 12, fontWeight: 600 }} />
        </MenuItem>
      ))
    : defaultMenu.map(item => (
        <MenuItem
          key={item.id}
          onClick={async () => {
            handleCloseMenu()
            if (item.url) {
              navigate(item.url)
            }
            if (item.handle) {
              await logout()
              dispatch(removeUser())
            }
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }} />
        </MenuItem>
      ))
}
