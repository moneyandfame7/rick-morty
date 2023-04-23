import React, { useCallback, type FC } from 'react'

import { Box, Checkbox, Stack, Typography } from '@mui/material'

import { useAppSelector } from 'application/store'

import type { User } from 'features/users/type'
import { Subheader } from 'features/users/pages/settings/components'
import { selectCurrentUser } from 'features/users/services'
import { useEditSettings } from 'features/users/hooks'
import { OutlinedButton } from 'shared/components/common/buttons'
import { ValidatedInput } from 'shared/components/forms'
import { emailValidationSchema } from 'shared/utils'
import { authHandler } from 'features/authorization/services'
import { Form } from './components/Form'

export const EmailContainer: FC = () => {
  return (
    <>
      <Subheader title="Email settings" />
      <Form />
    </>
  )
}
