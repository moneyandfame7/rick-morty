import React, { type FC } from 'react'

import { Box, TextField, TextFieldProps, Typography } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'

interface ValidateInputInterface {
  errorText?: string
}

type ValidateInputProps = ValidateInputInterface & TextFieldProps

export const ValidatedInput: FC<ValidateInputProps> = ({ value, errorText, onChange, onBlur, ...props }) => {
  return (
    <Box component="div" sx={{ position: 'relative', width: '100%' }}>
      <TextField
        {...props}
        value={value}
        error={!!errorText}
        onChange={onChange}
        onBlur={onBlur}
        helperText={
          <Typography component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {errorText ? (
              <>
                <ErrorIcon
                  sx={{
                    fontSize: 16,
                    color: '#d93025'
                  }}
                />
                <Typography component="span" color="error.main" fontSize="11px" fontWeight="500">
                  {errorText}
                </Typography>
              </>
            ) : (
              <Typography component="span">{props.helperText}</Typography>
            )}
          </Typography>
        }
        FormHelperTextProps={{
          sx: {
            ml: '3px'
          }
        }}
      />
    </Box>
  )
}
