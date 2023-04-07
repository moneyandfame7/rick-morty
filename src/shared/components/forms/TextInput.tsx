import React, { type FC } from 'react'
import { TextField, TextFieldProps } from '@mui/material'

export const TextInput: FC<TextFieldProps> = ({ ...props }) => {
  return (
    <TextField
      size="small"
      variant="outlined"
      sx={{
        '& legend': { display: 'none' },
        '& fieldset': { top: 0 }
      }}
      {...props}
    />
  )
}
