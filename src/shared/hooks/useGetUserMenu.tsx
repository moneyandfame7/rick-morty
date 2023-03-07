import React from 'react'
import { useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LogoutIcon from '@mui/icons-material/Logout'
import { useLogoutMutation } from '../../features/authorization/services'
import { useAppDispatch } from '../../application/store'
import { removeUser } from '../../features/users/services'
import { MenuItem } from '@mui/joy'

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
  // const navigate = useNavigate()
  // const [logout] = useLogoutMutation()
  // const dispatch = useAppDispatch()
  // return isWelcomePage
  //   ? menuForWelcome.map(item => (
  //       <MenuItem
  //                 {...(selectedIndex === 0 && { selected: true, variant: 'soft' })}
  //         key={item.id}
  //         component='span'
  //         onClick={async () => {
  //           if (item.handle) {
  //             handleCloseMenu()
  //             await logout()
  //             dispatch(removeUser())
  //           }
  //         }}
  //       >
  //         {item.name}
  //       </MenuItem>
  //     ))
  //   : defaultMenu.map(item => (
  //       <MenuItem
  //         component='span'
  //         key={item.id}
  //         onClick={async () => {
  //           handleCloseMenu()
  //           if (item.url) {
  //             navigate(item.url)
  //           }
  //           if (item.handle) {
  //             await logout()
  //             dispatch(removeUser())
  //           }
  //         }}
  //       >
  //         {item.name}
  //       </MenuItem>
  //     ))
}
