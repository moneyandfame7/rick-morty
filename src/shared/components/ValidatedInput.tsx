import { Visibility, VisibilityOff, VisibilityOffRounded } from '@mui/icons-material'
import { FormControl, FormHelperText, FormLabel, IconButton, Input, InputProps } from '@mui/joy'
import { FormikProps } from 'formik'
import { ChangeEvent, FC, FocusEventHandler, useState } from 'react'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { useToggle } from 'shared/hooks'

interface ValidatedInputProps {
  // validate: FormikProps<PasswordValidateObject>
  errorText?: string
  touched?: boolean
}

export const ValidatedInput: FC<ValidatedInputProps & InputProps> = ({
  value,
  errorText,
  touched,
  onChange,
  onBlur,
  children,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <FormControl>
      <FormLabel>{children}</FormLabel>
      <Input {...props} value={value} error={touched && !!errorText} onChange={onChange} onBlur={onBlur} />
      {touched && errorText && <FormHelperText sx={{ color: 'danger.solidBg' }}>{errorText}</FormHelperText>}
    </FormControl>
  )
}
