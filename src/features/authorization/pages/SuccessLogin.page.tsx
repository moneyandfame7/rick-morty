import { type FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

import { Container } from '@mui/material'

import type { User } from 'features/users/type'

import { HOME_ROUTE } from 'shared/routes'
import { CookieKey } from 'shared/constants'
import { CircularLoader } from 'shared/components/common'
import { useActions } from 'shared/hooks/useActions'

export const SuccessLoginPage: FC = () => {
  const navigate = useNavigate()
  const token = Cookies.get(CookieKey.ACCESS_TOKEN)
  const { setUser} = useActions()
  useEffect(() => {
    if (token) {
      const user: User = jwt_decode(token)

      if (user) {
        setUser(user)
        setTimeout(() => {
          navigate({ pathname: HOME_ROUTE.path })
        }, 1000)
      }
    }
    /*  eslint-disable-next-line */
  }, [token])
  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularLoader />
      
    </Container>
  )
}
