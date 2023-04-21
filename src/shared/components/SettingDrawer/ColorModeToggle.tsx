import React from 'react'

import { ToggleButton, ToggleButtonGroup, useMediaQuery } from '@mui/material'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

import { type Mode } from 'application/theme'
import { useAppSelector } from 'application/store'
import { selectCustomization } from 'application/theme/customization'
import { useActions } from 'shared/hooks/useActions'

const modeItems = [
  {
    id: 0,
    label: 'Light',
    icon: <LightModeIcon />,
    value: 'light'
  },
  {
    id: 1,
    label: 'System',
    icon: <SettingsBrightnessIcon />,
    value: 'system'
  },
  {
    id: 2,
    label: 'Dark',
    icon: <DarkModeIcon />,
    value: 'dark'
  }
]
export const ColorModeToggle = () => {
  const { setMode } = useActions()
  const smallViewport = useMediaQuery('(max-width:600px)')
  const mode = useAppSelector(selectCustomization).mode

  const handleChange = (event: React.MouseEvent<HTMLElement>, mode: Mode | null) => {
    if (mode !== null) {
      setMode(mode)
    }
  }
  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      onChange={handleChange}
      sx={{
        display: 'flex'
      }}
      orientation={smallViewport ? 'vertical' : 'horizontal'}
    >
      {modeItems.map(mode => (
        <ToggleButton
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
  )
}
