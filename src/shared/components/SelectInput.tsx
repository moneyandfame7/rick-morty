import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { FC, useState } from 'react'

interface SelectInputProps {
  items: string[]
  label: string
}

export const SelectInput: FC<SelectInputProps> = ({ items, label }) => {
  const [value, setValue] = useState<string>('')
  const onChange = (event: SelectChangeEvent) => {
    setValue(event.target.value)
  }
  
  return (
    <FormControl required sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id='demo-simple-select-required-label'>Age</InputLabel>
      <Select
        labelId='demo-simple-select-required-label'
        id='demo-simple-select-required'
        value={value}
        label={label}
        onChange={onChange}
      >
        {items.map(item => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Required</FormHelperText>
    </FormControl>
  )
}
