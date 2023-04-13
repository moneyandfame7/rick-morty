import React, { type FC, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import { Container } from '@mui/material'

import { useAppSelector } from '@application/store'

import type { User } from '@features/users/type'
import { CookieKey, cookies, selectHasPassedWelcome } from '@features/authorization/services'

import { HOME_ROUTE } from '@shared/routes'
import { CircularLoader } from '@shared/components/common'
import { useActions } from '@shared/hooks'
import { SIGNUP_ROUTE } from '../routes'

export const SuccessLoginPage: FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { setUser } = useActions()
  const hasPassedWelcome = useAppSelector(selectHasPassedWelcome)

  useEffect(() => {
    const refresh = searchParams.get('refresh')
    const access = searchParams.get('access')
    if (refresh && access) {
      const accessExpires = new Date(Date.now() + 15 * 60 * 1000)
      const refreshExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      cookies.set(CookieKey.ACCESS_TOKEN, access, { expires: accessExpires })
      cookies.set(CookieKey.REFRESH_TOKEN, refresh, { expires: refreshExpires })

      const user = jwt_decode<User>(access)

      if (user) {
        setUser(user)
        setTimeout(() => {
          navigate({ pathname: hasPassedWelcome ? HOME_ROUTE.path : SIGNUP_ROUTE.path })
        }, 1000)
      }
    }
  }, [])
  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularLoader />
    </Container>
  )
}
