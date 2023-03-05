import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { AvatarMenu } from '../AvatarMenu'
import { HeaderWrapper } from '../Wrapper'

export const ForWelcomePageHeader: FC = () => {
  return (
    <HeaderWrapper>
      <Box component='div' sx={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1, userSelect: 'none' }} fontWeight='bolder'>
          Rick & morty
        </Typography>
      </Box>
      <AvatarMenu isWelcomePage />
    </HeaderWrapper>
  )
}
