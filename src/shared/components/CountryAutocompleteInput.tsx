import { Autocomplete, Box, TextField, TextFieldProps } from '@mui/material'
import console from 'console'
import { CountryData } from 'features/authorization/type'
import { UserWelcomeDetails } from 'features/users/type'
import { FormikProps } from 'formik'
import { FC } from 'react'

interface CountryAutocompleteInputInterface {
  items: CountryData[]
  touched?: boolean
  errorText?: string
  setFieldValue: (field: string, value: string | undefined) => void
}
type CountryAutocompleteInputProps = CountryAutocompleteInputInterface & TextFieldProps
export const CountryAutocompleteInput: FC<CountryAutocompleteInputProps> = ({
  items,
  touched,
  name,
  label,
  value,
  onChange,
  setFieldValue,
  errorText,
  onBlur,
  ...props
}) => {
  return (
    <Autocomplete
      fullWidth={props.fullWidth}
      id='autocomplete-country-id'
      getOptionLabel={option => option.label}
      options={items}
      onChange={(e, value) => {
        setFieldValue('country', value?.value)
      }}
      size='small'
      renderOption={(props, option) => (
        <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading='lazy'
            width='20'
            src={`https://flagcdn.com/w20/${option.value.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.value.toLowerCase()}.png 2x`}
            alt=''
          />
          {option.label} ({option.value})
        </Box>
      )}
      renderInput={params => (
        <TextField
          name='country'
          label='Country'
          onBlur={onBlur}
          error={!!errorText && touched}
          helperText={touched && errorText ? errorText : ''}
          autoComplete='shipping country'
          {...params}
        />
      )}
    />
  )
}
