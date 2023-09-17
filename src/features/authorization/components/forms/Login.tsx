import React, { type FC, useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { Box, Link, Stack, Typography } from '@mui/material'

import { useAppSelector } from 'application/store'

import { useLogin } from 'features/authorization/hooks'
import { errorHandler, selectIsAuthenticated } from 'features/authorization/services'

import { HOME_ROUTE } from 'shared/routes'
import { ValidatedInput } from 'shared/components/forms'
import { PasswordInput } from 'shared/components/forms'
import { PrimaryButton } from 'shared/components/common/buttons'

export const LoginForm: FC = () => {
  const navigate = useNavigate()
  const { formik, isLoading, error } = useLogin()
  const isUserAuthenticated = useAppSelector(selectIsAuthenticated)
  const authBadCredentials = errorHandler(error)

  useEffect(() => {
    if (isUserAuthenticated) {
      navigate({ pathname: HOME_ROUTE.path })
    }

    /*  eslint-disable-next-line */
  }, [isUserAuthenticated])
  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate width="100%">
      <Stack direction="column" gap={1.43} width="100%">
        <ValidatedInput
          fullWidth
          autoComplete="off"
          type="email"
          name="email"
          size="small"
          label="Email"
          variant="outlined"
          value={formik.values.email}
          errorText={formik.errors.email || authBadCredentials?.email}
          onChange={formik.handleChange}
          disabled={isLoading}
        />
        <PasswordInput
          fullWidth
          autoComplete="new-password"
          name="password"
          size="small"
          label="Password"
          value={formik.values.password}
          errorText={formik.errors.password || authBadCredentials?.password}
          onChange={formik.handleChange}
          disabled={isLoading}
        />
        <Box component="div" sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <Link
            component={RouterLink}
            to="/forgot"
            sx={{
              textTransform: 'initial',
              fontWeight: 600,
              fontSize: 14
            }}
            underline="none"
          >
            Forgot password?
          </Link>
        </Box>
        <PrimaryButton type="submit" loading={isLoading}>
          Sign in
        </PrimaryButton>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Don&apos;t have an account?{' '}
          <Typography
            component={RouterLink}
            to="/signup"
            sx={{
              fontWeight: 600,
              fontSize: 14,
              textDecoration: 'none',
              color: 'primary.main'
            }}
          >
            Sign up
          </Typography>
        </Typography>
      </Stack>
    </Box>
  )
}
