import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Checkbox, Container, LinearProgress, Typography } from '@mui/material'

import { useAppSelector } from 'application/store'
import { selectCurrentUser } from 'features/users/services'

import { useWelcome } from 'features/authorization/hooks'
import { selectHasPassedWelcome } from 'features/authorization/services'
import { HOME_ROUTE } from 'shared/routes'
import { ValidatedInput } from 'shared/components/Form/ValidatedInput'
import { CountryAutocompleteInput } from 'shared/components/Form/CountryAutocompleteInput'
import { errorHandler } from '../components/ErrorHandler'

export const WelcomePage: FC = () => {
  const navigate = useNavigate()
  const { countries, formik, isLoading, error } = useWelcome()
  const authBadCredentials = errorHandler(error)
  const user = useAppSelector(selectCurrentUser)
  const hasPassedWelcome = useAppSelector(selectHasPassedWelcome)
  const onUseMyUsernameClick = () => {
    if (user) {
      const usernameFromEmail = user.email.split('@')[0]
      formik.setFieldValue('username', usernameFromEmail)
    }
  }

  // useEffect(() => {
  //   if (hasPassedWelcome) {
  //     navigate({ pathname: HOME_ROUTE.path })
  //   }
  // }, [])

  return (
    <Container
      maxWidth='xs'
      sx={{
        minWidth: { xs: '100%', sm: '500px', md: '750px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: { xs: 0, sm: 10 },
        p: { xs: 0 },
        transition: '.2s'
      }}
    >
      <Box
        component='div'
        sx={{
          border: '1px solid',
          borderColor: { xs: 'transparent', sm: 'primary.border' },
          borderRadius: '8px',
          minHeight: { xs: '100vh', sm: '500px' },
          m: '0 auto',
          p: { xs: '20px 20px 18px', sm: '40px 40px 36px' },
          position: 'relative'
        }}
      >
        {isLoading && (
          <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, borderRadius: '8px 8px 0 0', width: '100%' }} />
        )}
        <Box component='div' sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
          <Box
            component='img'
            sx={{ width: '100px' }}
            src='https://upload.wikimedia.org/wikipedia/ru/c/c8/Rick_and_Morty_logo.png'
          />
          <Typography variant='h1' fontSize={28} sx={{ padding: '15px 0 5px', opacity: 0.9, fontWeight: 500 }}>
            Welcome
          </Typography>
          <Typography variant='body2' sx={{ opacity: 0.8 }}>
            Just a few questions to provide you with the best possible experience:
          </Typography>
        </Box>
        <Box component='form' onSubmit={formik.handleSubmit} sx={{ mt: '40px' }} noValidate>
          <ValidatedInput
            fullWidth
            autoComplete='off'
            type='username'
            name='username'
            label='Username'
            variant='outlined'
            value={formik.values.username}
            errorText={formik.errors.username || authBadCredentials?.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
            size='small'
            helperText='You can use letters, numbers & periods'
          />
          <Button
            variant='text'
            sx={{ textTransform: 'initial', fontWeight: 500, fontSize: 16, my: '8px' }}
            onClick={onUseMyUsernameClick}
            disabled={isLoading}
          >
            Use my username from current email
          </Button>
          <Box
            component='div'
            sx={{
              py: '20px',
              display: { sm: 'block', md: 'flex' },
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <CountryAutocompleteInput
              items={countries}
              setFieldValue={formik.setFieldValue}
              onBlur={formik.handleBlur}
              errorText={formik.errors.country}
            />
            <Box
              component='div'
              sx={{ mt: { xs: '30px', md: '10px' }, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
            >
              <Typography variant='body1' sx={{ textAlign: 'end' }}>
                Subscribe to the newsletter?
              </Typography>
              <Checkbox
                id='mail_subscribe'
                name='mail_subscribe'
                checked={formik.values.mail_subscribe}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Box>
          </Box>
          <Button
            variant='contained'
            type='submit'
            sx={{
              mt: '20px',
              float: 'right',
              textTransform: 'initial',
              fontWeight: 500,
              fontSize: 16,
              padding: '5px 20px'
            }}
            disabled={isLoading}
          >
            Finish
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
