import React, { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from 'application/store'
import { selectHasPassedWelcome, selectIsAuthenticated } from 'features/authorization/services'

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const isUserAuthenticated = useAppSelector(selectIsAuthenticated)
  const hasUserPassedWelcome = useAppSelector(selectHasPassedWelcome)
  if (!isUserAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (isUserAuthenticated && !hasUserPassedWelcome) {
    return <Navigate to="/signup" replace />
  }

  return <>{children}</>
}
