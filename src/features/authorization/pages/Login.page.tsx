import { FC, useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Box, Button, Checkbox, CssBaseline, Link, Typography } from '@mui/joy'

import { useLogin, useSignup } from 'features/authorization/hooks'
import { ValidatedInput } from 'shared/components/ValidatedInput'
import { PasswordInput } from 'shared/components/PasswordInput'
import { useAppSelector } from '../../../application/store'
import { HOME_ROUTE } from '../../../shared/routes'
import { selectIsAuthenticated } from '../services'
import { ErrorMessage } from 'shared/components'
import { GoogleSignupIcon } from '../components/GoogleIcon'
import { Backdrop } from 'shared/components/Backdrop'
import { Logo } from 'shared/components/Logo'
import { LinearProgress } from '@mui/joy'
export const LoginPage: FC = () => {
  const navigate = useNavigate()
  const { formik, isLoading, error } = useLogin()
  const isUserAuthenticated = useAppSelector(selectIsAuthenticated)
  useEffect(() => {
    if (isUserAuthenticated) {
      console.log('LOGIN PAGE REDIRECT BECAUSE >>>>> Already authenticated')
      navigate({ pathname: HOME_ROUTE.path })
    }
  }, [])
  return (
    <>
      <Backdrop isLoading={isLoading} />
      <CssBaseline />
      <Box
        component='div'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'space-between',
          minHeight: '100dvh',
          maxWidth: '100%',
          px: 2
        }}
      >
        <Box
          component='main'
          sx={{
            my: '0',
            p: '50px 30px 50px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: 400,
            maxWidth: '100%',
            mx: 'auto',
            borderRadius: 'sm',
            '& form': {
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }
          }}
        >
          <ErrorMessage error={error} />
          <Box component='div'>
            <Typography component='h2' fontSize='xl2' fontWeight='lg'>
              Welcome!
            </Typography>
            <Typography level='body2' sx={{ my: 1, mb: 3 }}>
              Let&apos;s get started. Please enter your details.
            </Typography>
          </Box>
          <Box component='form' onSubmit={formik.handleSubmit}>
            <ValidatedInput
              autoComplete='email'
              name='email'
              value={formik.values.email}
              errorText={formik.errors.email}
              touched={formik.touched.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='Enter your email'
            >
              Email
            </ValidatedInput>
            <PasswordInput
              value={formik.values.password}
              errorText={formik.errors.password}
              touched={formik.touched.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Box
              component='div'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Checkbox size='sm' label='Remember for 30 days' name='persistent' />
              <Link fontSize='sm' href='#replace-with-a-link' fontWeight='lg'>
                Forgot password
              </Link>
            </Box>
            <Button type='submit' fullWidth>
              Sign in
            </Button>
          </Box>
        </Box>
        <Box component='footer' sx={{ py: 3 }}>
          <Typography level='body3' textAlign='center'>
            © Rick&MortyApi {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </>
  )
}
