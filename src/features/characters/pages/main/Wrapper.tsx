import React, { type PropsWithChildren, type FC } from 'react'

import { Container } from '@mui/material'

export const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 5,
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}
    >
      {children}
    </Container>
  )
}
