import React, { FC } from 'react'
import { alpha, Box, useTheme } from '@mui/material'

interface PrimaryIconProps {
  icon: React.ReactNode
}

export const PrimaryIcon: FC<PrimaryIconProps> = ({ icon }) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        p: 1,
        backgroundColor: alpha(theme.palette.primary.main, 0.05),
        color: 'primary.main'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          p: 1,
          backgroundColor: alpha(theme.palette.primary.main, 0.1)
        }}
      >
        {icon}
      </Box>
    </Box>
  )
}
