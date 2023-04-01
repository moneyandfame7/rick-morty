import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, Typography } from '@mui/material'

import { GoBackButton } from 'features/authorization/components'
import { HOME_ROUTE } from 'shared/routes'
import { SuccessIcon } from 'shared/components/common/icons'

export const SuccessReset = () => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate({ pathname: HOME_ROUTE.path })
  }
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mx: 'auto',
        gap: 1,
        width: '80%'
      }}
    >
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
      <Button fullWidth variant="contained" sx={{ m: '20px 0 30px' }} onClick={onClick}>
        Continue
      </Button>

      <GoBackButton />
    </Box>
  )
}
