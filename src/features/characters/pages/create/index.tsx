import React, { type FC } from 'react'

import { Container, Grid, Typography } from '@mui/material'

import { characterHandler } from '@features/authorization/services'
import { useCreateCharacter } from '@features/characters/hooks'
import { UploadCharacterImage } from '@features/characters/components'

import { Alert } from '@shared/components'

import { CreateCharacterForm } from './Form'
import { SuccessfullyCreatedDialog } from './Dialog'

export const CreateCharacterPage: FC = () => {
  const { formik, isLoading, data, error } = useCreateCharacter()
  const serverError = characterHandler(error)

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {serverError?.character && <Alert variant="error" text={serverError.character} />}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Create new character.
      </Typography>
      <Grid container spacing={5}>
        <CreateCharacterForm formik={formik} serverError={serverError} isLoading={isLoading} />
        <UploadCharacterImage formik={formik} errorText={serverError?.image} />
      </Grid>
      {data && <SuccessfullyCreatedDialog createdCharacter={data} />}
    </Container>
  )
}
