import React, { FC, useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { useLogin } from 'features/authorization/hooks'
import { ValidatedInput } from 'shared/components/Form/ValidatedInput'
import { PasswordInput } from 'shared/components/Form/PasswordInput'
import { useAppSelector } from 'application/store'
import { HOME_ROUTE } from 'shared/routes'
import { selectIsAuthenticated } from 'features/authorization/services'
import { Box, Button, Container, LinearProgress, Link, Stack, Typography } from '@mui/material'
import { errorHandler, ErrorHandler } from '../components/ErrorHandler'

export const LoginPage: FC = () => {
  const navigate = useNavigate()
  const { formik, isLoading, error } = useLogin()
  const isUserAuthenticated = useAppSelector(selectIsAuthenticated)
  const authBadCredentials = errorHandler(error)

  useEffect(() => {
    if (isUserAuthenticated) {
      console.log('LOGIN PAGE REDIRECT BECAUSE >>>>> Already authenticated')
      navigate({ pathname: HOME_ROUTE.path })
    }
  }, [])

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
            Use your password
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
          {/* <PasswordInput
           
            fullWidth
            label='Enter your password'
            value={formik.values.password}
            errorText={formik.errors.password || authBadCredentials?.password}
            touched={formik.touched.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          /> */}
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
          </Stack>
        </Box>
      </Box>
    </Container>
  )
}
