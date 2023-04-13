import React, { type FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const token = cookies.get(CookieKey.ACCESS_TOKEN)
  const { setUser } = useActions()
  const hasPassedWelcome = useAppSelector(selectHasPassedWelcome)

  useEffect(() => {
    if (token) {
      const user: User = jwt_decode(token)

      if (user) {
        setUser(user)
        setTimeout(() => {
          navigate({ pathname: hasPassedWelcome ? HOME_ROUTE.path : SIGNUP_ROUTE.path })
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
