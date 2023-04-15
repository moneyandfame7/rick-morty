import React, { type FC, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import { Container } from '@mui/material'

import { useAppSelector } from 'application/store'

import type { User } from 'features/users/type'
import { selectHasPassedWelcome, useSuccessSocialLoginMutation } from 'features/authorization/services'

import { HOME_ROUTE } from 'shared/routes'
import { CircularLoader } from 'shared/components/common'
import { useActions } from 'shared/hooks'

import { SIGNUP_ROUTE } from '../routes'

export const SuccessLoginPage: FC = () => {
  const [successLogin, { data, isSuccess }] = useSuccessSocialLoginMutation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { setUser } = useActions()
  const hasPassedWelcome = useAppSelector(selectHasPassedWelcome)

  useEffect(() => {
    const access = searchParams.get('access')
    const refresh = searchParams.get('refresh')

    if (access && refresh) {
      const user: User | null = jwt_decode(access)
      if (user) {
        setUser(user)
        successLogin({ access, refresh })
      }
    }
    /*  eslint-disable-next-line */
  }, [])

  useEffect(() => {
    if (data && isSuccess) {
      setTimeout(() => {
        navigate({ pathname: hasPassedWelcome ? HOME_ROUTE.path : SIGNUP_ROUTE.path })
      }, 1000)
    }
  }, [data, isSuccess])
  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularLoader />
    </Container>
  )
}
