import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'

interface MenuItems {
  id: number
  name: string
  icon: React.ReactNode
  url?: string
  handle?: boolean
}

export const defaultMenu: MenuItems[] = [
  {
    id: 0,
    name: 'Profile',
    icon: <AccountCircleOutlinedIcon sx={{ fontSize: 20 }} />,
    url: '/profile'
  },
  {
    id: 1,
    name: 'Account',
    icon: <ManageAccountsOutlinedIcon sx={{ fontSize: 20 }} />,
    url: '/account'
  },
  {
    id: 2,
    name: 'Favorites',
    icon: <BookmarksOutlinedIcon sx={{ fontSize: 20 }} />,
    url: '/favorites'
  },
  {
    id: 3,
    name: 'Logout',
    icon: <LogoutOutlinedIcon sx={{ fontSize: 20 }} />,
    handle: true
  }
]

export const menuForWelcome: MenuItems[] = [
  {
    id: 1,
    name: 'Logout',
    icon: <LogoutOutlinedIcon sx={{ fontSize: 20 }} />,
    handle: true
  }
]

interface UseGetUserMenuParams {
  isWelcomePage: boolean
  makeLogout: () => void
  handleCloseMenu: () => void
}

export const useGetUserMenu = ({ isWelcomePage, makeLogout, handleCloseMenu }: UseGetUserMenuParams) => {
  const navigate = useNavigate()
  const itemsForWelcomePage = menuForWelcome.map(item => (
    <MenuItem
      onClick={async () => {
        if (item.name === 'Logout') {
          handleCloseMenu()
          await makeLogout()
          return
        }
      }}
      key={item.id}
    >
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText>{item.name}</ListItemText>
    </MenuItem>
  ))

  const itemsForDefaultPage = defaultMenu.map(item => (
    <MenuItem
      onClick={async () => {
        if (item.handle) {
          handleCloseMenu()
          await makeLogout()
          return
        }
        navigate({ pathname: item.url })
      }}
      key={item.id}
      sx={{ gap: 2 }}
    >
      {item.icon}
      {item.name}
    </MenuItem>
  ))
  return isWelcomePage ? itemsForWelcomePage : itemsForDefaultPage
}
