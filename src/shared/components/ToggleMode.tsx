import React, { FC } from 'react'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

import { ColorModeContext } from 'application'

export const ToggleMode: FC = () => {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)

  return (
    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color='inherit' data-testid='theme-button'>
      {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  )
}
