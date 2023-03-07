import { Visibility, VisibilityOff, VisibilityOffRounded } from '@mui/icons-material'
import { FormControl, FormHelperText, FormLabel, IconButton, Input, InputProps } from '@mui/joy'
import { FormikProps } from 'formik'
import { ChangeEvent, FC, FocusEventHandler, useState } from 'react'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { useToggle } from 'shared/hooks'

interface PasswordInputProps {
  // validate: FormikProps<PasswordValidateObject>
  errorText?: string
  touched?: boolean
}

export const PasswordInput: FC<PasswordInputProps & InputProps> = ({ value, errorText, touched, onChange, onBlur }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  // const [state, toggle] = useToggle(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)
  return (
    // <TextField
    //   required
    //   fullWidth
    //   name='password'
    //   label='Password'
    //   type={showPassword ? 'text' : 'password'}
    //   id='password'
    //   autoComplete='password'
    //   value={validate.values.password}
    //   onChange={validate.handleChange}
    //   error={validate.touched.password && !!validate.errors.password}
    //   helperText={validate.touched.password && validate.errors.password ? validate.errors.password : ''}
    //   onBlur={validate.handleBlur}
    //   InputProps={{
    //     endAdornment: (
    //       <InputAdornment position='end'>
    //         <IconButton
    //           aria-label='toggle password visibility'
    //           onClick={handleClickShowPassword}
    //           onMouseDown={handleMouseDownPassword}
    //         >
    //           {showPassword ? <Visibility /> : <VisibilityOff />}
    //         </IconButton>
    //       </InputAdornment>
    //     )
    //   }}
    // />
    <FormControl>
      <FormLabel>Password</FormLabel>
      <Input
        placeholder='••••••••••••••'
        type={showPassword ? 'text' : 'password'}
        autoComplete='password'
        name='password'
        value={value}
        error={touched && !!errorText}
        onChange={onChange}
        onBlur={onBlur}
        endDecorator={
          <IconButton
            aria-label='toggle password visibility'
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <VisibilityRoundedIcon /> : <VisibilityOffRounded />}
          </IconButton>
        }
      />
      {touched && errorText && <FormHelperText sx={{ color: 'danger.solidBg' }}>{errorText}</FormHelperText>}
    </FormControl>
  )
}
