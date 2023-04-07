import React, { FC, PropsWithChildren } from 'react'
import { Box, Container as MuiContainer } from '@mui/material'

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MuiContainer sx={{ width: { xs: '100%', sm: '450px' }, p: { xs: 0 }, mt: { xs: 7, sm: 10 } }}>
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
          mx: 'auto',
          gap: 4
        }}
      >
        {children}
      </Box>
    </MuiContainer>
  )
}
