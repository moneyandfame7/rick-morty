import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Badge, MenuItem } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined'
import { useAppSelector } from 'application/store'

import { selectFavoriteAmount } from 'features/characters/services'
import { CREATE_CHARACTER_ROUTE } from 'features/characters/routes'
import { Role } from 'features/authorization/constant'

import { hasPermission } from 'shared/utils'
import { insert } from 'shared/utils/insert'
import { ADMIN_ROUTE } from 'shared/routes'
import { selectCurrentUser } from 'features/users/services'

interface MenuItems {
  id: string
  name: string
  icon: React.ReactNode
  url?: string
  handle?: boolean
}

export const useGetMenuList = (): MenuItems[] => {
  const favoriteCount = useAppSelector(selectFavoriteAmount)
  const baseList: MenuItems[] = [
    {
      id: uuidv4(),
      name: 'Profile',
      icon: <AccountCircleOutlinedIcon sx={{ fontSize: 20 }} />,
      url: '/profile'
    },
    {
      id: uuidv4(),
      name: 'Account',
      icon: <ManageAccountsOutlinedIcon sx={{ fontSize: 20 }} />,
      url: '/account'
    },
    {
      id: uuidv4(),
      name: 'Favorites',
      icon: (
        <Badge badgeContent={favoriteCount} color="primary">
          <BookmarksOutlinedIcon sx={{ fontSize: 20 }} />
        </Badge>
      ),
      url: '/favorites'
    },
    {
      id: uuidv4(),
      name: 'Logout',
      icon: <LogoutOutlinedIcon sx={{ fontSize: 20 }} />,
      handle: true
    }
  ]
  const forPrivelegedList: MenuItems[] = [
    {
      id: uuidv4(),
      name: 'Create character',
      icon: <AddCircleOutlineOutlinedIcon sx={{ fontSize: 20 }} />,
      url: CREATE_CHARACTER_ROUTE.path
    },
    {
      id: uuidv4(),
      name: 'Admin panel',
      icon: <SupervisorAccountOutlinedIcon sx={{ fontSize: 20 }} />,
      url: ADMIN_ROUTE.path
    }
  ]
  const user = useAppSelector(selectCurrentUser)
  useEffect(() => {
    if (user && hasPermission(user.role.value as Role)) {
      /* Insert menu items for priveleged list before 6 index */
      insert(baseList, 3, forPrivelegedList)
    }
  }, [user])

  return baseList
}

interface UseGetUserMenuParams {
  makeLogout: () => void
  handleCloseMenu: () => void
}

export const useGetUserMenu = ({ makeLogout, handleCloseMenu }: UseGetUserMenuParams) => {
  const navigate = useNavigate()

  const showMenuList = () => {
    const menuList = useGetMenuList()
    return menuList.map(item => (
      <MenuItem
        onClick={async () => {
          handleCloseMenu()
          if (item.handle) {
            return makeLogout()
          }
          navigate({ pathname: item.url })
        }}
        key={item.id}
        sx={{ gap: 2 }}
        disableRipple
      >
        {item.icon}
        {item.name}
      </MenuItem>
    ))
  }
  return showMenuList()
}
