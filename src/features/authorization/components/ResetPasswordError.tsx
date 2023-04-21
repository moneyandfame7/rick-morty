import React, { type FC } from 'react'
import { Box, Typography } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning'

import { GoBackButton } from 'features/authorization/components'

interface ResetPasswordErrorProps {
  error: string | undefined
}

export const ResetPasswordError: FC<ResetPasswordErrorProps> = ({ error }) => {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        mx: 'auto',
        gap: 1
      }}
    >
      <WarningIcon sx={{ fontSize: 80, p: 0, borderRadius: '12px' }} color="warning" />
      <Typography variant="h5" fontWeight="500">
        Error
      </Typography>
      <Typography variant="body1" fontWeight={500} textAlign="center" color="warning.main" sx={{ mb: 2 }}>
        {error}
      </Typography>
      <GoBackButton isLoading={false} />
    </Box>
  )
}
