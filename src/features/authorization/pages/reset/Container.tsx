import { FC, PropsWithChildren } from 'react'
import MuiContainer from '@mui/material/Container'

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MuiContainer sx={{ width: { xs: '100%', sm: '450px' }, p: { xs: 0 }, mt: { xs: 7, sm: 10 } }}>
      {children}
    </MuiContainer>
  )
}
