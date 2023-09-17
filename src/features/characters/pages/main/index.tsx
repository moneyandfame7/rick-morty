import React, { type FC } from 'react'

import { Title } from './Title'
import { Wrapper } from './Wrapper'
import { Paper } from './Paper'
import { Main } from './Main'

export const MainCharacterPage: FC = () => {
  return (
    <Wrapper>
      <Title />
      <Paper>
        <Main />
      </Paper>
    </Wrapper>
  )
}
