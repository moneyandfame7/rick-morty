import React, { FC, PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAppSelector } from 'application/store'

import { selectHasPassedWelcome, selectIsAuthenticated } from 'features/authorization/services'
import { WELCOME_ROUTE } from 'features/authorization/routes'
import { selectCurrentUser } from 'features/users/services'

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation()
  const isUserAuthenticated = useAppSelector(selectIsAuthenticated)
  const hasUserPassedWelcome = useAppSelector(selectHasPassedWelcome)
  const user = useAppSelector(selectCurrentUser)
  console.log(user, 'Current user')

  if (location.pathname === WELCOME_ROUTE.path && isUserAuthenticated && !hasUserPassedWelcome) {
    return <>{children}</>
  }

  if (!isUserAuthenticated) {
    console.log('Not auth')
    console.log(location)
    return <Navigate to='/login' replace />
  }

  if (isUserAuthenticated && !hasUserPassedWelcome) {
    console.log('Auth but loh')
    return <Navigate to='/welcome' replace />
  }

  console.log('Auth and cold')

  return <>{children}</>
}
