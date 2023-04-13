import React, { FC } from 'react'
import { Autocomplete, Box, TextFieldProps } from '@mui/material'

import { ValidatedInput } from '@shared/components/forms/ValidatedInput'

export interface CountryData {
  value: string
  label: string
}

interface CountryAutocompleteInputInterface {
  items: CountryData[]
  errorText?: string
  setFieldValue: (field: string, value: string | undefined) => void
}

type CountryAutocompleteInputProps = CountryAutocompleteInputInterface & TextFieldProps
export const CountryAutocompleteInput: FC<CountryAutocompleteInputProps> = ({
  items,
  setFieldValue,
  errorText,
  ...props
}) => {
  return (
    <Autocomplete
      sx={{ minWidth: '150px' }}
      id="autocomplete-country-id"
      getOptionLabel={option => option.label}
      options={items}
      onChange={(e, value) => {
        setFieldValue('country', value?.value)
      }}
      size="small"
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.value.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.value.toLowerCase()}.png 2x`}
            alt={option.label}
          />
          {option.label} ({option.value})
        </Box>
      )}
      renderInput={params => (
        <ValidatedInput
          name="country"
          label="Country"
          error={!!errorText}
          errorText={errorText}
          helperText={errorText ? errorText : props.helperText}
          autoComplete="shipping country"
          {...params}
        />
      )}
    />
  )
}
