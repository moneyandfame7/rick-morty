import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { FormikProps } from 'formik'
import { FC, useState } from 'react'

interface PasswordValidateObject {
  password: string
  email: string
}
interface PasswordInputProps {
  validate: FormikProps<PasswordValidateObject>
}

export const PasswordInput: FC<PasswordInputProps> = ({ validate }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)
  return (
    <TextField
      required
      fullWidth
      name='password'
      label='Password'
      type={showPassword ? 'text' : 'password'}
      id='password'
      autoComplete='password'
      value={validate.values.password}
      onChange={validate.handleChange}
      error={validate.touched.password && !!validate.errors.password}
      helperText={validate.touched.password && validate.errors.password ? validate.errors.password : ''}
      onBlur={validate.handleBlur}
      InputProps={{
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
      }}
    />
  )
}
