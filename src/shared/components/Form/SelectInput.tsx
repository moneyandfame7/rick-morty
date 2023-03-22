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
  TextFieldProps,
  Theme
} from '@mui/material'
import { DefaultComponentProps } from '@mui/material/OverridableComponent'
import { FC, useState } from 'react'
import { makeStyles } from '@mui/material/styles'

interface SelectInputInterface {
  items: string[]
}

type SelectInputProps = TextFieldProps & SelectInputInterface

export const SelectInput: FC<SelectInputProps> = ({ items, ...props }) => {
  return (
    <TextField
      id={props.name}
      name={props.name}
      select
      onChange={props.onChange}
      value={props.value}
      size='small'
      fullWidth
      {...props}
    >
      {items.map(item => (
        <MenuItem key={item} value={item} sx={{ fontSize: 14, minHeight: '10px' }}>
          {item}
        </MenuItem>
      ))}
    </TextField>
  )
}
