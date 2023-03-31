import React, { FC, useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { Box, Button, Container, Grid, LinearProgress, Link, Stack, Typography, useTheme } from '@mui/material'

import { useAppSelector } from 'application/store'
import { useLogin } from 'features/authorization/hooks'
import { selectIsAuthenticated } from 'features/authorization/services'
import { HOME_ROUTE } from 'shared/routes'
import { errorHandler } from '../components/ErrorHandler'
import Image from 'mui-image'
import { LogoIcon } from 'shared/components/common/icons/LogoIcon'
import { Logo } from '../../../shared/components/icons/Logo'
import { ValidatedInput } from '../../../shared/components/Form/ValidatedInput'
import { PasswordInput } from '../../../shared/components/Form/PasswordInput'
import { PrimaryButton } from '../../../shared/components/common/buttons/PrimaryButton'
import { OutlinedButton } from '../../../shared/components/common/buttons/OutlinedButton'
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined'
import { SocialLogin } from '../components/SocialLogin'

export const LoginPage: FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { formik, isLoading, error } = useLogin()
  const isUserAuthenticated = useAppSelector(selectIsAuthenticated)
  const authBadCredentials = errorHandler(error)
  const [isSocial, setIsSocial] = useState<boolean>(false)
  useEffect(() => {
    if (isUserAuthenticated) {
      navigate({ pathname: HOME_ROUTE.path })
    }
  }, [isUserAuthenticated])

  return (
    <Box sx={{ flexGrow: 1, height: '100vh' }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={12} md={5}>
          <Container
            sx={{
              width: '100%',
              height: '100%',
              p: 2
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="center"
              sx={{ height: '100%' }}
            >
              <Grid item xs={1} width="100%">
                <Logo logoIcon={{ color: theme.palette.primary.dark }} />
              </Grid>

              <Grid
                item
                xs={9}
                sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: { xs: '95%', sm: '90%' } }}
              >
                <Stack direction="column" gap="3px" width="100%" sx={{ mx: 'auto', mt: 5 }}>
                  <Typography fontSize={30} fontWeight="600" sx={{ width: '100%', textAlign: 'start' }}>
                    Welcome back
                  </Typography>
                  <Typography fontSize={16} fontWeight="400" color="text.secondary">
                    Welcome back! Please enter your details.
                  </Typography>
                </Stack>
                <Box sx={{ width: '100%' }} component="form" onSubmit={formik.handleSubmit} noValidate>
                  {isSocial ? (
                    <SocialLogin />
                  ) : (
                    <Stack direction="column" width="100%" gap={1.43}>
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
                        onBlur={formik.handleBlur}
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
                        Don't have an account?{' '}
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
                  )}
                </Box>
                <OutlinedButton
                  onClick={() => {
                    setIsSocial(prev => !prev)
                  }}
                >
                  {!isSocial ? 'Social login' : 'With password and email'}
                </OutlinedButton>
              </Grid>

              <Grid item xs={2} sx={{ display: 'flex', alignItems: 'end' }} width="100%">
                <Stack direction="row" gap={1} alignItems="center" width="100%">
                  <CopyrightOutlinedIcon sx={{ color: 'primary.dark', fontSize: 14 }} />
                  <Typography sx={{ fontWeight: 400, fontSize: 14, color: 'primary.dark' }}>Rickmorty API</Typography>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid
          item
          md={7}
          sx={{
            display: { xs: 'none', md: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
            backgroundColor: 'primary.dark'
          }}
        >
          <Image
            src={`https://rick-morty.s3.eu-central-1.amazonaws.com/assets/login.jpeg`}
            alt="Login image"
            width="100%"
            duration={500}
            showLoading={true}
            style={{
              pointerEvents: 'none'
            }}
          />
        </Grid>
      </Grid>
    </Box>

    /*<Container sx={{ width: { xs: '100%', sm: '450px' }, p: { xs: 0 }, mt: { sm: 10 } }}>
    <Box
      component="main"
      sx={{
        borderRadius: '8px',
        minHeight: '500px',
        m: '0 auto',
        p: { xs: '20px 20px 18px', sm: '40px 40px 36px' },
        position: 'relative'
      }}
    >
      <Box component="div" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Box
          component="img"
          sx={{ width: '100px' }}
          src="https://upload.wikimedia.org/wikipedia/ru/c/c8/Rick_and_Morty_logo.png"
        />
      </Box>
      <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" fontSize={26} fontWeight="600" sx={{ my: 1 }}>
          Log in to your account
        </Typography>
        <Typography variant="body2" fontWeight="500" color="text.secondary">
          Welcome back! Please enter your details.
        </Typography>
      </Box>

      <Box
        component="form"
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
              size="small"
              fullWidth
              autoComplete="new-password"
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              value={formik.values.email}
              errorText={formik.errors.email || authBadCredentials?.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
            <PasswordInput
              size="small"
              sx={{
                m: '20px 0 0'
              }}
              autoComplete="new-password"
              name="password"
              fullWidth
              label="Password"
              value={formik.values.password}
              errorText={formik.errors.password || authBadCredentials?.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </>
        )}

        <Box component="div" sx={{ width: '100%', pt: 2, display: 'flex', justifyContent: 'flex-end' }}>
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
        {!social && (
          <LoadingButton
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              textTransform: 'initial',
              fontWeight: 600,
              mt: 3
            }}
            loading={isLoading}
          >
            Sign in
          </LoadingButton>
        )}
      </Box>
      <Button sx={{ fontWeight: 600, my: 3 }} onClick={() => setSocial(prev => !prev)} variant="outlined" fullWidth>
        Social login
      </Button>

      <Typography variant="body2" color="text.secondary" textAlign="center">
        Don't have an account?{' '}
        <Link
          component={RouterLink}
          to="/signup"
          sx={{
            textTransform: 'initial',
            fontWeight: 600,
            fontSize: 14
          }}
          underline="none"
        >
          Sign up
        </Link>
      </Typography>
    </Box>
  </Container>*/
  )
}
