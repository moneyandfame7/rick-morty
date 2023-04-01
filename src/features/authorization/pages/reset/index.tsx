import React, { FC } from 'react'

import { Box } from '@mui/material'

import { errorHandler, GoBackButton, ResetPasswordError, SuccessReset } from 'features/authorization/components'
import { ResetTitle } from 'features/authorization/components/titles'
import { ResetPasswordForm } from 'features/authorization/components/forms'
import { useReset } from 'features/authorization/hooks'

import { Container } from './Container'

export const ResetPasswordPage: FC = () => {
  const { isLoading, formik, isSuccess, error } = useReset()
  const badCredentials = errorHandler(error)

  const showError = () => {
    if (!badCredentials) {
      return null
    }
    if ('id' in badCredentials) {
      return <ResetPasswordError error={badCredentials.id} />
    } else if ('token' in badCredentials) {
      return <ResetPasswordError error={badCredentials.token} />
    }
  }
  return (
    <Container>
      {!badCredentials?.id && !badCredentials?.token && !isSuccess && (
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            mx: 'auto',
            gap: 4
          }}
        >
          <ResetTitle.Reset />

          <ResetPasswordForm isLoading={isLoading} formik={formik} badCredentials={badCredentials} />
          <GoBackButton isLoading={isLoading} />
        </Box>
      )}
      {showError()}
      {isSuccess && <SuccessReset />}
    </Container>
  )
}
