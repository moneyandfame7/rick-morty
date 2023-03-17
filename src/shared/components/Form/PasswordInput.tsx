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
  // const [state, toggle] = useToggle(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  return (
    <Box component='div' sx={{ position: 'relative' }}>
      <TextField
        type={showPassword ? 'text' : 'password'}
        // autoComplete='password'
        value={value}
        onChange={onChange}
        error={!!errorText}
        helperText={!!errorText ? errorText : ''}
        /*   InputProps={{
          startAdornment: <></>,
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }} */
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
        {...props}
      />
      {errorText && <ErrorIcon sx={{ fontSize: 16, position: 'absolute', bottom: 3, color: '#d93025', left: 0 }} />}
    </Box>
  )
}