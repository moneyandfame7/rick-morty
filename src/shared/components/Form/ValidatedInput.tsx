import React, { FC, useState } from 'react'
import { Box, TextField, TextFieldProps } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'

interface ValidatedInputProps {
  errorText?: string
}

export const ValidatedInput: FC<ValidatedInputProps & TextFieldProps> = ({
  value,
  errorText,
  onChange,
  onBlur,
  ...props
}) => {
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
        InputLabelProps={{
          sx: {
            fontSize: props.size === 'small' ? 13 : '1rem'
          }
        }}
      />
      {errorText && <ErrorIcon sx={{ fontSize: 16, position: 'absolute', bottom: 3, color: '#d93025', left: 0 }} />}
    </Box>
  )
}
