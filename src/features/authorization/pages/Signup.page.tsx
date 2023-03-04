import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Avatar, Box, Button, CircularProgress, Container, CssBaseline, Grid, Link, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { useSignup } from 'features/authorization/hooks'
import { EmailInput } from 'shared/components/EmailInput'
import { PasswordInput } from 'shared/components/PasswordInput'
import { useAppSelector } from '../../../application/store'
import { HOME_ROUTE } from '../../../shared/routes'
import { selectIsAuthenticated } from '../services'

export const SignupPage = () => {
  const isUserAuthenticated = useAppSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (isUserAuthenticated) {
      console.log('SIGNUP PAGE REDIRECT BECAUSE >>>>> Already authenticated')
      navigate({ pathname: HOME_ROUTE.path })
    }
  }, [])
  const { error, formik, isLoading } = useSignup()
  return (
    <Container
      maxWidth='xs'
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {isLoading && <CircularProgress />}
      {error && <Typography>ERROR</Typography>}
      <CssBaseline />

      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign up
      </Typography>
      <Box component='form' noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <EmailInput validate={formik} />
          </Grid>
          <Grid item xs={12}>
            <PasswordInput validate={formik} />
          </Grid>
        </Grid>
        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
          Sign Up
        </Button>
        <Grid container justifyContent='flex-end'>
          <Grid item>
            <Link component={RouterLink} variant='body2' to='/login'>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
