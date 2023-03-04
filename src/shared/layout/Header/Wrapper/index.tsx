import { AppBar, Toolbar } from '@mui/material'
import { FC, PropsWithChildren } from 'react'

export const HeaderWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppBar
      component='nav'
      position='sticky'
      sx={{
        backgroundColor: 'background.default',
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'neutral.main',
        color: 'text.primary',
        display: 'flex'
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: { xs: 'space-between' } }}>{children}</Toolbar>
    </AppBar>
  )
}
