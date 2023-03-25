import React from 'react'
import { FormikProps } from 'formik'
import { FiltersValues } from '../types'
import { MAX_TAKE, MIN_TAKE } from '../constant'

export const setMinMaxValueInput = (
  e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  formik: FormikProps<FiltersValues>,
  key: keyof FiltersValues
) => {
  const value = parseInt(e.target.value)
  if (value > MAX_TAKE) {
    formik.setFieldValue(key, String(MAX_TAKE))
  } else if (value < MIN_TAKE) {
    formik.setFieldValue(key, String(MIN_TAKE))
  }
}
