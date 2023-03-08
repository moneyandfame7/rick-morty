import { FC, PropsWithChildren } from 'react'
import { Box, Toolbar, Typography } from '@mui/material'

export const HeaderWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      component='header'
      sx={{
        px: 0,
        alignItems: 'center'
      }}
      bgcolor='background.paper'
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
        <Typography fontWeight={600} sx={{ display: { xs: 'none', sm: 'flex' } }}>
          Rick&Morty
        </Typography>
        {children}
      </Toolbar>
    </Box>
  )
}
