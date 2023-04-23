import React from 'react'

import { ToggleButton, ToggleButtonGroup, Typography, useMediaQuery } from '@mui/material'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

import { type Mode } from 'application/theme'
import { useAppSelector } from 'application/store'
import { selectCustomization } from 'application/theme/customization'
import { useActions } from 'shared/hooks/useActions'

const THEME_ITEMS = [
  {
    id: 1,
    label: 'System',
    icon: <SettingsBrightnessIcon />,
    value: 'system'
  },
  {
    id: 0,
    label: 'Light',
    icon: <LightModeIcon />,
    value: 'light'
  },
  {
    id: 2,
    label: 'Dark',
    icon: <DarkModeIcon />,
    value: 'dark'
  }
]
export const ThemeModeToggle = () => {
  const { setMode } = useActions()
  const smallViewport = useMediaQuery('(max-width:400px)')
  const mode = useAppSelector(selectCustomization).mode

  const handleChange = (event: React.MouseEvent<HTMLElement>, mode: Mode | null) => {
    if (mode !== null) {
      setMode(mode)
    }
  }
  const handleMessage = () => {
    switch (mode) {
      case 'system':
        return 'RickmortyApi theme will match your system active settings'
      default:
        return 'RickmortyApi will use your selected theme'
    }
  }
  return (
    <>
      <Typography fontWeight={600} fontSize={13} sx={{ mt: 2, mb: 1 }}>
        Theme mode
      </Typography>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleChange}
        sx={{
          display: 'flex'
        }}
        orientation={smallViewport ? 'vertical' : 'horizontal'}
      >
        {THEME_ITEMS.map(mode => (
          <ToggleButton
            disableRipple
            value={mode.value}
            key={mode.id}
            sx={{
              display: 'flex',
              gap: 1,
              textTransform: 'initial'
            }}
          >
            {mode.icon}
            {mode.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Typography fontWeight={500} fontSize={12} color="text.secondary" sx={{ mt: 1 }}>
        {handleMessage()}
      </Typography>
    </>
  )
}
