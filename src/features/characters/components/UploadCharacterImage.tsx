import React, { useEffect, type FC, useState, useCallback } from 'react'

import { FormikProps } from 'formik'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useDropzone } from 'react-dropzone'

import { Alert, Box, Grid, IconButton, Stack, Typography, darken, lighten, useTheme } from '@mui/material'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'

import { CreateCharacter } from 'features/characters/type'
import { BaseIcon } from 'shared/components/common/icons'

interface UploadCharacterImageProps {
  formik: FormikProps<CreateCharacter>
  errorText?: string
}
const convertSize = (size: number) => {
  if (size.toString().length <= 6) {
    return Number((size / 1000).toFixed(1)) + ' KB'
  } else {
    return Number((size / 1000 / 1000).toFixed(1)) + ' MB'
  }
}
export const UploadCharacterImage: FC<UploadCharacterImageProps> = ({ formik }) => {
  const theme = useTheme()
  const [parent] = useAutoAnimate({ duration: 150, easing: 'ease-out' })

  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFile(acceptedFiles[0])
  }, [])
  const onDeleteImage = () => {
    setUploadedFile(null)
    formik.setFieldValue('image', null)
  }
  const { acceptedFiles, getRootProps, getInputProps, isFocused } = useDropzone({ onDrop })

  useEffect(() => {
    if (acceptedFiles[0]) {
      formik.setFieldValue('image', acceptedFiles[0])
    }
  }, [acceptedFiles])

  return (
    <Grid item xs={12} md={6} ref={parent} sx={{ userSelect: 'none', order: { xs: 1, md: 2 } }}>
      {uploadedFile ? (
        <Stack
          sx={{
            border: '1px solid',
            borderColor: theme.palette.divider,
            borderRadius: '12px',
            padding: '16px',
            alignItems: 'start'
          }}
          direction="row"
          justifyContent="space-between"
        >
          <BaseIcon color={theme.palette.primary.main} icon={<InsertDriveFileOutlinedIcon sx={{ fontSize: 15 }} />} />
          <Box width="100%" sx={{ ml: 3 }}>
            <Typography fontSize={14} fontWeight={600} color="text.secondary">
              {uploadedFile.name}
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              {convertSize(uploadedFile.size)}
            </Typography>
          </Box>
          <IconButton onClick={onDeleteImage}>
            <DeleteOutlineOutlinedIcon sx={{ fontSize: '20px' }} />
          </IconButton>
        </Stack>
      ) : (
        <Box>
          <Box
            sx={{
              ':hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? lighten(theme.palette.background.default, 0.03)
                    : darken(theme.palette.background.default, 0.03)
              },
              border: '1px solid',
              borderColor: theme.palette.divider,
              transition: 'all 0.3s ease',
              boxShadow: isFocused ? `0 0 10px ${theme.palette.primary.main}` : undefined,
              borderRadius: '12px',
              p: '16px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              userSelect: 'none'
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <BaseIcon icon={<CloudUploadOutlinedIcon />} color={theme.palette.grey[400]} />
            <Typography fontWeight={500}>
              <strong style={{ color: theme.palette.primary.main, fontWeight: 600 }}>Click to upload</strong> or drag
              and drop
            </Typography>

            <Typography color="text.secondary" fontWeight={500} component="span">
              {' '}
              SVG, PNG, JPG or JPEG (max. 800x400px)
            </Typography>
          </Box>
          {formik.errors.image && (
            <Alert severity="error" sx={{ fontSize: '11px', mt: 2, alignItems: 'center' }}>
              <strong>{formik.errors.image}</strong>
            </Alert>
          )}
        </Box>
      )}
    </Grid>
  )
}
