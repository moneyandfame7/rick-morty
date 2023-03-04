import { TextField } from '@mui/material'
import { FormikProps } from 'formik'
import { FC } from 'react'

interface EmailValidateObject {
  password: string
  email: string
}
interface EmailInputProps {
  validate: FormikProps<EmailValidateObject>
}

export const EmailInput: FC<EmailInputProps> = ({ validate }) => {
  return (
    <TextField
      required
      fullWidth
      id='email'
      label='Email Address'
      name='email'
      autoComplete='email'
      value={validate.values.email}
      onChange={validate.handleChange}
      error={validate.touched.email && !!validate.errors.email}
      helperText={validate.touched.email && validate.errors.email ? validate.errors.email : ''}
      onBlur={validate.handleBlur}
    />
  )
}
