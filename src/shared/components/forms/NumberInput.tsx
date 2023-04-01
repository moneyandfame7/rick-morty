import { FC } from 'react'
import { TextField, TextFieldProps } from '@mui/material'

interface NumberInputProps {
  min: number
  max: number
}

export const NumberInput: FC<TextFieldProps & NumberInputProps> = ({ max, min, ...props }) => {
  return (
    <TextField
      size="small"
      variant="outlined"
      type="number"
      sx={{
        '& legend': { display: 'none' },
        '& fieldset': { top: 0 }
      }}
      InputProps={{
        inputProps: {
          max,
          min
        }
      }}
      {...props}
    />
  )
}
