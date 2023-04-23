import React, { type FC } from 'react'
import { Link } from 'react-router-dom'

import { Tooltip, Box, Stack } from '@mui/material'

import { LOGIN_ROUTE, SIGNUP_ROUTE } from 'features/authorization/routes'

import { LinkButton } from 'shared/components/common/buttons'
import { Logo } from 'shared/components/icons'
import { HOME_ROUTE } from 'shared/routes'

import { HeaderWrapper } from './Wrapper'

export const UnauthorizedHeader: FC = () => {
  return (
    <HeaderWrapper>
      <Tooltip title="Home">
        <Box component={Link} to={{ pathname: HOME_ROUTE.path }} sx={{ textDecoration: 'none' }}>
          <Logo sx={{ display: { xs: 'none', sm: 'flex' } }} />
        </Box>
      </Tooltip>
      <Stack direction="row" alignItems="center" gap={2}>
        <LinkButton variant="outlined" size="small" to={{ pathname: LOGIN_ROUTE.path }}>
          Login
        </LinkButton>
        <LinkButton size="small" to={{ pathname: SIGNUP_ROUTE.path }}>
          Signup
        </LinkButton>
      </Stack>
    </HeaderWrapper>
  )
}
