import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FC, useState } from 'react'
import { Box, IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'

interface PasswordInputProps {
  // validate: FormikProps<PasswordValidateObject>
  errorText?: string
  touched?: boolean
}

export const PasswordInput: FC<PasswordInputProps & TextFieldProps> = ({
  value,
  errorText,
  touched,
  onChange,
  onBlur,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <Box component="div" sx={{ position: 'relative' }}>
      <TextField
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        error={!!errorText}
        InputLabelProps={{
          sx: {
            fontSize: props.size === 'small' ? 13 : '1rem'
          }
        }}
        {...props}
        helperText={!!errorText ? errorText : props.helperText}
        FormHelperTextProps={{
          sx: {
            marginLeft: '20px'
          }
        }}
      />
      {errorText && (
        <ErrorIcon sx={{ fontSize: 16, position: 'absolute', bottom: 3, color: '#d93025', left: 0, mr: 20 }} />
      )}
    </Box>
  )
}
