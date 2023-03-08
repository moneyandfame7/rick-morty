import React, { FC, useState } from "react";
import {
  alpha,
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  Input, InputBase,
  InputProps, OutlinedInputProps, styled, TextField,
  TextFieldProps,
} from "@mui/material";

interface ValidatedInputProps {
  // validate: FormikProps<PasswordValidateObject>
  errorText?: string;
  touched?: boolean;
  children: React.ReactNode;
}

export const ValidatedInput: FC<ValidatedInputProps & TextFieldProps> = ({
                                                                           value,
                                                                           errorText,
                                                                           touched,
                                                                           onChange,
                                                                           onBlur,
                                                                           children,
                                                                           ...props
                                                                         }) => {
  return (
    <TextField
      value={value}
      error={touched && !!errorText}
      onChange={onChange}
      onBlur={onBlur}
      helperText={touched && errorText ? errorText : ""}
      InputLabelProps={{
        shrink: true,
        // sx: { mb: 5 },
      }}
      {...props}
    />
  );
};
