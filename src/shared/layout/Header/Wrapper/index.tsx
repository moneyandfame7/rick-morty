import { FC, PropsWithChildren } from 'react'

import { AppBar, Toolbar } from '@mui/material'
import { Box, Typography } from '@mui/joy'

import { Logo } from 'shared/components/Logo'
import { ColorSchemeToggle } from 'shared/components/ColorSchemeToggle'

export const HeaderWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      component='header'
      sx={{
        px: 0,
        alignItems: 'center'
      }}
      bgcolor='background.surface'
    >
      <Toolbar
        sx={{
          px: 3,
          display: 'flex',
          justifyContent: 'space-between'
          // justifyContent: { xs: 'space-between' },
          // width: { xs: '100%', sm: 'max-content' },
          // justifyItems: 'flex-end'
        }}
      >
        <Typography
          fontWeight='lg'
          startDecorator={<Logo fontSize='xl5' fill='#137cff' />}
          sx={{ display: { xs: 'none', sm: 'flex' } }}
        >
          Rick&Morty
        </Typography>
        {children}
      </Toolbar>
    </Box>
  )
}
