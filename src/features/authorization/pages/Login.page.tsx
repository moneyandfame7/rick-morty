import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Avatar, Box, Button, CircularProgress, Container, CssBaseline, Grid, Link, Typography } from '@mui/material'
import { FC, useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { useLogin } from 'features/authorization/hooks'

import { EmailInput } from 'shared/components/EmailInput'
import { PasswordInput } from 'shared/components/PasswordInput'
import { CLIENT_URL } from 'shared/constants'
import { useAppSelector } from '../../../application/store'
import { HOME_ROUTE } from '../../../shared/routes'
import { selectIsAuthenticated } from '../services'

function Copyright(props: any) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' variant='body2' href={CLIENT_URL}>
        Rick&Morty API
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export const LoginPage: FC = () => {
  const navigate = useNavigate()
  const { formik, isLoading } = useLogin()
  const isUserAuthenticated = useAppSelector(selectIsAuthenticated)
  useEffect(() => {
    if (isUserAuthenticated) {
      console.log('LOGIN PAGE REDIRECT BECAUSE >>>>> Already authenticated')
      navigate({ pathname: HOME_ROUTE.path })
    }
  }, [])
  return (
    <Container component='main' maxWidth='xs'>
      {isLoading && <CircularProgress />}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <EmailInput validate={formik} />
            </Grid>
            <Grid item xs={12}>
              <PasswordInput validate={formik} />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} variant='body2' to='/forgot'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} variant='body2' to='/signup'>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}
