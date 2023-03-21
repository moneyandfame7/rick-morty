import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { AvatarMenu } from '../AvatarMenu'
import { HeaderWrapper } from '../Wrapper'

export const WelcomePageHeader: FC = () => {
  return (
    <HeaderWrapper sx={{ justifyContent: 'flex-end' }}>
      <AvatarMenu isWelcomePage />
    </HeaderWrapper>
  )
}
