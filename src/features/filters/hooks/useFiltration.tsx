import { useSearchParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { isEmpty, omitBy, pick } from 'lodash'

import { type FiltersValues } from 'features/filters/types'

export const useFiltration = (initialFiltersValue: FiltersValues) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const onSubmit = (filters: FiltersValues) => {
    Object.keys(filters).map((key: string) => {
      if (String(filters[key as keyof FiltersValues]).length) {
        searchParams.set(key, String(filters[key as keyof FiltersValues]))
      } else {
        searchParams.delete(key)
      }
    })
    const query = Object.fromEntries(new URLSearchParams(searchParams))
    setSearchParams(query)
  }

  const onReset = () => {
    Object.keys(formik.values).map((key: string) => {
      if (formik.values[key as keyof FiltersValues].length) {
        key === 'take' ? formik.setFieldValue('take', '20') : formik.setFieldValue(key, '')

        if (searchParams.has(key)) {
          key === 'take' ? searchParams.set('take', '20') : searchParams.delete(key)
        }
      }
    })
    const query = Object.fromEntries(new URLSearchParams(searchParams))
    setSearchParams(query)
  }

  const formik = useFormik<FiltersValues>({
    initialValues: {
      ...initialFiltersValue
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit
  })

  const formValues = omitBy(formik.values, isEmpty)
  const formInitialValues = omitBy(formik.initialValues, isEmpty)
  const queryStringObj = pick(Object.fromEntries(new URLSearchParams(searchParams)), Object.keys(formik.values))

  return {
    formValues,
    formInitialValues,
    searchParams,
    onReset,
    queryStringObj,
    formik
  }
}
