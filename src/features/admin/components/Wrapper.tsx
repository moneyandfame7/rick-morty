import React, { FC, PropsWithChildren } from 'react'
import { Box } from '@mui/material'
import { Sidebar } from './Sidebar'

export const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', userSelect: 'none' }}>
      <Sidebar />
      <Box width="100%" minHeight="100vh" p={2} bgcolor="background.paper">
        {children}
      </Box>
    </Box>
  )
}
