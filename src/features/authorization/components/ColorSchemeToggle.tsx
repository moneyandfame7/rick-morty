import React, { type FC } from 'react'

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import { IconButton } from '@mui/material'
import { SvgIconProps } from '@mui/material'

import { useAppSelector } from 'application/store'
import { selectCustomization } from 'application/theme/customization'

import { useActions } from 'shared/hooks/useActions'

export const ColorSchemeToggle: FC<SvgIconProps> = ({ ...sx }) => {
  const mode = useAppSelector(selectCustomization).mode
  const { setMode } = useActions()
  const handleClick = () => {
    mode === 'dark' ? setMode('light') : setMode('dark')
  }

  return (
    <IconButton onClick={handleClick}>
      {mode === 'dark' ? <LightModeOutlinedIcon {...sx} /> : <DarkModeOutlinedIcon {...sx} />}
    </IconButton>
  )
}
