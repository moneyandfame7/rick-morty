import React, { type FC } from 'react'

import { VerticalStepper } from 'features/authorization/components/steppers'

import { Main } from './Main'
import { Root } from './Root'
import { Wrapper } from './Wrapper'
import { Header } from './Header'
import { Footer } from './Footer'

export const SignupPage: FC = () => {
  return (
    <Root>
      <Wrapper>
        <Header />
        <VerticalStepper />
        <Footer />
      </Wrapper>
      <Main />
    </Root>
  )
}
