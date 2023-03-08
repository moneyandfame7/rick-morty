import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FC, useState } from "react";
import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";

interface PasswordInputProps {
  // validate: FormikProps<PasswordValidateObject>
  errorText?: string;
  touched?: boolean;
}

export const PasswordInput: FC<PasswordInputProps & TextFieldProps> = ({
                                                                         value,
                                                                         errorText,
                                                                         touched,
                                                                         onChange,
                                                                         onBlur,
                                                                         ...props
                                                                       }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [state, toggle] = useToggle(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <TextField
      name="password"
      label="Password"
      type={showPassword ? "text" : "password"}
      id="password"
      autoComplete="password"
      value={value}
      onChange={onChange}
      error={touched && !!errorText}
      helperText={touched && errorText ? errorText : ""}
      onBlur={onBlur}
      placeholder="•••••••"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />

  );
};
