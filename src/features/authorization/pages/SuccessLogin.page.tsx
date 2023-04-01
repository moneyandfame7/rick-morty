import { type FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

import { CircularProgress, Container } from '@mui/material'

import { useAppDispatch } from 'application/store'

import { setUser } from 'features/users/services'
import type { User } from 'features/users/type'

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
        }, 3000)
      }
    }
    /*  eslint-disable-next-line */
  }, [token])
  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress color="primary" thickness={7} />
    </Container>
  )
}
