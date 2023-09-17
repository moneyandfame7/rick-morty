import React from 'react'
import { type FormikProps } from 'formik'

import { IconButton } from '@mui/material'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'

export const getClearButton = <FormType,>(formik: FormikProps<FormType>, field: string) => {
  return formik.values[field as keyof FormType] ? (
    <IconButton
      onClick={() => {
        formik.setFieldValue(String(field), '')
      }}
      sx={{ mr: 2 }}
    >
      <ClearOutlinedIcon sx={{ width: 16, opacity: 0.7 }} />
    </IconButton>
  ) : null
}
