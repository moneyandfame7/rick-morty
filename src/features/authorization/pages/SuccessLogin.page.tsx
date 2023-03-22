import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import Image from 'mui-image'

import { Box, Container, Stack, Typography } from '@mui/material'

import { useAppDispatch } from 'application/store'

import { setUser } from 'features/users/services'
import { User } from 'features/users/type'

import { HOME_ROUTE } from 'shared/routes'
import { CookieKey } from 'shared/constants'

export const SuccessLoginPage: FC = () => {
  const navigate = useNavigate()
  // TODO: refactor
  const token = Cookies.get(CookieKey.ACCESS_TOKEN)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (token) {
      const user: User = jwt_decode(token)

      if (user) {
        dispatch(setUser(user))
        setTimeout(() => {
          navigate({ pathname: HOME_ROUTE.path })
        }, 1000)
      }
    }
  }, [token])
  return (
    <Container maxWidth='md' sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mt: 20 }}>
      <Stack direction='column' gap={1}>
        <Typography variant='body1' fontWeight={500} textAlign='center'>
          Success!
        </Typography>
        <Typography variant='body2' fontWeight={500} textAlign='center' color='text.secondary'>
          You will be redirected.
        </Typography>
      </Stack>
      <Box component='div' sx={{ display: 'flex', justifyContent: 'center' }}>
        <Image
          src='https://rick-morty.s3.eu-central-1.amazonaws.com/assets/redirect.jpeg'
          alt='Rick'
          width='400px'
          duration={500}
          showLoading={true}
          style={{
            borderRadius: 8
          }}
        />
      </Box>
    </Container>
  )
}
