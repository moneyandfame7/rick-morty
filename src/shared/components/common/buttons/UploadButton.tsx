import React, { useState, type FC, useContext } from 'react'
import { FormikProps } from 'formik'

import { styled, useTheme } from '@mui/material'

import type { CreateCharacter } from 'features/characters/type'
import { useBaseButtonStyles } from './baseButtonStyles'
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined'
import { CreateCharacterContext } from 'features/characters/pages'
interface UploadButtonProps {
  formik: FormikProps<CreateCharacter>
}
const StyledUploadButton = styled('label')<{ color: string }>(({ theme, color }) => ({
  ...useBaseButtonStyles(color || theme.palette.primary.main),
  padding: '8px 14px',
  fontSize: '14px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer'
}))

export const UploadButton: FC<UploadButtonProps> = ({ formik }) => {
  const theme = useTheme()
  const { setPreviewImage } = useContext(CreateCharacterContext)
  const [fileName, setFileName] = useState<string | null>(null)
  return (
    <StyledUploadButton color={theme.palette.success.main}>
      {fileName || 'Upload image'}
      <CollectionsOutlinedIcon />
      <input
        type="file"
        name="image"
        hidden
        onChange={e => {
          const reader = new FileReader()
          if (e.currentTarget.files) {
            const image = e.currentTarget.files[0]
            formik.setFieldValue('image', image)
            setFileName(image.name)
            reader.onloadend = () => {
              setPreviewImage(reader.result)
              formik.setFieldValue('image', image)
            }
            reader.readAsDataURL(image)
          }
        }}
      />
    </StyledUploadButton>
  )
}
