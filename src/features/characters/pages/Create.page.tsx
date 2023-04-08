import React, { FC, createContext, useState } from 'react'

import { Box, Container, Stack, Typography, useTheme } from '@mui/material'

import { useCreateCharacter } from 'features/characters/hooks'
import { ValidatedInput } from 'shared/components/forms'
import { UploadButton } from 'shared/components/common/buttons/UploadButton'
import { PrimaryButton } from 'shared/components/common/buttons'
import Image from 'mui-image'

interface CreateCharacterContextType {
  previewImage: ArrayBuffer | string | null
  setPreviewImage: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
}

export const CreateCharacterContext = createContext<CreateCharacterContextType>({
  previewImage: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPreviewImage: () => {}
})
export const CreateCharacterPage: FC = () => {
  const theme = useTheme()
  const { formik, isLoading, error } = useCreateCharacter()
  const [previewImage, setPreviewImage] = useState<ArrayBuffer | string | null>(null)
  return (
    <CreateCharacterContext.Provider value={{ previewImage, setPreviewImage }}>
      <Container maxWidth="sm">
        <Typography variant="h5">CREATE CHARACTER PAGE</Typography>
        <Box
          sx={{ border: '1px solid', my: 3, borderColor: theme.palette.divider, height: '200px', borderRadius: '8px' }}
        >
          {typeof previewImage === 'string' && (
            <Image
              src={previewImage}
              height="100%"
              width="100%"
              duration={300}
              style={{
                borderRadius: '8px'
              }}
            />
          )}
        </Box>

        <Stack direction="column" component="form" noValidate onSubmit={formik.handleSubmit} gap={3}>
          <ValidatedInput
            size="small"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            fullWidth
            label="Name"
            errorText={formik.errors.name}
          />
          <ValidatedInput
            size="small"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            fullWidth
            label="Type"
            errorText={formik.errors.type}
          />
          <ValidatedInput
            size="small"
            name="species"
            value={formik.values.species}
            onChange={formik.handleChange}
            fullWidth
            label="Species"
            errorText={formik.errors.species}
          />
          <ValidatedInput
            size="small"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            fullWidth
            label="Status"
            errorText={formik.errors.status}
          />
          <ValidatedInput
            size="small"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            fullWidth
            label="Gender"
            errorText={formik.errors.gender}
          />

          <UploadButton formik={formik} />

          <PrimaryButton type="submit" loading={isLoading}>
            Submit
          </PrimaryButton>
        </Stack>
      </Container>
    </CreateCharacterContext.Provider>
  )
}
