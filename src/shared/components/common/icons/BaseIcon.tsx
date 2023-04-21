import React, { type FC } from 'react'
import { alpha, Box } from '@mui/material'

interface PrimaryIconProps {
  icon: React.ReactNode
  color: string
}

export const BaseIcon: FC<PrimaryIconProps> = ({ icon, color }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        p: 1,
        backgroundColor: alpha(color, 0.05),
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
          backgroundColor: alpha(color, 0.1)
        }}
      >
        {icon}
      </Box>
    </Box>
  )
}
