import { FC } from 'react'
import { MenuItem, TextField, TextFieldProps } from '@mui/material'

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
      size="small"
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
