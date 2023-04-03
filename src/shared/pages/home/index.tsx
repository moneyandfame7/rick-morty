import React, { FC } from 'react'
import { Divider, Stack } from '@mui/material'

import { HomeTitle } from './Title'
import { Metrics } from './Metrics'
import { CharacterImageList } from './CharacterImageList'

export const HomePage: FC = () => {
  return (
    <Stack direction="column" gap={3} alignItems="center">
      <HomeTitle />
      <Metrics />
      <Divider component="div" role="presentation" sx={{ width: '85%' }} />
      <CharacterImageList />
    </Stack>
  )
}
