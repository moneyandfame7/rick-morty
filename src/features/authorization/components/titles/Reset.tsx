import React, { type FC } from 'react'

import { Box, Typography, useTheme } from '@mui/material'
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined'

import { BaseIcon, SuccessIcon } from 'shared/components/icons'

const Reset: FC = () => {
  const theme = useTheme()
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1
      }}
    >
      <BaseIcon icon={<KeyOutlinedIcon />} color={theme.palette.primary.main} />
      <Typography variant="h5" fontWeight="500">
        Set new password
      </Typography>
      <Typography variant="body2" fontWeight="500" color="text.secondary" textAlign="center">
        Your new password must be different to previously used passwords.
      </Typography>
    </Box>
  )
}
const Success: FC = () => {
  return (
    <>
      <SuccessIcon />
      <Typography variant="h5" fontWeight="600" textAlign="center">
        Reset password success
      </Typography>
      <Typography
        variant="body2"
        fontWeight="500"
        color="text.secondary"
        textAlign="center"
        sx={{
          maxWidth: '80%'
        }}
      >
        Your password has been successfully reset. Click bellow to log in magically
      </Typography>
    </>
  )
}

export default {
  Reset,
  Success
}
