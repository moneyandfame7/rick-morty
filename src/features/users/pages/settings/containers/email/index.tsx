import React, { type FC } from 'react'

import { Subheader } from 'features/users/pages/settings/components'
import { Form } from './components/Form'

export const EmailContainer: FC = () => {
  return (
    <>
      <Subheader title="Email settings" />
      <Form />
    </>
  )
}
