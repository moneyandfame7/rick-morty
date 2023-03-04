import React, { FC } from 'react'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { AvatarMenu } from '../AvatarMenu'

export const ForWelcomePageHeader: FC = () => {
  return (
    <>
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
        <Toolbar sx={{ display: 'flex', justifyContent: { xs: 'space-between' } }}>
          <Box sx={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <Typography
              variant='h6'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1, userSelect: 'none' }}
              fontWeight='bolder'
            >
              Rick & morty
            </Typography>
          </Box>
          <AvatarMenu isWelcomePage />
        </Toolbar>
      </AppBar>
    </>
  )
}
