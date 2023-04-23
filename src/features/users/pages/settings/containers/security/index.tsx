import React, { type FC } from 'react'

import { Subheader } from 'features/users/pages/settings/components'
import { Form } from './components/Form'

export const SecurityContainer: FC = () => {
  return (
    <React.Fragment>
      <Subheader title="Change password" />
      <Form />
    </React.Fragment>
  )
}
