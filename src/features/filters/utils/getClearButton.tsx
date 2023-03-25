import { FormikProps } from 'formik'
import { IconButton } from '@mui/material'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import type { FiltersValues } from '../types'

export const getClearButton = (formik: FormikProps<FiltersValues>, field: keyof FiltersValues) => {
  return !!formik.values[field] ? (
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
