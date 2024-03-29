import React, { type FC, type PropsWithChildren } from 'react'
import { Box } from '@mui/material'

import { Sidebar } from './Header'

export const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Sidebar />

      <Box width="100%" maxWidth="100%" minHeight="100vh" p={2} bgcolor="background.paper">
        {children}
      </Box>
    </>
  )
}
