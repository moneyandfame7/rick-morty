import type React from 'react'
import { type FormikProps } from 'formik'
import { type FiltersValues } from '../types'
import { MAX_TAKE, MIN_TAKE } from '../constant'

/*todo: можливо винести в shared, і зробити тут generic для FormikProps?*/
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
