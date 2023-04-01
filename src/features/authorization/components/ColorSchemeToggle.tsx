import { FC } from 'react'

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import { IconButton } from '@mui/material'
import { SvgIconProps } from '@mui/material'

import { useAppDispatch, useAppSelector } from 'application/store'
import { selectCustomization, setMode } from 'application/theme/customization'
export const ColorSchemeToggle: FC<SvgIconProps> = ({ ...sx }) => {
  const mode = useAppSelector(selectCustomization).mode
  const dispatch = useAppDispatch()

  const handleClick = () => {
    mode === 'dark' ? dispatch(setMode('light')) : dispatch(setMode('dark'))
  }

  return (
    <IconButton onClick={handleClick}>
      {mode === 'dark' ? <LightModeOutlinedIcon {...sx} /> : <DarkModeOutlinedIcon {...sx} />}
    </IconButton>
  )
}
