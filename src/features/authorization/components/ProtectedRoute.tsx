import React, { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from '@application/store'
import { selectHasPassedWelcome, selectIsAuthenticated } from '@features/authorization/services'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '../routes'

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const isUserAuthenticated = useAppSelector(selectIsAuthenticated)
  const hasUserPassedWelcome = useAppSelector(selectHasPassedWelcome)

  if (!isUserAuthenticated) {
    return <Navigate to={{ pathname: LOGIN_ROUTE.path }} replace />
  }

  if (isUserAuthenticated && !hasUserPassedWelcome) {
    return <Navigate to={{ pathname: SIGNUP_ROUTE.path }} replace />
  }

  return <>{children}</>
}
