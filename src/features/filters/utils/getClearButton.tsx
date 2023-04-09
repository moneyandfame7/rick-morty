import React from 'react'
import { FormikProps } from 'formik'

import { IconButton } from '@mui/material'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'

export const getClearButton = (formik: FormikProps<any>, field: string) => {
  return formik.values[field] ? (
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
