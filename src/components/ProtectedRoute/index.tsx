import React, { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router'
import { useAppSelector } from '../../application/store'
import { selectHasPassedWelcome, selectIsAuthenticated } from '../../features/authorization/services/selector'

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const isUserAuthenticated = useAppSelector(selectIsAuthenticated)
  const hasUserPassedWelcome = useAppSelector(selectHasPassedWelcome)

  if (!isUserAuthenticated) {
    console.log('Not auth')
    return <Navigate to='/login' replace />
  }

  if (isUserAuthenticated && !hasUserPassedWelcome) {
    console.log('Auth but loh')
    return <Navigate to='/welcome' replace />
  }

  console.log('Auth and cold')

  return <>{children}</>
}
