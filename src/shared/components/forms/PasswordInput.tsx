import React, { FC } from 'react'
import { Box, TextField, TextFieldProps } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'

interface PasswordInputProps {
  errorText?: string
}

export const PasswordInput: FC<PasswordInputProps & TextFieldProps> = ({ value, errorText, onChange, ...props }) => {
  return (
    <Box component="div" sx={{ position: 'relative' }}>
      <TextField
        {...props}
        type={'password'}
        value={value}
        onChange={onChange}
        error={!!errorText}
        helperText={errorText ? errorText : props.helperText}
        FormHelperTextProps={{
          sx: {
            marginLeft: '20px'
          }
        }}
      />
      {errorText && (
        <ErrorIcon
          sx={{
            fontSize: 16,
            position: 'absolute',
            bottom: 3,
            color: '#d93025',
            left: 0,
            mr: 20
          }}
        />
      )}
    </Box>
  )
}
