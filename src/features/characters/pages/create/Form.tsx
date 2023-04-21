import React, { type FC } from 'react'
import { type FormikProps } from 'formik'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Grid, Stack } from '@mui/material'

import type { CreateCharacter } from 'features/characters/type'
import { getClearButton, getItemsByKey } from 'features/filters/utils'

import { SelectInput, ValidatedInput } from 'shared/components/forms'
import { PrimaryButton } from 'shared/components/common/buttons'

interface CreateCharacterFormProps {
  formik: FormikProps<CreateCharacter>
  serverError: { [key: string]: string | undefined } | undefined
  isLoading: boolean
}
export const CreateCharacterForm: FC<CreateCharacterFormProps> = ({ formik, serverError, isLoading }) => {
  const [parent] = useAutoAnimate()
  return (
    <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
      <Stack direction="column" component="form" noValidate onSubmit={formik.handleSubmit} gap={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} width="100%" ref={parent}>
            <ValidatedInput
              fullWidth
              name="name"
              label="Name"
              size="small"
              value={formik.values.name}
              onChange={formik.handleChange}
              errorText={formik.errors.name || serverError?.image}
            />
          </Grid>
          <Grid item xs={12} sm={6} width="100%">
            <ValidatedInput
              fullWidth
              name="type"
              label="Type"
              size="small"
              value={formik.values.type}
              onChange={formik.handleChange}
              errorText={formik.errors.type}
            />
          </Grid>
          <Grid item xs={12} sm={6} width="100%">
            <SelectInput
              fullWidth
              name="species"
              label="Species"
              autoComplete="off"
              onChange={formik.handleChange}
              items={getItemsByKey('species')}
              value={formik.values.species}
              errorText={formik.errors.species}
              InputProps={{
                endAdornment: getClearButton(formik, 'species')
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} width="100%">
            <SelectInput
              fullWidth
              name="status"
              label="Status"
              autoComplete="off"
              onChange={formik.handleChange}
              items={getItemsByKey('status')}
              value={formik.values.status}
              errorText={formik.errors.status}
              InputProps={{
                endAdornment: getClearButton(formik, 'status')
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} width="100%">
            <SelectInput
              fullWidth
              name="gender"
              label="Gender"
              autoComplete="off"
              onChange={formik.handleChange}
              items={getItemsByKey('gender')}
              value={formik.values.gender}
              errorText={formik.errors.gender}
              InputProps={{
                endAdornment: getClearButton(formik, 'gender')
              }}
            />
          </Grid>
        </Grid>
        <PrimaryButton type="submit" loading={isLoading}>
          Submit
        </PrimaryButton>
      </Stack>
    </Grid>
  )
}
