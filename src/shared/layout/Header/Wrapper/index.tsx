import { FC, PropsWithChildren } from 'react'
import { AppBar, Box, Container, LinearProgress, Toolbar, ToolbarProps, Typography } from '@mui/material'

interface HeaderWrapperProps {
  border?: boolean
}

export const HeaderWrapper: FC<PropsWithChildren & ToolbarProps & HeaderWrapperProps> = ({
  children,
  border,
  ...sx
}) => {
  return (
    <AppBar
      position='sticky'
      sx={{
        backgroundColor: 'background.paper',
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderBottomColor: border ? 'primary.border' : 'transparent',
        transition: '0.2s'
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between'
          }}
          {...sx}
        >
          {children}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
