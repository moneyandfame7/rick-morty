import React, { FC } from 'react'

import { Root } from './Root'
import { Side } from './Side'
import { Wrapper } from './Wrapper'
import { Header } from './Header'
import { Content } from './Content'
import { Footer } from './Footer'

export const LoginPage: FC = () => {
  return (
    <Root>
      <Wrapper>
        <Header />
        <Content />
        <Footer />
      </Wrapper>
      <Side />
    </Root>
  )
}
