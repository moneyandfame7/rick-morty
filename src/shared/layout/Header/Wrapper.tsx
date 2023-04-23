import { AppBar, Container, Toolbar, alpha, useTheme } from '@mui/material'
import React, { type PropsWithChildren, type FC } from 'react'

export const HeaderWrapper: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme()
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: alpha(theme.palette.background.default, 0.65),
        backdropFilter: 'blur(12px)',
        boxShadow: 'none',
        borderBottom: '1px solid rgb(77 72 72 / 20%)',
        transition: '0.2s',
        position: 'sticky'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between',
            minHeight: '50px !important'
          }}
        >
          {children}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
