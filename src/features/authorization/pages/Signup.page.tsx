import { useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Box, Button, Container, Grid, LinearProgress, Typography } from '@mui/material'

import { useSignup } from 'features/authorization/hooks'
import { ValidatedInput } from 'shared/components/Form/ValidatedInput'
import { PasswordInput } from 'shared/components/Form/PasswordInput'
import { useAppSelector } from '../../../application/store'
import { HOME_ROUTE } from '../../../shared/routes'
import { selectIsAuthenticated } from '../services'
import { errorHandler } from '../components/ErrorHandler'

export const SignupPage = () => {
  const isUserAuthenticated = useAppSelector(selectIsAuthenticated)
  const navigate = useNavigate()
  const { formik, isLoading, error, isError } = useSignup()
  const authBadCredentials = errorHandler(error)
  useEffect(() => {
    if (isUserAuthenticated) {
      navigate({ pathname: HOME_ROUTE.path })
    }
  }, [])
  return (
    <Container sx={{ width: { xs: '100%', sm: 450, md: 600 }, p: { xs: 0 }, mt: { sm: 10 } }}>
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
        <Box
          component='img'
          sx={{ width: '100px' }}
          src='https://upload.wikimedia.org/wikipedia/ru/c/c8/Rick_and_Morty_logo.png'
        />
        <Box component='div' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
          <Typography
            variant='h1'
            sx={{
              p: '16px 0 0',
              fontSize: 24,
              fontWeight: 500,
              opacity: 0.9
            }}
          >
            Sign up
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
            size='small'
            autoComplete='off'
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
          <Grid container spacing={2} mt={2} mb={4}>
            <Grid item xs={12} sm={6}>
              {
                <PasswordInput
                  id='password'
                  name='password'
                  fullWidth
                  size='small'
                  label='Password'
                  value={formik.values.password}
                  errorText={formik.errors.password || authBadCredentials?.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isLoading}
                />
              }
            </Grid>
            <Grid item xs={12} sm={6}>
              <PasswordInput
                id='confirm-password'
                name='confirmPassword'
                fullWidth
                size='small'
                label='Confirm'
                value={formik.values.confirmPassword}
                errorText={!!formik.values.password ? formik.errors.confirmPassword : ''}
                onChange={formik.handleChange}
                disabled={isLoading}
              />
            </Grid>
          </Grid>
          <Box
            component='div'
            sx={{
              mt: '30px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Button
              variant='text'
              component={RouterLink}
              to='/signin'
              sx={{
                textTransform: 'initial',
                fontWeight: 600,
                padding: 0
              }}
              disabled={isLoading}
            >
              Sign in instead
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
              Sign up
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
