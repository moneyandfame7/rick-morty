import React, { type FC } from 'react'
import { Box, MenuItem, TextField, TextFieldProps, Typography } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'

interface SelectInputInterface {
  items: string[]
  errorText?: string
}

type SelectInputProps = TextFieldProps & SelectInputInterface

export const SelectInput: FC<SelectInputProps> = ({ items, errorText, ...props }) => {
  return (
    <Box component="div" sx={{ position: 'relative', width: '100%' }}>
      <TextField
        id={props.name}
        name={props.name}
        select
        onChange={props.onChange}
        value={props.value}
        size="small"
        fullWidth
        {...props}
        sx={{ py: 0 }}
        error={!!errorText}
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
      >
        {items.map(item => (
          <MenuItem key={item} value={item} sx={{ fontSize: 14, minHeight: '10px' }} disableRipple>
            {item}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  )
}
