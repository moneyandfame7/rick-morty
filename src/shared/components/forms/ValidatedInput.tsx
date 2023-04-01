import React, { FC } from 'react'
import { Box, TextField, TextFieldProps } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'

interface ValidateInputInterface {
  errorText?: string
}

type ValidateInputProps = ValidateInputInterface & TextFieldProps

export const ValidatedInput: FC<ValidateInputProps> = ({ value, errorText, onChange, onBlur, ...props }) => {
  return (
    <Box component="div" sx={{ position: 'relative', width: '100%' }}>
      <TextField
        {...props}
        value={value}
        error={!!errorText}
        onChange={onChange}
        onBlur={onBlur}
        helperText={!!errorText ? errorText : props.helperText}
        FormHelperTextProps={{
          sx: {
            marginLeft: '20px'
          }
        }}
      />
      {errorText && <ErrorIcon sx={{ fontSize: 16, position: 'absolute', bottom: 3, color: '#d93025', left: 0 }} />}
    </Box>
  )
}
