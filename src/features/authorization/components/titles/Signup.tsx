import React, { FC } from 'react'
import { Stack, Typography, useTheme } from '@mui/material'

import { LogoIcon } from '@shared/components/common/icons/LogoIcon'

const CreateAccount: FC = () => {
  const theme = useTheme()
  return (
    <Stack direction="column" gap="5px" alignItems="center">
      <LogoIcon color={theme.palette.primary.dark} />
      <Typography variant="h5" fontWeight="500" textAlign="center">
        Create an account
      </Typography>
      <Typography variant="body2" fontWeight="500" color="text.secondary" textAlign="center">
        Provide your email and password please.
      </Typography>
    </Stack>
  )
}

const Welcome: FC = () => {
  const theme = useTheme()

  return (
    <Stack direction="column" gap="5px" alignItems="center">
      <LogoIcon color={theme.palette.primary.dark} />
      <Typography variant="h5" fontWeight="500" textAlign="center">
        Welcome!
      </Typography>
      <Typography variant="body2" fontWeight="500" color="text.secondary" textAlign="center">
        Just a few questions to provide you with the best possible experience.
      </Typography>
    </Stack>
  )
}

export default {
  CreateAccount,
  Welcome
}
