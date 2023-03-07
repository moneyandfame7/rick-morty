import React, { useState } from 'react'
import { IconButtonProps, IconButton } from '@mui/joy'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import { useColorScheme } from '@mui/material'

export const ColorSchemeToggle = ({ onClick, ...props }: IconButtonProps) => {
  const { mode, setMode } = useColorScheme()
  const [mounted, setMounted] = useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return <IconButton size='sm' variant='plain' color='neutral' disabled />
  }
  console.log(mode)

  return (
    <IconButton
      id='toggle-mode'
      size='sm'
      variant='outlined'
      color='primary'
      {...props}
      onClick={event => {
        if (mode === 'light') {
          setMode('system')
        } else {
          setMode('light')
        }
        onClick?.(event)
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  )
}
