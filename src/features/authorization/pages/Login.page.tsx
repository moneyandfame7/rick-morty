import React, { FC, useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { Box, Button, Container, LinearProgress, Link, Stack, Typography } from '@mui/material'

import { useAppSelector } from 'application/store'
import { useLogin } from 'features/authorization/hooks'
import { selectIsAuthenticated } from 'features/authorization/services'

import { ValidatedInput } from 'shared/components/Form/ValidatedInput'
import { PasswordInput } from 'shared/components/Form/PasswordInput'
import { HOME_ROUTE } from 'shared/routes'
import { errorHandler } from '../components/ErrorHandler'
import { SocialLogin } from '../components/SocialLogin'

export const LoginPage: FC = () => {
  const navigate = useNavigate()
  const { formik, isLoading, error } = useLogin()
  const isUserAuthenticated = useAppSelector(selectIsAuthenticated)
  const authBadCredentials = errorHandler(error)
  const [social, setSocial] = useState<boolean>(false)
  useEffect(() => {
    if (isUserAuthenticated) {
      navigate({ pathname: HOME_ROUTE.path })
    }
  }, [isUserAuthenticated])

  return (
    <Container sx={{ width: { xs: '100%', sm: '450px' }, p: { xs: 0 }, mt: { sm: 10 } }}>
      <Box
        component='main'
        sx={{
          border: '1px solid',
          borderColor: { xs: 'transparent', sm: 'primary.border' },
          borderRadius: '8px',
          minHeight: '500px',
          m: '0 auto',
          p: { xs: '20px 20px 18px', sm: '40px 40px 36px' },
          position: 'relative'
        }}
      >
        {isLoading && (
          <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, borderRadius: '8px 8px 0 0', width: '100%' }} />
        )}
        <Box component='div' sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Box
            component='img'
            sx={{ width: '100px' }}
            src='https://upload.wikimedia.org/wikipedia/ru/c/c8/Rick_and_Morty_logo.png'
          />
        </Box>
        <Box component='div' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography
            variant='h1'
            sx={{
              p: '16px 0 0',
              fontSize: 24,
              fontWeight: 500,
              opacity: 0.9
            }}
          >
            Sign in
          </Typography>
          <Typography
            variant='body1'
            sx={{
              p: '7px 0 0',
              fontSize: 15,
              fontWeight: 500,
              opacity: 0.8,

              letterSpacing: '0.3px'
            }}
          >
            {social ? 'Use your social network' : ' Use your password'}
          </Typography>
        </Box>

        <Box
          component='form'
          sx={{
            p: '30px 0 0'
          }}
          onSubmit={formik.handleSubmit}
          noValidate
        >
          {social ? (
            <SocialLogin />
          ) : (
            <>
              <ValidatedInput
                fullWidth
                autoComplete='email'
                type='email'
                name='email'
                label='Email'
                variant='outlined'
                value={formik.values.email}
                errorText={formik.errors.email || authBadCredentials?.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isLoading}
              />
              <PasswordInput
                sx={{
                  m: '20px 0 0'
                }}
                autoComplete='password'
                id='password'
                name='password'
                fullWidth
                label='Password'
                value={formik.values.password}
                errorText={formik.errors.password || authBadCredentials?.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isLoading}
              />
            </>
          )}

          <Box component='div' sx={{ width: '100%', paddingTop: 1 }}>
            <Link
              component={RouterLink}
              to='/forgot'
              sx={{
                textTransform: 'initial',
                fontWeight: 600,
                fontSize: 14
              }}
              underline='none'
            >
              Forgot password?
            </Link>
          </Box>
          <Stack direction='row' justifyContent='space-between' paddingTop={3}>
            <Button
              variant='text'
              component={RouterLink}
              to='/signup'
              sx={{
                textTransform: 'initial',
                fontWeight: 600,
                padding: 0
              }}
            >
              Create account
            </Button>
            {!social && (
              <Button
                variant='contained'
                type='submit'
                sx={{
                  textTransform: 'initial',
                  fontWeight: 600
                }}
                disabled={isLoading}
              >
                Sign in
              </Button>
            )}
          </Stack>
        </Box>
        <Button
          sx={{ mt: '30px', fontWeight: 600 }}
          onClick={() => setSocial(prev => !prev)}
          variant='outlined'
          fullWidth
        >
          Social login
        </Button>
      </Box>
    </Container>
  )
}
