import React, { FC } from 'react'

import { Box, Typography } from '@mui/material'
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined'

import { PrimaryIcon, SuccessIcon } from 'shared/components/common/icons'

const Reset: FC = () => {
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
      <PrimaryIcon icon={<KeyOutlinedIcon />} />
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
