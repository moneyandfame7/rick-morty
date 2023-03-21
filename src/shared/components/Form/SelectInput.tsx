import {
  FormControl,
  FormControlTypeMap,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  TextField,
  TextFieldProps
} from '@mui/material'
import { DefaultComponentProps } from '@mui/material/OverridableComponent'
import { FC, useState } from 'react'

interface SelectInputInterface {
  items: string[]
  touched?: boolean
  errorText?: string
}

type SelectInputProps = TextFieldProps & SelectInputInterface

export const SelectInput: FC<SelectInputProps> = ({ items, touched, errorText, ...props }) => {
  return (
    <TextField
      id={props.name}
      name={props.name}
      select
      error={touched && !!errorText}
      helperText={touched && errorText ? errorText : ''}
      onBlur={props.onBlur}
      onChange={props.onChange}
      value={props.value}
      size='small'
      fullWidth
    >
      {items.map(item => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </TextField>
  )
}
