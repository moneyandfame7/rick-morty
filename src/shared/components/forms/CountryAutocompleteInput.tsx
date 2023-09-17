import React, { type FC } from 'react'
import { Autocomplete, Box, TextField, type AutocompleteValue } from '@mui/material'

export interface CountryData {
  value: string
  label: string
}

interface CountryAutocompleteInputProps {
  items: CountryData[]
  errorText?: string
  value?: CountryData
  disabled: boolean
  onChange: (
    event: React.SyntheticEvent,
    value: AutocompleteValue<CountryData, undefined, undefined, undefined>
  ) => void
}

export const CountryAutocompleteInput: FC<CountryAutocompleteInputProps> = ({ items, value, errorText, onChange }) => {
  return (
    <Autocomplete
      isOptionEqualToValue={(option, value) => {
        return option?.value === value?.value
      }}
      value={value}
      sx={{ minWidth: '150px' }}
      id="autocomplete-country-id"
      getOptionLabel={option => (option ? option.label : '')}
      options={items}
      onChange={onChange}
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
          helperText={errorText ? errorText : ''}
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
