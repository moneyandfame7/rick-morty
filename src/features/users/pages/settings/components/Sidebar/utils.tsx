import React from 'react'

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'

export interface NavigationLinkType {
  label: string
  icon: React.ReactNode
  url: string
}

export const mainLinks: NavigationLinkType[] = [
  {
    label: 'Public profile',
    icon: <Person2OutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />,
    url: 'profile'
  },
  {
    label: 'Account',
    icon: <SettingsOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />,
    url: 'admin'
  },
  {
    label: 'Appearance',
    icon: <BrushOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />,
    url: 'appearance'
  }
]

export const accessLinks: NavigationLinkType[] = [
  {
    label: 'Email',
    icon: <EmailOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />,
    url: 'email'
  }
]
