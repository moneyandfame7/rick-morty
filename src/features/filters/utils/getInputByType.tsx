import React from 'react'
import { FormikProps } from 'formik'
import { NumberInput } from 'shared/components/Form/NumberInput'
import { MAX_TAKE, MIN_TAKE } from '../constant'
import { SelectInput } from 'shared/components/Form/SelectInput'
import { getItemsByKey } from './getItemsByKey'
import { TextInput } from 'shared/components/Form/TextInput'
import { FiltersValues, InputType } from '../types'
import { getClearButton } from './getClearButton'
import { setMinMaxValueInput } from './setMinMaxValueInput'

export const getInputByType = (type: InputType, key: keyof FiltersValues, formik: FormikProps<FiltersValues>) => {
  switch (type) {
    case InputType.NUMBER:
      return (
        <NumberInput
          id={key}
          name={key}
          onChange={e => {
            formik.setFieldValue(key, String(e.target.value))
          }}
          onBlur={e => {
            setMinMaxValueInput(e, formik, key)
          }}
          value={formik.values[key]}
          sx={{ width: 100 }}
          max={MAX_TAKE}
          min={MIN_TAKE}
        />
      )
    case InputType.SELECT:
      return (
        <SelectInput
          id={key}
          name={key}
          onChange={formik.handleChange}
          items={getItemsByKey(key)}
          value={formik.values[key]}
          sx={{ width: 200 }}
          InputProps={{
            endAdornment: getClearButton(formik, key)
          }}
        />
      )
    case InputType.TEXT:
      return (
        <TextInput
          id={key}
          name={key}
          onChange={formik.handleChange}
          value={formik.values[key]}
          sx={{ width: 200 }}
          InputProps={{
            endAdornment: getClearButton(formik, key),
            sx: {
              pr: '6px'
            }
          }}
        />
      )
  }
}
