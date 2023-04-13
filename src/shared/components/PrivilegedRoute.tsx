import React, { PropsWithChildren, type FC, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { useAppSelector } from 'application/store'

import { Role } from 'features/authorization/constant'
import { LOGIN_ROUTE } from 'features/authorization/routes'
import { selectCurrentUser } from 'features/users/services'

import { hasPermission } from 'shared/utils'

export const PrivilegedRoute: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate()
  const user = useAppSelector(selectCurrentUser)
  useEffect(() => {
    if (user && !hasPermission(user.role.value as Role)) {
      navigate(-1)
    }
  }, [user])
  if (!user) {
    return <Navigate to={{ pathname: LOGIN_ROUTE.path }} replace />
  }
  return <>{children}</>
}
