import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, MenuItem } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'

import { useAppSelector } from 'application/store'

import { selectFavoriteAmount } from 'features/characters/services'

interface MenuItems {
  id: number
  name: string
  icon: React.ReactNode
  url?: string
  handle?: boolean
}

export const useGetMenuList = (): MenuItems[] => {
  const favoriteCount = useAppSelector(selectFavoriteAmount)
  return [
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
      icon: (
        <Badge badgeContent={favoriteCount} color="primary">
          <BookmarksOutlinedIcon sx={{ fontSize: 20 }} />
        </Badge>
      ),
      url: '/favorites'
    },
    {
      id: 3,
      name: 'Logout',
      icon: <LogoutOutlinedIcon sx={{ fontSize: 20 }} />,
      handle: true
    }
  ]
}

interface UseGetUserMenuParams {
  makeLogout: () => void
  handleCloseMenu: () => void
}

export const useGetUserMenu = ({ makeLogout, handleCloseMenu }: UseGetUserMenuParams) => {
  const navigate = useNavigate()

  return useGetMenuList().map(item => (
    <MenuItem
      onClick={async () => {
        handleCloseMenu()
        if (item.handle) {
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
}
