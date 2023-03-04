import { makeStyles, TextField, TextFieldProps, Theme } from '@mui/material'
import { FormikProps } from 'formik'
import { FC } from 'react'

type ValidateInput = {
  touched?: boolean
  errorText?: string
}
type ValidateInputProps = ValidateInput & TextFieldProps

export const ValidatedInput: FC<ValidateInputProps> = ({
  touched,
  name,
  label,
  value,
  onChange,
  errorText,
  onBlur,
  ...props
}) => {
  return (
    <TextField
      fullWidth
      id={name}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={touched && !!errorText}
      helperText={touched && errorText ? errorText : ''}
      onBlur={onBlur}
      {...props}
    />
  )
}
