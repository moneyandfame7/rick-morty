import React, { type FC } from 'react'
import { Autocomplete, Box, TextField, type TextFieldProps } from '@mui/material'

export interface CountryData {
  value: string
  label: string
}

interface CountryAutocompleteInputInterface {
  items: CountryData[]
  errorText?: string
  setFieldValue: (field: string, value: string | undefined) => void
  defaultValue?: CountryData
}

type CountryAutocompleteInputProps = CountryAutocompleteInputInterface & TextFieldProps
export const CountryAutocompleteInput: FC<CountryAutocompleteInputProps> = ({
  items,
  setFieldValue,
  defaultValue,
  errorText,
  ...props
}) => {
  return (
    <Autocomplete
      isOptionEqualToValue={(option, value) => option.value === value.value}
      defaultValue={defaultValue}
      sx={{ minWidth: '150px' }}
      id="autocomplete-country-id"
      getOptionLabel={(option: CountryData) => option.label}
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
        <TextField
          label="Country"
          name="country"
          autoComplete="off"
          error={!!errorText}
          helperText={errorText ? errorText : props.helperText}
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off' // disable autocomplete and autofill,
          }}
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  )
}
